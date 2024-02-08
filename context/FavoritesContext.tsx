"use client";

import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { getmovieIdsFromLocalStorage, toggleFavoriteMovie } from "@/lib/utils";

interface FavoritesContextProps {
  favorites: number[];
  addFavorite: (movieId: number) => void;
  removeFavorite: (movieId: number) => void;
  isFavored: (movieId: number) => boolean;
}

const favoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(favoritesContext);

  if (!context) {
    throw new Error("UseFavorites hook must be rendered within the FavoritesContext.Provider");
  }
  return context;
};

interface FavoritesContextProviderProps {
  children: ReactNode;
}

export function FavoritesContextProvider({ children }: FavoritesContextProviderProps) {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFavorites(getmovieIdsFromLocalStorage().map((id) => Number(id)));
    }
  }, []);

  const memoizedContextValue = useMemo(() => {
    const isFavored = (movieId: number) => {
      return favorites.includes(movieId);
    };

    const addFavorite = (movieId: number) => {
      toggleFavoriteMovie(movieId.toString());
      setFavorites((prev) => [...prev, movieId]);
    };

    const removeFavorite = (movieId: number) => {
      toggleFavoriteMovie(movieId.toString());
      setFavorites((prev) => prev.filter((id) => id !== movieId));
    };

    return { favorites, addFavorite, removeFavorite, isFavored } as const;
  }, [favorites]);

  return <favoritesContext.Provider value={memoizedContextValue}>{children}</favoritesContext.Provider>;
}
