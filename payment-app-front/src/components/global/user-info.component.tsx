import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useState } from "react";
import Login from "./login.component";
import Modal from "./modal";

const UserInfo = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);

  const handleLogIn = () => {
    setIsOpenLoginModal(true);
  }

  const handleLogOut = () => {
    console.log("Log out");
    setIsOpenLoginModal(false);

    dispatch({
      type: 'user/logout'
    })



  }

  return (
    <>
      <div className="fixed top-4 right-4">
        {user.isLoggedIn ? (
          <>
            <p>{user.name}</p>
            <button onClick={handleLogOut}>
              Desloagearse
            </button>
          </>
        ) : (
          <button onClick={handleLogIn}>Logearse</button>
        )}
      </div>

      <Modal
        isOpen={isOpenLoginModal}
        closeModal={() => setIsOpenLoginModal(false)}
      >
        <Login closeLogin={() => setIsOpenLoginModal(false)} />
      </Modal>
    </>
  );
};

export default UserInfo;
