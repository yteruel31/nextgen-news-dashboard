import { forwardRef } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "text-white bg-slate-600 hover:bg-slate-600/80",
        secondary: "hover:underline bg-white border border-black",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        md: "h-9 px-4 py-2 text-sm",
        lg: "h-10 px-6 text-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

interface ButtonProps
  extends React.ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, className, ...rest }, ref) => (
    <button
      {...rest}
      ref={ref}
      className={cn(buttonVariants({ variant, className }))}
    />
  ),
);

Button.displayName = "Button";
