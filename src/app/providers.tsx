"use client";

import { DEFAULT_QUERY_RETRY } from "@/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { ThemeProvider } from "next-themes";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apollo/client";
// We can add "user" props to get it from server on first load and pass it to AuthProvider

type ProvidersProps = {
  children: React.ReactNode;
};
export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 20 * 1000,
            retry: DEFAULT_QUERY_RETRY,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={client}>
        <ThemeProvider>
          {children}
          {process.env.NEXT_PUBLIC_NODE_ENV === "development" && (
            <ReactQueryDevtools
              buttonPosition="bottom-right"
              initialIsOpen={false}
            />
          )}
        </ThemeProvider>
      </ApolloProvider>
    </QueryClientProvider>
  );
}
