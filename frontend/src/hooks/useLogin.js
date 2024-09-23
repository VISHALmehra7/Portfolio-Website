import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogin = () => {
  const [loading, setloading] = useState(false);
  const { setauthUser } = useAuthContext();

  const login = async (username, password) => {
    const success = handleInputErrors(username, password);
    if (!success) return;

    setloading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      console.log(data.user);
      console.log(data.token);
     if(data && data.user){
       localStorage.setItem("auth-user", JSON.stringify(data.user));
       localStorage.setItem("auth-token", data.token);
       await setauthUser(data.user);
     }else{
      toast.error("Wrong Credentials!!")
     }
    } catch (error) {
      console.log(error);
      toast.error("Login Denied !!");
    } finally {
      setloading(false);
    }
  };
  return { loading, login };
};

export default useLogin;

function handleInputErrors(username, password) {
  if (!username || !password) {
    toast.error("fill in all the fields");
    return false;
  }
  return true;
}
