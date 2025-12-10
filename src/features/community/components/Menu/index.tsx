"use client";

import Row from "@/shared/ui/Layout/Helpers/Row";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/shared/ui/Select";
import {
  ChatCircleIcon,
  ChefHatIcon,
  LightbulbFilamentIcon,
  PlantIcon,
  PlusCircleIcon,
  UserCircleIcon,
  UsersFourIcon,
} from "@phosphor-icons/react";
import clsx from "clsx";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import NotificationPopup from "./NotificationPopup";

const sidebarLinks = {
  leftLinks: { label: "Vegom", href: "/" },
  centerLinks: [
    { label: "Comunidade", href: "/community", icon: UsersFourIcon },
    { label: "Receitas", href: "/recipes", icon: ChefHatIcon },
    { label: "Nova receita", href: "/new-recipe", icon: PlusCircleIcon },
    { label: "Chat", href: "/chat", icon: ChatCircleIcon },
    {
      label: "Curiosidades",
      href: "/curiosities",
      icon: LightbulbFilamentIcon,
    },
  ],
  rightLinks: [
    { label: "Upgrade", href: "/account/subscription", icon: PlantIcon },
    { label: "teste@teste.com", href: "/account", icon: UserCircleIcon },
  ],
};
const baseButtonClasses =
  "flex w-full cursor-pointer gap-x-2 transition-all duration-300";
const textClasses = "font-lora text-base font-medium text-nowrap italic";

