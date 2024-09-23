import "./App.css";
import AddProject from "./components/AddProject";
import Home from "./pages/Home/Home";
import ProjectDetails from "./pages/details/ProjectDetails";
import SignUp from "./pages/signup/SignUp";
import Login from "./pages/login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import UploadProjectImage from "./components/UploadProjectImage";
import useTokenExpiration from "./hooks/useTokenExpiration";
import SearchedProjects from "./components/SearchedProjects";
function App() {
  const { authUser } = useAuthContext();
  useTokenExpiration();
  return (
    <div className="w-screen  min-h-screen bg-gray-300">
      <div className="w-[80%] mx-auto shadow-slate-500 shadow-2xl ">
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to={"/"} /> : <Login />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUp /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/addproject"
            element={authUser ? <AddProject /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/UploadProjectImage"
            element={
              authUser ? <UploadProjectImage /> : <Navigate to={"/login"} />
            }
          />
          <Route
            path="/project-item/:id"
            element={authUser ? <ProjectDetails /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/searched-projects"
            element={
              authUser ? <SearchedProjects /> : <Navigate to={"/login"} />
            }
          />
        </Routes>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
