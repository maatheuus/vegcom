"use client";

import Button from "@/shared/ui/Button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/shared/ui/sheet";
import Text from "@/shared/ui/Text";
import { DotsThreeIcon } from "@phosphor-icons/react";
import { useState } from "react";

export interface HeaderAction {
  text: string;
  icon?: React.ReactElement;
  onClick?: () => void;
  href?: string;
  variant?: "default" | "destructive";
}

interface Props {
  hasButton?: boolean;
  className?: string;
  children?: React.ReactNode;
  title: string;
  subTitle: string;
  buttonCta?: {
    text: string;
    onClick: () => void;
  };
  actions?: HeaderAction[];
}

export default function Header({
  title,
  subTitle,
  hasButton,
  buttonCta,
  children,
  className,
  actions,
  ...props
}: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div
        className={`flex items-center justify-between ${className ?? ""}`}
        {...props}
      >
        <div>
          <Text
            as="h2"
            type={Text.Type.HeadingThree}
            weight={Text.Weight.Bold}
            className="font-lora text-green-500"
          >
            {title}
          </Text>
          <Text
            as="p"
            type={Text.Type.BodyThree}
            weight={Text.Weight.Medium}
            className="font-maitree text-green-200"
          >
            {subTitle}
          </Text>
        </div>

        <div className="flex items-center gap-2">
          {children}

          {actions && actions.length > 0 && (
            <div className="hidden items-center gap-2 md:flex">
              {actions.map((action, index) => {
                if (action.href) {
                  return (
                    <Button.Link
                      key={index}
                      leftIcon={action.icon}
                      size="md"
                      className={`font-maitree cursor-pointer py-2 ${
                        action.variant === "destructive"
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-500"
                      }`}
                      text={action.text}
                      href={action.href}
                    />
                  );
                }

                return (
                  <Button
                    key={index}
                    onClick={action.onClick}
                    variant={
                      action.variant === "destructive" ? "outline" : "default"
                    }
                    size="default"
                    className={`font-maitree cursor-pointer ${
                      action.variant === "destructive"
                        ? "border-red-500 text-red-500 hover:bg-red-50"
                        : ""
                    }`}
                  >
                    {action.icon && <span className="mr-2">{action.icon}</span>}
                    {action.text}
                  </Button>
                );
              })}
            </div>
          )}

          {actions && actions.length > 0 && (
            <Button.Icon
              onClick={() => setIsMenuOpen(true)}
              className="rounded p-2 text-green-500 hover:bg-green-50 md:hidden"
              variant="text"
              icon={<DotsThreeIcon size={24} weight="bold" />}
              type="button"
            />
          )}

          {!children && !actions && hasButton && buttonCta && (
            <Button
              variant="default"
              size="default"
              onClick={buttonCta.onClick}
              className="font-maitree cursor-pointer"
            >
              {buttonCta.text}
            </Button>
          )}
        </div>
      </div>

      {actions && actions.length > 0 && (
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetContent side="bottom" className="rounded-t-2xl">
            <SheetHeader className="mb-4 text-left">
              <SheetTitle className="font-lora text-lg text-green-800">
                Ações
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-2">
              {actions.map((action, index) => (
                <SheetClose key={index} asChild>
                  {action.href ? (
                    <Button.Link
                      href={action.href}
                      className={`font-lora w-full justify-start rounded-lg px-4 py-3 text-base ${
                        action.variant === "destructive"
                          ? "bg-red-50 text-red-600"
                          : "bg-green-500 text-green-50"
                      }`}
                      variant="text"
                      leftIcon={action.icon || undefined}
                      text={action.text}
                    />
                  ) : (
                    <Button.Icon
                      onClick={action.onClick}
                      className={`font-lora w-full justify-start rounded-lg px-4 py-3 text-base ${
                        action.variant === "destructive"
                          ? "bg-red-50 text-red-600"
                          : "bg-green-500 text-green-50"
                      }`}
                      variant="text"
                      leftIcon={action.icon || undefined}
                      text={action.text}
                    />
                  )}
                </SheetClose>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
