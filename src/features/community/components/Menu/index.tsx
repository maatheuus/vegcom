"use client";

import {
  ArrowCircleRightOutlinedIcon,
  ChatCircleOutlinedIcon,
  ChefHatOutlinedIcon,
  CommunityOutlinedIcon,
  LightBulbOutlinedIcon,
  LogoOutlinedIcon,
  PlantOutlinedIcon,
  PlusOutlinedIcon,
  UserGearOutlinedIcon,
} from "@/shared/icons";
import Row from "@/shared/ui/Layout/Helpers/Row";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/shared/ui/Select";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import NotificationPopup from "./NotificationPopup";

const sidebarLinks = {
  leftLinks: {
    label: "Vegom",
    href: "/",
  },
  centerLinks: [
    { label: "Comunidade", href: "/community", icon: CommunityOutlinedIcon },
    { label: "Receitas", href: "/recipes", icon: ChefHatOutlinedIcon },
    {
      label: "Nova receita",
      href: "/new-recipe",
      icon: PlusOutlinedIcon,
    },
    {
      label: "Chat",
      href: "/chat",
      icon: ChatCircleOutlinedIcon,
    },
    {
      label: "Curiosidades",
      href: "/curiosities",
      icon: LightBulbOutlinedIcon,
    },
  ],
  rightLinks: [
    {
      label: "Upgrade",
      href: "/account/subscription",
      icon: PlantOutlinedIcon,
    },
    { label: "teste@teste.com", href: "/account", icon: UserGearOutlinedIcon },
  ],
};

