"use client";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { SignOutIcon, UserCircleIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { menuConfig } from "./menuConfig";
import { cls } from "./shared";

type DrawerProps = {
  isLoggedIn: boolean;
  isMenuOpen: boolean;
  onLinkClick: () => void;
};

export function MobileMenuDrawer({
  isLoggedIn,
  isMenuOpen,
  onLinkClick,
}: DrawerProps) {
  const { centerLinks } = menuConfig;
  const { handleLogout } = useLogout();

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full overflow-hidden lg:hidden"
        >
          <div className="flex flex-col gap-y-2 px-2 pt-6 pb-4">
            {centerLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <Link
                  id={`mobile-nav-link-${link.href.replace("/", "").replace("-", "") || "community"}`}
                  href={link.href}
                  onClick={onLinkClick}
                  className={cls.mobileLink}
                >
                  <link.icon size={22} className="text-green-600" />
                  <span className={cls.mobileLabel}>{link.label}</span>
                </Link>
              </motion.div>
            ))}

            <div className="my-2 h-px w-full bg-green-200 opacity-50" />

            <Link
              href={isLoggedIn ? "/account" : "/login"}
              onClick={onLinkClick}
              className={cls.mobileLink}
            >
              <UserCircleIcon size={22} className="text-green-600" />
              <span className={cls.mobileLabel}>
                {isLoggedIn ? "Minha Conta" : "Entrar"}
              </span>
            </Link>

            {isLoggedIn && (
              <button
                type="button"
                onClick={handleLogout}
                className={cls.mobileLink}
              >
                <SignOutIcon size={22} className="text-green-600" />
                <span className={cls.mobileLabel}>Sair</span>
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
