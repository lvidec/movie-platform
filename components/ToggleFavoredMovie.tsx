"use client";

import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { cn, isMovieWithIdFavored, toggleFavoriteMovie } from "@/lib/utils";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

interface ToggleFavoredContextProps {
  isFavored: boolean;
  setIsFavored: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleFavoredContext = createContext<ToggleFavoredContextProps | undefined>(undefined);

const useToggleFavored = () => {
  const context = useContext(ToggleFavoredContext);

  if (!context) {
    throw new Error("ToggleFavoredMovie compound components must be rendered within the ToggleFavoredMovie");
  }
  return context;
};

interface ToggleFavoredMovieProps extends React.HTMLAttributes<HTMLDivElement> {
  movieId: string;
  children: ReactNode;
  anotherFuncOnClick?: () => void;
}

function ToggleFavoredMovie({ movieId, children, className, anotherFuncOnClick }: ToggleFavoredMovieProps) {
  const [isFavored, setIsFavored] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsFavored(isMovieWithIdFavored(movieId));
    }
  }, [movieId]);

  const memoizedContextValue = useMemo(() => {
    return {
      isFavored,
      setIsFavored,
    };
  }, [isFavored]);

  return (
    <ToggleFavoredContext.Provider value={memoizedContextValue}>
      <button
        onClick={() => {
          setIsFavored(!isFavored);
          toggleFavoriteMovie(movieId);
          anotherFuncOnClick && anotherFuncOnClick();
        }}
        className={className}
      >
        {children}
      </button>
    </ToggleFavoredContext.Provider>
  );
}

interface FavoriteIconsProps extends React.HTMLAttributes<HTMLDivElement> {
  iconSize: number;
}

function FavoriteIcons({ iconSize, className }: FavoriteIconsProps) {
  const { isFavored } = useToggleFavored();

  return (
    <>
      <MdFavorite
        size={iconSize}
        className={cn("transition-all duration-500 text-amber-300", className, isFavored ? "opacity-100" : "opacity-0")}
      />
      <MdFavoriteBorder
        size={iconSize}
        className={cn("transition-all duration-500", className, isFavored ? "opacity-0" : "opacity-100")}
      />
    </>
  );
}

ToggleFavoredMovie.FavoriteIcons = FavoriteIcons;
export default ToggleFavoredMovie;
