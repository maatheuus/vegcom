import { LogoOutlinedIcon } from "@/shared/icons";
import { cn } from "@/shared/lib/utils";

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
      <LogoOutlinedIcon size={size} />
    </div>
  );
}
