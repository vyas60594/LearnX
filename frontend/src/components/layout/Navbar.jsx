import { useState } from 'react';
import { Link } from 'react-router';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <span className="text-xl font-extrabold text-slate-900">LearnX</span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">How It Works</a>
                        <a href="#skill-paths" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Skill Paths</a>
                        <a href="#certificates" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Certificates</a>
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors px-4 py-2">
                            Login
                        </Link>
                        <Link to="/register" className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-violet-700 transition-all shadow-md hover:shadow-lg active:scale-95">
                            Start Learning →
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden py-4 border-t border-slate-100 space-y-2">
                        <a href="#how-it-works" className="block px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary hover:bg-slate-50 rounded-lg transition-colors">How It Works</a>
                        <a href="#skill-paths" className="block px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary hover:bg-slate-50 rounded-lg transition-colors">Skill Paths</a>
                        <a href="#certificates" className="block px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary hover:bg-slate-50 rounded-lg transition-colors">Certificates</a>
                        <div className="flex gap-3 px-4 pt-2">
                            <Link to="/login" className="flex-1 text-center text-sm font-semibold text-slate-600 border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors">Login</Link>
                            <Link to="/register" className="flex-1 text-center bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-violet-700 transition-all">Start Learning</Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
