"use client";

import {
  ChefHatOutlinedIcon,
  CommunityOutlinedIcon,
  LightBulbOutlinedIcon,
  LogoOutlinedIcon,
  PlantOutlinedIcon,
  QuestionMarkOutlinedIcon,
  UserDashedFilledIcon,
} from "@/components/icons";
import Col from "@/components/ui/Layout/Helpers/Col";
import Row from "@/components/ui/Layout/Helpers/Row";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";

const sidebarLinks = {
  headerLink: {
    label: "Vegom",
    href: "/",
  },
  topLinks: [
    { label: "Comunidade", href: "/community", icon: CommunityOutlinedIcon },
    { label: "Receitas", href: "/recipes", icon: ChefHatOutlinedIcon },
    { label: "Curiosidades", href: "/curiosity", icon: LightBulbOutlinedIcon },
    {
      label: "Dúvidas",
      href: "/ask-your-questions",
      icon: QuestionMarkOutlinedIcon,
    },
  ],
  bottomLinks: [
    { label: "Upgrade", href: "/upgrade", icon: PlantOutlinedIcon },
    { label: "teste@teste.com", href: "/account", icon: UserDashedFilledIcon },
  ],
};

export default function Sidebar() {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const logoLabelRef = useRef(null);
  const topLinksRefs = useRef<HTMLAnchorElement[]>([]);
  const bottomLinksRefs = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    const logoLabel = logoLabelRef.current;
    const allLabels = [
      ...topLinksRefs.current,
      ...bottomLinksRefs.current,
      logoLabel,
    ].filter(Boolean);

    if (!sidebar) return;

    const expandTl = gsap.timeline({ paused: true });
    expandTl
      .to(sidebar, {
        width: 233,
        duration: 0.3,
        ease: "power2.out",
      })
      .to(
        allLabels,
        {
          opacity: 1,
          x: 0,
          duration: 0.25,
          stagger: 0.03,
          ease: "power2.out",
        },
        "-=0.1"
      );

    // Timeline for collapsing animation
    const collapseTl = gsap.timeline({ paused: true });
    collapseTl
      .to(allLabels, {
        opacity: 0,
        x: -10,
        duration: 0.25,
        stagger: 0.02,
        ease: "power2.in",
      })
      .to(
        sidebar,
        {
          width: 64,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "-=0.15"
      );

    const handleMouseEnter = () => {
      collapseTl.kill();
      expandTl.restart();
    };

    const handleMouseLeave = () => {
      expandTl.kill();
      collapseTl.restart();
    };

    const control = new AbortController();
    const signal = control.signal;

    sidebar.addEventListener("mouseenter", handleMouseEnter, { signal });
    sidebar.addEventListener("mouseleave", handleMouseLeave, { signal });

    gsap.set(allLabels, { opacity: 0, x: -10 });

    return () => {
      control.abort();
      expandTl.kill();
      collapseTl.kill();
    };
  }, []);

  const addToTopRefs = (el: HTMLAnchorElement | null, index: number) => {
    if (el && !topLinksRefs.current.includes(el)) {
      topLinksRefs.current[index] = el;
    }
  };

  const addToBottomRefs = (el: HTMLAnchorElement | null, index: number) => {
    if (el && !bottomLinksRefs.current.includes(el)) {
      bottomLinksRefs.current[index] = el;
    }
  };

  return (
    <div
      ref={sidebarRef}
      className="h-full w-16 overflow-hidden bg-green-50 absolute top-0 left-0 z-50 transition-all duration-300 ease-in-out"
    >
      <Col className="group justify-between items-start h-full px-1.5">
        <div
          className="mt-6 relative w-full flex pb-3 after:bg-green-200 after:absolute after:bottom-0
          after:left-0 after:h-0.5 after:w-full after:scale-x-100
          after:transition-transform after:duration-700 after:ease-in-out
          after:content-[''] group-hover:after:origin-left group-hover:after:scale-x-100"
        >
          <Row className="cursor-pointer items-center w-fit text-green-200 relative">
            <LogoOutlinedIcon size={40} className="ml-2" />
            <Link
              ref={logoLabelRef}
              href={sidebarLinks.headerLink.href}
              className="text-current text-2xl font-rancho ml-2"
            >
              {sidebarLinks.headerLink.label}
            </Link>
          </Row>
        </div>

        <Col className="mt-9 h-full gap-y-6 items-start justify-start sidebar__icons">
          {sidebarLinks.topLinks.map(({ href, icon: Icon, label }, index) => (
            <Row key={href} className="gap-x-3 w-full relative">
              <Icon size={32} />
              <Link
                href={href}
                ref={(el) => addToTopRefs(el, index)}
                className="text-current"
              >
                {label}
              </Link>
            </Row>
          ))}
        </Col>

        <Col className="items-start h-fit gap-y-11 mb-6 sidebar__icons">
          {sidebarLinks.bottomLinks.map(
            ({ href, icon: Icon, label }, index) => (
              <Row key={href} className="gap-x-3 w-full">
                <Icon size={32} />
                <Link
                  href={href}
                  ref={(el) => addToBottomRefs(el, index)}
                  className="text-current"
                >
                  {label}
                </Link>
              </Row>
            )
          )}
        </Col>
      </Col>
    </div>
  );
}
