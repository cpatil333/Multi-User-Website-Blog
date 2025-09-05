import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query {
    users {
      id
      name
      email
      role
      imageUrl
    }
  }
`;

export const GET_POSTS = gql`
  query {
    posts {
      id
      title
      content
    }
  }
`;
