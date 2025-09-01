import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAllRestaurants } from "../utils/customHooks";
import CategoryShimmerUI from "./CategoryShimmerUI";
import RestaurantCards from "./RestaurantCards";

const CategoryRestaurants = () => {
  const { category } = useParams();
  const [filteredList, setFilteredList] = useState([]);
  const [listFetched, setListFetched] = useState(false);
  const restaurantList = useAllRestaurants();

  useEffect(() => {
    if (restaurantList.length > 0) {
      const matches = restaurantList.filter((res) =>
        res.info.cuisines.some(
          (cuisine) => cuisine.toLowerCase() === category.toLowerCase()
        )
      );
      setFilteredList(matches);
      setListFetched(true);
    }
  }, [restaurantList, category]);

  return !listFetched ? (
    <CategoryShimmerUI />
  ) : (
    <div className="m-auto mt-6 p-2 w-6xl">
      <p className="font-bold text-4xl mt-2 dark:text-gray-200">{category}</p>
      <p className="font-light mt-2 dark:text-gray-200">
        Restaurants curated for {category}
      </p>
      {listFetched && filteredList.length > 0 ? (
        <div className="grid grid-cols-4 gap-6 mt-4">
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
      ) : (
        <p className="mt-6 font-semibold dark:text-gray-300">
          Sorry! No Restaurants found for "{category}" 🙁
        </p>
      )}
    </div>
  );
};

export default CategoryRestaurants;
