import { UserId } from "@/services/types";
import { database } from "@/db";

export async function createProfile(
  userId: UserId,
  displayName?: string,
  image?: string,
) {
  return database.profile.create({
    data: {
      userId,
      image,
      displayName,
    },
  });
}
