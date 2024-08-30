"use server";

import { env } from "@/env";
import {
  GetArticlesResponseDto,
  TheGuardianResponse,
} from "@/repositories/_dtos/the-guardian.dto";
import { authenticatedAction } from "@/lib/safe-action";
import { z } from "zod";
import { assertAuthenticated } from "@/lib/auth";
import { createSavedArticle } from "@/repositories/db/saved-articles";
import { revalidatePath } from "next/cache";

export const getArticlesAction = async ({
  pageParam,
}: {
  pageParam: number;
}) => {
  const response = await fetch(
    `https://content.guardianapis.com/search?api-key=${env.GUARDIAN_API_KEY}&page=${pageParam}&page-size=5&show-fields=thumbnail&show-tags=keyword`,
  );

  const data: TheGuardianResponse<GetArticlesResponseDto> =
    await response.json();

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
