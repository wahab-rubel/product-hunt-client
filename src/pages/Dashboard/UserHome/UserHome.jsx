import { Link } from 'react-router-dom';
import { FaListAlt, FaCartPlus, FaUserEdit } from 'react-icons/fa';
import CouponSlider from '../../Dashboard/CouponSlider/CouponSlider';

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
      <div className="bg-white p-4 rounded shadow-md border hover:shadow-lg transition">
        <h2 className="text-xl font-semibold mb-4">Profile Overview</h2>
        <div className="flex items-center space-x-4">
          <img src={user?.photoURL || 'https://via.placeholder.com/100'} alt="Profile" className="w-20 h-20 rounded-full" />
          <div>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Member Since:</strong> {user?.createdAt?.slice(0, 10)}</p>
          </div>
        </div>
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
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Your Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <StatCard label="Total Products" value={stats.totalProducts} />
          <StatCard label="Sold Products" value={stats.soldProducts} />
          <StatCard label="Total Earnings" value={`$${stats.totalEarnings}`} />
        </div>
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

const StatCard = ({ label, value }) => (
  <div className="p-4 bg-gray-100 rounded">
    <p className="text-2xl font-bold">{value ?? 0}</p>
    <p className="text-gray-600">{label}</p>
  </div>
);

export default UserHome;
