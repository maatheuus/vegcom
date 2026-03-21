import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import { Skeleton } from "@/shared/ui/skeleton";
import clsx from "clsx";

interface CommentSkeletonProps {
  count?: number;
  className?: string;
}

export default function CommentSkeleton({
  count = 3,
  className,
}: CommentSkeletonProps) {
  return (
    <div className={clsx("w-full space-y-8", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <Col key={index} className="gap-y-2">
          <Row className="items-center justify-between">
            <Row className="items-center gap-x-2">
              <Skeleton className="size-8 rounded-full bg-green-200" />
              <Col className="gap-y-1">
                <Skeleton className="h-4 w-24 bg-green-500" />
                <Skeleton className="h-3 w-16 bg-green-200" />
              </Col>
            </Row>
            <Skeleton className="h-8 w-12 bg-green-200" />
          </Row>
          <Col className="gap-y-1">
            <Skeleton className="h-4 w-full bg-green-200" />
            <Skeleton className="h-4 w-3/4 bg-green-200" />
          </Col>
        </Col>
      ))}
    </div>
  );
}
