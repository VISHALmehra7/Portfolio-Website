import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import {useNavigate} from 'react-router-dom'

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate()
  const [authUser, setauthUser] = useState(
    JSON.parse(localStorage.getItem("auth-user")) || null
  );
  const [project, setproject] = useState(null);


  //STATES RELATED FOR SEARCHING PROJECTS
  const [searchParam, setsearchParam] = useState("");
  const [searchedProject, setsearchedProject] = useState([]);
  const [loading, setloading] = useState(false);


  // HANDLE FOR LOGOUT 
  const handleLogout = () => {
    localStorage.removeItem("auth-user");
    localStorage.removeItem("auth-token");
    setauthUser(null);
    toast.success("Logged out succesfully");
  };



  //HANDLE FOR SEARCHIN PROJECTS OF USERS BY NAME

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("auth-token");
    setloading(true);
    try {
      e.preventDefault();
      const res = await fetch(`/api/project/search/${searchParam}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data) {
        setsearchedProject(data);
        setsearchParam("");
        navigate("/searched-projects")
      }
    
      
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setauthUser,
        setproject,
        project,
        handleLogout,
        searchParam,
        setsearchParam,
        handleSubmit,
        loading,
        searchedProject
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
