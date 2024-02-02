import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/Carousel";
import { IMG_ENDPOINT_W500, fetchTrendingMoviesInTimeWindow } from "@/lib/api/fetchMovies";
import Image from "next/image";
import Link from "next/link";
import { getYearFromDate, transformTitleIntoUrl } from "@/lib/utils";

export async function TrendingMoviesInTimeWindow() {
  const { results } = await fetchTrendingMoviesInTimeWindow("day");

  return (
    <Carousel>
      <CarouselContent className="-ml-2 md:-ml-4">
        {results.map((movie, idx) => (
          <CarouselItem key={movie.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-[32%] relative">
            <Link href={transformTitleIntoUrl(movie.title)}>
              <div className="w-full h-[200px] p-0 justify-start">
                <Image
                  src={`${IMG_ENDPOINT_W500}${movie.backdrop_path}`}
                  alt={movie.title}
                  width={500}
                  height={200}
                  loading={idx < 4 ? "eager" : "lazy"}
                  className="w-full h-full opacity-30 border-2 border-transparent rounded-2xl"
                />
                <div className="absolute top-2 flex flex-col w-full gap-5 pl-4 text-start">
                  <p className="text-slate-400">{getYearFromDate(movie.release_date)}</p>
                  <p className="font-bold text-xl">{movie.title}</p>
                  <p className="text-slate-400">{movie.popularity}</p>
                  <div className="w-3/4 bg-slate-500 rounded-md flex justify-center py-2 hover:bg-amber-400 transition duration-300">
                    <Image
                      src={"https://images.justwatch.com/icon/147638351/s100/disneyplus.webp"}
                      alt="disney logo"
                      height={25}
                      width={25}
                      loading={idx < 4 ? "eager" : "lazy"}
                      className="rounded-md mr-2"
                    />
                    View
                  </div>
                </div>
                <div className="absolute -top-[2px] -right-[2px] py-2 px-4 bg-neutral-200 text-neutral-800 border-2 rounded-tr-2xl rounded-bl-2xl">
                  Today in trend
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
