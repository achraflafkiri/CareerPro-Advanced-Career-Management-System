import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import Sidebar from "../components/inc/Sidebar";
import Navbar from "../components/inc/Navbar";


const DefaultLayout = ({ handleNavToggle, isLinkActive, isID }) => {
  const { user, token, setUser, setToken } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar handleNavToggle={handleNavToggle} />
      <div className="container-fluid page-body-wrapper">
        <Sidebar isLinkActive={isLinkActive} isID={isID} />
        <div className="main-panel">
          <div className="content-wrapper">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
