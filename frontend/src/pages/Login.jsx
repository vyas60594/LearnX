import React, { useState } from 'react';
import { Link } from 'react-router';
import logo from '../assets/learnx_logo.svg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      {/* Logo Section */}
      <div className="mb-8 flex flex-col items-center">
        <div className="flex items-center justify-center transition-transform duration-300 hover:scale-110">
          <img
            src={logo}
            alt="LearnX Logo"
            className="w-20 h-20 object-contain"
          />
        </div>
        <h1 className="mt-2 text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          LearnX
        </h1>
        <p className="text-slate-500 text-sm mt-1 uppercase tracking-wider font-medium">Job-Oriented Learning Platform</p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-[440px] bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-8 border border-slate-100">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
          <p className="text-slate-400 mt-1">Login to continue your learning journey</p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@learnx.com"
              className="w-full h-14 px-5 rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all duration-300 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-14 px-5 rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all duration-300 shadow-sm"
            />
          </div>

          <button className="w-full h-14 bg-[#0f172a] hover:bg-[#1e293b] text-white rounded-2xl font-bold text-base transition-all duration-300 shadow-lg shadow-slate-200/50 transform active:scale-[0.98]">
            Login
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 font-medium">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-bold transition-colors">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
