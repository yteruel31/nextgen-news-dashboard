import React from "react";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const containerVariants = cva("mx-auto flex w-full flex-col items-center", {
  variants: {
    size: {
      md: "max-w-lg",
      lg: "max-w-7xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface ContainerProps
  extends React.ComponentPropsWithoutRef<"main">,
    VariantProps<typeof containerVariants> {
  children: React.ReactNode;
}

export const Container = ({ children, size, className }: ContainerProps) => {
  return (
    <main className="px-5 md:px-0 py-14 md:py-20 lg:py-24">
      <div className={cn(containerVariants({ size, className }))}>
        {children}
      </div>
    </main>
  );
};
