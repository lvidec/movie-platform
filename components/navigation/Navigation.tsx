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
    <nav className="mb-12 mt-4">
      <ScreenContainer>
        <ul className="flex justify-between text-lg text-slate-400">
          <NavigationLinks />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={"ghost"} className="ml-8">
                Favorites
                <IoIosArrowDropdown className="ml-2" size={20} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full">
              <Favorites />
            </PopoverContent>
          </Popover>
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
      </ScreenContainer>
    </nav>
  );
}
