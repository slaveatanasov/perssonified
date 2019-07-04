import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import * as JWT from 'jsonwebtoken';
const uuidv4 = require('uuid/v4');
const speakeasy = require('speakeasy');

import User from '../models/user.model';

let tfaMap = {
  tempId: "",
  userId: 0
}

const signToken = (user: User) => {
  return JWT.sign({
    username: user.username,
    id: user.id,
    tfaEnabled: user.tfaEnabled,
    iad: Date.now,
    expiresIn: "24h"
  }, 'secret');
}

const tfaLogin = async (req: Request, res: Response) => {
  const { token, tempId, userId } = req.body;
  console.log(tfaMap);
  console.log(req.body);
  
  if (tempId == tfaMap.tempId && userId == tfaMap.userId) {
    const user = await User.findOne({ where: { id: userId } });
    let isVerified = speakeasy.totp.verify({
      secret: user!.twoFactorSecret,
      encoding: 'base32',
      token
    });

    if (isVerified) {
      const jwtToken = signToken(user!);
      tfaMap.tempId = "";
      tfaMap.userId = 0;


      res.status(200).send({
        message: "Successful 2 step verification login.",
        accessToken: jwtToken
      });
    }
  } else {
    res.status(401).send({
      "message": "Unauthorized."
    });
  }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password} = req.body;
    const user = await User.findOne({ where: { email } });

    if (email && password) {
      if (user) {
        if (await bcrypt.compareSync(password, user.password)) {
          if (!user.tfaEnabled) {
            const jwtToken = signToken(user);
            res.status(200).send({
              accessToken: jwtToken
            });
          } else {
            let tempId = uuidv4();
            tfaMap.tempId = tempId;
            tfaMap.userId = user.id;
            console.log(tfaMap);

            res.send({
              tempId: tempId,
              tfaRedirect: true,
              userId: user.id,
            })
          }
        } else {
          return res.status(401).json({ message: 'Password is incorrect. Try again.' });
        }
      } else {
        res.status(401).json({ message: 'No such email registered.' });
      }
    } else {
      res.status(401).json({ message: 'All fields are required.' });
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  login,
  tfaLogin
}