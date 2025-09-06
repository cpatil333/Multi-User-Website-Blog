import { client } from "../apollo/ApolloClient";
import { GET_POSTS } from "../apollo/Query";

export async function getPosts() {
  try {
    const { data } = await client.query({
      query: GET_POSTS,
      fetchPolicy: "network-only",
    });
    return data;
  } catch (error) {
    throw new Response("Fetching data error,", { status: 500 });
  }
}
