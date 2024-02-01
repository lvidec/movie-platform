import { Genre, MovieResult } from "@/lib/types";
import { MoviesCarousel } from "@/components/MoviesCarousel";

interface GenreMoviesProps {
  popularMovies: MovieResult[];
  allGenres: Genre[];
}

export function GenreMovies({ popularMovies, allGenres }: GenreMoviesProps) {
  const comedyId = allGenres.find((genre) => genre.name === "Comedy")?.id;
  const horrorId = allGenres.find((genre) => genre.name === "Horror")?.id;
  const actionId = allGenres.find((genre) => genre.name === "Action")?.id;
  const dramaId = allGenres.find((genre) => genre.name === "Drama")?.id;
  const familyId = allGenres.find((genre) => genre.name === "Family")?.id;

  return (
    <>
      {comedyId && (
        <MoviesCarousel
          movies={popularMovies.filter((movie) => movie.genre_ids.includes(comedyId))}
          title="Comedy movies"
        />
      )}
      {horrorId && (
        <MoviesCarousel
          movies={popularMovies.filter((movie) => movie.genre_ids.includes(horrorId))}
          title="Horror movies"
        />
      )}
      {actionId && (
        <MoviesCarousel
          movies={popularMovies.filter((movie) => movie.genre_ids.includes(actionId))}
          title="Action movies"
        />
      )}
      {dramaId && (
        <MoviesCarousel
          movies={popularMovies.filter((movie) => movie.genre_ids.includes(dramaId))}
          title="Drama movies"
        />
      )}
      {familyId && (
        <MoviesCarousel
          movies={popularMovies.filter((movie) => movie.genre_ids.includes(familyId))}
          title="Family movies"
        />
      )}
    </>
  );
}
