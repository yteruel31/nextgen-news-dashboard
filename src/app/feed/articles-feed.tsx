"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Article } from "@/app/feed/article";
import { InfiniteScroller } from "@/components/infinite-scroll";
import React from "react";
import { personalizedArticlesOptions } from "@/app/feed/feed.query";

export const ArticlesFeed = () => {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    personalizedArticlesOptions,
  );

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
              <Article key={article.id} data={article} />
            ))}
          </section>
        ))}
      </InfiniteScroller>
    </div>
  );
};
