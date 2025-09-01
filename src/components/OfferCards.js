const OfferCards = ({ offers }) => {
  const { header, offerTag, primaryDescription } = offers?.info;

  return (
    <div className="w-40 shrink-0">
      <div className="border border-gray-200 h-16 rounded-xl flex items-center p-2 cursor-pointer dark:border-gray-500">
        <span className="size-12 flex items-center rounded-full bg-gradient-to-br from-orange-300 to-red-400 mr-3 text-[10px] text-center justify-center text-white font-semibold leading-tight break-words p-1">
          {offerTag || "OFFER"}
        </span>
        <div className="flex flex-col justify-center">
          <p className="text-sm font-black dark:text-white">{header}</p>
          <p className="text-[11px] font-semibold text-gray-400">
            {primaryDescription || "ENDS SOON"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OfferCards;
