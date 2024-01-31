import { fetchMovieGenreList } from "@/lib/api/fetchMovies";
import { MovieResult } from "@/lib/types";
import { MoviesCarousel } from "@/components/MoviesCarousel";

interface GenreMoviesProps {
  popularMovies: MovieResult[];
}

export async function GenreMovies({ popularMovies }: GenreMoviesProps) {
  const genres = await fetchMovieGenreList();

  const comedyId = genres.genres.find((genre) => genre.name === "Comedy")?.id;
  const horrorId = genres.genres.find((genre) => genre.name === "Horror")?.id;
  const actionId = genres.genres.find((genre) => genre.name === "Action")?.id;
  const dramaId = genres.genres.find((genre) => genre.name === "Drama")?.id;
  const familyId = genres.genres.find((genre) => genre.name === "Family")?.id;

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
