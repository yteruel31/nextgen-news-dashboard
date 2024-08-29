import crypto from "crypto";
import { database } from "@/db";
import { UserId } from "@/services/types";
import { hashPassword } from "@/util/password";

export async function createAccount(userId: UserId, password: string) {
  const salt = crypto.randomBytes(128).toString("base64");
  const hash = await hashPassword(password, salt);

  return database.account.create({
    data: {
      userId,
      accountType: "EMAIL",
      password: hash,
      salt,
    },
  });
}

export async function getAccountByUserId(userId: UserId) {
  return database.account.findFirst({
    where: {
      userId,
    },
  });
}
