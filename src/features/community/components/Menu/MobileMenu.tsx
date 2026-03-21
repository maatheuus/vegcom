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

export function MobileMenuTrigger({
  isLoggedIn,
  isPremium,
  isMenuOpen,
  toggleMenu,
}: TriggerProps) {
  const { upgradeLink } = menuConfig;

  return (
    <div className="desktop:hidden flex items-center gap-x-2">
      {isLoggedIn && (
        <Link href={upgradeLink.href} className="group/plant contents">
          <Row
            className={`${cls.baseButton} items-center justify-center rounded-lg bg-green-200 px-2 py-1 text-green-50 group-hover/plant:bg-green-100`}
          >
            <upgradeLink.icon
              size={20}
              className="size-5 group-hover/plant:text-green-200"
            />
            {!isPremium && (
              <span className={`${cls.text} group-hover/plant:text-green-200`}>
                {upgradeLink.label}
              </span>
            )}
          </Row>
        </Link>
      )}

      {isLoggedIn && <NotificationPopup className="[&_div]:p-2" />}

      <MotionConfig transition={{ duration: 0.4, ease: "easeInOut" }}>
        <motion.button
          layout="position"
          initial={false}
          animate={isMenuOpen ? "open" : "closed"}
          onClick={toggleMenu}
          className="group/menu relative flex min-h-9 min-w-9 flex-col items-center justify-center rounded-lg bg-green-100 transition-colors duration-300 hover:bg-green-200"
        >
          {[
            {
              style: { top: "35%", left: "50%", x: "-50%", y: "-50%" },
              variants: {
                open: { rotate: 45, top: "50%" },
                closed: { rotate: 0, top: "35%" },
              },
            },
            {
              style: { top: "50%", left: "50%", x: "-50%", y: "-50%" },
              variants: { open: { opacity: 0 }, closed: { opacity: 1 } },
            },
            {
              style: { bottom: "35%", left: "50%", x: "-50%", y: "50%" },
              variants: {
                open: { rotate: -45, bottom: "50%" },
                closed: { rotate: 0, bottom: "35%" },
              },
            },
          ].map((bar, i) => (
            <motion.span
              key={i}
              className="absolute h-0.5 w-5 rounded-full bg-green-600 group-hover/menu:bg-green-50"
              style={bar.style}
              variants={bar.variants}
            />
          ))}
        </motion.button>
      </MotionConfig>
    </div>
  );
}
