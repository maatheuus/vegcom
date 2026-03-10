import Text from "@/shared/ui/Text";
import Link from "next/link";

export default function AuthFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <div
      role="footer"
      className="absolute bottom-4 left-1/2 flex w-fit -translate-x-1/2 items-center justify-center"
    >
      <div className="w-fit">
        <Text
          as="span"
          className="font-lora !text-sm text-green-500 italic opacity-80"
        >
          Feito com carinho por{" "}
          <Link
            href="https://github.com/maatheuus"
            className="font-maitree underline opacity-100"
            target="_blank"
            rel="noopener noreferrer"
          >
            Maat
          </Link>{" "}
          | {currentYear}
        </Text>
      </div>
    </div>
  );
}
