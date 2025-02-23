import { intersect } from "@/assets";
import Col from "@/components/ui/Layout/Helpers/Col";
import Row from "@/components/ui/Layout/Helpers/Row";
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
      className={cn("px-6 pb-4 h-full justify-between", className)}
      {...props}
    >
      <div className="flex flex-col justify-center items-center">
        <Text
          as="h1"
          className="h-fit text-green-200 font-rancho !text-[170px] tracking-wider text-center"
        >
          Viva Leve
        </Text>

        <div className="w-full flex justify-between items-center gap-2.5 max-w-[50%]">
          <Text
            as="p"
            className="w-fit h-fit text-green-200 font-frank text-xs uppercase text-center"
          >
            Objetivo.
          </Text>

          <div className="h-px w-full bg-green-200" />

          <Text
            as="p"
            className="w-fit h-fit text-green-200 font-frank text-xs uppercase text-center"
          >
            Saúde.
          </Text>
        </div>
      </div>

      <div className="flex justify-center items-center w-[60%] mx-auto mt-2 absolute top-[34%] right-[20%]">
        <Image
          src={intersect}
          alt="image of a woman smiling with the sunset in her face"
          title="woman smiling"
          loading="eager"
          unoptimized
          width={500}
          height={500}
          className="size-full object-cover"
        />
      </div>

      <Row className="justify-between items-end gap-4">
        <div className="max-w-[306px]">
          <Text
            as="p"
            className="text-green-500 font-allan !text-[2rem] text-center"
          >
            Alimente seu corpo e sua alma
          </Text>
          <Text as="p" className="text-green-200 font-frank !text-xs">
            Junte-se a nós nesta jornada em direção a um estilo de vida mais
            saudável e sustentável.
          </Text>
        </div>

        <PathLinks />
      </Row>
    </Col>
  );
}
