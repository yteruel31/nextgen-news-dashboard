import Link from "next/link";
import { HeaderLogin } from "@/app/_header/header-login";

export async function Header() {
  return (
    <div className="px-5 md:px-6">
      <div className="mx-auto flex w-full max-w-7xl py-4 justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-sm md:text-base lg:text-2xl font-bold">
            NextGen News
          </span>
        </Link>
        <HeaderLogin />
      </div>
    </div>
  );
}
