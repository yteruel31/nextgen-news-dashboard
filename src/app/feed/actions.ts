"use server";

import { authenticatedAction } from "@/lib/safe-action";
import { z } from "zod";
import { assertAuthenticated } from "@/lib/auth";
import { createSavedArticle } from "@/repositories/db/saved-articles";
import { revalidatePath } from "next/cache";
import { getPersonalizedArticlesService } from "@/services/saved-articles";

export const getArticlesAction = async ({
  pageParam,
}: {
  pageParam: number;
}) => {
  const data = await getPersonalizedArticlesService(pageParam);

  return data;
};

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

    revalidatePath("/saved-articles");
  });
