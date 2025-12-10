import { useSignupFormState } from "@/features/auth/hooks/queries/useSignupFormState";
import SignupCard from "../../SignupCard";
import UserInformation from "../../UserInformation";

export default function UserInformationPage() {
  const {
    formData: { username },
  } = useSignupFormState();

  return (
    <SignupCard title={`Agora, ${username}, nos conte um pouco sobre você`}>
      <UserInformation />
    </SignupCard>
  );
}
