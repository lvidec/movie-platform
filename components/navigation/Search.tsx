"use client";

import { CiSearch } from "react-icons/ci";
import { Input } from "@/components/ui/Input";
import { useEffect, useRef, useState } from "react";
// import { useDebouncedCallback } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { IMG_ENDPOINT_W200, fetchPopularMovies } from "@/lib/api/fetchMovies";
import { ErrorUI } from "@/components/states/ErrorUI";
import { LoadingUI } from "@/components/states/LoadingUI";
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
  // const [debouncedValue, setDebounceValue] = useState("");
  const [moviesToShow, setMoviesToShow] = useState<MovieResult[]>([]);
  const [showPopover, setShowPopover] = useState(false);

  const componentRef = useRef<HTMLLIElement>(null);
  const searchValueRef = useRef<string>(searchValue);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
        setShowPopover(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  //                     If we would've been using API calls for each search then debounce would become handy, now it's not that useful
  // const handleDebouncing = useDebouncedCallback((value: string) => {
  //   if (isSuccess && debouncedValue.length > 1) {
  //     console.log(
  //       data
  //         .filter((movie) => movie.title.toLowerCase().includes(debouncedValue.toLowerCase()))
  //         .map((movie) => movie.title)
  //     );

  //     setMoviesToShow(data.filter((movie) => movie.title.toLowerCase().startsWith(debouncedValue.toLowerCase())));
  //   }
  //   setDebounceValue(value);
  // }, 300);

  const handleSearch = (value: string) => {
    // handleDebouncing(value);
    if (isSuccess) {
      setMoviesToShow(data.filter((movie) => movie.title.toLowerCase().startsWith(searchValue.toLowerCase())));
    }
    setSearchValue(value);
    searchValueRef.current = searchValue;
  };

  if (isError) return <ErrorUI />;

  if (isLoading) return <LoadingUI className="h-10 w-10" />;

  return (
    <li className="ml-8 w-full h-[40px] relative mr-4" ref={componentRef}>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <Input
        type="search"
        id="search"
        placeholder="Search your favorite movies"
        className="bg-transparent bg-amber-100 border-none bg-opacity-5 pl-8 w-full h-full"
        value={searchValue}
        onClick={() => setShowPopover(true)}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      ></Input>
      {/* {debouncedValue.length > 1 && ( */}
      {searchValue.length > 1 && showPopover && (
        <div className="bg-slate-900 relative z-50 mt-4 max-h-[75vh] overflow-y-scroll">
          {moviesToShow.map((movie) => (
            <SearchMovie key={movie.id} movie={movie} setSearchValue={setSearchValue} />
          ))}
        </div>
      )}
      <CiSearch className="absolute top-[20px] -translate-y-1/2 ml-1" size={24} />
    </li>
  );
}

interface SearchMovieProps {
  movie: MovieResult;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchMovie = ({ movie, setSearchValue }: SearchMovieProps) => {
  return (
    <div key={movie.id} className="mb-2 flex">
      <Link
        href={transformTitleIntoUrl(movie.title)}
        className={cn(buttonVariants({ variant: "outline" }), "!w-full !h-full py-2")}
        onClick={() => {
          setSearchValue("");
        }}
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
