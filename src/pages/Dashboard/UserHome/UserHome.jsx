import { Link } from 'react-router-dom';
import { FaListAlt, FaCartPlus, FaUserEdit } from 'react-icons/fa';
import CouponSlider from '../../Dashboard/CouponSlider/CouponSlider';
import Statistics from '../Statistics/Statistics';
import Profile from '../Profile/Profile';

const UserHome = ({ user, stats = {}, notifications = [] }) => {
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">{greeting()}, {user?.name || "User"}!</h1>
      <p className="text-gray-600">Here is your personalized dashboard.</p>

      {/* Profile Overview */}
      <div>
        <Profile />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/dashboard/myproducts" className="flex items-center gap-2 bg-blue-500 text-white p-4 rounded shadow">
          <FaListAlt /> My Products
        </Link>
        <Link to="/dashboard/addproduct" className="flex items-center gap-2 bg-green-500 text-white p-4 rounded shadow">
          <FaCartPlus /> Add New Product
        </Link>
        <Link to="/dashboard/profile" className="flex items-center gap-2 bg-gray-700 text-white p-4 rounded shadow">
          <FaUserEdit /> Edit Profile
        </Link>
      </div>

      {/* Statistics */}
      <div>
      <Statistics />
      </div>

      {/* ✅ Coupon Slider Added */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Exclusive Offers For You</h2>
        <CouponSlider />
      </div>

      {/* Notifications */}
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Notifications</h2>
        {notifications.length > 0 ? (
          <ul className="space-y-2">
            {notifications.map((note, idx) => (
              <li key={idx} className="p-2 bg-gray-100 rounded">{note}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No new notifications</p>
        )}
      </div>
    </div>
  );
};

// Reusable StatCard Component
const StatCard = ({ title, value, color }) => {
  return (
      <div className={`rounded-xl shadow-md text-white p-6 ${color}`}>
          <p className="text-lg font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2">{value !== undefined ? value : 0}</p>
      </div>
  );
};

// Example use
<StatCard title="Total Products" value={10} color="bg-gradient-to-r from-indigo-500 to-purple-500" />


export default UserHome;
