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
import { Article } from "@/services/models/article.model";
import { generateParams } from "@/util/generate-params";

export const getSavedArticlesService = async (): Promise<
  TheGuardianResponse<Article>
> => {
  const user = await assertAuthenticated();
  const savedArticles = await getSavedArticlesByUserId(user.id);

  const response = await fetch(
    `https://content.guardianapis.com/search?api-key=${env.GUARDIAN_API_KEY}&show-fields=thumbnail&ids=${savedArticles.map((article) => article.articleId).join(",")}`,
  );

  const {
    response: { results, ...rest },
  }: TheGuardianResponse<GetArticlesResponseDto> = await response.json();

  return {
    response: {
      ...rest,
      results: results.map((result) => ({
        ...result,
      })),
    },
  };
};

export const getArticlesService = async (
  page: number,
  section?: string | null,
): Promise<TheGuardianResponse<Article>> => {
  const user = await assertAuthenticated();
  const savedArticles = await getSavedArticlesKeywordsByUserId(user.id);

  const params = generateParams({
    "api-key": env.GUARDIAN_API_KEY,
    "show-tags": "keyword",
    "show-fields": "thumbnail",
    page,
    "page-size": 10,
    section,
  });

  const response = await fetch(
    `https://content.guardianapis.com/search?${params}`,
  );

  const {
    response: { results, ...rest },
  }: TheGuardianResponse<GetArticlesResponseDto> = await response.json();

  return {
    response: {
      ...rest,
      results: results.map((result) => ({
        ...result,
        isSaved: savedArticles.some(
          (article) => article.articleId === result.id,
        ),
      })),
    },
  };
};

export const getPersonalizedArticlesService = async (
  page: number,
): Promise<TheGuardianResponse<Article>> => {
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

  const {
    response: { results, ...rest },
  }: TheGuardianResponse<GetArticlesResponseDto> = await response.json();

  return {
    response: {
      ...rest,
      results: results.map((result) => ({
        ...result,
        isSaved: savedArticles.some(
          (article) => article.articleId === result.id,
        ),
      })),
    },
  };
};
