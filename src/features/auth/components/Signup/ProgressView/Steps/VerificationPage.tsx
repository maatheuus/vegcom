import CodeChecked from "../../CodeChecked";
import SignupCard from "../../SignupCard";

export default function VerificationPage() {
  return (
    <SignupCard
      title="Tudo certo por aqui :)"
      subTitle="Continue para sabermos mais sobre você!"
    >
      <CodeChecked />
    </SignupCard>
  );
}
