export const SITE_URL = "https://coachingpraktijk.deleeuw.nl";
export const SITE_NAME = "Coachingpraktijk De Leeuw";

export const absoluteUrl = (path: string) =>
  `${SITE_URL}${path === "/" ? "" : path}`;
