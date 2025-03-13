// DashboardLayout.jsx
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar /> {/* Sidebar with links */}
      <div className="flex-1 p-4">
        <Outlet /> {/* Nested Routes will be shown here */}
      </div>
    </div>
  );
};

export default DashboardLayout;
