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
  title: string;
  filterStates: Record<string, boolean>;
  handleUpdateFilterState: (genre: string, checked: boolean) => void;
}

export function Filter({ title, filterStates, handleUpdateFilterState }: FilterProps) {
  const isFilterApplied = !!Object.values(filterStates).filter((value) => value === true).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={isFilterApplied ? "outline" : "ghost"} className="text-2xl">
          {title}
          <IoIosArrowDropdown className="ml-2" />
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
