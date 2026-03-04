// =============================================================
//  Register.jsx — New student registration page
//  Collects full name, email, password, and confirm password.
// =============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import logo from '../assets/learnx_logo.svg';

const Register = () => {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        // TODO: validate fields, call register API, then redirect
        navigate('/Dashboard');
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">

            {/* ── Logo ── */}
            <div className="mb-8 flex flex-col items-center">
                <div className="flex items-center justify-center transition-transform duration-300 hover:scale-110">
                    <img src={logo} alt="LearnX Logo" className="h-20 w-20 object-contain" />
                </div>
                <h1 className="mt-2 bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-bold text-transparent">
                    LearnX
                </h1>
                <p className="mt-1 text-sm font-medium uppercase tracking-wider text-slate-500">
                    Job-Oriented Learning Platform
                </p>
            </div>

            {/* ── Register card ── */}
            <div className="w-full max-w-[440px] rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/60">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
                    <p className="mt-1 text-slate-400">Register as a student to access courses</p>
                </div>

                {/* Form */}
                <div className="space-y-6">
                    <FormField
                        label="Full Name"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                    />
                    <FormField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="student@learnx.com"
                    />
                    <FormField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                    />
                    <FormField
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                    />

                    <button
                        onClick={handleRegister}
                        className="h-14 w-full rounded-2xl bg-slate-900 text-base font-bold text-white shadow-lg shadow-slate-200/50 transition-all duration-300 hover:bg-slate-800 active:scale-[0.98]"
                    >
                        Register
                    </button>
                </div>

                {/* Footer link */}
                <div className="mt-8 text-center">
                    <p className="font-medium text-slate-500">
                        Already have an account?{' '}
                        <Link to="/login" className="font-bold text-blue-600 transition-colors hover:text-blue-700">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

// Reusable labelled input — avoids repeating the same className block
function FormField({ label, type, value, onChange, placeholder }) {
    return (
        <div>
            <label className="mb-2 block text-sm font-bold text-slate-800">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-5 text-slate-900 shadow-sm placeholder:text-slate-400 transition-all duration-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/10"
            />
        </div>
    );
}

export default Register;
