import type { UseFormReturn } from "react-hook-form";
import Col from "../../ui/Layout/Helpers/Col";
import Text from "../../ui/Text";
import {
  culinaryLevelOptions,
  dietOptions,
  monthlyGoalOptions,
} from "../utils";

interface Props {
  form: UseFormReturn<
    {
      fullName: string;
      email: string;
      location: string;
      bio: string;
      publicProfile: boolean;
      dietType: string;
      culinaryLevel: string;
      monthlyGoal: string;
      password?: string | undefined;
      newPassword?: string | undefined;
      confirmPassword?: string | undefined;
    },
    unknown,
    undefined
  >;
}

export default function DisplayInformation({ form }: Props) {
  const {
    fullName,
    email,
    bio,
    password,
    dietType,
    culinaryLevel,
    location,
    publicProfile,
    monthlyGoal,
  } = form.getValues();

  const getDietTypeLabel = (value: string) => {
    return dietOptions.find((option) => option.value === value)?.label || value;
  };

  const getCulinaryLevelLabel = (value: string) => {
    return (
      culinaryLevelOptions.find((option) => option.value === value)?.label ||
      value
    );
  };

  const getMonthlyGoalLabel = (value: string) => {
    return (
      monthlyGoalOptions.find((option) => option.value === value)?.label ||
      value
    );
  };

  return (
    <Col className="gap-5">
      <div className="flex items-start gap-x-4">
        <div className="w-full">
          <Text
            type={Text.Type.BodyThree}
            weight={Text.Weight.Medium}
            className="text-green-500"
          >
            Nome completo
          </Text>
          <Text
            type={Text.Type.BodyTwo}
            weight={Text.Weight.Normal}
            className="text-green-200"
          >
            {fullName}
          </Text>
        </div>
        <div className="w-full">
          <Text
            type={Text.Type.BodyThree}
            weight={Text.Weight.Medium}
            className="text-green-500"
          >
            Email
          </Text>
          <Text
            type={Text.Type.BodyTwo}
            weight={Text.Weight.Normal}
            className="text-green-200"
          >
            {email}
          </Text>
        </div>
      </div>

      <div>
        <Text
          type={Text.Type.BodyThree}
          weight={Text.Weight.Medium}
          className="text-green-500"
        >
          Localização
        </Text>
        <Text
          type={Text.Type.BodyTwo}
          weight={Text.Weight.Normal}
          className="text-green-200"
        >
          {location}
        </Text>
      </div>

      <div className="flex items-start gap-x-4">
        <div className="w-full">
          <Text
            type={Text.Type.BodyThree}
            weight={Text.Weight.Medium}
            className="text-green-500"
          >
            Tipo de dieta
          </Text>
          <Text
            type={Text.Type.BodyTwo}
            weight={Text.Weight.Normal}
            className="text-green-200"
          >
            {getDietTypeLabel(dietType)}
          </Text>
        </div>
        <div className="w-full">
          <Text
            type={Text.Type.BodyThree}
            weight={Text.Weight.Medium}
            className="text-green-500"
          >
            Nível culinário
          </Text>
          <Text
            type={Text.Type.BodyTwo}
            weight={Text.Weight.Normal}
            className="text-green-200"
          >
            {getCulinaryLevelLabel(culinaryLevel)}
          </Text>
        </div>
      </div>

      <div className="flex items-start gap-x-4">
        <div className="w-full">
          <Text
            type={Text.Type.BodyThree}
            weight={Text.Weight.Medium}
            className="text-green-500"
          >
            Meta mensal
          </Text>
          <Text
            type={Text.Type.BodyTwo}
            weight={Text.Weight.Normal}
            className="text-green-200"
          >
            {getMonthlyGoalLabel(monthlyGoal)}
          </Text>
        </div>
        <div className="w-full">
          <Text
            type={Text.Type.BodyThree}
            weight={Text.Weight.Medium}
            className="text-green-500"
          >
            Perfil público
          </Text>
          <Text
            type={Text.Type.BodyTwo}
            weight={Text.Weight.Normal}
            className="text-green-200"
          >
            {publicProfile ? "Sim" : "Não"}
          </Text>
        </div>
      </div>

      <div>
        <Text
          type={Text.Type.BodyThree}
          weight={Text.Weight.Medium}
          className="text-green-500"
        >
          Sobre você
        </Text>
        <Text
          type={Text.Type.BodyTwo}
          weight={Text.Weight.Normal}
          className="text-green-200"
        >
          {bio || "Sem descrição."}
        </Text>
      </div>

      <div>
        <Text
          type={Text.Type.BodyThree}
          weight={Text.Weight.Medium}
          className="text-green-500"
        >
          Senha
        </Text>
        <Text
          type={Text.Type.BodyTwo}
          weight={Text.Weight.Normal}
          className="text-green-200"
        >
          {password}
        </Text>
      </div>
    </Col>
  );
}
