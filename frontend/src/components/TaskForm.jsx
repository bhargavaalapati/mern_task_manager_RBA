import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../services/api';
import { FaSave, FaArrowLeft, FaHeading, FaAlignLeft, FaTasks, FaChevronDown } from 'react-icons/fa';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams(); 
  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      const fetchTask = async () => {
        try {
          const { data } = await API.get(`/tasks/${id}`);
          setTitle(data.title);
          setDescription(data.description);
          setStatus(data.status);
        } catch {
          alert('Could not fetch task details');
          navigate('/dashboard');
        }
      };
      fetchTask();
    }
  }, [id, isEditMode, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditMode) {
        await API.put(`/tasks/${id}`, { title, description, status });
      } else {
        await API.post('/tasks', { title, description });
      }
      navigate('/dashboard');
    } catch {
      alert('Error saving task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 flex justify-center">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-indigo-600 px-8 py-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            {isEditMode ? <FaTasks /> : <FaSave />} 
            {isEditMode ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button 
            onClick={() => navigate('/dashboard')}
            className="text-indigo-100 hover:text-white hover:bg-indigo-500 p-2 rounded-full transition"
          >
            <FaArrowLeft />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Task Title</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaHeading className="text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white"
                placeholder="e.g., Fix Login Bug"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <FaAlignLeft className="text-gray-400" />
              </div>
              <textarea
                className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white h-32 resize-none"
                placeholder="Add more details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>

          {/* Status Dropdown for Edit Mode */}
          {isEditMode && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Current Status</label>
              <div className="relative">
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-xl leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition cursor-pointer"
                >
                  <option value="pending">⏳ Pending</option>
                  <option value="in-progress">🚧 In Progress</option>
                  <option value="completed">✅ Completed</option>
                </select>
                
                {/* Custom Arrow Icon */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <FaChevronDown />
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button 
              type="button"
              onClick={() => navigate('/dashboard')}
              className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 bg-indigo-600 text-white py-3 font-bold rounded-xl hover:bg-indigo-700 shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 disabled:opacity-50"
            >
              {loading ? 'Saving...' : (isEditMode ? 'Update Task' : 'Create Task')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;