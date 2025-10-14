import { ArrowRightOutlinedIcon } from "@/components/icons";
import Button from "@/components/ui/Button";

interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isLoading?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
}
export default function SubmitButton({
  text,
  isLoading,
  children,
  disabled,
  ...props
}: Readonly<SubmitButtonProps>) {
  return (
    <Button
      type="submit"
      className="group font-maitree relative h-10 w-full cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-r from-green-500 to-green-600 shadow-lg shadow-green-500/30 transition-all duration-300 hover:from-green-200 hover:to-green-500 hover:shadow-xl hover:shadow-green-500/40 sm:max-w-3xs"
      disabled={disabled}
      {...props}
    >
      {!isLoading ? (
        <>
          <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
          <span className="relative flex items-center justify-center gap-2 font-semibold">
            {text}
            <ArrowRightOutlinedIcon
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </>
      ) : (
        children
      )}
    </Button>
  );
}
