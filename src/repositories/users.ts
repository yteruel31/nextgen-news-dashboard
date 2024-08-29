import { database } from "@/db";

export async function createUser(email: string) {
  return database.user.create({
    data: {
      email,
    },
  });
}

export async function getUserByEmail(email: string) {
  return database.user.findFirst({
    where: {
      email,
    },
  });
}
