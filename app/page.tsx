import { TrendingMoviesInTimeWindow } from "@/components/home/TrendingMoviesInTimeWindow";
import { MoviesCarousel } from "@/components/MoviesCarousel";
import { fetchDiscoverMovies, fetchTrendingMoviesInTimeWindow } from "@/lib/api/fetchMovies";
import { FaRegCalendarCheck } from "react-icons/fa";
import { StreamingCharts } from "@/components/home/StreamingCharts";
import { Suspense } from "react";
import { TrendingMoviesSkeleton } from "@/components/skeletons/TrendingMoviesSkeleton";
import { StreamingChartsSkeleton } from "@/components/skeletons/StreamingChartsSkeleton";
import { MoviesCarouselSkeleton } from "@/components/skeletons/MoviesCarouselSkeleton";
import { ScreenContainer } from "@/components/layout/ScreenContainer";

export default async function Home() {
  const popularMovies = await fetchDiscoverMovies();
  const trendingMoviesInDay = await fetchTrendingMoviesInTimeWindow("day");

  return (
    <ScreenContainer>
      <main className="min-h-screen flex flex-col gap-12">
        <h1 className="sm:text-4xl text-3xl font-bold mb-6">
          <span className=" mr-2">Trending daily</span> <FaRegCalendarCheck className="inline" />
        </h1>

        <Suspense
          fallback={
            <>
              <TrendingMoviesSkeleton />
              <StreamingChartsSkeleton />
              <MoviesCarouselSkeleton />
            </>
          }
        >
          <TrendingMoviesInTimeWindow movies={trendingMoviesInDay.results} />
          <StreamingCharts movies={popularMovies} title="Streming Charts Today" />
          <MoviesCarousel movies={popularMovies} title="Discover new movies" />
        </Suspense>
      </main>
    </ScreenContainer>
  );
}
