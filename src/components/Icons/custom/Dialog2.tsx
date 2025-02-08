import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
}
export default function Dialog2({ width, height, ...props }: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 164 82"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.5 0H0V0.5V81.502V82.002H0.5H163.5H164V81.502V0.5V0H163.5H0.5ZM1 81.002V1H163V81.002H1ZM123.253 28.9293H30.6852V29.9293H123.253V28.9293ZM123.251 53.5192H54.8308V54.5192H123.251V53.5192Z"
        fill="black"
      />
    </svg>
  );
}
