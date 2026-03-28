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
      <Row className="desktop:flex hidden w-full flex-1 justify-end gap-x-4">
        <Row className="items-center justify-center gap-x-4">
          {centerLinks.map(({ href, icon: Icon, label }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link key={href} href={href} className="contents">
                <div
                  className={`relative w-full cursor-pointer py-1 ${
                    isActive ? "text-green-500" : "text-green-200"
                  }`}
                  onMouseEnter={() => setHoveredItem(href)}
                  onMouseLeave={() => setHoveredItem("")}
                >
                  <div className="relative z-[1] flex items-center gap-x-1">
                    <Icon size={20} className="size-5" />
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
      <Row className="desktop:flex hidden items-center gap-x-2">
        {isLoggedIn && (
          <Link href={upgradeLink.href} className="group/plant contents">
            <Row
              className={`${cls.baseButton} items-center justify-center rounded-lg bg-green-200 p-2 text-green-50 group-hover/plant:bg-green-100`}
            >
              <upgradeLink.icon
                size={20}
                className="size-5 group-hover/plant:text-green-200"
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
        )}

        <DropdownMenu>
          <DropdownMenuTrigger className="group/user flex cursor-pointer items-center gap-x-2 rounded-lg border-0 bg-green-100 p-2 transition-colors duration-300 outline-none hover:bg-green-200">
            <UserCircleIcon
              size={20}
              className="size-5 text-green-200 group-hover/user:text-green-50"
            />
            {isLoggedIn && (
              <span
                className={`${cls.text} text-green-200 group-hover/user:text-green-50`}
              >
                {userName}
              </span>
            )}
          </DropdownMenuTrigger>

          <DropdownMenuContent className="border-0 bg-green-100" align="end">
            {!isLoggedIn ? (
              <>
                <Link href="/login" className="contents">
                  <DropdownMenuItem
                    className={`${cls.text} cursor-pointer text-green-500`}
                  >
                    Entrar
                  </DropdownMenuItem>
                </Link>
                <Link href="/signup" className="contents">
                  <DropdownMenuItem
                    className={`${cls.text} cursor-pointer text-green-500`}
                  >
                    Cadastrar
                  </DropdownMenuItem>
                </Link>
              </>
            ) : (
              <>
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
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {isLoggedIn && (
          <NotificationPopup className="[&_div]:px-2 [&_div]:py-1.5" />
        )}
      </Row>
    </>
  );
}
