import { getSavedArticlesService } from "@/services/saved-articles";
import { ArticleCard } from "@/components/article-card";

export default async function Home() {
  const savedArticles = await getSavedArticlesService();

  return (
    <main>
      <div className="max-w-[700px] mx-auto pt-20">
        <div className="flex flex-col gap-5">
          {savedArticles.response.results.map((article) => (
            <ArticleCard data={article} hideSaveButton />
          ))}
        </div>
      </div>
    </main>
  );
}
