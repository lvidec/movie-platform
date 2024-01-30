import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/Carousel";
import { ResultMovie } from "@/lib/types";
import { ChartCards } from "@/components/ChartCards";

interface StreamingChartsProps {
  movies: ResultMovie[];
  title: string;
}

export async function StreamingCharts({ movies, title }: StreamingChartsProps) {
  const netflixMovies = [...movies];
  const disneyMovies = [...movies];

  return (
    <div>
      <h2 className="text-2xl font-bold pb-2">{title}</h2>
      <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4">
          <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 relative">
            <ChartCards movies={netflixMovies} title="Netflix" />
          </CarouselItem>
          <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 relative">
            <ChartCards movies={disneyMovies} title="Disney Plus" />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
