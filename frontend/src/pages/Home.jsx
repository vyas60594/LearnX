import CertificationSection from '../components/home/CertificationSection';
import CTASection from '../components/home/CTASection';
import Features from '../components/home/Features';
import Hero from '../components/home/Hero';
import SkillPaths from '../components/home/SkillPaths';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Hero />
                <Features />
                <SkillPaths />
                <CertificationSection />
                <CTASection />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
