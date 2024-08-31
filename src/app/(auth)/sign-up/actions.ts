"use server";

import { redirect } from "next/navigation";
import { unauthenticatedAction } from "@/lib/safe-action";
import { rateLimitByIp } from "@/lib/limiter";
import { registerUserService } from "@/services/users";
import { setSession } from "@/lib/session";
import { z } from "zod";
import { passwordValidation } from "@/util/password";

export const signUpAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(8).regex(passwordValidation),
    }),
  )
  .handler(async ({ input }) => {
    await rateLimitByIp({ key: "register", limit: 3, window: 30000 });

    const user = await registerUserService(input.email, input.password);

    await setSession(user.id);

    redirect("/discover");
  });
