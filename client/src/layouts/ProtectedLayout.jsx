import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import Navbar from "../components/Navbar/Navbar";

const ProtectedLayout = () => {
  const { isAuthenticated} = useAuth();

  if (!isAuthenticated) return <Navigate to="/Login"/>;

  return (
  <>
  <Navbar/>
  <Outlet/>
  </>
  )
}

export default ProtectedLayout