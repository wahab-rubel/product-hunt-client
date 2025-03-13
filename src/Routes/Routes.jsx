import { createBrowserRouter } from 'react-router-dom';
import Main from '../layouts/Main';
import Home from '../pages/Home/Home';
import Products from '../pages/Home/Products';
import Login from '../pages/Login/Login';
import SignUp from '../pages/Login/SignUp';
import Profile from '../pages/Dashboard/Profile/Profile';
import AllUsers from '../pages/Dashboard/AllUsers/AllUsers';
import UpdateItem from '../pages/Dashboard/UpdateItem/UpdateItem';
import UserHome from '../pages/Dashboard/UserHome/UserHome';
import AdminHome from '../pages/Dashboard/AdminHome/AdminHome';
import PrivateRoute from '../pages/Shared/PrivateRoute';
import AdminRoute from '../pages/Shared/AdminRoute';
import Dashboard from '../layouts/Dashboard';
import NotFound from '../pages/NotFound/NotFound';
import AddProduct from '../pages/Dashboard/AddProduct/AddProduct';
import MyProducts from '../pages/Dashboard/MyProducts/MyProducts';
import UpdateProduct from '../pages/Dashboard/UpdateProduct/UpdateProduct'; 

// ✅ Admin dashboard specific imports
import Statistics from '../pages/Dashboard/Statistics/Statistics';
import ManageUsers from '../pages/Dashboard/ManageUsers/ManageUsers';
import ManageCoupons from '../pages/Dashboard/ManageCoupons/ManageCoupons';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'products', element: <Products /> },
      { path: 'signup', element: <SignUp /> },
    ],
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      // User Routes
      { path: 'userHome', element: <UserHome /> },
      { path: 'profile', element: <Profile /> },
      { path: 'addproduct', element: <AddProduct /> },
      { path: 'myproducts', element: <MyProducts /> },
      { path: 'updateproduct/:id', element: <PrivateRoute><UpdateProduct /></PrivateRoute> }, // ✅ Route added

      // Admin Routes
      { path: 'adminHome', element: <AdminRoute><AdminHome /></AdminRoute> },
      { path: 'updateItem/:id', element: <AdminRoute><UpdateItem /></AdminRoute> },
      { path: 'users', element: <AdminRoute><AllUsers /></AdminRoute> },

      // ✅ Additional Admin Dashboard Routes
      { path: 'statistics', element: <AdminRoute><Statistics /></AdminRoute> },
      { path: 'manage-users', element: <AdminRoute><ManageUsers /></AdminRoute> },
      { path: 'manage-coupons', element: <AdminRoute><ManageCoupons /></AdminRoute> },
    ],
  },
  { path: '*', element: <NotFound /> },
]);
