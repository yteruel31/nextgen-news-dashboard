import { env } from "@/env";
import {
  GetSectionsResponseDto,
  TheGuardianResponse,
} from "@/repositories/_dtos/the-guardian.dto";

export async function GET() {
  const res = await fetch(
    `https://content.guardianapis.com/sections?api-key=${env.GUARDIAN_API_KEY}`,
  );
  const data: TheGuardianResponse<GetSectionsResponseDto> = await res.json();

  return Response.json(data.response.results);
}
