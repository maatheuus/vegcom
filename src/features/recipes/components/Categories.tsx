import { ChevronDownOutlinedIcon } from "@/shared/icons";
import { PopoverPortal, PopoverTrigger } from "@radix-ui/react-popover";
import clsx from "clsx";
import { Fragment } from "react";
import Button from "@/shared/ui/Button";
import { Popover, PopoverContent } from "@/shared/ui/popover";
import Text from "@/shared/ui/Text";
import { SelectCategoryItem } from "./SelectCategoryItem";
import { categories } from "./utils";

export function Categories({ className }: React.ComponentProps<"div">) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button.Icon
          rightIcon={<ChevronDownOutlinedIcon size={16} />}
          className={clsx(
            "flex items-center font-lora justify-center gap-2 w-full sm:w-auto px-4 py-2 rounded-full bg-green-50 text-green-500 hover:bg-green-500 hover:text-green-50 transition-colors",
            className
          )}
        >
          Categorias
        </Button.Icon>
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent
          className={clsx(
            "bg-green-50 rounded-md shadow-lg p-4 w-[calc(100vw-2rem)] sm:w-64",
            className
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
                  className="font-semibold font-lora text-green-500 mb-2"
                >
                  {category}
                </Text>
                <div className="space-y-2 font-maitree">
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
