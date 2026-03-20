import Text from "@/shared/ui/Text";

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text
      as="p"
      type={Text.Type.BodyFive}
      weight={Text.Weight.Bold}
      className="font-maitree px-2 tracking-widest text-green-500/40 uppercase"
    >
      {children}
    </Text>
  );
}

export function Divider() {
  return <div className="my-1 h-px bg-green-200/40" />;
}
