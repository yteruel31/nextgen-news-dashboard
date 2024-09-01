import { createUser, getUserByEmail } from "@/repositories/db/users";
import { createAccount, getAccountByUserId } from "@/repositories/db/accounts";
import { createProfile } from "@/repositories/db/profiles";
import { LoginError, PublicError } from "@/services/errors";
import { hashPassword } from "@/util/password";

async function verifyPassword(email: string, plainTextPassword: string) {
  const user = await getUserByEmail(email);

  if (!user) {
    return false;
  }

  const account = await getAccountByUserId(user.id);

  if (!account) {
    return false;
  }

  const salt = account.salt;
  const savedPassword = account.password;

  if (!salt || !savedPassword) {
    return false;
  }

  const hash = await hashPassword(plainTextPassword, salt);
  return account.password == hash;
}

export async function registerUserService(email: string, password: string) {
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    throw new PublicError("An user with that email already exists.");
  }

  const user = await createUser(email);
  await createAccount(user.id, password);

  await createProfile(user.id);

  return { id: user.id };
}

export async function signInUserService(email: string, password: string) {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new LoginError();
  }

  const isPasswordCorrect = await verifyPassword(email, password);

  if (!isPasswordCorrect) {
    throw new LoginError();
  }

  return { id: user.id };
}
