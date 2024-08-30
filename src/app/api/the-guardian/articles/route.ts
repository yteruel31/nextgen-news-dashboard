import { getArticlesService } from "@/services/saved-articles";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const pageParam = searchParams.get("pageParam");
  const section = searchParams.get("section");

  if (!pageParam) {
    return new Response("pageParam is required", { status: 400 });
  }

  const res = await getArticlesService(+pageParam, section);

  return Response.json(res);
}
