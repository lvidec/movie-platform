import { MoviesCarousel } from "@/components/MoviesCarousel";
import { fetchPopularMovies } from "@/lib/api/fetchMovies";
import { GenreMovies } from "@/components/GenreMovies";
import { Suspense } from "react";
import { MoviesCarouselSkeleton } from "@/components/skeletons/MoviesCarouselSkeleton";

export default async function Page() {
  const popularMovies = await fetchPopularMovies();
  return (
    <main className="min-h-screen flex flex-col gap-10">
      <Suspense
        fallback={
          <>
            <MoviesCarouselSkeleton />
            <MoviesCarouselSkeleton />
            <MoviesCarouselSkeleton />
          </>
        }
      >
        <MoviesCarousel movies={popularMovies} title="Popular movies" />
        <GenreMovies popularMovies={popularMovies} />
      </Suspense>
    </main>
  );
}
