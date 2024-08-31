"use server";

import { authenticatedAction } from "@/lib/safe-action";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import {
  saveArticleService,
  unsaveArticleService,
} from "@/services/saved-articles";

export const unsaveArticleAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      articleId: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    await unsaveArticleService(input.articleId);

    revalidatePath("/discover");
    revalidatePath("/saved-articles");
    revalidatePath("/feed");
  });

export const saveArticleAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      articleId: z.string(),
      keywords: z.array(z.string()),
    }),
  )
  .handler(async ({ input }) => {
    await saveArticleService(input.articleId, input.keywords);

    revalidatePath("/discover");
    revalidatePath("/saved-articles");
    revalidatePath("/feed");
  });
