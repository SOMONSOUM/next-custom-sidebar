/* eslint-disable @typescript-eslint/no-explicit-any */

declare namespace NodeJS {
  interface ProcessEnv {
    // Add your environment variables here
    NEXT_PUBLIC_NODE_ENV: "development" | "testing" | "production";
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_ACCESS_TOKEN_SECRET: string;
    NEXT_PUBLIC_REFRESH_TOKEN_SECRET: string;
    NEXT_PUBLIC_BAKONG_TOKEN: string;
  }
}
