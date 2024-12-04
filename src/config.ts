export const DEFAULT_LOCALE = "km" as const;
export const LOCALES = [DEFAULT_LOCALE, "en"] as const;
export type Locale = (typeof LOCALES)[number];

// * how many times the api will retry by default with react-query
export const DEFAULT_QUERY_RETRY = 3;

export const LOGIN_DEFAULT_REDIRECT = "/";
export const DEFAULT_REMEMBER_ME = 7;

// * Setting "NextLink" prefetch default value
export const DEFAULT_PREFETCH = false;
