import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  ArrowRight, 
  Filter, 
  Search,
  Sparkles,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { sound } from '../utils/soundEffects';

export const jobRoles = [
  {
    id: 'dist-sys-eng',
    title: 'Senior Distributed Systems Engineer',
    department: 'Engineering',
    location: 'Bengaluru / Hybrid',
    type: 'Full-time',
    experience: '3 - 6 Years',
    salary: '₹34 - 52 LPA ($160k - $210k)',
    tags: ['Rust', 'Go', 'gRPC', 'Kafka', 'Raft Consensus'],
    featured: true,
    description: 'Lead the design of low-latency, multi-region event streaming engines powering 4M+ req/sec for global fintech networks.'
  },
  {
    id: 'ai-staff-eng',
    title: 'Staff Machine Learning Infrastructure Engineer',
    department: 'AI Research',
    location: 'San Francisco / Remote',
    type: 'Full-time',
    experience: '4 - 8 Years',
    salary: '$180k - $240k + Equity',
    tags: ['PyTorch', 'CUDA', 'Triton', 'vLLM', 'Distributed GPU'],
    featured: true,
    description: 'Scale our generative inference clusters, optimize multi-tenant KV caches, and pioneer post-training model distillation.'
  },
  {
    id: 'fullstack-arch',
    title: 'Lead Full-Stack WebGL / 3D Architect',
    department: 'Engineering',
    location: 'Remote (Global)',
    type: 'Full-time',
    experience: '3 - 7 Years',
    salary: '₹32 - 48 LPA ($150k - $190k)',
    tags: ['React', 'TypeScript', 'Three.js', 'WebGPU', 'Node.js'],
    featured: false,
    description: 'Architect cutting-edge browser-based visual simulation dashboards, interactive digital twins, and high-performance real-time UIs.'
  },
  {
    id: 'cloud-sre',
    title: 'Principal Cloud Platform & SRE Lead',
    department: 'Infrastructure',
    location: 'London / Remote',
    type: 'Full-time',
    experience: '5+ Years',
    salary: '£110k - £145k ($165k - $215k)',
    tags: ['Kubernetes', 'Terraform', 'AWS', 'eBPF', 'Prometheus'],
    featured: false,
    description: 'Own global multi-cloud reliability, automate self-healing Kubernetes topologies, and maintain 99.999% SLA across 48 regions.'
  },
  {
    id: 'cyber-sec',
    title: 'Senior Cyber Defense & Zero-Trust Analyst',
    department: 'Security',
    location: 'Bengaluru / San Francisco',
    type: 'Full-time',
    experience: '3 - 6 Years',
    salary: '₹28 - 45 LPA ($140k - $185k)',
    tags: ['Zero Trust', 'Post-Quantum Crypto', 'Cloud SIEM', 'Pen Testing'],
    featured: false,
    description: 'Defend petabyte-scale financial pipelines against advanced threat actors through continuous automated red-teaming.'
  },
  {
    id: 'product-designer',
    title: 'Senior Product Designer & Design Technologist',
    department: 'Design',
    location: 'Remote (Americas / EMEA / APAC)',
    type: 'Full-time',
    experience: '2 - 5 Years',
    salary: '$120k - $160k',
    tags: ['Figma', 'Prototyping', 'Design Systems', 'Micro-interactions'],
    featured: false,
    description: 'Design intuitive developer-first software experiences, spatial glassmorphic interfaces, and complex enterprise data visualizations.'
  },
  {
    id: 'associate-swe',
    title: 'Graduate Associate Software Engineer (Batch 2024–2026)',
    department: 'Engineering',
    location: 'Bengaluru / Noida / Pune',
    type: 'Full-time',
    experience: 'Fresher / 0 - 2 Years',
    salary: '₹14 - 24 LPA',
    tags: ['Data Structures', 'C++', 'Java / Python', 'Modern JavaScript'],
    featured: true,
    description: 'Accelerate your career through Yadav Inftech’s elite incubator rotation program, pairing directly with Staff and Principal engineers.'
  }
];

export default function OpenPositions({ onApplyToJob }) {
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const departments = ['All', 'Engineering', 'AI Research', 'Infrastructure', 'Security', 'Design'];

  const filteredJobs = jobRoles.filter((job) => {
    const matchesDept = selectedDept === 'All' || job.department === selectedDept;
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <section id="positions" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-800/50 text-cyan-400 text-xs font-mono mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>GLOBAL OPPORTUNITIES</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Open Engineering Positions
          </h2>
          <p className="text-slate-400 mt-3 text-base">
            Work alongside world-class systems thinkers. Every position offers transparent tier-based compensation, equity grants, and autonomy to invent.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4 glass-card p-3 rounded-2xl border border-white/10">
          {/* Department Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => {
                  sound.playClick();
                  setSelectedDept(dept);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedDept === dept
                    ? 'bg-cyan-500 text-black font-semibold shadow-md shadow-cyan-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by role or skill (e.g. Rust, PyTorch)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900/80 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-all"
            />
          </div>
        </div>

        {/* Job Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AnimatePresence>
            {filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="group relative p-6 rounded-2xl glass-card border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                        {job.department}
                      </span>
                      <h3 className="font-heading text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mt-0.5">
                        {job.title}
                      </h3>
                    </div>

                    {job.featured && (
                      <span className="shrink-0 flex items-center gap-1 text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/40">
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                        HOT ROLE
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-400 mb-5 font-mono">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {job.experience}
                    </span>
                    <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                      <DollarSign className="w-3.5 h-3.5" />
                      {job.salary}
                    </span>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-slate-900/90 text-slate-300 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Apply Trigger */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-sans">
                    Batch: <span className="text-slate-200 font-medium">Immediate / Q3 2026</span>
                  </span>

                  <button
                    onClick={() => {
                      sound.playClick();
                      onApplyToJob(job.title);
                    }}
                    className="relative px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-black font-heading font-semibold text-xs tracking-wider border border-cyan-500/30 hover:border-cyan-400 transition-all flex items-center gap-2 shadow-sm group/btn"
                  >
                    <span>Apply for Role</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12 glass-panel rounded-2xl border border-white/10">
            <p className="text-slate-400 text-sm">No positions match your search criteria.</p>
            <button
              onClick={() => {
                setSelectedDept('All');
                setSearchTerm('');
              }}
              className="mt-3 text-xs text-cyan-400 hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
