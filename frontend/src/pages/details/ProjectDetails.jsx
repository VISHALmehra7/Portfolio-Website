import React from "react";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import useProjectDelete from "../../hooks/useProjectDelete";

const ProjectDetails = () => {
  const select = useSelector((state) => state.projectSlice.selectedProject);
  const {deleteProject } = useProjectDelete() 
  const { id } = useParams();
  console.log(id);
  console.log("indetails", select);

  function handleDemoLink(e) {
    if (select.demoLink === "") {
      e.preventDefault();
      toast.error("No Demo Link !!");
    }
  }

  const handleDelete =async()=>{
   await deleteProject(id)
  }


  return (
    <div className="bg-bg-color min-h-screen w-full">
      <Header />
      <div className="flex flex-col justify-center pt-16 ">
        <div className=" mx-56 min-h-[750px] rounded-3xl bg-slate-800 shadow-gray-600 shadow-lg p-3 relative hover:shadow-lg hover:shadow-green-400 ">
          <div className="max-w-[500px]">
            <div className=" bg-red-500 max-w-[450px] h-[450px] m-5 mt-10 rounded-3xl overflow-hidden relative hover:transition-transform hover:duration-700 hover:scale-105">
              <div className="absolute right-0 p-2 m-2">
                <MdDelete size={28} className="text-red-700 cursor-pointer" onClick={handleDelete}/>
              </div>
              <img
                src={`http://localhost:8080/images/${select.projectImage}`}
                alt="project image"
                className="w-full h-full object-cover "
              />
            </div>
            <div className="flex gap-14 justify-center items-center font-medium ">
              <a
                href={`${select.githubLink}`}
                target="_blank"
                className=" 
              text-white text-lg rounded-md p-2 mt-4 border border-gray-200 hover:bg-gray-300 hover:text-black duration-700 active:transition-transform active:duration-300 active:scale-90"
              >
                Github Link
              </a>

              <a
                className=" 
              text-white text-lg rounded-md p-2 mt-4 border border-gray-200 hover:bg-gray-300 hover:text-black duration-700 active:transition-transform active:duration-300 active:scale-90"
                target="_blank"
                onClick={handleDemoLink}
                href={select.demoLink ? `${select.demoLink}` : "#"}
              >
                Demo Link
              </a>
            </div>
          </div>
          <div className="p-2 m-2 lg:w-[650px] sm:w-[200px] md:w-[300px] w-full h-[90%] absolute top-5 right-4 flex flex-col justify-between items-center">
            <div className=" tracking-widest  rounded-lg h-14 p-2 ">
              <h1 className="text-5xl text-center text-white hover:transition-transform hover:duration-500 hover:scale-105">
                {select.projectName}
              </h1>
            </div>
            <div className=" text-white text-2xl my-auto w-full p-2 flex-wrap text-left overflow-auto tracking-wider leading-relaxed ">
              {select.projectDescription}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
