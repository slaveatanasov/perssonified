import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';

const findAllUsers = async (req: Request, res: Response) => {
    let users = await User.findAll();
    console.log(users)
    res.send(users);
}

const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create({
            email: req.body.email,
            password: req.body.password,
            createdAt: Date.now()
        });
        res.json(user)
    } catch (err) {
        console.log(err)
    }
}

const getUserById = async (req: Request, res: Response) => {
    let user = await User.findOne({where: {id: 8}});
    console.log(user)
    res.send(user);
}

module.exports = {
    findAllUsers,
    createUser,
    getUserById
}