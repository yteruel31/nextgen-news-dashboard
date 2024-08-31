import { useServerAction } from "zsa-react";
import { useToast } from "@/components/_ui/use-toast";
import { MouseEvent } from "react";
import { ArticleCard } from "@/components/article-card";
import { Button } from "@/components/_ui/Button";
import { Article as ArticleModel } from "@/services/models/article.model";
import { saveArticleAction, unsaveArticleAction } from "@/app/discover/actions";
import { useQueryClient } from "@tanstack/react-query";

interface ArticleProps {
  data: ArticleModel;
}

export const Article = ({ data }: ArticleProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { execute: executeSaveArticle } = useServerAction(saveArticleAction, {
    onSuccess: () => {
      toast({
        title: "Article saved",
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["articles", "personalized_articles"],
      });
    },
    onError: ({ err }) => {
      toast({
        title: "Something went wrong",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const { execute: executeUnsaveArticle } = useServerAction(
    unsaveArticleAction,
    {
      onSuccess: () => {
        toast({
          title: "Article unsaved",
          variant: "success",
        });
        queryClient.invalidateQueries({
          queryKey: ["articles", "personalized_articles"],
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

  const handleSaveArticle = async (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    await executeSaveArticle({
      articleId: data.id,
      keywords: data.tags.map((tag) => tag.id),
    });
  };

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
        data.isSaved ? (
          <Button variant="secondary" onClick={handleUnsaveArticle}>
            Unsave
          </Button>
        ) : (
          <Button variant="secondary" onClick={handleSaveArticle}>
            Save
          </Button>
        )
      }
    />
  );
};
