import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-navy text-slate-400 py-20 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <span className="text-3xl font-black text-white mb-6 block">LearnX</span>
                        <p className="text-sm leading-relaxed">
                            Job-Oriented Learning Platform. Empowering careers through structured mastery and industry-aligned skills.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Platform</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><a href="#" className="hover:text-primary transition-colors">Skill Paths</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Courses</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Assessments</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Company</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Legal</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-slate-800 text-center text-xs font-bold uppercase tracking-widest">
                    © 2024 LearnX. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
