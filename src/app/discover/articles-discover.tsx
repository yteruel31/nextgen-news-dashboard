"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { InfiniteScroller } from "@/components/infinite-scroll";
import React, { useState } from "react";
import { getArticlesAction } from "@/app/discover/actions";
import { GetSectionsResponseDto } from "@/repositories/_dtos/the-guardian.dto";
import { Article } from "@/app/discover/article";

export const ArticlesDiscover = () => {
  const [section, setSection] = useState<string | undefined>(undefined);
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["articles", section],
    queryFn: ({ pageParam }) =>
      getArticlesAction({ pageParam: pageParam, section }),
    initialPageParam: 1,

    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.response.pages === lastPageParam) {
        return undefined;
      }

      return lastPageParam + 1;
    },
  });

  const { data: sections } = useQuery<GetSectionsResponseDto[]>({
    queryKey: ["sections"],
    queryFn: () =>
      fetch(`/api/the-guardian/sections`).then((res) => res.json()),
  });

  const handleSectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSection(event.target.value);
  };

  return (
    <div>
      <select onChange={handleSectionChange}>
        {sections?.map((section) => (
          <option key={section.id} value={section.id}>
            {section.webTitle}
          </option>
        ))}
      </select>
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
