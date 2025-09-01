import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../services/reducers/cartSlice";

const PaymentModal = ({ isOpen, onClose, type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [showTick, setShowTick] = useState(false);
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

  useEffect(() => {
    if (!isOpen) return;

    if (isOpen) {
      setLoading(true);
      setShowTick(false);
    }

    const loadingTimeout = setTimeout(() => {
      setLoading(false);
      setShowTick(true);
    }, 3000);

    const closeTimeout = setTimeout(() => {
      onClose();
      const cartSnapshot = structuredClone(cart);
      const billSnapshot = { ...billSummary };
      dispatch(clearCart());
      navigate("/order-summary", {
        state: {
          cartItems: cartSnapshot,
          billSummary: billSnapshot,
          type: type,
        },
      });
    }, 5000);

    return () => {
      clearTimeout(loadingTimeout);
      clearTimeout(closeTimeout);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md dark:bg-gray-700">
        <div className="flex flex-col items-center">
          <p className="m-2 text-gray-500 text-xs dark:text-gray-300">
            {loading
              ? "Please wait while we receive your payment"
              : "Payment received!"}
          </p>

          {loading ? (
            <ClipLoader
              color={"#28e02b"}
              loading={loading}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
              className="m-4"
            />
          ) : showTick ? (
            <IoCheckmarkCircleOutline
              color="#28e02b"
              size={100}
              aria-label="Check Mark"
              className="m-4"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
