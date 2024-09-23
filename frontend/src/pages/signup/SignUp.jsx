import React, { useState } from "react";
import { Link } from "react-router-dom";
import UseSignup from "../../hooks/UseSignup";

const SignUp = () => {
  const [input, setinput] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    profilePic: null,
    userDescription: "",
  });

  const { loading, signup } = UseSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(input);
  };

  return (
    <div className="w-full min-h-screen bg-auth-bg bg-no-repeat bg-cover flex justify-end items-center">
      <div className=" min-w-96 bg-gray-500  mr-44 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 p-4">
        <h1 className="text-slate-700 text-3xl font-bold text-center">
          SignUp
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-600">
                Full Name
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter full name"
              className="w-full input input-bordered h-10"
              value={input.fullName}
              onChange={(e) => setinput({ ...input, fullName: e.target.value })}
            />
          </div>
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
              value={input.username}
              onChange={(e) => setinput({ ...input, username: e.target.value })}
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
              value={input.password}
              onChange={(e) => setinput({ ...input, password: e.target.value })}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-600">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
              value={input.confirmPassword}
              onChange={(e) =>
                setinput({ ...input, confirmPassword: e.target.value })
              }
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-600">
                About Yourself
              </span>
            </label>
            <textarea
              type="text"
              placeholder="Something about yourself..."
              className="w-full h-35 p-2"
              value={input.userDescription}
              onChange={(e) =>
                setinput({ ...input, userDescription: e.target.value })
              }
            ></textarea>
          </div>

          <Link
            to={"/login"}
            className="text-sm text-slate-700 hover:underline hover:text-blue-600 mt-2  inline-block"
          >
            Already have an account?
          </Link>

          <div className="mb-2">
            <button className="btn btn-block btn-sm mt-2" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
