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
