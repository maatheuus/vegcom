import { LogoOutlinedIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

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
