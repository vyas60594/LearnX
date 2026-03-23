import Logo from '../ui/Logo';

const AuthLayout = ({ children, illustration, title, subtitle }) => {
    return (
        <div className="flex min-h-screen bg-slate-50 font-inter">
            {/* ── Left Sidebar (Illustration) ── */}
            <div className="hidden w-1/2 flex-col items-center justify-center bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#a855f7] p-12 lg:flex">
                <div className="flex w-full max-w-md flex-col items-center">
                    {/* Logo Header */}
                    <div className="mb-12 flex w-full items-center justify-start">
                        <Logo size="xl" isDark disableLink />
                    </div>

                    {/* Illustration Area */}
                    <div className="relative mb-12 flex h-96 w-full items-center justify-center rounded-3xl bg-white/10 p-8 backdrop-blur-sm">
                        {illustration}
                    </div>

                    {/* Text Content */}
                    <div className="text-center">
                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                            Master Skills. Unlock Careers.
                        </p>
                        <h1 className="text-3xl font-extrabold leading-tight text-white lg:text-4xl">
                            {title}
                        </h1>
                    </div>
                </div>

                {/* Decorative Circles */}
                <div className="absolute top-[-10%] left-[-10%] h-64 w-64 rounded-full bg-white/5" />
                <div className="absolute bottom-[10%] right-[0%] h-48 w-48 rounded-full bg-white/5" />
            </div>

            {/* ── Right Content (Form) ── */}
            <div className="flex w-full items-center justify-center p-6 lg:w-1/2 lg:p-12">
                <div className="w-full max-w-md">
                    {/* Mobile Logo (Visible only on small screens) */}
                    <div className="mb-8 flex items-center justify-center lg:hidden">
                        <Logo size="lg" disableLink />
                    </div>

                    <div className="auth-card animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
