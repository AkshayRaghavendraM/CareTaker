import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Clock, Guitar as Hospital, AlertCircle, Heart } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: MessageSquare,
      title: 'Health Assistant',
      description: 'Chat with our AI assistant about health concerns',
      path: '/chatbot',
      color: 'bg-blue-500',
    },
    {
      icon: Clock,
      title: 'Medicine Reminder',
      description: 'Never miss your medications',
      path: '/medicine-reminder',
      color: 'bg-green-500',
    },
    {
      icon: Hospital,
      title: 'Find Hospital',
      description: 'Locate nearby hospitals and medical facilities',
      path: '/hospital-finder',
      color: 'bg-purple-500',
    },
    {
      icon: AlertCircle,
      title: 'Emergency',
      description: 'Quick access to emergency contacts and SOS',
      path: '/emergency',
      color: 'bg-red-500',
    },
    {
      icon: Heart,
      title: 'Medical Tips',
      description: 'Helpful health tips and information',
      path: '/medical-tips',
      color: 'bg-pink-500',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to CareCompanion
        </h1>
        <p className="text-xl text-gray-600">
          Your personal healthcare assistant
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <button
            key={feature.path}
            onClick={() => navigate(feature.path)}
            className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className={`${feature.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
              <feature.icon className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {feature.title}
            </h2>
            <p className="text-gray-600">{feature.description}</p>
          </button>
        ))}
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-xl">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">
          Need Help?
        </h2>
        <p className="text-blue-600">
          Click on any feature above to get started, or use the sidebar menu for navigation.
          For immediate assistance, visit the Emergency section.
        </p>
      </div>
    </div>
  );
};

export default Home;