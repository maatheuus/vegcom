import {
  defaultInfoItems
} from "@/components/account/utils";
import Col from "@/components/ui/Layout/Helpers/Col";
import Text from "@/components/ui/Text";
import Link from "next/link";
import HeaderInformation from "./HeaderInformation";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isEditing?: boolean;
  isPremium?: boolean;
  title?: string;
}

export default function LayoutAccount({
  isEditing,
  isPremium = false,
  title,
}: Props) {

  return (
    <>
    <HeaderInformation isEditing={isEditing} isPremium={isPremium} />

      <Col className="gap-y-6">
        <Text
          as="h2"
          type={Text.Type.HeadingThree}
          weight={Text.Weight.Bold}
          className="text-green-500"
        >
          {title}
        </Text>

        <Col className="gap-y-4">
          {defaultInfoItems.map((item) => (
            <Link
              href={item.link}
              key={item.title}
              className="flex items-center w-full justify-between group gap-x-12"
            >
              <div className="flex items-center flex-1">
                <item.icon className="text-green-500" />

                <div className="w-full pl-4 py-2 ml-2">
                  <Text
                    type={Text.Type.BodyTwo}
                    weight={Text.Weight.Medium}
                    className="text-green-500"
                  >
                    {item.title}
                  </Text>
                  <Text type={Text.Type.BodyThree} className="text-green-200">
                    {item.desc}
                  </Text>
                </div>
              </div>
              <div className="text-green-500 h-fit font-medium relative bg-green-100 rounded-full px-2 py-1 group-hover:bg-green-500 group-hover:text-green-100 transition-colors duration-300">
                Gerenciar
              </div>
            </Link>
          ))}
        </Col>
      </Col>
    </>
  );
}
