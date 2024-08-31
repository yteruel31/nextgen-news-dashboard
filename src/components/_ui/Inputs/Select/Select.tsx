import { RefAttributes } from "react";
import ReactSelect, { GroupBase } from "react-select";
// @ts-ignore
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager";
// @ts-ignore
import Select from "react-select/dist/declarations/src/Select";
import { useSelectStyles } from "@/components/_ui/Inputs/Select/useSelectStyles";

export interface SelectProps<Multi extends boolean = false> {
  placeholder?: string;
}

export type GenericSelectProps<
  Option extends unknown = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = Omit<
  StateManagerProps<Option, IsMulti, Group>,
  "name" | "placeholder" | "isMulti"
> &
  RefAttributes<Select<Option, IsMulti, Group>> &
  SelectProps;

export const Select = <
  Option extends unknown = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: GenericSelectProps<Option, IsMulti, Group>,
) => {
  const customStyles = useSelectStyles(props);

  return <ReactSelect styles={customStyles} {...props} />;
};
