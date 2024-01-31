import { MoviesCarousel } from "@/components/MoviesCarousel";
import { fetchPopularMovies } from "@/lib/api/fetchMovies";
import { GenreMovies } from "@/components/GenreMovies";

export default async function Page() {
  const popularMovies = await fetchPopularMovies();
  return (
    <main className="min-h-screen flex flex-col gap-10">
      <MoviesCarousel movies={popularMovies} title="Popular movies" />
      <GenreMovies popularMovies={popularMovies} />
    </main>
  );
}
