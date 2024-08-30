"use server";

import { authenticatedAction } from "@/lib/safe-action";
import { z } from "zod";
import { assertAuthenticated } from "@/lib/auth";
import {
  deleteSavedArticle,
  getSavedArticleByArticleIdAndUserId,
} from "@/repositories/db/saved-articles";
import { revalidatePath } from "next/cache";
import { NotFoundError } from "@/services/errors";

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
