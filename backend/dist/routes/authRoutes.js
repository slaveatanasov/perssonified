"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController = require('../controllers/AuthController');
const userController = require('../controllers/UserController');
const router = express_1.Router();
router.post('/register', userController.registerUser);
router.post('/login', authController.login);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map