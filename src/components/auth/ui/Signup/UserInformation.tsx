"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { LoadingOutlinedIcon } from "@/components/icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import { Label } from "@/components/ui/Label";
import Col from "@/components/ui/Layout/Helpers/Col";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import Text from "@/components/ui/Text";
import Textarea from "@/components/ui/TextArea";
import { useSignupFormState } from "@/hooks/auth/queryes/useSignupFormState";
import { type FC } from "react";
import SubmitButton from "../SubmitButton/SubmitButton";

const formSchema = z.object({
  userInfo: z.string().min(2, { message: "Deve ter pelo menos 2 caracteres." }),
  meetUsInfo: z.string().optional(),
  preference: z.enum(["vegan", "vegetarian", ""], {
    required_error: "Selecione uma opção",
  }),
});

const UserInformation: FC<React.ComponentProps<"form">> = ({
  className,
  ...props
}) => {
  const { formData, nextStep, updateFormData, isSubmitting } =
    useSignupFormState();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userInfo: formData.userInfo || "",
      meetUsInfo: formData.meetUsInfo || "",
      preference: formData.preference || "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const finalData = { ...formData, ...data };
    const { currentStep, ...payload } = finalData;

    updateFormData(payload);
    nextStep();
  }

  return (
    <Form {...form}>
      <form
        className={className}
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <Col className="items-center gap-4 px-5 pt-4 pb-5">
          <FormField
            control={form.control}
            name="userInfo"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Textarea
                    className="w-full text-green-500"
                    placeholder="Há 5 anos, decidi me tornar vegano e desde então estou sempre explorando novas receitas..."
                    maxLength={154}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="preference"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Col className="gap-3">
                    <Text className="font-maitree font-semibold text-green-500">
                      Eu sou:
                    </Text>

                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center gap-8"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="vegetarian" id="vegetarian" />
                        <Label
                          htmlFor="vegetarian"
                          className="font-maitree font-bold text-green-500"
                        >
                          Vegetariano(a)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="vegan" id="vegan" />
                        <Label
                          htmlFor="vegan"
                          className="font-maitree font-bold text-green-500"
                        >
                          Vegano(a)
                        </Label>
                      </div>
                    </RadioGroup>
                  </Col>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="meetUsInfo"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Textarea
                    className="min-h-[97px] w-full text-green-500"
                    placeholder="Como você nos conheceu? (opcional)"
                    maxLength={154}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Col>
        <Col className="items-center gap-2 px-5">
          <SubmitButton
            text="Seguinte"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            <LoadingOutlinedIcon className="!h-6 !w-6 animate-spin" />
          </SubmitButton>
        </Col>
      </form>
    </Form>
  );
};

export default UserInformation;
