import { RequestHandler } from 'express';
import * as bcrypt from 'bcrypt';
import * as JWT from 'jsonwebtoken';
import * as speakeasy from 'speakeasy';

import { secretOrKey } from '../config';
import User from '../models/user.model';

const signToken = (user: User) => {
  return JWT.sign({
    id: user.id,
    email: user.email,
    tfaEnabled: user.tfaEnabled,
    iat: Math.floor(Date.now() / 1000),
    expiresIn: "12h"
  }, secretOrKey);
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
  
    if (email && password) {
      const user = await User.findOne({ where: { email } });
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          if (!user.tfaEnabled) {
            const jwtToken = signToken(user);
            res.send({
              status: 200,
              accessToken: jwtToken
            });
          } else {
            if (!req.body.tfaToken) {
              res.send({
                status: 206,
                message: "Enter the Two-Factor Authentication code."
              });
            };
            let isVerified = speakeasy.totp.verify({
              secret: user.tfaSecret,
              encoding: 'base32',
              token: req.body.tfaToken
            });

            if (isVerified) {
              const jwtToken = signToken(user);

              res.send({
                status: 200,
                message: "Successful Two-Factor Authentication login.",
                accessToken: jwtToken
              });
            } else {
              res.send({
                status: 401,
                message: "Two-Factor Authentication failed. Please try again.",
              });
            }
          }
        } else {
          res.status(401).json({ message: 'Incorrect password. Try again.' });
        }
      } else {
        res.status(401).json({ message: 'No such email registered.' });
      }
    } else {
      res.status(401).json({ message: 'All fields are required.' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ "Error": error.message})
  }
}