interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={["bg-gray-200 rounded animate-pulse", className].join(" ")}
      aria-hidden="true"
    />
  );
}

// Skeleton untuk satu ProductCard
export function ProductCardSkeleton() {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <Skeleton className="w-full h-40 mb-3" />
      <Skeleton className="w-16 h-3 mb-2" />
      <Skeleton className="w-3/4 h-4 mb-2" />
      <Skeleton className="w-1/3 h-4" />
    </div>
  );
}

// Skeleton untuk grid produk
export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
