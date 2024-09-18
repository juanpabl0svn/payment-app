import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { API_URL } from "./utils/constants";
import UserInfo from "./components/global/user-info.component";

const Layout: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const credit_card = localStorage.getItem("credit_card");
    const token = localStorage.getItem("token");

    if (credit_card) {
      dispatch({
        type: "payment/setCard",
        payload: JSON.parse(credit_card),
      });
    }
    if (token) {
      (async () => {
        const res = await axios.post(`${API_URL}/users/validate`, { token });

        if (res.status !== 201) {
          localStorage.removeItem("token");
          return;
        }

        console.log(res.data);

        const { email, name } = res.data;

        dispatch({
          type: "user/login",
          payload: { email, name },
        });
      })();
    }
  }, []);

  return (
    <main>
      <h1 className="product-title">Wompi Shop</h1>
      <UserInfo />

      <Toaster />
      <Outlet />
    </main>
  );
};

export default Layout;
