import { Link, useLocation } from 'react-router';
import AuthLayout from '../components/layout/AuthLayout';

const CheckEmail = () => {
    const location = useLocation();
    const email = location.state?.email || 'your email';

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
            <div className="bg-white p-8 rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 text-center">
                <Link to="/login" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                    Back to Login
                </Link>

                {/* Big Email Icon */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#6366f1]/10 text-[#6366f1]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                </div>

                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Check Your Email</h2>
                    <p className="mt-4 text-slate-500 font-medium font-inter leading-relaxed">
                        We've sent password reset instructions to <br />
                        <span className="font-bold text-slate-900">{email}</span>. <br />
                        Please check your inbox and follow the link.
                    </p>
                </div>

                <button
                    onClick={() => window.location.reload()}
                    className="text-[#6366f1] text-base font-bold hover:text-[#4f46e5] transition-colors"
                >
                    Didn't receive it? Try again
                </button>
            </div>
        </AuthLayout>
    );
};

export default CheckEmail;
