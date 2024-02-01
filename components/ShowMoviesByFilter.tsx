"use client";

import { Suspense, useEffect, useState } from "react";
import { GenreFilter } from "@/components/GenreFilter";
import { MoviesCarouselSkeleton } from "@/components/skeletons/MoviesCarouselSkeleton";
import { MoviesCarousel } from "@/components/MoviesCarousel";
import { GenreMovies } from "@/components/GenreMovies";
import { Genre, MovieResult } from "@/lib/types";
import { OtherFilters } from "@/components/OtherFilters";
import { getYearFromDate } from "@/lib/utils";

interface ShowMoviesByFilterProps {
  popularMovies: MovieResult[];
  allGenres: Genre[];
}

export type YearDistance = {
  from: number;
  until: number;
};

export const FIRST_YEAR = 1920;
export const LAST_YEAR = 2024;
const default_year_distance: YearDistance = { from: FIRST_YEAR, until: LAST_YEAR };

export function ShowMoviesByFilter({ popularMovies, allGenres }: ShowMoviesByFilterProps) {
  const [genreStates, setGenreStates] = useState<Record<string, boolean>>({
    Comedy: false,
    Horror: false,
    Action: false,
    Drama: false,
    Family: false,
  });
  const [yearDistance, setYearDistance] = useState<YearDistance>(default_year_distance);
  const [moviesToShow, setMoviesToShow] = useState<MovieResult[]>(popularMovies);
  const isFilterApplied =
    !!Object.values(genreStates).filter((value) => value === true).length || yearDistance !== default_year_distance;

  useEffect(() => {
    const getIdsOfAllActiveGenres = (): number[] => {
      const activeGenres = Object.entries(genreStates)
        .filter(([genre, checked]) => checked === true)
        .map(([genre, checked]) => genre);

      return allGenres.filter((genre) => activeGenres.includes(genre.name)).map((genre) => genre.id);
    };

    const activeGenresIds = getIdsOfAllActiveGenres();

    if (yearDistance !== default_year_distance) {
      const filteredMovies = popularMovies.filter((movie) => {
        const releaseYearOfMovie = Number(getYearFromDate(movie.release_date));

        return yearDistance.from <= releaseYearOfMovie && releaseYearOfMovie <= yearDistance.until;
      });

      console.log(filteredMovies);

      setMoviesToShow(filteredMovies);
    }

    if (activeGenresIds.length) {
      const filteredMovies = popularMovies.filter((movie) =>
        activeGenresIds.some((id) => movie.genre_ids.includes(id))
      );

      setMoviesToShow(filteredMovies);
    }
  }, [genreStates, popularMovies, allGenres, yearDistance]);

  const updateGenreState = (genre: string, checked: boolean) => {
    setGenreStates((prev) => ({ ...prev, [genre]: checked }));
  };

  const updateYearDistance = (yearDistance: YearDistance) => {
    setYearDistance((prev) => ({ ...prev, from: yearDistance.from, until: yearDistance.until }));
  };

  return (
    <>
      <div className="flex gap-4 text-2xl items-center">
        <p className="mr-8">Filters:</p>
        <GenreFilter filterStates={genreStates} handleUpdateFilterState={updateGenreState} />
        <OtherFilters yearDistance={yearDistance} handleUpdateYearDistance={updateYearDistance} />
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
