"use client";

import { GetArticlesResponseDto } from "@/repositories/_dtos/the-guardian.dto";
import { Button } from "@/components/_ui/Button";
import { ArticleCard } from "@/components/article-card";
import { useToast } from "@/components/_ui/use-toast";
import { useServerAction } from "zsa-react";
import { MouseEvent } from "react";
import { unsaveArticleAction } from "@/app/saved-articles/actions";

interface ArticleProps {
  data: GetArticlesResponseDto;
}

export const Article = ({ data }: ArticleProps) => {
  const { toast } = useToast();

  const { execute: executeUnsaveArticle, isPending } = useServerAction(
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
