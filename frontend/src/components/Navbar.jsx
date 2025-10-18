import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import CustomButton from "./CustomButton";
import Logo from "./Logo";
const Navbar = () => {
  const router = useLocation();
  const navigate = useNavigate();

  const logouthandler = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userType");
    navigate("/");
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 shadow-xl px-6 py-4 mb-6 border-b-4 border-blue-300">
      <div className="max-w-7xl flex justify-between items-center mx-auto">
        <div className="flex items-center">
          <Logo size="small" position="static" className="mr-4" />
          <p
            className="font-bold text-2xl flex justify-center items-center cursor-pointer text-white hover:text-blue-100 transition-colors duration-200"
            onClick={() => navigate("/")}
          >
            <span className="mr-2">
              <RxDashboard />
            </span>{" "}
            {router.state && router.state.type} Dashboard
          </p>
        </div>
        <CustomButton
          variant="danger"
          onClick={logouthandler}
          className="!bg-red-500 hover:!bg-red-600 !border-red-500 hover:!border-red-600 !text-white !shadow-lg hover:!shadow-red-500/25"
        >
          Logout
          <span className="ml-2">
            <FiLogOut />
          </span>
        </CustomButton>
      </div>
    </div>
  );
};

export default Navbar;
