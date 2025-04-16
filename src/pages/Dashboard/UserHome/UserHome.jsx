import { Link } from "react-router-dom";
import { FaListAlt, FaCartPlus, FaUserEdit } from "react-icons/fa";
import CouponSlider from "../../Dashboard/CouponSlider/CouponSlider";
import Statistics from "../Statistics/Statistics";
import Profile from "../Profile/Profile";

const UserHome = ({ user, stats = {}, notifications = [] }) => {
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="px-4 md:px-8 lg:px-16 py-6 space-y-8">
      <h1 className="text-3xl font-bold">
        {greeting()}, {user?.name || "User"}!
      </h1>
      <p className="text-gray-600">Here is your personalized dashboard.</p>

      {/* Profile & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Profile />
        <Statistics />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Link
          to="/dashboard/my-products"
          className="flex items-center justify-center gap-2 bg-blue-500 text-white p-4 rounded shadow"
        >
          <FaListAlt /> My Products
        </Link>

        <Link
          to="/dashboard/add-product"
          className="flex items-center justify-center gap-2 bg-green-500 text-white p-4 rounded shadow"
        >
          <FaCartPlus /> Add New Product
        </Link>

        <Link
          to="/dashboard/profile"
          className="flex items-center justify-center gap-2 bg-gray-700 text-white p-4 rounded shadow"
        >
          <FaUserEdit /> Edit Profile
        </Link>
      </div>

      {/* Coupon Slider */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Exclusive Offers For You</h2>
        <CouponSlider />
      </div>

      {/* Notifications */}
      <div className="bg-white p-4 rounded shadow-md mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Notifications</h2>
        {notifications.length > 0 ? (
          <ul className="space-y-3">
            {notifications.map((note, idx) => (
              <li key={idx} className="p-3 bg-gray-100 rounded">
                {note}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No new notifications</p>
        )}
      </div>
    </div>
  );
};

export default UserHome;
