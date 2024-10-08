import { infiniteQueryOptions } from "@tanstack/react-query";
import { generateParams } from "@/util/generate-params";
import { TheGuardianResponse } from "@/repositories/_dtos/the-guardian.dto";
import { Article } from "@/services/models/article.model";

export const articlesOptions = (section?: string) =>
  infiniteQueryOptions({
    refetchOnMount: true,
    queryKey: ["articles", section],
    queryFn: async ({ pageParam }) => {
      const response = await fetch(
        `/api/the-guardian/articles?${generateParams({ pageParam, section })}`,
      );

      const data: TheGuardianResponse<Article> = await response.json();
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
