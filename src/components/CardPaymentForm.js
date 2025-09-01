import { useEffect, useState } from "react";
import {
  AMEX_IMG_URL,
  MASTERCARD_IMG_URL,
  RUPAY_IMG_URL,
  VISA_IMG_URL,
} from "../utils/constant";
import PayCards from "./PayCards";
import PaymentModal from "./PaymentModal";

const CardPaymentForm = ({ totalBill }) => {
  const [cardInfo, setCardInfo] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [error, setError] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    const allFilled = Object.values(cardInfo).every((val) => val.trim() !== "");
    setButtonDisabled(!allFilled);
  }, [cardInfo]);

  const brandImagesImages = {
    visa: VISA_IMG_URL,
    masterCard: MASTERCARD_IMG_URL,
    amex: AMEX_IMG_URL,
    rupay: RUPAY_IMG_URL,
  };

  const getCardType = (number) => {
    const cardTypes = {
      visa: /^4/,
      masterCard: /^5[1-5]/,
      amex: /^3[47]/,
      rupay: /^6[05]/,
    };

    for (const [type, pattern] of Object.entries(cardTypes)) {
      if (pattern.test(number)) return type;
    }
    return "unknown";
  };

  const cardType = getCardType(cardInfo.number);

  const formatCardNumber = (value) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 16);
    return digitsOnly.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiryDate = (value) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 4);
    const month = digitsOnly.slice(0, 2);
    const year = digitsOnly.slice(2);

    if (digitsOnly.length <= 3) return digitsOnly;

    if (Number(month) < 1 || Number(month) > 12) {
      setError("Invalid month");
      return month;
    }

    const isExpiryValid = validateExpiry(month, year);

    if (!isExpiryValid) {
      setError("Card has expired");
    } else {
      setError("");
    }

    return `${month}/${year}`;
  };

  const validateExpiry = (month, year) => {
    if (!month || !year || month.length !== 2 || year.length !== 2)
      return false;

    const mm = parseInt(month);
    const yy = parseInt(year) + 2000;
    const currYear = new Date().getFullYear();
    const currMonth = new Date().getMonth() + 1;

    if (yy > currYear) {
      return true;
    } else if (yy === currYear) {
      if (mm >= currMonth) {
        return true;
      } else {
        return false;
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "name") newValue = value.toUpperCase();

    if (name === "number") newValue = formatCardNumber(value);

    if (name === "expiry") newValue = formatExpiryDate(value);

    if (name === "cvv")
      newValue = value.length === 3 ? value : value.slice(0, 3);

    setCardInfo({
      ...cardInfo,
      [name]: newValue,
    });
  };

  return (
    <div className="flex flex-col p-2 gap-4">
      <PayCards cardType={cardType} cardInfo={cardInfo} />

      <form className="grid grid-cols-1 gap-4 p-1">
        <div className="relative col-span-2">
          <input
            type="text"
            name="number"
            value={cardInfo.number}
            onChange={handleInputChange}
            placeholder="Card Number"
            className="px-4 py-2 border border-gray-400 dark:border-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400 dark:focus:ring-violet-500 w-full text-sm dark:text-gray-100"
          />
          {brandImagesImages[cardType] && (
            <img
              src={brandImagesImages[cardType]}
              alt={`${cardType} logo`}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-8 object-contain"
            />
          )}
        </div>

        <input
          type="text"
          name="name"
          value={cardInfo.name}
          onChange={handleInputChange}
          placeholder="Cardholder Name"
          className="px-4 py-2 border border-gray-400 dark:border-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400 dark:focus:ring-violet-500 col-span-2 text-sm dark:text-gray-100"
        />

        <div>
          <input
            type="text"
            name="expiry"
            value={cardInfo.expiry}
            onChange={handleInputChange}
            placeholder="Expiry Date (MM/YY)"
            className={`px-4 py-2 rounded-md focus:outline-none text-sm w-full dark:text-gray-100 ${
              error.length > 0
                ? "focus:ring-1 border border-red-400 dark:border-red-500 focus:ring-red-400 dark:focus:ring-red-500"
                : "focus:ring-1 focus:ring-indigo-400 dark:focus:ring-violet-500 border border-gray-400 dark:border-gray-500"
            }`}
          />
          {error && <span className="text-[10px] text-red-400 dark:text-red-500">{error}</span>}
        </div>

        <div>
          <input
            type="text"
            name="cvv"
            value={cardInfo.cvv}
            onChange={handleInputChange}
            placeholder="CVC/CVV"
            className="px-4 py-2 w-full border border-gray-400 dark:border-gray-500 dark:text-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400 dark:focus:ring-violet-500 text-sm"
          />
        </div>
      </form>
      <button
        type="button"
        className={`rounded-lg font-bold p-2${
          !buttonDisabled
            ? " bg-amber-300 dark:bg-amber-400 cursor-pointer"
            : " bg-amber-300/50 dark:bg-amber-300/70 text-gray-500 dark:text-gray-700 cursor-not-allowed"
        }`}
        disabled={buttonDisabled}
        onClick={() => {
          setIsOpenModal(true);
        }}
      >
        Pay ₹{totalBill}
      </button>
      <PaymentModal
        isOpen={isOpenModal}
        onClose={() => {
          setIsOpenModal(false);
        }}
        type={"online"}
      />
    </div>
  );
};

export default CardPaymentForm;
