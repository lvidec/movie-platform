"use client";

import { CiSearch } from "react-icons/ci";
import { Input } from "@/components/ui/Input";
import { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { IMG_ENDPOINT_W200, fetchPopularMovies } from "@/lib/api/fetchMovies";
import { ErrorUI } from "@/components/states/ErrorUI";
import { MovieResult } from "@/lib/types";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/Button";
import Link from "next/link";
import { cn, transformTitleIntoUrl } from "@/lib/utils";

export function Search() {
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["all-movies"],
    queryFn: () => fetchPopularMovies(),
  });

  const [searchValue, setSearchValue] = useState("");
  const [moviesToShow, setMoviesToShow] = useState<MovieResult[]>([]);
  const [showPopover, setShowPopover] = useState(false);

  const componentRef = useRef<HTMLLIElement>(null);
  const searchValueRef = useRef(searchValue);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
        setShowPopover(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      setMoviesToShow([]);
    };
  }, []);

  //  If we would've been using API calls for each search then debounce would become more handy
  const handleDebouncing = useDebouncedCallback((value: string) => {
    if (isSuccess && searchValue.length > 2) {
      setMoviesToShow(
        data.filter((movie) => {
          const searchWords = searchValue.toLowerCase().split(" ");

          return searchWords.every((word) => movie.title.toLowerCase().includes(word));
        })
      );
    }
  }, 500);

  const handleSearch = (value: string) => {
    handleDebouncing(value);
    setSearchValue(value);
    searchValueRef.current = searchValue;
  };

  const removeSearchValues = () => {
    setSearchValue("");
  };

  if (isError) return <ErrorUI />;

  return (
    <li className="ml-8 w-full h-[40px] relative mr-4" ref={componentRef}>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <Input
        type="search"
        id="search"
        disabled={isLoading}
        placeholder="Search your favorite movies"
        className="bg-transparent bg-amber-100 border-none bg-opacity-5 pl-8 w-full h-full"
        value={searchValue}
        onClick={() => setShowPopover(true)}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      ></Input>
      {searchValue.length > 2 && showPopover && (
        <div className="bg-slate-900 relative z-50 mt-4 max-h-[75vh] overflow-y-scroll">
          {moviesToShow.map((movie) => (
            <SearchMovie key={movie.id} movie={movie} handleLinkClick={removeSearchValues} />
          ))}
        </div>
      )}
      <CiSearch className="absolute top-[20px] -translate-y-1/2 ml-1" size={24} />
    </li>
  );
}

interface SearchMovieProps {
  movie: MovieResult;
  handleLinkClick: () => void;
}

const SearchMovie = ({ movie, handleLinkClick }: SearchMovieProps) => {
  return (
    <div key={movie.id} className="mb-2 flex">
      <Link
        href={transformTitleIntoUrl(movie.title)}
        className={cn(buttonVariants({ variant: "outline" }), "!w-full !h-full py-2")}
        onClick={handleLinkClick}
      >
        <Image
          src={IMG_ENDPOINT_W200 + movie.poster_path}
          alt={movie.title + "logo"}
          width={50}
          height={100}
          className="rounded-md w-[100px] h-[150px] hidden sm:block"
        />
        <div className="flex mt-4 w-full items-center justify-center relative">
          <p className="text-lg p-1 border-slate-200">{movie.title}</p>
        </div>
      </Link>
    </div>
  );
};
