import { Search } from "@/components/Search";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/Menubar";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavigationLinks } from "@/components/NavigationLinks";

export function Navigation() {
  return (
    <nav className="mb-8">
      <ul className="flex justify-between text-lg text-slate-400">
        <NavigationLinks />
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
