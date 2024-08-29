import "server-only";

import { cache } from "react";
import { validateRequest } from "@/auth";
import { AuthenticationError } from "@/services/errors";

export const getCurrentUser = cache(async () => {
  const session = await validateRequest();
  if (!session.user) {
    return undefined;
  }
  return session.user;
});

export const assertAuthenticated = async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw new AuthenticationError();
  }
  return user;
};
