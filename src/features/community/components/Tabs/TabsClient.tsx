import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, type TransitionStartFunction } from "react";
import Tabs, { type Tab } from ".";

interface Props {
  tabs: Tab[];
  selectedTab: string;
  isPending: boolean;
  setSelectedTab: (tab: string) => void;
  startTransition: TransitionStartFunction;
}

export default function TabsClient({
  tabs,
  selectedTab,
  isPending,
  setSelectedTab,
  startTransition,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl && tabFromUrl !== selectedTab) {
      setSelectedTab(tabFromUrl);
    }
  }, [searchParams]);

  const handleTabChange = (key: string) => {
    if (key === selectedTab) return;

    startTransition(() => {
      setSelectedTab(key);

      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", key);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <Tabs
      tabs={tabs}
      selectedTab={selectedTab}
      setSelectedTab={handleTabChange}
      isTransitioning={isPending}
      className="sticky -top-1 z-20 bg-green-50 pt-5 md:top-63"
    />
  );
}
