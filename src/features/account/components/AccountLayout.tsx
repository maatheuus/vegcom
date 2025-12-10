interface Props {
  /** The content to be rendered inside the layout. */
  children: React.ReactNode;
  /** Optional additional class names for styling. */
  className?: string;
}

/**
 * A wrapper component for account-related pages or sections.
 * Provides a consistent container with specific styling (green border/background).
 *
 * @param {Props} props - The component props.
 * @returns {JSX.Element} The rendered layout component.
 */
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
