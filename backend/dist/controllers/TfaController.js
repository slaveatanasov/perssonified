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
const JWT = __importStar(require("jsonwebtoken"));
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const config_1 = require("../config");
const user_model_1 = __importDefault(require("../models/user.model"));
const tfaSetup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jwtToken = req.headers.authorization;
    const decodedJwt = JWT.verify(jwtToken, config_1.secretOrKey);
    const secret = yield speakeasy.generateSecret({
        length: 10,
        name: decodedJwt.username,
        issuer: decodedJwt.username
    });
    let url = yield speakeasy.otpauthURL({
        secret: secret.base32,
        label: decodedJwt.email,
        issuer: 'peRSSonified',
        encoding: 'base32'
    });
    QRCode.toDataURL(url, (err, dataURL) => {
        user_model_1.default.update({ tfaTempSecret: secret.base32 }, { where: { id: decodedJwt.id } });
        return res.json({
            message: 'Two-factor authentication needs to be verified.',
            tempSecret: secret.base32,
            dataURL,
            tfaURL: secret.otpauth_url
        });
    });
});
const tfaFetch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jwtToken = req.headers.authorization;
    const decodedJwt = JWT.verify(jwtToken, config_1.secretOrKey);
    yield user_model_1.default.findOne({ where: { id: decodedJwt.id } })
        .then(result => res.json(result ? result : null));
});
const tfaDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jwtToken = req.headers.authorization;
    const decodedJwt = JWT.verify(jwtToken, config_1.secretOrKey);
    yield user_model_1.default.update({ tfaEnabled: false, tfaTempSecret: null, tfaSecret: null }, { where: { id: decodedJwt.id } })
        .then(updatedUser => console.log(updatedUser));
    res.send({
        "message": "Two-factor authentication disabled successfully."
    });
});
const tfaVerify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jwtToken = req.headers.authorization;
    const decodedJwt = JWT.verify(jwtToken, config_1.secretOrKey);
    const user = yield user_model_1.default.findOne({ where: { id: decodedJwt.id } });
    let tempSecret = user.tfaTempSecret;
    let isVerified = speakeasy.totp.verify({
        secret: tempSecret,
        encoding: 'base32',
        token: req.body.token.authCode
    });
    if (isVerified) {
        yield user_model_1.default.update({ tfaEnabled: true, tfaSecret: tempSecret, tfaTempSecret: null }, { where: { id: decodedJwt.id } });
        return res.send({
            "status": 200,
            "message": "Two-factor authentication is enabled successfully."
        });
    }
    return res.send({
        "status": 403,
        "message": "Invalid Auth Code, verification failed. Please verify the system Date and Time"
    });
});
module.exports = {
    tfaSetup,
    tfaFetch,
    tfaDelete,
    tfaVerify
};
//# sourceMappingURL=TfaController.js.map