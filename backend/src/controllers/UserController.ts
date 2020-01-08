import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import * as JWT from 'jsonwebtoken';

import { secretOrKey } from '../config';
import User from '../models/user.model';

const findAllUsers = async (req: Request, res: Response) => {
	let users = await User.findAll();
	res.send(users);
}

const getCurrentUser = async (req: Request, res: Response) => {
	const jwtToken: any = req.headers.authorization;
	const decodedJwt: any = JWT.verify(jwtToken, secretOrKey);

	await User.findOne({ where: { id: decodedJwt.id } })
		.then(user => {
			console.log(typeof user!.dataValues);
			res.send(user!.dataValues)
		});
}

const registerUser = async (req: Request, res: Response) => {
	try {
		const { username, email, password, passwordConfirm } = req.body;
		let errors: any[] = [];

		if (!username || !email || !password || !passwordConfirm) {
			errors.push({ message: "Please fill in all fields." });
		}
		if (password !== passwordConfirm) {
			errors.push({ message: "Passwords do not match." });
		}
		if (password.length < 8) {
			errors.push({ message: "Password must be at least 8 characters." });
		}
		if (errors.length > 0) {
			res.send(errors);
		} else {
			await User.findOne({ where: { email: email } })
				.then(async user => {
					if (user) {
						errors.push({ message: "Email is already registered." });
						res.send(errors);
					} else {
						const newUser = {
							username,
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
										res.status(200).json({ message: 'User successfully registered.' });
									})
									.catch(err => errors.push(err));
							})
						})
					}
				})
		}
	} catch (err) {
		res.send(err);
	}
}

const updateUser = async (req: Request, res: Response) => {
	const jwtToken: any = req.headers.authorization;
	const decodedJwt: any = JWT.verify(jwtToken, secretOrKey);

	let user = await User.findOne({ where: { id: decodedJwt.id } })
		.then(user => res.send(user));

	if (user) {
		console.log('User:');
		console.log(user);
	} else {
		return;
	}
}

const getUserById = async (req: Request, res: Response) => {
	if (req.params.id) {
		let user = await User.findOne({ where: { id: req.params.id } });
		res.send(user);
	} else {
		console.log('Unsuccessful fetching of user.')
	}
}

const getUserByEmail = async (req: Request, res: Response) => {
	if (req.params.email) {
		let user = await User.findOne({ where: { email: req.params.email } });
		res.send(user);
	} else {
		console.log('Unsuccessful fetching of user.')
	}
}

module.exports = {
	findAllUsers,
	registerUser,
	getUserById,
	getUserByEmail,
	getCurrentUser,
	updateUser
}