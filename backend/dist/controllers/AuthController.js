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
const speakeasy = __importStar(require("speakeasy"));
const user_model_1 = __importDefault(require("../models/user.model"));
const signToken = (user) => {
    return JWT.sign({
        username: user.username,
        id: user.id,
        email: user.email,
        tfaEnabled: user.tfaEnabled,
        iat: Math.floor(Date.now() / 1000),
        expiresIn: "12h"
    }, config_1.secretOrKey);
};
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_model_1.default.findOne({ where: { email } });
        if (email && password) {
            if (user) {
                if (bcrypt.compareSync(password, user.password)) {
                    if (!user.tfaEnabled) {
                        const jwtToken = signToken(user);
                        res.send({
                            status: 200,
                            accessToken: jwtToken
                        });
                    }
                    else {
                        if (!req.body['tfaToken']) {
                            return res.send({
                                "status": 206,
                                "message": "Please enter the Auth Code."
                            });
                        }
                        let isVerified = speakeasy.totp.verify({
                            secret: user.tfaSecret,
                            encoding: 'base32',
                            token: req.body['tfaToken']
                        });
                        if (isVerified) {
                            const jwtToken = signToken(user);
                            res.send({
                                status: 200,
                                message: "Successful two-factor verification login.",
                                accessToken: jwtToken
                            });
                        }
                        else {
                            res.send({
                                status: 401,
                                message: "Two-factor verification failed. Please try again.",
                            });
                        }
                    }
                }
                else {
                    return res.status(401).json({ message: 'Password is incorrect. Try again.' });
                }
            }
            else {
                res.status(401).json({ message: 'No such email registered.' });
            }
        }
        else {
            res.status(401).json({ message: 'All fields are required.' });
        }
    }
    catch (error) {
        throw error;
    }
});
module.exports = {
    login
};
//# sourceMappingURL=AuthController.js.map