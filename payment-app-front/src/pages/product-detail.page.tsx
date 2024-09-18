// src/pages/ProductDetailPage.tsx
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchProducts } from "../store/slices/product";
import { PUB_KEY, UAT_SANDBOX_WOMPI } from "../utils/constants";
import { States } from "../utils/interfaces";
import ProductDetailSkeleton from "../components/product-detail/product-detail-skeleton.component";
import ProductDetail from "../components/product-detail/product-detail.component";
import Modal from "../components/global/modal";
import axios from "axios";
import Payment from "../components/payment";
import Swal from "sweetalert2";
import Login from "../components/global/login.component";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();

  const product = useSelector((state: RootState) =>
    state.products.items.find((item) => item.id === Number(id))
  );

  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const products = useSelector((state: RootState) => state.products);
  const [units, setUnits] = useState<number>(1);

  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
  const [isModalPayOpen, setIsModalPayOpen] = useState(false);

  const acceptance_token = useRef("");

  const get_acceptance_token = async () => {
    const { data } = await axios.get(
      `${UAT_SANDBOX_WOMPI}/merchants/${PUB_KEY}`
    );

    acceptance_token.current =
      data.data.presigned_acceptance.acceptance_token ?? "";
  };

  useEffect(() => {
    if (products.items.length == 0 && products.status === States.NULL) {
      dispatch(fetchProducts());
    }
    get_acceptance_token();
  }, []);

  useEffect(() => {
    if (products.status === States.SUCCESS && product == null) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El producto que buscas no existe",
      });
    }
  }, [products.status]);

  const handleBuy = () => {
    if (!isLoggedIn) {
      setIsModalLoginOpen(true);
      return;
    }
    setIsModalPayOpen(true);
  };


  return (
    <>
      <Link to="/" className="fixed top-3 left-3 arrow">
        Volver
      </Link>
      {products.status === States.SUCCESS && product != null ? (
        <ProductDetail
          product={product}
          setUnits={setUnits}
          units={units}
          handleBuy={handleBuy}
        />
      ) : (
        <ProductDetailSkeleton />
      )}

      {/* Modal para iniciar sesión */}

      <Modal
        isOpen={isModalLoginOpen}
        closeModal={() => setIsModalLoginOpen(false)}
      >
        <Login closeLogin={() => setIsModalLoginOpen(false)} />
      </Modal>

      {/* Modal para hacer los pagos */}  
      <Modal
        isOpen={isModalPayOpen}
        closeModal={() => setIsModalPayOpen(false)}
        className="overflow-x-hidden flex relative"
      >
        <Payment
          product={product!}
          units={units}
          acceptance_token={acceptance_token.current}
        />
      </Modal>
    </>
  );
};

export default ProductDetailPage;
