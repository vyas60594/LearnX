import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
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
        <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 250H100V220H150V190H200V160H250V130H300V100H350V250H50Z" fill="white" fillOpacity="0.1" />
            <path d="M50 250H100V220H150V190H200V160H250V130H300V100" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />

            {/* Abstract person climbing */}
            <circle cx="210" cy="130" r="10" fill="white" fillOpacity="0.6" />
            <path d="M210 140L210 155M210 155L200 170M210 155L220 170M210 145L200 140M210 145L220 140" stroke="white" strokeWidth="3" strokeLinecap="round" />

            {/* Trophy at top */}
            <path d="M315 70H335V85C335 90.5228 330.523 95 325 95C319.477 95 315 90.5228 315 85V70Z" fill="#FDE047" fillOpacity="0.8" />
            <rect x="323" y="95" width="4" height="10" fill="#FDE047" fillOpacity="0.8" />
            <rect x="318" y="105" width="14" height="4" fill="#FDE047" fillOpacity="0.8" />
            <path d="M315 75L310 80V85L315 80M335 75L340 80V85L335 80" stroke="#FDE047" strokeWidth="2" strokeOpacity="0.8" />
        </svg>
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
