export type Extensions = {
  code?: string;
  statusCode?: number;
};

export type ErrorResponse = {
  message?: string;
  extensions?: Extensions;
};
