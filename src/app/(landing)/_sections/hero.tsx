import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/_ui/Container";
import { SignedIn, SignedOut } from "@/components/auth";
import { Button } from "@/components/_ui/Button";

export function HeroSection() {
  return (
    <Container size="lg">
      <div className="flex flex-col md:flex-row gap-y-14 w-full justify-between items-center">
        <div className="">
          <h1 className="text-5xl md:text-7xl max-w-3xl mt-10 leading-[1.2] font-semibold">
            An enhanced way of reading your news
          </h1>
          <p className="mt-5 text-gray-500 text-lg max-w-[600px]">
            Read news from around the world and save your favorite articles with
            NextGen News. NextGen News is a news aggregator that helps you stay
            informed and up-to-date with the latest news.
          </p>
          <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4 mt-10">
            <SignedIn>
              <Button variant="secondary">
                <Link href="/feed">My feed</Link>
              </Button>
            </SignedIn>

            <SignedOut>
              <Button variant="ghost">
                <Link href="/sign-in">Sign-in to your account</Link>
              </Button>
            </SignedOut>
          </div>
        </div>
        <Image
          className="w-[300px] h-[550px] md:w-[370px] md:h-[700px]"
          width="200"
          height="500"
          src="/overview.png"
          alt="hero image"
        />
      </div>
    </Container>
  );
}
