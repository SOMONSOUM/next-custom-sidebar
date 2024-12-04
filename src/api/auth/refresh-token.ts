"use server";

import { client } from "@/lib/apollo/server";
import { ErrorResponse } from "@/types/error";
import { RefreshTokenDocument } from "@/generated/graphql-types";
import { cookies } from "next/headers";

export const refreshNewToken = async (refreshToken: string) => {
  const cookieStore = await cookies();

  try {
    const { data, errors } = await client.mutate({
      mutation: RefreshTokenDocument,
      variables: {
        input: {
          refreshToken: refreshToken,
        },
      },
    });

    if (errors) {
      const error = errors[0] as ErrorResponse;
      return {
        error: error,
        data: null,
      };
    }

    cookieStore.set("accessToken", data?.refreshToken?.accessToken, {
      path: "/",
      maxAge: 60 * 60 * 1,
      sameSite: "lax",
      httpOnly: true,
      secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
    });

    cookieStore.set("refreshToken", data?.refreshToken?.refreshToken, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
      httpOnly: true,
      secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
    });

    return {
      error: null,
      data: {
        accessToken: data?.refreshToken?.accessToken,
        refreshToken: data?.refreshToken?.refreshToken,
      },
    };
  } catch (error: any) {
    return {
      error: error?.message,
      data: null,
    };
  }
};
