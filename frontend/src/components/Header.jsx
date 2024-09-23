import React from "react";
import { Link, } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";


const Header = () => {
  const { handleLogout ,searchParam,setsearchParam,handleSubmit} = useAuthContext();

  return (
    <nav className="w-full h-16 bg-bg-color flex items-center justify-center gap-16 shadow-gray-300 shadow-lg">
      <div>
        <h1 className="text-black font-sans text-3xl font-semibold mr-36">
          PROTFOLIO WEBSITE
        </h1>
      </div>
      <div>
        <Link to={"/"} className="text-black font-sans text-lg  font-bold">
          HOME
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Search..."
          className="active:border-gray-600 p-2 text-center rounded-lg"
          value={searchParam}
          onChange={(e)=>setsearchParam(e.target.value)}
          />
      </div>
      </form>
      <div>
        <Link
          to={"/addproject"}
          className="text-black font-sans text-lg font-bold"
        >
          ADD PROJECT
        </Link>
      </div>
      <div>
        <button
          onClick={handleLogout}
          href="#"
          className="text-lg text-gray-500 font-bold "
        >
          LOGOUT
        </button>
      </div>
    </nav>
  );
};

export default Header;
