import clsx from "clsx";
import Image from "next/image";

export default function Logo({
  className,
  imgClassName,
  white,
  width = 256,
  height = 256,
  priority,
  ...props
}: {
  className?: string;
  imgClassName?: string;
  white?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  return (
    <div
      aria-label="Logo"
      className={clsx("flex items-center justify-center", className)}
      {...props}
    >
      <Image
        src={white ? "/logo-white.png" : "/logo-green.png"}
        alt="VegCom Logo"
        width={width}
        height={height}
        priority={priority}
        className={clsx("object-contain", imgClassName)}
      />
    </div>
  );
}
