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

const login = async (req: Request, res: Response, done: any) => {
  try {
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
        const token = signToken(user);
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