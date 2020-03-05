"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcrypt"));
const JWT = __importStar(require("jsonwebtoken"));
const config_1 = require("../config");
const user_model_1 = __importDefault(require("../models/user.model"));
const findAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let users = yield user_model_1.default.findAll();
    res.send(users);
});
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jwtToken = req.headers.authorization;
    const decodedJwt = JWT.verify(jwtToken, config_1.secretOrKey);
    yield user_model_1.default.findOne({ where: { id: decodedJwt.id }, attributes: { exclude: ['password', 'tfaSecret', 'tfaTempSecret'] } })
        .then(user => {
        res.send(user);
    });
});
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, passwordConfirm } = req.body;
        let errors = [];
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
        }
        else {
            yield user_model_1.default.findOne({ where: { email: email } })
                .then((user) => __awaiter(void 0, void 0, void 0, function* () {
                if (user) {
                    errors.push({ message: "Email is already registered." });
                    res.send(errors);
                }
                else {
                    const newUser = {
                        username,
                        email,
                        password,
                        tfaEnabled: false,
                        createdAt: Date.now()
                    };
                    bcrypt.genSalt(10, (_err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err)
                                throw err;
                            newUser.password = hash;
                            user_model_1.default.create(newUser)
                                .then(_ => {
                                res.status(200).json({ message: 'User successfully registered.' });
                            })
                                .catch(err => errors.push(err));
                        });
                    });
                }
            }));
        }
    }
    catch (err) {
        res.send(err);
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jwtToken = req.headers.authorization;
    const decodedJwt = JWT.verify(jwtToken, config_1.secretOrKey);
    let user = yield user_model_1.default.findOne({ where: { id: decodedJwt.id } })
        .then(user => res.send(user));
    if (user) {
        console.log('User:');
        console.log(user);
    }
    else {
        return;
    }
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.id) {
        let user = yield user_model_1.default.findOne({ where: { id: req.params.id } });
        res.send(user);
    }
    else {
        console.log('Unsuccessful fetching of user.');
    }
});
const getUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.email) {
        let user = yield user_model_1.default.findOne({ where: { email: req.params.email } });
        res.send(user);
    }
    else {
        console.log('Unsuccessful fetching of user.');
    }
});
module.exports = {
    findAllUsers,
    registerUser,
    getUserById,
    getUserByEmail,
    getCurrentUser,
    updateUser
};
//# sourceMappingURL=UserController.js.map