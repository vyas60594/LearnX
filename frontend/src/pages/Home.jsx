import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import Features from '../components/home/Features';
import SkillPaths from '../components/home/SkillPaths';
import CTASection from '../components/home/CTASection';
import Footer from '../components/layout/Footer';

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Hero />
                <Stats />
                <Features />
                <SkillPaths />
                <CTASection />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
