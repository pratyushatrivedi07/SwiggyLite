import { SWIGGY_IMG_URL } from "../utils/constant";
import { FaStar } from "react-icons/fa";

const RestaurantCards = ({ restaurants }) => {
  const { cloudinaryImageId, name, avgRating, cuisines, costForTwo, sla } =
    restaurants?.info;

  return (
    <div
      data-testid="resCards"
      className="mt-4 w-[255px] hover:scale-95 delay-100 duration-150 ease-in-out"
    >
      <img
        src={SWIGGY_IMG_URL + cloudinaryImageId}
        alt={name}
        className="rounded-lg w-full h-40 object-cover block"
      />
      <p className="mx-2 mt-2 font-bold text-md overflow-hidden overflow-ellipsis whitespace-nowrap dark:text-gray-300">
        {name}
      </p>
      <p className="mx-2 mb-1 text-sm flex items-center gap-1.5 dark:text-gray-300">
        <FaStar className="text-green-700 w-4 h-5 dark:text-green-500" />
        {avgRating} stars - {costForTwo}
      </p>
      <p className="mx-2 overflow-hidden overflow-ellipsis whitespace-nowrap text-[13px] text-gray-500 dark:text-gray-400">
        {cuisines.join(", ")}
      </p>
      <p className="mx-2 text-[13px] text-gray-500 dark:text-gray-400">
        {sla.slaString}
      </p>
    </div>
  );
};

export default RestaurantCards;
