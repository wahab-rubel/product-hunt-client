import { Outlet, NavLink } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-2xl font-bold">Moderator Panel</h2>
        <nav className="space-y-2">
          <NavLink
            to="/moderator-dashboard/review-queue"
            className={({ isActive }) =>
              isActive ? "text-yellow-400" : "text-white"
            }
          >
            Product Review Queue
          </NavLink>
          <NavLink
            to="/moderator-dashboard/reported-contents"
            className={({ isActive }) =>
              isActive ? "text-yellow-400" : "text-white"
            }
          >
            Reported Contents
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
