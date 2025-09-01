import { useDispatch } from "react-redux";
import { SWIGGY_IMG_URL } from "../utils/constant";
import VegNonVegSymbol from "./VegNonVegSymbol";
import { addItem, deleteItem } from "../services/reducers/cartSlice";
import PaymentInfo from "./PaymentInfo";

const CartItems = ({ cart }) => {
  const dispatch = useDispatch();

  const calculateBillSummary = (cart) => {
    let itemTotalCost = 0;
    Object.values(cart).forEach((items) => {
      itemTotalCost += Object.values(items).reduce(
        (sum, item) =>
          sum + (item.count * (item.price ?? item.defaultPrice)) / 100,
        0
      );
    });
    itemTotalCost = parseFloat(itemTotalCost.toFixed(2));
    const gst = parseFloat(((5 / 100) * itemTotalCost).toFixed(2));
    const deliveryFee = 20;
    const totalBill = Math.ceil(itemTotalCost + gst + deliveryFee);

    return { itemTotalCost, gst, deliveryFee, totalBill };
  };

  const handleAddItem = (item, restaurantName) => {
    dispatch(addItem({ ...item, restaurantName }));
  };

  const handleDeleteItem = (item, restaurantName) => {
    dispatch(deleteItem({ id: item.id, restaurantName }));
  };

  return (
    <div className="p-2 m-2">
      {Object.entries(cart).map(([restaurantName, items]) => {
        const totalItemsInCart = Object.values(items).reduce(
          (sum, item) => sum + item.count,
          0
        );
        const billSummary = calculateBillSummary(cart);

        return (
          <div
            key={restaurantName}
            className="flex gap-4 border border-gray-200 dark:border-gray-500 rounded-lg m-2 p-2 mt-4 items-stretch"
          >
            <div className="m-2 p-4 flex-[2] rounded-lg shadow-lg min-h-[200px] max-h-[500px] overflow-y-auto">
              <div className="flex items-baseline justify-between">
                <p className="text-lg font-medium mb-2 dark:text-gray-300">
                  {restaurantName}
                </p>
                <p className="text-xs text-gray-400 mb-2 dark:text-gray-400">
                  Items in Cart: {totalItemsInCart}
                </p>
              </div>
              <hr className="text-gray-200 dark:text-gray-500" />
              <ul className="space-y-0.5">
                {Object.values(items).map((item) => (
                  <li key={item.id} className="p-3">
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4 min-w-0">
                        <VegNonVegSymbol type={item.isVeg} />
                        <img
                          alt={item.name}
                          src={SWIGGY_IMG_URL + item.imageId}
                          className="rounded-lg w-14 h-14 object-fill text-xs"
                        />
                        <h1 className="text-sm font-light w-[150px] dark:text-gray-300">
                          {item.name}
                        </h1>
                      </div>

                      <div className="text-sm text-center w-12">
                        <button className="px-2 py-1 flex items-center justify-between border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 text-green-600 dark:text-green-500 cursor-pointer">
                          <span
                            className="mx-2"
                            onClick={() =>
                              handleDeleteItem(item, restaurantName)
                            }
                          >
                            -
                          </span>
                          <span>{item.count}</span>
                          <span
                            className="mx-2"
                            onClick={() => handleAddItem(item, restaurantName)}
                          >
                            +
                          </span>
                        </button>
                      </div>

                      <div className="text-sm text-right w-20 font-light dark:text-gray-300">
                        ₹
                        {((item.price ?? item.defaultPrice) / 100) * item.count}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <hr className="m-2 my-4 text-gray-300 dark:text-gray-500" />

              <div className="p-2">
                <p className="font-medium text-sm px-4 dark:text-gray-300">Bill Details</p>
                <div className="flex items-center justify-between px-4 my-4">
                  <p className="font-light text-xs dark:text-gray-400">Item Total</p>
                  <p className="font-light text-xs dark:text-gray-400">
                    ₹{billSummary.itemTotalCost}
                  </p>
                </div>
                <div className="flex items-center justify-between px-4 my-4 dark:text-gray-300">
                  <p className="font-light text-xs dark:text-gray-400">Delivery Fee</p>
                  <p className="font-light text-xs dark:text-gray-400">
                    ₹{billSummary.deliveryFee}
                  </p>
                </div>
                <div className="flex items-center justify-between px-4 my-4">
                  <p className="font-light text-xs dark:text-gray-400">GST & Other Charges</p>
                  <p className="font-light text-xs dark:text-gray-400">₹{billSummary.gst}</p>
                </div>
                <hr className="text-gray-400 dark:text-gray-500" />
                <div className="flex items-center justify-between px-4 mt-3">
                  <p className="font-semibold text-sm dark:text-gray-300">To Pay</p>
                  <p className="font-semibold text-sm dark:text-gray-300">
                    ₹{Math.ceil(billSummary.totalBill)}
                  </p>
                </div>
              </div>
            </div>

            <PaymentInfo totalBill={billSummary.totalBill} />
          </div>
        );
      })}
    </div>
  );
};

export default CartItems;
