import { ArrowSquareOutIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { fastFacts } from "../curiosites/utils";

export default function FastFacts() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {fastFacts.map(({ value, label, source }) => (
        <Link
          key={label}
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-green-500/10 bg-green-50/60 px-3 py-4 text-center transition-colors duration-200 hover:border-green-500/30 hover:bg-green-50 md:px-4 md:py-5"
        >
          <span className="font-lora text-xl font-bold text-green-600 md:text-2xl">
            {value}
          </span>
          <span className="font-maitree mt-1 text-xs text-green-500/70">
            {label}
          </span>

          <span className="mt-auto flex items-center justify-center gap-1 pt-3 text-[9px] text-gray-400 md:hidden">
            <ArrowSquareOutIcon size={10} weight="fill" className="shrink-0" />
            <span className="line-clamp-1">{source.label}</span>
          </span>

          <div className="absolute inset-0 hidden flex-col items-center justify-center gap-1 bg-black/70 px-2 pt-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:flex">
            <ArrowSquareOutIcon
              size={18}
              weight="fill"
              className="text-green-50"
            />
            <span className="font-maitree text-xs text-green-50">
              {source.label}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
