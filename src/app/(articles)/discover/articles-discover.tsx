"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { InfiniteScroller } from "@/components/infinite-scroll";
import React, { useState } from "react";
import {
  GetSectionsResponseDto,
  TheGuardianResponse,
} from "@/repositories/_dtos/the-guardian.dto";
import { Article } from "@/app/(articles)/article";
import { Select } from "@/components/_ui/Inputs/Select/Select";
import { generateParams } from "@/util/generate-params";
import { Article as ArticleModel } from "@/services/models/article.model";
import { Loader } from "@/components/_ui/Loader";

export const ArticlesDiscover = () => {
  const [section, setSection] = useState<string | undefined>(undefined);
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["articles", section],
    queryFn: async ({ pageParam }) => {
      const response = await fetch(
        `/api/the-guardian/articles?${generateParams({ pageParam, section })}`,
        { cache: "no-cache" },
      );

      const data: TheGuardianResponse<ArticleModel> = await response.json();
      return data;
    },
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

  const handleSectionChange = (option: { label: string; value: string }) => {
    setSection(option.value);
  };

  return (
    <div className="flex flex-col gap-5">
      <Select
        onChange={handleSectionChange}
        placeholder="Select a section"
        options={sections?.map((section) => ({
          label: section.webTitle,
          value: section.id,
        }))}
      />
      <InfiniteScroller
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        loadingMessage={
          <div className="flex justify-center py-5">
            <Loader width={50} />
          </div>
        }
        endingMessage={<>No more articles</>}
      >
        <div className="flex flex-col gap-5">
          {data?.pages.map((page) => (
            <section
              key={page.response.currentPage}
              className="flex flex-col gap-5"
            >
              {page.response.results.map((article) => (
                <Article
                  key={article.id}
                  data={article}
                  cacheToInvalidate={["articles"]}
                />
              ))}
            </section>
          ))}
        </div>
      </InfiniteScroller>
    </div>
  );
};
