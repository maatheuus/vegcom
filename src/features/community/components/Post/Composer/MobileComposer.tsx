import Button from "@/shared/ui/Button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/drawer";
import { LockSimpleIcon, PlusIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import PostComposer from "./index";

interface Props {
  disabled?: boolean;
}

export default function MobilePostComposer({ disabled }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("community:post-created", close);
    return () => window.removeEventListener("community:post-created", close);
  }, []);

  if (disabled) {
    return (
      <Drawer open={open} onOpenChange={setOpen} shouldScaleBackground>
        <DrawerTrigger asChild>
          <Button.Icon
            variant="filled"
            className="fixed right-6 bottom-6 z-50 h-14 w-14 rounded-full shadow-xl md:hidden"
            icon={<PlusIcon size={24} weight="bold" />}
          />
        </DrawerTrigger>
        <DrawerContent className="bg-green-50">
          <DrawerHeader className="pb-0 text-left">
            <DrawerTitle className="font-maitree font-medium text-green-500">
              Criar publicação
            </DrawerTitle>
          </DrawerHeader>
          <DrawerDescription className="sr-only">
            Faça login para criar uma publicação
          </DrawerDescription>
          <div className="flex flex-col items-center gap-4 px-6 py-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <LockSimpleIcon
                size={24}
                weight="fill"
                className="text-green-500"
              />
            </div>
            <div className="space-y-1">
              <p className="font-lora text-base font-semibold text-green-200">
                Faça login para publicar
              </p>
              <p className="font-maitree text-sm text-green-500">
                Entre na sua conta para compartilhar receitas e ideias com a
                comunidade.
              </p>
            </div>
            <Button.Link
              href="/login"
              className="font-maitree mt-2 w-full bg-green-200 text-green-50 active:bg-green-500"
            >
              Fazer login
            </Button.Link>
            <Link
              href="/register"
              className="font-maitree text-sm text-green-500 underline underline-offset-2"
            >
              Não tem conta? Cadastre-se
            </Link>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} shouldScaleBackground>
      <DrawerTrigger asChild>
        <Button.Icon
          variant="filled"
          className="fixed right-6 bottom-6 z-50 h-14 w-14 rounded-full shadow-xl md:hidden"
          icon={<PlusIcon size={24} weight="bold" />}
        />
      </DrawerTrigger>
      <DrawerContent className="bg-green-50">
        <DrawerDescription className="sr-only">
          Use este formulário para criar uma nova publicação na comunidade
        </DrawerDescription>
        <DrawerHeader className="pb-0 text-left">
          <DrawerTitle className="font-lora font-medium text-green-500">
            Criar nova publicação
          </DrawerTitle>
        </DrawerHeader>
        <div className="p-4 pb-8">
          <PostComposer className="rounded-xl border border-green-100 bg-green-50 shadow-none" />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
