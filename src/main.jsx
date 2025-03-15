import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId="876769036711-0mednp1a6h9imbhp1in9u6j88slipjnb.apps.googleusercontent.com">
          {/* ✅ fallbackElement Added for Hydration Issue */}
          <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
