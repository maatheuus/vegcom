interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

export function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 shrink-0 text-green-500">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium tracking-wide text-green-500 uppercase">
          {label}
        </p>
        <div className="text-sm leading-relaxed font-bold break-words text-green-800">
          {value}
        </div>
      </div>
    </div>
  );
}
