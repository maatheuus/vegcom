import { Skeleton } from "@/shared/ui/skeleton";

export default function PreviewSkeleton() {
  return (
    <div className="flex h-20 overflow-hidden rounded-xl border border-green-100">
      <Skeleton className="h-full w-20 shrink-0 bg-green-100" />
      <div className="flex flex-1 flex-col justify-center gap-y-2 px-3">
        <Skeleton className="h-3 w-16 bg-green-100" />
        <Skeleton className="h-4 w-3/4 bg-green-200" />
        <Skeleton className="h-3 w-1/2 bg-green-100" />
      </div>
    </div>
  );
}
