import Text from "../ui/Text";

interface Props {
  title: string;
}

export default function Headline({ title }: Props) {
  return (
    <div className="w-full border-t border-green-100">
      <Text
        as="h2"
        weight={Text.Weight.Bold}
        type={Text.Type.HeadingTwo}
        className="text-green-500 py-4"
      >
        {title}
      </Text>
    </div>
  );
}
