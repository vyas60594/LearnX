import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import image3 from '../assets/image3.png';
import AuthLayout from '../components/layout/AuthLayout';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleResetRequest = (e) => {
        e.preventDefault();
        // TODO: call reset password API
        navigate('/check-email', { state: { email } });
    };

    const stairIllustration = (
        <img src={image3} alt="" />
    );

    return (
        <AuthLayout
            title="Build Skills. Prove Mastery. Unlock Your Career."
            illustration={stairIllustration}
        >
            <div className="bg-white p-8 rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100">
                <Link to="/login" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                    Back to Login
                </Link>

                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Forgot Your Password?</h2>
                    <p className="mt-2 text-slate-500 font-medium font-inter">Enter your email address and we'll send you instructions to reset your password.</p>
                </div>

                <form onSubmit={handleResetRequest} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-slate-900 transition-all duration-300 hover:bg-white focus:bg-white focus:border-[#6366f1] focus:outline-none focus:ring-4 focus:ring-[#6366f1]/10"
                        />
                    </div>

                    <button
                        type="submit"
                        className="group relative h-14 w-full overflow-hidden rounded-2xl bg-[#6366f1] text-base font-bold text-white shadow-xl shadow-[#6366f1]/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        Send Reset Link
                    </button>
                </form>
            </div>
        </AuthLayout>
    );
};

export default ForgotPassword;
