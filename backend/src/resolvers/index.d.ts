import type { Context } from "../context.js";
export declare const resolvers: {
    Query: {
        users: (parent: any, args: any, ctx: Context) => Promise<{
            id: string;
            name: string;
            email: string;
            password: string;
            imageUrl: string;
            role: import("@prisma/client").$Enums.Role;
        }[]>;
        user: (parent: any, { id }: any, ctx: Context) => Promise<{
            id: string;
            name: string;
            email: string;
            password: string;
            imageUrl: string;
            role: import("@prisma/client").$Enums.Role;
        }[]>;
        posts: (parent: any, args: any, ctx: Context) => Promise<{
            id: string;
            title: string;
            content: string;
            authorId: string;
            createdAt: Date;
        }[]>;
        post: (parent: any, { id }: any, ctx: Context) => Promise<{
            id: string;
            title: string;
            content: string;
            authorId: string;
            createdAt: Date;
        } | null>;
        comments: (parent: any, args: any, ctx: Context) => Promise<{
            id: string;
            authorId: string;
            createdAt: Date;
            text: string;
            postId: string;
        }[]>;
        comment: (parent: any, { id }: any, ctx: Context) => Promise<{
            id: string;
            authorId: string;
            createdAt: Date;
            text: string;
            postId: string;
        } | null>;
    };
    Post: {
        author: (parent: any, args: any, ctx: Context) => Promise<{
            id: string;
            name: string;
            email: string;
            password: string;
            imageUrl: string;
            role: import("@prisma/client").$Enums.Role;
        }[]>;
    };
    Comment: {
        author: (parent: any, args: any, ctx: Context) => Promise<{
            id: string;
            name: string;
            email: string;
            password: string;
            imageUrl: string;
            role: import("@prisma/client").$Enums.Role;
        }[]>;
    };
    Mutation: {
        createUser: (parent: any, { input }: any, ctx: Context) => Promise<{
            id: string;
            name: string;
            email: string;
            password: string;
            imageUrl: string;
            role: import("@prisma/client").$Enums.Role;
        }>;
        login: (parent: any, { input }: any, ctx: Context) => Promise<{
            token: string;
            user: {
                id: string;
                name: string;
                email: string;
                password: string;
                imageUrl: string;
                role: import("@prisma/client").$Enums.Role;
            };
        }>;
        createPost: (parent: any, { input }: any, ctx: Context) => Promise<{
            id: string;
            title: string;
            content: string;
            authorId: string;
            createdAt: Date;
        }>;
        createComment: (parent: any, { input }: any, ctx: Context) => Promise<{
            id: string;
            authorId: string;
            createdAt: Date;
            text: string;
            postId: string;
        }>;
    };
};
//# sourceMappingURL=index.d.ts.map