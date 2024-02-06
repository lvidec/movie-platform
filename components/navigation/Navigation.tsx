import { Search } from "@/components/navigation/Search";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/Menubar";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavigationLinks } from "@/components/navigation/NavigationLinks";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { Button } from "@/components/ui/Button";
import { IoIosArrowDropdown } from "react-icons/io";
import { Favorites } from "@/components/navigation/Favorites";
import { ScreenContainer } from "@/components/ScreenContainer";

export function Navigation() {
  return (
    <nav className="lg:mb-12 mb-6 mt-4">
      <ScreenContainer>
        <ul className="lg:flex lg:justify-between text-sm sm:text-md text-slate-400 relative">
          <NavigationLinks />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={"ghost"} className="lg:mx-8 text-center m-auto mb-4 lg:mb-0 flex">
                Favorites
                <IoIosArrowDropdown className="ml-2" size={20} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full">
              <Favorites />
            </PopoverContent>
          </Popover>
          <Search />
          <li className="absolute top-0 left-0 w-max lg:static">
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
      </ScreenContainer>
    </nav>
  );
}
