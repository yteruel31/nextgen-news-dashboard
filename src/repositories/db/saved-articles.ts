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

export async function deleteSavedArticle(id: string, userId: string) {
  await database.savedArticle.update({
    where: {
      id,
      userId,
    },
    data: {
      keywordTags: {
        deleteMany: {},
      },
    },
  });

  return database.savedArticle.delete({
    where: {
      id,
      userId,
    },
    include: {
      keywordTags: true,
    },
  });
}

export async function getSavedArticleByArticleIdAndUserId(
  articleId: string,
  userId: string,
) {
  return database.savedArticle.findFirst({
    where: {
      userId,
      articleId,
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
      articleId: true,
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
