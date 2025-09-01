import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

const filters = [
  {
    id: "veg",
    label: "Pure Veg",
    fn: (list) => list.filter((rs) => rs.info.veg === true),
  },
  {
    id: "fast",
    label: "Fast Delivery",
    fn: (list) => list.filter((rs) => rs.info.sla.deliveryTime <= 30),
  },
];

const FilterChips = ({ restaurantList, setFilteredList }) => {
  const [activeFilter, setActiveFilter] = useState([]);

  useEffect(() => {
    if (activeFilter.length === 0) {
      setFilteredList(restaurantList);
      return;
    }

    let filteredList = restaurantList;
    activeFilter.forEach((id) => {
      const filter = filters.find((f) => f.id === id);
      if (filter) {
        filteredList = filter.fn(filteredList);
      }
    });
    setFilteredList(filteredList);
  }, [activeFilter, restaurantList, setFilteredList]);

  const handleChipClick = (id) => {
    setActiveFilter((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="py-2 flex gap-3">
      {filters.map(({ id, label }) => {
        const isActive = activeFilter.includes(id);

        return (
          <button
            key={id}
            className="text-[13px] cursor-pointer border px-3 py-1.5 rounded-full border-gray-200 dark:bg-gray-600 dark:border-gray-400 hover:scale-105 delay-100 duration-100 ease-in-out"
            onClick={() => handleChipClick(id)}
          >
            {isActive ? (
              <span className="flex items-center gap-1 dark:text-gray-300">
                {label}
                <MdClose className="w-[14px] h-[14px] text-gray-500 dark:text-gray-300" />
              </span>
            ) : (
              <span className="dark:text-gray-300">{label}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default FilterChips;
