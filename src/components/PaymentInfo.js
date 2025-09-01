import { useSelector } from "react-redux";
import { useState } from "react";
import AuthModal from "./AuthModal";
import PaymentMethod from "./PaymentMethod";

const PaymentInfo = ({ totalBill }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalName, setModalName] = useState("");

  const isUserLoggedIn = useSelector((store) => store.user.loggedIn);

  return (
    <div className="overflow-y-auto min-h-[200px] max-h-[500px] m-2 p-2 flex-[2] rounded-lg shadow-lg">
      <p className="font-medium px-4 my-4 dark:text-gray-300">Payment Method</p>
      {isUserLoggedIn ? (
        <PaymentMethod totalBill={totalBill} />
      ) : (
        <div className="flex items-center gap-4 px-4 my-4">
          <span
            className="flex text-xs flex-col items-center py-2 px-4 border border-red-600 dark:border-cyan-500 text-red-600 dark:text-cyan-500 cursor-pointer hover:shadow-2xl"
            onClick={() => {
              setIsOpenModal(true);
              setModalName("login");
            }}
          >
            <p className="font-light">Have an account?</p>
            <p className="font-medium">LOG IN</p>
          </span>
          <span
            className="flex text-xs flex-col items-center p-2 px-4 bg-red-600 dark:bg-cyan-600 text-white cursor-pointer hover:shadow-2xl"
            onClick={() => {
              setIsOpenModal(true);
              setModalName("signup");
            }}
          >
            <p className="font-light">New customer?</p>
            <p className="font-medium">SIGN UP</p>
          </span>
        </div>
      )}
      <AuthModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        modalName={modalName}
        setModalName={setModalName}
      />
    </div>
  );
};

export default PaymentInfo;
