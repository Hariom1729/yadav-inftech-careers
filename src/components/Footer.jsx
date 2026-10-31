import React from 'react';
import { 
  Globe2, 
  Mail, 
  MapPin, 
  Phone, 
  Terminal, 
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './SocialIcons';
import { sound } from '../utils/soundEffects';

export default function Footer({ onOpenApplication }) {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#02050e] pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5">
                <div className="w-full h-full bg-[#070d1e] rounded-[10px] flex items-center justify-center font-heading font-black text-cyan-400 text-lg">
                  Y
                </div>
              </div>
              <span className="font-heading text-lg font-bold text-white tracking-wider">
                YADAV<span className="text-cyan-400 font-extrabold ml-1">INFTECH</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Architecting mission-critical distributed systems, quantum-resilient cryptographic engines, and autonomous cloud infrastructure for world-leading technology enterprises.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-all"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-all"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-all"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Careers & Engineering */}
          <div>
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider mb-4">
              Talent & Careers
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button 
                  onClick={() => { sound.playClick(); onOpenApplication(); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Explore Open Roles
                </button>
              </li>
              <li><a href="#about" className="hover:text-cyan-400 transition-colors">Engineering Principles</a></li>
              <li><a href="#culture" className="hover:text-cyan-400 transition-colors">Benefits & Relocation</a></li>
              <li><a href="#about" className="hover:text-cyan-400 transition-colors">University Internship 2026</a></li>
              <li><a href="#positions" className="hover:text-cyan-400 transition-colors">Diversity & Inclusion</a></li>
            </ul>
          </div>

          {/* Solutions & Research */}
          <div>
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider mb-4">
              Research & Labs
            </h4>
            <ul className="space-y-2.5">
              <li><span className="hover:text-cyan-400 cursor-pointer">Distributed Consensus v4</span></li>
              <li><span className="hover:text-cyan-400 cursor-pointer">Autonomous Tensor Pipelines</span></li>
              <li><span className="hover:text-cyan-400 cursor-pointer">Zero-Knowledge Enclaves</span></li>
              <li><span className="hover:text-cyan-400 cursor-pointer">WebGPU Spatial Rendering</span></li>
              <li><span className="hover:text-cyan-400 cursor-pointer">Quantum Resistance Standard</span></li>
            </ul>
          </div>

          {/* Global Headquarters & Contact */}
          <div>
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider mb-4">
              Global Contact
            </h4>
            <ul className="space-y-2.5 font-mono text-[11px]">
              <li className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Tech Park, Outer Ring Rd, BLR</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Market St, San Francisco, CA</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>careers@yadavinftech.io</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>+1 (800) 420-YADAV</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-slate-500 text-center md:text-left">
            <p>© 2026 Yadav Inftech Corporation. All systems nominal.</p>
            <p className="mt-1 text-slate-600">
              Disclaimer: Yadav Inftech is a playful creative showcase & web prank simulator. No actual employment agreements are initiated via this portal.
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span className="hover:text-slate-400 cursor-pointer">Security Protocol 2.1</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Client Privacy</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">ISO 27001 Certified</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
