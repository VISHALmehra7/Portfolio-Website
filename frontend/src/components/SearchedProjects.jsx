import React from "react";
import Header from "./Header";
import { useAuthContext } from "../context/AuthContext";
import Project from "./TopHalf/Project";

const SearchedProjects = () => {
  const { searchedProject } = useAuthContext();
  console.log(searchedProject);
  return (
    <div className="bg-bg-color min-h-screen w-full">
      <Header />
      <div className="flex justify-center items-center flex-wrap p-2 m-2 gap-5 mt-24">
        {searchedProject && searchedProject.length > 0 ? (
          searchedProject.map((projectItem) => (
            <div key={projectItem.projectId} className="hover:shadow-lg hover:shadow-black hover:transition-transform hover:scale-105 hover:duration-500">
              <Project project={projectItem} />
            </div>
          ))
        ) : (
          <h1>No Project Found</h1>
        )}
      </div>
    </div>
  );
};

export default SearchedProjects;
