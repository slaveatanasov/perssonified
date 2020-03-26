import { RequestHandler } from 'express';
import * as bcrypt from 'bcrypt';
import * as JWT from 'jsonwebtoken';

import { secretOrKey } from '../config';
import User from '../models/user.model';

export const getCurrentUser: RequestHandler = async (req, res) => {
	const token: any = req.headers.authorization;
	const decodedJWT: any = JWT.verify(token, secretOrKey);

	await User.findOne({ where: { id: decodedJWT.id }, attributes: { exclude: ['password', 'tfaSecret', 'tfaTempSecret'] } })
		.then(user => {
			res.status(200).send(user);
		})
		.catch(error => {
			res.send(error)
		});
}

export const registerUser: RequestHandler = async (req, res) => {
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
			await User.findOne({ where: { email } })
				.then(user => {
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
						};
						bcrypt.genSalt(10, (_err, salt) => {
							bcrypt.hash(newUser.password, salt, (err, hash) => {
								if (err) throw err;
								newUser.password = hash;
								User.create(newUser)
									.then(() => {
										res.status(200).json({ message: 'User successfully registered.' });
									})
									.catch(err => {
										errors.push(err);
										res.send(errors);
									});
							})
						})
					}
				})
		}
	} catch (err) {
		res.send(err);
	}
}

export const updateUser: RequestHandler = async (req, res) => {
	const token: any = req.headers.authorization;
	const decodedJWT: any = JWT.verify(token, secretOrKey);
	let reqValues = req.body;
	let updatedValues = {
		...reqValues,
		updatedAt: Date.now()
	};

	let curUser = await User.findOne({ where: { id: decodedJWT.id } });

	if (curUser?.username !== reqValues.username || curUser?.email !== reqValues.email) {
		await User.update(updatedValues, { where: { id: decodedJWT.id } })
			.then(() => res.json({updated: true}))
			.catch(error => res.send(error))
	} else {
		res.json({updated: false});
	}

}

export const getUserById: RequestHandler = async (req, res) => {
	if (req.params.id) {
		let user = await User.findOne({ where: { id: req.params.id } });
		if (user) {
			res.send(user);
		} else {
			res.send('Error getting user by ID.');
		}
	} else {
		res.send('Error getting user.');
	}
}

export const getUserByEmail: RequestHandler = async (req, res) => {
	if (req.params.email) {
		let user = await User.findOne({ where: { email: req.params.email } });
		if (user) {
			res.send(user);
		} else {
			res.send('Error getting user by email.');
		}
	} else {
		res.send('Error getting user.');
	}
}