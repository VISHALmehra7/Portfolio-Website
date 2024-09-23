import React, { useState } from "react";
import useAddProject from "../hooks/useAddProject";
import { useAuthContext } from "../context/AuthContext";

const AddProject = () => {
  const { setproject } = useAuthContext();
  const { addProject } = useAddProject();

  const [input, setinput] = useState({
    projectName: "",
    projectDescription: "",
    githubLink: "",
    demoLink: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const data = await addProject(input);
  }

  return (
    <div className="w-full min-h-screen bg-auth-bg bg-no-repeat bg-cover flex justify-end items-center">
      <div className=" min-w-96 bg-gray-500  mr-44 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 p-4">
        <h1 className="text-slate-700 text-3xl font-bold text-center">
          Add PROJECT
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-600">
                Project Name
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter project name"
              className="w-full input input-bordered h-10"
              value={input.projectName}
              onChange={(e) =>
                setinput({ ...input, projectName: e.target.value })
              }
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-600">
                Github Link
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter Github link"
              className="w-full input input-bordered h-10"
              value={input.githubLink}
              onChange={(e) =>
                setinput({ ...input, githubLink: e.target.value })
              }
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-600">
                Demo Link
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter Demo link"
              className="w-full input input-bordered h-10"
              value={input.demoLink}
              onChange={(e) => setinput({ ...input, demoLink: e.target.value })}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-600">
                Project Description
              </span>
            </label>
            <textarea
              placeholder="Enter project description ..."
              className="w-full h-40 p-2"
              value={input.projectDescription}
              onChange={(e) =>
                setinput({ ...input, projectDescription: e.target.value })
              }
            ></textarea>
          </div>

          <div className="mb-2">
            <button className="btn btn-block btn-sm mt-2">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
