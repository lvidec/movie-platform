export function MoviesCarouselSkeleton() {
  return (
    <div className="animate-pulse my-4">
      <div className="flex gap-4">
        <div className="h-[250px] bg-slate-700 rounded-xl basis-1/2 xs:basis-[35%] sm:basis-[30%] md:basis-[25%] lg:basis-[20%] xl:basis-[14.5%] 2xl:basis-[12.5%] "></div>
        <div className="h-[250px] bg-slate-700 rounded-xl basis-1/2 xs:basis-[35%] sm:basis-[30%] md:basis-[25%] lg:basis-[20%] xl:basis-[14.5%] 2xl:basis-[12.5%] "></div>
        <div className="h-[250px] bg-slate-700 rounded-xl basis-1/2 hidden xs:block xs:basis-[35%] sm:basis-[30%] md:basis-[25%] lg:basis-[20%] xl:basis-[14.5%] 2xl:basis-[12.5%] "></div>
        <div className="h-[250px] bg-slate-700 rounded-xl basis-1/2 xs:basis-[35%] hidden sm:block sm:basis-[30%] md:basis-[25%] lg:basis-[20%] xl:basis-[14.5%] 2xl:basis-[12.5%] "></div>
        <div className="h-[250px] bg-slate-700 rounded-xl basis-1/2 xs:basis-[35%] sm:basis-[30%] hidden md:block md:basis-[25%] lg:basis-[20%] xl:basis-[14.5%] 2xl:basis-[12.5%] "></div>
        <div className="h-[250px] bg-slate-700 rounded-xl basis-1/2 xs:basis-[35%] sm:basis-[30%] md:basis-[25%] hidden lg:block lg:basis-[20%] xl:basis-[14.5%] 2xl:basis-[12.5%] "></div>
        <div className="h-[250px] bg-slate-700 rounded-xl basis-1/2 xs:basis-[35%] sm:basis-[30%] md:basis-[25%] lg:basis-[20%] hidden xl:block xl:basis-[14.5%] 2xl:basis-[12.5%] "></div>
        <div className="h-[250px] bg-slate-700 rounded-xl basis-1/2 xs:basis-[35%] sm:basis-[30%] md:basis-[25%] lg:basis-[20%] xl:basis-[14.5%] hidden 2xl:block 2xl:basis-[12.5%] "></div>
      </div>
    </div>
  );
}
