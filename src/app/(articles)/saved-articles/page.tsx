import { getSavedArticlesService } from "@/services/saved-articles";
import { Article } from "@/app/(articles)/saved-articles/article";

export default async function Home() {
  const savedArticles = await getSavedArticlesService();

  return (
    <main className="pb-20">
      <div className="max-w-[700px] mx-auto pt-10 md:pt-20 px-4">
        <div className="flex flex-col gap-5">
          {savedArticles.response.results.map((article) => (
            <Article key={article.id} data={article} />
          ))}
        </div>
      </div>
    </main>
  );
}
