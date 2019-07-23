import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import * as JWT from 'jsonwebtoken';
import { secretOrKey } from '../config';

const speakeasy = require('speakeasy');

import User from '../models/user.model';

const signToken = (user: User) => {
  return JWT.sign({
    username: user.username,
    id: user.id,
    email: user.email,
    tfaEnabled: user.tfaEnabled,
    iad: Date.now,
    expiresIn: "24h"
  }, secretOrKey);
}

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (email && password) {
      if (user) {
        if (await bcrypt.compareSync(password, user.password)) {
          if (!user.tfaEnabled) {
            const jwtToken = signToken(user);
            res.send({
              status: 200,
              accessToken: jwtToken
            });
          } else {
            if (!req.body['tfaToken']) {
              return res.send({
                "status": 206,
                "message": "Please enter the Auth Code"
              });
            }
            let isVerified = speakeasy.totp.verify({
              secret: user!.tfaSecret,
              encoding: 'base32',
              token: req.body['tfaToken']
            });

            if (isVerified) {
              const jwtToken = signToken(user!);

              res.send({
                status: 200,
                message: "Successful 2 step verification login.",
                accessToken: jwtToken
              });
            }
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
  login
}