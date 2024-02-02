"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavigationLinks() {
  const currentPath = usePathname();

  return (
    <li className="flex gap-12 items-center">
      <div className="w-[200px] h-[40px]">
        <Link href={"/"}>
          <Image
            src={"https://www.justwatch.com/appassets/img/logo/JustWatch-logo-small.webp"}
            alt="Just watch logo"
            width={400}
            height={100}
            className="w-full h-full object-contain"
          />
        </Link>
      </div>
      <div>
        <Link href={"/"} className={`${currentPath === "/" ? "font-semibold text-white" : ""}`}>
          Home
        </Link>
      </div>
      <div>
        <Link href={"/discover"} className={`${currentPath === "/discover" ? "font-semibold text-white" : ""}`}>
          Discover
        </Link>
      </div>
    </li>
  );
}
