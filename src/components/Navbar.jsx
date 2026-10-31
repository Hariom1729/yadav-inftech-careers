import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Layers, 
  Menu, 
  X, 
  ShieldCheck, 
  ChevronRight,
  Globe2
} from 'lucide-react';
import { sound } from '../utils/soundEffects';

export default function Navbar({ onOpenApplication, activeJobCount = 8 }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAudio = () => {
    const nextState = sound.toggleSound();
    setSoundEnabled(nextState);
    if (nextState) sound.playClick();
  };

  const navLinks = [
    { name: 'About Yadav Inftech', href: '#about' },
    { name: 'Open Positions', href: '#positions', badge: `${activeJobCount} Roles` },
    { name: 'Engineering Culture', href: '#culture' },
    { name: 'Global Impact', href: '#stats' },
    { name: 'Locations', href: '#locations' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#030712]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
            onClick={() => sound.playClick()}
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition-shadow">
              <div className="w-full h-full bg-[#070d1e] rounded-[10px] flex items-center justify-center">
                <span className="font-heading text-xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Y
                </span>
              </div>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping opacity-75" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-lg font-bold tracking-wider text-white">
                  YADAV<span className="text-cyan-400 font-extrabold ml-1">INFTECH</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
                  ENTERPRISE
                </span>
              </div>
              <p className="text-[10px] font-mono text-slate-400 tracking-wider">
                INNOVATION LABS & SYSTEMS
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-full border border-white/5 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => sound.playClick()}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-full transition-all hover:bg-white/10 flex items-center gap-1.5"
              >
                {link.name}
                {link.badge && (
                  <span className="px-1.5 py-0.2 text-[9px] font-mono bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/30">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={toggleAudio}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 border border-white/5 transition-all text-xs flex items-center gap-1"
              title={soundEnabled ? 'Mute Interface Sound' : 'Enable Sound'}
              aria-label="Toggle Sound"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-cyan-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </button>

            {/* Apply Button */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenApplication();
              }}
              className="relative group overflow-hidden px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-heading text-xs sm:text-sm font-semibold tracking-wide text-white transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 group-hover:scale-105 transition-transform duration-300" />
              <div className="relative flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-cyan-200" />
                <span>Apply Now</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-900/80 text-slate-300 border border-white/10"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl glass-card border border-white/10 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-2 text-sm text-slate-200 hover:bg-white/5 rounded-lg flex items-center justify-between"
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-cyan-500/20 text-cyan-300 rounded-full">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
            <div className="pt-2 border-t border-white/10">
              <button
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(false);
                  onOpenApplication();
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-sm flex items-center justify-center gap-2"
              >
                <Briefcase className="w-4 h-4" />
                <span>Start Application</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
