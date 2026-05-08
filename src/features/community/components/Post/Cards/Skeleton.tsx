import { Skeleton } from "@/shared/ui/skeleton";

export default function PostCardSkeleton() {
  return (
    <div className="border-b py-5 md:rounded-2xl md:px-4">
      <div className="mb-4 flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full bg-green-200" />
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-3 w-24 bg-green-200" />
          <Skeleton className="h-2.5 w-16 bg-green-100" />
        </div>
      </div>
      <div className="mb-4 flex flex-col gap-2">
        <Skeleton className="h-3 w-full bg-green-200" />
        <Skeleton className="h-3 w-5/6 bg-green-200" />
        <Skeleton className="h-3 w-4/6 bg-green-100" />
      </div>
      <div className="flex gap-4">
        <Skeleton className="h-3 w-12 bg-green-100" />
        <Skeleton className="h-3 w-12 bg-green-100" />
        <Skeleton className="h-3 w-12 bg-green-100" />
      </div>
    </div>
  );
}
