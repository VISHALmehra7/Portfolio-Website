import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UseSignup = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    profilePic,
    userDescription
  }) => {
    const success = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      profilePic,
      userDescription
    });
    if (!success) return;

    setloading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          userDescription
        }),
      });
      const data = await res.json();
      if(data){
        toast.success("SignUp successfull")
      }
      navigate("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  return { loading, signup };
};

export default UseSignup;

function handleInputErrors({ fullName, username, password, confirmPassword,userDescription }) {
  if (!fullName || !username || !password || !confirmPassword||!userDescription) {
    toast.error("Please fill all the fields");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }
  if (password.length < 6) {
    toast.error("password length must be at least 6 characters ");
  }
  return true;
}
