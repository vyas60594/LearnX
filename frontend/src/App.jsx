// =============================================================
//  App.jsx — Root router
//  Maps URL paths to page components.
// =============================================================

import { Route, Routes } from 'react-router';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SkillPaths from './pages/SkillPaths';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/Dashboard" element={<Dashboard />} />

            <Route path="/skill-paths" element={<SkillPaths />} />
        </Routes>
    );
}

export default App;