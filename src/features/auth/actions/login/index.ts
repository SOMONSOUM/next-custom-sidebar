"use server";

import { LoginDocument, LoginResponse } from "@/generated/graphql-types";
import { client } from "@/lib/apollo/server";
import { ErrorResponse } from "@/types/error";
import { GraphQLError } from "graphql";
import { LoginInput } from "../../schema";
import { cookies } from "next/headers";

export const login = async ({ email, password }: LoginInput) => {
  const cookieStore = await cookies();
  try {
    const { data, errors } = await client.mutate({
      mutation: LoginDocument,
      variables: {
        input: {
          email,
          password,
        },
      },
    });

    if (errors) {
      const error: ErrorResponse = errors[0];
      return {
        error: error,
        data: null,
      };
    }

    if (data?.login) {
      const { accessToken, refreshToken } = data.login;

      if (accessToken && refreshToken) {
        cookieStore.set("accessToken", accessToken, {
          path: "/",
          maxAge: 60 * 60 * 24 * 30,
          sameSite: "lax",
        });
        cookieStore.set("refreshToken", refreshToken, {
          path: "/",
          maxAge: 60 * 60 * 24 * 30,
          sameSite: "lax",
        });
      }
    }

    return {
      error: null,
      data: data?.login as LoginResponse,
    };
  } catch (error: any) {
    let errorMessage = "An unknown error occurred";
    let statusCode = null;
    let code = "ERROR_CODE";

    if (error instanceof Error) {
      errorMessage = error.message;
    }
    if (error instanceof GraphQLError) {
      errorMessage = error.message;
    }

    if (error.networkError && error.networkError.statusCode) {
      statusCode = error.networkError.statusCode;
      if (statusCode === 429) {
        errorMessage =
          "You have exceeded the request limit, please try again later";
        code = "TOO_MANY_REQUESTS";
      }
    }

    return {
      error: {
        message: errorMessage,
        extensions: {
          code,
          statusCode,
        },
      },
      data: null,
    };
  }
};
