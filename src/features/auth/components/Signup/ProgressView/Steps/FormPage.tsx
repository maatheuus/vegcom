import SignupForm from "../../Form";
import SignupCard from "../../SignupCard";

export default function FormPage() {
  return (
    <SignupCard title="Que bom ter você aqui" subTitle="Crie sua conta">
      <SignupForm />
    </SignupCard>
  );
}
