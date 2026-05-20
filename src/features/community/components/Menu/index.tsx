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

  const userName = user?.name.split(" ").slice(0, 2).join(" ");

  return (
    <div className="body__container-lg sticky top-4 z-[99] mx-auto mb-16 h-auto w-full md:mb-18">
      <motion.nav
        id="main-nav"
        initial={false}
        animate={{ height: isMenuOpen ? "auto" : "3.625rem" }}
        transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
        className={clsx(
          "absolute top-0 right-0 left-0 w-full rounded-2xl bg-green-50/90 backdrop-blur-sm",
          isMenuOpen || hasScrolled ? "shadow-xl" : "",
        )}
      >
        <div className="h-full pr-2 p-2 lg:flex lg:items-center lg:p-3">
          <div className="flex w-full items-center">
            <Row className="h-full w-full items-center justify-between gap-x-4">
              <Link href={menuConfig.brand.href} className="block flex-1">
                <div className="flex items-center gap-x-1">
                  <Image
                    src={menuConfig.brand.logo}
                    alt="VegCom Logo"
                    width={156}
                    height={56}
                    className="-ml-2.5 max-h-10 object-cover max-md:w-[140px]"
                  />
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
          </div>

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
