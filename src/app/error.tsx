"use client";

import Link from "next/link";
import { Button } from "@/components/_ui/Button";
import { AUTHENTICATION_ERROR_MESSAGE } from "@/services/errors";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const isAuthenticationError = error.message.includes(
    AUTHENTICATION_ERROR_MESSAGE,
  );

  return (
    <div className="container mx-auto py-12 min-h-screen space-y-8">
      {isAuthenticationError ? (
        <>
          <h1>Oops! You Need to Be Logged In</h1>
          <p className="text-lg">To access this page, please log in first.</p>

          <Button>
            <Link href="/sign-in">Sign-in</Link>
          </Button>
        </>
      ) : (
        <>
          <h1>Oops! Something went wrong</h1>
          <p className="text-lg">{error.message}</p>
        </>
      )}
    </div>
  );
}
