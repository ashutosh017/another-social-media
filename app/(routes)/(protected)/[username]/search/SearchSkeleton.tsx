export const SearchSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-1 p-1 animate-pulse">
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="w-full aspect-square bg-muted rounded" />
      ))}
    </div>
  );
};
