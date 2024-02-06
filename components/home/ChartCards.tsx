import Image from "next/image";
import { MovieResult } from "@/lib/types";
import Link from "next/link";
import { IMG_ENDPOINT_W200 } from "@/lib/api/fetchMovies";
import { transformTitleIntoUrl } from "@/lib/utils";

interface ChartCardsProps {
  movies: MovieResult[];
  title: string;
}

export function ChartCards({ movies, title }: ChartCardsProps) {
  return (
    <>
      <div className="flex gap-2 mb-4">
        <Image
          src={`${
            title === "Netflix"
              ? "https://images.justwatch.com/icon/207360008/s100/netflix.%7Bformat%7D/icon.webp"
              : "https://images.justwatch.com/icon/147638351/s100/disneyplus.webp"
          }`}
          alt="Netflix logo"
          width={64}
          height={64}
          className="rounded-2xl"
        />
        <span className="text-xl sm:text-2xl font-semibold self-center">{title}</span>
      </div>
      {movies.slice(0, 3).map((movie, idx) => (
        <ChartCard key={movie.id} movie={movie} idx={idx} />
      ))}
    </>
  );
}

interface ChartCardProps {
  movie: MovieResult;
  idx: number;
}

const ChartCard = ({ movie, idx }: ChartCardProps) => {
  return (
    <Link href={transformTitleIntoUrl(movie.title)}>
      <div className="w-full p-0 justify-start flex mb-4">
        <span className={`text-5xl sm:text-6xl font-bold opacity-20 -tracking-[6px] self-center ${idx === 0 && "ml-3"}`}>
          {idx + 1}
        </span>
        <Image
          src={`${IMG_ENDPOINT_W200}${movie.poster_path}`}
          alt={movie.title}
          width={64}
          height={80}
          className="h-20 w-16 border-2 border-transparent rounded-2xl"
        />
        <div className="self-center ml-4 text-sm sm:text-md">
          <p>{movie.title}</p>
          <p className="text-slate-400 mt-1">{movie.popularity}</p>
        </div>
      </div>
    </Link>
  );
};
