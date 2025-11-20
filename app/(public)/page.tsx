import "@/assets/css/home.css";

import { sideImage } from "@/assets";
import HomeLayout from "@/shared/components/ui/layout";
import Welcome from "@/shared/components/ui/right/Welcome";

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
