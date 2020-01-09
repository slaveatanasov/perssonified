import { RequestHandler } from 'express';
import * as bcrypt from 'bcrypt';
import * as JWT from 'jsonwebtoken';

import { secretOrKey } from '../config';
import User from '../models/user.model';

const findAllUsers: RequestHandler = async (req, res) => {
	let users = await User.findAll();
	res.send(users);
}

const getCurrentUser: RequestHandler = async (req, res) => {
	const jwtToken: any = req.headers.authorization;
	const decodedJwt: any = JWT.verify(jwtToken, secretOrKey);

	await User.findOne({ where: { id: decodedJwt.id }, attributes: { exclude: ['password', 'tfaSecret', 'tfaTempSecret'] } })
		.then(user => {
			res.send(user)
		});
}

const registerUser: RequestHandler = async (req, res) => {
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
							tfaEnabled: false,
							createdAt: Date.now()
						}
						bcrypt.genSalt(10, (_err, salt) => {
							bcrypt.hash(newUser.password, salt, (err, hash) => {
								if (err) throw err;
								newUser.password = hash;
								User.create(newUser)
									.then(_ => {
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

const updateUser: RequestHandler = async (req, res) => {
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

const getUserById: RequestHandler = async (req, res) => {
	if (req.params.id) {
		let user = await User.findOne({ where: { id: req.params.id } });
		res.send(user);
	} else {
		console.log('Unsuccessful fetching of user.')
	}
}

const getUserByEmail: RequestHandler = async (req, res) => {
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