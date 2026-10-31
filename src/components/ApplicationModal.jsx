import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  Code2, 
  Briefcase, 
  UploadCloud, 
  FileText, 
  MessageSquare, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Check, 
  Trash2,
  Lock,
  Zap,
  Info
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './SocialIcons';
import { jobRoles } from './OpenPositions';
import EscapingSubmitButton from './EscapingSubmitButton';
import { sound } from '../utils/soundEffects';

const POPULAR_SKILLS = [
  'React', 'TypeScript', 'Node.js', 'Rust', 'Go', 'Python', 'PyTorch', 
  'Docker', 'Kubernetes', 'AWS', 'GraphQL', 'Next.js', 'PostgreSQL', 'TailwindCSS'
];

export default function ApplicationModal({ 
  isOpen, 
  onClose, 
  defaultPosition = '',
  onTriggerPrankReveal 
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    college: '',
    degree: 'B.Tech / B.E.',
    branch: '',
    gradYear: '2025',
    skills: ['React', 'TypeScript', 'Node.js'],
    customSkill: '',
    experienceLevel: 'Fresher / 0 - 2 Years',
    position: defaultPosition || 'Lead Full-Stack WebGL / 3D Architect',
    resumeFile: null,
    resumeName: '',
    whyJoin: '',
  });

  const [errors, setErrors] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Sync default position when changed
  React.useEffect(() => {
    if (defaultPosition) {
      setFormData((prev) => ({ ...prev, position: defaultPosition }));
    }
  }, [defaultPosition]);

  // Quick Demo Autofill for convenient testing
  const handleAutofillDemo = () => {
    sound.playClick();
    setFormData({
      fullName: 'Alex Vance',
      email: 'alex.vance@mit.edu',
      phone: '+1 (555) 432-8921',
      location: 'San Francisco, CA',
      linkedin: 'https://linkedin.com/in/alex-vance-swe',
      github: 'https://github.com/alexvance',
      college: 'Stanford University / IIT Bombay',
      degree: 'B.Tech / B.E. Computer Science',
      branch: 'Computer Science & Artificial Intelligence',
      gradYear: '2025',
      skills: ['Rust', 'React', 'PyTorch', 'TypeScript', 'Docker', 'Go'],
      customSkill: '',
      experienceLevel: 'Fresher / 0 - 2 Years',
      position: defaultPosition || 'Lead Full-Stack WebGL / 3D Architect',
      resumeFile: { name: 'Alex_Vance_Resume_Staff_2026.pdf', size: 1024 * 340 },
      resumeName: 'Alex_Vance_Resume_Staff_2026.pdf',
      whyJoin: 'Yadav Inftech’s focus on planet-scale distributed infrastructure and autonomous computing aligns perfectly with my research in low-latency systems.'
    });
    setUploadProgress(100);
    setErrors({});
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const toggleSkill = (skill) => {
    sound.playClick();
    setFormData((prev) => {
      const exists = prev.skills.includes(skill);
      const updated = exists 
        ? prev.skills.filter((s) => s !== skill) 
        : [...prev.skills, skill];
      return { ...prev, skills: updated };
    });
  };

  const addCustomSkill = () => {
    if (formData.customSkill.trim()) {
      sound.playClick();
      setFormData((prev) => ({
        ...prev,
        skills: [...new Set([...prev.skills, prev.customSkill.trim()])],
        customSkill: '',
      }));
    }
  };

  // Resume Drag & Drop / File Upload
  const handleFileUpload = (file) => {
    if (!file) return;
    const allowed = ['.pdf', '.doc', '.docx'];
    const ext = '.' + file.name.split('.').pop().toLowerCase();
    if (!allowed.includes(ext)) {
      setErrors((prev) => ({ ...prev, resume: 'Please upload a PDF, DOC, or DOCX document.' }));
      return;
    }

    setIsUploading(true);
    setUploadProgress(20);
    sound.playClick();

    let p = 20;
    const timer = setInterval(() => {
      p += 25;
      if (p >= 100) {
        p = 100;
        clearInterval(timer);
        setIsUploading(false);
        setUploadProgress(100);
        setFormData((prev) => ({
          ...prev,
          resumeFile: file,
          resumeName: file.name,
        }));
      }
      setUploadProgress(p);
    }, 120);
  };

  // Step Validation
  const validateCurrentStep = () => {
    const errs = {};
    if (currentStep === 1) {
      if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
      if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
      if (!formData.phone.trim()) errs.phone = 'Phone number is required';
      if (!formData.location.trim()) errs.location = 'Current location is required';
    } else if (currentStep === 2) {
      if (!formData.college.trim()) errs.college = 'College/University name is required';
      if (!formData.branch.trim()) errs.branch = 'Branch/Specialization is required';
      if (formData.skills.length === 0) errs.skills = 'Select at least one technical skill';
    } else if (currentStep === 3) {
      if (!formData.resumeName) errs.resume = 'Resume document is required';
      if (!formData.whyJoin.trim()) errs.whyJoin = 'Please share a brief note on why you want to join';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      sound.playClick();
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevStep = () => {
    sound.playClick();
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-3xl glass-card border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-4"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-[#070d1e] rounded-[10px] flex items-center justify-center text-cyan-400 font-heading font-black">
                YI
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-lg sm:text-xl font-bold text-white">
                  Yadav Inftech Careers
                </h3>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                  CONFIDENTIAL
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Official Engineering & Talent Acquisition Portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Demo Autofill button for convenient evaluation */}
            <button
              onClick={handleAutofillDemo}
              type="button"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-mono border border-cyan-500/30 transition-all"
              title="Autofill form with candidate demo data"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Autofill Sample</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar & Steps Ribbon */}
        <div className="px-6 py-4 bg-slate-900/40 border-b border-white/5">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>STEP {currentStep} OF {totalSteps}</span>
            <span className="text-cyan-400 font-semibold">
              {currentStep === 1 && 'Personal & Contact Information'}
              {currentStep === 2 && 'Academics & Core Competencies'}
              {currentStep === 3 && 'Role & Resume Dossier'}
              {currentStep === 4 && 'Verification & Final Dispatch'}
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500"
              initial={{ width: '25%' }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto">
          {/* STEP 1: Personal & Contact */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Full Name <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={`w-full bg-slate-950/80 border ${errors.fullName ? 'border-rose-500' : 'border-white/10'} rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-all`}
                    />
                  </div>
                  {errors.fullName && <p className="text-[11px] text-rose-400 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Email Address <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full bg-slate-950/80 border ${errors.email ? 'border-rose-500' : 'border-white/10'} rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-all`}
                    />
                  </div>
                  {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Phone Number <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full bg-slate-950/80 border ${errors.phone ? 'border-rose-500' : 'border-white/10'} rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-all`}
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Current Location <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Bengaluru, India"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className={`w-full bg-slate-950/80 border ${errors.location ? 'border-rose-500' : 'border-white/10'} rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-all`}
                    />
                  </div>
                  {errors.location && <p className="text-[11px] text-rose-400 mt-1">{errors.location}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    LinkedIn Profile
                  </label>
                  <div className="relative">
                    <LinkedinIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/username"
                      value={formData.linkedin}
                      onChange={(e) => handleInputChange('linkedin', e.target.value)}
                      className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    GitHub Profile
                  </label>
                  <div className="relative">
                    <GithubIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      placeholder="https://github.com/username"
                      value={formData.github}
                      onChange={(e) => handleInputChange('github', e.target.value)}
                      className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-all"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Academics & Skills */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-5"
            >
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  College / University <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. National Institute of Technology, Trichy"
                    value={formData.college}
                    onChange={(e) => handleInputChange('college', e.target.value)}
                    className={`w-full bg-slate-950/80 border ${errors.college ? 'border-rose-500' : 'border-white/10'} rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-all`}
                  />
                </div>
                {errors.college && <p className="text-[11px] text-rose-400 mt-1">{errors.college}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Degree
                  </label>
                  <select
                    value={formData.degree}
                    onChange={(e) => handleInputChange('degree', e.target.value)}
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="B.Tech / B.E.">B.Tech / B.E.</option>
                    <option value="M.Tech / M.E.">M.Tech / M.E.</option>
                    <option value="B.Sc / M.Sc">B.Sc / M.Sc</option>
                    <option value="BCA / MCA">BCA / MCA</option>
                    <option value="Ph.D. / Research">Ph.D. / Research</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Branch / Specialization <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Computer Science & Engg"
                    value={formData.branch}
                    onChange={(e) => handleInputChange('branch', e.target.value)}
                    className={`w-full bg-slate-950/80 border ${errors.branch ? 'border-rose-500' : 'border-white/10'} rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400`}
                  />
                  {errors.branch && <p className="text-[11px] text-rose-400 mt-1">{errors.branch}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Graduation Year
                  </label>
                  <select
                    value={formData.gradYear}
                    onChange={(e) => handleInputChange('gradYear', e.target.value)}
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="2027">2027 (Undergrad)</option>
                    <option value="2026">2026 (Upcoming)</option>
                    <option value="2025">2025 (Graduating)</option>
                    <option value="2024">2024 (Batch)</option>
                    <option value="2023">2023</option>
                    <option value="Prior to 2023">Prior to 2023</option>
                  </select>
                </div>
              </div>

              {/* Technical Skills Selection */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">
                  Technical Skills <span className="text-cyan-400">*</span>
                  <span className="text-slate-500 text-[11px] ml-2">Click to select or type custom below</span>
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {POPULAR_SKILLS.map((skill) => {
                    const isSelected = formData.skills.includes(skill);
                    return (
                      <button
                        type="button"
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 font-semibold shadow-sm'
                            : 'bg-slate-950/70 text-slate-400 border border-white/5 hover:border-white/20'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-cyan-400" />}
                        <span>{skill}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom skill input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add other skill (e.g. gRPC, Spark, WebGPU)..."
                    value={formData.customSkill}
                    onChange={(e) => handleInputChange('customSkill', e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addCustomSkill();
                      }
                    }}
                    className="flex-1 bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="button"
                    onClick={addCustomSkill}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-all"
                  >
                    Add
                  </button>
                </div>
                {errors.skills && <p className="text-[11px] text-rose-400 mt-1">{errors.skills}</p>}
              </div>
            </motion.div>
          )}

          {/* STEP 3: Experience & Resume */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Position Applying For <span className="text-cyan-400">*</span>
                  </label>
                  <select
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    {jobRoles.map((r) => (
                      <option key={r.id} value={r.title}>
                        {r.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Experience Level
                  </label>
                  <select
                    value={formData.experienceLevel}
                    onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Fresher / 0 - 2 Years">Fresher / 0 - 2 Years</option>
                    <option value="Mid-Level (2 - 5 Years)">Mid-Level (2 - 5 Years)</option>
                    <option value="Senior (5 - 8 Years)">Senior (5 - 8 Years)</option>
                    <option value="Staff / Principal (8+ Years)">Staff / Principal (8+ Years)</option>
                  </select>
                </div>
              </div>

              {/* Resume Drag & Drop Zone */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Upload Resume (PDF, DOC, DOCX) <span className="text-cyan-400">*</span>
                </label>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleFileUpload(e.dataTransfer.files[0]);
                    }
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  className="cursor-pointer border-2 border-dashed border-white/15 hover:border-cyan-400/50 rounded-2xl p-6 text-center bg-slate-950/60 transition-all group"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileUpload(e.target.files[0]);
                      }
                    }}
                  />

                  {formData.resumeName ? (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/40">
                      <div className="flex items-center gap-3">
                        <FileText className="w-6 h-6 text-cyan-400" />
                        <div className="text-left">
                          <p className="text-xs font-medium text-white">{formData.resumeName}</p>
                          <p className="text-[10px] text-cyan-400/80 font-mono">100% Parsed & Ready</p>
                        </div>
                      </div>
                      <span className="text-xs text-cyan-300 font-mono">Ready ✓</span>
                    </div>
                  ) : (
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <p className="text-xs text-white font-medium mb-1">
                        Click to browse or drag & drop your resume file here
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Supports PDF, DOC, DOCX up to 15MB
                      </p>
                    </div>
                  )}

                  {isUploading && (
                    <div className="mt-3">
                      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cyan-400 transition-all duration-150"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-cyan-300 mt-1 block">
                        Validating file signature... {uploadProgress}%
                      </span>
                    </div>
                  )}
                </div>
                {errors.resume && <p className="text-[11px] text-rose-400 mt-1">{errors.resume}</p>}
              </div>

              {/* Why Yadav Inftech */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Why do you want to join Yadav Inftech? <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us what excites you about our distributed architecture, systems engineering culture, and long-term vision..."
                  value={formData.whyJoin}
                  onChange={(e) => handleInputChange('whyJoin', e.target.value)}
                  className={`w-full bg-slate-950/80 border ${errors.whyJoin ? 'border-rose-500' : 'border-white/10'} rounded-xl p-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-all`}
                />
                {errors.whyJoin && <p className="text-[11px] text-rose-400 mt-1">{errors.whyJoin}</p>}
              </div>
            </motion.div>
          )}

          {/* STEP 4: Review & The Main Prank Submission */}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              {/* Review Candidate Dossier */}
              <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-slate-400 font-mono">APPLICATION DOSSIER:</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
                    STATUS: ALL CHECKS PASSED
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4">
                  <div>
                    <span className="text-slate-500 block text-[10px]">CANDIDATE</span>
                    <span className="text-white font-medium">{formData.fullName || '—'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">EMAIL</span>
                    <span className="text-white font-medium truncate block">{formData.email || '—'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">PHONE</span>
                    <span className="text-white font-medium">{formData.phone || '—'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">ROLE APPLIED</span>
                    <span className="text-cyan-300 font-semibold">{formData.position}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">EXPERIENCE</span>
                    <span className="text-white font-medium">{formData.experienceLevel}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">RESUME</span>
                    <span className="text-white font-medium truncate block">{formData.resumeName || 'Attached'}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 flex flex-wrap gap-1">
                  <span className="text-[10px] text-slate-500 mr-1">Skills:</span>
                  {formData.skills.map((s) => (
                    <span key={s} className="px-1.5 py-0.5 rounded bg-white/5 text-slate-300 text-[10px] font-mono">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* The Escaping Submit Button Arena */}
              <div>
                <EscapingSubmitButton
                  onTriggerCelebration={() => {
                    onClose();
                    onTriggerPrankReveal(formData);
                  }}
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Modal Footer Controls (Steps 1, 2, 3 have standard navigation; Step 4 uses escaping button inside) */}
        <div className="p-6 border-t border-white/10 flex items-center justify-between bg-slate-950/60">
          <div>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-4 py-2.5 rounded-xl glass-panel-interactive border border-white/10 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-heading font-bold text-xs tracking-wider uppercase shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <span className="text-[11px] font-mono text-cyan-400">
                🔒 Ready for final submission
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
