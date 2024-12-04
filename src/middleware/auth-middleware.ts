import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { CustomMiddleware } from "./chain";
import { ACCESS_TOKEN_SECRET_KEY } from "@/lib/jwt/secret-key";
import { decrypt } from "@/lib/jwt";
import { ROUTES } from "@/constants";
import { cookies } from "next/headers";
import { isMatchingRoute } from "@/utils/is-matching-route";
import { getCurrentLocale } from "@/locales/server";

const protectedRoutes = ["/", "/dashboard"];
const publicRoutes = ["/login"];

export function authMiddleware(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    const { pathname } = request.nextUrl;
    const locale = await getCurrentLocale();
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const isProtectedRoutes = isMatchingRoute(protectedRoutes, pathname);
    const isPublicRoutes = isMatchingRoute(publicRoutes, pathname);

    if (isPublicRoutes && accessToken) {
      // If the user is already logged in and trying to access the login page, redirect them to the dashboard
      if (pathname === `/${locale}${ROUTES.LOGIN}`) {
        return NextResponse.redirect(
          new URL(`/${locale}${ROUTES.DASHBOARD}`, request.url)
        );
      }
    }

    // If the route is public and there is no access token, proceed with the next middleware
    if (isPublicRoutes && !accessToken) {
      return middleware(request, event, response);
    }

    if (isProtectedRoutes && !accessToken) {
      return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
    }

    const payload = await decrypt(accessToken, ACCESS_TOKEN_SECRET_KEY);

    if (isProtectedRoutes && !payload?.sub) {
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");
      return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
    }

    if (isPublicRoutes && payload?.sub) {
      return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
    }

    return middleware(request, event, response);
  };
}
