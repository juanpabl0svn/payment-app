import { Link } from "react-router-dom";
import { IProduct } from "../../utils/interfaces";
import { formatPrice } from "../../utils/functions";

const Product = ({ product }: { product: IProduct }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 bg-white w-[clamp(240px,40%,350px)] flex flex-col">
      <img
        src={product.image}
        alt={product.title}
        className="w-full aspect-[13/12] object-cover mb-4 rounded"
      />
      <div className="h-34 py-2">
        <h2 className="text-lg font-bold text-gray-900">{product.title}</h2>
        <p className="text-xl font-semibold text-green-600 mt-2">
          {formatPrice(product.price)}
        </p>
        <p className="text-sm text-gray-600  description">
          {product.description}
        </p>
      </div>
      <div className="flex-1 mt-5 flex items-end">
        <Link
          to={`/product/${product.id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Ver más
        </Link>
      </div>
    </div>
  );
};

export default Product;
