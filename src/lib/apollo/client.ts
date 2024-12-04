"use client";

import { ApolloClient, from, InMemoryCache } from "@apollo/client";
import type { ApolloLink, NormalizedCacheObject } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { uploadLink } from "./links";
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import { sha256 } from "@noble/hashes/sha256";
import { getCookie } from "../get-cookie";

export const __ssrMode__: boolean = typeof window === "undefined";

const authLink = setContext(async (_, { headers }) => {
  const token = await getCookie();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const linkChain = createPersistedQueryLink({
  sha256: (query) =>
    Buffer.from(sha256(new TextEncoder().encode(query))).toString("hex"),
  useGETForHashedQueries: true,
});

const createClient = (
  link: ApolloLink
): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    credentials: "include",
    cache: new InMemoryCache(),
    link: from([authLink, linkChain, link]),
    ssrMode: __ssrMode__,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "no-cache",
        errorPolicy: "all",
      },
      query: {
        fetchPolicy: "no-cache",
        errorPolicy: "all",
      },
      mutate: {
        errorPolicy: "all",
      },
    },
  });
};

export const client = createClient(uploadLink);
