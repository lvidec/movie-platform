import { TrendingMoviesInTimeWindow } from "@/components/TrendingMoviesInTimeWindow";
import { fetchDiscoverMovies } from "@/lib/api/fetchMovies";
import { FaRegCalendarCheck } from "react-icons/fa";

export default async function Home() {
  const popularMovies = await fetchDiscoverMovies();

  return (
    <main className="min-h-screen flex flex-col gap-6">
      <h1 className="text-4xl font-bold py-6">
        Discover daily <FaRegCalendarCheck className="inline" />
      </h1>
      <TrendingMoviesInTimeWindow />
    </main>
  );
}
