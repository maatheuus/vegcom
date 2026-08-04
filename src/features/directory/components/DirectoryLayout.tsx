"use client";

import { CalendarDays, MapIcon, Sprout } from "lucide-react";
import Link from "next/link";
import styles from "../directory.module.css";
import { useIsMobile } from "../hooks/useIsMobile";

export type Tab = "map" | "events";

interface TabConfig {
  key: Tab;
  label: string;
  icon: React.ReactNode;
}

const TABS: TabConfig[] = [
  {
    key: "map",
    label: "Mapa",
    icon: <MapIcon className="h-5 w-5" aria-hidden />,
  },
  {
    key: "events",
    label: "Eventos",
    icon: <CalendarDays className="h-5 w-5" aria-hidden />,
  },
];

interface DirectoryLayoutProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  children: React.ReactNode;
  isMapView: boolean;
}

export function DirectoryLayout({
  activeTab,
  onTabChange,
  children,
  isMapView,
}: DirectoryLayoutProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div
        className={`${styles.atlas} flex h-dvh flex-col overflow-hidden bg-green-50`}
      >
        <header className="flex shrink-0 items-center justify-between border-b border-green-200 bg-white px-4 py-2.5">
          <div className="flex items-center gap-2 text-green-500"><span className="flex size-8 items-center justify-center rounded-full bg-green-100"><Sprout className="size-4" /></span><span className="font-lora text-lg italic">Mapa VegCom</span></div>
          <Link href="/" className="rounded-full border border-green-200 px-3 py-1.5 text-xs font-bold text-green-500 transition hover:bg-green-100">Comunidade</Link>
        </header>
        <main className="relative flex-1 overflow-hidden">{children}</main>
        <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
      </div>
    );
  }

  return (
    <div
      className={`${styles.atlas} flex h-dvh flex-col overflow-hidden bg-green-50`}
    >
      {!isMapView && (
        <DesktopTopBar activeTab={activeTab} onTabChange={onTabChange} />
      )}
      <main className="relative flex-1 overflow-hidden">
        {isMapView && (
          <DesktopNavOverlay activeTab={activeTab} onTabChange={onTabChange} />
        )}
        {children}
      </main>
    </div>
  );
}

function BottomNav({
  activeTab,
  onTabChange,
}: {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}) {
  return (
    <nav
      className="relative flex shrink-0 items-center justify-around border-t border-green-200 bg-white px-3 pt-1.5 pb-[max(0.45rem,env(safe-area-inset-bottom))] shadow-[0_-10px_30px_rgba(27,78,48,0.10)]"
      role="tablist"
      aria-label="Navegação principal"
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab.key)}
            className={[
              "relative flex min-w-24 flex-col items-center gap-1 rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200",
              "focus-visible:ring-2 focus-visible:ring-green-200 focus-visible:ring-offset-2 focus-visible:outline-none",
              isActive
                ? "bg-green-500 text-white shadow-[0_5px_14px_rgba(27,78,48,0.22)]"
                : "text-green-200 hover:bg-green-100 hover:text-green-500",
            ].join(" ")}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function DesktopNavOverlay({
  activeTab,
  onTabChange,
}: {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1000] flex justify-center p-6">
      <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-green-200 bg-white px-2 py-2 shadow-[0_14px_36px_rgba(27,78,48,0.18)]">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => onTabChange(tab.key)}
              className={[
                "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200",
                "focus-visible:ring-2 focus-visible:ring-green-200 focus-visible:ring-offset-2 focus-visible:outline-none",
                isActive
                  ? "bg-green-500 text-white shadow-[0_4px_12px_rgba(27,78,48,0.25)]"
                  : "text-green-200 hover:bg-green-100 hover:text-green-500",
              ].join(" ")}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DesktopTopBar({
  activeTab,
  onTabChange,
}: {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}) {
  return (
    <header className="flex shrink-0 items-center justify-between border-b border-green-200 bg-white px-6 py-3">
      <div className="flex items-center gap-3 text-green-500">
        <span className="flex size-9 items-center justify-center rounded-full bg-green-100">
          <Sprout className="size-5" aria-hidden />
        </span>
        <div>
          <p className="font-lora text-lg leading-none italic">Mapa VegCom</p>
          <p className="mt-1 text-[10px] font-bold tracking-[0.16em] text-green-200 uppercase">
            Guia coletivo
          </p>
        </div>
      </div>
      <Link href="/" className="ml-auto mr-3 rounded-full border border-green-200 px-4 py-2 text-sm font-bold text-green-500 transition hover:bg-green-100">Voltar à comunidade</Link>
      <div
        className="flex items-center gap-1 rounded-full bg-green-100 p-1"
        role="tablist"
        aria-label="Navegação principal"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => onTabChange(tab.key)}
              className={[
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200",
                "focus-visible:ring-2 focus-visible:ring-green-200 focus-visible:ring-offset-2 focus-visible:outline-none",
                isActive
                  ? "bg-green-500 text-white shadow-sm"
                  : "text-green-200 hover:text-green-500",
              ].join(" ")}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
