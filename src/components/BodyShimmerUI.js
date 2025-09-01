import {
  ShimmerTitle,
  ShimmerCircularImage,
  ShimmerPostList,
} from "react-shimmer-effects";

const BodyShimmerUI = () => {
  return (
    <div className="w-6xl m-auto">
      <div className="m-2 p-2">
        <ShimmerTitle
          className="mt-4 w-40"
          line={1}
          gap={10}
          variant="primary"
        />
        <div className="flex gap-6 mt-12">
          <ShimmerCircularImage size={120} />
          <ShimmerCircularImage size={120} />
          <ShimmerCircularImage size={120} />
          <ShimmerCircularImage size={120} />
          <ShimmerCircularImage size={120} />
          <ShimmerCircularImage size={120} />
          <ShimmerCircularImage size={120} />
          <ShimmerCircularImage size={120} />
        </div>
        <hr className="my-8 text-gray-200 dark:text-gray-500" />
        <ShimmerTitle
          className="mt-4 w-40"
          line={1}
          gap={10}
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

export default BodyShimmerUI;
