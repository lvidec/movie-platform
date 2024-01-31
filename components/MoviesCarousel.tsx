"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/Carousel";
import { IMG_ENDPOINT } from "@/lib/api/fetchMovies";
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
      <h2 className="text-3xl font-bold mb-2">{title}</h2>
      <Carousel plugins={[WheelGesturesPlugin()]}>
        <CarouselContent className="-ml-2 md:-ml-4">
          {movies.map((movie) => (
            <CarouselItem key={movie.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-[12.5%] relative">
              <Link href={transformTitleIntoUrl(movie.title)}>
                <div className="w-full h-[250px] p-0 justify-start">
                  <Image
                    src={`${IMG_ENDPOINT}${movie.poster_path}`}
                    alt={movie.title}
                    width={200}
                    height={500}
                    className="w-full h-full border-2 border-transparent rounded-2xl"
                  />
                </div>
              </Link>
              <div>
                <p>Favor the movie</p>
                <ToggleFavoredMovie movieId={movie.id.toString()} className="m-auto" >
                  <ToggleFavoredMovie.FavoriteIcons iconSize={30} />
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
