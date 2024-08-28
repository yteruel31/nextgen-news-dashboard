import React from "react";
import * as RadixLabel from "@radix-ui/react-label";

interface LabelProps extends React.ComponentPropsWithoutRef<"label"> {}

export const Label = ({ ...rest }: LabelProps) => {
  return (
    <RadixLabel.Root className="text-xs font-medium text-gray-400" {...rest} />
  );
};
