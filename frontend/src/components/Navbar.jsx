import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { FaTasks, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-linear-to-r from-indigo-600 to-purple-600 shadow-lg text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Area */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-wide hover:text-indigo-100 transition">
          <FaTasks className="text-indigo-200" />
          <span>Task-Manager-RBA</span>
        </Link>
        
        {/* User Actions */}
        <div className="flex gap-6 items-center">
          {user ? (
            <>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm">
                <FaUserCircle className="text-xl" />
                <span className="font-medium">{user.username}</span>
              </div>
              
              <button 
                onClick={handleLogout} 
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition shadow-md font-semibold text-sm"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="bg-white text-indigo-600 px-5 py-2 rounded-full font-bold shadow hover:bg-indigo-50 transition">Login</Link>
              <Link to="/register" className="bg-white text-indigo-600 px-5 py-2 rounded-full font-bold shadow hover:bg-indigo-50 transition">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;