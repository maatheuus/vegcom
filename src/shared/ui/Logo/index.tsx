import { cn } from "@/shared/lib/utils";
import Image from "next/image";

export default function Logo({
  className,
  size = 48,
  ...props
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      aria-label="Logo"
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      <Image
        src="/favicon-leaf-fork.png"
        alt="VegCom Logo"
        width={size}
        height={size}
        className="object-contain"
      />
    </div>
  );
}
