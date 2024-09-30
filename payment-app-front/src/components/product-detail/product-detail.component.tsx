import { FEE } from "../../utils/constants";
import { formatPrice } from "../../utils/functions";
import { IProduct } from "../../utils/interfaces";

const ProductDetail = ({
  product,
  handleBuy,
  setUnits,
  units,
}: {
  product: IProduct;
  handleBuy: () => void;
  setUnits: (value: number) => void;
  units: number;
}) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <img
        src={product.image}
        alt={product.title}
        className="w-full aspect-[12/7] object-cover flex-1 rounded-md max-h-96"
      />
      <div className="flex-1 basis-4 mx-6 md:mx-0 py-5">
        <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
        <span className="mt-4 text-gray-500">{formatPrice(product.price)}</span>
        <p className="text-3xl font-semibold text-green-600 mt-4">
          {formatPrice(product.price*(1+FEE))} <span className="text-sm">+ FEE</span>
        </p>
        <p className="text-sm text-gray-600  description">
          {product.description}
        </p>

        <div className="flex items-center mt-6">
          <label htmlFor="units" className="mr-4 font-semibold">
            Cantidad:
          </label>
          <input
            type="number"
            id="units"
            name="units"
            min="1"
            value={units}
            onChange={(e) => setUnits(Number(e.target.value))}
            className="border p-2 rounded w-16 text-center"
          />
        </div>

        <button
          onClick={handleBuy}
          className="bg-green-500 text-white px-6 py-3 rounded-lg mt-4 hover:bg-green-600"
        >
          Comprar
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
