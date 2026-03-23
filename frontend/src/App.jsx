import { Link, Route, Routes, Navigate } from 'react-router';
import logo from './assets/learnx.png';
import Announcements from './pages/Announcements';
import Certificates from './pages/Certificates';
import CheckEmail from './pages/CheckEmail';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Login from './pages/Login';
import PracticeTestPlayer from './pages/PracticeTestPlayer';
import PracticeTests from './pages/PracticeTests';
import Profile from './pages/Profile';
import Register from './pages/Register';
import SkillPathDetail from './pages/SkillPathDetail';
import SkillPaths from './pages/SkillPaths';
import ProtectedRoute from './components/layout/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

// Admin Imports
import { AdminAuthProvider } from './context/AdminAuthContext';
import AdminProtectedRoute from './components/layout/admin/AdminProtectedRoute';
import AdminLayout from './components/layout/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminAnnouncements from './pages/admin/AdminAnnouncements';
import AdminSkillPaths from './pages/admin/AdminSkillPaths';
import AdminSkillPathEditor from './pages/admin/AdminSkillPathEditor';
import AdminPracticeTests from './pages/admin/AdminPracticeTests';
import AdminPracticeTestEditor from './pages/admin/AdminPracticeTestEditor';

function App() {
    return (
        <AdminAuthProvider>
        <AuthProvider>
            <Toaster position="top-right" toastOptions={{
                duration: 4000,
                style: {
                    background: '#333',
                    color: '#fff',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                },
            }} />
            <Routes>
                {/* ── Admin Routes ───────────────────────────── */}
                <Route path="/admin/login" element={<AdminLogin />} />
                
                <Route path="/admin" element={<AdminProtectedRoute />}>
                    <Route element={<AdminLayout />}>
                        <Route index element={<AdminDashboard />} />
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="users" element={<AdminUsers />} />
                        <Route path="skill-paths" element={<AdminSkillPaths />} />
                        <Route path="skill-paths/:id" element={<AdminSkillPathEditor />} />
                        <Route path="practice-tests" element={<AdminPracticeTests />} />
                        <Route path="practice-tests/:id" element={<AdminPracticeTestEditor />} />
                        <Route path="announcements" element={<AdminAnnouncements />} />
                        
                        {/* Catch-all for any unknown /admin/* paths */}
                        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
                    </Route>
                </Route>

                {/* ── Student Routes ─────────────────────────── */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/check-email" element={<CheckEmail />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/skill-paths" element={<SkillPaths />} />
                    <Route path="/skill-path/:id" element={<SkillPathDetail />} />
                    <Route path="/certificates" element={<Certificates />} />
                    <Route path="/practice-tests" element={<PracticeTests />} />
                    <Route path="/practice-test/:id" element={<PracticeTestPlayer />} />
                    <Route path="/announcements" element={<Announcements />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </AuthProvider>
        </AdminAuthProvider>
    );
}

function NotFound() {
    const { user } = useAuth();
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-slate-50 gap-4">
            <div className="flex items-center gap-3">
                <img src={logo} alt="LearnX Logo" className="h-16 w-16 object-contain" />
                <span className="text-5xl font-black text-slate-900 tracking-tight">LearnX</span>
            </div>
            <h1 className="text-6xl font-black text-slate-900 mt-4">404</h1>
            <p className="text-slate-500 font-medium text-lg">Oops! This page doesn't exist.</p>
            <Link
                to={user ? "/dashboard" : "/"}
                className="mt-2 px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
            >
                {user ? "Back to Dashboard" : "Back to Home"}
            </Link>
        </div>
    );
}

export default App;
