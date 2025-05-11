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
}

export default function Tabs({
  className,
  selectedTab,
  setSelectedTab,
  tabs,
  ...props
}: Props) {
  return (
    <Row
      className={clsx(
        "border-b border-b-black/10 w-full justify-between px-4 py-2",
        className
      )}
      {...props}
    >
      <Row className="gap-x-4">
        {tabs.map((tab) => (
          <Button.Icon
            key={tab.key}
            onClick={() => setSelectedTab(tab.key)}
            variant="text"
            className={clsx(
              "p-0 text-green-200 hover:text-green-500 relative after:content-[''] after:absolute after:-bottom-2.5 after:left-0 after:h-0.5 after:bg-green-200 after:rounded-full after:transition-all after:duration-300",
              selectedTab === tab.key ? "after:w-full" : "after:w-0"
            )}
            leftIcon={tab.icon}
          >
            {tab.label}
          </Button.Icon>
        ))}
      </Row>

      <Link
        href="/community/recipes"
        className="underline text-green-200 hover:text-green-500 font-medium text-base font-frank"
      >
        Explorar receitas da comunidade
      </Link>
    </Row>
  );
}
