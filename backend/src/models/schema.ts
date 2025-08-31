import { gql } from "@apollo/client";

export const typeDefs = gql`
  enum Role {
    USER
    ADMIN
  }

  type User {
    id: ID!
    name: String
    email: String
    password: String
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

  type Query {
    users: [User!]
    posts: [Post!]
    post(id: ID!): Post
  }

  type Mutation {
    createUser(input: UserInput!): User!
    createPost(input: PostInput!): Post!
    createComment(input: CommentInput!): Comment!
  }
`;
