export const HEADER = {
  CACHE_CONTROL: "Cache-Control",
  CONTENT_TYPE: "Content-Type",
};

export const CONTENT_TYPE = {
  JSON: "application/json; charset=utf-8",
  SVG: "image/svg+xml; charset=utf-8",
} as const;

export const HTTP_METHOD = {
  GET: "GET",
  POST: "POST",
} as const;

export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const QUERY_PARAM = {
  THEME: "theme",
  USERNAME: "username",
} as const;

export type HttpStatusCode = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];
