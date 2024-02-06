export function TrendingMoviesSkeleton() {
  return (
    <div className="animate-pulse my-8">
      <div className="flex gap-4">
        <div className="h-[200px] bg-slate-700 rounded-xl basis-[49%] lg:basis-[32%]"></div>
        <div className="h-[200px] bg-slate-700 rounded-xl basis-[49%] lg:basis-[32%]"></div>
        <div className="h-[200px] bg-slate-700 rounded-xl basis-[49%] hidden lg:basis-[32%] lg:block"></div>
        <div className="h-[200px] bg-slate-700 rounded-xl basis-[49%] hidden lg:basis-[3%] lg:block"></div>
      </div>
    </div>
  );
}
