import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const transformTitleIntoUrl = (title: string) => {
  return title.toLowerCase().replaceAll(" ", "-");
};

export const isMovieWithIdFavored = (movieId: string) => {
  let favoriteMoviesIds = checkAndSplitMovies();
  if (!favoriteMoviesIds) return false;

  return favoriteMoviesIds.includes(movieId);
};

export const toggleFavoriteMovie = (movieId: string) => {
  let favoriteMoviesIds = checkAndSplitMovies();
  if (!favoriteMoviesIds) return;

  if (favoriteMoviesIds?.includes(movieId)) {
    favoriteMoviesIds = favoriteMoviesIds?.filter((id) => id !== movieId);
  } else favoriteMoviesIds?.push(movieId);

  localStorage.setItem("favorite-movies", favoriteMoviesIds.toString());
};

export const getYearFromDate = (date: string) => {
  return format(new Date(date), "yyyy");
};

const checkAndSplitMovies = () => {
  if (typeof localStorage === "undefined") return;

  const favoriteMovies = localStorage.getItem("favorite-movies");

  let favoriteMoviesIds: string[] = [];
  if (favoriteMovies) {
    favoriteMoviesIds = favoriteMovies.trim().split(",");
  }

  return favoriteMoviesIds;
};
