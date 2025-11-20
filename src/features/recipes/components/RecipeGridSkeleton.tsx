import Grid from "@/shared/ui/Layout/Helpers/Grid";
import { Skeleton } from "@/shared/ui/skeleton";
import clsx from "clsx";

interface RecipeGridSkeletonProps {
  count?: number;
  className?: string;
}

export function RecipeGridSkeleton({
  count = 8,
  className,
}: RecipeGridSkeletonProps) {
  return (
    <Grid
      className={clsx(
        "w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:gap-8 lg:grid-cols-4",
        className,
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="group relative h-full w-full overflow-hidden rounded-xl border border-green-500 bg-green-50 shadow-sm"
        >
          <Skeleton className="aspect-square max-h-[220px] w-full bg-green-200" />

          <div className="grid h-full flex-[1] space-y-2 p-4">
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4 bg-green-500" />
              <Skeleton className="h-4 w-full bg-green-200" />{" "}
              <Skeleton className="h-4 w-5/6 bg-green-200" />{" "}
            </div>

            <div className="mt-auto flex w-full items-center justify-between pt-2">
              <Skeleton className="h-4 w-20 bg-green-200" />
              <Skeleton className="h-4 w-16 bg-green-200" />{" "}
            </div>
          </div>
        </div>
      ))}
    </Grid>
  );
}
