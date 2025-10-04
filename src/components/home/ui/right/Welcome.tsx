import { intersect } from "@/assets";
import Col from "@/components/ui/Layout/Helpers/Col";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import Image from "next/image";
import PathLinks from "./PathLinks";

export default function Welcome({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <Col
      className={cn(
        "px-6 py-16 mx-auto h-full sm:px-12 md:max-w-[790px] lg:px-6 lg:pb-4 lg:max-w-[600px] lg:mx-0 xl:max-w-full",
        className
      )}
      {...props}
    >
      <div className="flex flex-col justify-center items-center">
        <Text
          as="h1"
          className="h-fit text-green-200 font-rancho text-7xl sm:text-8xl lg:text-[140px] xl:!text-[170px] tracking-wider text-center"
        >
          Viva Leve
        </Text>

        <div className="w-full flex justify-between items-center gap-2.5 max-w-full lg:max-w-[50%]">
          <Text
            as="p"
            className="w-fit h-fit text-green-200 font-lora font-bold italic text-xs uppercase text-center"
          >
            Objetivo.
          </Text>

          <div className="h-px w-full bg-green-200" />

          <Text
            as="p"
            className="w-fit h-fit text-green-200 font-lora font-bold italic text-xs uppercase text-center"
          >
            Saúde.
          </Text>
        </div>
      </div>

      <div className="flex justify-center items-center my-12 w-full lg:absolute lg:top-[34%] lg:right-[0%] lg:my-0">
        <div className="w-[85%] h-fit lg:w-[60%] lg:h-[60%] xl:w-[70%] xl:h-[70%]">
          <Image
            src={intersect}
            alt="image of a woman smiling with the sunset in her face"
            title="woman smiling"
            loading="eager"
            unoptimized
            width={500}
            height={500}
            className="object-cover w-fit h-fit lg:size-full"
          />
        </div>
      </div>

      <div className="flex-col items-center flex text-center gap-10 lg:mt-auto lg:flex-row lg:justify-between lg:items-end lg:text-left lg:gap-4">
        <div className="lg:max-w-[306px]">
          <Text
            as="p"
            className="text-green-500 font-lora font-normal italic text-xl lg:!text-[24px] text-center lg:text-left"
          >
            Alimente seu corpo e sua alma
          </Text>
          <Text
            as="p"
            className="text-green-200 font-lora font-normal italic !text-xs mt-1"
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
