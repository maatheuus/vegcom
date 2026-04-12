import Button from "@/shared/ui/Button";
import { ArrowRightIcon, LockSimpleIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import Link from "next/link";
import { type HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  action?: string;
  redirectHref?: string;
  showIcon?: boolean;
}

export default function AuthenticatedBlocker({
  title = "Entre para interagir",
  description,
  action = "Fazer login",
  redirectHref = "/login",
  className,
  showIcon = true,
  ...props
}: Props) {
  return (
    <div
      className={clsx(
        "flex flex-col flex-wrap items-center justify-center gap-4 rounded-2xl bg-white px-2 py-4 shadow-sm sm:px-5",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-x-3">
        {showIcon && (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100">
            <LockSimpleIcon
              size={16}
              weight="fill"
              className="text-green-500"
            />
          </div>
        )}

        <div className="flex flex-col gap-0.5 text-center sm:text-left">
          <span className="font-lora text-sm font-semibold text-green-500">
            {title}
          </span>
          {description && (
            <span className="font-maitree text-xs text-green-200">
              {description}
            </span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <Button.Link
          href={redirectHref}
          className="font-maitree h-8 gap-x-1.5 rounded-xl bg-green-500 px-4 text-xs font-medium"
        >
          {action}
          <ArrowRightIcon size={14} weight="bold" />
        </Button.Link>
        <Link
          href="/signup"
          className="font-maitree text-xs text-green-200 underline underline-offset-2 transition-colors hover:text-green-600"
        >
          Cadastrar-se
        </Link>
      </div>
    </div>
  );
}
