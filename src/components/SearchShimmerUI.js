import { ShimmerThumbnail, ShimmerPostList } from "react-shimmer-effects";

const SearchShimmerUI = () => {
  return (
    <div className="p-2 w-3xl m-auto">
      <ShimmerThumbnail className="mt-10" height={50} rounded />
      <div className="bg-gray-50 w-full">
        <div className="p-6">
          <ShimmerPostList postStyle="STYLE_FIVE" col={3} row={2} gap={20} />
        </div>
      </div>
    </div>
  );
};

export default SearchShimmerUI;
