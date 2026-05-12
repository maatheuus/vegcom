export default function PostComposerSkeleton() {
  return (
    <div className="z-40 hidden shrink-0 animate-pulse rounded-[20px] border border-green-500 bg-green-50 md:block">
      <div className="px-4 pt-4 pb-2">
        <div className="mb-3 h-6 w-2/5 rounded-md bg-green-200/60" />

        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-green-100" />
          <div className="h-4 w-4/5 rounded bg-green-100" />
          <div className="h-4 w-3/5 rounded bg-green-100" />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-green-100 px-4 py-3">
        <div className="flex gap-3">
          <div className="h-6 w-6 rounded-full bg-green-200/60" />
          <div className="h-6 w-6 rounded-full bg-green-200/60" />
          <div className="h-6 w-6 rounded-full bg-green-200/60" />
        </div>
        <div className="h-9 w-9 rounded-full bg-green-500/60" />
      </div>
    </div>
  );
}
