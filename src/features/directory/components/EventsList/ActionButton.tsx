import clsx from "clsx";

export const actionButtonClassName =
  "inline-flex items-center justify-center gap-1.5 rounded-full border border-green-200 bg-green-100 px-3 py-1.5 text-xs font-bold text-green-500 transition hover:border-green-500 hover:bg-green-200 hover:text-green-50 focus-visible:ring-2 focus-visible:ring-green-200 focus-visible:ring-offset-2 focus-visible:outline-none";

interface ActionButtonProps {
  children: React.ReactNode;
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export function ActionButton({
  children,
  icon,
  className,
  onClick,
}: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(actionButtonClassName, className)}
    >
      {icon}
      {children}
    </button>
  );
}
