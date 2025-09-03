import type { Context } from "../context.js";
import bcrypt from "bcrypt";
import { sign } from "../auth/auth.js";
import { stringify } from "querystring";

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

    user: async (parent: any, { id }: any, ctx: Context) => {
      const userId = stringify(id);
      return ctx.prisma.user.findMany({
        where: { id: userId },
      });
    },

    posts: async (parent: any, args: any, ctx: Context) => {
      return ctx.prisma.post.findMany();
    },

    post: async (parent: any, { id }: any, ctx: Context) => {
      const postId = id;
      return ctx.prisma.post.findUnique({
        where: { id: postId },
      });
    },

    comments: async (parent: any, args: any, ctx: Context) => {
      return ctx.prisma.comment.findMany();
    },

    comment: async (parent: any, { id }: any, ctx: Context) => {
      const commentId = id;
      return ctx.prisma.comment.findUnique({
        where: { id: commentId },
      });
    },
  },

  Mutation: {
    createUser: async (parent: any, { input }: any, ctx: Context) => {
      const user = await ctx.prisma.user.findFirst({
        where: { email: input.email },
      });
      if (user) {
        throw new Error("Email already exist..!");
      }
      const hassedPasword = await bcrypt.hash(input.password, 10);
      return await ctx.prisma.user.create({
        data: {
          ...input,
          password: hassedPasword,
        },
      });
    },

    login: async (parent: any, { input }: any, ctx: Context) => {
      const user = await ctx.prisma.user.findFirst({
        where: { email: input.email },
      });
      if (!user) {
        throw new Error("Email does not exist!");
      }
      const mathedPassword = await bcrypt.compare(
        input.password,
        user.password
      );
      if (!mathedPassword) {
        throw new Error("Email and password does not matched!");
      }
      return {
        token: sign({ id: user.id, name: user.name, role: user.role }),
        user,
      };
    },

    createPost: async (parent: any, { input }: any, ctx: Context) => {
      requiredRole(ctx, ["USER", "ADMIN"]);
      return ctx.prisma.post.create({
        data: {
          ...input,
        },
      });
    },

    createComment: async (parent: any, { input }: any, ctx: Context) => {
      requiredRole(ctx, ["USER", "ADMIN"]);
      return ctx.prisma.comment.create({
        data: {
          ...input,
        },
      });
    },
  },
};
