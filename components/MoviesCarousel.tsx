"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/Carousel";
import { IMG_ENDPOINT_W200 } from "@/lib/api/fetchMovies";
import Image from "next/image";
import { MovieResult } from "@/lib/types";
import Link from "next/link";
import { transformTitleIntoUrl } from "@/lib/utils";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import ToggleFavoredMovie from "@/components/ToggleFavoredMovie";

interface MoviesCarouselProps {
  movies: MovieResult[];
  title: string;
}

export function MoviesCarousel({ movies, title }: MoviesCarouselProps) {
  return (
    <div>
      <h2 className="text-3xl text-amber-300 font-bold mb-4">{title}</h2>
      <Carousel plugins={[WheelGesturesPlugin()]}>
        <CarouselContent className="-ml-2 md:-ml-4">
          {movies.map((movie, idx) => (
            <CarouselItem key={movie.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-[12.5%] relative">
              <Link href={transformTitleIntoUrl(movie.title)}>
                <div className="w-full h-[250px] p-0 justify-start">
                  <Image
                    src={`${IMG_ENDPOINT_W200}${movie.poster_path}`}
                    alt={movie.title}
                    width={200}
                    height={250}
                    loading={idx < 9 ? "eager" : "lazy"}
                    className="w-full h-full border-2 border-transparent rounded-2xl"
                  />
                </div>
              </Link>
              <div>
                <ToggleFavoredMovie movieId={movie.id.toString()} className="w-full relative h-[50px]">
                  <ToggleFavoredMovie.FavoriteIcons
                    iconSize={30}
                    className="m-auto absolute top-[10px] right-1/2 translate-x-1/2"
                  />
                </ToggleFavoredMovie>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
