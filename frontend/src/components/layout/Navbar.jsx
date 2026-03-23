// =============================================================
//  Navbar.jsx — Public landing page top navigation bar
//  Sticky header with logo, anchor links, and Login/Register CTAs.
//  Collapses into a hamburger menu on mobile.
// =============================================================

import { useState } from 'react';
import { Link } from 'react-router';
import Logo from '../ui/Logo';

const NAV_LINKS = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Skill Paths', href: '#skill-paths' },
    { label: 'Certificates', href: '#certificates' },
];

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <Logo size="md" />

                    {/* Desktop nav links */}
                    <div className="hidden items-center gap-8 md:flex">
                        {NAV_LINKS.map((link) => (
                            <a key={link.label} href={link.href} className="text-sm font-medium text-slate-600 transition-colors hover:text-primary">
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Desktop CTA buttons */}
                    <div className="hidden items-center gap-3 md:flex">
                        <Link to="/login" className="px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-primary">
                            Login
                        </Link>
                        <Link to="/register" className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-violet-700 hover:shadow-lg active:scale-95">
                            Start Learning →
                        </Link>
                    </div>

                    {/* Mobile hamburger button */}
                    <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 md:hidden">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
                        </svg>
                    </button>
                </div>

                {/* Mobile dropdown menu */}
                {menuOpen && (
                    <div className="space-y-2 border-t border-slate-100 py-4 md:hidden">
                        {NAV_LINKS.map((link) => (
                            <a key={link.label} href={link.href} className="block rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-primary">
                                {link.label}
                            </a>
                        ))}
                        <div className="flex gap-3 px-4 pt-2">
                            <Link to="/login" className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-center text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50">
                                Login
                            </Link>
                            <Link to="/register" className="flex-1 rounded-lg bg-primary px-4 py-2 text-center text-sm font-semibold text-white transition-all hover:bg-violet-700">
                                Start Learning
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
