"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sign = sign;
exports.getUserFromReq = getUserFromReq;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET = process.env.SECRET_KEY;
function sign(user) {
    return jsonwebtoken_1.default.sign(user, SECRET, { expiresIn: "7d" });
}
function getUserFromReq(req) {
    var _a;
    const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    if (!token)
        return null;
    try {
        return jsonwebtoken_1.default.verify(token, SECRET);
    }
    catch (error) {
        return null;
    }
}
