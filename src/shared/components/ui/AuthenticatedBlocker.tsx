import Button from "@/shared/ui/Button";
import {
  ArrowRightIcon,
  BookmarkSimpleIcon,
  ChatCircleIcon,
  HeartIcon,
  LockSimpleIcon,
  PlusIcon,
} from "@phosphor-icons/react";

import clsx from "clsx";
import Link from "next/link";
import { type HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  action?: string;
  redirectHref?: string;
  showIcon?: boolean;
  type?: "default" | "minimal";
}

interface BlockerCardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  action?: string;
  redirectHref?: string;
  showIcon?: boolean;
}

function BlockerCard({
  title = "Entre para interagir",
  description,
  action = "Fazer login",
  redirectHref = "/login",
  className,
  showIcon = true,
  ...props
}: BlockerCardProps) {
  return (
    <div
      className={clsx(
        "flex flex-col items-start justify-center gap-4 rounded-2xl bg-white px-8 py-3 shadow-xl",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-x-3.5">
        {showIcon && (
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-100 ring-1 shadow-inner ring-gray-200/60">
            <LockSimpleIcon
              size={20}
              weight="fill"
              className="text-green-800"
            />
          </div>
        )}
        <div className="flex flex-col gap-0.5">
          <span className="font-lora text-lg leading-snug font-bold text-green-900">
            {title}
          </span>
          {description && (
            <span className="font-maitree text-sm text-green-700/60">
              {description}
            </span>
          )}
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-3">
        <Button.Link
          href={redirectHref}
          className="font-maitree flex w-full items-center justify-center gap-x-2 rounded-full bg-green-900 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-800"
        >
          {action}
          <ArrowRightIcon size={14} weight="bold" />
        </Button.Link>

        <Link
          href="/signup"
          className="font-maitree text-sm text-gray-800 underline underline-offset-2 transition-colors hover:text-green-800"
        >
          Cadastrar-se
        </Link>
      </div>
    </div>
  );
}

export default function AuthenticatedBlocker({
  title = "Entre para interagir",
  description,
  action = "Fazer login",
  redirectHref = "/login",
  className,
  showIcon = true,
  type = "default",
  ...props
}: Props) {
  if (type === "minimal") {
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
            <span className="font-lora text-base font-semibold text-green-500">
              {title}
            </span>
            {description && (
              <span className="font-maitree text-xs text-green-200">
                {description}
              </span>
            )}
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-3">
          <Button.Link
            href={redirectHref}
            className="font-maitree flex w-full items-center justify-center gap-x-2 rounded-full bg-green-900 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-800"
          >
            {action}
            <ArrowRightIcon size={14} weight="bold" />
          </Button.Link>

          <Link
            href="/signup"
            className="font-maitree text-sm text-gray-800 underline underline-offset-2 transition-colors hover:text-green-800"
          >
            Cadastrar-se
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "absolute h-full overflow-hidden rounded-2xl border border-gray-200/70 bg-[#F4EFE4]",
        className,
      )}
      {...props}
    >
      <div className="relative h-full">
        <div
          className="pointer-events-none flex h-full gap-4 blur-sm select-none"
          aria-hidden
        >
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            {MOCK_POSTS.map((post) => (
              <div
                key={post.id}
                className="rounded-xl bg-white/80 p-4 shadow-sm"
              >
                <div className="mb-2 flex items-center gap-2.5">
                  <div className="h-8 w-8 shrink-0 rounded-full bg-green-200" />
                  <div>
                    <p className="font-maitree text-xs font-semibold text-green-900">
                      {post.author}
                    </p>
                    <p className="font-maitree text-[10px] text-gray-400">
                      {post.time}
                    </p>
                  </div>
                </div>
                <p className="font-maitree line-clamp-2 text-xs text-gray-600">
                  {post.content}
                </p>
                <div className="mt-3 flex items-center gap-4">
                  <span className="flex items-center gap-1 text-[10px] text-gray-400">
                    <HeartIcon size={12} />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-gray-400">
                    <ChatCircleIcon size={12} />
                    {post.comments}
                  </span>
                  <BookmarkSimpleIcon
                    size={12}
                    className="ml-auto text-gray-300"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="w-44 shrink-0">
            <div className="rounded-xl bg-white/80 p-2 shadow-sm">
              <div className="mb-2 flex items-center gap-2">
                <div className="h-7 w-7 shrink-0 rounded-full bg-green-300" />
                <div>
                  <p className="font-maitree text-[10px] font-semibold text-green-900">
                    {MOCK_SIDEBAR.author}
                  </p>
                  <p className="font-maitree text-[9px] text-gray-400">
                    {MOCK_SIDEBAR.time}
                  </p>
                </div>
              </div>
              <p className="font-maitree line-clamp-3 text-[10px] text-gray-500">
                {MOCK_SIDEBAR.content}
              </p>
              <div className="mt-3">
                <BookmarkSimpleIcon size={11} className="text-gray-300" />
              </div>
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute top-4 left-[30%] blur-[1.5px]"
          aria-hidden
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md">
            <HeartIcon size={18} weight="fill" className="text-red-400" />
          </div>
        </div>

        <div
          className="pointer-events-none absolute top-14 left-[36%] blur-[1.5px]"
          aria-hidden
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-green-700 bg-white shadow-sm">
            <ChatCircleIcon size={16} className="text-green-700" />
          </div>
        </div>

        <div
          className="pointer-events-none absolute top-1/2 right-[14%] -translate-y-1/2 blur-[1.5px]"
          aria-hidden
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm">
            <BookmarkSimpleIcon size={14} className="text-green-700" />
          </div>
        </div>

        <div className="absolute inset-0 my-auto flex h-fit items-center justify-center p-0">
          <BlockerCard
            title={title}
            description={description}
            action={action}
            redirectHref={redirectHref}
            showIcon={showIcon}
            className="w-full max-w-xs"
          />
        </div>
      </div>
    </div>
  );
}

const MOCK_POSTS = [
  {
    id: 1,
    author: "Larissa Fonseca",
    time: "2 min",
    content:
      "Fiz essa receita de bowl de grão-de-bico assado com tahine e ficou incrível! Altamente recomendo para o almoço da semana 🌱",
    likes: 24,
    comments: 8,
  },
  {
    id: 2,
    author: "Bruno Macedo",
    time: "14 min",
    content:
      "Alguém tem dica de substituto para ovo em bolos? Tentei linhaça mas não ficou muito bom...",
    likes: 11,
    comments: 19,
  },
];

const MOCK_SIDEBAR = {
  author: "Fernanda Costa",
  time: "1h",
  content:
    "Compartilhando meu diário de 30 dias sem proteína animal — resultados surpreendentes na disposição e no sono.",
};
