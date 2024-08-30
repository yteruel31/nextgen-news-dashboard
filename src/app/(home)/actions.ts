"use server";

import { env } from "@/env";
import {
  GetArticlesResponseDto,
  TheGuardianResponse,
} from "@/repositories/_dtos/the-guardian.dto";

export const getArticlesAction = async ({
  pageParam,
}: {
  pageParam: number;
}) => {
  console.log("fetching articles", pageParam);
  const response = await fetch(
    `https://content.guardianapis.com/search?api-key=${env.GUARDIAN_API_KEY}&page=${pageParam}&page-size=5&show-fields=thumbnail`,
  );

  const data: TheGuardianResponse<GetArticlesResponseDto> =
    await response.json();

  return data;
};
