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

import Text from "@/components//ui/Text";
import {
  ArrowCircleRightOutlinedIcon,
  AtOutlinedIcon,
  ClosedEyeOutlinedIcon,
  GoogleOutlinedIcon,
  OpenEyesOutlinedIcon,
} from "@/components/icons";
import Col from "@/components/ui/Layout/Helpers/Col";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function LoginForm() {
  const closedEyeRef = useRef<SVGSVGElement | null>(null);
  const [showingPassword, setShowingPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
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
      <form className="">
        <Col className="gap-5 px-5 pt-4 pb-6">
          <FormField
            // control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputIcon
                    type="email"
                    placeholder="Seu Email"
                    autoComplete="email"
                    defaultValue="qP8pL@example.com"
                    {...field}
                    icon={<AtOutlinedIcon size={18} />}
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
              <FormItem>
                <FormControl>
                  <InputIcon
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
                          className="cursor-pointer"
                        />
                      ) : (
                        <ClosedEyeOutlinedIcon
                          size={18}
                          ref={closedEyeRef}
                          className="cursor-pointer"
                        />
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full text-right">
            <Link
              href="/login"
              className="text-sm text-green-200 hover:text-green-500"
            >
              Esqueceu sua senha?
            </Link>
          </div>
        </Col>
        <Col className="items-center gap-2 px-5 py-4">
          <Button.Icon
            type="submit"
            leftIcon={<ArrowCircleRightOutlinedIcon size={24} />}
            text="Login"
            className="w-full sm:max-w-3xs animate-rotate-icon"
          />
          <Text
            as="span"
            className="text-green-500 text-xs"
            weight={Text.Weight.SemiBold}
          >
            ou
          </Text>
          <Button.Icon
            type="button"
            variant="text"
            leftIcon={<GoogleOutlinedIcon size={24} />}
            text="Continue com Google"
            className="w-full sm:max-w-3xs hover:text-green-700"
          />
        </Col>
      </form>
    </Form>
  );
}
