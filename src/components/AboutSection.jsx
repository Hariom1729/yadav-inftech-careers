import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  ShieldAlert, 
  CloudLightning, 
  TerminalSquare, 
  HeartHandshake, 
  GraduationCap, 
  PlaneTakeoff, 
  Laptop2,
  MapPin,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function AboutSection() {
  const pillars = [
    {
      title: 'Distributed Core & Consensus',
      desc: 'Architecting zero-downtime, fault-tolerant message brokers and decentralized state synchronization engines.',
      icon: CloudLightning,
      tag: 'Rust • Go • gRPC'
    },
    {
      title: 'Neural Inference & Generative AI',
      desc: 'Deploying high-throughput model serving pipelines with custom tensor optimizations and real-time inference caches.',
      icon: Cpu,
      tag: 'PyTorch • CUDA • Triton'
    },
    {
      title: 'Zero-Trust Defense Systems',
      desc: 'Protecting petabyte-scale financial pipelines through post-quantum encryption and behavioral anomaly detection.',
      icon: ShieldAlert,
      tag: 'eBPF • mTLS • Vault'
    },
    {
      title: 'Next-Gen 3D & Web Architectures',
      desc: 'Crafting ultra-responsive real-time canvas interfaces, WebGPU renderers, and reactive micro-frontends.',
      icon: TerminalSquare,
      tag: 'TypeScript • WebGL • WebGPU'
    }
  ];

  const benefits = [
    {
      title: 'Generous Tech Stipend',
      desc: '$4,500 initial setup for your dream workstation (M-series Mac, ultra-wide monitors, ergonomic gear).',
      icon: Laptop2
    },
    {
      title: 'Continuous Growth Budget',
      desc: '$3,000 yearly per engineer for international tech summits, book allowances, and university research papers.',
      icon: GraduationCap
    },
    {
      title: 'Flexible & Remote-First',
      desc: 'Work from our state-of-the-art innovation hubs or choose full-remote with flexible core hours.',
      icon: HeartHandshake
    },
    {
      title: 'Annual Global Retreats',
      desc: 'Past team summits in Bali, Swiss Alps, and Tokyo for cross-lab hackathons and culture bonding.',
      icon: PlaneTakeoff
    }
  ];

  const locations = [
    { city: 'Bengaluru', role: 'Global Innovation & R&D Hub', address: 'Outer Ring Road Tech Zone, Level 14' },
    { city: 'San Francisco', role: 'AI & Quantum Systems Lab', address: 'Market St, Suite 2200' },
    { city: 'London', role: 'European Fintech Headquarters', address: 'Bishopsgate, EC2N' },
    { city: 'Singapore', role: 'APAC Cloud Infrastructure', address: 'Marina Bay Financial Centre' },
  ];

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-800/50 text-cyan-400 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ABOUT YADAV INFTECH</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              Pioneering Tomorrow's <br />
              <span className="text-gradient-cyan">Computing Paradigms.</span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Founded on the belief that code should be resilient, elegant, and uncompromisingly fast, 
              <strong className="text-white font-semibold"> Yadav Inftech</strong> has grown from an ambitious engineering think-tank into a trusted digital powerhouse for the world’s most demanding enterprises.
            </p>

            <p className="text-slate-400 text-sm leading-relaxed">
              Our teams do not just write software; we dissect computational bottlenecks, solve non-trivial distributed systems challenges, and pioneer next-generation developer platforms. When you join Yadav Inftech, you collaborate with minds that love diving into the compiler as much as shipping polished products.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-300">Meritocratic engineering ladder</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-300">Open-source sponsorship</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-300">Competitive global compensation</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-300">Autonomy & zero micromanagement</span>
              </div>
            </div>
          </div>

          {/* Interactive Tech Stack Radar Card */}
          <div className="lg:col-span-6">
            <div className="relative p-8 rounded-3xl glass-card border border-cyan-500/20 shadow-2xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div>
                  <div className="text-xs font-mono text-cyan-400">CORE TECH PILLARS</div>
                  <h4 className="text-lg font-bold font-heading text-white">What We Build Daily</h4>
                </div>
                <span className="px-2.5 py-1 text-xs font-mono rounded bg-white/5 text-slate-300 border border-white/10">
                  v4.18 Architecture
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pillars.map((p) => {
                  const Icon = p.icon;
                  return (
                    <div key={p.title} className="p-4 rounded-xl bg-slate-900/60 border border-white/5 hover:border-cyan-500/30 transition-all">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-3">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h5 className="text-sm font-semibold text-white mb-1">{p.title}</h5>
                      <p className="text-xs text-slate-400 mb-2 leading-relaxed">{p.desc}</p>
                      <span className="text-[10px] font-mono text-cyan-300/80 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-900/40">
                        {p.tag}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Culture & Perks */}
        <div id="culture" className="pt-10 mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              EMPLOYEE EXPERIENCE & BENEFITS
            </span>
            <h3 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-2">
              Invested in Your Growth and Wellbeing
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="p-6 rounded-2xl glass-card border border-white/5 hover:border-blue-500/30 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{b.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Locations */}
        <div id="locations" className="pt-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              GLOBAL FOOTPRINT
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-2">
              Innovation Centers Across 4 Continents
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {locations.map((loc) => (
              <div key={loc.city} className="p-5 rounded-2xl glass-panel border border-white/5 hover:border-cyan-500/30 transition-all">
                <div className="flex items-center gap-2 text-cyan-400 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-heading text-base font-bold text-white">{loc.city}</span>
                </div>
                <div className="text-xs font-semibold text-slate-300 mb-1">{loc.role}</div>
                <div className="text-[11px] text-slate-500">{loc.address}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
