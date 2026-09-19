import clsx from "clsx";
import { CalendarDays, MapIcon } from "lucide-react";
import type { Tab } from "../../types";

const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
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

const VARIANT_STYLES = {
  bottom: {
    list: "grid w-full max-w-lg grid-cols-2 gap-3",
    tab: "relative flex w-full flex-col items-center gap-1 rounded-xl px-4 py-2 text-xs transition-[background-color,color,box-shadow,scale] duration-150 active:scale-[0.96]",
    active: "bg-green-500 text-white shadow-[0_5px_14px_rgba(27,78,48,0.22)]",
    inactive: "text-green-200 hover:bg-green-100 hover:text-green-500",
  },
  overlay: {
    list: "pointer-events-auto flex items-center gap-1 rounded-full border border-green-200 bg-white px-2 py-2 shadow-[0_14px_36px_rgba(27,78,48,0.18)]",
    tab: "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition-all duration-200",
    active: "bg-green-500 text-white shadow-[0_4px_12px_rgba(27,78,48,0.25)]",
    inactive: "text-green-200 hover:bg-green-100 hover:text-green-500",
  },
  topbar: {
    list: "flex items-center gap-1 rounded-full bg-green-100 p-1",
    tab: "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all duration-200",
    active: "bg-green-500 text-white shadow-sm",
    inactive: "text-green-200 hover:text-green-500",
  },
} as const;

interface DirectoryTabsProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  variant: keyof typeof VARIANT_STYLES;
}

export function DirectoryTabs({
  activeTab,
  onTabChange,
  variant,
}: DirectoryTabsProps) {
  const styles = VARIANT_STYLES[variant];

  return (
    <div
      className={styles.list}
      role="tablist"
      aria-label="Navegação principal"
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab.key)}
            className={clsx(
              styles.tab,
              "font-semibold focus-visible:ring-2 focus-visible:ring-green-200 focus-visible:ring-offset-2 focus-visible:outline-none",
              isActive ? styles.active : styles.inactive,
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
