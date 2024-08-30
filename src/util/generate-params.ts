import { cleanObjectWithUndefinedProperties } from "./clean-object-with-undefined-properties";

export const generateParams = (params: any) => {
  cleanObjectWithUndefinedProperties(params);
  const _params = new URLSearchParams(params);

  return _params.toString();
};
