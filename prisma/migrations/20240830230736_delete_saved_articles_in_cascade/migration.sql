-- DropForeignKey
ALTER TABLE "SavedArticle" DROP CONSTRAINT "SavedArticle_userId_fkey";

-- DropForeignKey
ALTER TABLE "SavedArticleKeywordTag" DROP CONSTRAINT "SavedArticleKeywordTag_savedArticleId_fkey";

-- AddForeignKey
ALTER TABLE "SavedArticle" ADD CONSTRAINT "SavedArticle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedArticleKeywordTag" ADD CONSTRAINT "SavedArticleKeywordTag_savedArticleId_fkey" FOREIGN KEY ("savedArticleId") REFERENCES "SavedArticle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
