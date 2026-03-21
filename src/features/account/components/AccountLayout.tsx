interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function AccountLayout({
  children,
  className,
  ...props
}: Props) {
  return (
    <div
      className={`space-y-6 rounded-xl border border-green-500 bg-green-50 p-4 ${className || ""}`}
      {...props}
    >
      {children}
    </div>
  );
}
