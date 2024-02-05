import { fetchMovieDetailsById, fetchPopularMovies } from "@/lib/api/fetchMovies";
import { transformTitleIntoUrl } from "@/lib/utils";
import { MovieDetails } from "@/components/details/MovieDetails";

export const dynamicParams = false;

export const generateStaticParams = async (): Promise<{ movieTitle: string }[]> => {
  const allMovies = await fetchPopularMovies();

  return allMovies.map((resultMovie) => ({ movieTitle: transformTitleIntoUrl(resultMovie.title) }));
};

export default async function Page({ params }: { params: { movieTitle: string } }) {
  const allMovies = await fetchPopularMovies();

  const id = allMovies.find((movie) => transformTitleIntoUrl(movie.title) === params.movieTitle)?.id;
  if (!id) return;

  const movieDetails = await fetchMovieDetailsById(id);

  return (
    <>
      <MovieDetails movieDetails={movieDetails} />
    </>
  );
}
