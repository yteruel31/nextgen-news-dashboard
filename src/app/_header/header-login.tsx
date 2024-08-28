"use client";

import Link from "next/link";
import { Button } from "@/components/_ui/Button";

export const HeaderLogin = () => {
  return (
    <Button variant="secondary">
      <Link href="/sign-in">Sign In</Link>
    </Button>
  );
};
