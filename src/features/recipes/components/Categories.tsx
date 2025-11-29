import Button from "@/shared/ui/Button";
import { Popover, PopoverContent } from "@/shared/ui/popover";
import Text from "@/shared/ui/Text";
import { CaretDownIcon } from "@phosphor-icons/react/ssr";
import { PopoverPortal, PopoverTrigger } from "@radix-ui/react-popover";
import clsx from "clsx";
import { Fragment } from "react";
import { SelectCategoryItem } from "./SelectCategoryItem";
import { categories } from "./utils";

export function Categories({ className }: React.ComponentProps<"div">) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button.Icon
          rightIcon={<CaretDownIcon size={16} />}
          className={clsx(
            "font-lora flex w-full items-center justify-center gap-2 rounded-full bg-green-50 px-4 py-2 text-green-500 transition-colors hover:bg-green-500 hover:text-green-50 sm:w-auto",
            className,
          )}
        >
          Categorias
        </Button.Icon>
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent
          className={clsx(
            "w-[calc(100vw-2rem)] rounded-md bg-green-50 p-4 shadow-lg sm:w-64",
            className,
          )}
          sideOffset={12}
          align="end"
        >
          <div className="space-y-4">
            {Object.entries(categories).map(([category, items]) => (
              <Fragment key={category}>
                <Text
                  as="h3"
                  type={Text.Type.BodyThree}
                  className="font-lora mb-2 font-semibold text-green-500"
                >
                  {category}
                </Text>
                <div className="font-maitree space-y-2">
                  {items.map((item) => (
                    <SelectCategoryItem key={item} item={item} />
                  ))}
                </div>
              </Fragment>
            ))}
          </div>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  );
}
