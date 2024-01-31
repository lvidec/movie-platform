import { Movies, MovieResult, MovieDetails, Genres } from "@/lib/types";

export const IMG_ENDPOINT = "https://image.tmdb.org/t/p/w500/";
export const API_ENDPOINT = "https://api.themoviedb.org/3";

type TimeWindowType = "day" | "week";

const options = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_BEARER}`,
  },
};

const fetchApi = async <T>(url: string): Promise<T> => {
  try {
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

  return fetchApi<Movies>(url);
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
  const pagesToFetch = [1, 2, 3];

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

  return fetchApi<MovieDetails>(url);
};

export const fetchTrendingMoviesInTimeWindow = async (timeWindow: TimeWindowType) => {
  const url = `${API_ENDPOINT}/trending/movie/${timeWindow}?language=en-US`;

  return fetchApi<Movies>(url);
};

export const fetchMovieGenreList = async () => {
  const url = `${API_ENDPOINT}/genre/movie/list`;

  return fetchApi<Genres>(url);
};
