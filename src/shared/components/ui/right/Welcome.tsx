import { intersect } from "@/assets";
import { cn } from "@/shared/lib/utils";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Text from "@/shared/ui/Text";
import Image from "next/image";
import PathLinks from "./PathLinks";

export default function Welcome({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <Col
      className={cn(
        "mx-auto h-full px-6 py-16 sm:px-12 md:max-w-[790px] lg:mx-0 lg:max-w-[600px] lg:px-6 lg:pb-4 xl:max-w-full",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col items-center justify-center">
        <Text
          as="h1"
          className="font-rancho h-fit text-center text-7xl tracking-wider text-green-200 sm:text-8xl lg:text-[140px] xl:!text-[170px]"
        >
          Viva Leve
        </Text>

        <div className="flex w-full max-w-full items-center justify-between gap-2.5 lg:max-w-[50%]">
          <Text
            as="p"
            className="font-lora h-fit w-fit text-center text-xs font-bold text-green-200 uppercase italic"
          >
            Objetivo.
          </Text>

          <div className="h-px w-full bg-green-200" />

          <Text
            as="p"
            className="font-lora h-fit w-fit text-center text-xs font-bold text-green-200 uppercase italic"
          >
            Saúde.
          </Text>
        </div>
      </div>

      <div className="my-12 flex w-full items-center justify-center lg:absolute lg:top-[34%] lg:right-[0%] lg:my-0">
        <div className="h-fit w-[85%] lg:h-[60%] lg:w-[60%] xl:h-[70%] xl:w-[70%]">
          <Image
            src={intersect}
            alt="image of a woman smiling with the sunset in her face"
            title="woman smiling"
            loading="eager"
            unoptimized
            width={500}
            height={500}
            className="h-fit w-fit object-cover lg:size-full"
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-10 text-center lg:mt-auto lg:flex-row lg:items-end lg:justify-between lg:gap-4 lg:text-left">
        <div className="lg:max-w-[306px]">
          <Text
            as="p"
            className="font-lora text-center text-xl font-normal text-green-500 italic lg:text-left lg:!text-[24px]"
          >
            Alimente seu corpo e sua alma
          </Text>
          <Text
            as="p"
            className="font-lora mt-1 !text-xs font-normal text-green-200 italic"
          >
            Junte-se a nós nesta jornada em direção a um estilo de vida mais
            saudável e sustentável.
          </Text>
        </div>

        <PathLinks />
      </div>
    </Col>
  );
}
