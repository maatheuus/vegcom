import Row from "@/shared/ui/Layout/Helpers/Row";
import { motion, MotionConfig } from "framer-motion";
import Link from "next/link";
import NotificationPopup from "./NotificationPopup";
import { menuConfig } from "./menuConfig";
import { cls } from "./shared";

type TriggerProps = {
  isLoggedIn: boolean;
  isPremium: boolean;
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="2.5"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

export function MobileMenuTrigger({
  isLoggedIn,
  isPremium,
  isMenuOpen,
  toggleMenu,
}: TriggerProps) {
  const { upgradeLink } = menuConfig;

  return (
    <div className="flex items-center gap-x-2 lg:hidden">
      {isLoggedIn && (
        <Link href={upgradeLink.href} className="group/plant">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-200 text-green-50 transition-colors duration-300 hover:bg-green-100 hover:text-green-200">
            <upgradeLink.icon size={18} />
          </div>
        </Link>
      )}

      {isLoggedIn && <NotificationPopup className="[&>div:first-child]:h-9 [&>div:first-child]:w-9 [&>div:first-child]:justify-center [&>div:first-child]:p-0 [&>div:first-child]:gap-0" />}

      <MotionConfig transition={{ duration: 0.4, ease: "easeInOut" }}>
        <motion.button
          id="mobile-menu-trigger"
          initial={false}
          animate={isMenuOpen ? "open" : "closed"}
          onClick={toggleMenu}
          className="group/menu relative flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 text-green-600 transition-colors duration-300 hover:bg-green-200 hover:text-green-50"
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <Path
              variants={{
                closed: { d: "M 3 6 L 21 6" },
                open: { d: "M 5 19 L 19 5" },
              }}
            />
            <Path
              d="M 3 12 L 21 12"
              variants={{
                closed: { opacity: 1, pathLength: 1 },
                open: { opacity: 0, pathLength: 0 },
              }}
              transition={{ duration: 0.2 }}
            />
            <Path
              variants={{
                closed: { d: "M 3 18 L 21 18" },
                open: { d: "M 5 5 L 19 19" },
              }}
            />
          </svg>
        </motion.button>
      </MotionConfig>
    </div>
  );
}
