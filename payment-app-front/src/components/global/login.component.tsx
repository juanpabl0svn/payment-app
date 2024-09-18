import axios from "axios";
import { API_URL } from "../../utils/constants";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { handleCloseModal } from "./modal";

const Login = ({ closeLogin }: { closeLogin: () => void }) => {
  const dispatch = useDispatch();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const { email, password } = Object.fromEntries(new FormData(e.target));

    if (!email || !password) {
      return toast.error("Todos los campos son requeridos");
    }

    const req = await axios.post(`${API_URL}/users/login`, {
      email,
      password,
    });

    if (req.status !== 201) {
      return toast.error("Credenciales incorrectas");
    }

    const { token, name } = req.data;

    localStorage.setItem("token", token);

    dispatch({
      type: "user/login",
      payload: { email, name },
    });

    handleCloseModal(closeLogin)
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col justify-center items-center gap-3"
    >
      <h2 className="text-xl font-bold mb-4">Iniciar Sesión</h2>

      <label htmlFor="" className="input">
        Correo
        <div>
          <input type="text" id="email" name="email" />
        </div>
      </label>
      <label htmlFor="password" className="input">
        Contraseña
        <div>
          <input type="text" name="password" id="password" />
        </div>
      </label>

      <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 mt-10">
        Iniciar sesión
      </button>
    </form>
  );
};

export default Login;
