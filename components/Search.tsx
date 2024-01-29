import { CiSearch } from "react-icons/ci";

export function Search() {
  return (
    <div className="ml-8 w-full h-[40px] relative mr-4">
      <input
        type="search"
        placeholder="Search your favorite movies"
        className="bg-transparent bg-amber-100 bg-opacity-5 pl-8 w-full h-full"
      ></input>
      <CiSearch className="absolute top-[20px] -translate-y-1/2" size={24} />
    </div>
  );
}
