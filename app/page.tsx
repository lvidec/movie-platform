import { TrendingMoviesInTimeWindow } from "@/components/TrendingMoviesInTimeWindow";
import { MoviesCarousel } from "@/components/MoviesCarousel";
import { fetchDiscoverMovies } from "@/lib/api/fetchMovies";
import { FaRegCalendarCheck } from "react-icons/fa";
import { StreamingCharts } from "@/components/StreamingCharts";

export default async function Home() {
  const popularMovies = await fetchDiscoverMovies();

  return (
    <main className="min-h-screen flex flex-col gap-6">
      <h1 className="text-4xl font-bold mb-6">
        Trending daily <FaRegCalendarCheck className="inline" />
      </h1>
      <TrendingMoviesInTimeWindow />
      <StreamingCharts movies={popularMovies} title="Streming Charts Today" />
      <MoviesCarousel movies={popularMovies} title="Discover new movies" />
    </main>
  );
}
