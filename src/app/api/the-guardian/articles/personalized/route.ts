import { NextRequest } from "next/server";
import { getPersonalizedArticlesService } from "@/services/saved-articles";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const pageParam = searchParams.get("pageParam");

  if (!pageParam) {
    return new Response("pageParam is required", { status: 400 });
  }

  const res = await getPersonalizedArticlesService(+pageParam);

  return Response.json(res);
}
