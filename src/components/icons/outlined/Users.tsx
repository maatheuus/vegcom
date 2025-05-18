import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export default function Users({ size = 24, ...props }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={size}
      height={size}
      {...props}
    >
      <rect width="256" height="256" fill="none" />
      <circle
        cx="84"
        cy="108"
        r="52"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <path
        d="M10.23,200a88,88,0,0,1,147.54,0"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <path
        d="M172,160a87.93,87.93,0,0,1,73.77,40"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <path
        d="M152.69,59.7A52,52,0,1,1,172,160"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </svg>
  );
}
