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
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dropdownRef = useRef();

  // ✅ Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/products?search=${searchQuery.trim()}`);
      setSearchQuery(""); // Optional: Clear search after navigating
    }
  };

  // ✅ Scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Login & Logout handlers
  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);
    }
  };
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        scrolled ? "backdrop-blur-md bg-purple-800/70 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-orange-400">
          ProductHunt
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          <NavLink to="/" className="text-white hover:text-orange-400">Home</NavLink>
          <NavLink to="/products" className="text-white hover:text-orange-400">Products</NavLink>
          {user && <NavLink to="/dashboard" className="text-white hover:text-orange-400">Dashboard</NavLink>}
          {isAdmin && !isAdminLoading && (
            <NavLink to="/admin/manage-users" className="text-white hover:text-orange-400">
              Admin Panel
            </NavLink>
          )}
        </div>

        {/* ✅ Search Input */}
        <form onSubmit={handleSearchSubmit} className="hidden lg:block relative">
          <input
            type="text"
            placeholder="Search here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white/20 placeholder-gray-300 pl-10 pr-4 py-2 rounded-full text-white focus:outline-none focus:ring focus:ring-orange-400"
          />
          <FaSearch className="absolute left-3 top-3 text-white opacity-70" />
        </form>

        {/* Avatar & Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white"
          >
            {mobileMenuOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
          </button>

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            {user ? (
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="border-2 border-white rounded-full p-1"
              >
                <img
                  src={user.photoURL || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
                  alt="User"
                  className="h-10 w-10 rounded-full object-cover shadow-md"
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

            {/* Dropdown Menu */}
            {dropdownOpen && user && (
              <div className="absolute right-0 mt-2 w-52 bg-white shadow-xl rounded-lg overflow-hidden z-30 animate-slideIn">
                <p className="px-4 py-2 text-gray-700 border-b">{user.displayName || "User"}</p>
                <NavLink to="/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</NavLink>
                {isAdmin && !isAdminLoading && (
                  <NavLink to="/admin/manage-users" className="block px-4 py-2 hover:bg-gray-100">Admin Panel</NavLink>
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

      {/* ✅ Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/90 backdrop-blur-md text-black py-4">
          <div className="flex flex-col space-y-4 px-6">
            <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-500">Home</NavLink>
            <NavLink to="/products" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-500">Products</NavLink>
            {user && (
              <>
                <NavLink to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-500">Dashboard</NavLink>
                <NavLink to="/dashboard/mycart" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-500">My Cart</NavLink>
              </>
            )}
            {isAdmin && !isAdminLoading && (
              <NavLink to="/admin/manage-users" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-500">Admin Panel</NavLink>
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
