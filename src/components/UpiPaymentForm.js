import QRCode from "react-qr-code";
import { useState } from "react";
import PaymentModal from "./PaymentModal";

const UpiPaymentForm = ({ itemTotalBill }) => {
  const [upiId, setUpiId] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [error, setError] = useState("");
  const [blurButton, setBlurButton] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleUpiId = (e) => {
    const value = e.target.value;
    const filled = value.trim() !== "";

    setButtonDisabled(!filled);
    setUpiId(value);

    return value;
  };

  const handleUpiClick = (upiId) => {
    const isUpiValid = validateUPI(upiId);

    if (!isUpiValid) {
      setError("Invalid UPI ID");
    } else {
      setError("");
    }

    setIsOpenModal(true);
  };

  const validateUPI = (upiId) => {
    if (!upiId) return false;

    const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
    return upiRegex.test(upiId);
  };

  const handleClickToView = () => {
    setBlurButton(false);
    setTimeout(() => {
      setIsOpenModal(true);
    }, 5000);
  };

  return (
    <div className="my-4">
      <div className="flex items-center gap-2">
        <input
          type="text"
          name="upiId"
          onChange={handleUpiId}
          placeholder="Enter UPI ID"
          className={`px-4 py-2 my-1 w-3/4 rounded-md focus:outline-none text-sm dark:text-gray-100 ${
            error
              ? "border border-red-400 dark:border-red-500 focus:ring-1 focus:ring-red-400 dark:focus:ring-red-500"
              : "border border-gray-400 dark:border-gray-500 focus:ring-1 focus:ring-indigo-400 dark:focus:ring-violet-500"
          }`}
        />

        <button
          className={`rounded-lg font-bold p-2 w-1/4 ${
            !buttonDisabled
              ? " bg-amber-300 dark:bg-amber-400 cursor-pointer"
              : " bg-amber-300/50 dark:bg-amber-300/70 text-gray-500 dark:text-gray-700 cursor-not-allowed"
          }`}
          disabled={buttonDisabled}
          onClick={() => handleUpiClick(upiId)}
        >
          Pay ₹{itemTotalBill}
        </button>
      </div>
      {error && <p className="text-[10px] text-red-400 p-1">{error}</p>}

      <div className="flex items-center my-2 mt-3">
        <hr className="text-gray-300 w-2/4 mr-2 dark:border-gray-500" />
        <p className="text-gray-400 text-xs dark:text-gray-400"> OR </p>
        <hr className="text-gray-300 w-2/4 ml-2 dark:border-gray-500" />
      </div>
      <p className="font-semibold my-2 text-center text-lg dark:text-gray-300">
        Scan to Pay
      </p>
      <div className="relative">
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "30%", width: "30%" }}
          value={itemTotalBill}
          viewBox={`0 0 256 256`}
          className={`my-4 mx-auto ${blurButton ? "blur-xs" : null} `}
        />
        {blurButton && (
          <button
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-1 text-xs font-medium bg-amber-300/80 rounded-full cursor-pointer hover:scale-105 hover:delay-100 hover:duration-150 hover:ease-in-out hover:bg-amber-300 dark:hover:bg-amber-400"
            onClick={handleClickToView}
          >
            Click to view
          </button>
        )}
      </div>
      <PaymentModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        type={"online"}
      />
    </div>
  );
};

export default UpiPaymentForm;
