import React from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useAddProject = () => {
  const { authUser, setproject, project } = useAuthContext();
  const navigate = useNavigate();
  const addProject = async ({
    projectName,
    projectDescription,
    githubLink,
    demoLink,
  }) => {
    const success = handleInputErrors({
      projectName,
      projectDescription,
      githubLink,
      demoLink,
    });
    if (!success) return;

    const token = localStorage.getItem("auth-token");
    console.log("authtoken inside addProjedct", token);

    try {
      const res = await fetch(`/api/project/add/${authUser.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectName,
          projectDescription,
          githubLink,
          demoLink,
        }),
      });

      const data = await res.json();
      console.log("project data from backend : ", data);

      setproject(data);
      console.log("This is the data after setproject", data);
      navigate("/UploadProjectImage");

      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return { addProject };
};

export default useAddProject;

function handleInputErrors({
  projectName,
  projectDescription,
  githubLink,
  demoLink,
}) {
  if (!projectName || !projectDescription || !githubLink ) {
    toast.error("Please fill in all the fields");
    return false;
  }
  return true;
}
