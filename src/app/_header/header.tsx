import Link from "next/link";
import { HeaderSignIn } from "@/app/_header/header-sign-in";
import { HeaderSignOut } from "@/app/_header/header-sign-out";
import { SignedIn, SignedOut } from "@/components/auth";

export async function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="px-5 md:px-6">
        <div className="mx-auto flex w-full max-w-7xl py-4 justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-sm md:text-base lg:text-2xl font-bold">
              NextGen News
            </span>
          </Link>
          <SignedIn>
            <HeaderSignOut />
          </SignedIn>
          <SignedOut>
            <HeaderSignIn />
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
