"use client";

import { Button } from "@/components/_ui/Button";
import { ArticleCard } from "@/components/article-card";
import { useToast } from "@/components/_ui/use-toast";
import { useServerAction } from "zsa-react";
import { MouseEvent } from "react";
import { Article as ArticleModel } from "@/services/models/article.model";
import { unsaveArticleAction } from "@/app/(articles)/actions";
import { useQueryClient } from "@tanstack/react-query";
import { MaterialSymbol } from "react-material-symbol-icons";

interface ArticleProps {
  data: ArticleModel;
}

export const Article = ({ data }: ArticleProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { execute: executeUnsaveArticle, isPending } = useServerAction(
    unsaveArticleAction,
    {
      onSuccess: async () => {
        toast({
          title: "Article unsaved",
          variant: "success",
        });
        await queryClient.invalidateQueries({
          queryKey: ["articles"],
        });

        await queryClient.invalidateQueries({
          queryKey: ["personalized_articles"],
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
        <Button
          variant="secondary"
          onClick={handleUnsaveArticle}
          isLoading={isPending}
          rightSection={<MaterialSymbol icon="heart_broken" filled size="20" />}
        >
          Unsave
        </Button>
      }
    />
  );
};
