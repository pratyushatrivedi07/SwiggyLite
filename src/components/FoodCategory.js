import { SWIGGY_IMG_URL } from "../utils/constant";
import { Link } from "react-router-dom";

const FoodCategory = ({ categories }) => {
  return (
    <div className="m-2 p-2">
      <p className="font-bold text-lg mt-2 dark:text-gray-300">
        What's on your mind?
      </p>
      <div className="flex gap-6 overflow-x-auto no-scrollbar h-44">
        {categories.map((category) => (
          <Link
            to={"/restaurants/" + category.action.text}
            key={category.id}
            className="cursor-pointer flex-shrink-0 w-32 h-40"
          >
            <img
              src={SWIGGY_IMG_URL + category.imageId}
              alt={category.action.text}
              className="w-full h-full object-cover mx-auto mt-4"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FoodCategory;
