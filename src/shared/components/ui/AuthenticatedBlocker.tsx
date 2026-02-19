import { cn } from "@/shared/lib/utils";
import Button from "@/shared/ui/Button";
import { ArrowRightIcon, UserCircleIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { type HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  action?: string;
  redirectHref?: string;
  type?: "banner";
}

export default function AuthenticatedBlocker({
  title = "Entre para interagir",
  description,
  action = "Entrar",
  redirectHref = "/login",
  className,
  type = "banner",
  ...props
}: Props) {
  if (type === "banner") {
    return (
      <div
        className={cn(
          "flex items-center justify-between gap-x-4 rounded-2xl bg-green-100/60 p-2 shadow-sm transition-all hover:bg-green-100",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 text-green-600">
            <UserCircleIcon size={32} weight="duotone" />
          </div>
          <div>
            <h3 className="font-lora text-lg font-medium text-green-500">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-green-500/80">{description}</p>
            )}
          </div>
        </div>

        <Link href={redirectHref}>
          <Button
            variant="default"
            className="h-10 px-4 font-medium transition-transform hover:scale-105 active:scale-95"
          >
            {action}
            <ArrowRightIcon size={18} weight="bold" />
          </Button>
        </Link>
      </div>
    );
  }
}
