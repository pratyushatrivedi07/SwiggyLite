import { useState } from "react";

const FloatingMenu = ({ restaurantInfo, onScrollClick, cartVisible }) => {
  const [menuClicked, setMenuClicked] = useState(false);

  const buttonBottomSpacing = cartVisible ? "bottom-12" : "bottom-4";

  const menuCategories =
    restaurantInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (card) =>
        card?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return (
    <div>
      {menuClicked && (
        <>
          <div
            className="fixed inset-0 bg-gray-900/10 bg-opacity-50 z-40"
            onClick={() => setMenuClicked(false)}
          ></div>
          <div
            className={`fixed ${buttonBottomSpacing} left-1/2 transform -translate-x-1/2 z-50 bg-black rounded-xl p-4 w-md`}
          >
            {menuCategories.map((category) => (
              <div
                key={category?.card?.card?.title}
                className="p-2 flex items-center justify-between my-2 cursor-pointer"
                onClick={() => {
                  onScrollClick(category?.card?.card?.title);
                  setMenuClicked(false);
                }}
              >
                <p className="text-white text-sm hover:font-semibold delay-100 duration-100 ease-in-out">
                  {category?.card?.card.title}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      <div
        className={`flex items-center justify-center rounded-full bg-black size-16 cursor-pointer fixed right-1/4 z-50 ${buttonBottomSpacing}`}
        onClick={() => setMenuClicked((prev) => !prev)}
      >
        <p className="text-white text-center text-xs ">MENU</p>
      </div>
    </div>
  );
};

export default FloatingMenu;
