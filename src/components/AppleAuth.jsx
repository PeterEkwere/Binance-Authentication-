"use client";

import { useState, useEffect } from 'react';

const AppleLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!showPassword) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        setShowPassword(true);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-[400px] space-y-8">
        {/* Apple Logo */}
        <div className="flex justify-center">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-purple-400 rounded-full" />
            <div className="absolute inset-0.5 bg-white rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-dotted border-gray-300" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Sign in with Apple Account
        </h2>

        {/* Email Input */}
        <div className="relative">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email or Phone Number"
            disabled={showPassword}
            className="w-full px-4 py-3 pr-12 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2"
            disabled={!email || loading}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>

        {/* Password Input */}
        {showPassword && (
          <div className="mt-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}

        {/* Form Options */}
        <div className="space-y-4 pt-4">
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={keepSignedIn}
              onChange={(e) => setKeepSignedIn(e.target.checked)}
              className="w-4 h-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
            />
            <span className="text-gray-600">Keep me signed in</span>
          </label>

          <div className="flex justify-between text-sm">
            <a href="#" className="text-blue-500 hover:text-blue-600">
              Forgotten your password?
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-600">
              Create Apple Account
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AppleLoginForm;