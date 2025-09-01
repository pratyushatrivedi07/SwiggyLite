import VegNonVegSymbol from "./VegNonVegSymbol";

const ToggleSwitch = ({ id, selectedOption, onClick, setSelectedOption }) => {
  const isChecked = selectedOption === id;
  return (
    <div className="flex items-center gap-2 border rounded-full px-3 py-1 border-gray-200 dark:border-gray-600">
      <label className="relative inline-block w-12 h-6 cursor-pointer ">
        <input
          type="checkbox"
          className="peer sr-only "
          onChange={() => {
            setSelectedOption(isChecked ? null : id);
          }}
        />
        <span
          className={`absolute inset-2 rounded-full transition-colors duration-200 ease-in-out ${
            id === "veg" && isChecked
              ? "bg-green-600 dark:bg-green-700"
              : id === "nonVeg" && isChecked
              ? "bg-red-600 dark:bg-red-800"
              : "bg-gray-300 dark:bg-gray-500"
          }`}
          onClick={onClick}
        ></span>
        <span
          className={`absolute top-1/2 start-1 transform -translate-y-1/2 w-4 h-4 bg-white dark:bg-gray-700 shadow-xs transition-transform duration-200 ease-in-out flex items-center justify-center ${
            id === "veg" ? "text-green-400" : "text-red-500"
          } ${isChecked ? "translate-x-6" : null}`}
          onClick={onClick}
        >
          <VegNonVegSymbol type={id} />
        </span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
