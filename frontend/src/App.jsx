import { Link, Route, Routes } from 'react-router';
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

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/check-email" element={<CheckEmail />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/skill-paths" element={<SkillPaths />} />
            <Route path="/skill-path/:id" element={<SkillPathDetail />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/practice-tests" element={<PracticeTests />} />
            <Route path="/practice-test/:id" element={<PracticeTestPlayer />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-slate-50 gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-gradient-to-br from-indigo-500 to-indigo-700 text-white text-3xl font-black italic shadow-xl">
                LX
            </div>
            <h1 className="text-6xl font-black text-slate-900">404</h1>
            <p className="text-slate-500 font-medium text-lg">Oops! This page doesn't exist.</p>
            <Link
                to="/dashboard"
                className="mt-2 px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
            >
                Back to Dashboard
            </Link>
        </div>
    );
}

export default App;
