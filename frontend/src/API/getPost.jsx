import React from "react";
import { client } from "../apollo/ApolloClient";
import { GET_POST } from "../apollo/Query";

export async function getPost({ params }) {
  const postId = params.id;
  console.log(postId);
  try {
    const { data } = await client.query({
      query: GET_POST,
      variables: {
        postId: postId,
      },
    });
    return data;
  } catch (error) {
    throw new Response("Fetching data error,", { status: 500 });
  }
}
