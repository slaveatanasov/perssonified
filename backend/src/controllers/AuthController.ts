import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';

const login = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        res.json(data)
        console.log(data);
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    login
}