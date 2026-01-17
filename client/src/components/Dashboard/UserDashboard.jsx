import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(userData);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-carbonx-primary">
                Carbon<span className="text-carbonx-secondary">X</span>
              </h1>
              <p className="text-gray-600">User Dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-carbonx-primary text-white rounded-lg hover:bg-carbonx-primary/90 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome back, <span className="text-carbonx-primary">{user.name}</span>!
          </h2>
          <p className="text-gray-600 mt-2">Here's what's happening with your account.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-carbonx-primary">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-teal-100 text-carbonx-primary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">Profile</h3>
                <p className="text-gray-600">View and edit your profile</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-carbonx-secondary">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-cyan-100 text-carbonx-secondary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">Reports</h3>
                <p className="text-gray-600">Access your reports</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-teal-400">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-teal-50 text-teal-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">Activity</h3>
                <p className="text-gray-600">Recent activities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Content */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-carbonx-primary hover:bg-teal-50 transition">
              <h4 className="font-medium text-gray-800">Update Profile</h4>
              <p className="text-sm text-gray-600 mt-1">Edit your personal information</p>
            </button>
            <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-carbonx-primary hover:bg-teal-50 transition">
              <h4 className="font-medium text-gray-800">View Statistics</h4>
              <p className="text-sm text-gray-600 mt-1">Check your usage statistics</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;