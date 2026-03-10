import Button from "@/shared/ui/Button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/drawer";
import { PlusIcon } from "@phosphor-icons/react";
import PostComposer from "./index";

interface Props {
  disabled?: boolean;
}

export default function MobilePostComposer({ disabled }: Props) {
  return (
    <Drawer shouldScaleBackground>
      <DrawerTrigger asChild>
        <Button.Icon
          variant="filled"
          className="fixed right-6 bottom-6 z-50 h-14 w-14 rounded-full shadow-xl disabled:cursor-not-allowed disabled:bg-gray-400 md:hidden"
          icon={<PlusIcon size={24} weight="bold" />}
          disabled={disabled}
        />
      </DrawerTrigger>
      <DrawerContent className="bg-green-50">
        <DrawerHeader className="pb-0 text-left">
          <DrawerTitle className="font-maitree font-medium text-green-500">
            Criar nova publicação
          </DrawerTitle>
        </DrawerHeader>
        <div className="p-4 pb-8">
          <PostComposer
            disabled={disabled}
            className="rounded-xl border border-green-100 bg-green-50 shadow-none"
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
