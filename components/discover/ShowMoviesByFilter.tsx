"use client";

import { useState } from "react";
import { GenreFilter } from "@/components/discover/GenreFilter";
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

export function ShowMoviesByFilter({ popularMovies, allGenres }: ShowMoviesByFilterProps) {
  const defaultGenreStates: Record<string, boolean> = {};

  allGenres.forEach((genre) => {
    const genreMovies = popularMovies.filter((movie) => movie.genre_ids.includes(genre.id));
    if (!genreMovies.length) return;

    defaultGenreStates[genre.name] = false;
  });

  const [genreStates, setGenreStates] = useState<Record<string, boolean>>(defaultGenreStates);
  const [yearDistance, setYearDistance] = useState<YearDistance>(default_year_distance);
  const [moviesToShow, setMoviesToShow] = useState<MovieResult[]>(popularMovies);

  const isGenreFilterApplied = !!Object.values(genreStates).filter((value) => value === true).length;
  const isYearDistanceFilterApplied =
    yearDistance.from !== default_year_distance.from || yearDistance.until !== default_year_distance.until;

  const isFilterApplied = isGenreFilterApplied || isYearDistanceFilterApplied;

  const updateGenreState = (genre: string, checked: boolean) => {
    setGenreStates((prev) => {
      const updatedGenre = { ...prev, [genre]: checked };
      handleUpdateOfFilters(updatedGenre);
      return updatedGenre;
    });
  };

  const updateYearDistance = (yearDistance: YearDistance) => {
    setYearDistance((prev) => {
      const updatedYear = { ...prev, from: yearDistance.from, until: yearDistance.until };
      handleUpdateOfFilters(updatedYear);
      return updatedYear;
    });
  };

  const handleUpdateOfFilters = (updatedState: Record<string, boolean> | YearDistance) => {
    let updatedGenre: Record<string, boolean> = genreStates;
    let updatedYearDistance: YearDistance = yearDistance;

    if (isYearDistance(updatedState)) updatedYearDistance = updatedState;
    else updatedGenre = updatedState;

    const activeGenres = Object.entries(updatedGenre)
      .filter(([genre, checked]) => checked === true)
      .map(([genre, checked]) => genre);
    const activeGenresIds = allGenres.filter((genre) => activeGenres.includes(genre.name)).map((genre) => genre.id);

    if (activeGenresIds.length || updatedYearDistance !== default_year_distance) {
      const filteredMovies = popularMovies.filter((movie) => {
        if (!movie.release_date.length) return [];

        const releaseYearOfMovie = Number(getYearFromDate(movie.release_date));

        const genresCondition =
          activeGenresIds.length === 0 || activeGenresIds.some((id) => movie.genre_ids.includes(id));
        const yearsCondition =
          updatedYearDistance.from <= releaseYearOfMovie && releaseYearOfMovie <= updatedYearDistance.until;

        return genresCondition && yearsCondition;
      });

      setMoviesToShow(filteredMovies);
    }
  };

  const isYearDistance = (value: YearDistance | Record<string, boolean>): value is YearDistance => {
    return "from" in value && "until" in value;
  };

  const getTitlesOfAllActiveGenres = (): string => {
    const activeGenres = Object.entries(genreStates)
      .filter(([genre, checked]) => checked === true)
      .map(([genre, checked]) => genre);

    return allGenres
      .filter((genre) => activeGenres.includes(genre.name))
      .map((genre) => genre.name)
      .join(", ");
  };

  const resetFilters = () => {
    setGenreStates(defaultGenreStates);
    setYearDistance(default_year_distance);
    setMoviesToShow(popularMovies);
  };

  return (
    <>
      <div className="flex gap-4 text-md sm:text-xl items-center">
        <p className="mr-4">Filters:</p>
        <div className="flex flex-col xs:flex-row gap-3">
          <GenreFilter filterStates={genreStates} handleUpdateFilterState={updateGenreState} />
          <OtherFilters yearDistance={yearDistance} handleUpdateYearDistance={updateYearDistance} />
          {isFilterApplied && (
            <Button variant={"outline"} className="text-md sm:text-xl" onClick={resetFilters}>
              Reset
              <CiCircleRemove className="ml-2" size={20} />
            </Button>
          )}
        </div>
      </div>

      <MoviesCarousel
        movies={moviesToShow}
        title={`${isGenreFilterApplied ? getTitlesOfAllActiveGenres() : "Popular"} ${
          isYearDistanceFilterApplied ? `(${yearDistance.from} - ${yearDistance.until})` : ""
        } movies`}
      />
      {!isFilterApplied && <GenreMovies popularMovies={popularMovies} allGenres={allGenres} />}
    </>
  );
}
