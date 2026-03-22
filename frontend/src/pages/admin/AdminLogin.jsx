import { useState } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { useAdminAuth } from '../../context/AdminAuthContext';
import Logo from '../../components/ui/Logo';

const AdminLogin = () => {
    const navigate = useNavigate();
    const { loginAdmin } = useAdminAuth();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await loginAdmin(email, password);
            toast.success('Admin authentication successful');
            // Navigate to the admin dashboard
            navigate('/admin/dashboard');
        } catch (error) {
            toast.error(error.message || 'Unauthorized Access');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 selection:bg-indigo-500/30 font-['Plus_Jakarta_Sans']">
            
            {/* Ambient secure UI background effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] left-[20%] w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl mix-blend-screen" />
                <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-slate-700/20 rounded-full blur-3xl mix-blend-screen" />
            </div>

            <div className="w-full max-w-[420px] relative z-10">
                <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-slate-700/50">
                    
                    {/* Header */}
                    <div className="flex flex-col items-center mb-10 text-center">
                        <div className="mb-4">
                            <Logo size="xl" isDark disableLink />
                        </div>
                        <h1 className="text-2xl font-black text-white tracking-tight mt-2">Admin Portal</h1>
                        <p className="text-slate-400 font-medium text-sm mt-2">Sign in to manage LearnX platform</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-300 uppercase tracking-widest pl-1">Admin Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="sysadmin@learnx.com"
                                className="w-full h-14 bg-slate-900/50 border border-slate-700 text-white rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium placeholder:text-slate-600"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-300 uppercase tracking-widest pl-1">Secure Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••••••"
                                className="w-full h-14 bg-slate-900/50 border border-slate-700 text-white rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium placeholder:text-slate-600"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-500/25 active:scale-[0.98] disabled:opacity-70 disabled:hover:bg-indigo-600 disabled:active:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Authenticating...
                                </>
                            ) : (
                                'Verify Identity & Login'
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center border-t border-slate-700/50 pt-6">
                        <p className="text-sm font-bold text-slate-500 flex items-center justify-center gap-2">
                            <svg className="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
                            Secure Admin Portal
                        </p>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <button onClick={() => navigate('/')} className="text-slate-500 hover:text-slate-300 text-xs font-bold transition-colors">
                        ← Return to Student Portal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
