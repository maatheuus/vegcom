import { bike } from "@/assets";
import CodeConfirm from "../../CodeConfirm";
import SignupLayout from "../layout";

export default function CodeConfirmPage() {
  return (
    <SignupLayout
      left={{
        contentClassName: "h-full justify-center gap-y-4",
        title: "Agora confirme o seu código",
        children: <CodeConfirm />,
      }}
      right={{
        src: bike,
        alt: "a gif of a man cycling with a dog",
        title: "a gif of a man cycling with a dog",
        width: 785,
        height: 785,
        quality: 100,
      }}
    />
  );
}
