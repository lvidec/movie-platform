"use client";

import { Suspense, useEffect, useState } from "react";
import { GenreFilter } from "@/components/discover/GenreFilter";
import { MoviesCarouselSkeleton } from "@/components/skeletons/MoviesCarouselSkeleton";
import { MoviesCarousel } from "@/components/MoviesCarousel";
import { GenreMovies } from "@/components/discover/GenreMovies";
import { Genre, MovieResult } from "@/lib/types";
import { OtherFilters } from "@/components/discover/OtherFilters";
import { getYearFromDate } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { CiCircleRemove } from "react-icons/ci";

interface ShowMoviesByFilterProps {
  popularMovies: MovieResult[];
  allGenres: Genre[];
}

export type YearDistance = {
  from: number;
  until: number;
};

export const default_year_distance: YearDistance = { from: 1920, until: 2024 };
export const default_genre_states: Record<string, boolean> = {
  Comedy: false,
  Horror: false,
  Action: false,
  Drama: false,
  Family: false,
};

export function ShowMoviesByFilter({ popularMovies, allGenres }: ShowMoviesByFilterProps) {
  const [genreStates, setGenreStates] = useState<Record<string, boolean>>(default_genre_states);
  const [yearDistance, setYearDistance] = useState<YearDistance>(default_year_distance);
  const [moviesToShow, setMoviesToShow] = useState<MovieResult[]>(popularMovies);
  const isFilterApplied =
    !!Object.values(genreStates).filter((value) => value === true).length ||
    yearDistance.from !== default_year_distance.from ||
    yearDistance.until !== default_year_distance.until;

  useEffect(() => {
    const getIdsOfAllActiveGenres = (): number[] => {
      const activeGenres = Object.entries(genreStates)
        .filter(([genre, checked]) => checked === true)
        .map(([genre, checked]) => genre);

      return allGenres.filter((genre) => activeGenres.includes(genre.name)).map((genre) => genre.id);
    };

    const activeGenresIds = getIdsOfAllActiveGenres();

    if (activeGenresIds.length || yearDistance !== default_year_distance) {
      const filteredMovies = popularMovies.filter((movie) => {
        const releaseYearOfMovie = Number(getYearFromDate(movie.release_date));

        const genresCondition =
          activeGenresIds.length === 0 || activeGenresIds.some((id) => movie.genre_ids.includes(id));

        const yearsCondition = yearDistance.from <= releaseYearOfMovie && releaseYearOfMovie <= yearDistance.until;

        return genresCondition && yearsCondition;
      });

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
      <div className="flex gap-4 text-xl items-center">
        <p className="mr-8">Filters:</p>
        <GenreFilter filterStates={genreStates} handleUpdateFilterState={updateGenreState} />
        <OtherFilters yearDistance={yearDistance} handleUpdateYearDistance={updateYearDistance} />
        {isFilterApplied && (
          <Button
            variant={"outline"}
            className="text-xl"
            onClick={() => {
              setGenreStates(default_genre_states);
              setYearDistance(default_year_distance);
              setMoviesToShow(popularMovies);
            }}
          >
            Reset
            <CiCircleRemove className="ml-2" size={20} />
          </Button>
        )}
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
