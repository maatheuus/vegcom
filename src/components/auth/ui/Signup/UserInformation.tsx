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
} from "@/components/ui/form";

import { ArrowCircleRightOutlinedIcon } from "@/components/icons";
import { Checkbox } from "@/components/ui/checkbox";
import Col from "@/components/ui/Layout/Helpers/Col";
import Row from "@/components/ui/Layout/Helpers/Row";
import Text from "@/components/ui/Text";
import { Textarea } from "@/components/ui/TextArea";
import { useEffect, useRef, useState, type FC } from "react";

const formSchema = z.object({
  about: z.string().min(2, {
    message: "about must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

const UserInformation: FC<React.ComponentProps<"form">> = ({
  className,
  ...props
}) => {
  const closedEyeRef = useRef<SVGSVGElement | null>(null);
  const [showingPassword, setShowingPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      about: "",
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
        <Col className="gap-4 px-5 pt-4 pb-5 items-center">
          <FormField
            // control={form.control}
            name="about"
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
            // control={form.control}
            name="preference"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Col className="gap-3">
                    <Text as="label" className="text-green-500">
                      Eu sou:
                    </Text>

                    <Row className="gap-8">
                      <Row className="gap-x-1.5">
                        <Checkbox className="text-green-500" {...field} />
                        <Text as="label" className="text-green-500">
                          Vegetariano (a)
                        </Text>
                      </Row>
                      <Row className="gap-x-1.5">
                        <Checkbox className="text-green-500" {...field} />
                        <Text as="label" className="text-green-500">
                          Vegano (a)
                        </Text>
                      </Row>
                    </Row>
                  </Col>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            // control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Textarea
                    className="w-full text-green-500 min-h-[97px]"
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
          <Button.Icon
            type="submit"
            rightIcon={<ArrowCircleRightOutlinedIcon size={24} />}
            text="Seguinte"
            className="font-semibold w-full sm:max-w-80 hover:[&_svg]:translate-x-1.5 hover:[&_svg]:transition-all hover:[&_svg]:duration-300"
          />
        </Col>
      </form>
    </Form>
  );
};

export default UserInformation;
