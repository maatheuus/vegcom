import Button from "@/shared/ui/Button";
import { ArrowRightIcon } from "@phosphor-icons/react";
import clsx from "clsx";
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
        className={clsx(
          "group flex items-center justify-between gap-x-4 rounded-2xl border border-green-500/10 bg-green-50/80 px-4 py-3 shadow-sm transition-all hover:border-green-500/20 hover:bg-green-100/60",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-x-3">
          <div className="flex flex-col">
            <span className="font-lora text-base font-medium text-green-700 italic">
              {title}
            </span>
            {description && (
              <span className="text-xs text-green-500/70">{description}</span>
            )}
          </div>
        </div>

        <Link href={redirectHref} className="shrink-0">
          <Button
            variant="default"
            className="h-9 gap-x-1.5 rounded-xl px-4 text-sm font-semibold transition-all hover:scale-105 active:scale-95"
          >
            {action}
            <ArrowRightIcon size={15} weight="bold" />
          </Button>
        </Link>
      </div>
    );
  }
}
