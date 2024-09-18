
const ProductSkeleton = () => {
  return (
    <div className="border rounded-lg shadow-lg p-4 bg-white w-[clamp(240px,40%,350px)] flex flex-col">
      <div className="w-full aspect-[13/12] object-cover mb-4 rounded bg-gray-300"></div>
      <div className="h-34 py-2">
        <div className="bg-gray-200 w-full h-5 rounded-md my-2"></div>
        <div className="bg-gray-200 w-full h-5 rounded-md my-2"></div>
        <div className="bg-gray-200 w-20 h-5 rounded-md my-1"></div>
        <div className="bg-gray-200 w-full h-5 rounded-md my-2"></div>
        <div className="bg-gray-200 w-full h-5 rounded-md my-2"></div>
        <p className="text-xl font-semibold text-green-600 mt-2"></p>
        <p className="text-sm bg-gray-600  description"></p>
      </div>
      <div className="flex-1 mt-5 flex items-end">
        <div className="w-20 h-10 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
