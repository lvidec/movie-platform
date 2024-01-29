import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/Carousel";
import { IMG_ENDPOINT } from "@/lib/api/fetchMovies";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ResultMovie } from "@/lib/types";

interface MoviesCarouselProps {
  movies: ResultMovie[];
  title: string;
}

export async function MoviesCarousel({ movies, title }: MoviesCarouselProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold pb-2">{title}</h2>
      <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4">
          {movies.map((movie) => (
            <CarouselItem key={movie.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-[12.5%] relative">
              <Button variant={"ghost"} className="w-full h-[250px] p-0 justify-start">
                <Image
                  src={`${IMG_ENDPOINT}${movie.poster_path}`}
                  alt={movie.title}
                  width={200}
                  height={500}
                  className="w-full h-full border-2 border-transparent rounded-2xl"
                />
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
