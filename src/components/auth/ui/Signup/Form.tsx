"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import { InputIcon } from "@/components/ui/Input";

import {
  ArrowCircleRightOutlinedIcon,
  AtOutlinedIcon,
  ClosedEyeOutlinedIcon,
  LoadingOutlinedIcon,
  OpenEyesOutlinedIcon,
  UserDashedFilledIcon,
} from "@/components/icons";
import Col from "@/components/ui/Layout/Helpers/Col";
import useSignupData from "@/hooks/auth/mutations/useSignup";
import { toast } from "@/hooks/use-toast";

// import { loginWithGoogle } from "@/lib/supabase/authFunctions";
import { useStepStore } from "@/hooks/auth/signupFlow/setLocalData";
import {
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type FC,
} from "react";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

const SignupForm: FC<ComponentProps<"form">> = ({ className, ...props }) => {
  const closedEyeRef = useRef<SVGSVGElement | null>(null);
  const [showingPassword, setShowingPassword] = useState<boolean>(false);
  const { nextStep, setStep } = useStepStore();

  const {
    mutate: signup,
    error: signupError,
    isPending: isLoading,
  } = useSignupData();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (closedEyeRef.current) {
      closedEyeRef.current.addEventListener("click", () => {
        setShowingPassword(!showingPassword);
      });
    }
  }, [showingPassword]);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (signupError) {
      toast({
        title: "Erro ao fazer login",
        description:
          signupError?.message ||
          "Verifique suas credenciais e tente novamente.",
        variant: "destructive",
        duration: 8000,
      });
    }

    toast({
      title: "Sucesso!",
      variant: "success",
      duration: 5000,
    });

    // signup({ ...data });
    setStep("signupForm");
    nextStep();
    return data;
  }

  // async function handleLoginWithGoogle() {
  //   const { error } = await loginWithGoogle();

  //   if (error) {
  //     toast({
  //       title: "Erro ao fazer login",
  //       description:
  //         error.message || "Verifique suas credenciais e tente novamente.",
  //       variant: "destructive",
  //       duration: 8000,
  //     });
  //   } else {
  //     toast({
  //       title: "Sucesso!",
  //       description: " Vocé foi logado com sucesso.",
  //       variant: "success",
  //     });
  //   }
  // }

  return (
    <Form {...form}>
      <form
        className={className}
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <Col className="gap-3 px-5 pt-4 pb-6 items-center">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full max-w-[404px]">
                <FormControl>
                  <InputIcon
                    className="w-full text-green-500"
                    type="text"
                    placeholder="Seu nome completo"
                    autoComplete="name"
                    {...field}
                    icon={
                      <UserDashedFilledIcon
                        className="text-green-500"
                        size={18}
                      />
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full max-w-[404px]">
                <FormControl>
                  <InputIcon
                    className="w-full text-green-500"
                    type="email"
                    placeholder="Seu Email"
                    autoComplete="email"
                    {...field}
                    icon={
                      <AtOutlinedIcon className="text-green-500" size={18} />
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full max-w-[404px]">
                <FormControl>
                  <InputIcon
                    className="w-full"
                    type={showingPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    autoComplete="new-password"
                    {...field}
                    icon={
                      showingPassword ? (
                        <OpenEyesOutlinedIcon
                          size={18}
                          ref={closedEyeRef}
                          className="cursor-pointer text-green-500"
                        />
                      ) : (
                        <ClosedEyeOutlinedIcon
                          size={18}
                          ref={closedEyeRef}
                          className="cursor-pointer text-green-500"
                        />
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Col>
        <Col className="items-center gap-2 px-5 py-4">
          <Button.Icon
            type="submit"
            rightIcon={
              isLoading ? (
                <LoadingOutlinedIcon size={24} />
              ) : (
                <ArrowCircleRightOutlinedIcon size={24} />
              )
            }
            text="Seguinte"
            className="font-semibold w-full sm:max-w-80 hover:[&_svg]:translate-x-1.5 hover:[&_svg]:transition-all hover:[&_svg]:duration-300"
            disabled={isLoading}
          />

          {/* <Button
            type="button"
            variant="text"
            className="text-base font-semibold w-full sm:max-w-80 cursor-pointer hover:text-green-700 hover:bg-transparent"
            disabled={isLoading}
            onClick={handleLoginWithGoogle}
          >
            Continue com Google
          </Button> */}
        </Col>
      </form>
    </Form>
  );
};

export default SignupForm;
