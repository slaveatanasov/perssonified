"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = require("./passport");
const sequelize_1 = require("./sequelize");
sequelize_1.sequelize.models;
const index_1 = __importDefault(require("./routes/index"));
const app = express_1.default();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors_1.default());
app.use(passport_1.passportHandler);
app.use('/api', index_1.default);
app.listen(port, () => console.log(`Server started on port ${port}.`));
//# sourceMappingURL=index.js.map