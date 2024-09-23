import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username,password);
    await login(username, password);
  
    
  };
  return (
    <div className="w-full min-h-screen bg-auth-bg bg-no-repeat bg-cover flex justify-end items-center">
      <div className=" min-w-96 bg-gray-500  mr-44 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 p-4">
        <h1 className="text-slate-700 text-3xl font-bold text-center">Login</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-600">
                Username
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-600">
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full input input-bordered h-10"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <Link
            to={"/signup"}
            className="text-sm text-slate-700 hover:underline hover:text-blue-600 mt-2  inline-block"
          >
            Don't have an account?
          </Link>
          <div className="mb-2">
            <button className="btn btn-block btn-sm mt-2" disabled={loading} >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
