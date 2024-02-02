"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Button } from "@/components/ui/Button";
import { IoIosArrowDropdown } from "react-icons/io";

interface FilterProps {
  filterStates: Record<string, boolean>;
  handleUpdateFilterState: (genre: string, checked: boolean) => void;
}

export function GenreFilter({ filterStates, handleUpdateFilterState }: FilterProps) {
  const isFilterApplied = !!Object.values(filterStates).filter((value) => value === true).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={isFilterApplied ? "outline" : "ghost"}>
          Genre
          <IoIosArrowDropdown className="ml-2" size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {Object.entries(filterStates).map(([genre, checked]) => (
          <DropdownMenuCheckboxItem
            key={genre}
            checked={checked}
            onCheckedChange={(value) => {
              handleUpdateFilterState(genre, value);
            }}
          >
            {genre}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
