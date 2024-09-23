import React, { useEffect, useRef } from "react";
import Projects from "./Projects";
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from "react-icons/bs";

const TopHalf = () => {
  const scrollRef = useRef();
  const noProjects = false;

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -1000,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 1000,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="pt-16 mx-56 min-h-[550px] m-11 rounded-3xl bg-bg-div flex flex-col justify-between shadow-gray-600 shadow-lg hover:shadow-lg hover:shadow-purple-500">
      <div>
        <div className="text-center text-3xl text-white bg-slate-600 rounded-full w-60 mx-auto p-2 shadow-black shadow-lg ">
          <h1 className="tracking-widest  text-white font-bold ">PROJECTS</h1>
        </div>

        <div className="relative mx-8 ">
          <BsArrowLeftCircleFill
            className="left-0 bottom-2 h-8 w-8 shadow-black shadow-2xl rounded-full text-orange-600 active:transition-transform  active:duration-500 active:scale-90"
            onClick={scrollLeft}
            
          />
          <BsArrowRightCircleFill
            className=" absolute right-0 bottom-2 h-8 w-8 shadow-black shadow-2xl rounded-full text-orange-600 active:transition-transform  active:duration-500 active:scale-90"
            onClick={scrollRight}
            
          />
        </div>
        <div className=" h-72 bg-black m-6 p-4 rounded-2xl mb-14 ">
          <div
            ref={scrollRef}
            className="h-full overflow-x-hidden overflow-y-hidden"
          >
            <Projects />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHalf;
