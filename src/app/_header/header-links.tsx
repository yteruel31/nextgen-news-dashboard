"use client";

import { Anchor } from "@/components/_ui/Anchor";
import { usePathname } from "next/navigation";

export const HeaderLinks = () => {
  const pathname = usePathname();

  return (
    <>
      <Anchor
        href="/discover"
        variant="ghost"
        size="sm"
        active={pathname === "/discover"}
      >
        Discover
      </Anchor>
      <Anchor
        href="/feed"
        variant="ghost"
        size="sm"
        active={pathname === "/feed"}
      >
        My feed
      </Anchor>
      <Anchor
        href="/saved-articles"
        variant="ghost"
        size="sm"
        active={pathname === "/saved-articles"}
      >
        Saved articles
      </Anchor>
    </>
  );
};
