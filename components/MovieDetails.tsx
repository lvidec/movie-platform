import Image from "next/image";
import { IMG_ENDPOINT } from "@/lib/api/fetchMovies";
import { MovieDetails } from "@/lib/types";
import { WatchAndFavorMovie } from "@/components/WatchAndFavorMovie";

interface MovieDetailsProps {
  movieDetails: MovieDetails;
}

export function MovieDetails({ movieDetails }: MovieDetailsProps) {
  return (
    <>
      <Image
        src={IMG_ENDPOINT + movieDetails.backdrop_path}
        alt={movieDetails.title + "logo"}
        width={1200}
        height={450}
        className="w-full object-cover h-[450px]"
      />
      <div className="md:w-[75vw] lg:w-[60vw] 2xl:w-[50vw] m-auto bg-slate-900 lg:rounded-xl">
        <div className="p-4 flex gap-4">
          <Image
            src={IMG_ENDPOINT + movieDetails.poster_path}
            alt={movieDetails.title + "logo"}
            width={300}
            height={450}
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
