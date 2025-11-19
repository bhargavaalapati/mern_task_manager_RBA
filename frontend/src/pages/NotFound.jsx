import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
      <FaExclamationTriangle className="text-6xl text-amber-500 mb-4" />
      
      <h1 className="text-8xl font-black text-gray-200 mb-2">404</h1>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      
      <Link 
        to="/" 
        className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        <FaHome /> Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;