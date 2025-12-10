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
          className="font-lora text-black-100 !text-sm italic opacity-80"
        >
          Todos os direitos reservados a{" "}
          <Link href="https://github.com/maatheuus">Maat</Link> | {currentYear}
        </Text>
      </div>
    </div>
  );
}
