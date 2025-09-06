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

export const GET_COMMENT_POSTS = gql`
  query {
    posts {
      id
      title
      content
    }
  }
`;
export const GET_POSTS = gql`
  query {
    posts {
      id
      title
      content
      author {
        name
      }
      comments {
        id
        text
        author {
          name
        }
      }
    }
  }
`;

export const GET_POST = gql`
  query ($postId: ID!) {
    post(id: $postId) {
      id
      title
      content
      author {
        name
      }
      comments {
        id
        text
        author {
          name
        }
      }
    }
  }
`;
