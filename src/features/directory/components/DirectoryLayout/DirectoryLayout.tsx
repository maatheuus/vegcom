"use client";

import styles from "../../directory.module.css";
import { useIsMobile } from "../../hooks/useIsMobile";
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
  const isMobile = useIsMobile();
  const showMapOverlay = !isMobile && isMapView;

  return (
    <div
      className={`${styles.atlas} flex h-dvh flex-col overflow-hidden bg-green-50`}
    >
      {isMobile && <MobileHeader />}
      {!isMobile && !isMapView && (
        <DesktopTopBar activeTab={activeTab} onTabChange={onTabChange} />
      )}
      <main className="relative flex-1 overflow-hidden">
        {showMapOverlay && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1000] flex justify-center p-6">
            <DirectoryTabs
              variant="overlay"
              activeTab={activeTab}
              onTabChange={onTabChange}
            />
          </div>
        )}
        {children}
      </main>
      {isMobile && (
        <nav className="relative flex shrink-0 justify-center border-t border-green-200 bg-white px-5 pt-1.5 pb-[max(0.45rem,env(safe-area-inset-bottom))] shadow-[0_-10px_30px_rgba(27,78,48,0.10)]">
          <DirectoryTabs
            variant="bottom"
            activeTab={activeTab}
            onTabChange={onTabChange}
          />
        </nav>
      )}
    </div>
  );
}
