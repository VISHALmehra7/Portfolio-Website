import React, { useEffect } from "react";
import Project from "./Project";
import useGetProjects from "../../hooks/useGetProjects";
import { useSelector } from "react-redux";
import { useAuthContext } from "../../context/AuthContext";

const Projects = () => {
  const select = useSelector((state) => state.projectSlice.projects);
 
  const { getLoggedInUserProject, loading } = useGetProjects();
  console.log("reduc in projects : ", select);

  useEffect(() => {
    const fetchProjects = async () => {
      await getLoggedInUserProject();
    };
    fetchProjects();
  }, []);

  return (
    <div className="w-max h-full flex justify-center items-center gap-4  ">
      {!loading && select.length > 0
        ? select.map((project) => (
            <div key={project.projectId}>
              <Project project={project} />
            </div>
          ))
        : <NoProjectUploaded/>}
    </div>
  );
};

export default Projects;

const NoProjectUploaded = () => {
  const {authUser} = useAuthContext();
  return (
    <div className="mt-16 text-center text-4xl tracking-widest ml-80">
      <h1>
        Hi! <span className="text-orange-400">{authUser.fullName}</span>👋
      </h1>
      <h1 className="mt-2">Please add projects to show</h1>
    </div>
  );
};
