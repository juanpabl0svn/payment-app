import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchTransaction } from "../store/slices/transaction";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { States } from "../utils/interfaces";
import Loader from "../components/global/loader.component";
import { formatPrice } from "../utils/functions";

import Confetti from "react-confetti";

import { Link } from "react-router-dom";
import { FEE } from "../utils/constants";

const Transaction = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch: AppDispatch = useDispatch();

  const transaction = useSelector((state: RootState) => state.transaction);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchTransaction(id));
  }, [dispatch]);

  return (
    <div className="max-w-lg mx-auto my-8 p-6 bg-white rounded-lg shadow-lg grid place-content-center">
      {transaction?.status === States.SUCCESS &&
      transaction.transaction != null ? (
        <>
          {transaction.transaction.status == "APPROVED" && <Confetti />}
          <h2 className="text-2xl font-semibold text-gray-700">
            Payment Details
          </h2>
          <div className="mt-4">
            <p className="text-lg font-medium text-gray-900">
              Status:{" "}
              <span
                className={`${
                  transaction.transaction.status == "APPROVED"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {transaction.transaction.status}
              </span>
            </p>
            <p className="text-lg text-gray-700">
              Customer: {transaction.transaction.customer_data.full_name}
            </p>
            <p className="text-lg text-gray-700">
              Email: {transaction.transaction.customer_email}
            </p>
            <p className="text-lg text-gray-700">
              Amount: {formatPrice(transaction.transaction.amount_in_cents)}
            </p>
            <p className="text-lg text-gray-900">
              Amount + FEE: {formatPrice(transaction.transaction.amount_in_cents*FEE)}
            </p>
            <p className="text-lg text-gray-700">
              Currency: {transaction.transaction.currency}
            </p>
            <p className="text-lg text-gray-700">
              Payment Method:{" "}
              {transaction.transaction.payment_method.extra.brand} ending in{" "}
              {transaction.transaction.payment_method.extra.last_four}
            </p>
            <p className="text-lg text-gray-700">
              Installments:{" "}
              {transaction.transaction.payment_method.extra.installments}
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Transaction Reference: {transaction.transaction.reference}
            </p>
            <p className="text-sm text-gray-500">
              Created At:{" "}
              {new Date(transaction.transaction.created_at).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
              Finalized At:{" "}
              {new Date(transaction.transaction.finalized_at).toLocaleString()}
            </p>
          </div>
          <Link
            to="/"
            className="bg-blue-400 rounded-sm p-2 mt-4 w-fit text-white"
          >
            Volver
          </Link>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Transaction;
