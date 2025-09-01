import { SWIGGY_IMG_URL } from "../utils/constant";
import { FaStar } from "react-icons/fa";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

const SearchedRestaurants = ({ restaurant }) => {
  const { cloudinaryImageId, name, avgRating, sla } = restaurant?.info;
  return (
    <div data-testid="searchRes">
      <div className="bg-white rounded-lg p-4 dark:bg-gray-800">
        <p className="text-sm font-semibold text-gray-600 overflow-hidden overflow-ellipsis whitespace-nowrap dark:text-gray-300">
          {name}
        </p>
        <p className="text-xs py-1 flex text-gray-500 items-center gap-1.5 dark:text-gray-300">
          <FaStar className="text-green-600 w-3 h-4 dark:text-green-500" />
          {avgRating} stars - {sla.slaString}
        </p>

        <hr className="mt-2 text-gray-300 border-dashed" />
        <img
          src={SWIGGY_IMG_URL + cloudinaryImageId}
          alt={name}
          className="!rounded-lg w-full h-40 object-cover mt-4"
        />
        <p className="text-xs justify-center items-center text-gray-400 gap-1 mt-4 flex">
          Explore <IoArrowForwardCircleOutline className="w-4 h-4" />
        </p>
      </div>
    </div>
  );
};

export default SearchedRestaurants;
