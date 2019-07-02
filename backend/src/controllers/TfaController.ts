import { Request, Response, NextFunction } from 'express';

import User from '../models/user.model';

import * as JWT from 'jsonwebtoken';
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

const tfaCreate = async (req: Request, res: Response) => {
  console.log(`DEBUG: Received TFA setup request`);
  const jwtToken: any = await req.headers.authorization;
  const decodedJwt: any = JWT.verify(jwtToken, 'secret');

  const secret = await speakeasy.generateSecret({
    length: 10,
    name: decodedJwt.username,
    issuer: 'Slave'
  });

  let url = await speakeasy.otpauthURL({
    secret: secret.base32,
    label: decodedJwt.username,
    issuer: 'Slave',
    encoding: 'base32'
  });

  QRCode.toDataURL(url, (err: any, dataURL: any) => {

    User.update({twoFactorTempSecret: secret.base32}, {where: {id: decodedJwt.id}});

    return res.json({
      message: 'TFA Auth needs to be verified',
      tempSecret: secret.base32,
      dataURL,
      tfaURL: secret.otpauth_url
    });

  });

}

const tfaFetch = async (req: Request, res: Response) => {
  console.log(`DEBUG: Received FETCH TFA request`);
  const jwtToken: any = await req.headers.authorization;
  const decodedJwt: any = JWT.verify(jwtToken, 'secret');

  User.findOne({ where: { id: decodedJwt.id }})
    .then(result => res.json(result ? result : null));

}

const tfaDelete = async (req: Request, res: Response) => {
  // Implement
}

const tfaVerify = async (req: Request, res: Response) => {
  console.log(`DEBUG: Received TFA Verify request`);
  const jwtToken: any = await req.headers.authorization;
  const decodedJwt: any = JWT.verify(jwtToken, 'secret')

  const user = await User.findOne({where: {id: decodedJwt.id}});

  //The token here is the one the user enters (a 6 digit code).
  let isVerified = speakeasy.totp.verify({
    secret: user!.twoFactorTempSecret,
    encoding: 'base32',
    token: req.body.token
  });

  if (isVerified) {
    console.log(`DEBUG: TFA is verified to be enabled`);
    await User.update({ twoFactorSecret: user!.twoFactorTempSecret, tfaEnabled: true }, { where: { id: decodedJwt.id } });

    return res.send({
      "status": 200,
      "message": "Two-factor Auth is enabled successfully"
    });

  }
  console.log(`ERROR: TFA is verified to be wrong`);
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