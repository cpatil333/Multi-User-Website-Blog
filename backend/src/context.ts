import { PrismaClient } from "@prisma/client";
import { JwtUser, getUserFromReq } from "../src/auth/auth";

const prisma = new PrismaClient();

export type Context = {
  prisma: PrismaClient;
  user: JwtUser | null;
};

export const createContext = ({ req }: any): Context => ({
  prisma,
  user: getUserFromReq(req),
});
