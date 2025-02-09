import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
}
export default function Dialog1({ width, height, ...props }: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 147 98"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M146.027 0H146.527V0.5V97.5V98H146.027H0.500092H9.15527e-05V97.5V0.5V0H0.500092H146.027ZM145.527 97V1H1.00009V97H145.527ZM36.4326 34.6429H119.077V35.6429H36.4326V34.6429ZM36.4368 64.0893H97.5221V65.0893H36.4368V64.0893Z"
        fill="black"
      />
    </svg>
  );
}
