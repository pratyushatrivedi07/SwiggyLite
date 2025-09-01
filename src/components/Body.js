import FoodCategory from "./FoodCategory";
import TopRestaurants from "./TopRestaurants";
import AllRestaurants from "./AllRestaurants";
import BodyShimmerUI from "./BodyShimmerUI";
import {
  useFoodCategory,
  useTopRestaurants,
  useAllRestaurants,
} from "../utils/customHooks";

const Body = () => {
  const foodCategories = useFoodCategory();
  const topRestaurants = useTopRestaurants();
  const restaurantList = useAllRestaurants();

  return foodCategories.length === 0 ||
    topRestaurants.length === 0 ||
    restaurantList.length === 0 ? (
    <BodyShimmerUI />
  ) : (
    <div className="w-6xl m-auto">
      <FoodCategory categories={foodCategories} />
      <hr className="my-6 text-gray-200 dark:text-gray-500" />
      <TopRestaurants topRestaurants={topRestaurants} />
      <hr className="my-6 text-gray-200 dark:text-gray-500" />
      <AllRestaurants restaurantList={restaurantList} />
    </div>
  );
};

export default Body;
