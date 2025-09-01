import { SWIGGY_IMG_URL } from "../utils/constant";
import { MdOutlineStarRate } from "react-icons/md";
import VegNonVegSymbol from "./VegNonVegSymbol";
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem } from "../services/reducers/cartSlice";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

const MenuList = ({ list, veg, nonVeg, restaurantName }) => {
  const cart = useSelector((store) => store.cart.items);
  const totalItemsInCart = Object.values(cart).reduce((restotal, resitem) => {
    const itemCount = Object.values(resitem).reduce(
      (sum, item) => sum + item.count,
      0
    );
    return restotal + itemCount;
  }, 0);

  const itemsToRender = veg
    ? list.filter((item) => item.card.info.isVeg === 1)
    : nonVeg
    ? list.filter((item) => !item.card.info.isVeg)
    : list;

  if (itemsToRender.length === 0) return null;

  const dispatch = useDispatch();

  const handleAddItem = (item, restaurantName) => {
    console.log(item);
    dispatch(addItem({ ...item.card.info, restaurantName }));
  };

  const handleDeleteItem = (item, restaurantName) => {
    dispatch(deleteItem({ id: item.card.info.id, restaurantName }));
  };

  return (
    <div className="bg-white dark:bg-gray-700">
      {itemsToRender.map((item) => {
        const itemId = item.card.info.id;
        const restaurantItems = cart[restaurantName] || {};
        const count = restaurantItems[itemId]?.count || 0;
        return (
          <div
            key={item.card.info.id}
            className="px-2 mx-2 py-3 justify-between bg-white dark:bg-gray-700 border-b-1 border-gray-200 dark:border-gray-500 grid grid-cols-3 gap-4"
          >
            <div className="py-4 col-span-2">
              <span className="flex items-center gap-2">
                <VegNonVegSymbol type={item.card.info.isVeg} />

                {item.card.info.isBestseller && (
                  <span className="flex items-center text-red-400 dark:text-cyan-400 gap-0.5 font-medium text-[13px]">
                    <MdOutlineStarRate className="w-[18px] h-[18px]" />{" "}
                    Bestseller
                  </span>
                )}
              </span>
              <p className="font-bold text-[15px] dark:text-gray-300">
                {item.card.info.name}
              </p>
              <p className="text-sm font-medium dark:text-gray-300 mt-2">
                ₹{" "}
                {item.card.info.price / 100 ||
                  item.card.info.defaultPrice / 100}
              </p>
              <p className="py-2 font-light text-sm text-gray-500 dark:text-gray-400">
                {item.card.info.description}
              </p>
            </div>
            <div className="py-4 flex justify-end">
              <div className="relative w-36 h-40">
                <img
                  alt={item.card.info.name}
                  src={SWIGGY_IMG_URL + item.card.info.imageId}
                  className="rounded-lg object-fill w-full h-full"
                />

                {count === 0 ? (
                  <button
                    className="absolute w-26 bottom-[-18px] border border-gray-200 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-white dark:border-gray-700 dark:bg-gray-800 text-green-600 dark:text-green-500 font-semibold rounded-lg shadow-md cursor-pointer text-sm"
                    onClick={() => handleAddItem(item, restaurantName)}
                  >
                    ADD
                  </button>
                ) : (
                  <button className="absolute w-26 flex items-center justify-between bottom-[-18px] border border-gray-200 dark:border-gray-700 dark:bg-gray-800 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-white text-green-600 dark:text-green-500 font-semibold rounded-lg shadow-md cursor-pointer text-sm">
                    <span
                      className="cursor-point"
                      onClick={() => handleDeleteItem(item, restaurantName)}
                    >
                      -
                    </span>
                    <span>{count}</span>
                    <span
                      className="cursor-point"
                      onClick={() => handleAddItem(item, restaurantName)}
                    >
                      +
                    </span>
                  </button>
                )}
              </div>
            </div>

            {Object.keys(cart).length !== 0 && (
              <Link
                to="/cart"
                className="fixed bottom-0 z-50 p-2.5 bg-green-600/50 w-3xl left-1/2 transform -translate-x-1/2 flex items-center justify-between"
              >
                <p className="text-xs text-white font-medium">
                  {totalItemsInCart} item added
                </p>

                <span to="/cart" className="flex items-center gap-2">
                  <p className="text-sm text-white">View Cart</p>
                  <FiShoppingCart className="text-white" />
                </span>
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MenuList;
