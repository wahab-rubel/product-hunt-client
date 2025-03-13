import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

const Navbar = () => {
  const { user, googleSignIn, logOut } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  // ✅ Google Login Handler
  const handleGoogleLogin = async () => {
    try {
      const result = await googleSignIn();
      console.log("User logged in:", result);
      navigate("/");
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  // ✅ Logout Handler
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 shadow-md border-b border-gray-200 bg-purple-700">
      <div className="flex items-center justify-between px-6 py-4">
        {/* ✅ Logo & Mobile Button */}
        <div className="flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white mr-3"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <Link to="/" className="text-2xl font-extrabold text-orange-500">
            Product-Hunt
          </Link>
        </div>

        {/* ✅ Search Bar (Desktop only) */}
        <div className="hidden lg:flex items-center relative">
          <input
            type="text"
            placeholder="Search Here!"
            className="bg-gray-100 pl-8 pr-4 py-2 rounded-full text-gray-600 w-64 focus:outline-none"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
        </div>

        {/* ✅ Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6 text-white text-lg">
          <NavLink to="/" className="hover:text-red-400">
            Home
          </NavLink>
          <NavLink to="/products" className="hover:text-red-400">
            Products
          </NavLink>
          {user && (
            <NavLink to="/dashboard" className="hover:text-red-400">
              Dashboard
            </NavLink>
          )}
          {isAdmin && !isAdminLoading && (
            <NavLink to="/admin/manage-users" className="hover:text-red-400">
              Admin Panel
            </NavLink>
          )}
        </div>

        {/* ✅ User Dropdown/Profile */}
        <div className="relative" ref={dropdownRef}>
          {user ? (
            <button onClick={() => setDropdownOpen(!dropdownOpen)}>
              <img
                src={user.photoURL || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
                alt="User"
                className="h-10 w-10 rounded-full border-2 border-white"
              />
            </button>
          ) : (
            <button
              onClick={handleGoogleLogin}
              className="bg-orange-500 px-4 py-2 rounded-full text-white hover:bg-orange-600"
            >
              Login
            </button>
          )}

          {/* ✅ Dropdown Menu */}
          {dropdownOpen && user && (
            <div className="absolute right-0 bg-white shadow-lg rounded w-48 mt-2 z-20">
              <p className="px-4 py-2 border-b text-gray-700">
                {user.displayName || "User"}
              </p>
              <NavLink
                to="/dashboard"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Dashboard
              </NavLink>
              {isAdmin && !isAdminLoading && (
                <NavLink
                  to="/admin/manage-users"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Admin Panel
                </NavLink>
              )}
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ✅ Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white text-black shadow-md">
          <div className="flex flex-col space-y-4 p-4">
            <NavLink
              to="/"
              className="hover:text-red-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className="hover:text-red-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </NavLink>
            {user && (
              <>
                <NavLink
                  to="/dashboard"
                  className="hover:text-red-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/dashboard/mycart"
                  className="hover:text-red-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Cart
                </NavLink>
              </>
            )}
            {isAdmin && !isAdminLoading && (
              <NavLink
                to="/admin/manage-users"
                className="hover:text-red-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin Panel
              </NavLink>
            )}
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="text-red-500 hover:underline text-left"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  handleGoogleLogin();
                  setMobileMenuOpen(false);
                }}
                className="bg-orange-500 px-4 py-2 rounded text-white hover:bg-orange-600"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
