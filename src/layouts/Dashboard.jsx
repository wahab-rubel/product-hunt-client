import {
  FaHome,
  FaUtensils,
  FaList,
  FaBook,
  FaUsers,
  FaAd,
  FaSearch,
  FaEnvelope,
  FaUser,
  FaCartPlus,
  FaListAlt,
  FaCheckCircle,
  FaBars,
  FaTimes,
  FaBell,
} from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth"; // Assuming you have a custom hook to get user data

const Dashboard = () => {
  const [cart] = useCart();
  const [isAdmin, isAdminLoading] = useAdmin();
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Sidebar toggle for mobile
  const { user } = useAuth(); // Get logged-in user data

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Navbar */}
      <header className="bg-white/50 backdrop-blur-md shadow-xl border-b border-gray-300 p-4 sticky top-0 z-50 rounded-b-xl mx-4 mt-4">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-extrabold text-purple-700 tracking-wider"
          >
            Product<span className="text-yellow-500">Hunt</span>
          </Link>

          {/* Menu for Desktop */}
          <div className="hidden md:flex space-x-8 items-center text-lg font-semibold">
            <NavLink to="/" className="navlink">
              Home
            </NavLink>
            <NavLink to="/products" className="navlink">
              Products
            </NavLink>
            <NavLink to="/contact" className="navlink">
              Contact
            </NavLink>
            <FaBell className="text-2xl hover:text-yellow-500" />
            <FaCartPlus className="text-2xl hover:text-yellow-500" />
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-purple-500"
              />
            ) : (
              <FaUser className="text-3xl text-purple-700" />
            )}
          </div>

          {/* Hamburger Icon for Mobile */}
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="md:hidden text-3xl text-purple-700"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </nav>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed md:static top-0 left-0 h-full w-72 bg-gradient-to-b from-purple-900 to-purple-700 text-white p-6 shadow-2xl z-40 backdrop-blur-2xl rounded-tr-3xl rounded-br-3xl transform transition-transform duration-300 ease-in-out flex flex-col gap-4 overflow-y-auto custom-scrollbar
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="flex items-center space-x-3 mb-6">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="User"
                className="w-12 h-12 rounded-full border-2 border-yellow-400"
              />
            ) : (
              <FaUser className="w-12 h-12 rounded-full border-2 border-yellow-400 p-2 bg-white text-purple-700" />
            )}
            <div>
              <h3 className="font-bold">
                Hello, {user?.displayName || (isAdmin ? "Admin" : "User")}
              </h3>
              <p className="text-sm opacity-70">
                {isAdmin ? "Admin Panel" : "User Dashboard"}
              </p>
            </div>
          </div>

          {isAdminLoading ? (
            <div className="text-center mt-10 text-lg font-semibold">
              Loading...
            </div>
          ) : (
            <ul className="space-y-3">
              {isAdmin ? (
                <>
                  <SidebarItem
                    to="/dashboard/adminHome"
                    icon={<FaHome />}
                    label="Admin Home"
                  />
                  <SidebarItem
                    to="/dashboard/addproduct"
                    icon={<FaUtensils />}
                    label="Add Product"
                  />
                  <SidebarItem
                    to="/dashboard/myproducts"
                    icon={<FaList />}
                    label="Manage Products"
                  />
                  <SidebarItem
                    to="/dashboard/statistics"
                    icon={<FaBook />}
                    label="Statistics"
                  />
                  <SidebarItem
                    to="/dashboard/manage-users"
                    icon={<FaUsers />}
                    label="Manage Users"
                  />
                  <SidebarItem
                    to="/dashboard/manage-coupons"
                    icon={<FaAd />}
                    label="Manage Coupons"
                  />
                </>
              ) : (
                <>
                  <SidebarItem
                    to="/dashboard/userHome"
                    icon={<FaHome />}
                    label="User Home"
                  />
                  <SidebarItem
                    to="/dashboard/profile"
                    icon={<FaUser />}
                    label="Profile"
                  />
                  <SidebarItem
                    to="/dashboard/addproduct"
                    icon={<FaCartPlus />}
                    label="Add Product"
                  />
                  <SidebarItem
                    to="/dashboard/myproducts"
                    icon={<FaListAlt />}
                    label="My Products"
                  />
                </>
              )}
              <div className="border-t border-gray-400 my-3"></div>
              <SidebarItem to="/" icon={<FaHome />} label="Home" />
              <SidebarItem
                to="/products"
                icon={<FaSearch />}
                label="Products"
              />
              <SidebarItem
                to="/contact"
                icon={<FaEnvelope />}
                label="Contact"
              />
              <SidebarItem
                to="/dashboard/product-review"
                icon={<FaCheckCircle />}
                label="Product Review Queue"
              />
            </ul>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="bg-white shadow-2xl rounded-3xl p-6 md:p-10 min-h-[80vh]">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

const SidebarItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        isActive
          ? "bg-yellow-400/90 text-black shadow-lg"
          : "hover:bg-white/10 hover:translate-x-1"
      }`
    }
  >
    <span className="text-xl">{icon}</span>
    <span className="font-medium">{label}</span>
  </NavLink>
);

export default Dashboard;
