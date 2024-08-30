-- CreateTable
CREATE TABLE "SavedArticle" (
    "id" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SavedArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KeywordTag" (
    "id" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KeywordTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedArticleKeywordTag" (
    "savedArticleId" TEXT NOT NULL,
    "keywordTagId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SavedArticleKeywordTag_pkey" PRIMARY KEY ("savedArticleId","keywordTagId")
);

-- AddForeignKey
ALTER TABLE "SavedArticle" ADD CONSTRAINT "SavedArticle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedArticleKeywordTag" ADD CONSTRAINT "SavedArticleKeywordTag_savedArticleId_fkey" FOREIGN KEY ("savedArticleId") REFERENCES "SavedArticle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedArticleKeywordTag" ADD CONSTRAINT "SavedArticleKeywordTag_keywordTagId_fkey" FOREIGN KEY ("keywordTagId") REFERENCES "KeywordTag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
