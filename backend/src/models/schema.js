import { gql } from "apollo-server";
export const typeDefs = gql `
  enum Role {
    USER
    ADMIN
  }

  type User {
    id: ID!
    name: String
    email: String
    password: String
    imageUrl: String
    role: Role!
    posts: [Post!]!
    Comment: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    comments: [Comment!]
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
    imageUrl: String!
    role: Role
  }
  input PostInput {
    title: String!
    content: String!
    authorId: ID!
  }
  input CommentInput {
    text: String!
    postId: ID!
    authorId: ID!
  }

  type AuthPayload {
    token: String!
    user: User!
  }
  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    users: [User!]
    user(id: ID!): User!
    posts: [Post!]
    post(id: ID!): Post
    comments: [Comment!]
    comment(id: ID!): Comment!
  }

  type Mutation {
    createUser(input: UserInput!): User!
    login(input: LoginInput!): AuthPayload!
    createPost(input: PostInput!): Post!
    createComment(input: CommentInput!): Comment!
  }
`;
//# sourceMappingURL=schema.js.map