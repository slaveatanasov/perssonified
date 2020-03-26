import { RequestHandler } from 'express';
import * as JWT from 'jsonwebtoken';
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

import { secretOrKey } from '../config';
import User from '../models/user.model';

export const tfaSetup: RequestHandler = async (req, res) => {
  const token: string = req.headers.authorization!;
  const decodedJWT: any = JWT.verify(token, secretOrKey);

  const secret = await speakeasy.generateSecret({
    length: 10,
    name: decodedJWT.username,
    issuer: decodedJWT.username
  });

  let url = await speakeasy.otpauthURL({
    secret: secret.base32,
    label: decodedJWT.email,
    issuer: 'peRSSonified',
    encoding: 'base32'
  });

  QRCode.toDataURL(url, (err: any, dataURL: any) => {
    User.update({ tfaTempSecret: secret.base32 }, { where: { id: decodedJWT.id } });

    res.json({
      message: 'Two-Factor Authentication needs verification.',
      tempSecret: secret.base32,
      dataURL,
      tfaURL: secret.otpauth_url
    });
  });
}

export const tfaFetch: RequestHandler = async (req, res) => {
  const token: string = req.headers.authorization!;
  const decodedJWT: any = JWT.verify(token, secretOrKey);

  await User.findOne({ where: { id: decodedJWT.id } }).then(result => res.json(result ? result : null));
}

export const tfaDelete: RequestHandler = async (req, res) => {
  const token: string = req.headers.authorization!;
  const decodedJWT: any = JWT.verify(token, secretOrKey);

  await User.update({ tfaEnabled: false, tfaTempSecret: null, tfaSecret: null }, { where: { id: decodedJWT.id } })
    .then(updatedUser => console.log(updatedUser));

  res.send({
    message: "Two-Factor Authentication disabled successfully."
  })
}

export const tfaVerify: RequestHandler = async (req, res) => {
  const token: any = req.headers.authorization;
  const decodedJWT: any = JWT.verify(token, secretOrKey)

  const user = await User.findOne({ where: { id: decodedJWT.id } });
  let tempSecret = user!.tfaTempSecret;

  let isVerified = speakeasy.totp.verify({
    secret: tempSecret,
    encoding: 'base32',
    token: req.body.token.authCode
  });

  if (isVerified) {
    await User.update({ tfaEnabled: true, tfaSecret: tempSecret, tfaTempSecret: null }, { where: { id: decodedJWT.id } });

    return res.send({
      status: 200,
      message: "Two-factor authentication is enabled successfully."
    });
  }

  return res.send({
    status: 403,
    message: "Invalid Auth Code, verification failed. Please verify the system Date and Time"
  });
}