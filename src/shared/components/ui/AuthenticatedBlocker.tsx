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
  type?: "banner";
}

export default function AuthenticatedBlocker({
  title = "Entre para interagir",
  description,
  action = "Fazer login",
  redirectHref = "/login",
  className,
  type = "banner",
  ...props
}: Props) {
  if (type === "banner") {
    return (
      <div
        className={clsx(
          "flex items-center justify-between gap-x-4 rounded-2xl bg-white px-5 py-4 shadow-sm",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-x-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100">
            <LockSimpleIcon
              size={16}
              weight="fill"
              className="text-green-500"
            />
          </div>

          <div className="flex flex-col gap-0.5">
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

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/register"
            className="font-maitree text-xs text-green-200 underline underline-offset-2 transition-colors hover:text-green-600"
          >
            Cadastrar-se
          </Link>
          <Link href={redirectHref}>
            <Button
              variant="default"
              className="font-maitree h-8 gap-x-1.5 rounded-xl px-4 text-xs font-medium"
            >
              {action}
              <ArrowRightIcon size={13} weight="bold" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}
