import { bike } from "@/assets";
import SignupForm from "../../Form";
import SignupLayout from "../layout";

export default function FormPage() {
  return (
    <SignupLayout
      left={{
        contentClassName: "h-full justify-center gap-y-4",
        title: "Que bom ter você aqui",
        subTitle: "Crie sua conta",
        children: <SignupForm />,
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
