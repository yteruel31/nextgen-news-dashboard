import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { ArticlesFeed } from "@/app/(articles)/feed/articles-feed";
import { assertAuthenticated } from "@/lib/auth";
import { personalizedArticlesOptions } from "@/app/(articles)/feed/feed.query";

export default async function Home() {
  await assertAuthenticated();
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(personalizedArticlesOptions);

  return (
    <main>
      <div className="max-w-[700px] mx-auto pt-20">
        <div className="flex flex-col gap-5">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <ArticlesFeed />
          </HydrationBoundary>
        </div>
      </div>
    </main>
  );
}
