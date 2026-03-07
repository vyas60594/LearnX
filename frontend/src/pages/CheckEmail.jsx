import { Link, useLocation } from 'react-router';
import image4 from '../assets/image4.png';
import AuthLayout from '../components/layout/AuthLayout';
const CheckEmail = () => {
    const location = useLocation();
    const email = location.state?.email || 'your email';

    const stairIllustration = (
        <img src={image4} alt="" />
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
