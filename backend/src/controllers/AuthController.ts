import { Request, Response, NextFunction } from 'express';
import  User from '../models/user.model';

import * as bcrypt from 'bcrypt';
import * as JWT from 'jsonwebtoken';
import TFA from '../models/tfa.model';

const speakeasy = require('speakeasy');

const signToken = (user: User) => {
  return JWT.sign({
    username: user.username,
    id: user.id,
    iad: Date.now,
    expiresIn: "24h"
  }, 'secret');
}

// const login = async (req: Request, res: Response, done: any) => {
//   try {
//     const loginData = req.body;
//     const user = await User.findOne({ where: { email: loginData.email } });
//     if (!user) {
//       res.status(401).json({ message: 'No such email registered.' });
//     } else {
//       let passwordMatch = bcrypt.compareSync(loginData.password, user.password);
//       if (!passwordMatch) {
//         return res.status(401).json({ message: 'Password is incorrect. Try again.' });
//       } else {
//         done(null, user);
//         const token = signToken(user);
//         res.status(200).json(token);
//       }
//     }
//   } catch (error) {
//     done(error, false);
//   }

// }

const login = async (req: Request, res: Response, done: any) => {
  try {
    console.log(`DEBUG: Received login request`);
    if (req.body) {
      
      if(!req.body.tfa || !req.body.tfa.secret) {

        const loginData = req.body;
        const user = await User.findOne({ where: { email: loginData.email } });

        if (!user) {
          res.status(401).json({ message: 'No such email registered.' });
        } else {
          let passwordMatch = bcrypt.compareSync(loginData.password, user.password);
          
          if (!passwordMatch) {
            return res.status(401).json({ message: 'Password is incorrect. Try again.' });
          } else {
            done(null, user);
            const jwtToken = signToken(user);
            res.status(200).json(jwtToken);
            console.log(`DEBUG: Login without TFA is successful`);
          }
        }

      }

    } else {
      // TODO: when finding user also include the tfa model to see if there is tfa and perform what is needed to proceed
      const loginData = req.body;
      const user = await User.findOne({ where: { email: loginData.email } });
      if (!user) {
        res.status(401).json({ message: 'No such email registered.' });
      } else {
        let passwordMatch = bcrypt.compareSync(loginData.password, user.password);

        if (!passwordMatch) {
          return res.status(401).json({ message: 'Password is incorrect. Try again.' });
        } else {
          if (!req.headers['x-tfa']) {
            console.log(`WARNING: Login was partial without TFA header`);
            res.status(206).json({ message: 'Please enter the AUTH code.' })
          } else {

            let isVerified = speakeasy.totp.verify({
              // This secret variable will either be filled with data from req.body or from the database result... will have to test and find out
              secret: loginData.tfa.secret,
              encoding: 'base32',
              token: req.headers['x-tfa']
            });

            if (isVerified) {
              console.log(`DEBUG: Login with TFA is verified to be successful`);
              done(null, user);
              const jwtToken = signToken(user);
              res.status(200).json({ message: 'Successful 2 factor login.', jwtToken: jwtToken })
            } else {
              res.status(206).json({ message: 'Invalid AUTH code.' })
            }
          }
        }
      }




      
    }

  } catch (error) {
    done(error, false);
  }

}

module.exports = {
  login
}