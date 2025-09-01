import { CART_IMG_URL } from "../utils/constant";
import { Link } from "react-router-dom";
import CartItems from "./CartItems";
import { useSelector, useDispatch } from "react-redux";
import { GoTrash } from "react-icons/go";
import { clearCart } from "../services/reducers/cartSlice";

const Cart = () => {
  const cart = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  console.log(cart);

  if (Object.keys(cart).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center dark:bg-gray-800 h-dvh">
        <img src={CART_IMG_URL} alt="Cart Empty" className="w-20" />
        <p className="text-center text-lg font-semibold mb-6 dark:text-gray-300">
          Your cart is empty
        </p>
        <Link to="/">
          <button className="py-2 text-sm px-4 font-bold bg-red-500 dark:bg-cyan-500 text-white cursor-pointer hover:bg-red-600 hover:shadow-2xl">
            EXPLORE RESTAURANTS
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-6xl m-auto p-2 h-dvh">
      <div className="flex items-baseline justify-between mx-4 mt-6 px-6">
        <h1 className="text-4xl font-semibold dark:text-gray-300">Your Cart</h1>
        <button
          className="flex items-center gap-1 border font-medium border-red-600 dark:border-red-500 p-2 rounded-lg text-xs text-red-600 dark:text-red-500 cursor-pointer hover:bg-red-600 dark:hover:bg-red-500  hover:text-white"
          onClick={handleClearCart}
        >
          <GoTrash className="w-4 h-4 font-bold" /> Clear Cart
        </button>
      </div>
      <CartItems cart={cart} />
    </div>
  );
};

export default Cart;
