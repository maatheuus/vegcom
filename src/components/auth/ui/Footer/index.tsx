import Text from "@/components/ui/Text";
import Link from "next/link";

export default function AuthFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <div
      role="footer"
      className="absolute bottom-4 left-0 flex w-full items-center justify-center"
    >
      <div className="w-fit">
        <Text as="span" className="font-lora text-base italic">
          All rights reserved to{" "}
          <Link href="https://github.com/maatheuus">@maat</Link> {currentYear}
        </Text>
      </div>
    </div>
  );
}
