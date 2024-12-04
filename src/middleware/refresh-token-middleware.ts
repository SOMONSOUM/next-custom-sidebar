import { refreshNewToken } from '@/api/auth/refresh-token';
import { decrypt } from '@/lib/jwt';
import { ACCESS_TOKEN_SECRET_KEY } from '@/lib/jwt/secret-key';
import { isTokenExpired } from '@/utils/is-token-expired';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { CustomMiddleware } from './chain';

export function refreshTokenMiddleware(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    const payload = await decrypt(accessToken, ACCESS_TOKEN_SECRET_KEY);

    // Check access token is expired or not
    if (isTokenExpired(payload) && refreshToken) {
      const { data } = await refreshNewToken(refreshToken);
      if (data?.accessToken && data.refreshToken) {
        response = NextResponse.next();
        response.cookies.set('accessToken', data.accessToken, {
          httpOnly: true,
          secure: process.env.NEXT_PUBLIC_NODE_ENV === 'production',
          path: '/',
        });

        response.cookies.set('refreshToken', data.refreshToken, {
          httpOnly: true,
          secure: process.env.NEXT_PUBLIC_NODE_ENV === 'production',
          path: '/',
        });

        return response;
      }
    }
    return middleware(request, event, response);
  };
}
