import { fetchMovieGenreList, fetchPopularMovies } from "@/lib/api/fetchMovies";
import { ShowMoviesByFilter } from "@/components/discover/ShowMoviesByFilter";
import { ScreenContainer } from "@/components/layout/ScreenContainer";
import { Suspense } from "react";
import { MoviesCarouselSkeleton } from "@/components/skeletons/MoviesCarouselSkeleton";

export default async function Page() {
  const popularMovies = await fetchPopularMovies();
  const genres = await fetchMovieGenreList();

  return (
    <ScreenContainer>
      <main className="min-h-screen flex flex-col gap-10">
        <Suspense
          fallback={
            <>
              <p className="text-md sm:text-xl mb-10">Filters:</p>
              <MoviesCarouselSkeleton />
              <MoviesCarouselSkeleton />
              <MoviesCarouselSkeleton />
            </>
          }
        >
          <ShowMoviesByFilter popularMovies={popularMovies} allGenres={genres.genres} />
        </Suspense>
      </main>
    </ScreenContainer>
  );
}
