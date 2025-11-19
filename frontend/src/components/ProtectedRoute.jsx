import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // 1. If we are still checking if the user is logged in, show nothing (or a spinner)
  // Note: In our AuthContext, we removed the loading state for speed, 
  // but if you kept it, you would return <div /> here.
  
  // 2. If no user is found, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. If user exists, render the page (children)
  return children;
};

export default ProtectedRoute;