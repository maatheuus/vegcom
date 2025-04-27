import { bgCommunity } from "@/assets";
import Image from "next/image";

export default function Background() {
  return (
    <div className="absolute inset-0 w-full h-[318px] ">
      <Image
        src={bgCommunity}
        alt="bg"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
