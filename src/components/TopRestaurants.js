import { Link } from "react-router-dom";
import RestaurantCards from "./RestaurantCards";

const TopRestaurants = ({ topRestaurants }) => {
  return (
    <div className="px-4 py-2">
      <p className="font-bold text-lg mb-2 dark:text-gray-300">
        Top Restaurants for You
      </p>
      <div className="flex gap-6 overflow-x-auto no-scrollbar">
        {topRestaurants.map((restaurant) => (
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

export default TopRestaurants;
