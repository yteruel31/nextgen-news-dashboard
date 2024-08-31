import { useServerAction } from "zsa-react";
import { useToast } from "@/components/_ui/use-toast";
import { MouseEvent } from "react";
import { ArticleCard } from "@/components/article-card";
import { Button } from "@/components/_ui/Button";
import { Article as ArticleModel } from "@/services/models/article.model";
import { useQueryClient } from "@tanstack/react-query";
import {
  saveArticleAction,
  unsaveArticleAction,
} from "@/app/(articles)/actions";
import { MaterialSymbol } from "react-material-symbol-icons";

interface ArticleProps {
  data: ArticleModel;
  cacheToInvalidate: ("personalized_articles" | "articles")[];
}

export const Article = ({ data, cacheToInvalidate }: ArticleProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { execute: executeSaveArticle, isPending: saveArticleIsPending } =
    useServerAction(saveArticleAction, {
      onSuccess: () => {
        toast({
          title: "Article saved",
          variant: "success",
        });
        queryClient.invalidateQueries({
          queryKey: cacheToInvalidate,
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

  const { execute: executeUnsaveArticle, isPending: unsaveArticleIsPending } =
    useServerAction(unsaveArticleAction, {
      onSuccess: () => {
        toast({
          title: "Article unsaved",
          variant: "success",
        });
        queryClient.invalidateQueries({
          queryKey: cacheToInvalidate,
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
          <Button
            variant="secondary"
            onClick={handleUnsaveArticle}
            isLoading={unsaveArticleIsPending}
            rightSection={
              <MaterialSymbol icon="heart_broken" filled size="20" />
            }
          >
            Unsave
          </Button>
        ) : (
          <Button
            variant="secondary"
            onClick={handleSaveArticle}
            isLoading={saveArticleIsPending}
            rightSection={
              <MaterialSymbol
                icon="favorite"
                className="hover:no-underline"
                filled
                size="20"
              />
            }
          >
            Save
          </Button>
        )
      }
    />
  );
};
