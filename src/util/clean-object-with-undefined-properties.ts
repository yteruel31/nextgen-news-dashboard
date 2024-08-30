export const cleanObjectWithUndefinedProperties = (obj: any) =>
  Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key]);
