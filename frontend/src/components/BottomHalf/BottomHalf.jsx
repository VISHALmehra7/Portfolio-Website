import React, { useEffect, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { useAuthContext } from "../../context/AuthContext";

const BottomHalf = () => {
  const { authUser, setauthUser} = useAuthContext();
  const target = useRef();

 
  function toggleRef() {
    if (target.current) {
      target.current.click();
    }
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      handleSubmit(file);
    }
  }

  async function handleSubmit(file) {
    const token = localStorage.getItem("auth-token");

    const formdata = new FormData();
    formdata.append("file", file);

    try {
      const res = await fetch(`/api/auth/upload/${authUser.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formdata,
      });
      const data = await res.json();
      localStorage.setItem("auth-user", JSON.stringify(data));
      await setauthUser(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      console.log("error uploading profile picture ", error);
    }
  }

  return (
    <div className="  p-2 max-w-[1300px]  min-h-[350px] flex gap-6 bg-bg-color justify-center items-center relative mx-auto">
      <span className="absolute left-12 top-1 tracking-widest  ">ABOUT ME</span>
      <div className="text-center mt-6 relative rounded-full w-60 shadow-gray-500 shadow-lg">
        <img
          src={`http://localhost:8080/images/${authUser.profilePic}`}
          alt="Upload Profile pic"
          className="rounded-full overflow-hidden border-2 border-red-300 hover:transition-transform hover:scale-105 hover:duration-700 "
        />

        <div className="absolute bottom-0 right-4 w-4 cursor-pointer ">
          <button>
            <MdEdit size={20} color="green" onClick={toggleRef} />
          </button>
          <input
            type="file"
            style={{ display: "none" }}
            onChange={handleImageChange}
            ref={target}
          />
        </div>
      </div>
      <div className="text-center text-balance text-gray-600 font-semibold">{authUser.userDescription}</div>
    </div>
  );
};

export default BottomHalf;
