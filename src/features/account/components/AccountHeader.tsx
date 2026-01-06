import PremiumMemberBadge from "@/features/account/components/PremiumMemberBadge";
import PremiumMemberCard from "@/features/account/components/PremiumMemberCard";
import { getUser } from "@/features/auth/api/queries/getAuthApiServer";
import Text from "@/shared/ui/Text";

export default async function AccountHeader() {
  const user = await getUser();
  console.log("user", user);
  return (
    <>
      <div>
        <Text
          as="h1"
          type={Text.Type.HeadingThree}
          weight={Text.Weight.Bold}
          className="font-lora text-green-500"
        >
          Gerenciamento de Conta
        </Text>
        <Text
          as="p"
          type={Text.Type.BodyThree}
          weight={Text.Weight.Medium}
          className="font-maitree text-green-200"
        >
          Gerencie suas configurações e preferências de conta
        </Text>
      </div>

      {user?.data.subscription?.status === "active" ? (
        <PremiumMemberBadge />
      ) : (
        <PremiumMemberCard />
      )}
    </>
  );
}
