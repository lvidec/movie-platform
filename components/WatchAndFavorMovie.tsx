"use client";

import { MovieDetails } from "@/lib/types";
import Image from "next/image";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { isMovieWithIdFavored, toggleFavoriteMovie } from "@/lib/utils";
import { useEffect, useState } from "react";

interface WatchAndFavorMovieProps {
  movieDetails: MovieDetails;
}

export function WatchAndFavorMovie({ movieDetails }: WatchAndFavorMovieProps) {
  const [isFavored, setIsFavored] = useState(false);

  useEffect(() => {
    setIsFavored(isMovieWithIdFavored(movieDetails.id.toString()));
  }, [movieDetails.id]);

  return (
    <>
      <h2 className="font-bold text-2xl">
        {movieDetails.original_title} <span className="font-normal text-slate-400">({movieDetails.release_date})</span>
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
        <button
          onClick={() => {
            setIsFavored(!isFavored);
            toggleFavoriteMovie(movieDetails.id.toString());
          }}
        >
          <MdFavorite
            size={50}
            data-favor
            className={`transition-all duration-500 absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 ${
              isFavored ? "opacity-100" : "opacity-0"
            }`}
          />
          <MdFavoriteBorder
            size={50}
            data-isus
            className={`transition-all duration-500 absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 ${
              isFavored ? "opacity-0" : "opacity-100"
            }`}
          />
        </button>
      </div>
    </>
  );
}
