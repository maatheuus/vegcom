import { useLogout } from "@/features/auth/hooks/useLogout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/DropdownMenu";
import Row from "@/shared/ui/Layout/Helpers/Row";
import { UserCircleIcon } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import NotificationPopup from "./NotificationPopup";
import { menuConfig } from "./menuConfig";
import { cls } from "./shared";

type Props = {
  isLoggedIn: boolean;
  isPremium: boolean;
  userName?: string;
};

export default function DesktopMenu({
  isLoggedIn,
  isPremium,
  userName,
}: Props) {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState("");
  const { upgradeLink, centerLinks } = menuConfig;
  const { handleLogout } = useLogout();

  return (
    <>
      {/* Nav Links */}
      <Row className="hidden min-w-0 flex-1 justify-end gap-x-4 lg:flex">
        <Row className="items-center justify-center gap-x-4">
          {centerLinks.map(({ href, icon: Icon, label }) => {
            const isActive = pathname.startsWith(href) && href !== "/";
            return (
              <Link key={href} href={href} className="contents">
                <div
                  id={`nav-link-${href.replace("/", "").replace("-", "") || "community"}`}
                  className={`relative cursor-pointer py-1 ${
                    isActive ? "text-green-500" : "text-green-200"
                  }`}
                  onMouseEnter={() => setHoveredItem(href)}
                  onMouseLeave={() => setHoveredItem("")}
                >
                  <div className="relative z-[1] flex items-center gap-x-1">
                    <Icon size={18} />
                    <span className="font-lora text-base font-medium text-nowrap text-current italic">
                      {label}
                    </span>
                  </div>
                  <motion.div
                    className="absolute right-0 bottom-0 left-0 h-[2px] rounded-md bg-green-200"
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: hoveredItem === href || isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </Link>
            );
          })}
        </Row>
      </Row>

      {/* Right Actions */}
      <Row className="hidden shrink-0 items-center gap-x-2 lg:flex">
        {isLoggedIn ? (
          <>
            <Link href={upgradeLink.href} className="group/plant contents">
              <Row
                className={`${cls.baseButton} items-center justify-center rounded-lg bg-green-200 p-1.5 text-green-50 group-hover/plant:bg-green-100`}
              >
                <upgradeLink.icon
                  size={18}
                  className="group-hover/plant:text-green-200"
                />
                {!isPremium && (
                  <span
                    className={`${cls.text} group-hover/plant:text-green-200`}
                  >
                    {upgradeLink.label}
                  </span>
                )}
              </Row>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="group/user flex cursor-pointer items-center gap-x-2 rounded-lg border-0 bg-green-100 p-1.5 transition-colors duration-300 outline-none hover:bg-green-200">
                <UserCircleIcon
                  size={18}
                  className="text-green-200 group-hover/user:text-green-50"
                />
                <span
                  className={`${cls.text} max-w-[8rem] truncate text-green-200 group-hover/user:text-green-50`}
                >
                  {userName}
                </span>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="border-0 z-99! bg-green-100" align="end">
                <Link href="/account" className="contents">
                  <DropdownMenuItem
                    className={`${cls.text} cursor-pointer text-green-500`}
                  >
                    Minha conta
                  </DropdownMenuItem>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="contents"
                >
                  <DropdownMenuItem
                    className={`${cls.text} cursor-pointer text-green-500`}
                  >
                    Sair
                  </DropdownMenuItem>
                </button>
              </DropdownMenuContent>
            </DropdownMenu>

            <NotificationPopup triggerClassName="px-1.5 py-1.5" />
          </>
        ) : (
          <Row className="items-center gap-x-1.5">
            <Link href="/login">
              <motion.span
                className="font-lora relative cursor-pointer px-3 py-1.5 text-sm font-medium text-green-500 italic"
                whileHover="hover"
              >
                Entrar
                <motion.span
                  className="absolute bottom-1 left-3 right-3 h-[1.5px] origin-left rounded-full bg-green-200"
                  variants={{
                    hover: { scaleX: 1, opacity: 1 },
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                />
              </motion.span>
            </Link>

            <Link href="/signup">
              <motion.span
                className="font-lora flex cursor-pointer items-center rounded-xl bg-green-500 px-4 py-1.5 text-sm font-medium text-green-50 italic"
                whileHover={{ backgroundColor: "var(--color-green-200)", scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                Cadastrar
              </motion.span>
            </Link>
          </Row>
        )}
      </Row>
    </>
  );
}
