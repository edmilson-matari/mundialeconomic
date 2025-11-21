import StoreCardSkeleton from "./StoreCardSkeleton";

export default function PageFallback() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 animate-pulse">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Fake Header Skeleton */}
        <div className="h-12 bg-gray-200 rounded-xl mb-10 w-96 mx-auto" />

        {/* Fake Search + Sort */}
        <div className="flex flex-col lg:flex-row gap-4 mb-10 justify-between">
          <div className="h-12 bg-gray-200 rounded-xl flex-1 max-w-2xl" />
          <div className="h-12 bg-gray-200 rounded-xl w-64" />
        </div>

        {/* 3x3 Skeleton Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[...Array(9)].map((_, i) => (
            <StoreCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}