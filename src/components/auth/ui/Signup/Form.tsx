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
  OpenEyesOutlinedIcon,
  UserDashedFilledIcon,
} from "@/components/icons";
import Col from "@/components/ui/Layout/Helpers/Col";
import { useEffect, useRef, useState, type FC } from "react";

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

const SignupForm: FC<React.ComponentProps<"form">> = ({
  className,
  ...props
}) => {
  const closedEyeRef = useRef<SVGSVGElement | null>(null);
  const [showingPassword, setShowingPassword] = useState<boolean>(false);

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

  return (
    <Form {...form}>
      <form className={className} {...props}>
        <Col className="gap-3 px-5 pt-4 pb-6 items-center">
          <FormField
            // control={form.control}
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
            // control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full max-w-[404px]">
                <FormControl>
                  <InputIcon
                    className="w-full text-green-500"
                    type="email"
                    placeholder="Seu Email"
                    autoComplete="email"
                    defaultValue="qP8pL@example.com"
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
            // control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full max-w-[404px]">
                <FormControl>
                  <InputIcon
                    className="w-full "
                    type={showingPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    defaultValue="qP8pL@example.com"
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
            rightIcon={<ArrowCircleRightOutlinedIcon size={24} />}
            text="Seguinte"
            className="font-semibold w-full sm:max-w-80 hover:[&_svg]:translate-x-1.5 hover:[&_svg]:transition-all hover:[&_svg]:duration-300"
          />

          <Button
            type="button"
            variant="text"
            className="text-base font-semibold w-full sm:max-w-80 cursor-pointer hover:text-green-700 hover:bg-transparent"
          >
            Continue com Google
          </Button>
        </Col>
      </form>
    </Form>
  );
};

export default SignupForm;
