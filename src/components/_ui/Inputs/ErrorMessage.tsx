import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const ErrorMessage = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement> & { message?: string }
>(({ className, children, message, ...props }, ref) => {
  const body = message ? String(message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      className={cn("text-sm font-medium text-red-700", className)}
      {...props}
    >
      {body}
    </p>
  );
});
