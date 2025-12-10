import Button from "@/shared/ui/Button";
import Row from "@/shared/ui/Layout/Helpers/Row";
import clsx from "clsx";
import Link from "next/link";
import { type JSX } from "react";

export interface Tab {
  key: string;
  label: string;
  icon: JSX.Element;
  component: JSX.Element;
}

interface Props {
  className?: string;
  tabs: Tab[];
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  hasLink?: boolean;
  isChatLayout?: boolean;
  isTransitioning?: boolean;
}

export default function Tabs({
  className,
  selectedTab,
  setSelectedTab,
  tabs,
  hasLink = true,
  isChatLayout,
  isTransitioning = false,
  ...props
}: Props) {
  const handleTabClick = (tabKey: string) => {
    if (isTransitioning || tabKey === selectedTab) return;
    setSelectedTab(tabKey);
  };

  return (
    <Row
      className={clsx(
        "w-full justify-between border-b border-b-black/10 px-4 py-2",
        className,
      )}
      {...props}
    >
      <Row className="gap-x-4">
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            onClick={() => handleTabClick(tab.key)}
            variant="text"
            disabled={isTransitioning}
            className={clsx(
              "group relative cursor-pointer p-0 transition-all duration-200 after:absolute after:-bottom-2.5 after:left-0 after:h-0.5 after:rounded-full after:bg-green-200 after:transition-all after:duration-300 after:content-[''] [&_svg]:size-fit",
              isChatLayout &&
                "gap-x-1 rounded-full p-2 after:hidden [&_svg]:rounded-none hover:[&_svg]:text-green-500",
              isChatLayout &&
                selectedTab === tab.key &&
                "bg-green-50 [&_svg]:text-green-200",
              selectedTab === tab.key ? "after:w-full" : "after:w-0",
              isTransitioning && "pointer-events-none opacity-70",
            )}
          >
            {tab.icon}
            <span
              className={clsx(
                "font-lora hidden italic group-hover:text-green-500 md:inline",
                isChatLayout && "text-green-50",
                isChatLayout && selectedTab === tab.key && "text-green-500",
              )}
            >
              {tab.label}
            </span>
          </Button>
        ))}
      </Row>

      {hasLink && (
        <Link
          href="/community/recipes"
          className="font-lora text-base font-semibold text-green-200 italic underline transition-colors hover:text-green-500"
        >
          Explorar receitas
        </Link>
      )}
    </Row>
  );
}
