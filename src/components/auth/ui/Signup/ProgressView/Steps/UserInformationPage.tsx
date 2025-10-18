import { typing } from "@/assets";
import { useSignupFormState } from "@/hooks/auth/queryes/useSignupFormState";
import UserInformation from "../../UserInformation";
import SignupLayout from "../layout";

export default function UserInformationPage() {
  const {
    formData: { username },
  } = useSignupFormState();

  return (
    <SignupLayout
      left={{
        contentClassName: "h-full justify-center max-w-[554px]",
        title: `Agora, ${username}, nos conte um pouco sobre você`,
        children: <UserInformation />,
      }}
      right={{
        src: typing,
        alt: "a gif of a old typewriter",
        title: "a old typewriter",
        width: 785,
        height: 785,
        quality: 100,
      }}
    />
  );
}
