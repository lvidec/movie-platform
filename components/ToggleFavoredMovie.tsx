"use client";

import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useFavorites } from "@/context/FavoritesContext";

interface MovieIdContextProps {
  id: number;
}

const MovieIdContext = createContext<MovieIdContextProps | undefined>(undefined);

const useMovieId = () => {
  const context = useContext(MovieIdContext);

  if (!context) {
    throw new Error("useMovieId must be used within the ToggleFavoredMovie");
  }
  return context;
};

interface ToggleFavoredMovieProps extends React.HTMLAttributes<HTMLDivElement> {
  movieId: string;
  children: ReactNode;
  anotherFuncOnClick?: () => void;
}

function ToggleFavoredMovie({ movieId, children, className, anotherFuncOnClick }: ToggleFavoredMovieProps) {
  const movieIdNum = Number(movieId);

  const { isFavored, addFavorite, removeFavorite } = useFavorites();
  const [id] = useState(movieIdNum);

  const handleOnClick = () => {
    isFavored(movieIdNum) ? removeFavorite(movieIdNum) : addFavorite(movieIdNum);
    anotherFuncOnClick && anotherFuncOnClick();
  };

  const memoizedContextValue = useMemo(() => {
    return {
      id,
    };
  }, [id]);

  return (
    <MovieIdContext.Provider value={memoizedContextValue}>
      <button onClick={handleOnClick} className={className}>
        {children}
      </button>
    </MovieIdContext.Provider>
  );
}

interface FavoriteIconsProps extends React.HTMLAttributes<HTMLDivElement> {
  iconSize: number;
}

function FavoriteIcons({ iconSize, className }: FavoriteIconsProps) {
  const { id } = useMovieId();
  const { isFavored } = useFavorites();

  return (
    <>
      <MdFavorite
        size={iconSize}
        className={cn(
          "transition-all duration-500 text-amber-300",
          className,
          isFavored(id) ? "opacity-100" : "opacity-0"
        )}
      />
      <MdFavoriteBorder
        size={iconSize}
        className={cn("transition-all duration-500", className, isFavored(id) ? "opacity-0" : "opacity-100")}
      />
    </>
  );
}

ToggleFavoredMovie.FavoriteIcons = FavoriteIcons;
export default ToggleFavoredMovie;
