import { fetchDiscoverMovies, fetchMovieDetailsById } from "@/lib/api/fetchMovies";
import { transformTitleIntoUrl } from "@/lib/utils";
import { MovieDetails } from "@/components/MovieDetails";

export const dynamicParams = false;

export const generateStaticParams = async (): Promise<{ movieTitle: string }[]> => {
  const allMovies = await fetchDiscoverMovies();

  return allMovies.map((resultMovie) => ({ movieTitle: transformTitleIntoUrl(resultMovie.title) }));
};

export default async function Page({ params }: { params: { movieTitle: string } }) {
  const allMovies = await fetchDiscoverMovies();

  const id = allMovies.find((movie) => transformTitleIntoUrl(movie.title) === params.movieTitle)?.id;
  if (!id) return;

  const movieDetails = await fetchMovieDetailsById(id);

  return (
    <>
      <MovieDetails movieDetails={movieDetails} />
    </>
  );
}
