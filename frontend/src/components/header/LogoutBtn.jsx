import React from "react";
import { logout } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import authService from "../../service/auth.service";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(dispatch(logout()));
  };

  return (
    <button
      className="inline-bock px-6 py-2 duration-200 bg-red-500 hover:bg-red-700 rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
