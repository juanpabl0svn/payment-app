import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store";
import toast from "react-hot-toast";

import { v4 as uuidv4 } from "uuid";

import axios from "axios";
import {
  API_URL,
  INTEGRITY,
  PUB_KEY,
  UAT_SANDBOX_WOMPI,
} from "../../utils/constants";
import { IProduct } from "../../utils/interfaces";

const Payment = ({
  product,
  units,
  acceptance_token,
}: {
  product: IProduct;
  units: number;
  acceptance_token: string;
}) => {
  const [next, setNext] = useState(false);

  const cardInfo = useSelector((state: RootState) => state.payment);

  const dispatch = useDispatch();

  const [shipping, setShipping] = useState({
    address: "",
    phone: "",
  });

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const value = cardInfo.card.card_number;
    if (!value) return;
    dispatch({
      type: "payment/setType",
      payload: value.startsWith("5")
        ? "mastercard"
        : value.startsWith("4")
        ? "visa"
        : "none",
    });
  }, []);

  const setCardValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    dispatch({ type: "payment/setCardAttribute", payload: { id, value } });
  };

  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;

    value = value.replace(/\D/g, "");

    e.target.value = value;
    setCardValue(e);

    dispatch({
      type: "payment/setType",
      payload: value.startsWith("5")
        ? "mastercard"
        : value.startsWith("4")
        ? "visa"
        : "none",
    });
  };

  const handleChangeExpDate = (e: ChangeEvent<HTMLInputElement>) => {
    let { value, id } = e.target;

    value = value.replace(/\D/g, "");

    e.target.value = value;

    setCardValue(e);

    if (value.length > 1 && id == "exp_month") {
      document.getElementById("exp_year")?.focus();
      e.preventDefault();
      return;
    }
  };

  const handleSubmitData = (e: any) => {
    e.preventDefault();

    const { card_number, exp_month, exp_year, card_holder, cvc } =
      cardInfo.card;

    const { address } = shipping;

    if (card_holder.length < 5) {
      return toast.error(
        "El nombre del dueño de la tarjeta debe tener al menos 5 caracteres"
      );
    }

    if (card_number.length < 16) {
      return toast.error("El numero de la tarjeta debe tener 16 caracteres");
    }

    if (+exp_month < 1 || +exp_month > 12) {
      return toast.error("El mes de expiración de la tarjeta no es valido");
    }

    if (exp_year.length < 2) {
      return toast.error("El año de expiración de la tarjeta no es valido");
    }

    if (cvc.length < 3) {
      return toast.error("El cvc de la tarjeta debe tener 3 caracteres");
    }

    if (address.length < 3) {
      toast.error("La direccion debe ser mayor a 3");
      return;
    }

    setNext(true);
  };

  const tokeniceCard = async () => {
    try {
      const { data } = await axios.post(
        `${UAT_SANDBOX_WOMPI}/tokens/cards`,
        {
          number: cardInfo.card?.card_number,
          card_holder: cardInfo.card?.card_holder,
          exp_year: cardInfo.card?.exp_year,
          exp_month: cardInfo.card?.exp_month,
          cvc: cardInfo.card?.cvc,
        },
        {
          headers: {
            Authorization: `Bearer ${PUB_KEY}`,
          },
        }
      );
      return data.data.id;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const reference = uuidv4();

    const mount = product!.price * units * 100;

    var signature = reference + mount + "COP" + INTEGRITY;

    const token = await tokeniceCard();
    if (!token)
      return toast.error("Error al tokenizar la tarjeta, intenta de nuevo");

    const req = await axios.post(`${API_URL}/transactions`, {
      product_id: product.id,
      acceptance_token,
      amount_in_cents: mount,
      currency: "COP",
      signature,
      customer_email: user.email,
      units,
      reference,
      customer_data: {
        full_name: user.name,
      },
      payment_method: {
        type: "CARD",
        token,
        installments: 2,
      },
    });

    if (req.status !== 201) {
      return toast.error("Error al procesar el pago");
    }

    toast.success("Pago exitoso");
    setTimeout(() => {
      window.location.href = `/transactions/${req.data.data.reference}`;
    }, 300);
  };

  return next ? (
    <form className="flex flex-col w-full gap-3" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-7">Información</h2>
      <div className="flex gap-2 items-center">
        <img
          src={`/${cardInfo.type}.png`}
          alt="card-type"
          className="w-7 h-6 rounded-md"
        />
        <p>Numero de tarjeta: {cardInfo.card.card_number}</p>
      </div>
      <hr />
      <p>
        Fecha de expiración: {cardInfo.card.exp_month}/{cardInfo.card.exp_year}
      </p>
      <hr />
      <p>Dueño de la tarjeta: {cardInfo.card.card_holder}</p>
      <hr />
      <p>Dirección de envio: {shipping.address}</p>
      <hr />
      <p>Telefono: {shipping.phone}</p>
      <div className="flex flex-col items-center">
        <button className="bg-blue-500 rounded-sm w-fit p-2 text-white hover:bg-blue-300 transition-all ease-in">
          Confirmar
        </button>

        <button
          onClick={() => setNext(false)}
          className="text-gray-500 w-fit p-2 hover:underline"
        >
          Volver
        </button>
      </div>
    </form>
  ) : (
    <form onSubmit={handleSubmitData} className="overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Información de pago</h2>
      <div className="flex flex-wrap justify-start min-h-64 gap-4">
        <label className="input" htmlFor="card_number">
          Numero de tarjeta (Visa/Mastercard)*
          <div className="flex gap-2">
            <img
              src={`/${cardInfo.type}.png`}
              alt="card-type"
              className="w-7 h-6 rounded-md"
            />
            <input
              required
              type="text"
              onChange={handleCardNumberChange}
              id="card_number"
              maxLength={16}
              minLength={16}
              placeholder="XXXX-XXXX-XXXX-XXXXX"
              value={cardInfo.card.card_number}
            />
          </div>
        </label>

        <label className="input" htmlFor="exp_month">
          Fecha de expiración*
          <div>
            <input
              required
              type="text"
              onChange={handleChangeExpDate}
              id="exp_month"
              className="input-exp-date-left"
              placeholder="MM"
              maxLength={2}
              value={cardInfo.card.exp_month}
            />
            <span>/</span>
            <input
              required
              type="text"
              className="input-exp-date-right"
              id="exp_year"
              onChange={handleChangeExpDate}
              placeholder="YY"
              maxLength={2}
              value={cardInfo.card.exp_year}
            />
          </div>
        </label>
        <label className="input" htmlFor="card_holder">
          Dueño de la tarjeta*
          <div>
            <input
              required
              type="text"
              placeholder="Jhon Doe"
              value={cardInfo.card.card_holder}
              id="card_holder"
              minLength={5}
              onChange={setCardValue}
              className="text-center"
            />
          </div>
        </label>
        <label className="input" htmlFor="">
          CVC*
          <div>
            <input
              required
              type="text"
              placeholder="123"
              maxLength={3}
              minLength={3}
              className="w-12 text-center"
              value={cardInfo.card.cvc}
              id="cvc"
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
                setCardValue(e);
              }}
            />
          </div>
        </label>
      </div>
      <hr />
      <h2 className="text-xl font-bold mb-4">Información de envio</h2>
      <div className="flex flex-wrap gap-4">
        <label htmlFor="address" className="input">
          Dirección*
          <div>
            <input
              required
              type="text"
              id="address"
              value={shipping.address}
              onChange={(e) =>
                setShipping({ ...shipping, address: e.target.value })
              }
            />
          </div>
        </label>
        <label htmlFor="phone" className="input">
          Telefono
          <div>
            <input
              required
              type="text"
              id="phone"
              onChange={(e) =>
                setShipping({ ...shipping, phone: e.target.value })
              }
            />
          </div>
        </label>
      </div>
      <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 mt-10 block mx-auto">
        Continuar
      </button>
    </form>
  );
};

export default Payment;
