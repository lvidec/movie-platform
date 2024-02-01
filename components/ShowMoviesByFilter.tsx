"use client";

import { Suspense, useEffect, useState } from "react";
import { Filter } from "@/components/Filter";
import { MoviesCarouselSkeleton } from "@/components/skeletons/MoviesCarouselSkeleton";
import { MoviesCarousel } from "@/components/MoviesCarousel";
import { GenreMovies } from "@/components/GenreMovies";
import { Genre, MovieResult } from "@/lib/types";

interface ShowMoviesByFilterProps {
  popularMovies: MovieResult[];
  allGenres: Genre[];
}

export function ShowMoviesByFilter({ popularMovies, allGenres }: ShowMoviesByFilterProps) {
  const [genreStates, setGenreStates] = useState<Record<string, boolean>>({
    Comedy: false,
    Horror: false,
    Action: false,
    Drama: false,
    Family: false,
  });
  const [moviesToShow, setMoviesToShow] = useState<MovieResult[]>(popularMovies);
  const isFilterApplied = !!Object.values(genreStates).filter((value) => value === true).length;

  useEffect(() => {
    const getIdsOfAllActiveGenres = (): number[] => {
      const activeGenres = Object.entries(genreStates)
        .filter(([genre, checked]) => checked === true)
        .map(([genre, checked]) => genre);

      return allGenres.filter((genre) => activeGenres.includes(genre.name)).map((genre) => genre.id);
    };

    const activeGenresIds = getIdsOfAllActiveGenres();

    if (activeGenresIds.length) {
      const filteredMovies = popularMovies.filter((movie) =>
        activeGenresIds.some((id) => movie.genre_ids.includes(id))
      );

      setMoviesToShow(filteredMovies);
    }
  }, [genreStates, popularMovies, allGenres]);

  const updateGenreState = (genre: string, checked: boolean) => {
    setGenreStates((prev) => ({ ...prev, [genre]: checked }));
  };

  return (
    <>
      <div className="flex gap-8 text-2xl items-center">
        <p>Filters:</p>
        <Filter title="Genre" filterStates={genreStates} handleUpdateFilterState={updateGenreState} />
      </div>
      <Suspense
        fallback={
          <>
            <MoviesCarouselSkeleton />
            <MoviesCarouselSkeleton />
            <MoviesCarouselSkeleton />
          </>
        }
      >
        <MoviesCarousel movies={moviesToShow} title="Popular movies" />
        {!isFilterApplied && <GenreMovies popularMovies={popularMovies} allGenres={allGenres} />}
      </Suspense>
    </>
  );
}
