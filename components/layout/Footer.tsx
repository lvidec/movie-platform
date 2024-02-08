import { buttonVariants } from "@/components/ui/Button";
import Link from "next/link";
import { ScreenContainer } from "@/components/layout/ScreenContainer";

export function Footer() {
  return (
    <ScreenContainer>
      <div className="bg-[url('https://www.justwatch.com/appassets/img/home/bg-tiles/bg-tiles.png')] bg-no-repeat mix-blend-screen h-96 bg-center mt-24">
        <div className="pt-24 flex flex-col items-center text-center gap-8">
          <h2 className="text-3xl sm:text-4xl font-bold">See you, baby!</h2>
          <p className="text-xl sm:text-2xl">Havent found something to watch yet? Try one of these options:</p>
          <div className="flex flex-col xs:flex-row gap-8 text-xl sm:text-2xl mb-12">
            <Link href={"/discover"} className={buttonVariants({ variant: "default" })}>
              See whats new
            </Link>
            <Link href={"/discover"} className={buttonVariants({ variant: "default" })}>
              Browse and filter
            </Link>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}
