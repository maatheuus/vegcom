"use client";

import { Arrow1CustomIcon, SprinkleCustomIcon } from "@/shared/icons";
import Scribble3 from "@/shared/icons/custom/Scribble3";
import gsap from "gsap";
import { useEffect, useState } from "react";

export default function BackgroundItems() {
  const [isMounted, setIsMounted] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const mm = gsap.matchMedia();

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

  useEffect(() => {
    mm.add("(min-width: 860px)", () => {
      // tl.fromTo(
      //   ".signup-arrow",
      //   { x: 200, opacity: 0 },
      //   { x: 0, opacity: 1, duration: 1.2 }
      // );
      // tl.fromTo(
      //   ".signup-scribble-3",
      //   { x: 200, opacity: 0 },
      //   { x: 0, opacity: 1, duration: 1, delay: 0.1 }
      // );
      // tl.fromTo(
      //   ".animate-sprinkle",
      //   { y: -250, opacity: 0 },
      //   { y: 0, opacity: 1, duration: 1.5, stagger: 0.5 },
      //   "-=0.8"
      // );
      // gsap.to(".animate-sprinkle", {
      //   rotate: 360,
      //   ease: "none",
      //   duration: 10,
      //   repeat: -1,
      // });
    });
  }, [shouldLoad, isMounted, mm]);

  return (
    <div>
      {isMounted && shouldLoad && (
        <>
          <div className="signup signup-arrow">
            <Arrow1CustomIcon className="text-green-500" />
          </div>

          <div>
            <Scribble3
              className="signup signup-scribble-3 text-green-500"
              width={310}
              height={72}
            />
          </div>
        </>
      )}

      <div className="signup animate-sprinkle signup-sprinkle">
        <SprinkleCustomIcon size={22} className="text-green-500" />
      </div>

      <div className="signup animate-sprinkle signup-sprinkle-2">
        <SprinkleCustomIcon size={22} className="text-green-500" />
      </div>
    </div>
  );
}
