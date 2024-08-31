import Link from "next/link";
import { HeaderSignIn } from "@/app/_header/header-sign-in";
import { HeaderSignOut } from "@/app/_header/header-sign-out";
import { SignedIn, SignedOut } from "@/components/auth";
import { HeaderLinks } from "@/app/_header/header-links";

export async function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="px-5 md:px-6">
        <div className="mx-auto flex w-full max-w-7xl py-4 justify-between">
          <Link href="/" className="items-center gap-2 hidden md:flex">
            <span className="text-sm md:text-base lg:text-2xl font-bold">
              NextGen News
            </span>
          </Link>
          <SignedIn>
            <div className="flex justify-between w-full md:w-auto md:justify-start md:gap-5">
              <HeaderLinks />
              <HeaderSignOut />
            </div>
          </SignedIn>
          <SignedOut>
            <div className="w-full flex justify-end md:w-auto md:justify-start">
              <HeaderSignIn />
            </div>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
