import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';

import * as bcrypt from 'bcrypt';
import * as JWT from 'jsonwebtoken';

const signToken = (user: User) => {
    return JWT.sign({
        id: user.id,
        iad: Date.now,
        expiresIn: "24h"
    }, 'secret');
}

// const login = async (req: Request, res: Response) => {
//     const data = req.body;
//     try {
//         res.json(data)
//         console.log(data);
//     } catch (err) {
//         console.log(err)
//     }
// }

const login = async (req: Request, res: Response, done: any) => {
    console.log(req.body);
    try {
        const userLogin = req.body;
        const user = await User.findOne({where: {email: req.body.email}});
        console.log(user);
        if(!user) {
          res.send('no user')
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(userLogin.password, salt, (err, hash) => {
                if (err) throw err;
                userLogin.password = hash;
            })
        })  
    
         let passwordMatch = bcrypt.compare(userLogin.password, user.password);
         if (!passwordMatch) {
          return done(null, false);
         } else {
           done(null, user)
           const token = signToken(userLogin)
           res.status(200).json(token);
         }
        }
      } catch (error) {
        done(error, false);    
      }

}

module.exports = {
    login
}