import { buttonVariants } from "@/components/ui/Button";
import Link from "next/link";
import { ScreenContainer } from "@/components/ScreenContainer";

export function Footer() {
  return (
    <div className="bg-[url('https://www.justwatch.com/appassets/img/home/bg-tiles/bg-tiles.png')] bg-no-repeat mix-blend-screen h-96 bg-center mt-24">
      <ScreenContainer className="pt-24 flex flex-col items-center text-center gap-8">
        <h2 className="text-4xl font-bold">See you, baby!</h2>
        <p className="text-2xl">Havent found something to watch yet? Try one of these options:</p>
        <div className="flex flex-col xs:flex-row gap-8 text-2xl">
          <Link href={"/discover"} className={buttonVariants({ variant: "default" })}>
            See whats new
          </Link>
          <Link href={"/discover"} className={buttonVariants({ variant: "default" })}>
            Browse and filter
          </Link>
        </div>
      </ScreenContainer>
    </div>
  );
}
