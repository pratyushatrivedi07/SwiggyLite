import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import MenuList from "./MenuList";
import { useState } from "react";

const MenuCategory = ({ data, veg, nonVeg, restaurantName, categoryRef }) => {
  const [showList, setShowList] = useState(true);
  const itemCards = data?.itemCards || [];

  const filteredItems = veg
    ? itemCards.filter((item) => item.card.info.isVeg === 1)
    : nonVeg
    ? itemCards.filter((item) => item.card.info.isVeg !== 1)
    : itemCards;

  if (filteredItems.length === 0) return null;

  return (
    <div className="py-1.5 bg-gray-100 dark:bg-gray-700">
      <div
        className="flex bg-white items-center justify-between cursor-pointer dark:bg-gray-700"
        onClick={() => {
          showList ? setShowList(false) : setShowList(true);
        }}
        ref={categoryRef}
      >
        <span className="p-4 font-black text-[15px] dark:text-gray-300">
          {data.title} ({filteredItems.length})
        </span>
        <span>
          {showList ? (
            <IoIosArrowUp className="mr-3 dark:text-gray-300" />
          ) : (
            <IoIosArrowDown className="mr-3 dark:text-gray-300" />
          )}
        </span>
      </div>
      {showList && (
        <MenuList
          list={data.itemCards}
          veg={veg}
          nonVeg={nonVeg}
          restaurantName={restaurantName}
        />
      )}
    </div>
  );
};

export default MenuCategory;
