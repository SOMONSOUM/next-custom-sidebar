import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { CustomMiddleware } from "./chain";
import { createI18nMiddleware } from "next-international/middleware";
import { DEFAULT_LOCALE, LOCALES } from "@/config";

const I18nMiddleware = createI18nMiddleware({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
});

export function i18nMiddleware(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    response = I18nMiddleware(request);
    return middleware(request, event, response);
  };
}
