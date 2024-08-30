import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { ArticlesDiscover } from "@/app/discover/articles-discover";
import { articlesOptions } from "@/app/discover/discover.query";

export default async function Discover() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(articlesOptions());

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
