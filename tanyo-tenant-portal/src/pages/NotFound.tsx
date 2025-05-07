import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-9xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-4xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
        <p className="text-xl text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="bg-[#ffc901] text-black px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFound; 