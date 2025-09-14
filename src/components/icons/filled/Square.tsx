import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export default function Square({ size = 24, ...props }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={size}
      height={size}
      {...props}
    >
      <rect width="256" height="256" fill="none" />
      <rect x="32" y="32" width="192" height="192" rx="16" />
    </svg>
  );
}
