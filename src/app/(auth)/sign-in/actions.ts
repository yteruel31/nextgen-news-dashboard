"use server";

import { rateLimitByKey } from "@/lib/limiter";
import { unauthenticatedAction } from "@/lib/safe-action";
import { setSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";
import { signInUserService } from "@/services/users";

export const signInAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(8),
    }),
  )
  .handler(async ({ input }) => {
    await rateLimitByKey({ key: input.email, limit: 3, window: 10000 });
    const user = await signInUserService(input.email, input.password);
    await setSession(user.id);

    redirect("/discover");
  });
