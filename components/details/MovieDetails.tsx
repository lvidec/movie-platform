import Image from "next/image";
import { IMG_ENDPOINT_W200, IMG_ENDPOINT_W500 } from "@/lib/api/fetchMovies";
import { MovieResult } from "@/lib/types";
import { WatchAndFavorMovie } from "@/components/details/WatchAndFavorMovie";
import { ScreenContainer } from "@/components/layout/ScreenContainer";

interface MovieDetailsProps {
  movieResult: MovieResult;
}

export function MovieDetails({ movieResult }: MovieDetailsProps) {
  return (
    <div className="min-h-screen">
      <div className="relative">
        <Image
          src={IMG_ENDPOINT_W500 + movieResult.backdrop_path}
          alt={movieResult.title + "logo"}
          width={1500}
          height={1500}
          className="w-full object-fill sm:h-[290px] md:h-[400px]"
        />
        <ScreenContainer className="md:absolute md:top-[85%] md:right-1/2 md:translate-x-1/2">
          <div className="md:w-[75vw] lg:w-[60vw] 2xl:w-[50vw] m-auto bg-slate-900 lg:rounded-xl">
            <div className="p-4 flex gap-4">
              <Image
                src={IMG_ENDPOINT_W200 + movieResult.poster_path}
                alt={movieResult.title + "logo"}
                width={250}
                height={400}
                className="rounded-md md:basis-2/5 hidden sm:block"
              />
              <div className="w-full">
                <WatchAndFavorMovie movieResult={movieResult} />
              </div>
            </div>
          </div>
        </ScreenContainer>
      </div>
    </div>
  );
}
