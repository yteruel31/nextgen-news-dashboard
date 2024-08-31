import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ArticlesDiscover } from "@/app/(articles)/discover/articles-discover";
import { articlesOptions } from "@/app/(articles)/discover/discover.query";
import getQueryClient from "@/app/getQueryClient";

export default async function Discover() {
  await getQueryClient().prefetchInfiniteQuery({
    ...articlesOptions(),
    pages: 1,
  });

  return (
    <main>
      <div className="max-w-[700px] mx-auto pt-10 md:pt-20 px-4">
        <div className="flex flex-col gap-5">
          <HydrationBoundary state={dehydrate(getQueryClient())}>
            <ArticlesDiscover />
          </HydrationBoundary>
        </div>
      </div>
    </main>
  );
}
