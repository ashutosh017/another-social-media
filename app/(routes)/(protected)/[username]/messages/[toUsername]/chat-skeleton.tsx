export default function ChatSkeleton() {
  return (
    <div className="flex flex-col px-4 py-2 space-y-4 animate-pulse h-full overflow-y-auto">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
        >
          <div
            className={`h-12 rounded-xl ${
              i % 2 === 0
                ? "bg-muted rounded-tl-none"
                : "bg-muted-foreground rounded-tr-none"
            } w-[60%]`}
          />
        </div>
      ))}
    </div>
  );
}
