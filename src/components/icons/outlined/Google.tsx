import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export default function Google({ size = 24, ...props }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M21 12.1871C21 16.7516 17.823 20 13.1311 20C8.63279 20 5 16.4258 5 12C5 7.57419 8.63279 4 13.1311 4C15.3213 4 17.1639 4.79032 18.5836 6.09355L16.3705 8.1871C13.4754 5.43871 8.0918 7.50323 8.0918 12C8.0918 14.7903 10.3574 17.0516 13.1311 17.0516C16.3508 17.0516 17.5574 14.7806 17.7475 13.6032H13.1311V10.8516H20.8721C20.9475 11.2613 21 11.6548 21 12.1871Z"
        fill="currentColor"
      />
    </svg>
  );
}
