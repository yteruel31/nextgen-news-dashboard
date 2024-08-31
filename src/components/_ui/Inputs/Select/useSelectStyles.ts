import { GroupBase, StylesConfig } from "react-select";

type UseSelectStylesOutput = <
  Option extends unknown = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  inputProps: any,
) => StylesConfig<Option, IsMulti, Group>;

export const useSelectStyles: UseSelectStylesOutput = (inputProps) => {
  return {
    container: (provided) => ({
      ...provided,
      width: inputProps.width ?? "100%",
    }),
    control: (provided) => ({
      ...provided,
      borderRadius: "12px",
      padding: "0 0.25em",
      height: "50px",
      borderWidth: "0.1em",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      padding: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,

      ":hover": {},
    }),
    option: (provided) => ({
      ...provided,
      textAlign: "left",
      padding: "1em 0.8em",
      color: "black",
      fontSize: "14px",

      ":hover": {
        backgroundColor: "#e0e0e0",
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "4px",
      marginTop: "8px",
      zIndex: 2,
    }),
    menuList: (provided) => ({
      ...provided,
      boxShadow: "none",
    }),
    input: (provided) => ({
      ...provided,
      padding: "0px",
      margin: "0px",
      textAlign: "left",
    }),
    placeholder: (provided) => ({
      ...provided,
      padding: "0px",
      textAlign: "left",
      display: "flex",
      alignItems: "center",
    }),
    singleValue: (provided) => ({
      ...provided,
      textAlign: "left",
      display: "flex",
      alignItems: "center",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0 8px",
      alignItems: "initial",
    }),
  };
};
