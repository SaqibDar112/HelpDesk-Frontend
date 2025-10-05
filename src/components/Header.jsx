import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = ({ title }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <h1 className="text-2xl font-bold text-white tracking-tight">{title}</h1>
          {user ? (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold text-white">{user.name || "User"}</p>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-label="Logout"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
               <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white">Login</Link>
               <Link to="/register" className="text-sm font-medium px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;