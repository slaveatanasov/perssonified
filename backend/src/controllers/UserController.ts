import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';
import * as bcrypt from 'bcrypt';

const findAllUsers = async (req: Request, res: Response) => {
    let users = await User.findAll();
    console.log(users)
    res.send(users);
}

const registerUser = async (req: Request, res: Response) => {
    try {
        const { email, password, passwordConfirm } = req.body;
        let errors: any[] = [];

        if (!email || !password || !passwordConfirm) {
            errors.push({message: "Please fill in all fields."})
        }
        if (password !== passwordConfirm) {
            errors.push({message: "Passwords do not match."})     
        }
        if (password.length < 8) {
            errors.push({message: "Passwords must be at least 8 characters."})     
        }
        if (errors.length > 0 ) {
            res.send(errors);
        } else {
            await User.findOne({ where: {email: email}})
                .then(async user => {
                    if (user) {
                        errors.push({message: "Email is already registered."});
                        res.send(errors);
                    } else {
                        const newUser = await {
                            email,
                            password,
                            createdAt: Date.now()
                        }
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) throw err;
                                newUser.password = hash;
                                User.create(newUser)
                                .then(user => {
                                    res.send(user)
                                })
                                .catch(err => console.log(err))
                            })
                        })
                        // const user = await User.create({
                        //     email,
                        //     password,
                        //     passwordConfirm,
                        //     createdAt: Date.now()
                        // });
                        // res.send(user);
                    }
                })
        }
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
    registerUser,
    getUserById
}