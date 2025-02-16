import Logo from "@/components//ui/Logo";

interface Props extends React.ComponentProps<"div"> {
  size?: React.SVGAttributes<SVGSVGElement>;
}

export default function AuthHeader({ className, ...props }: Props) {
  return (
    <div role="banner" className={className} {...props}>
      <Logo />
    </div>
  );
}
