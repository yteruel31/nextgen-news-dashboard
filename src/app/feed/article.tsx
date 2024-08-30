import { GetArticlesResponseDto } from "@/repositories/_dtos/the-guardian.dto";
import { useServerAction } from "zsa-react";
import { saveArticleAction } from "@/app/feed/actions";
import { useToast } from "@/components/_ui/use-toast";
import { MouseEvent } from "react";
import { ArticleCard } from "@/components/article-card";
import { Button } from "@/components/_ui/Button";

interface ArticleProps {
  data: GetArticlesResponseDto;
}

export const Article = ({ data }: ArticleProps) => {
  const { toast } = useToast();

  const { execute: executeSaveArticle, isPending } = useServerAction(
    saveArticleAction,
    {
      onSuccess: () => {
        toast({
          title: "Article saved",
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

  const handleSaveArticle = async (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    await executeSaveArticle({
      articleId: data.id,
      keywords: data.tags.map((tag) => tag.id),
    });
  };

  return (
    <ArticleCard
      data={data}
      renderActions={
        <Button variant="secondary" onClick={handleSaveArticle}>
          Save
        </Button>
      }
    />
  );
};
