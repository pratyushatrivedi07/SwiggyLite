import { LOGO_URL } from "../utils/constant";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";
import { use, useState } from "react";
import AuthModal from "./AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import { logOutUser } from "../services/reducers/userSlice";

const Header = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalName, setModalName] = useState("login");
  const [isOpenDropdown, setIsOpenDropDown] = useState(false);

  const user = useSelector((store) => store.user);
  const cart = useSelector((store) => store.cart.items);

  const username = user.userInfo.username;
  const isLoggedIn = user.isLoggedIn;

  const totalItemsInCart = Object.values(cart).reduce((restotal, resitem) => {
    const itemCount = Object.values(resitem).reduce(
      (sum, item) => sum + item.count,
      0
    );
    return restotal + itemCount;
  }, 0);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOutUser());
  };

  return (
    <div className="h-20 shadow-md flex items-center justify-between px-2 dark:bg-gray-700 dark:text-white">
      <div className="p-2 m-1 mx-10">
        <Link to="/" className="cursor-pointer">
          <img className="rounded-lg w-28" src={LOGO_URL} alt="Logo" />
        </Link>
      </div>
      <div className="items-center mx-10">
        <ul className="flex items-center p-4 m-4">
          <li className="px-6 hover:text-red-600 dark:hover:text-cyan-400">
            <Link to="/" className="cursor-pointer">
              Home
            </Link>
          </li>
          <li className="px-6 hover:text-red-600 dark:hover:text-cyan-400">
            <Link
              to="/search"
              className="flex items-center gap-2 cursor-pointer"
            >
              <IoSearch /> Search
            </Link>
          </li>
          <li className="px-6 hover:text-red-600 dark:hover:text-cyan-400">
            <Link to="/help" className="cursor-pointer">
              Help
            </Link>
          </li>
          <li className="px-6">
            {!username && !isLoggedIn ? (
              <div
                className="flex items-center gap-2 hover:text-red-600 dark:hover:text-cyan-400 cursor-pointer"
                onClick={() => setIsOpenModal(true)}
              >
                <FaRegUser /> Login
              </div>
            ) : (
              <div
                className=" relative"
                onClick={() => setIsOpenDropDown(!isOpenDropdown)}
              >
                <span className="hover:text-red-600 font-medium flex items-center gap-2 italic dark:hover:text-cyan-400 cursor-pointer">
                  Hi, {username} <IoIosArrowDown />
                </span>
                {isOpenDropdown && (
                  <span
                    className="absolute top-full mt-2 left-0 shadow-lg py-2 px-8 bg-white dark:bg-gray-800 dark:hover:text-cyan-500 rounded-md z-10 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </span>
                )}
              </div>
            )}
          </li>
          <li className="px-6 hover:text-red-600 dark:hover:text-cyan-400">
            <Link to="/cart" className="cursor-pointer flex items-center gap-2">
              <FiShoppingCart />
              {totalItemsInCart > 0 ? (
                <span className="text-red-600 dark:text-cyan-400 font-semibold">
                  {totalItemsInCart}
                </span>
              ) : (
                "Cart"
              )}
            </Link>
          </li>
          <li className="px-6">
            <ThemeSwitch />
          </li>
        </ul>
        <AuthModal
          isOpen={isOpenModal}
          onClose={() => setIsOpenModal(false)}
          modalName={modalName}
          setModalName={setModalName}
        />
      </div>
    </div>
  );
};

export default Header;
