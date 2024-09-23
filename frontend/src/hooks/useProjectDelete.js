import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useProjectDelete = () => {
  const navigate = useNavigate();
  const deleteProject = async (id) => {
    const token = localStorage.getItem("auth-token");
    try {
      const res = await fetch(`/api/project/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.text();
      if (data) {
        console.log(data);
        navigate("/");
        toast.success(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting project");
    }
  };
  return { deleteProject };
};

export default useProjectDelete;
