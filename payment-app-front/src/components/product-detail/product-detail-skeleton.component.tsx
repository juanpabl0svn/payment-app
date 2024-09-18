const ProductDetailSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <div className="w-full aspect-[12/7] object-cover flex-1 rounded-md bg-gray-200"></div>
      <div className="flex-1 basis-4 mx-6 md:mx-0 py-5">
        <div className="bg-gray-200 w-full h-5 rounded-md my-2"></div>
        <div className="bg-gray-200 w-full h-5 rounded-md my-2"></div>
        <div className="bg-gray-200 w-20 h-5 rounded-md my-1"></div>
        <div className="bg-gray-200 w-full h-5 rounded-md my-2"></div>
        <div className="bg-gray-200 w-full h-5 rounded-md my-2"></div>

        <div className="flex items-center mt-6">
          <label htmlFor="units" className="mr-4 font-semibold">
            Cantidad:
          </label>
          <input
            type="number"
            id="units"
            name="units"
            min="1"
            className="border p-2 rounded w-16 text-center bg-gray-300 aspect-square"
          />
        </div>

        <button className="bg-gray-300 px-6 py-3 rounded-lg mt-4 w-10 h-8"></button>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
