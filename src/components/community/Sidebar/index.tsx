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
  const labelsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const sidebar = sidebarRef.current;

    if (!sidebar) return;

    const handleMouseEnter = () => {
      gsap.to(sidebar, {
        width: 233,
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(labelsRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        delay: 0.1,
        stagger: 0.05,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(labelsRef.current, {
        opacity: 0,
        x: -10,
        duration: 0.3,
        ease: "power2.in",
      });

      gsap.to(sidebar, {
        width: 64,
        duration: 0.4,
        ease: "power2.inOut",
        delay: 0.1,
      });
    };

    const control = new AbortController();
    const signal = control.signal;

    sidebar.addEventListener("mouseenter", handleMouseEnter, { signal });
    sidebar.addEventListener("mouseleave", handleMouseLeave, control);

    return () => {
      control.abort();
    };
  }, []);

  return (
    <div
      ref={sidebarRef}
      className="h-full w-[54px] overflow-hidden bg-green-50 absolute top-0 left-0 z-[9999]"
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
              href={sidebarLinks.headerLink.href}
              className="text-current text-2xl font-rancho absolute translate-x-12"
            >
              {sidebarLinks.headerLink.label}
            </Link>
          </Row>
        </div>

        <Col className="mt-9 h-full gap-y-6 items-start justify-start sidebar__icons">
          {sidebarLinks.topLinks.map(({ href, icon: Icon, label }, i) => (
            <Row key={href} className="gap-x-3 w-full">
              <Icon size={32} />
              <Link
                href={href}
                ref={(el) => {
                  labelsRef.current[i] = el;
                }}
                className="opacity-0 translate-x-[-10px]"
              >
                {label}
              </Link>
            </Row>
          ))}
        </Col>

        <Col className="items-start h-fit gap-y-11 sidebar__icons">
          {sidebarLinks.bottomLinks.map(({ href, icon: Icon, label }, i) => (
            <Row key={href} className="gap-x-3 w-full">
              <Icon size={32} />
              <Link
                ref={(el) => {
                  labelsRef.current[i + 4] = el;
                }}
                href={href}
                className="opacity-0 translate-x-[-10px]"
              >
                {label}
              </Link>
            </Row>
          ))}
        </Col>
      </Col>
    </div>
  );
}
