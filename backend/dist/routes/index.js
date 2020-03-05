"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoutes_1 = __importDefault(require("./authRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const tfaRoutes_1 = __importDefault(require("./tfaRoutes"));
const router = express_1.Router();
router.get('/', (req, res, next) => {
    res.send('Express works...');
});
router.use('/auth', authRoutes_1.default);
router.use('/user', userRoutes_1.default);
router.use('/tfa', tfaRoutes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map