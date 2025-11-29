import { defaultInfoItems } from "@/features/account/components/utils";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Text from "@/shared/ui/Text";
import Link from "next/link";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  pathName?: string;
}

export default function LayoutAccount({ title, pathName, children }: Props) {
  return (
    <Col className="gap-y-6">
      {children ? (
        <div className="flex w-full items-center justify-between">
          <Text
            as="h2"
            type={Text.Type.HeadingThree}
            weight={Text.Weight.Bold}
            className="font-lora text-green-500"
          >
            {title}
          </Text>
          {children}
        </div>
      ) : (
        <Text
          as="h2"
          type={Text.Type.HeadingThree}
          weight={Text.Weight.Bold}
          className="font-lora text-green-500"
        >
          {title}
        </Text>
      )}

      <Col className="gap-y-4">
        {defaultInfoItems.map((item) => {
          return (
            !item.requiresPremium && (
              <Link
                key={item.title}
                href={`/account/${item.link}`}
                className="group flex w-full items-center justify-between gap-x-12"
              >
                <div className="flex flex-1 items-center">
                  <item.icon className="text-green-500" />

                  <div className="ml-2 w-full py-2 pl-4">
                    <Text
                      type={Text.Type.BodyTwo}
                      weight={Text.Weight.Medium}
                      className="font-maitree text-green-500"
                    >
                      {item.title}
                    </Text>
                    <Text
                      type={Text.Type.BodyThree}
                      className="font-lora text-green-200"
                    >
                      {item.desc}
                    </Text>
                  </div>
                </div>
                <div
                  className={`font-maitree relative h-fit rounded-full bg-green-100 px-2 py-1 font-medium text-green-500 transition-colors duration-300 group-hover:bg-green-500 group-hover:text-green-100 ${
                    pathName === item.link ? "bg-green-500 !text-green-100" : ""
                  }`}
                >
                  {pathName === item.link ? "Gerenciando" : "Gerenciar"}
                </div>
              </Link>
            )
          );
        })}
      </Col>
    </Col>
  );
}
