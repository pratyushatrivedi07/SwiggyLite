import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { useAllRestaurants } from "../utils/customHooks";
import { IoChevronBack } from "react-icons/io5";
import SearchedRestaurants from "./SearchedRestaurants";
import SearchShimmerUI from "./SearchShimmerUI";
import { Link } from "react-router-dom";

const Search = () => {
  const [showButton, setShowButton] = useState(false);
  const [search, setSearch] = useState("");
  const [searchedTerm, setSearchedTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const restaurantList = useAllRestaurants();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") searchRestaurants();
  };

  const searchRestaurants = () => {
    const input = search.trim().toLowerCase();
    if (!input) return;

    setShowButton(true);
    setHasSearched(true);
    setSearchedTerm(search);
    const matches = restaurantList.filter(
      (res) =>
        res.info.name.toLowerCase().includes(input) ||
        res.info.cuisines.some((cuisine) => cuisine.toLowerCase() === input)
    );
    setFilteredList(matches);
  };

  const clearSearch = () => {
    setSearch("");
    setShowButton(false);
    setSearchedTerm("");
    setHasSearched(false);
    setFilteredList([]);
  };

  if (restaurantList.length === 0) {
    return <SearchShimmerUI />;
  }

  return (
    <div className="p-2 m-6 h-dvh dark:bg-gray-800">
      <div className="flex items-center gap-4 p-4 m-auto w-3xl">
        <span className="relative flex items-center w-full mb-5">
          {!hasSearched && !showButton ? (
            // Default search icon on the right
            <IoSearch className="w-5 h-5 absolute text-gray-500 right-4" />
          ) : (
            <>
              {/* Back button on the left after search */}
              {hasSearched && (
                <button className="absolute left-3 p-2" onClick={clearSearch}>
                  <IoChevronBack
                    data-testid="backBtn"
                    className="w-5 h-5 text-gray-800"
                  />
                </button>
              )}

              {/* Search button stays on the right */}
              <button
                className="p-2 px-6 text-sm font-semibold h-11 absolute right-1 rounded-full bg-red-200 hover:bg-red-500 hover:text-white dark:bg-cyan-400 dark:hover:bg-cyan-500 dark:hover:text-black cursor-pointer"
                onClick={searchRestaurants}
              >
                Search
              </button>
            </>
          )}

          <input
            placeholder="Search restaurants by name or cuisines..."
            className="w-full pl-12 h-[50px] border text-sm font-semibold border-gray-300 bg-gray-50 rounded-full focus:outline-hidden dark:bg-gray-300 dark:border-0"
            value={search}
            onFocus={() => setShowButton(true)}
            onChange={(e) => {
              setSearch(e.target.value);
              if (e.target.value.trim() === "") {
                setFilteredList([]);
                setHasSearched(false);
              }
            }}
            onKeyDown={handleKeyDown}
          />
        </span>
      </div>

      {hasSearched && searchedTerm.trim() !== "" && (
        <div>
          {filteredList.length > 0 ? (
            <div className="grid grid-cols-3 p-6 w-3xl m-auto gap-5 bg-gray-100 border-t-1 border-gray-300 dark:bg-gray-700 dark:border-gray-400">
              {filteredList.map((restaurant) => (
                <Link
                  to={"/restaurant/" + restaurant.info.id}
                  key={restaurant.info.id}
                  className="cursor-pointer"
                >
                  <SearchedRestaurants restaurant={restaurant} />
                </Link>
              ))}
            </div>
          ) : (
            <p className="w-3xl m-auto p-6 py-1 text-sm font-bold dark:text-gray-300">
              No match found for "{searchedTerm}"
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
