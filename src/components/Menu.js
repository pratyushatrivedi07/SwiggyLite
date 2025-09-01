import MenuCategory from "./MenuCategory";
import ToggleSwitch from "./ToggleSwitch";
import React, { useState } from "react";

const Menu = ({ restaurantInfo, restaurantName, categoryRef }) => {
  const [isVeg, setIsVeg] = useState(false);
  const [isNonVeg, setIsNonVeg] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const menuCategories =
    restaurantInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (card) =>
        card?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  const setVeg = () => {
    !isVeg ? setIsVeg(true) : setIsVeg(false);
    setIsNonVeg(false);
  };

  const setNonVeg = () => {
    !isNonVeg ? setIsNonVeg(true) : setIsNonVeg(false);
    setIsVeg(false);
  };

  menuCategories.forEach((category) => {
    const title = category?.card?.card?.title;
    if (!categoryRef.current[title]) {
      categoryRef.current[title] = React.createRef();
    }
  });

  return (
    <div className="mt-6">
      <div className="flex items-center gap-2">
        <ToggleSwitch
          id="veg"
          onClick={setVeg}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          label="Veg"
        />
        <ToggleSwitch
          id="nonVeg"
          onClick={setNonVeg}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          label="Non Veg"
        />
      </div>
      <div className="my-6">
        {menuCategories.map((category) => (
          <MenuCategory
            key={category?.card?.card?.title}
            data={category?.card?.card}
            veg={isVeg}
            nonVeg={isNonVeg}
            restaurantName={restaurantName}
            categoryRef={categoryRef.current[category?.card?.card?.title]}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
