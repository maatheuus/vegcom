"use client";

import SuggestionsPage from "@/features/chat/components/suggestion";
import Layout from "@/shared/ui/Layout";
import Col from "@/shared/ui/Layout/Helpers/Col";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ChatHistorySidebar from "./ChatHistorySidebar";
import ChatViewTabs from "./ChatViewTabs";

interface ChatWorkspaceProps {
  children: React.ReactNode;
}

export default function ChatWorkspace({ children }: ChatWorkspaceProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeView, setActiveView] = useState<"chat" | "suggestions">("chat");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (tabParam === "chat") {
      setActiveView("chat");
    } else if (pathname === "/chat" || /^\/chat\/\d+$/.test(pathname)) {
      setActiveView("chat");
    }
  }, [pathname, tabParam]);

  return (
    <Layout.Default className="h-full" noFooter>
      <Col className="relative min-h-0 flex-1 pb-3 md:pb-4">
        <div className="flex min-h-0 w-full flex-1 overflow-hidden rounded-lg border border-green-500">
          <div className="hidden border-r border-green-500/20 lg:flex lg:w-72 lg:shrink-0 lg:flex-col">
            <ChatHistorySidebar />
          </div>

          <Col className="min-w-0 flex-1">
            <ChatViewTabs
              activeView={activeView}
              onViewChange={setActiveView}
              onToggleSidebar={() => setIsSidebarOpen(true)}
            />

            <div className="relative min-h-0 flex-1 overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                {activeView === "suggestions" ? (
                  <motion.div
                    key="suggestions"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="style-scrollbar absolute inset-0 overflow-y-auto"
                  >
                    <SuggestionsPage
                      onSuggestionClick={() => setActiveView("chat")}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="chat"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    {children}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Col>
        </div>
      </Col>

      {/* Mobile sidebar — Framer Motion spring drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-[99] bg-black/50 backdrop-blur-[2px] lg:hidden"
            />
            <motion.div
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                damping: 26,
                stiffness: 260,
                mass: 0.85,
              }}
              className="fixed inset-y-0 left-0 z-[99] w-[82%] max-w-xs bg-green-50 shadow-2xl lg:hidden"
            >
              <ChatHistorySidebar onClose={() => setIsSidebarOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Layout.Default>
  );
}
