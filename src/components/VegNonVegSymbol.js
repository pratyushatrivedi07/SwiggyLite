const VegNonVegSymbol = ({ type }) => {
  const isVeg = type === 1 || type === "veg";
  return (
    <div
      className={`w-4 h-4 flex justify-center border-2 rounded-sm items-center my-2 ${
        isVeg ? "border-green-600" : "border-red-700"
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          isVeg ? "bg-green-600" : "bg-red-700"
        }`}
      ></span>
    </div>
  );
};

export default VegNonVegSymbol;
