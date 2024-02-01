"use client";

import { Button } from "@/components/ui/Button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { IoIosArrowDropdown } from "react-icons/io";
import { FIRST_YEAR, LAST_YEAR, YearDistance } from "@/components/discover/ShowMoviesByFilter";
import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";

interface OtherFiltersProps {
  yearDistance: YearDistance;
  handleUpdateYearDistance: (yearDistance: YearDistance) => void;
}

export function OtherFilters({ yearDistance, handleUpdateYearDistance }: OtherFiltersProps) {
  const [filterDistance, setFilterDistance] = useState<YearDistance>(yearDistance);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="text-lg">
          Other filters
          <IoIosArrowDropdown className="ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none text-center">Year</h4>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="from">From:</Label>
              <Input
                id="from"
                defaultValue={FIRST_YEAR}
                className="col-span-2 h-8"
                value={filterDistance.from}
                onChange={(e) => setFilterDistance({ ...filterDistance, from: Number(e.target.value) })}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="until">Until:</Label>
              <Input
                id="until"
                defaultValue={LAST_YEAR}
                className="col-span-2 h-8"
                value={filterDistance.until}
                onChange={(e) => setFilterDistance({ ...filterDistance, until: Number(e.target.value) })}
              />
            </div>
            <div className="flex justify-end items-center mt-4">
              Apply Filter:
              <Button
                variant={"outline"}
                className="w-16 ml-4 hover:bg-slate-800"
                onClick={() => handleUpdateYearDistance(filterDistance)}
              >
                <FaCheckCircle size={25} className="text-amber-300" />
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
