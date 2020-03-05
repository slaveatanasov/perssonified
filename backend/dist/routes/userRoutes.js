"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const userController = require('../controllers/UserController');
const router = express_1.Router();
router.get('/', passport_1.default.authenticate('jwt', { session: false }), userController.findAllUsers);
router.put('/', passport_1.default.authenticate('jwt', { session: false }), userController.updateUser);
router.get('/getCurrentUser', passport_1.default.authenticate('jwt', { session: false }), userController.getCurrentUser);
router.get('/getById/:id', passport_1.default.authenticate('jwt', { session: false }), userController.getUserById);
router.get('/getByEmail/:email', passport_1.default.authenticate('jwt', { session: false }), userController.getUserByEmail);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map