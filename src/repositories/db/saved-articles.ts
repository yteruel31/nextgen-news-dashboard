import { database } from "@/db";
import { SavedArticle } from "@prisma/client";

export async function createSavedArticle(
  savedArticle: Omit<SavedArticle, "id" | "createdAt" | "updatedAt">,
  keyword: string[],
) {
  return database.savedArticle.create({
    data: {
      ...savedArticle,
      keywordTags: {
        create: keyword.map((keyword) => ({
          keywordTag: {
            create: {
              keyword: keyword,
            },
          },
        })),
      },
    },
  });
}

export async function getSavedArticlesByUserId(userId: string) {
  return database.savedArticle.findMany({
    where: {
      userId,
    },
  });
}

export async function getSavedArticlesKeywordsByUserId(userId: string) {
  return database.savedArticle.findMany({
    where: {
      userId,
    },
    select: {
      keywordTags: {
        select: {
          keywordTag: {
            select: {
              keyword: true,
            },
          },
        },
      },
    },
  });
}
