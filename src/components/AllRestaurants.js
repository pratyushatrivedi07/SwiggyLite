import RestaurantCards from "./RestaurantCards";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FilterChips from "./FilterChips";

const AllRestaurants = ({ restaurantList }) => {
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    setFilteredList(restaurantList);
  }, [restaurantList]);

  return (
    <div className="px-4 py-2">
      <p className="font-bold text-xl mb-2 dark:text-gray-300">
        Restaurants with online food delivery
      </p>

      <FilterChips
        restaurantList={restaurantList}
        setFilteredList={setFilteredList}
      />

      <div className="grid grid-cols-4 gap-6">
        {filteredList.map((restaurant) => (
          <Link
            to={"/restaurant/" + restaurant.info.id}
            key={restaurant.info.id}
            className="cursor-pointer"
          >
            <RestaurantCards restaurants={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllRestaurants;
