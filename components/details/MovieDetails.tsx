import Image from "next/image";
import { IMG_ENDPOINT_W200, IMG_ENDPOINT_W500 } from "@/lib/api/fetchMovies";
import { MovieDetails } from "@/lib/types";
import { WatchAndFavorMovie } from "@/components/details/WatchAndFavorMovie";

interface MovieDetailsProps {
  movieDetails: MovieDetails;
}

export function MovieDetails({ movieDetails }: MovieDetailsProps) {
  return (
    <>
      <Image
        src={IMG_ENDPOINT_W500 + movieDetails.backdrop_path}
        alt={movieDetails.title + "logo"}
        width={1500}
        height={1500}
        className="w-full object-cover h-[450px]"
      />
      <div className="md:w-[75vw] lg:w-[60vw] 2xl:w-[50vw] m-auto bg-slate-900 lg:rounded-xl">
        <div className="p-4 flex gap-4">
          <Image
            src={IMG_ENDPOINT_W200 + movieDetails.poster_path}
            alt={movieDetails.title + "logo"}
            width={250}
            height={400}
            className="rounded-md basis-1/4 hidden sm:block"
          />
          <div className="w-full">
            <WatchAndFavorMovie movieDetails={movieDetails} />
          </div>
        </div>
      </div>
    </>
  );
}
