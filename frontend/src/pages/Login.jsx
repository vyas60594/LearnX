// =============================================================
//  Login.jsx — Student login page
//  Shows logo, email + password fields, and a login button.
//  On success, navigates to the Dashboard.
// =============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import AuthLayout from '../components/layout/AuthLayout';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: call auth API, then redirect on success
    navigate('/Dashboard');
  };

  const loginIllustration = (
    <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="50" y="200" width="300" height="10" rx="5" fill="white" fillOpacity="0.1" />
      <rect x="80" y="80" width="240" height="160" rx="12" fill="white" fillOpacity="0.2" />
      <rect x="100" y="110" width="80" height="10" rx="5" fill="white" fillOpacity="0.4" />
      <rect x="100" y="130" width="120" height="10" rx="5" fill="white" fillOpacity="0.2" />
      <rect x="100" y="150" width="100" height="10" rx="5" fill="white" fillOpacity="0.2" />
      <circle cx="280" cy="140" r="30" fill="white" fillOpacity="0.3" />
      <path d="M260 140L275 155L300 130" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="140" y="50" width="40" height="40" rx="8" fill="white" fillOpacity="0.1" />
      <path d="M150 65L160 75L170 65" stroke="white" strokeWidth="2" strokeLinecap="round" />
      {/* Abstract person */}
      <circle cx="200" cy="100" r="20" fill="white" fillOpacity="0.5" />
      <path d="M170 160C170 140 230 140 230 160V180H170V160Z" fill="white" fillOpacity="0.5" />
    </svg>
  );

  return (
    <AuthLayout
      title="Build Skills. Prove Mastery. Unlock Your Career."
      illustration={loginIllustration}
    >
      <div className="bg-white p-8 rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome Back to LearnX</h2>
          <p className="mt-2 text-slate-500 font-medium font-inter">Sign in to continue your learning journey</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
            <div className="relative group">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-slate-900 transition-all duration-300 group-hover:bg-white focus:bg-white focus:border-[#6366f1] focus:outline-none focus:ring-4 focus:ring-[#6366f1]/10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 pr-12 text-slate-900 transition-all duration-300 group-hover:bg-white focus:bg-white focus:border-[#6366f1] focus:outline-none focus:ring-4 focus:ring-[#6366f1]/10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" /><circle cx="12" cy="12" r="3" /></svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-5 w-5 rounded border-slate-300 text-[#6366f1] focus:ring-[#6366f1] transition-all cursor-pointer"
              />
              <span className="text-sm font-medium text-slate-500 group-hover:text-slate-700 transition-colors">Remember me</span>
            </label>
            <Link to="/forgot-password" title="Forgot Password" className="text-sm font-bold text-[#6366f1] hover:text-[#4f46e5] transition-colors">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="group relative h-14 w-full overflow-hidden rounded-2xl bg-[#6366f1] text-base font-bold text-white shadow-xl shadow-[#6366f1]/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            Sign In
          </button>

        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500 font-medium">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-[#6366f1] hover:text-[#4f46e5] transition-colors">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;

