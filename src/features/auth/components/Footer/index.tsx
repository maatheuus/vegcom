import Text from "@/shared/ui/Text";
import Link from "next/link";

export default function AuthFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <div
      role="footer"
      className="absolute bottom-4 left-1/2 flex w-fit -translate-x-1/2 items-center justify-center gap-2"
    >
      <Text as="span" className="font-lora !text-xs text-gray-500 italic">
        <Link
          href="https://maatmbx.dev"
          className="mr-1 text-xs text-gray-500 underline decoration-green-500/50 underline-offset-2 transition-colors hover:text-gray-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cultivado com algum propósito ·
        </Link>
        {currentYear}
      </Text>
    </div>
  );
}
