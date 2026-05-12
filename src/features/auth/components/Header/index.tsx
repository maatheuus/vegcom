import Logo from "@/shared/ui/Logo";
import { ArrowArcLeftIcon } from "@phosphor-icons/react/ssr";
import clsx from "clsx";
import Link from "next/link";

interface Props extends React.ComponentProps<"div"> {
  size?: React.SVGAttributes<SVGSVGElement>;
  shouldGoBack?: boolean;
}

export default function AuthHeader({
  className,
  shouldGoBack,
  ...props
}: Props) {
  return (
    <div
      role="banner"
      className={clsx(
        "flex items-center justify-between pt-5 md:px-6",
        className,
        !shouldGoBack && "justify-center",
      )}
      {...props}
    >
      <Link href="/" className="relative flex items-center justify-start">
        <span className="sr-only">página inicial</span>
        <Logo className="-ml-8 h-14 w-[13rem]" priority />
      </Link>

      {shouldGoBack && (
        <Link
          href="/login"
          className="relative flex items-center justify-start"
        >
          <span className="sr-only">Voltar para página anterior</span>
          <ArrowArcLeftIcon size={32} className="text-green-200" />
        </Link>
      )}
    </div>
  );
}
