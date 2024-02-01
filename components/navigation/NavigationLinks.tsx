"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavigationLinks() {
  const currentPath = usePathname();

  return (
    <div className="flex gap-12 items-center">
      <li className="w-[200px] h-[40px] ">
        <Link href={"/"}>
          <Image
            src={"https://www.justwatch.com/appassets/img/logo/JustWatch-logo-small.webp"}
            alt="Just watch logo"
            width={400}
            height={100}
            className="w-full h-full object-contain"
          />
        </Link>
      </li>
      <li>
        <Link href={"/"} className={`${currentPath === "/" ? "font-semibold text-white" : ""}`}>
          Home
        </Link>
      </li>
      <li>
        <Link href={"/discover"} className={`${currentPath === "/discover" ? "font-semibold text-white" : ""}`}>
          Discover
        </Link>
      </li>
      <li>
        <Link href={"/favorites"} className={`${currentPath === "/favorites" ? "font-semibold text-white" : ""}`}>
          Favorites
        </Link>
      </li>
    </div>
  );
}
