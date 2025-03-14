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
} from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";
import Footer from "../components/Footer";

const Dashboard = () => {
  const [cart] = useCart();
  const [isAdmin, isAdminLoading] = useAdmin();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="bg-white/30 backdrop-blur-lg shadow-md border-b border-gray-200 p-6 sticky top-0 z-50">
        <nav className="flex justify-between items-center">
          <Link to="/" className="text-3xl font-extrabold text-purple-700 tracking-widest">
            Product<span className="text-yellow-500">Hunt</span>
          </Link>
          <div className="space-x-6 text-lg">
            <NavLink to="/" className="hover:text-yellow-500 transition">Home</NavLink>
            <NavLink to="/products" className="hover:text-yellow-500 transition">Products</NavLink>
            <NavLink to="/contact" className="hover:text-yellow-500 transition">Contact</NavLink>
          </div>
        </nav>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 bg-gradient-to-b from-purple-800 to-purple-600 text-white p-6 shadow-xl backdrop-blur-lg rounded-tr-3xl rounded-br-3xl flex flex-col gap-4 overflow-y-auto custom-scrollbar">
          {isAdminLoading ? (
            <div className="text-center mt-10 text-lg font-semibold">Loading Menu...</div>
          ) : (
            <ul className="space-y-4 text-lg">
              {isAdmin ? (
                <>
                  <SidebarItem to="/dashboard/adminHome" icon={<FaHome />} label="Admin Home" />
                  <SidebarItem to="/dashboard/addproduct" icon={<FaUtensils />} label="Add Product" />
                  <SidebarItem to="/dashboard/myproducts" icon={<FaList />} label="Manage Products" />
                  <SidebarItem to="/dashboard/statistics" icon={<FaBook />} label="Statistics" />
                  <SidebarItem to="/dashboard/manage-users" icon={<FaUsers />} label="Manage Users" />
                  <SidebarItem to="/dashboard/manage-coupons" icon={<FaAd />} label="Manage Coupons" />
                </>
              ) : (
                <>
                  <SidebarItem to="/dashboard/userHome" icon={<FaHome />} label="User Home" />
                  <SidebarItem to="/dashboard/profile" icon={<FaUser />} label="Profile" />
                  <SidebarItem to="/dashboard/addproduct" icon={<FaCartPlus />} label="Add Product" />
                  <SidebarItem to="/dashboard/myproducts" icon={<FaListAlt />} label="My Products" />
                </>
              )}

              <div className="border-t border-gray-400 my-4"></div>

              <SidebarItem to="/" icon={<FaHome />} label="Home" />
              <SidebarItem to="/products" icon={<FaSearch />} label="Products" />
              <SidebarItem to="/contact" icon={<FaEnvelope />} label="Contact" />
            </ul>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="bg-white shadow-lg rounded-xl p-8 min-h-[80vh]">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// ✅ Reusable Sidebar Item with Better Style
const SidebarItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
        isActive
          ? "bg-yellow-300 text-black shadow-md"
          : "hover:bg-white/20 hover:shadow hover:translate-x-1"
      }`
    }
  >
    <span className="text-2xl">{icon}</span>
    <span className="font-medium">{label}</span>
  </NavLink>
);

export default Dashboard;
