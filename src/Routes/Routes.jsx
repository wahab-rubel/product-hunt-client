import { createBrowserRouter } from 'react-router-dom';

// Layouts
import Main from '../layouts/Main';
import Dashboard from '../layouts/Dashboard';

// Public Pages
import Home from '../pages/Home/Home';
import Products from '../pages/Home/Products';
import Login from '../pages/Login/Login';
import SignUp from '../pages/Login/SignUp';
import NotFound from '../pages/NotFound/NotFound';

// Private & Admin Routes
import PrivateRoute from '../pages/Shared/PrivateRoute';
import AdminRoute from '../pages/Shared/AdminRoute';

// User Dashboard Pages
import UserHome from '../pages/Dashboard/UserHome/UserHome';
import Profile from '../pages/Dashboard/Profile/Profile';
import AddProduct from '../pages/Dashboard/AddProduct/AddProduct';
import MyProducts from '../pages/Dashboard/MyProducts/MyProducts';
import UpdateProduct from '../pages/Dashboard/UpdateProduct/UpdateProduct';

// Admin Dashboard Pages
import AdminHome from '../pages/Dashboard/AdminHome/AdminHome';
import AllUsers from '../pages/Dashboard/AllUsers/AllUsers';
import Statistics from '../pages/Dashboard/Statistics/Statistics';
import ManageUsers from '../pages/Dashboard/ManageUsers/ManageUsers';
import ManageCoupons from '../pages/Dashboard/ManageCoupons/ManageCoupons';
import ProductReviewQueue from '../components/ProductReviewQueue/ProductReviewQueue';
import ContactForm from '../components/ContactForm/ContactForm';

// Moderator Specific
import ModeratorRoute from '../Routes/ModeratorRoute.jsx'; 
import ReportedContents from '../pages/ReportedContents/ReportedContents.jsx'; 

export const router = createBrowserRouter([
  // 🌐 Public Routes
  {
    path: '/',
    element: <Main />,
    children: [
      { index: true, element: <Home /> },
      { 
        path: 'products', 
        element: <Products />,
        loader: () => fetch(`https://product-hunt-server-tawny.vercel.app/products`)
      },
      { path: 'contact', element: <ContactForm /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <SignUp /> },
    ],
  },

  // 🔐 Private Dashboard Routes
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      // ✅ User Dashboard Routes
      { path: 'userHome', element: <UserHome /> },
      { path: 'profile', element: <Profile /> },
      { path: 'addproduct', element: <AddProduct /> },
      { 
        path: 'myproducts', 
        element: <MyProducts />,
        loader: () => fetch(`https://product-hunt-server-tawny.vercel.app/myproducts`) // Assuming user's products
      },
      { 
        path: 'updateproduct/:id', 
        element: <PrivateRoute><UpdateProduct /></PrivateRoute>,
        loader: ({ params }) => fetch(`https://product-hunt-server-tawny.vercel.app/products/${params.id}`) // Single product for update
      },

      // ✅ Admin Dashboard Routes
      { 
        path: 'adminHome', 
        element: <AdminRoute><AdminHome /></AdminRoute> 
      },
      { 
        path: 'users', 
        element: <AdminRoute><AllUsers /></AdminRoute>,
        loader: () => fetch(`https://product-hunt-server-tawny.vercel.app/users`) // All users list
      },

      // ✅ Extra Admin Management Routes
      { 
        path: 'statistics', 
        element: <AdminRoute><Statistics /></AdminRoute>,
        loader: () => fetch(`https://product-hunt-server-tawny.vercel.app/statistics`) // Assuming statistics data
      },
      { 
        path: 'manage-users', 
        element: <AdminRoute><ManageUsers /></AdminRoute>,
        loader: () => fetch(`https://product-hunt-server-tawny.vercel.app/users`) // Manage users
      },
      { 
        path: 'manage-coupons', 
        element: <AdminRoute><ManageCoupons /></AdminRoute>,
        loader: () => fetch(`https://product-hunt-server-tawny.vercel.app/coupons`) // Coupons data
      },
      { 
        path: 'product-review', 
        element: <AdminRoute><ProductReviewQueue /></AdminRoute>,
        loader: () => fetch(`https://product-hunt-server-tawny.vercel.app/product-review`) // Product review queue
      },

      // ✅ Moderator Dashboard Routes
      { 
        path: 'review-queue', 
        element: <ModeratorRoute><ProductReviewQueue /></ModeratorRoute>,
        loader: () => fetch(`https://product-hunt-server-tawny.vercel.app/product-review`) // Same as admin product review
      },
      { 
        path: 'reported-contents', 
        element: <ModeratorRoute><ReportedContents /></ModeratorRoute>,
        loader: () => fetch(`https://product-hunt-server-tawny.vercel.app/reported-contents`) // Reported contents
      },
    ],
  },

  // ❌ 404 Not Found Route
  { path: '*', element: <NotFound /> },
]);
