import { useState } from "react";
import {
  AMEX_IMG_URL,
  MASTERCARD_IMG_URL,
  RUPAY_IMG_URL,
  VISA_IMG_URL,
  GPAY_IMG_URL,
  APPLE_PAY_IMG_URL,
  AZ_PAY_IMG_URL,
  UPI_IMG_URL,
} from "../utils/constant";
import CardPaymentForm from "./CardPaymentForm";
import UpiPaymentForm from "./UpiPaymentForm";
import CodForm from "./CodForm";

const PaymentMethod = ({ totalBill }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  return (
    <div>
      <div className="px-4 m-2 border border-gray-300 dark:border-gray-500">
        <div className="flex items-center gap-2 my-4">
          <input
            type="radio"
            name="payMethod"
            className="w-4 h-4 accent-red-600 dark:accent-cyan-400"
            value={"card"}
            onChange={handleChange}
          />
          <label className="text-sm font-medium dark:text-gray-300">
            Credit & Debit Cards
          </label>
        </div>
        <div className="flex items-center gap-2 my-4">
          <input
            type="radio"
            name="payMethod"
            className="w-4 h-4 accent-red-600 dark:accent-cyan-400"
            value={"upi"}
            onChange={handleChange}
          />
          <label className="text-sm font-medium dark:text-gray-300">UPI</label>
        </div>
        <div className="flex items-center gap-2 my-4">
          <input
            type="radio"
            name="payMethod"
            className="w-4 h-4 accent-red-600 dark:accent-cyan-400"
            value={"cod"}
            onChange={handleChange}
          />
          <label className="text-sm font-medium dark:text-gray-300">
            Cash on Delivery
          </label>
        </div>
      </div>

      {selectedValue === "card" && (
        <div className="px-4 m-2 my-4 border border-gray-300 dark:border-gray-500">
          <h1 className="mt-3 font-semibold dark:text-gray-300">Credit or Debit Cards</h1>
          <div className="flex items-center gap-2 my-2">
            <img src={VISA_IMG_URL} className="w-10 h-8" />
            <img src={MASTERCARD_IMG_URL} className="w-10 h-6" />
            <img src={RUPAY_IMG_URL} className="w-10 h-8" />
            <img src={AMEX_IMG_URL} className="w-10 h-6" />
          </div>
          <CardPaymentForm totalBill={totalBill} />
        </div>
      )}

      {selectedValue === "upi" && (
        <div className="px-4 m-2 my-4 border border-gray-300 dark:border-gray-500">
          <h1 className="mt-3 font-semibold mb-4 dark:text-gray-300">UPI Payment</h1>
          <div className="flex items-center gap-4 my-2">
            <img src={GPAY_IMG_URL} className="w-14 h-7" />
            <img src={AZ_PAY_IMG_URL} className="w-20 h-5" />
            <img src={APPLE_PAY_IMG_URL} className="w-12 h-7" />
            <img src={UPI_IMG_URL} className="w-14 h-5" />
          </div>
          <UpiPaymentForm itemTotalBill={totalBill} />
        </div>
      )}

      {selectedValue === "cod" && <CodForm />}
    </div>
  );
};

export default PaymentMethod;
