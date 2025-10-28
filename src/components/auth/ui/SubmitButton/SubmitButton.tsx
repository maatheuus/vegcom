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
      className="group font-maitree relative h-10 w-full cursor-pointer overflow-hidden bg-green-500"
      disabled={disabled}
      {...props}
    >
      {!isLoading ? (
        <span className="relative flex items-center justify-center gap-2 font-semibold">
          {text}
        </span>
      ) : (
        children
      )}
    </Button>
  );
}
