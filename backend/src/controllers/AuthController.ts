import { RequestHandler } from 'express';
import * as bcrypt from 'bcrypt';
import * as JWT from 'jsonwebtoken';
import { secretOrKey } from '../config';

import * as speakeasy from 'speakeasy';

import User from '../models/user.model';

const signToken = (user: User) => {
  return JWT.sign({
    username: user.username,
    id: user.id,
    email: user.email,
    tfaEnabled: user.tfaEnabled,
    iat: Math.floor(Date.now() / 1000),
    expiresIn: "12h"
  }, secretOrKey);
}

const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email }});
    if (email && password) {
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
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
                "message": "Please enter the Auth Code."
              });
            }
            let isVerified = speakeasy.totp.verify({
              secret: user.tfaSecret,
              encoding: 'base32',
              token: req.body['tfaToken']
            });

            if (isVerified) {
              const jwtToken = signToken(user);

              res.send({
                status: 200,
                message: "Successful two-factor verification login.",
                accessToken: jwtToken
              });
            } else {
              res.send({
                status: 401,
                message: "Two-factor verification failed. Please try again.",
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