import { Context } from "../../src/context";
import bcrypt from "bcrypt";
import { sign } from "../auth/auth.js";

function requiredRole(ctx: Context, roles: String[]) {
  if (!ctx.user || !roles.includes(ctx.user.role)) {
    throw new Error("Not Authorized!");
  }
}

export const resolvers = {
  Query: {
    users: async (parent: any, args: any, ctx: Context) => {
      return ctx.prisma.user.findMany();
    },

    posts: async (parent: any, args: any, ctx: Context) => {
      return ctx.prisma.post.findMany();
    },
  },

  Mutation: {},
};
