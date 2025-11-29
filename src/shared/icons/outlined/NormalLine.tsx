import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  width?: string | number;
  height?: number;
}

export default function NormalLine({
  width = 1344,
  height = 4,
  ...props
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 1344 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M1344 1.46867L0 3" stroke="currentColor" />
    </svg>
  );
}
