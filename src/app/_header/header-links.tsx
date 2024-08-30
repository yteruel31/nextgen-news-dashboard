import { Anchor } from "@/components/_ui/Anchor";

export const HeaderLinks = () => {
  return (
    <>
      <Anchor href="/feed" variant="ghost">
        My feed
      </Anchor>
      <Anchor href="/saved-articles" variant="ghost">
        Saved articles
      </Anchor>
    </>
  );
};
