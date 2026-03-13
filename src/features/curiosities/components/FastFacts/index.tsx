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
          className="group flex flex-col items-center justify-center rounded-2xl border border-green-500/10 bg-green-50/60 px-4 py-5 text-center transition-colors duration-200 hover:border-green-500/30 hover:bg-green-50"
        >
          <span className="font-lora text-2xl font-bold text-green-600">
            {value}
          </span>
          <span className="font-maitree mt-1 text-xs text-green-500/70">
            {label}
          </span>
          <span className="mt-3 flex items-center gap-1 text-[10px] text-green-200/50 opacity-100 transition-opacity duration-200 group-hover:opacity-100 md:opacity-0">
            {source.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
