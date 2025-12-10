"use client";

import Button from "@/shared/ui/Button";
import Col from "@/shared/ui/Layout/Helpers/Col";
import {
  ArrowUpIcon,
  MegaphoneIcon,
  PaperclipIcon,
  ScrollIcon,
} from "@phosphor-icons/react";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  useTransition,
  type HtmlHTMLAttributes,
} from "react";
import PostComposer from "../Post/Composer";
import MobilePostComposer from "../Post/Composer/MobileComposer";
import PostList from "../Post/List";
import Tabs, { type Tab } from "../Tabs";
import Announcements from "../Tabs/Announcements";
import Resources from "../Tabs/Resources";

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function Layout({ className, ...props }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const [selectedTab, setSelectedTab] = useState(() => {
    return searchParams.get("tab") || "posts";
  });

  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl && tabFromUrl !== selectedTab) {
      setSelectedTab(tabFromUrl);
    }
  }, [searchParams]);

  const tabs: Tab[] = [
    {
      key: "posts",
      label: "Posts",
      icon: <ScrollIcon size={24} className="text-green-200" />,
      component: <PostList />,
    },
    {
      key: "resources",
      label: "Recursos",
      icon: <PaperclipIcon size={24} className="text-green-200" />,
      component: <Resources />,
    },
    {
      key: "announcements",
      label: "Anúncios",
      icon: <MegaphoneIcon size={24} className="-scale-x-100 text-green-200" />,
      component: <Announcements />,
    },
  ];

  const handleTabChange = (key: string) => {
    if (key === selectedTab) return;

    startTransition(() => {
      setSelectedTab(key);

      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", key);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setShowScrollTop(container.scrollTop > 600);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={scrollContainerRef}
      className={`hidden-scrollbar z-40 h-full w-full overflow-x-hidden overflow-y-auto rounded-lg bg-green-50 p-0 ${className ?? ""}`}
      {...props}
    >
      <Col className="relative gap-y-7 shadow-2xl">
        <PostComposer className="sticky top-0 z-40 hidden rounded-[20px] border border-green-500 bg-green-50 transition-all duration-200 md:block" />

        <MobilePostComposer />

        <Button.Icon
          variant="filled"
          onClick={scrollToTop}
          icon={<ArrowUpIcon size={24} weight="bold" />}
          className={clsx(
            "fixed bottom-6 z-50 h-14 w-14 rounded-full shadow-xl transition-all duration-300",
            "left-6 md:right-16 md:left-auto",
            showScrollTop
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-10 opacity-0",
          )}
        />

        <Col>
          <Tabs
            tabs={tabs}
            selectedTab={selectedTab}
            setSelectedTab={handleTabChange}
            isTransitioning={isPending}
            className="sticky -top-1 z-20 bg-green-50 pt-5 md:top-63"
          />

          <div
            className={clsx(
              "transition-opacity duration-200",
              isPending && "opacity-50",
            )}
          >
            {tabs.find((tab) => tab.key === selectedTab)?.component}
          </div>
        </Col>
      </Col>
    </div>
  );
}
