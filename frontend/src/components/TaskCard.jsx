import API from '../services/api';
import { FaEdit, FaTrash, FaCalendarAlt, FaUser, FaCheckCircle, FaClock, FaExclamationCircle } from 'react-icons/fa';

const TaskCard = ({ task, onDelete, onEdit }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await API.delete(`/tasks/${task._id}`);
        onDelete(task._id); 
      } catch {
        alert('Failed to delete task');
      }
    }
  };

  // Dynamic styling for badges
  const getStatusConfig = (status) => {
    switch(status) {
      case 'completed': return { color: 'bg-green-100 text-green-700 border-green-200', icon: <FaCheckCircle /> };
      case 'in-progress': return { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: <FaClock /> };
      default: return { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: <FaExclamationCircle /> };
    }
  };

  const statusConfig = getStatusConfig(task.status);

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 p-5 flex flex-col justify-between h-full transform hover:-translate-y-1">
      
      {/* Header: Title & Status */}
      <div>
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-lg text-gray-800 leading-tight truncate pr-2" title={task.title}>
            {task.title}
          </h3>
          <span className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-semibold border ${statusConfig.color}`}>
            {statusConfig.icon}
            <span className="uppercase">{task.status}</span>
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {task.description || "No description provided."}
        </p>
      </div>

      {/* Footer: Metadata & Actions */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex flex-col gap-1 text-xs text-gray-400 mb-4">
          <div className="flex items-center gap-2">
            <FaCalendarAlt />
            <span>{new Date(task.createdAt).toLocaleDateString()}</span>
          </div>
          {task.createdBy?.username && (
            <div className="flex items-center gap-2 text-indigo-400">
              <FaUser />
              <span>By: {task.createdBy.username}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          {user.role !== 'admin' && (
            <button 
              onClick={() => onEdit(task)} 
              className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition text-sm font-medium"
            >
              <FaEdit /> Edit
            </button>
          )}
          
          <button 
            onClick={handleDelete}
            className="flex items-center gap-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition text-sm font-medium"
          >
            <FaTrash /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;