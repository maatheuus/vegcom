import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export default function SeatCircle({ size = 126, ...props }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 126 126"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="0.5"
        y="0.5"
        width="125"
        height="125"
        rx="62.5"
        fill="white"
        stroke="currentColor"
      />
    </svg>
  );
}
