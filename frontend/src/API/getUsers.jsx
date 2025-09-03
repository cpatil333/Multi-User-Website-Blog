import React from "react";
import { client } from "../apollo/ApolloClient";
import { GET_USERS } from "../apollo/Query";

export async function getUsers() {
  try {
    const { data } = await client.query({
      query: GET_USERS,
      fetchPolicy: "network-only",
    });
    return data;
  } catch (error) {
    throw new Response("Fetching data error, ", { status: 500 });
  }
}
