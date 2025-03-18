import React from "react";
import { motion } from "framer-motion";
import { MdArrowBack } from "react-icons/md";

export default function UserProfile({ user, onBackClick, onLogout }) {
  return (
    <div className="bg-black min-h-screen w-screen flex flex-col items-center text-white">
      {/* Header Section */}
      <header className="w-full bg-white text-black py-4 px-6 flex items-center">
        <button 
          onClick={onBackClick} 
          className="mr-4 p-1 rounded-full hover:bg-gray-200 transition-colors duration-300"
        >
          <MdArrowBack size={24} />
        </button>
        <h1 className="text-xl font-bold">Art Gallery</h1>
      </header>

      <div className="max-w-lg w-full bg-gray-900 p-8 rounded-2xl shadow-lg mt-6">
        {/* Profile Header */}
        <div className="flex items-center mb-6">
          <div className="w-20 h-20 bg-amber-400 rounded-full flex items-center justify-center text-black text-2xl font-bold mr-4">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{user?.name || 'User'}</h1>
            <p className="text-gray-400">{user?.email || 'No email provided'}</p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="space-y-6 mt-8">
          <div className="p-4 bg-gray-800 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Account Information</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Name:</span>
                <span>{user?.name || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Email:</span>
                <span>{user?.email || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Member Since:</span>
                <span>{user?.createdAt ? new Date(user.createdAt.seconds * 1000).toLocaleDateString() : 'Unknown'}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-800 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Preferences</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Favorite Art Style:</span>
                <span>Not set</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Notification Preferences:</span>
                <span>Email</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-800 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Activities</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Saved Artworks:</span>
                <span>0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Favorite Artists:</span>
                <span>0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Reviews:</span>
                <span>0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <motion.button
          onClick={onLogout}
          className="w-full mt-8 bg-red-500 text-white font-semibold p-3 rounded-lg shadow-lg hover:bg-red-600 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Logout
        </motion.button>
      </div>
    </div>
  );
}