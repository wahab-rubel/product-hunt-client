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
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="bg-purple-800 text-white p-6">
        <nav className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-red-500">
            Product-Hunt
          </Link>
          <div className="space-x-4">
            <NavLink to="/" className="hover:text-gray-300">
              Home
            </NavLink>
            <NavLink to="/order/salad" className="hover:text-gray-300">
              Menu
            </NavLink>
            <NavLink to="/order/contact" className="hover:text-gray-300">
              Contact
            </NavLink>
          </div>
        </nav>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-72 min-h-screen bg-purple-800 text-white p-6">
          {isAdminLoading ? (
            <div className="text-center mt-10">
              <p className="text-lg font-semibold">Loading Menu...</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {isAdmin ? (
                // ✅ Admin Menu
                <>
                  <li>
                    <NavLink
                      to="/dashboard/adminHome"
                      className={({ isActive }) =>
                        `flex items-center space-x-3 ${isActive ? "text-yellow-300" : ""}`
                      }
                    >
                      <FaHome className="text-2xl" /> <span>Admin Home</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/addproduct"
                      className={({ isActive }) =>
                        `flex items-center space-x-3 ${isActive ? "text-yellow-300" : ""}`
                      }
                    >
                      <FaUtensils className="text-2xl" /> <span>Add Product</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/myproducts"
                      className={({ isActive }) =>
                        `flex items-center space-x-3 ${isActive ? "text-yellow-300" : ""}`
                      }
                    >
                      <FaList className="text-2xl" /> <span>Manage My Products</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/statistics"
                      className={({ isActive }) =>
                        `flex items-center space-x-3 ${isActive ? "text-yellow-300" : ""}`
                      }
                    >
                      <FaBook className="text-2xl" /> <span>Statistics</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/manage-users"
                      className={({ isActive }) =>
                        `flex items-center space-x-3 ${isActive ? "text-yellow-300" : ""}`
                      }
                    >
                      <FaUsers className="text-2xl" /> <span>Manage Users</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/manage-coupons"
                      className={({ isActive }) =>
                        `flex items-center space-x-3 ${isActive ? "text-yellow-300" : ""}`
                      }
                    >
                      <FaAd className="text-2xl" /> <span>Manage Coupons</span>
                    </NavLink>
                  </li>
                </>
              ) : (
                // ✅ User Menu
                <>
                  <li>
                    <NavLink
                      to="/dashboard/userHome"
                      className={({ isActive }) =>
                        `flex items-center space-x-3 ${isActive ? "text-yellow-300" : ""}`
                      }
                    >
                      <FaHome className="text-2xl" /> <span>User Home</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/profile"
                      className={({ isActive }) =>
                        `flex items-center space-x-3 ${isActive ? "text-yellow-300" : ""}`
                      }
                    >
                      <FaUser className="text-2xl" /> <span>Profile</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/addproduct"
                      className={({ isActive }) =>
                        `flex items-center space-x-3 ${isActive ? "text-yellow-300" : ""}`
                      }
                    >
                      <FaCartPlus className="text-2xl" /> <span>Add Product</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/myproducts"
                      className={({ isActive }) =>
                        `flex items-center space-x-3 ${isActive ? "text-yellow-300" : ""}`
                      }
                    >
                      <FaListAlt className="text-2xl" /> <span>My Products</span>
                    </NavLink>
                  </li>
                </>
              )}

              {/* Divider */}
              <div className="border-t border-gray-400 my-4"></div>

              {/* ✅ Common Menu */}
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center space-x-3 ${isActive ? "text-yellow-300" : ""}`
                  }
                >
                  <FaHome className="text-2xl" /> <span>Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `flex items-center space-x-3 ${isActive ? "text-yellow-300" : ""}`
                  }
                >
                  <FaSearch className="text-2xl" /> <span>Products</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/order/contact"
                  className={({ isActive }) =>
                    `flex items-center space-x-3 ${isActive ? "text-yellow-300" : ""}`
                  }
                >
                  <FaEnvelope className="text-2xl" /> <span>Contact</span>
                </NavLink>
              </li>
            </ul>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
