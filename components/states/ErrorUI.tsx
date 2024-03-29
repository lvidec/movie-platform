import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ScreenContainer } from "@/components/layout/ScreenContainer";

interface ErrorProps {
  reset?: () => void;
}

export function ErrorUI({ reset }: ErrorProps) {
  return (
    <ScreenContainer>
      <div className="mt-24 w-1/2 m-auto flex items-center gap-8">
        <Image
          src="https://t4.ftcdn.net/jpg/02/10/96/95/360_F_210969565_cIHkcrIzRpWNZzq8eaQnYotG4pkHh0P9.jpg"
          alt="Robot thinking"
          width={200}
          height={200}
          className="rounded-full aspect-square"
        />
        <div>
          <h2 className="text-xl sm:text-2xl">Something went wrong!</h2>
          {reset && (
            <Button variant={"default"} onClick={() => reset()}>
              Try again
            </Button>
          )}
        </div>
      </div>
    </ScreenContainer>
  );
}
