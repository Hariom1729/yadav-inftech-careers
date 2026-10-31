import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Code2, 
  Cpu, 
  Terminal, 
  ShieldCheck, 
  CheckCircle2, 
  Zap,
  Globe2,
  Users2
} from 'lucide-react';
import { sound } from '../utils/soundEffects';

export default function Hero({ onOpenApplication, onExploreCareers }) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background radial gradient spotlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-cyan-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[350px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[350px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="text-center">
          {/* Top subtle badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-medium mb-8 shadow-inner"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="font-mono uppercase tracking-wider text-[11px] sm:text-xs">
              Global Recruitment Drive 2025–2026
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300 font-sans">Engineering & Research</span>
          </motion.div>

          {/* Company Brand Callout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-4"
          >
            <span className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-cyan-400/90 font-semibold bg-cyan-950/60 px-3 py-1 rounded-md border border-cyan-800/50">
              YADAV INFTECH CORPORATION
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1] mb-6"
          >
            Build Your Future <br />
            <span className="text-gradient-cyan">With Us.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed mb-10"
          >
            Join a team of innovators, engineers, and problem solvers shaping tomorrow's technology.
            We architect fault-tolerant distributed cloud networks, quantum-resilient security, and high-performance AI engines.
          </motion.p>

          {/* Call-To-Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <button
              onClick={() => {
                sound.playClick();
                onOpenApplication();
              }}
              className="w-full sm:w-auto relative group overflow-hidden px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 font-heading font-bold text-white text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-400/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <Zap className="w-5 h-5 text-cyan-200 fill-cyan-300/30" />
              <span>Apply Now</span>
              <ArrowRight className="w-5 h-5 text-cyan-200 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onExploreCareers();
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel-interactive font-heading font-semibold text-slate-200 hover:text-white text-base border border-white/10 hover:border-cyan-400/50 flex items-center justify-center gap-2.5"
            >
              <Terminal className="w-5 h-5 text-cyan-400" />
              <span>Explore Careers</span>
            </button>
          </motion.div>

          {/* Floating High-Tech Metrics Ribbon */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto"
          >
            <div className="glass-card p-4 rounded-2xl text-left border border-white/5 hover:border-cyan-500/30 transition-all">
              <div className="flex items-center gap-2 text-cyan-400 mb-1">
                <Globe2 className="w-4 h-4" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Presence</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold font-heading text-white">48+ Countries</p>
              <p className="text-[11px] text-slate-400">Global delivery hubs</p>
            </div>

            <div className="glass-card p-4 rounded-2xl text-left border border-white/5 hover:border-cyan-500/30 transition-all">
              <div className="flex items-center gap-2 text-blue-400 mb-1">
                <Users2 className="w-4 h-4" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Engineers</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold font-heading text-white">14,200+</p>
              <p className="text-[11px] text-slate-400">Worldwide talent pool</p>
            </div>

            <div className="glass-card p-4 rounded-2xl text-left border border-white/5 hover:border-cyan-500/30 transition-all">
              <div className="flex items-center gap-2 text-indigo-400 mb-1">
                <Cpu className="w-4 h-4" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Cloud Scale</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold font-heading text-white">99.999%</p>
              <p className="text-[11px] text-slate-400">Uptime reliability</p>
            </div>

            <div className="glass-card p-4 rounded-2xl text-left border border-white/5 hover:border-cyan-500/30 transition-all">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Retention</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold font-heading text-white">96.4%</p>
              <p className="text-[11px] text-slate-400">Employee satisfaction</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
