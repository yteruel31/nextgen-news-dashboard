import { GetArticlesResponseDto } from "@/repositories/_dtos/the-guardian.dto";
import Image from "next/image";

interface ArticleCardProps {
  data: GetArticlesResponseDto;
}

export const ArticleCard = ({ data }: ArticleCardProps) => {
  return (
    <a
      href={data.webUrl}
      target="_blank"
      className="bg-white overflow-hidden border transition-shadow sm:rounded-lg cursor-pointer hover:shadow-lg"
    >
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {data.webTitle}
        </h3>
      </div>
      <Image
        src={data.fields.thumbnail}
        alt={"Article thumbnail"}
        width={700}
        height={500}
      />
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Published on</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
              {data.webPublicationDate}
            </dd>
          </div>
        </dl>
      </div>
    </a>
  );
};
