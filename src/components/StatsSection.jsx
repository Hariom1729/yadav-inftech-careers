import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Award, 
  Users, 
  Network, 
  Rocket, 
  Layers3, 
  ShieldCheck, 
  Server
} from 'lucide-react';

export default function StatsSection() {
  const stats = [
    {
      label: 'Global Workforce',
      value: '14,250+',
      detail: 'Elite engineers, research scientists & designers',
      icon: Users,
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      label: 'Production Systems',
      value: '580+',
      detail: 'Enterprise applications deployed worldwide',
      icon: Server,
      gradient: 'from-blue-500 to-indigo-500'
    },
    {
      label: 'Fortune 500 Clients',
      value: '120+',
      detail: 'Trusted by tier-1 global banking and aerospace',
      icon: Building2,
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      label: 'R&D Patents Filed',
      value: '84',
      detail: 'Breakthroughs in distributed consensus & neural cache',
      icon: Award,
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <section id="stats" className="py-20 relative z-10 border-y border-white/5 bg-slate-950/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs sm:text-sm font-mono tracking-widest uppercase text-cyan-400 font-semibold mb-2">
            PROVEN SCALE & ARCHITECTURAL EXCELLENCE
          </h2>
          <h3 className="font-heading text-3xl sm:text-4xl font-bold text-white">
            Engineering Systems for Planet-Scale Impact
          </h3>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            From low-latency algorithmic pipelines to cloud-native autonomous orchestrators, Yadav Inftech powers digital transformation for market leaders.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative group p-6 rounded-2xl glass-card border border-white/10 hover:border-cyan-500/40 transition-all hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${item.gradient} p-0.5 mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  <div className="w-full h-full bg-[#0a1128] rounded-[10px] flex items-center justify-center text-white">
                    <Icon className="w-6 h-6 text-cyan-300" />
                  </div>
                </div>

                <div className="font-heading text-3xl sm:text-4xl font-black text-white tracking-tight mb-1">
                  {item.value}
                </div>
                <div className="text-sm font-semibold text-slate-200 mb-2">
                  {item.label}
                </div>
                <div className="text-xs text-slate-400 leading-relaxed">
                  {item.detail}
                </div>

                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-15 transition-opacity">
                  <Icon className="w-20 h-20 text-white" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
