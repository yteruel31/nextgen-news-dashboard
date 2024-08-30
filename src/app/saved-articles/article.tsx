"use client";

import { Button } from "@/components/_ui/Button";
import { ArticleCard } from "@/components/article-card";
import { useToast } from "@/components/_ui/use-toast";
import { useServerAction } from "zsa-react";
import { MouseEvent } from "react";
import { unsaveArticleAction } from "@/app/saved-articles/actions";
import { Article as ArticleModel } from "@/services/models/article.model";

interface ArticleProps {
  data: ArticleModel;
}

export const Article = ({ data }: ArticleProps) => {
  const { toast } = useToast();

  const { execute: executeUnsaveArticle } = useServerAction(
    unsaveArticleAction,
    {
      onSuccess: () => {
        toast({
          title: "Article unsaved",
          variant: "success",
        });
      },
      onError: ({ err }) => {
        toast({
          title: "Something went wrong",
          description: err.message,
          variant: "destructive",
        });
      },
    },
  );

  const handleUnsaveArticle = async (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    await executeUnsaveArticle({
      articleId: data.id,
    });
  };

  return (
    <ArticleCard
      data={data}
      renderActions={
        <Button variant="secondary" onClick={handleUnsaveArticle}>
          Unsave
        </Button>
      }
    />
  );
};
