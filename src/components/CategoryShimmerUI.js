import { ShimmerTitle, ShimmerPostList } from "react-shimmer-effects";

const CategoryShimmerUI = () => {
  return (
    <div className="w-6xl m-auto">
      <div className="m-2 p-2">
        <ShimmerTitle
          className="mt-4 w-40"
          line={2}
          gap={20}
          variant="primary"
        />
        <ShimmerPostList
          className="py-4"
          postStyle="STYLE_FIVE"
          col={4}
          row={2}
          gap={20}
        />
      </div>
    </div>
  );
};

export default CategoryShimmerUI;
