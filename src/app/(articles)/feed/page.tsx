import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ArticlesFeed } from "@/app/(articles)/feed/articles-feed";
import { assertAuthenticated } from "@/lib/auth";
import { personalizedArticlesOptions } from "@/app/(articles)/feed/feed.query";
import getQueryClient from "@/app/getQueryClient";

export default async function Feed() {
  await assertAuthenticated();

  await getQueryClient().prefetchInfiniteQuery({
    ...personalizedArticlesOptions,
    pages: 1,
  });

  return (
    <main>
      <div className="max-w-[700px] mx-auto pt-10 md:pt-20 px-4">
        <div className="flex flex-col gap-5">
          <HydrationBoundary state={dehydrate(getQueryClient())}>
            <ArticlesFeed />
          </HydrationBoundary>
        </div>
      </div>
    </main>
  );
}
