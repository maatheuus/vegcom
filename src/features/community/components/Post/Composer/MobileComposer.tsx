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

export default function MobilePostComposer() {
  return (
    <Drawer shouldScaleBackground>
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
