import { Genre, MovieResult } from "@/lib/types";
import { MoviesCarousel } from "@/components/MoviesCarousel";

interface GenreMoviesProps {
  popularMovies: MovieResult[];
  allGenres: Genre[];
}

export function GenreMovies({ popularMovies, allGenres }: GenreMoviesProps) {
  return (
    <>
      {allGenres.map((genre) => {
        const genreMovies = popularMovies.filter((movie) => movie.genre_ids.includes(genre.id));
        if (!genreMovies.length) return;

        return <MoviesCarousel key={genre.id} movies={genreMovies} title={`${genre.name} movies`} />;
      })}
    </>
  );
}
