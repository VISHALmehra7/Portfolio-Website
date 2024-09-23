import React from "react";
import { useDispatch } from "react-redux";
import { selectProject } from "../../store/slices/project-slice";
import { useNavigate } from "react-router-dom";


const Project = ({ project }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSelect() {
    dispatch(selectProject(project));
    navigate(`/project-item/${project.projectId}`);
  }

  return (
    <div className="bg-slate-700 w-96 h-full rounded-2xl flex relative ">
      <div className="overflow-hidden  bg-cover w-full h-64 ">
        <img
          src={`http://localhost:8080/images/${project.projectImage}`}
          className="w-full h-full object-cover overflow-hidden "
        />
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>
      <div className="absolute bottom-3 left-3 m-1 text-center text-gray-200 font-bold ">
        <span className="w-3 h-4  p-2">{project.projectName}</span>
      </div>
      <div className="absolute right-3 bottom-3 text-center  text-gray-200 border border-orange-600 p-2 hover:bg-orange-600 hover:text-white hover:transition-transform duration-500 ">
        <button onClick={handleSelect}>Details</button>
      </div>
    </div>
  );
};

export default Project;
