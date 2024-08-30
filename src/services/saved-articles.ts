import { env } from "@/env";
import {
  GetArticlesResponseDto,
  TheGuardianResponse,
} from "@/repositories/_dtos/the-guardian.dto";
import { assertAuthenticated } from "@/lib/auth";
import { getSavedArticlesByUserId } from "@/repositories/db/saved-articles";

export const getSavedArticlesService = async () => {
  const user = await assertAuthenticated();
  const savedArticles = await getSavedArticlesByUserId(user.id);

  const response = await fetch(
    `https://content.guardianapis.com/search?api-key=${env.GUARDIAN_API_KEY}&show-fields=thumbnail&ids=${savedArticles.map((article) => article.articleId).join(",")}`,
  );

  const data: TheGuardianResponse<GetArticlesResponseDto> =
    await response.json();

  return data;
};
