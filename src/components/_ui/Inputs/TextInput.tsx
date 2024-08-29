import React, { forwardRef } from "react";
import { Label } from "@/components/_ui/Label";

interface TextInputProps extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, id, ...rest }: TextInputProps, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <Label htmlFor={id}>{label}</Label>
        <input
          className="text-base p-3 rounded-xl border border-gray-500"
          id={id}
          ref={ref}
          {...rest}
        />
      </div>
    );
  },
);

TextInput.displayName = "TextInput";
