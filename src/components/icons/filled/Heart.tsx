import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export default function Heart({ size = 24, ...props }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M30.5 16.8146C30.5 23.3771 20.7697 28.689 20.3553 28.9084C20.2461 28.9671 20.124 28.9979 20 28.9979C19.876 28.9979 19.7539 28.9671 19.6447 28.9084C19.2303 28.689 9.5 23.3771 9.5 16.8146C9.50174 15.2736 10.1147 13.7962 11.2044 12.7065C12.294 11.6168 13.7715 11.0039 15.3125 11.0021C17.2484 11.0021 18.9434 11.8346 20 13.2418C21.0566 11.8346 22.7516 11.0021 24.6875 11.0021C26.2285 11.0039 27.706 11.6168 28.7956 12.7065C29.8853 13.7962 30.4983 15.2736 30.5 16.8146Z"
        fill="currentColor"
      />
    </svg>
  );
}
