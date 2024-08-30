"use server";

import { authenticatedAction } from "@/lib/safe-action";
import { z } from "zod";
import { assertAuthenticated } from "@/lib/auth";
import {
  createSavedArticle,
  deleteSavedArticle,
  getSavedArticleByArticleIdAndUserId,
} from "@/repositories/db/saved-articles";
import { NotFoundError } from "@/services/errors";
import { revalidatePath } from "next/cache";

export const unsaveArticleAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      articleId: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    const user = await assertAuthenticated();

    const savedArticle = await getSavedArticleByArticleIdAndUserId(
      input.articleId,
      user.id,
    );

    if (!savedArticle) {
      throw new NotFoundError();
    }

    await deleteSavedArticle(savedArticle.id, user.id);

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
    const user = await assertAuthenticated();

    await createSavedArticle(
      {
        articleId: input.articleId,
        userId: user.id,
      },
      input.keywords,
    );

    revalidatePath("/discover");
    revalidatePath("/saved-articles");
  });
