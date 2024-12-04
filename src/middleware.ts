import { i18nMiddleware } from "./middleware/i18n-middleware";
import { refreshTokenMiddleware } from "./middleware/refresh-token-middleware";
import { authMiddleware } from "./middleware/auth-middleware";
import { chain } from "./middleware/chain";

export default chain([refreshTokenMiddleware, i18nMiddleware, authMiddleware]);

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
