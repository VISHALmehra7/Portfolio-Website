import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import {useNavigate} from 'react-router-dom'

const UploadProjectImage = () => {
  const { project } = useAuthContext();
  const [file, setFile] = useState(null); 
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !project) {
      console.log("File or project is missing");
      return;
    }

    const token = localStorage.getItem("auth-token");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`/api/project/upload/${project.projectId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.text();
      if(data){
         navigate("/")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-auth-bg bg-no-repeat bg-cover flex justify-end items-center">
      <div className="min-w-96 bg-gray-500 mr-44 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 p-4 flex flex-col justify-center items-center">
        <h1 className="text-slate-800 text-3xl font-bold text-center m-2 p-2">
          Upload Project Image
        </h1>
        <div className="m-2 p-2">
          <img src="" className="w-60 h-60 bg-red-600 rounded-full " />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="m-2 p-2">
            <input
              type="file"
              className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
              onChange={handleFileChange} 
            />
          </div>
          <div className="mb-2">
            <button className="btn btn-block btn-sm mt-2">Upload</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadProjectImage;
