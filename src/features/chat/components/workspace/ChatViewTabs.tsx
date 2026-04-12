"use client";

import Row from "@/shared/ui/Layout/Helpers/Row";
import {
  ChatCircleIcon,
  HandWavingIcon,
  ListIcon,
} from "@phosphor-icons/react";
import clsx from "clsx";
import { motion } from "framer-motion";

interface ChatViewTabsProps {
  activeView: "chat" | "suggestions";
  onViewChange: (view: "chat" | "suggestions") => void;
  onToggleSidebar: () => void;
}

const tabs = [
  { key: "chat" as const, label: "Chat", Icon: ChatCircleIcon },
  { key: "suggestions" as const, label: "Sugestões", Icon: HandWavingIcon },
];

export default function ChatViewTabs({
  activeView,
  onViewChange,
  onToggleSidebar,
}: ChatViewTabsProps) {
  return (
    <Row className="items-center gap-3 border-b border-green-500/20 px-3 py-2.5">
      <motion.button
        onClick={onToggleSidebar}
        whileTap={{ scale: 0.88 }}
        whileHover={{ backgroundColor: "var(--color-green-100)" }}
        className="flex cursor-pointer items-center rounded-lg p-0 text-green-500 lg:hidden"
        type="button"
        aria-label="Abrir histórico"
      >
        <ListIcon size={20} />
      </motion.button>

      <div className="flex w-fit items-center gap-x-1 rounded-full bg-green-500 px-1 py-1">
        {tabs.map(({ key, label, Icon }) => (
          <button
            key={key}
            onClick={() => onViewChange(key)}
            type="button"
            className={clsx(
              "flex cursor-pointer items-center gap-x-1.5 rounded-full px-3 py-1.5 transition-all duration-200",
              activeView === key ? "bg-green-50" : "hover:bg-green-600",
            )}
          >
            <Icon
              size={16}
              className={clsx(
                "transition-colors",
                activeView === key ? "text-green-500" : "text-green-50",
              )}
            />
            <span
              className={clsx(
                "font-lora hidden text-sm italic md:inline",
                activeView === key ? "text-green-500" : "text-green-50",
              )}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </Row>
  );
}
