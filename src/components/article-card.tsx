import Image from "next/image";
import React from "react";
import { Article } from "@/services/models/article.model";
import dayjs from "dayjs";

interface ArticleCardProps {
  data: Article;
  renderActions: React.ReactNode;
}

export const ArticleCard = ({ data, renderActions }: ArticleCardProps) => {
  return (
    <a
      href={data.webUrl}
      target="_blank"
      className="bg-white overflow-hidden border transition-shadow rounded-lg cursor-pointer hover:shadow-lg"
    >
      {data.fields?.thumbnail && (
        <Image
          src={data.fields?.thumbnail}
          alt={"Article thumbnail"}
          width={700}
          height={500}
        />
      )}
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {data.webTitle}
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="px-4 py-5 flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <div className="inline-flex items-center justify-center rounded-full px-2.5 py-0.5 font-semibold text-sm border-transparent bg-slate-700 text-white text-primary-foreground">
                {data.sectionName}
              </div>
              <dt className="text-sm font-medium text-gray-500">
                Published on
              </dt>
              <dd className="text-sm text-gray-900">
                {dayjs(data.webPublicationDate).format("DD MMMM YYYY HH:mm")}
              </dd>
            </div>
            {renderActions}
          </div>
        </dl>
      </div>
    </a>
  );
};
