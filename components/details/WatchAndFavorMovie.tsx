"use client";

import { MovieDetails } from "@/lib/types";
import Image from "next/image";
import ToggleFavoredMovie from "@/components/ToggleFavoredMovie";
import { getYearFromDate } from "@/lib/utils";

interface WatchAndFavorMovieProps {
  movieDetails: MovieDetails;
}

export function WatchAndFavorMovie({ movieDetails }: WatchAndFavorMovieProps) {
  return (
    <>
      <h2 className="font-bold text-2xl">
        {movieDetails.original_title}{" "}
        <span className="font-normal text-slate-400">({getYearFromDate(movieDetails.release_date)})</span>
      </h2>
      <div className="border-[1px] border-amber-300 rounded-xl w-full p-4 mt-4 relative">
        <h3 className="uppercase text-amber-300 font-bold">Watch it now</h3>
        <p className="uppercase">Stream it</p>
        <Image
          src="https://images.justwatch.com/icon/207360008/s100/netflix.%7Bformat%7D/icon.webp"
          alt="Netflix logo"
          width={64}
          height={64}
          className="rounded-2xl"
        />
        <p>
          Subscriptions <span className="text-amber-300">HD</span>
        </p>
        <ToggleFavoredMovie movieId={movieDetails.id.toString()}>
          <ToggleFavoredMovie.FavoriteIcons
            iconSize={50}
            className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2"
          />
        </ToggleFavoredMovie>
      </div>
    </>
  );
}
