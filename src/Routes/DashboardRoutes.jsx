import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import DashboardLayout from "../components/DashboardLayout";
import Statistics from "../pages/Dashboard/Statistics";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import ManageCoupons from "../pages/Dashboard/ManageCoupons";

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route path="statistics" element={<Statistics />} />
        <Route path="manage-users" element={<ManageUsers />} />
        <Route path="manage-coupons" element={<ManageCoupons />} />
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