export default function Menu() {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const isPremium = false;
  const isLoggedIn = false;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sticky top-4 z-50 mx-auto mb-16 h-auto w-full max-w-6xl px-2 md:mb-18 md:px-4">
      <motion.nav
        layout
        initial={false}
        animate={{
          height: isMenuOpen ? "auto" : "3.625rem",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.8,
        }}
        className={clsx(
          "absolute top-0 right-0 left-0 w-full rounded-4xl border border-green-500/50 bg-green-50/90 backdrop-blur-sm",
          isMenuOpen || hasScrolled ? "shadow-xl" : "",
        )}
        style={{ left: 0, right: 0 }}
      >
        <div className="desktop:p-4 desktop:flex desktop:items-center h-full p-2">
          <motion.div layout="position" className="flex w-full items-center">
            <Row className="group h-full w-full items-center justify-between px-2 md:px-4">
              <Link href={sidebarLinks.leftLinks.href} className="block flex-1">
                <div className="flex items-center gap-x-2">
                  <Image
                    src="/favicon-leaf-fork.png"
                    alt="VegCom Logo"
                    width={34}
                    height={34}
                    className="object-cover"
                  />
                  <span className="font-lora text-lg font-medium text-nowrap text-green-200 italic">
                    VegCom
                  </span>
                </div>
              </Link>

              <Row className="desktop:flex hidden w-full flex-1 gap-x-4">
                <Row className="items-center justify-center gap-x-2">
                  {sidebarLinks.centerLinks.map(
                    ({ href, icon: Icon, label }) => {
                      const isActive = pathname.startsWith(href);
                      return (
                        <Link key={href} href={href} className="contents">
                          <Row
                            className={`relative flex w-full cursor-pointer gap-x-2 rounded-md px-2 py-1.5 transition-colors duration-300 ${
                              isActive
                                ? "bg-green-100 text-green-500"
                                : "text-green-200 hover:bg-green-100 hover:text-green-500"
                            }`}
                            onMouseEnter={() => setHoveredItem(href)}
                            onMouseLeave={() => setHoveredItem("")}
                          >
                            <div className="relative z-[1] flex items-center gap-x-2">
                              <Icon size={20} className="size-5" />
                              <span className="font-lora text-base font-medium text-nowrap text-current italic">
                                {label}
                              </span>
                            </div>
                            <motion.div
                              className="absolute right-0 bottom-0 left-0 h-[2px] rounded-md bg-green-200"
                              initial={{ scaleX: 0 }}
                              animate={{
                                scaleX:
                                  hoveredItem === href || isActive ? 1 : 0,
                              }}
                              transition={{ duration: 0.3 }}
                            />
                          </Row>
                        </Link>
                      );
                    },
                  )}
                </Row>
              </Row>

              <Row className="desktop:flex hidden items-center gap-x-2">
                <Link href="/account/subscription" className="contents">
                  <Row
                    className={`${baseButtonClasses} ${isPremium ? "p-2" : "px-2 py-1"} items-center justify-center rounded-lg bg-green-200 text-green-50`}
                  >
                    <PlantIcon size={20} className="size-5" />
                    {!isPremium && <span className={textClasses}>Upgrade</span>}
                  </Row>
                </Link>

                <Select>
                  <SelectTrigger
                    className="flex items-center gap-x-2 rounded-lg border-0 bg-green-100 p-2"
                    showIcon={false}
                  >
                    <UserCircleIcon
                      size={20}
                      className="size-5 text-green-200"
                    />

                    {isLoggedIn && (
                      <span className={`${textClasses} text-green-500`}>
                        Matheus
                      </span>
                    )}
                  </SelectTrigger>

                  <SelectContent className="border-0 bg-green-100" align="end">
                    {!isLoggedIn && (
                      <>
                        <SelectItem
                          value="signin"
                          className={`${textClasses} text-green-500`}
                        >
                          <Link href="/login">Sign In</Link>
                        </SelectItem>

                        <SelectItem
                          value="signup"
                          className={`${textClasses} text-green-500`}
                        >
                          <Link href="/signup">Sign Up</Link>
                        </SelectItem>
                      </>
                    )}

                    {isLoggedIn && (
                      <>
                        <SelectItem
                          value="account"
                          className={`${textClasses} text-green-500`}
                        >
                          <Link href="/account">Account</Link>
                        </SelectItem>

                        <SelectItem
                          value="logout"
                          className={`${textClasses} text-green-500`}
                        >
                          <Link href="/logout">Logout</Link>
                        </SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>

                <NotificationPopup />
              </Row>

              <div className="desktop:hidden flex items-center gap-x-2">
                <Link href="/account/subscription" className="contents">
                  <Row
                    className={`${baseButtonClasses} ${isPremium ? "p-2" : "px-2 py-1"} items-center justify-center rounded-lg bg-green-200 text-green-50`}
                  >
                    <PlantIcon size={20} className="size-5" />
                    {!isPremium && <span className={textClasses}>Upgrade</span>}
                  </Row>
                </Link>

                <NotificationPopup />

                <MotionConfig transition={{ duration: 0.4, ease: "easeInOut" }}>
                  <motion.button
                    layout="position"
                    initial={false}
                    animate={isMenuOpen ? "open" : "closed"}
                    onClick={toggleMenu}
                    className="relative flex min-h-9 min-w-9 flex-col items-center justify-center rounded-lg bg-green-100"
                  >
                    <motion.span
                      className="absolute h-0.5 w-5 rounded-full bg-green-600"
                      style={{ top: "35%", left: "50%", x: "-50%", y: "-50%" }}
                      variants={{
                        open: { rotate: 45, top: "50%" },
                        closed: { rotate: 0, top: "35%" },
                      }}
                    />
                    <motion.span
                      className="absolute h-0.5 w-5 rounded-full bg-green-600"
                      style={{ top: "50%", left: "50%", x: "-50%", y: "-50%" }}
                      variants={{
                        open: { opacity: 0 },
                        closed: { opacity: 1 },
                      }}
                    />
                    <motion.span
                      className="absolute h-0.5 w-5 rounded-full bg-green-600"
                      style={{
                        bottom: "35%",
                        left: "50%",
                        x: "-50%",
                        y: "50%",
                      }}
                      variants={{
                        open: { rotate: -45, bottom: "50%" },
                        closed: { rotate: 0, bottom: "35%" },
                      }}
                    />
                  </motion.button>
                </MotionConfig>
              </div>
            </Row>
          </motion.div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="desktop:hidden w-full overflow-hidden"
              >
                <div className="flex flex-col gap-y-2 px-2 pt-6 pb-4">
                  {sidebarLinks.centerLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 rounded-xl p-3 text-green-800 hover:bg-green-100"
                      >
                        <link.icon size={22} className="text-green-600" />
                        <span className="font-lora text-lg italic">
                          {link.label}
                        </span>
                      </Link>
                    </motion.div>
                  ))}

                  <div className="my-2 h-px w-full bg-green-200 opacity-50" />

                  <Link
                    href={isLoggedIn ? "/account" : "/login"}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl p-3 text-green-800 hover:bg-green-100"
                  >
                    <UserCircleIcon size={22} className="text-green-600" />
                    <span className="font-lora text-lg italic">
                      {isLoggedIn ? "Minha Conta" : "Entrar"}
                    </span>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </div>
  );
}
