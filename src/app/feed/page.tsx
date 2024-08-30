import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { ArticlesFeed } from "@/app/feed/articles-feed";
import { getPersonalizedArticlesAction } from "@/app/feed/actions";
import { assertAuthenticated } from "@/lib/auth";

export default async function Home() {
  await assertAuthenticated();
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["personalized_articles"],
    queryFn: getPersonalizedArticlesAction,
    initialPageParam: 1,
    pages: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.response.pages === lastPageParam) {
        return undefined;
      }

      return lastPageParam + 1;
    },
  });

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
