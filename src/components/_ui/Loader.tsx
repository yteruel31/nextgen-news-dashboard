import { HTMLProps } from "react";

interface LoaderProps extends HTMLProps<SVGSVGElement> {}

export const Loader = (props: LoaderProps) => {
  return (
    <svg
      {...props}
      className="stroke-accent-foreground"
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd">
        <g transform="translate(2.5 2.5)" strokeWidth="5">
          <path d="M32 16c0-9.94-8.06-16-16-16">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 16 16"
              to="360 16 16"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
  );
};
