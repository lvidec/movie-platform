import { fetchMovieGenreList, fetchPopularMovies } from "@/lib/api/fetchMovies";
import { ShowMoviesByFilter } from "@/components/discover/ShowMoviesByFilter";

export default async function Page() {
  const popularMovies = await fetchPopularMovies();
  const genres = await fetchMovieGenreList();

  return (
    <main className="min-h-screen flex flex-col gap-10">
      <ShowMoviesByFilter popularMovies={popularMovies} allGenres={genres.genres} />
    </main>
  );
}
