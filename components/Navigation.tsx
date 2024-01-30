"use client";

import { Search } from "@/components/Search";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/Menubar";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export function Navigation() {
  const currentPath = usePathname();

  return (
    <nav>
      <ul className="flex justify-between text-lg text-slate-400">
        <div className="flex gap-12 items-center">
          <li className="w-[200px] h-[40px] ">
            <Image
              src={"https://www.justwatch.com/appassets/img/logo/JustWatch-logo-small.webp"}
              alt="Just watch logo"
              width={400}
              height={100}
              className="w-full h-full object-contain"
            />
          </li>
          <li>
            <Link href={"/"} className={`${currentPath === "/" ? "font-semibold text-white" : ""}`}>
              Home
            </Link>
          </li>
          <li>
            <Link href={"/new"} className={`${currentPath === "/new" ? "font-semibold text-white" : ""}`}>
              New
            </Link>
          </li>
          <li>
            <Link href={"/popular"} className={`${currentPath === "/popular" ? "font-semibold text-white" : ""}`}>
              Popular
            </Link>
          </li>
          <li>
            <Link href={"/list"} className={`${currentPath === "/list" ? "font-semibold text-white" : ""}`}>
              List
            </Link>
          </li>
        </div>
        <Search />
        <li>
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>
                <GiHamburgerMenu />
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Connecting TV</MenubarItem>
                <MenubarItem>Apps</MenubarItem>
                <MenubarItem>About us</MenubarItem>
                <MenubarItem>Privacy policy</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </li>
      </ul>
    </nav>
  );
}
