import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import AuthContext from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import { FaSearch, FaPlus, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  // PAGINATION STATE
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // SEARCH & FILTER STATE
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await API.get(`/tasks?page=${page}&limit=6`);
        setTasks(data.tasks);
        setTotalPages(data.pages);
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };
    fetchTasks();
  }, [page]);

  const handleTaskDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const handleEditClick = (task) => {
    navigate(`/task/edit/${task._id}`);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesSearch = 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage your projects and tasks efficiently.</p>
          </div>

          {user.role !== 'admin' && (
            <button 
              onClick={() => navigate('/task/new')}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 font-semibold"
            >
              <FaPlus /> Create Task
            </button>
          )}
        </div>

        {/* Admin Banner */}
        {user.role === 'admin' && (
          <div className="mb-8 bg-linear-to-r from-purple-500 to-indigo-600 text-white p-4 rounded-lg shadow-md">
            <p className="font-bold flex items-center gap-2">
              🛡️ Admin Mode Active: You have full oversight of all system tasks.
            </p>
          </div>
        )}

        {/* Controls Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative grow w-full md:w-auto">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search tasks by title or description..." 
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative w-full md:w-56">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="
              w-full appearance-none bg-white border border-gray-200 
              text-gray-700 py-3 px-4 pr-10 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
              cursor-pointer transition shadow-sm font-medium
            "
          >
            <option value="all" className="font-semibold">All Statuses</option>
            <option value="pending" className="text-yellow-600 font-medium">Pending</option>
            <option value="in-progress" className="text-blue-600 font-medium">In Progress</option>
            <option value="completed" className="text-green-600 font-medium">Completed</option>
          </select>

          {/* Dropdown Arrow */}
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            ▼
          </span>
</div>

        </div>

        {/* Task Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
          {filteredTasks.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-lg font-medium">No tasks found.</p>
              <p className="text-sm">Try adjusting your search or filters.</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard 
                key={task._id} 
                task={task} 
                onDelete={handleTaskDelete}
                onEdit={handleEditClick} 
              />
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-6">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="flex items-center gap-2 px-5 py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm font-medium text-gray-600"
            >
              <FaArrowLeft /> Previous
            </button>
            
            <span className="font-bold text-gray-700 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-md font-medium"
            >
              Next <FaArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;