import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <nav className="space-y-2">
          {/* User Links */}
          <NavLink
            to="/dashboard/user-home"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md font-medium ${
                isActive ? 'bg-yellow-400 text-black' : 'text-white hover:bg-gray-700'
              }`
            }
          >
            User Home
          </NavLink>
          <NavLink
            to="/dashboard/manage-users"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md font-medium ${
                isActive ? 'bg-yellow-400 text-black' : 'text-white hover:bg-gray-700'
              }`
            }
          >
            Manage Users
          </NavLink>
          <NavLink
            to="/dashboard/statistics"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md font-medium ${
                isActive ? 'bg-yellow-400 text-black' : 'text-white hover:bg-gray-700'
              }`
            }
          >
            Statistics
          </NavLink>
          <NavLink
            to="/dashboard/product-review-queue"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md font-medium ${
                isActive ? 'bg-yellow-400 text-black' : 'text-white hover:bg-gray-700'
              }`
            }
          >
            Product Review
          </NavLink>

          {/* Admin Links */}
          <NavLink
            to="/dashboard/admin-home"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md font-medium ${
                isActive ? 'bg-yellow-400 text-black' : 'text-white hover:bg-gray-700'
              }`
            }
          >
            Admin Dashboard
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
