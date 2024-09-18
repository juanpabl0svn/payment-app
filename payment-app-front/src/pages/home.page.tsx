import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/slices/product";
import { RootState, AppDispatch } from "../store";
import Product from "../components/home/product.component";
import ProductSkeleton from "../components/home/product-skeleton.component";

const ProductPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="w-full flex flex-wrap justify-center gap-6">
      {products.length > 0
        ? products.map((product) => (
            <Product key={product.id} product={product} />
          ))
        : Array.from({ length: 10 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
    </div>
  );
};

export default ProductPage;
