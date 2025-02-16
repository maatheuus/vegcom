"use client";

import { brazucaStanding } from "@/assets";
import {
  Arrow1CustomIcon,
  BoxArrowCustomIcon,
  BoxBallCustomIcon,
  Dialog1CustomIcon,
  Dialog2CustomIcon,
  Line9CustomIcon,
  NormalLineOutlinedIcon,
  Scribble3CustomIcon,
  Scribble4CustomIcon,
  SprinkleCustomIcon,
} from "@/components/icons";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function BackgroundItems() {
  const [isMounted, setIsMounted] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
  const mm = gsap.matchMedia();

  useGSAP(() => {
    tl.fromTo(
      " .dialog-2, .dialog-1, .arrow-1, .scribble4, .scribble3",
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.3, ease: "none" }
    );

    mm.add("(min-width: 860px)", () => {
      tl.fromTo(
        ".line-bottom",
        { x: -100, width: 0, duration: 0.5 },
        { x: 0, duration: 1.5, width: "100%" }
      );

      tl.fromTo(
        ".brazuka",
        { x: 200, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "none" }
      );

      tl.fromTo(
        ".line-9",
        { opacity: 0, duration: 0.5 },
        { opacity: 1, duration: 1 }
      );

      tl.fromTo(
        ".box-arrow",
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power1.in",
        }
      );

      tl.fromTo(
        ".box-ball",
        { x: -300, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "bounce.out",
        }
      );

      tl.fromTo(
        ".animate-sprinkle",
        { y: -250, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, stagger: 0.5 },
        "-=0.8"
      );

      gsap.to(".animate-sprinkle", {
        rotate: 360,
        ease: "none",
        duration: 10,
        repeat: -1,
      });
    });

    mm.add("(max-width: 860px)", () => {
      gsap.utils.toArray<Element>(".dialog-1, .dialog-2").forEach((elem) => {
        elem.addEventListener("mouseenter", () => {
          gsap.to(elem, { scale: 1.1, duration: 0.3 });
        });
        elem.addEventListener("mouseleave", () => {
          gsap.to(elem, { scale: 1, duration: 0.3 });
        });
      });
    });
  }, []);

  useEffect(() => {
    const checkViewport = () => {
      const isLargeScreen = window.matchMedia("(min-width: 860px)").matches;
      setShouldLoad(isLargeScreen);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    setIsMounted(true);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  return (
    <div className="overflow-hidden">
      {isMounted && shouldLoad && (
        <>
          <div className="brazuka pointer-events-none hidden md:block">
            <Image src={brazucaStanding} alt="brazuca standing" unoptimized />
          </div>

          <div className="line-bottom">
            <NormalLineOutlinedIcon width="100%" />
          </div>

          <div className="dialog-2">
            <Dialog2CustomIcon />
          </div>

          <div className="dialog-1">
            <Dialog1CustomIcon />
          </div>

          <div className="arrow-1">
            <Arrow1CustomIcon />
          </div>

          <div>
            <Line9CustomIcon className="line-9" width={73} height={297} />
          </div>

          <div className="box-arrow">
            <BoxArrowCustomIcon width={92} height={106} />
          </div>

          <div className="box-ball">
            <BoxBallCustomIcon width={92} height={171} />
          </div>
        </>
      )}

      <div className="animate-sprinkle sprinkle">
        <SprinkleCustomIcon size={24} />
      </div>

      <div className="animate-sprinkle sprinkle-2">
        <SprinkleCustomIcon size={14} />
      </div>

      <div className="animate-sprinkle sprinkle-3">
        <SprinkleCustomIcon size={12} />
      </div>

      <div className="animate-sprinkle sprinkle-4">
        <SprinkleCustomIcon size={12} />
      </div>

      <div className="scribble4">
        <Scribble4CustomIcon width={239} height={107} />
      </div>

      <div className="scribble3">
        <Scribble3CustomIcon width={252} height={72} />
      </div>
    </div>
  );
}
