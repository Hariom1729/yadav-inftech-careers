import React, { useState } from 'react';
import ThreeBackground from './components/ThreeBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import AboutSection from './components/AboutSection';
import OpenPositions, { jobRoles } from './components/OpenPositions';
import ApplicationModal from './components/ApplicationModal';
import PrankRevealModal from './components/PrankRevealModal';
import Footer from './components/Footer';
import { Briefcase, Sparkles, ChevronUp } from 'lucide-react';
import { sound } from './utils/soundEffects';

export default function App() {
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState('');
  const [isPrankRevealOpen, setIsPrankRevealOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleOpenApplication = (jobTitle = '') => {
    setSelectedJob(jobTitle || 'Lead Full-Stack WebGL / 3D Architect');
    setIsAppModalOpen(true);
  };

  const handleTriggerPrankReveal = (data) => {
    setSubmittedData(data);
    setIsAppModalOpen(false);
    setIsPrankRevealOpen(true);
  };

  const handleResetApplication = () => {
    setIsPrankRevealOpen(false);
    setIsAppModalOpen(true);
  };

  const scrollToPositions = () => {
    const el = document.getElementById('positions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500 selection:text-black font-sans">
      
      {/* 3D Background with interactive floating geometries & starfield */}
      <ThreeBackground />

      {/* Main Corporate Header */}
      <Navbar 
        onOpenApplication={() => handleOpenApplication()} 
        activeJobCount={jobRoles.length}
      />

      {/* Main Page Flow */}
      <main className="relative z-10">
        <Hero 
          onOpenApplication={() => handleOpenApplication()}
          onExploreCareers={scrollToPositions}
        />

        <StatsSection />

        <AboutSection />

        <OpenPositions 
          onApplyToJob={(jobTitle) => handleOpenApplication(jobTitle)}
        />
      </main>

      {/* Corporate Footer */}
      <Footer onOpenApplication={() => handleOpenApplication()} />

      {/* Floating Fast-Action Apply Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => {
            sound.playClick();
            handleOpenApplication();
          }}
          className="relative group p-[2px] rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-400/50 hover:scale-105 transition-all"
        >
          <div className="px-4 py-3 rounded-[14px] bg-slate-950 flex items-center gap-2.5 text-white font-heading font-bold text-xs tracking-wide">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <Briefcase className="w-4 h-4 text-cyan-300" />
            <span>Apply Now</span>
          </div>
        </button>
      </div>

      {/* Full Job Application Modal (With the Escaping Button Prank on Step 4) */}
      <ApplicationModal
        isOpen={isAppModalOpen}
        onClose={() => setIsAppModalOpen(false)}
        defaultPosition={selectedJob}
        onTriggerPrankReveal={handleTriggerPrankReveal}
      />

      {/* Epic Prank Reveal Modal with Confetti & Fanfare */}
      <PrankRevealModal
        isOpen={isPrankRevealOpen}
        onClose={() => setIsPrankRevealOpen(false)}
        onReset={handleResetApplication}
        formData={submittedData}
      />
    </div>
  );
}
