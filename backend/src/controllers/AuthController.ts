import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';

import * as bcrypt from 'bcrypt';
import * as JWT from 'jsonwebtoken';

const speakeasy = require('speakeasy');

// map with temp access tokens [UserId] = tempToken

const signToken = (user: User) => {
  return JWT.sign({
    username: user.username,
    id: user.id,
    tfaEnabled: user.tfaEnabled,
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

// EXAMPLE:
// https://github.com/ThalKod/node-2fa

const tfaLogin = async (req: Request, res: Response) => {
  // req.body kje ima tempToken, userId, TFA Token
  // ako e ok pusti mu access token
  console.log(req.params);
  
  // let token = req.body.token;
  // let user = await User.findOne({ where: { email } });

}

// const login = async (req: Request, res: Response, done: any) => {
//   try {
//     console.log(`DEBUG: Received login request`);
//     if (req.body) {
      
//       if(!req.body.tfa || !req.body.tfa.secret) {

//         const loginData = req.body;
//         const user = await User.findOne({ where: { email: loginData.email } });

//         if (!user) {
//           res.status(401).json({ message: 'No such email registered.' });
//         } else {
//           let passwordMatch = bcrypt.compareSync(loginData.password, user.password);
          
//           if (!passwordMatch) {
//             return res.status(401).json({ message: 'Password is incorrect. Try again.' });
//           } else {
//             done(null, user);
//             const jwtToken = signToken(user);
//             res.status(200).json(jwtToken);
//             console.log(`DEBUG: Login without TFA is successful`);
//           }
//         }

//       }

//     } else {
//       // TODO: when finding user also include the tfa model to see if there is tfa and perform what is needed to proceed
//       const loginData = req.body;
//       const user = await User.findOne({ where: { email: loginData.email } });
//       if (!user) {
//         res.status(401).json({ message: 'No such email registered.' });
//       } else {
//         let passwordMatch = bcrypt.compareSync(loginData.password, user.password);

//         if (!passwordMatch) {
//           return res.status(401).json({ message: 'Password is incorrect. Try again.' });
//         } else {
//           if (!req.headers['x-tfa']) {
//             console.log(`WARNING: Login was partial without TFA header`);
//             res.status(206).json({ message: 'Please enter the AUTH code.' })
//           } else {

//             let isVerified = speakeasy.totp.verify({
//               // This secret variable will either be filled with data from req.body or from the database result... will have to test and find out
//               secret: loginData.tfa.secret,
//               encoding: 'base32',
//               token: req.headers['x-tfa']
//             });

//             if (isVerified) {
//               console.log(`DEBUG: Login with TFA is verified to be successful`);
//               done(null, user);
//               const jwtToken = signToken(user);
//               res.status(200).json({ message: 'Successful 2 factor login.', jwtToken: jwtToken })
//             } else {
//               res.status(206).json({ message: 'Invalid AUTH code.' })
//             }
//           }
//         }
//       }




      
//     }

//   } catch (error) {
//     done(error, false);
//   }

// }

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(`DEBUG: Received login request`);
    let email = req.body.email;
    let password = req.body.password;
    let token = req.body.token;
    let user = await User.findOne({ where: { email } });

    if (email && password) {
      if (user) {
        if (await bcrypt.compareSync(password, user.password)) {

          if (!user.tfaEnabled) {

            const jwtToken = signToken(user);
            res.status(200).json(jwtToken);
            console.log(`DEBUG: Login without TFA is successful`);

          } else {
            // For now send password, email and TFA token all together just for testing
            // // tfaAccessToken = generiraj random string uuid, guid, ...
            // res.send({
            //   // tfaRedirect:true
            //   // tfaAccessToken: tfaAccessToken,
            //   // userId:user.id
            // })

            //This works for testing only...
            // let isVerified = speakeasy.totp.verify({
            //   secret: user.twoFactorSecret,
            //   encoding: 'base32',
            //   token: token
            // });
            // if (isVerified) {
            //   console.log(`DEBUG: Login with TFA is verified to be successful`);
            //   return res.send({
            //     "status": 200,
            //     "message": "success"
            // });
            // }
            
            res.send({
              tfaRedirect: true,
              userId: user.id,
              tfaSecret: user.twoFactorSecret
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