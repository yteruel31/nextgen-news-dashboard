import Image from "next/image";
import { Button } from "@/components/_ui/Button";
import { GetArticlesResponseDto } from "@/repositories/_dtos/the-guardian.dto";
import { MouseEvent } from "react";

interface ArticleCardProps {
  data: GetArticlesResponseDto;
  onSaved?: (event: MouseEvent<HTMLButtonElement>) => void;
  hideSaveButton?: boolean;
}

export const ArticleCard = ({
  data,
  onSaved,
  hideSaveButton = false,
}: ArticleCardProps) => {
  return (
    <a
      href={data.webUrl}
      target="_blank"
      className="bg-white overflow-hidden border-accent-foreground border transition-shadow sm:rounded-lg cursor-pointer hover:shadow-lg"
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
          <div className="px-4 py-5 flex items-center justify-between">
            <div className="flex gap-5 items-center">
              <dt className="text-sm font-medium text-gray-500">
                Published on
              </dt>
              <dd className="text-sm text-gray-900">
                {data.webPublicationDate}
              </dd>
            </div>
            {!hideSaveButton && (
              <Button variant="secondary" onClick={onSaved}>
                Save
              </Button>
            )}
          </div>
        </dl>
      </div>
    </a>
  );
};
