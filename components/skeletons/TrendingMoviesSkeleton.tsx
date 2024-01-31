export function TrendingMoviesSkeleton() {
  return (
    <div className="animate-pulse my-8">
      <div className="flex gap-4">
        <div className="h-[200px] bg-slate-700 rounded-xl basis-[32%]"></div>
        <div className="h-[200px] bg-slate-700 rounded-xl basis-[32%]"></div>
        <div className="h-[200px] bg-slate-700 rounded-xl basis-[32%]"></div>
        <div className="h-[200px] bg-slate-700 rounded-xl basis-[3%]"></div>
      </div>
    </div>
  );
}
