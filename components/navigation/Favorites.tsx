"use client";

import { getmovieIdsFromLocalStorage } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { IMG_ENDPOINT_W200, fetchMovieDetailsById } from "@/lib/api/fetchMovies";
import { ErrorUI } from "@/components/states/ErrorUI";
import Image from "next/image";
import { LoadingUI } from "@/components/states/LoadingUI";
import ToggleFavoredMovie from "@/components/ToggleFavoredMovie";
import { useState } from "react";

export function Favorites() {
  const [favoriteMovieIds, setFavoriteMovieIds] = useState<string[]>(getmovieIdsFromLocalStorage());

  if (!favoriteMovieIds.length) return <p>No Favorites Selected</p>;

  return (
    <div className="flex flex-col gap-4 min-w-[300px] max-h-[400px] overflow-y-scroll">
      {favoriteMovieIds.map((favoriteMovieId) => (
        <FavoriteMovieDetails
          key={favoriteMovieId}
          movieId={Number(favoriteMovieId)}
          setFavoriteMovieIds={setFavoriteMovieIds}
        />
      ))}
    </div>
  );
}

interface FavoriteMovieDetailsProps {
  movieId: number;
  setFavoriteMovieIds: React.Dispatch<React.SetStateAction<string[]>>;
}

export function FavoriteMovieDetails({ movieId, setFavoriteMovieIds }: FavoriteMovieDetailsProps) {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["movies", { movieId }],
    queryFn: () => fetchMovieDetailsById(movieId),
  });

  if (isError) return <ErrorUI />;

  if (isLoading) return <LoadingUI className="w-16 h-16 m-auto mb-4" />;

  return (
    <div className="border-b-2 pb-4 flex">
      {data && (
        <>
          <Image
            src={IMG_ENDPOINT_W200 + data.poster_path}
            alt={data.title + "logo"}
            width={50}
            height={100}
            className="rounded-md w-[100px] mr-4 h-[150px]"
          />
          <div className="flex mt-4 w-full items-end justify-center relative">
            <p className="border-[1px] p-1 border-slate-200">{data.title}</p>
            <ToggleFavoredMovie
              movieId={data.id.toString()}
              anotherFuncOnClick={() => {
                setFavoriteMovieIds((prev) => prev.filter((id) => id !== movieId.toString()));
              }}
            >
              <ToggleFavoredMovie.FavoriteIcons
                iconSize={50}
                className="absolute top-[30px] right-1/2 -translate-y-1/2 translate-x-1/2"
              />
            </ToggleFavoredMovie>
          </div>
        </>
      )}
    </div>
  );
}
