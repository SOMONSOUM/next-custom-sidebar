/* eslint-disable @typescript-eslint/no-unused-vars */

import { JwtPayload } from "@/types/jwt-payload";
import { jwtVerify } from "jose";

export const decrypt = async (
  token: string | undefined = "",
  key: Uint8Array
) => {
  try {
    const { payload } = await jwtVerify<JwtPayload>(token, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
};
