import { Request, Response, NextFunction } from 'express';

import TFA  from '../models/tfa.model';
import TfaSecret from '../models/tfaSecret.model';

import * as JWT from 'jsonwebtoken';
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

const tfaCreate = async (req: Request, res: Response) => {
  const jwtToken: any = await req.headers.authorization;
  const decodedJwt: any = JWT.verify(jwtToken, 'secret')

  console.log(`DEBUG: Received TFA setup request`);
  const secret = await speakeasy.generateSecret({
    length: 10,
    name: decodedJwt.username,
    issuer: 'Slave'
  });

  let url = await speakeasy.otpauthURL({
    secret: secret.base32,
    label: decodedJwt.username,
    issuer: 'SlaveA',
    encoding: 'base32'
  });
  
  const userTFA: any = await TFA.findOne({where: {userId: decodedJwt.id}})
  const userTfaSecret: any = await TfaSecret.findOne({where: {tfaId: userTFA!.id}})

  QRCode.toDataURL (url, (err: any, dataURL: any) => {
    userTFA.update({tempSecret: secret.base32, dataURL, tfaURL: url}, {where: {userId: decodedJwt.id}})
      .then(() => console.log('updated tfa...'));

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
  const decodedJwt: any = JWT.verify(jwtToken, 'secret')
  TFA.findOne({where: {userId: decodedJwt.id }, include: [TfaSecret] })
    .then(result => res.json(result ? result : null))


}

const tfaDelete = async (req: Request, res: Response) => {
  // Implement
}

const tfaVerify = async (req: Request, res: Response) => {
  console.log(`DEBUG: Received TFA Verify request`);
  const jwtToken: any = await req.headers.authorization;
  const decodedJwt: any = JWT.verify(jwtToken, 'secret')
  const userTFA: any = await TFA.findOne({where: {userId: decodedJwt.id}})
  const userTfaSecret: any = await TfaSecret.findOne({where: {tfaId: userTFA!.id}})
  
  //The token here mentioned is the one user enters (probably a 6 digit code)

  let isVerified = speakeasy.totp.verify({
    secret: userTFA.tempSecret,
    encoding: 'base32',
    token: '426720'
    // token: req.body.token
  });

  if (isVerified) {

    console.log(`DEBUG: TFA is verified to be enabled`);
    await userTfaSecret.update({base32: userTFA.tempSecret}, 
      {where: {tfaId: userTFA.id}})
      .then(() => console.log('updated tfa secret...'))
    
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