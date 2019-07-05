import { Request, Response, NextFunction } from 'express';
import * as JWT from 'jsonwebtoken';
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

import User from '../models/user.model';

const tfaCreate = async (req: Request, res: Response) => {
  const jwtToken: any = await req.headers.authorization;
  const decodedJwt: any = JWT.verify(jwtToken, 'secret');

  const secret = await speakeasy.generateSecret({
    length: 10,
    name: decodedJwt.username,
    issuer: decodedJwt.username
  });

  let url = await speakeasy.otpauthURL({
    secret: secret.base32,
    label: decodedJwt.username,
    issuer: decodedJwt.username,
    encoding: 'base32'
  });

  QRCode.toDataURL(url, (err: any, dataURL: any) => {

    User.update({ twoFactorTempSecret: secret.base32 }, { where: { id: decodedJwt.id } });

    return res.json({
      message: 'TFA Auth needs to be verified',
      tempSecret: secret.base32,
      dataURL,
      tfaURL: secret.otpauth_url
    });
  });
}

const tfaFetch = async (req: Request, res: Response) => {
  const jwtToken: any = await req.headers.authorization;
  const decodedJwt: any = JWT.verify(jwtToken, 'secret');

  await User.findOne({ where: { id: decodedJwt.id } })
    .then(result => res.json(result ? result : null));
}

const tfaDelete = async (req: Request, res: Response) => {
  const jwtToken: any = await req.headers.authorization;
  const decodedJwt: any = JWT.verify(jwtToken, 'secret');
  await User.update({ tfaEnabled: false, twoFactorTempSecret: null, twoFactorSecret: null }, { where: { id: decodedJwt.id } })
    .then(updatedUser => console.log(updatedUser));
  res.send({
    "message": "Two factor authentication disabled successfully."
  })
}

const tfaVerify = async (req: Request, res: Response) => {
  const jwtToken: any = await req.headers.authorization;
  const decodedJwt: any = JWT.verify(jwtToken, 'secret')

  const user = await User.findOne({ where: { id: decodedJwt.id } });
  let tempSecret = user!.twoFactorTempSecret;

  let isVerified = speakeasy.totp.verify({
    secret: tempSecret,
    encoding: 'base32',
    token: req.body.token.authCode
  });

  if (isVerified) {
    await User.update({ tfaEnabled: true, twoFactorSecret: tempSecret, twoFactorTempSecret: null }, { where: { id: decodedJwt.id } });

    return res.send({
      "status": 200,
      "message": "Two-factor Auth is enabled successfully"
    });
  }

  return res.send({
    "status": 403,
    "message": "Invalid Auth Code, verification failed. Please verify the system Date and Time"
  });
}

module.exports = {
  tfaCreate,
  tfaFetch,
  tfaDelete,
  tfaVerify
}