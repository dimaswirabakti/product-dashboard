import { ProductGridSkeleton } from "@/components/ui";

export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Skeleton untuk header */}
      <div className="mb-8">
        <div className="h-8 w-56 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Skeleton untuk search + filter area */}
      <div className="flex gap-4 mb-6">
        <div className="h-10 flex-1 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse" />
      </div>
      
      <ProductGridSkeleton />
    </main>
  );
}
