import React from 'react';
import { FaUsersCog, FaChartBar, FaBoxes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="p-6 md:p-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Manage Users */}
        <Link to="/dashboard/manage-users">
          <div className="bg-white shadow-md hover:shadow-xl transition duration-300 p-6 rounded-2xl flex items-center space-x-4">
            <FaUsersCog className="text-4xl text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold">Manage Users</h2>
              <p className="text-sm text-gray-500">View and control user roles</p>
            </div>
          </div>
        </Link>

        {/* Statistics */}
        <Link to="/dashboard/statistics">
          <div className="bg-white shadow-md hover:shadow-xl transition duration-300 p-6 rounded-2xl flex items-center space-x-4">
            <FaChartBar className="text-4xl text-green-600" />
            <div>
              <h2 className="text-xl font-semibold">Statistics</h2>
              <p className="text-sm text-gray-500">Check platform insights</p>
            </div>
          </div>
        </Link>

        {/* Manage Products */}
        <Link to="/dashboard/product-review">
          <div className="bg-white shadow-md hover:shadow-xl transition duration-300 p-6 rounded-2xl flex items-center space-x-4">
            <FaBoxes className="text-4xl text-purple-600" />
            <div>
              <h2 className="text-xl font-semibold">Product Review</h2>
              <p className="text-sm text-gray-500">Approve or reject new products</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
