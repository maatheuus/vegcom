import { CircleNotchIcon } from "@phosphor-icons/react/ssr";

export default function Loading({
  size,
  color,
}: {
  size: number;
  color?: string;
}) {
  return (
    <div className="flex items-center justify-center">
      <CircleNotchIcon size={size} color={color} className="animate-spin" />
    </div>
  );
}
