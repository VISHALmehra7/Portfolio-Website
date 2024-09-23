import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setProjects } from "../store/slices/project-slice";
const useGetProjects = () => {
  const [loading, setloading] = useState(false);
  const token = localStorage.getItem("auth-token");
  const dispatch = useDispatch();

  const getLoggedInUserProject = async () => {
    setloading(true);
    try {
      const res = await fetch("/api/project/loggedin-user", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch(setProjects(data));
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  return { getLoggedInUserProject, loading };
};

export default useGetProjects;
