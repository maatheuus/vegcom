"use client";

import styles from "../../directory.module.css";
import type { Tab } from "../../types";
import { DesktopTopBar } from "./DesktopTopBar";
import { DirectoryTabs } from "./DirectoryTabs";
import { MobileHeader } from "./MobileHeader";

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
  // Responsivo por CSS (breakpoint md = 768px), não por JS: evita o flash de
  // hidratação em que o layout mobile piscava no desktop ao recarregar.
  return (
    <div
      className={`${styles.atlas} flex h-dvh flex-col overflow-hidden bg-green-50`}
    >
      <div className="md:hidden">
        <MobileHeader />
      </div>
      {!isMapView && (
        <div className="hidden md:block">
          <DesktopTopBar activeTab={activeTab} onTabChange={onTabChange} />
        </div>
      )}
      <main className="relative flex-1 overflow-hidden">
        {isMapView && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1000] hidden justify-center p-6 md:flex">
            <DirectoryTabs
              variant="overlay"
              activeTab={activeTab}
              onTabChange={onTabChange}
            />
          </div>
        )}
        {children}
      </main>
      <nav className="relative flex shrink-0 justify-center border-t border-green-200 bg-white px-5 pt-1.5 pb-[max(0.45rem,env(safe-area-inset-bottom))] shadow-[0_-10px_30px_rgba(27,78,48,0.10)] md:hidden">
        <DirectoryTabs
          variant="bottom"
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
      </nav>
    </div>
  );
}
