import { env } from "@/env";
import {
  GetArticlesResponseDto,
  TheGuardianResponse,
} from "@/repositories/_dtos/the-guardian.dto";
import { assertAuthenticated } from "@/lib/auth";
import {
  getSavedArticlesByUserId,
  getSavedArticlesKeywordsByUserId,
} from "@/repositories/db/saved-articles";

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

export const getPersonalizedArticlesService = async (page: number) => {
  const user = await assertAuthenticated();
  const savedArticles = await getSavedArticlesKeywordsByUserId(user.id);

  const keywords = Array.from(
    new Set(
      savedArticles
        .map((article) =>
          article.keywordTags.map(({ keywordTag }) => keywordTag.keyword),
        )
        .flat()
        .map((keyword) => keyword.split("/")[1]),
    ),
  );

  const response = await fetch(
    `https://content.guardianapis.com/search?api-key=${env.GUARDIAN_API_KEY}&show-tags=keyword&show-fields=thumbnail&page=${page}&page-size=10&q=${keywords.join(" ")}&query-fields=body`,
    { cache: "force-cache" },
  );

  const data: TheGuardianResponse<GetArticlesResponseDto> =
    await response.json();

  return data;
};
