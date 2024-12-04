import { LOCALES } from "@/config";

/**
 * Checks if a given pathname matches a set of routes.
 *
 * The pathname is compared against an array of routes, which are
 * assumed to be in the format of a Next.js route (e.g. "/dashboard",
 * "/settings/[id]").
 *
 * The locale is used to add a locale prefix to the route regex.
 *
 * The function returns true if the pathname matches one of the routes,
 * and false otherwise.
 *
 * @param pathnames - An array of Next.js routes to match.
 * @param currentPathname - The current pathname to check.
 * @param locale - The locale to prefix the route regex with.
 * @returns A boolean indicating if the pathname matches one of the routes.
 */
export const isMatchingRoute = (
  pathnames: string[],
  currentPathname: string
): boolean => {
  const routeRegex = RegExp(
    `^(/(${LOCALES.join("|")}))?(${pathnames
      .flatMap((route) => (route === "/" ? ["", "/"] : route))
      .join("|")})/?$`,
    "i"
  );

  return routeRegex.test(currentPathname);
};
