import Button from "@/components/ui/Button";
import Row from "@/components/ui/Layout/Helpers/Row";
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
          <Button.Icon
            key={tab.key}
            onClick={() => handleTabClick(tab.key)}
            variant="text"
            leftIcon={tab.icon}
            disabled={isTransitioning}
            className={clsx(
              "font-lora relative p-0 text-green-200 italic transition-all duration-200 after:absolute after:-bottom-2.5 after:left-0 after:h-0.5 after:rounded-full after:bg-green-200 after:transition-all after:duration-300 after:content-[''] hover:text-green-500 [&_svg]:size-fit",
              isChatLayout &&
                "gap-x-1 rounded-full p-2 text-green-50 after:hidden [&_svg]:rounded-none hover:[&_svg]:text-green-500",
              isChatLayout &&
                selectedTab === tab.key &&
                "bg-green-50 text-green-500 [&_svg]:text-green-200",
              selectedTab === tab.key ? "after:w-full" : "after:w-0",
              isTransitioning && "pointer-events-none opacity-70",
            )}
          >
            {tab.label}
          </Button.Icon>
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
