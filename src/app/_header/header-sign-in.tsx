import Link from "next/link";
import { Button } from "@/components/_ui/Button";

export const HeaderSignIn = () => {
  return (
    <Button variant="secondary">
      <Link href="/sign-in">Sign In</Link>
    </Button>
  );
};
