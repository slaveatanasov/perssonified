import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';

const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

//TODO: Create update routes and make user model to accept this format, and see in which code blocks I need to fetch user from db and update and compare...

const tfaCreate = async (req: Request, res: Response) => {
  console.log(`DEBUG: Received TFA setup request`);
  const secret = await speakeasy.generateSecret({
    length: 10,
    name: req.body.username,
    issuer: 'Testing'
  });
  let url = await speakeasy.otpauthURL({
    secret: secret.base32,
    label: req.body.username,
    issuer: 'Testing',
    encoding: 'base32'
  });
  await QRCode.toDataURL(url, (err:any, dataURL:any) => {
    let data = req.body;
    data.tfa = {
        secret: '',
        tempSecret: secret.base32,
        dataURL,
        tfaURL: url
    };
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
  res.json(req.body.tfa ? req.body.tfa : null)
}

const tfaDelete = async (req: Request, res: Response) => {

}

const tfaVerify = async (req: Request, res: Response) => {
  console.log(`DEBUG: Received TFA Verify request`);

  let isVerified = speakeasy.totp.verify({
    secret: req.body.tfa.tempSecret,
    encoding: 'base32',
    token: req.body.token
  });

  if (isVerified) {
    console.log(`DEBUG: TFA is verified to be enabled`);
    let data = req.body;
    data.tfa.secret = data.tfa.tempSecret;
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