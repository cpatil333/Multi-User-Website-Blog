import { gql } from "@apollo/client";

export const USER_LOGIN = gql`
  mutation ($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        email
        name
        role
      }
    }
  }
`;

export const USER_REGISTER = gql`
  mutation ($input: UserInput!) {
    createUser(input: $input) {
      id
      name
      email
      imageUrl
      role
    }
  }
`;

export const CREATE_POST = gql`
  mutation ($input: PostInput!) {
    createPost(input: $input) {
      id
      title
      content
      author {
        name
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation ($input: CommentInput!) {
    createComment(input: $input) {
      id
      text
      author {
        name
      }
    }
  }
`;
