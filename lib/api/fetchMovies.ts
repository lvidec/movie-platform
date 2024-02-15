import { Movies, MovieResult, MovieDetails, Genres } from "@/lib/types";

export const IMG_ENDPOINT_W200 = "https://image.tmdb.org/t/p/w200";
export const IMG_ENDPOINT_W500 = "https://image.tmdb.org/t/p/w500";
export const API_ENDPOINT = "https://api.themoviedb.org/3";

type TimeWindowType = "day" | "week";

const external_options = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_BEARER}`,
  },
};

const fetchApi = async <T>(url: string, newOptions?: {}): Promise<T> => {
  try {
    const options = newOptions ? newOptions : external_options;
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

export const fetchDiscoverMoviesPerPage = async (pageNumber: number) => {
  const url = `${API_ENDPOINT}/discover/movie?page=${pageNumber}`;

  return fetchApi<Movies>(url);
};

export const fetchPopularMoviesPerPage = async (pageNumber: number) => {
  const url = `${API_ENDPOINT}/movie/popular?page=${pageNumber}`;

  return fetchApi<Movies>(url, optionsWithBearer);
};

export const fetchDiscoverMovies = async (): Promise<MovieResult[]> => {
  const pagesToFetch = [1];

  try {
    const movies = await Promise.all(pagesToFetch.map((pageNum) => fetchDiscoverMoviesPerPage(pageNum)));

    return movies.flatMap((movie) => movie.results);
  } catch (error) {
    console.error("Error fetching all discover movies:", error);
    return [];
  }
};

export const fetchPopularMovies = async (): Promise<MovieResult[]> => {
  const pagesToFetch = [1, 5, 10];

  try {
    const movies = await Promise.all(pagesToFetch.map((pageNum) => fetchPopularMoviesPerPage(pageNum)));

    return movies.flatMap((movie) => movie.results);
  } catch (error) {
    console.error("Error fetching all popular movies:", error);
    return [];
  }
};

export const fetchMovieDetailsById = async (id: number) => {
  const url = `${API_ENDPOINT}/movie/${id}`;

  return fetchApi<MovieDetails>(url, optionsWithBearer);
};

export const fetchTrendingMoviesInTimeWindow = async (timeWindow: TimeWindowType) => {
  const url = `${API_ENDPOINT}/trending/movie/${timeWindow}?language=en-US`;

  return fetchApi<Movies>(url);
};

export const fetchMovieGenreList = async () => {
  const url = `${API_ENDPOINT}/genre/movie/list`;

  return fetchApi<Genres>(url);
};

export const fetchSearchMovieByTitle = async (title: string) => {
  const url = `${API_ENDPOINT}/search/movie?query=${title}&language=en-US`;

  return fetchApi<Movies>(url, optionsWithBearer);
};

// Investigate why react query isn't working with API_KEY from process.env
const optionsWithBearer = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTcxNmFjNWE4NmY0NDA5MDg1NThhZjc2MzllMjk3YSIsInN1YiI6IjY0MzUxODViOTJlNTViMDBkNTE4Njc4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mPMXXXqeWdkCl-NYFAyEliQrDjjquBs7i2ZAvmkv22A",
  },
};
