import { useLocation } from "react-router-dom";
import { DELIVERY_URL } from "../utils/constant";

const OrderSummary = () => {
  const location = useLocation();
  const { cartItems, billSummary, type } = location.state || {};

  if (!cartItems || !billSummary) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-xl font-semibold text-red-500">
          Oops! No order data found.
        </h1>
        <p className="text-sm mt-2 dark:text-gray-300">
          Please return to home or try again.
        </p>
      </div>
    );
  }

  return (
    <div className="h-dvh">
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl mt-6 font-bold text-center mb-6 dark:text-gray-300">
          Order Placed Successfully!
        </h1>

        <div className="flex items-center gap-10 justify-between">
          <div>
            {type === "offline" && (
              <div className="m-2 p-1 border-2 dark:border-1 rounded-md border-red-400 dark:border-red-500">
                <span className="text-sm p-2 text-gray-500 dark:text-gray-400">
                  Kindly pay{" "}
                  <span className="text-red-500 font-semibold dark:font-normal">
                    ₹{billSummary.totalBill}
                  </span>{" "}
                  to the driver upon receiving your order
                </span>
              </div>
            )}

            <div className="shadow-lg rounded-xl p-4 mt-6 bg-zinc-50/50 dark:bg-gray-700 overflow-y-auto min-h-[200px] max-h-[500px]">
              <h2 className="text-xl font-semibold mb-4 dark:text-gray-300">
                Order Summary
              </h2>

              {Object.entries(cartItems).map(([restaurantName, items]) => (
                <div key={restaurantName} className="p-2">
                  <p className="test-medium mb-4 dark:text-gray-300">
                    {restaurantName}
                  </p>
                  <ul className="text-sm space-y-1">
                    {Object.values(items).map((item) => (
                      <li key={item.id} className="p-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-light w-[250px] dark:text-gray-300">
                            {item.name}
                          </p>
                          <p className="text-sm  text-center font-light w-[150px] dark:text-gray-300">
                            {item.count}
                          </p>
                          <p className="text-sm text-right w-20 font-light dark:text-gray-300">
                            ₹
                            {((item.price ?? item.defaultPrice) / 100) *
                              item.count}
                          </p>
                        </div>
                      </li>
                    ))}

                    <hr className="text-gray-200 dark:text-gray-500" />
                    <li className="p-2">
                      <p className="font-medium text-sm my-4 dark:text-gray-300">
                        Bill Details
                      </p>
                      <div className="flex items-center justify-between my-2">
                        <p className="font-light text-xs dark:text-gray-300">
                          Item Total
                        </p>
                        <p className="font-light text-xs dark:text-gray-300">
                          ₹{billSummary.itemTotal}
                        </p>
                      </div>
                      <div className="flex items-center justify-between my-2">
                        <p className="font-light text-xs dark:text-gray-300">
                          Delivery Fee
                        </p>
                        <p className="font-light text-xs dark:text-gray-300">
                          ₹{billSummary.deliveryFee}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-2 mb-4">
                        <p className="font-light text-xs dark:text-gray-300">
                          GST & Other Charges
                        </p>
                        <p className="font-light text-xs dark:text-gray-300">
                          ₹{billSummary.gst}
                        </p>
                      </div>
                      <hr className="text-gray-300 dark:text-gray-500" />
                      <div className="flex items-center justify-between mt-4">
                        <p className="font-semibold text-sm dark:text-gray-300">
                          Total Bill
                        </p>
                        <p className="font-semibold text-sm dark:text-gray-300">
                          ₹{billSummary.totalBill}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <img src={DELIVERY_URL} className="w-120" />
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-400 text-left dark:text-gray-500">
            Thank you for ordering with us!
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
