"use server";

import { lucia, validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function signOutAction() {
  const { session } = await validateRequest();

  if (!session) {
    redirect("/sign-in");
  }

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  redirect("/");
}
