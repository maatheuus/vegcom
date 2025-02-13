import { cn } from "@/lib/utils";
import { LogoOutlinedIcon } from "@icons";

export default function Logo({ className, ...props }: { className?: string }) {
  return (
    <div
      aria-label="Logo"
      className={cn("flex items-center justify-start pl-5 pt-5", className)}
      {...props}
    >
      <LogoOutlinedIcon size={48} />
    </div>
  );
}
