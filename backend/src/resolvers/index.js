import bcrypt from "bcrypt";
import { sign } from "../auth/auth.js";
import { stringify } from "querystring";
function requiredRole(ctx, roles) {
    if (!ctx.user || !roles.includes(ctx.user.role)) {
        throw new Error("Not Authorized!");
    }
}
export const resolvers = {
    Query: {
        users: async (parent, args, ctx) => {
            return ctx.prisma.user.findMany();
        },
        user: async (parent, { id }, ctx) => {
            const userId = stringify(id);
            return ctx.prisma.user.findMany({
                where: { id: userId },
            });
        },
        posts: async (parent, args, ctx) => {
            return ctx.prisma.post.findMany();
        },
        post: async (parent, { id }, ctx) => {
            const postId = id;
            return ctx.prisma.post.findUnique({
                where: { id: postId },
            });
        },
        comments: async (parent, args, ctx) => {
            return ctx.prisma.comment.findMany();
        },
        comment: async (parent, { id }, ctx) => {
            const commentId = id;
            return ctx.prisma.comment.findUnique({
                where: { id: commentId },
            });
        },
    },
    Post: {
        author: async (parent, args, ctx) => {
            return ctx.prisma.user.findMany({
                where: { id: parent.authorId },
            });
        },
    },
    Comment: {
        author: async (parent, args, ctx) => {
            return ctx.prisma.user.findMany({
                where: { id: parent.authorId },
            });
        },
    },
    Mutation: {
        createUser: async (parent, { input }, ctx) => {
            const user = await ctx.prisma.user.findFirst({
                where: { email: input.email },
            });
            if (user) {
                throw new Error("Email already exist..!");
            }
            const hassedPasword = await bcrypt.hash(input.password, 10);
            return await ctx.prisma.user.create({
                data: {
                    name: input.name,
                    email: input.email,
                    password: hassedPasword,
                    imageUrl: input.imageUrl,
                    role: input.role,
                },
            });
        },
        login: async (parent, { input }, ctx) => {
            const user = await ctx.prisma.user.findFirst({
                where: { email: input.email },
            });
            if (!user) {
                throw new Error("Email does not exist!");
            }
            const mathedPassword = await bcrypt.compare(input.password, user.password);
            if (!mathedPassword) {
                throw new Error("Email and password does not matched!");
            }
            return {
                token: sign({ id: user.id, name: user.name, role: user.role }),
                user,
            };
        },
        createPost: async (parent, { input }, ctx) => {
            requiredRole(ctx, ["USER", "ADMIN"]);
            return ctx.prisma.post.create({
                data: {
                    ...input,
                },
            });
        },
        createComment: async (parent, { input }, ctx) => {
            requiredRole(ctx, ["USER", "ADMIN"]);
            return ctx.prisma.comment.create({
                data: {
                    ...input,
                },
            });
        },
    },
};
//# sourceMappingURL=index.js.map