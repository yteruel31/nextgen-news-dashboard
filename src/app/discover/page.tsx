import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getArticlesAction } from "@/app/discover/actions";
import { ArticlesDiscover } from "@/app/discover/articles-discover";

export default async function Discover() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["articles"],
    queryFn: getArticlesAction,
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
            <ArticlesDiscover />
          </HydrationBoundary>
        </div>
      </div>
    </main>
  );
}
