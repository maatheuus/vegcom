export const inputClassName =
  "w-full rounded-xl border border-green-200 bg-white px-3 py-2.5 text-sm text-green-800 placeholder:text-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none";

export const cityInputClassName =
  "rounded-xl border-green-200 px-3 py-2.5 text-sm text-green-800 focus:border-green-500 focus:ring-2 focus:ring-green-500/20";

interface FormFieldProps {
  label: string;
  /** Id do input associado; sem ele o rótulo é apenas texto. */
  htmlFor?: string;
  required?: boolean;
  hint?: React.ReactNode;
  children: React.ReactNode;
}

export function FormField({
  label,
  htmlFor,
  required,
  hint,
  children,
}: FormFieldProps) {
  const LabelTag = htmlFor ? "label" : "span";

  return (
    <div className="flex flex-col gap-1.5">
      <LabelTag htmlFor={htmlFor} className="text-xs font-medium text-green-700">
        {label}
        {required && <span className="ml-0.5 text-green-200"> *</span>}
      </LabelTag>
      {children}
      {hint && <FormHint>{hint}</FormHint>}
    </div>
  );
}

export function FormHint({ children }: { children: React.ReactNode }) {
  return <p className="text-xs leading-relaxed text-green-200">{children}</p>;
}
