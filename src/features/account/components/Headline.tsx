import Text from "@/shared/ui/Text";

interface Props {
  /** The text to display as the headline. */
  title: string;
}

/**
 * A decorative headline component used to separate sections.
 * Displays a title with a top border.
 *
 * @param {Props} props - The component props.
 * @returns {JSX.Element} The rendered headline.
 */
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
