import { useSignupFormState } from "@/features/auth/hooks/queries/useSignupFormState";
import SignupCard from "../../SignupCard";
import UserInformation from "../../UserInformation";

export default function UserInformationPage() {
  const {
    formData: { name },
  } = useSignupFormState();

  return (
    <SignupCard title={`Agora, ${name}, nos conte um pouco sobre você`}>
      <UserInformation />
    </SignupCard>
  );
}
