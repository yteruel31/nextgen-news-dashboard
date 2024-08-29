"use client";

import { Button } from "@/components/_ui/Button";
import { signOutAction } from "@/app/_header/actions";

export const HeaderSignOut = () => {
  return (
    <Button variant="secondary" onClick={async () => await signOutAction()}>
      Sign Out
    </Button>
  );
};
