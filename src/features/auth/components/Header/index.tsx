import Logo from "@/shared/ui/Logo";
import { ArrowRightOutlinedIcon } from "@/shared/icons";
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
      className={clsx("flex items-center justify-between px-6 pt-5", className)}
      {...props}
    >
      <Link href="/" className="relative flex items-center justify-start">
        <span className="sr-only">página inicial</span>
        <Logo />
      </Link>

      {shouldGoBack && (
        <Link
          href="/login"
          className="relative flex items-center justify-start"
        >
          <span className="sr-only">Voltar para página anterior</span>
          <ArrowRightOutlinedIcon
            size={32}
            className="rotate-180 text-green-500"
          />
        </Link>
      )}
    </div>
  );
}
