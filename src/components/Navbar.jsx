import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

const Navbar = () => {
  const { user, googleSignIn, logOut } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef();

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery.trim()}`);
      setSearchQuery("");
    }
  };

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Google login
  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
      navigate(location.pathname); // Stay on the current page after login
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        scrolled
          ? "backdrop-blur-lg bg-emerald-700/80 shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-purple-600 bg-orange-500 p-4 rounded-lg"
        >
          Product <span className="text-red-600 font-extrabold">Hunt</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-6 font-extrabold">
          <NavLink to="/" className="hover:text-orange-400">
            Home
          </NavLink>
          <NavLink to="/products" className="hover:text-orange-400">
            Products
          </NavLink>
          <NavLink to="/productsform" className="hover:text-orange-400">
            Products Form
          </NavLink>
          {user && (
            <NavLink to="/dashboard" className="hover:text-orange-400">
              Dashboard
            </NavLink>
          )}
          {isAdmin && !isAdminLoading && (
            <NavLink to="/admin/manage-users" className="hover:text-orange-400">
              Admin Panel
            </NavLink>
          )}
        </div>

        {/* Search */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:block relative w-40"
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-red-700/30 placeholder-gray-200 pl-10 pr-4 py-2 rounded-full text-white focus:outline-none focus:ring focus:ring-orange-400"
          />
          <FaSearch className="absolute left-3 top-3 text-white opacity-70" />
        </form>

        {/* Avatar & Menu Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white"
          >
            {mobileMenuOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
          </button>

          {/* User dropdown */}
          <div className="relative" ref={dropdownRef}>
            {user ? (
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="border-2 border-white rounded-full p-1"
              >
                <img
                  src={
                    user.photoURL || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"
                  }
                  alt="User"
                  className="h-10 w-10 rounded-full object-cover"
                />
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-orange-500 px-4 py-2 rounded-full text-white hover:bg-orange-600"
              >
                Login
              </Link>
            )}

            {dropdownOpen && user && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg overflow-hidden z-30">
                <p className="px-4 py-2 text-gray-700 border-b">
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
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cyan-800/90 backdrop-blur-lg text-black py-4">
          <div className="flex flex-col space-y-4 px-6">
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-orange-500"
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-orange-500"
            >
              Products
            </NavLink>
            <NavLink
              to="/productsform"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-orange-500"
            >
              Products Form
            </NavLink>
            {user && (
              <>
                <NavLink
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-orange-500"
                >
                  Dashboard
                </NavLink>
              </>
            )}
            {isAdmin && !isAdminLoading && (
              <NavLink
                to="/admin/manage-users"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-orange-500"
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
                className="text-red-500 text-left"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-orange-500 px-4 py-2 rounded text-white hover:bg-orange-600"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
