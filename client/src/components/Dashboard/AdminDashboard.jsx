import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calculator from './Calculator';
import { toast } from 'react-hot-toast';
import {
  Home,
  Users,
  Calculator as CalculatorIcon,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Database,
  FileText,
  Bell,
  Search,
  Upload,
  Download,
  CheckCircle,
  AlertCircle,
  Calendar,
  Globe,
  Shield,
  TrendingUp,
  UserCircle,
  Building,
  FolderOpen,
  Target,
  ChevronRight,
  Filter,
  MoreVertical
} from 'lucide-react';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications] = useState(3);
  const [formData, setFormData] = useState({
    entityName: "",
    industry: "",
    standard: "",
    country: "India"
  });
  const [savedEntities, setSavedEntities] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData || userData.role !== 'admin') {
      toast.error('Access denied. Admin only.');
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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveEntity = () => {
    if (formData.entityName && formData.industry && formData.standard) {
      setSavedEntities(prev => [...prev, { 
        ...formData, 
        id: Date.now(), 
        date: new Date().toLocaleDateString() 
      }]);
      setShowSuccess(true);
      toast.success('Entity saved successfully!');
      setTimeout(() => setShowSuccess(false), 3000);
      setFormData({ entityName: "", industry: "", standard: "", country: "India" });
    } else {
      toast.error('Please fill all required fields');
    }
  };

  const stats = [
    { label: "Total Users", value: "1,234", icon: Users, color: "#3b82f6", trend: "+12%" },
    { label: "Entities Registered", value: savedEntities.length + 42, icon: Database, color: "#10b981", trend: "+8%" },
    { label: "Reports Generated", value: "24", icon: FileText, color: "#8b5cf6", trend: "+5%" },
    { label: "Compliance Score", value: "94%", icon: Shield, color: "#f59e0b", trend: "+2%" }
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'calculator', label: 'Calculator', icon: CalculatorIcon },
    { id: 'entities', label: 'Entities', icon: Building },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-gray-100"
          >
            {sidebarOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
          <h1 className="text-xl font-bold text-carbonx-primary">
            Carbon<span className="text-carbonx-secondary">X</span>
          </h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-600" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-carbonx-primary to-carbonx-secondary flex items-center justify-center text-white font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
<aside
  className={`
    fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl
    transform transition-transform duration-300
    lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    overflow-hidden
  `}
>
  <div className="h-full flex flex-col">
    <div className="p-6 border-b flex-shrink-0">
      <h1 className="text-2xl font-bold text-carbonx-primary">
        Carbon<span className="text-carbonx-secondary">X</span>
      </h1>
      <p className="text-sm text-gray-600 mt-1">Admin Panel</p>
    </div>

   
    <div className="p-6 border-b flex-shrink-0">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-carbonx-primary to-carbonx-secondary flex items-center justify-center text-white font-bold">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="ml-4">
          <h3 className="font-semibold text-gray-800">{user.name}</h3>
          <p className="text-sm text-gray-600 capitalize">{user.role}</p>
        </div>
      </div>
    </div>

    <div className="flex-1 overflow-y-auto">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center px-4 py-3 rounded-lg transition
                  ${activeTab === item.id
                    ? "bg-gradient-to-r from-carbonx-primary/10 to-carbonx-secondary/10 text-carbonx-primary border-l-4 border-carbonx-primary"
                    : "text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4">
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <Shield className="w-6 h-6 text-blue-600" />
          <h3 className="text-sm font-semibold text-gray-800 mt-2">
            BRSR Certified
          </h3>
          <p className="text-xs text-gray-600 mt-1">
            India ESG Compliance Ready
          </p>
        </div>
      </div>

    </div>
    <div className="p-4 border-t bg-white flex-shrink-0">
      <button
        onClick={handleLogout}
        className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition"
      >
        <LogOut className="w-5 h-5 mr-3" />
        Logout
      </button>
    </div>

  </div>
</aside>

{sidebarOpen && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
    onClick={() => setSidebarOpen(false)}
  />
)}

      <main className="lg:ml-64 pt-16 lg:pt-0">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 capitalize">
                  {activeTab === 'entities' ? 'Entity Onboarding' : activeTab.replace('-', ' ')}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {activeTab === 'entities' 
                    ? 'Configure and register new entities for ESG compliance tracking'
                    : 'Manage your application efficiently'
                  }
                </p>
              </div>
              <div className="flex items-center space-x-6">
                <div className="hidden lg:flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search entities, reports..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carbonx-primary focus:border-transparent w-64"
                    />
                  </div>
                  <div className="relative">
                    <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {notifications}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="hidden lg:block text-right">
                    <p className="text-sm font-medium text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-600 capitalize">{user.role}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-carbonx-primary to-carbonx-secondary flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6">
          {activeTab === 'dashboard' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:border-carbonx-primary transition">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                        <div className="flex items-baseline">
                          <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                          <span className="ml-2 text-xs font-medium text-green-600">{stat.trend}</span>
                        </div>
                      </div>
                      <div className={`p-3 rounded-lg`} style={{ backgroundColor: `${stat.color}20` }}>
                        <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Welcome Card */}
              <div className="bg-gradient-to-r from-carbonx-primary to-carbonx-secondary rounded-2xl shadow-xl p-8 text-white mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-4">
                      Welcome to CarbonX Admin Panel
                    </h1>
                    <p className="opacity-90">
                      Manage your application efficiently with our comprehensive admin tools.
                    </p>
                  </div>
                  <UserCircle className="w-16 h-16 opacity-20" />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">Quick Actions</h3>
                  <MoreVertical className="w-5 h-5 text-gray-400 cursor-pointer" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button 
                    onClick={() => setActiveTab('entities')}
                    className="p-4 border border-gray-200 rounded-lg hover:border-carbonx-primary hover:bg-teal-50 transition text-left group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 bg-carbonx-primary/10 rounded-lg">
                        <Building className="w-6 h-6 text-carbonx-primary" />
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-carbonx-primary" />
                    </div>
                    <h4 className="font-medium text-gray-800">Entity Onboarding</h4>
                    <p className="text-sm text-gray-600 mt-1">Register new ESG entities</p>
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab('calculator')}
                    className="p-4 border border-gray-200 rounded-lg hover:border-carbonx-primary hover:bg-teal-50 transition text-left group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 bg-carbonx-primary/10 rounded-lg">
                        <CalculatorIcon className="w-6 h-6 text-carbonx-primary" />
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-carbonx-primary" />
                    </div>
                    <h4 className="font-medium text-gray-800">Special Calculator</h4>
                    <p className="text-sm text-gray-600 mt-1">Access special calculator</p>
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab('users')}
                    className="p-4 border border-gray-200 rounded-lg hover:border-carbonx-primary hover:bg-teal-50 transition text-left group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 bg-carbonx-primary/10 rounded-lg">
                        <Users className="w-6 h-6 text-carbonx-primary" />
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-carbonx-primary" />
                    </div>
                    <h4 className="font-medium text-gray-800">User Management</h4>
                    <p className="text-sm text-gray-600 mt-1">Manage user accounts</p>
                  </button>
                  
                  <button className="p-4 border border-gray-200 rounded-lg hover:border-carbonx-primary hover:bg-teal-50 transition text-left group">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 bg-carbonx-primary/10 rounded-lg">
                        <BarChart3 className="w-6 h-6 text-carbonx-primary" />
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-carbonx-primary" />
                    </div>
                    <h4 className="font-medium text-gray-800">View Reports</h4>
                    <p className="text-sm text-gray-600 mt-1">Generate system reports</p>
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">Recent Activities</h3>
                    <Filter className="w-5 h-5 text-gray-400 cursor-pointer" />
                  </div>
                  <div className="space-y-4">
                    {[
                      { icon: CheckCircle, text: "New entity registered", time: "2 min ago", color: "green" },
                      { icon: Users, text: "User account created", time: "15 min ago", color: "blue" },
                      { icon: FileText, text: "Report generated", time: "1 hour ago", color: "purple" },
                      { icon: Database, text: "Data sync completed", time: "2 hours ago", color: "teal" }
                    ].map((activity, idx) => (
                      <div key={idx} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition">
                        <div className={`p-2 rounded-lg mr-4`} style={{ backgroundColor: `${activity.color === 'green' ? '#10b98120' : activity.color === 'blue' ? '#3b82f620' : activity.color === 'purple' ? '#8b5cf620' : '#14b8a620'}` }}>
                          <activity.icon className="w-5 h-5" style={{ color: activity.color === 'green' ? '#10b981' : activity.color === 'blue' ? '#3b82f6' : activity.color === 'purple' ? '#8b5cf6' : '#14b8a6' }} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">{activity.text}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">System Status</h3>
                    <Target className="w-5 h-5 text-carbonx-primary" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Server Uptime</span>
                        <span className="font-semibold text-green-600">99.8%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.8%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Database Performance</span>
                        <span className="font-semibold text-blue-600">97.5%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '97.5%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">API Response Time</span>
                        <span className="font-semibold text-purple-600">42ms</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'users' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">User Management</h3>
                  <p className="text-sm text-gray-600 mt-1">Manage user accounts and permissions</p>
                </div>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </button>
                  <button className="px-4 py-2 bg-carbonx-primary text-white rounded-lg hover:bg-carbonx-primary/90 flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Add User
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <UserCircle className="w-5 h-5 text-blue-600" />
                          </div>
                          <span>John Doe</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">john@example.com</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          Admin
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-carbonx-primary hover:text-carbonx-primary/80">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                            <UserCircle className="w-5 h-5 text-gray-600" />
                          </div>
                          <span>Jane Smith</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">jane@example.com</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                          User
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-carbonx-primary hover:text-carbonx-primary/80">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'calculator' && <Calculator />}
          
          {activeTab === 'entities' && (
            <div className="space-y-6">
              {showSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <div>
                      <h4 className="text-sm font-semibold text-green-800">Entity saved successfully!</h4>
                      <p className="text-sm text-green-600 mt-1">Your entity has been registered in the system.</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Entity Data Onboarding</h2>
                    <p className="text-gray-600 mt-1">Configure and register new entities for ESG compliance tracking</p>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center">
                      <Upload className="w-5 h-5 mr-2" />
                      Import
                    </button>
                    <button className="px-4 py-2 bg-carbonx-primary text-white rounded-lg hover:bg-carbonx-primary/90 flex items-center">
                      <Download className="w-5 h-5 mr-2" />
                      Export
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <Target className="w-5 h-5 text-blue-600 inline-block mr-2" />
                      <h3 className="text-lg font-semibold text-gray-800 inline">Objective</h3>
                      <p className="text-gray-600 mt-2">Define and register entities with comprehensive ESG metadata for streamlined compliance tracking and reporting.</p>
                    </div>

                    <div className="space-y-6">
                      {/* Entity Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Entity Name
                        </label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Enter legal entity name"
                            value={formData.entityName}
                            onChange={(e) => handleInputChange("entityName", e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carbonx-primary focus:border-transparent"
                          />
                        </div>
                      </div>

                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Industry Sector
                        </label>
                        <div className="relative">
                          <BarChart3 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <select
                            value={formData.industry}
                            onChange={(e) => handleInputChange("industry", e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carbonx-primary focus:border-transparent"
                          >
                            <option value="">Select option</option>
                            <option>Energy & Utilities</option>
                            <option>Manufacturing</option>
                            <option>Transportation & Logistics</option>
                            <option>Agriculture & Food</option>
                            <option>Technology & Software</option>
                            <option>Financial Services</option>
                            <option>Healthcare</option>
                            <option>Retail & Consumer</option>
                          </select>
                        </div>
                      </div>

      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Applicable ESG / BRSR Standard
                        </label>
                        <div className="relative">
                          <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <select
                            value={formData.standard}
                            onChange={(e) => handleInputChange("standard", e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carbonx-primary focus:border-transparent"
                          >
                            <option value="">Select option</option>
                            <option>BRSR (India)</option>
                            <option>GRI Standards</option>
                            <option>SASB</option>
                            <option>TCFD</option>
                            <option>CDP</option>
                            <option>DJSI</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country / Region
                        </label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <select
                            value={formData.country}
                            onChange={(e) => handleInputChange("country", e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carbonx-primary focus:border-transparent"
                          >
                            <option>India</option>
                            <option>United States</option>
                            <option>United Kingdom</option>
                            <option>European Union</option>
                            <option>Singapore</option>
                            <option>Australia</option>
                          </select>
                        </div>
                      </div>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex">
                          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
                          <div>
                            <h4 className="text-sm font-semibold text-yellow-800 mb-2">BRSR Compliance Overview</h4>
                            <p className="text-sm text-yellow-700">
                              Business Responsibility and Sustainability Reporting is mandatory for Indian listed entities with specific market cap thresholds.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-4 pt-4">
                        <button
                          onClick={() => setFormData({ entityName: "", industry: "", standard: "", country: "India" })}
                          className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center justify-center"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveEntity}
                          className="flex-1 px-6 py-3 bg-gradient-to-r from-carbonx-primary to-carbonx-secondary text-white rounded-lg hover:opacity-90 transition shadow-lg flex items-center justify-center"
                        >
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Save & Continue
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Recent Entities</h3>
                      <FolderOpen className="w-5 h-5 text-carbonx-primary" />
                    </div>
                    
                    {savedEntities.length === 0 ? (
                      <div className="text-center py-8">
                        <Database className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-sm">No entities registered yet</p>
                        <p className="text-gray-400 text-xs mt-2">Start by filling the form on the left</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {savedEntities.slice(-5).reverse().map((entity) => (
                          <div key={entity.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-carbonx-primary transition group">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium text-gray-800 text-sm">{entity.entityName}</h4>
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            </div>
                            <p className="text-xs text-gray-600 mb-3">{entity.industry}</p>
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-gray-500">{entity.date}</span>
                              <span className="font-medium text-carbonx-primary bg-carbonx-primary/10 px-2 py-1 rounded">
                                {entity.standard}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Calendar className="w-8 h-8 text-green-600" />
                      <TrendingUp className="w-6 h-6 text-green-500" />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Next Deadline</h4>
                    <p className="text-xs text-gray-600 mb-1">BRSR Annual Report</p>
                    <p className="text-xl font-bold text-green-600">March 31, 2026</p>
                    <div className="mt-4 pt-4 border-t border-green-200">
                      <div className="flex items-center text-xs text-gray-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span>On track for submission</span>
                      </div>
                    </div>
                  </div>

             
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-800 mb-4">Registration Stats</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">This Month</span>
                          <span className="font-semibold text-carbonx-primary">+{savedEntities.length}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-carbonx-primary h-2 rounded-full" style={{ width: `${Math.min(savedEntities.length * 20, 100)}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Total Entities</span>
                          <span className="font-semibold text-gray-800">{savedEntities.length + 42}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-gray-800 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Analytics Dashboard</h3>
                  <p className="text-sm text-gray-600 mt-1">Track system performance and user engagement</p>
                </div>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    Last 7 days
                  </button>
                  <button className="px-4 py-2 bg-carbonx-primary text-white rounded-lg hover:bg-carbonx-primary/90">
                    Generate Report
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-64 bg-gray-50 rounded-lg flex flex-col items-center justify-center p-8">
                  <BarChart3 className="w-12 h-12 text-gray-300 mb-4" />
                  <p className="text-gray-500">Engagement Metrics Chart</p>
                  <p className="text-gray-400 text-sm mt-2">(Chart visualization will appear here)</p>
                </div>
                <div className="h-64 bg-gray-50 rounded-lg flex flex-col items-center justify-center p-8">
                  <TrendingUp className="w-12 h-12 text-gray-300 mb-4" />
                  <p className="text-gray-500">Growth Trends</p>
                  <p className="text-gray-400 text-sm mt-2">(Trend analysis will appear here)</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <Settings className="w-6 h-6 text-carbonx-primary mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">Settings</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 border border-gray-200 rounded-lg hover:border-carbonx-primary transition cursor-pointer">
                  <div className="p-2 bg-blue-100 rounded-lg w-fit mb-4">
                    <Globe className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-medium text-gray-800">General Settings</h4>
                  <p className="text-sm text-gray-600 mt-1">Configure general application settings</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:border-carbonx-primary transition cursor-pointer">
                  <div className="p-2 bg-green-100 rounded-lg w-fit mb-4">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-medium text-gray-800">Security</h4>
                  <p className="text-sm text-gray-600 mt-1">Manage security preferences</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:border-carbonx-primary transition cursor-pointer">
                  <div className="p-2 bg-purple-100 rounded-lg w-fit mb-4">
                    <Bell className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-medium text-gray-800">Notifications</h4>
                  <p className="text-sm text-gray-600 mt-1">Configure notification settings</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:border-carbonx-primary transition cursor-pointer">
                  <div className="p-2 bg-yellow-100 rounded-lg w-fit mb-4">
                    <Database className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h4 className="font-medium text-gray-800">Database</h4>
                  <p className="text-sm text-gray-600 mt-1">Database configuration and backup</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:border-carbonx-primary transition cursor-pointer">
                  <div className="p-2 bg-pink-100 rounded-lg w-fit mb-4">
                    <Users className="w-6 h-6 text-pink-600" />
                  </div>
                  <h4 className="font-medium text-gray-800">Team Management</h4>
                  <p className="text-sm text-gray-600 mt-1">Manage team roles and permissions</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:border-carbonx-primary transition cursor-pointer">
                  <div className="p-2 bg-teal-100 rounded-lg w-fit mb-4">
                    <FileText className="w-6 h-6 text-teal-600" />
                  </div>
                  <h4 className="font-medium text-gray-800">Reporting</h4>
                  <p className="text-sm text-gray-600 mt-1">Customize report settings</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;