"use client";

import { useGetUser } from "@/features/auth/api/queries/getAuthApiClient";
import Row from "@/shared/ui/Layout/Helpers/Row";
import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import DesktopMenu from "./DesktopMenu";
import { menuConfig } from "./menuConfig";
import { MobileMenuTrigger } from "./MobileMenu";
import { MobileMenuDrawer } from "./MobileMenuDrawer";

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { data: user } = useGetUser();

  const isLoggedIn = Boolean(user);
  const isPremium = Boolean(user?.subscription);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const userName = user?.name.split(" ").slice(0, 2).join(" ") ;

  return (
    <div className="body__container-lg sticky top-4 z-50 mx-auto mb-16 h-auto w-full md:mb-18">
      <motion.nav
        layout
        initial={false}
        animate={{ height: isMenuOpen ? "auto" : "3.625rem" }}
        transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
        className={clsx(
          "absolute top-0 right-0 left-0 w-full rounded-2xl bg-green-50/90 backdrop-blur-sm",
          isMenuOpen || hasScrolled ? "shadow-xl" : "",
        )}
      >
        <div className="desktop:p-3 desktop:flex desktop:items-center h-full p-2">
          {/* Topbar — brand + menus */}
          <motion.div layout="position" className="flex w-full items-center">
            <Row className="h-full w-full items-center justify-between gap-x-4">
              {/* Brand */}
              <Link href={menuConfig.brand.href} className="block flex-1">
                <div className="flex items-center gap-x-1">
                  <Image
                    src={menuConfig.brand.logo}
                    alt="VegCom Logo"
                    width={34}
                    height={34}
                    className="object-cover"
                  />
                  <span className="font-lora text-lg font-medium text-nowrap text-green-200 italic">
                    {menuConfig.brand.label}
                  </span>
                </div>
              </Link>

              <DesktopMenu
                isLoggedIn={isLoggedIn}
                isPremium={isPremium}
                userName={userName}
              />

              <MobileMenuTrigger
                isLoggedIn={isLoggedIn}
                isPremium={isPremium}
                isMenuOpen={isMenuOpen}
                toggleMenu={() => setIsMenuOpen((v) => !v)}
              />
            </Row>
          </motion.div>

          <MobileMenuDrawer
            isLoggedIn={isLoggedIn}
            isMenuOpen={isMenuOpen}
            onLinkClick={() => setIsMenuOpen(false)}
          />
        </div>
      </motion.nav>
    </div>
  );
}
