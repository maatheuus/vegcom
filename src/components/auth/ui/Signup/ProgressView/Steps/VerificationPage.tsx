import { okay } from "@/assets";
import CodeChecked from "../../CodeChecked";
import SignupLayout from "../layout";

export default function VerificationPage() {
  return (
    <SignupLayout
      left={{
        contentClassName: "h-full justify-center gap-y-11 max-w-[394px]",
        title: "Tudo certo por aqui :)",
        subTitle: "Continue para sabermos mais sobre  você!",
        children: <CodeChecked />,
      }}
      right={{
        src: okay,
        alt: "a gif with a check mark",
        title: "check mark",
        width: 785,
        height: 785,
        quality: 100,
        classImage: "scale-x-100",
      }}
    />
  );
}
