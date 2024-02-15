import { fetchPopularMovies, fetchSearchMovieByTitle } from "@/lib/api/fetchMovies";
import { transformTitleIntoUrl } from "@/lib/utils";
import { MovieDetails } from "@/components/details/MovieDetails";

export const dynamicParams = true;

export const generateStaticParams = async (): Promise<{ movieTitle: string }[]> => {
  const allMovies = await fetchPopularMovies();

  return allMovies.map((resultMovie) => ({ movieTitle: transformTitleIntoUrl(resultMovie.title) }));
};

export default async function Page({ params }: { params: { movieTitle: string } }) {
  const allMovies = await fetchPopularMovies();

  const movieResult = allMovies.find((movie) => transformTitleIntoUrl(movie.title) === params.movieTitle);
  let backupResult;
  if (!movieResult) {
    backupResult = (await fetchSearchMovieByTitle(params.movieTitle)).results[0];

    return backupResult ? <MovieDetails movieResult={backupResult} /> : null;
  }

  return (
    <>
      <MovieDetails movieResult={movieResult} />
    </>
  );
}
