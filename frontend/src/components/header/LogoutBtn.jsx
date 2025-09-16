import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../service/auth.service";
import { logout } from "../../app/authSlice";

export const LogoutBtn = () => {
  const dispatch = useDispatch();
  
  
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  
  return (
    <button
      onClick={logoutHandler}
      className="bg-red-600 dark:bg-red-700 text-white font-medium px-6 py-2 rounded-lg shadow-md 
                 hover:bg-red-700 dark:hover:bg-red-800 transition-colors"
    >
      Logout
    </button>
  );
};
