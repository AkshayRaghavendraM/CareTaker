import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, MessageSquare, Clock, Guitar as Hospital, AlertCircle, Heart } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/chatbot', icon: MessageSquare, label: 'Health Assistant' },
    { path: '/medicine-reminder', icon: Clock, label: 'Medicine Reminder' },
    { path: '/hospital-finder', icon: Hospital, label: 'Find Hospital' },
    { path: '/emergency', icon: AlertCircle, label: 'Emergency' },
    { path: '/medical-tips', icon: Heart, label: 'Medical Tips' },
  ];

  return (
    <nav className="w-64 bg-white shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <Heart className="h-8 w-8" />
          <span>CareCompanion</span>
        </h1>
      </div>
      <div className="px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-lg transition-colors ${
                isActive
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <item.icon className="h-6 w-6" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;