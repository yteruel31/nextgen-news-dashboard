import { ReactNode } from "react";
import { User } from "lucia";
import { getCurrentUser } from "@/lib/auth";

export async function SignedIn({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  return user && <>{children}</>;
}

export async function SignedInWithUser({
  children,
}: {
  children(user: User): JSX.Element;
}) {
  const user = await getCurrentUser();
  return user && <>{children(user)}</>;
}

export async function SignedOut({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  return !user && <>{children}</>;
}
