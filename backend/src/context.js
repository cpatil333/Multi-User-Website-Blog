"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = void 0;
const client_1 = require("@prisma/client");
const auth_1 = require("../src/auth/auth");
const prisma = new client_1.PrismaClient();
const createContext = ({ req }) => ({
    prisma,
    user: (0, auth_1.getUserFromReq)(req),
});
exports.createContext = createContext;
