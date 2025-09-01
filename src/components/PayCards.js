import React from "react";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCreditCard,
} from "react-icons/fa";

const PayCards = ({ cardType, cardInfo }) => {
  const cardTypeIcons = {
    visa: <FaCcVisa className="text-4xl text-white" />,
    masterCard: <FaCcMastercard className="text-4xl text-white" />,
    amex: <FaCcAmex className="text-4xl text-white" />,
    unknown: <FaCreditCard className="text-4xl text-white" />,
  };
  return (
    <div className="w-[350px] h-[200px] bg-gradient-to-r from-gray-600 dark:from-gray-700 to-gray-900 rounded-xl text-white p-6 shadow-lg flex flex-col justify-between font-mono">
      <div>
        <div className="flex justify-between items-center">
          <div className="text-sm opacity-80 uppercase">{cardType}</div>
          {cardTypeIcons[cardType] || cardTypeIcons["unknown"]}
        </div>

        <div className="text-xl tracking-widest mt-4">
          {cardInfo.number || "xxxx xxxx xxxx xxxx"}
        </div>
      </div>
      <div className="flex justify-between text-sm">
        <div>{cardInfo.name || "FULL NAME"}</div>
        <div>{cardInfo.expiry || "MM/YY"}</div>
      </div>
    </div>
  );
};

export default PayCards;
