interface StepSharedProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function StepShared({
  title,
  description,
  children,
}: StepSharedProps) {
  return (
    <div className="rounded-2xl border border-green-200/20 p-6">
      <h2 className="font-lora mb-1 text-2xl font-bold text-green-500">
        {title}
      </h2>
      <p className="mb-8 text-sm text-green-600/70">{description}</p>
      {children}
    </div>
  );
}
