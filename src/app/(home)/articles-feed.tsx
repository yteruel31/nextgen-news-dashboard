"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { ArticleCard } from "@/app/(home)/article-card";
import { InfiniteScroller } from "@/components/infinite-scroll";
import { getArticlesAction } from "@/app/(home)/actions";

export const ArticlesFeed = () => {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["articles"],
    queryFn: ({ pageParam }) => getArticlesAction({ pageParam: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.response.pages === lastPageParam) {
        return undefined;
      }

      return lastPageParam + 1;
    },
  });

  return (
    <div>
      <InfiniteScroller
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        loadingMessage={<>Loading...</>}
        endingMessage={<>No more articles</>}
      >
        {data?.pages.map((page) => (
          <section
            key={page.response.currentPage}
            className="flex flex-col gap-5"
          >
            {page.response.results.map((article) => (
              <ArticleCard key={article.id} data={article} />
            ))}
          </section>
        ))}
      </InfiniteScroller>
    </div>
  );
};
