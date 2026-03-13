import { Route, Routes } from 'react-router';
import CheckEmail from './pages/CheckEmail';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Login from './pages/Login';
import PracticeTestPlayer from './pages/PracticeTestPlayer';
import PracticeTests from './pages/PracticeTests';
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
            <Route path="/Dashboard" element={<Dashboard />} />

            <Route path="/skill-paths" element={<SkillPaths />} />
            <Route path="/skill-path/:id" element={<SkillPathDetail />} />
            <Route path="/practice-tests" element={<PracticeTests />} />
            <Route path="/practice-test/:id" element={<PracticeTestPlayer />} />
        </Routes>
    );
}

export default App;
