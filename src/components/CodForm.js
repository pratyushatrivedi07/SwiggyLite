import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../services/reducers/cartSlice";

const CodForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isClicked, setIsClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showTick, setShowTick] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const cart = useSelector((store) => store.cart.items);

  const calculateBillSummary = (cart) => {
    let itemTotal = 0;
    Object.values(cart).forEach((items) => {
      itemTotal += Object.values(items).reduce(
        (sum, item) =>
          sum + (item.count * (item.price ?? item.defaultPrice)) / 100,
        0
      );
    });
    itemTotal = parseFloat(itemTotal.toFixed(2));
    const gst = parseFloat(((5 / 100) * itemTotal).toFixed(2));
    const deliveryFee = 20;
    const totalBill = Math.ceil(itemTotal + gst + deliveryFee);

    return { itemTotal, gst, deliveryFee, totalBill };
  };

  const billSummary = calculateBillSummary(cart);

  const handleClick = () => {
    setIsClicked(true);
    setLoading(true);
    setButtonDisabled(true);

    const loadingTimeOut = setTimeout(() => {
      setLoading(false);
      setShowTick(true);
    }, 2000);

    const tickTimeout = setTimeout(() => {
      setShowTick(false);
      const cartSnapshot = structuredClone(cart);
      const billSnapshot = { ...billSummary };
      dispatch(clearCart());
      navigate("/order-summary", {
        state: {
          cartItems: cartSnapshot,
          billSummary: billSnapshot,
          type: "offline",
        },
      });
    }, 4000);

    return () => {
      clearTimeout(loadingTimeOut);
      clearTimeout(tickTimeout);
    };
  };
  return (
    <div className="p-2">
      <button
        className={`rounded-lg font-bold p-2 w-full ${
          !buttonDisabled
            ? " bg-amber-300 dark:bg-amber-400 cursor-pointer"
            : " bg-amber-300/50 dark:bg-amber-300/70 text-gray-500 dark:text-gray-700 cursor-not-allowed"
        }`}
        onClick={handleClick}
        disabled={buttonDisabled}
      >
        Place Order
      </button>
      {isClicked ? (
        <div className="flex flex-col items-center">
          <p className="m-2 my-8 text-gray-500 dark:text-gray-300 text-sm">
            {loading
              ? "Please wait while we process your order"
              : "Order placed!"}
          </p>

          {loading ? (
            <ClipLoader
              color="#28e02b"
              loading={loading}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
              className="m-2"
            />
          ) : showTick ? (
            <IoCheckmarkCircleOutline
              color="#28e02b"
              size={100}
              aria-label="Check Mark"
              className="m-2"
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default CodForm;
