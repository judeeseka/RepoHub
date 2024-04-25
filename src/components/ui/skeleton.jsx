import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

// export { Skeleton }

export function SkeletonDemo() {
  return (
    <div className="flex items-center space-x-4 mb-2 justify-center">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px] md:w-[250px]" />
        <Skeleton className="h-4 w-[150px] md:w-[200px]" />
      </div>
    </div>
  );
}
