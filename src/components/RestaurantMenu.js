import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useFetchRestaurantInfo } from "../utils/customHooks";
import CategoryShimmerUI from "./CategoryShimmerUI";
import { FaStar } from "react-icons/fa";
import OfferCards from "./OfferCards";
import Menu from "./Menu";
import FloatingMenu from "./FloatingMenu";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const restaurantInfo = useFetchRestaurantInfo(resId);
  const categoryRef = useRef({});
  const cart = useSelector((store) => store.cart.items);

  if (restaurantInfo === null) return <CategoryShimmerUI />;

  const { name, costForTwoMessage, cuisines, avgRating, sla } =
    restaurantInfo?.cards?.[2]?.card?.card?.info ?? {};

  const { offers } =
    restaurantInfo?.cards?.[3]?.card?.card?.gridElements?.infoWithStyle ?? {};

  const handleScroll = (title) => {
    const ref = categoryRef.current[title];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const cartVisible = Object.keys(cart).length !== 0;

  const totalItemsInCart = Object.values(cart).reduce((restotal, resitem) => {
    const itemCount = Object.values(resitem).reduce(
      (sum, item) => sum + item.count,
      0
    );
    return restotal + itemCount;
  }, 0);

  return (
    <div className="relative w-3xl mx-auto p-2">
      <FloatingMenu
        restaurantInfo={restaurantInfo}
        onScrollClick={handleScroll}
        cartVisible={cartVisible}
      />

      <h1 className="font-bold mt-10 px-2 py-6 text-2xl dark:text-gray-300">
        {name}
      </h1>
      <div className="bg-linear-to-b from-gray-50 to-gray-300 dark:from-gray-600 dark:to-gray-700 p-4 pt-0 h-36 rounded-b-4xl">
        <div className="bg-white p-4 rounded-3xl h-32 border border-gray-200 dark:bg-gray-600 dark:border-gray-600">
          <p className="text-sm flex items-center mt-2 gap-1.5 font-bold dark:text-gray-300">
            <FaStar className="text-green-700 dark:text-green-500 w-4 h-5" />
            {avgRating} stars - {costForTwoMessage}
          </p>
          <p className="py-2 text-[13px] text-red-600 dark:text-cyan-400 font-semibold">
            {cuisines.join(", ")}
          </p>
          <p className="font-semibold text-xs text-gray-600 dark:text-gray-300">
            {sla.slaString}
          </p>
        </div>
      </div>

      <h3 className="px-2 pt-8 text-lg font-semibold dark:text-gray-300">
        Deals for you
      </h3>
      <div className="flex gap-4 overflow-x-auto no-scrollbar px-2 py-4">
        {offers.map((offer) => (
          <OfferCards key={offer?.info?.offerIds[0]} offers={offer} />
        ))}
      </div>

      <p className="pt-6 text-sm font-medium text-center tracking-widest text-gray-500 dark:text-gray-400">
        ⋆༺ MENU ༻⋆
      </p>

      {cartVisible && (
        <Link
          to="/cart"
          className="fixed bottom-0 z-50 p-3 px-4 bg-green-600/10 text-white font-medium w-3xl left-1/2 transform -translate-x-1/2 flex items-center justify-between"
        >
          <p className="text-xs ">
            {totalItemsInCart} {totalItemsInCart > 1 ? "items" : "item"} added
          </p>

          <span to="/cart" className="flex items-center gap-2">
            <p className="text-sm/tight">VIEW CART</p>
            <FiShoppingCart className="text-white" />
          </span>
        </Link>
      )}

      <Menu
        restaurantInfo={restaurantInfo}
        restaurantName={name}
        categoryRef={categoryRef}
      />
    </div>
  );
};

export default RestaurantMenu;
