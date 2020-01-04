import { Request, Response, NextFunction } from 'express';
import * as JWT from 'jsonwebtoken';
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
import { secretOrKey } from '../config';

import User from '../models/user.model';

const tfaSetup = async (req: Request, res: Response) => {
  const jwtToken: any = req.headers.authorization;
  const decodedJwt: any = JWT.verify(jwtToken, secretOrKey);

  const secret = await speakeasy.generateSecret({
    length: 10,
    name: decodedJwt.username,
    issuer: decodedJwt.username
  });

  let url = await speakeasy.otpauthURL({
    secret: secret.base32,
    label: decodedJwt.email,
    issuer: 'peRSSonified',
    encoding: 'base32'
  });

  QRCode.toDataURL(url, (err: any, dataURL: any) => {
    User.update({ tfaTempSecret: secret.base32 }, { where: { id: decodedJwt.id } });

    return res.json({
      message: 'Two-factor authentication needs to be verified.',
      tempSecret: secret.base32,
      dataURL,
      tfaURL: secret.otpauth_url
    });
  });
}

const tfaFetch = async (req: Request, res: Response) => {
  const jwtToken: any = req.headers.authorization;
  const decodedJwt: any = JWT.verify(jwtToken, secretOrKey);

  await User.findOne({ where: { id: decodedJwt.id } })
    .then(result => res.json(result ? result : null));
}

const tfaDelete = async (req: Request, res: Response) => {
  const jwtToken: any = req.headers.authorization;
  const decodedJwt: any = JWT.verify(jwtToken, secretOrKey);

  await User.update({ tfaEnabled: false, tfaTempSecret: null, tfaSecret: null }, { where: { id: decodedJwt.id } })
    .then(updatedUser => console.log(updatedUser));
  res.send({
    "message": "Two-factor authentication disabled successfully."
  })
}

const tfaVerify = async (req: Request, res: Response) => {
  const jwtToken: any = req.headers.authorization;
  const decodedJwt: any = JWT.verify(jwtToken, secretOrKey)

  const user = await User.findOne({ where: { id: decodedJwt.id } });
  let tempSecret = user!.tfaTempSecret;

  let isVerified = speakeasy.totp.verify({
    secret: tempSecret,
    encoding: 'base32',
    token: req.body.token.authCode
  });

  if (isVerified) {
    await User.update({ tfaEnabled: true, tfaSecret: tempSecret, tfaTempSecret: null }, { where: { id: decodedJwt.id } });

    return res.send({
      "status": 200,
      "message": "Two-factor authentication is enabled successfully."
    });
  }

  return res.send({
    "status": 403,
    "message": "Invalid Auth Code, verification failed. Please verify the system Date and Time"
  });
}

module.exports = {
  tfaSetup,
  tfaFetch,
  tfaDelete,
  tfaVerify
}