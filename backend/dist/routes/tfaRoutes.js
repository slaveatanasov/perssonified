"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const tfaController = require('../controllers/TfaController');
const router = express_1.Router();
router.post('/setup', passport_1.default.authenticate('jwt', { session: false }), tfaController.tfaSetup);
router.get('/setup', passport_1.default.authenticate('jwt', { session: false }), tfaController.tfaFetch);
router.post('/verify', passport_1.default.authenticate('jwt', { session: false }), tfaController.tfaVerify);
router.post('/delete', passport_1.default.authenticate('jwt', { session: false }), tfaController.tfaDelete);
exports.default = router;
//# sourceMappingURL=tfaRoutes.js.map