import { Movies } from "@/lib/types";

export const IMG_ENDPOINT = "https://image.tmdb.org/t/p/w500/";
export const API_ENDPOINT = "https://api.themoviedb.org/3";
type TimeWindowType = "day" | "week";

export const fetchDiscoverMovies = async (): Promise<Movies> => {
  const res = await fetch(`${API_ENDPOINT}/discover/movie`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTcxNmFjNWE4NmY0NDA5MDg1NThhZjc2MzllMjk3YSIsInN1YiI6IjY0MzUxODViOTJlNTViMDBkNTE4Njc4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mPMXXXqeWdkCl-NYFAyEliQrDjjquBs7i2ZAvmkv22A`,
    },
  });

  return await res.json();
};

export const fetchTrendingMoviesInTimeWindow = async (timeWindow: TimeWindowType): Promise<Movies> => {
  const res = await fetch(`${API_ENDPOINT}/trending/movie/${timeWindow}?language=en-US`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTcxNmFjNWE4NmY0NDA5MDg1NThhZjc2MzllMjk3YSIsInN1YiI6IjY0MzUxODViOTJlNTViMDBkNTE4Njc4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mPMXXXqeWdkCl-NYFAyEliQrDjjquBs7i2ZAvmkv22A`,
    },
  });

  return await res.json();
};