export default function Menu() {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isPremium = false;
  const isLoggedIn = false;

  const baseButtonClasses =
    "flex w-full cursor-pointer gap-x-2 transition-all duration-300";
  const textClasses = "font-lora text-base font-medium text-nowrap italic";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="z-50 mx-auto h-fit w-full max-w-[90rem] bg-green-50 pt-5">
      <Row className="group h-fit w-full items-center justify-between px-4 md:px-6">
        <Link
          href={sidebarLinks.leftLinks.href}
          className="block w-full flex-1"
        >
          <div className="flex items-center gap-x-2">
            <LogoOutlinedIcon size={44} />
            <span className="font-lora text-lg font-medium text-nowrap text-green-200 italic">
              Vegcom
            </span>
          </div>
        </Link>

        <Row className="hidden w-full flex-1 gap-x-4 lg:flex">
          <Row className="items-center justify-center gap-x-2">
            {sidebarLinks.centerLinks.map(({ href, icon: Icon, label }) => {
              const isActive = pathname.startsWith(href);

              return (
                <Link
                  key={href}
                  href={href === "/chat" ? "/chat?tab=chat" : href}
                  className="contents"
                >
                  <Row
                    className={`relative flex w-full cursor-pointer gap-x-2 rounded-md px-2 py-1.5 transition-colors duration-300 ${
                      isActive
                        ? "bg-green-100 text-green-500"
                        : "text-green-200 hover:bg-green-100 hover:text-green-500"
                    }`}
                    onMouseEnter={() => setHoveredItem(href)}
                    onMouseLeave={() => setHoveredItem("")}
                  >
                    <motion.div
                      className="relative z-[1] flex items-center gap-x-2"
                      transition={{ duration: 0.2 }}
                    >
                      <Icon size={20} className="size-5" />
                      <span className="font-lora text-base font-medium text-nowrap text-current italic">
                        {label}
                      </span>
                    </motion.div>

                    <motion.div
                      className="absolute right-0 bottom-0 left-0 h-[2px] rounded-md bg-green-200"
                      initial={{ scaleX: 0 }}
                      animate={{
                        scaleX: hoveredItem === href || isActive ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </Row>
                </Link>
              );
            })}
          </Row>

          <Row className="items-center justify-center gap-x-2">
            <Link href="/account/subscription" className="contents">
              <Row
                className={`${baseButtonClasses} ${isPremium ? "p-2" : "px-2 py-1"} items-center justify-center rounded-lg bg-green-200 text-green-50`}
              >
                <PlantOutlinedIcon size={20} className="size-5" />
                {!isPremium && <span className={textClasses}>Upgrade</span>}
              </Row>
            </Link>

            <Select>
              <SelectTrigger
                className="flex items-center gap-x-2 rounded-lg border-0 bg-green-100 p-2"
                showIcon={false}
              >
                <UserGearOutlinedIcon
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
        </Row>

        <div className="flex items-center gap-x-2 lg:hidden">
          <Link href="/account/subscription" className="contents">
            <Row
              className={`${baseButtonClasses} ${isPremium ? "p-2" : "px-2 py-1"} items-center justify-center rounded-lg bg-green-200 text-green-50`}
            >
              <PlantOutlinedIcon size={20} className="size-5" />
              {!isPremium && <span className={textClasses}>Upgrade</span>}
            </Row>
          </Link>

          <MotionConfig transition={{ duration: 0.5, ease: "easeInOut" }}>
            <motion.button
              initial={false}
              animate={isMenuOpen ? "open" : "closed"}
              onClick={toggleMenu}
              className="relative z-50 flex min-h-10 min-w-10 flex-col items-center justify-center gap-1.5 rounded-full bg-green-100"
            >
              <motion.span
                style={{ left: "50%", top: "35%", x: "-50%", y: "-50%" }}
                className="absolute h-0.5 w-5 bg-green-500"
                variants={{
                  open: {
                    rotate: ["0deg", "0deg", "45deg"],
                    top: ["35%", "50%", "50%"],
                  },
                  closed: {
                    rotate: ["45deg", "0deg", "0deg"],
                    top: ["50%", "50%", "35%"],
                  },
                }}
              />
              <motion.span
                style={{ left: "50%", top: "50%", x: "-50%", y: "-50%" }}
                className="absolute h-0.5 w-5 bg-green-500"
                variants={{
                  open: {
                    rotate: ["0deg", "0deg", "-45deg"],
                  },
                  closed: {
                    rotate: ["-45deg", "0deg", "0deg"],
                  },
                }}
              />
              <motion.span
                style={{ left: "50%", bottom: "35%", x: "-50%", y: "50%" }}
                className="absolute h-0.5 w-5 bg-green-500"
                variants={{
                  open: {
                    rotate: ["0deg", "0deg", "45deg"],
                    bottom: ["35%", "50%", "50%"],
                    opacity: 0,
                  },
                  closed: {
                    rotate: ["45deg", "0deg", "0deg"],
                    bottom: ["50%", "50%", "35%"],
                    opacity: 1,
                  },
                }}
              />
            </motion.button>
          </MotionConfig>
        </div>
      </Row>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col bg-green-50 px-4 pt-24 lg:hidden"
          >
            <motion.div
              className="flex flex-col gap-y-4"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.1,
                  },
                },
                hidden: {
                  transition: {
                    staggerChildren: 0.05,
                    staggerDirection: -1,
                  },
                },
              }}
            >
              {sidebarLinks.centerLinks.map(({ href, icon: Icon, label }) => {
                const isActive = pathname.startsWith(href);
                return (
                  <motion.div
                    key={href}
                    variants={{
                      hidden: { opacity: 0, y: -10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <Link
                      href={href === "/chat" ? "/chat?tab=chat" : href}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div
                        className={`flex items-center gap-x-3 rounded-lg p-3 transition-colors ${
                          isActive
                            ? "bg-green-100 text-green-500"
                            : "text-green-200 hover:bg-green-100 hover:text-green-500"
                        }`}
                      >
                        <Icon size={24} />
                        <span className="font-lora text-lg font-medium italic">
                          {label}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                className="my-2 h-[1px] w-full bg-green-100"
                variants={{
                  hidden: { opacity: 0, scaleX: 0 },
                  visible: { opacity: 1, scaleX: 1 },
                }}
                transition={{ duration: 0.3 }}
              />

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Link
                  href={isLoggedIn ? "/account" : "/login"}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center gap-x-3 rounded-lg p-3 text-green-200 hover:bg-green-100 hover:text-green-500">
                    <UserGearOutlinedIcon size={24} />
                    <span className="font-lora text-lg font-medium italic">
                      {isLoggedIn ? "Account" : "Sign In"}
                    </span>
                  </div>
                </Link>
              </motion.div>

              {isLoggedIn && (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: -10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Link href="/logout" onClick={() => setIsMenuOpen(false)}>
                    <div className="flex items-center gap-x-3 rounded-lg p-3 text-green-200 hover:bg-green-100 hover:text-green-500">
                      <ArrowCircleRightOutlinedIcon size={24} />
                      <span className="font-lora text-lg font-medium italic">
                        Logout
                      </span>
                    </div>
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
