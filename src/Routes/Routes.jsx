import { createBrowserRouter } from 'react-router-dom';

// Layouts
import Main from '../layouts/Main';
import DashboardLayout from '../layouts/Dashboard';

// Public Pages
import Home from '../pages/Home/Home';
import Products from '../pages/Home/Products';
import Login from '../pages/Login/Login';
import SignUp from '../pages/Login/SignUp';
import NotFound from '../pages/NotFound/NotFound';
import ProductDetails from '../pages/ProductDetails/ProductDetails';

// Route Guards
import PrivateRoute from '../pages/Shared/PrivateRoute';
import AdminRoute from '../pages/Shared/AdminRoute';
import ModeratorRoute from '../Routes/ModeratorRoute.jsx';

// User Dashboard Pages
import UserHome from '../pages/Dashboard/UserHome/UserHome';
import Profile from '../pages/Dashboard/Profile/Profile';
import AddProduct from '../pages/Dashboard/AddProduct/AddProduct';
import MyProducts from '../pages/Dashboard/MyProducts/MyProducts';
import UpdateProduct from '../pages/Dashboard/UpdateProduct/UpdateProduct';
import MembershipPayment from '../pages/MembershipPayment/MembershipPayment.jsx';

// Admin Dashboard Pages
import AdminHome from '../pages/Dashboard/AdminHome/AdminHome';
import AllUsers from '../pages/Dashboard/AllUsers/AllUsers';
import Statistics from '../pages/Dashboard/Statistics/Statistics';
import ManageUsers from '../pages/Dashboard/ManageUsers/ManageUsers';
import ManageCoupons from '../pages/Dashboard/ManageCoupons/ManageCoupons';
import AgolorPage from '../pages/Admin/AgolorPage.jsx';

// Moderator Pages
import ProductReviewQueue from '../pages/ProductReviewQueue/ProductReviewQueue.jsx';
import ReportedContents from '../pages/ReportedContents/ReportedContents.jsx';

// Common Components
import ContactForm from '../components/ContactForm/ContactForm';
import ProductForm from '../components/ProductForm/ProductForm.jsx';
import ProductsPage from '../components/ProductsPage/ProductsPage.jsx';


// ✅ Loader Function
const productsLoader = async () => {
  try {
    const res = await fetch(`products.json`);
    if (!res.ok) throw new Error('Failed to load products');
    return res.json();
  } catch (error) {
    console.error('Products loading error:', error);
    return [];
  }
};

// ✅ Router Configuration
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products />, loader: productsLoader },
      { path: "contact", element: <ContactForm /> },
      { path: "productsform", element: <ProductForm /> },
      { path: "agolorpage", element: <AgolorPage /> }, // ✅ NEW ROUTE ADDED
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "product/:id", element: <PrivateRoute><ProductDetails /></PrivateRoute> },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      // User Routes
      { path: "user-home", element: <UserHome /> },
      { path: "profile", element: <Profile /> },
      { path: "profile/subscribe", element: <MembershipPayment /> },
      { path: "addproduct", element: <AddProduct /> },
      { path: "myproducts", element: <MyProducts /> },
      { path: "update-product/:id", element: <UpdateProduct /> },
      { path: "productpage", element: <ProductsPage /> },

      // Admin Routes
      { path: "admin-home", element: <AdminRoute><AdminHome /></AdminRoute> },
      { path: "users", element: <AdminRoute><AllUsers /></AdminRoute> },
      { path: "statistics", element: <AdminRoute><Statistics /></AdminRoute> },
      { path: "manage-users", element: <AdminRoute><ManageUsers /></AdminRoute> },
      { path: "manage-coupons", element: <AdminRoute><ManageCoupons /></AdminRoute> },

      // Moderator Routes
      { path: "productreviewqueue", element: <ModeratorRoute><ProductReviewQueue /></ModeratorRoute> },
      { path: "reported-contents", element: <ModeratorRoute><ReportedContents /></ModeratorRoute> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);