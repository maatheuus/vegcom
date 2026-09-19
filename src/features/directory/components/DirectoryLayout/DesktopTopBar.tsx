import BrandLogo from "@/shared/icons/outlined/Logo";
import Link from "next/link";
import type { Tab } from "../../types";
import { DirectoryTabs } from "./DirectoryTabs";

interface DesktopTopBarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function DesktopTopBar({ activeTab, onTabChange }: DesktopTopBarProps) {
  return (
    <header className="flex shrink-0 items-center justify-between border-b border-green-200 bg-white px-6 py-3">
      <div className="flex items-center gap-3 text-green-500">
        <span className="flex size-9 items-center justify-center rounded-full bg-green-100">
          <BrandLogo size={22} aria-hidden />
        </span>
        <div>
          <p className="font-lora text-lg leading-none italic">
            VegCom em Movimento
          </p>
          <p className="mt-1 text-[10px] font-bold tracking-[0.16em] text-green-200 uppercase">
            Guia e agenda coletiva
          </p>
        </div>
      </div>
      <Link
        href="/"
        className="mr-3 ml-auto rounded-full border border-green-200 px-4 py-2 text-sm font-bold text-green-500 transition hover:bg-green-100"
      >
        Voltar à comunidade
      </Link>
      <DirectoryTabs
        variant="topbar"
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
    </header>
  );
}
