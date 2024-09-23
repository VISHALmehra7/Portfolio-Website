import React, { useEffect } from "react";
import {  jwtDecode }  from "jwt-decode";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useTokenExpiration = () => {
  const { handleLogout } = useAuthContext();

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          handleLogout();
          toast.success("Session Timed Out !!!")
        } else {
          const timeOutDuration = (decodedToken.exp - currentTime) * 1000;
          const timeOut = setTimeout(() => {
            handleLogout();
            toast.success("Session Timed Out !!!")
          }, timeOutDuration);
          return ()=> clearTimeout(timeOut);
        }
      } catch (error) {
        console.log("error in useTokenExpiration");
        handleLogout()
        
        
      }
    }
  }, [handleLogout]);
};

export default useTokenExpiration;
