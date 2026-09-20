import BrandLogo from "@/shared/icons/outlined/Logo";
import Link from "next/link";

export function MobileHeader() {
  return (
    <header className="flex shrink-0 items-center justify-between border-b border-green-200 bg-white px-4 py-2.5">
      <div className="flex items-center gap-2.5 text-green-500">
        <span className="flex size-10 items-center justify-center rounded-full bg-green-100">
          <BrandLogo size={26} aria-hidden />
        </span>
        <span className="font-lora text-lg font-bold italic">VegCom</span>
      </div>
      <Link
        href="/"
        className="inline-flex min-h-10 items-center rounded-full border border-green-200 px-4 text-xs font-bold text-green-500 transition-[background-color,color,scale] duration-150 hover:bg-green-100 active:scale-[0.96]"
      >
        Comunidade
      </Link>
    </header>
  );
}
