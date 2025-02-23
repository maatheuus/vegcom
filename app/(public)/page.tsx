import "@/assets/css/home.css";

import { sideImage } from "@/assets";
import HomeLayout from "@/components/home/ui/layout";
import Welcome from "@/components/home/ui/right/Welcome";

export default function Page() {
  return (
    <HomeLayout
      left={{
        src: sideImage,
        alt: "illustrative image",
        title: "illustrative image",
        width: 858,
        height: 538,
        quality: 100,
      }}
      right={{
        className: "bg-green-50",
        children: <Welcome />,
      }}
    />
  );
}
