"use client";

import DisplayInformation from "@/components/account/DisplayInformation";
import FormInformation from "@/components/account/FormInformation";
import LayoutAccount from "@/components/account/LayoutAccount";
import {
  maxLengthForBio,
  personalInfoFormSchema
} from "@/components/account/utils";
import {
  EditPencilOutlinedIcon,
  FloppyDiskOutlinedIcon,
} from "@/components/icons";
import Button from "@/components/ui/Button";
import { Form } from "@/components/ui/Form";
import Col from "@/components/ui/Layout/Helpers/Col";
import Row from "@/components/ui/Layout/Helpers/Row";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Page() {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof personalInfoFormSchema>>({
    resolver: zodResolver(personalInfoFormSchema),
    defaultValues: {
      fullName: "Julio do Grau",
      email: "juliog@me.com",
      bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, nknown printer took a galley of type and scrambled it to make a type specimen book.",
      password: "*********",
      newPassword: "",
      confirmPassword: "",
      dietType: "vegan",
      culinaryLevel: "intermediate",
      location: "São Paulo, SP",
      publicProfile: true,
      monthlyGoal: "3-5",
    },
  });
  const { fullName } = form.getValues();

  const [bioLength, setBioLength] = useState<number>(
    form.getValues().bio.length
  );

  const formErros =
    form.formState.errors.bio ||
    form.formState.errors.fullName ||
    form.formState.errors.email ||
    form.formState.errors.dietType ||
    form.formState.errors.culinaryLevel ||
    form.formState.errors.location ||
    form.formState.errors.monthlyGoal ||
    bioLength > maxLengthForBio;

  const onSubmit = (values: z.infer<typeof personalInfoFormSchema>) => {
    if (form.formState.errors) return;

    console.log("Salvo com sucesso:", values);
    setIsEditing(false);
  };

  const onCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  return (
    <>
      <LayoutAccount title={`Sobre ${fullName}`} isEditing={isEditing} />

      <Col className="gap-y-4 relative mb-10">
        <Row className="w-fit items-center absolute -bottom-16 right-0">
          {!isEditing ? (
            <div
              className="h-fit flex items-center gap-2 font-medium relative bg-green-100 text-green-500 rounded-full px-3 py-1.5 hover:bg-green-500 hover:text-green-100 transition-colors duration-300 cursor-pointer"
              role="button"
              onClick={() => setIsEditing(true)}
            >
              <EditPencilOutlinedIcon size={18} />
              Editar perfil
            </div>
          ) : (
            <Row className="gap-2">
              <Button
                variant="text"
                onClick={onCancel}
                className="cursor-pointer"
              >
                Cancelar
              </Button>
              <button
                className="h-fit flex items-center gap-2 font-medium relative bg-green-500 text-green-100 rounded-full px-4 py-1.5 hover:bg-green-100  hover:text-green-500 transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-500 disabled:hover:text-green-100"
                disabled={Boolean(formErros)}
                onClick={form.handleSubmit(onSubmit)}
              >
                <FloppyDiskOutlinedIcon size={18} />
                Salvar
              </button>
            </Row>
          )}
        </Row>

        <div className="space-y-4">
          {!isEditing ? (
            <DisplayInformation form={form} />
          ) : (
            <Form {...form}>
              <FormInformation
                form={form}
                bioLength={bioLength}
                setBioLength={setBioLength}
              />
            </Form>
          )}
        </div>
      </Col>
    </>
  );
}
