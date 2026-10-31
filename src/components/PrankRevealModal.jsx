import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Smile, 
  RotateCcw, 
  Share2, 
  Check, 
  Award, 
  Sparkles, 
  ShieldCheck, 
  Download, 
  X,
  FileCheck2,
  Printer
} from 'lucide-react';
import { sound } from '../utils/soundEffects';

export default function PrankRevealModal({ isOpen, onClose, onReset, formData }) {
  const [copied, setCopied] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const certRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Play celebratory fanfare
      sound.playFanfare();

      // Launch multi-burst confetti fireworks
      const count = 200;
      const defaults = { origin: { y: 0.7 } };

      function fire(particleRatio, opts) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    }
  }, [isOpen]);

  const handleShare = () => {
    sound.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const candidateName = formData?.fullName?.trim() || 'Distinguished Engineer';
  const roleApplied = formData?.position || 'Lead Distributed Systems Architect';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6">
      
      {/* Background radial lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/20 via-rose-500/15 to-amber-500/20 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative max-w-2xl w-full glass-card border-2 border-cyan-400/50 p-6 sm:p-10 rounded-3xl text-center shadow-2xl overflow-hidden my-8"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Fun Animated Trophy / Emoji */}
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
          className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-5 rounded-3xl bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 p-[3px] shadow-2xl shadow-rose-500/30 flex items-center justify-center text-4xl sm:text-5xl"
        >
          <div className="w-full h-full bg-[#0a0f24] rounded-[22px] flex items-center justify-center">
            😂
          </div>
        </motion.div>

        {/* Headline */}
        <h2 className="font-heading text-3xl sm:text-5xl font-black text-white tracking-tight uppercase mb-2">
          GOTCHA! <br />
          <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-cyan-400 bg-clip-text text-transparent">
            YOU JUST GOT PRANKED!
          </span>
        </h2>

        {/* Customized Prank Mastermind Callout */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-rose-500/20 via-amber-500/20 to-purple-500/20 border border-amber-400/40 text-rose-200 font-heading text-sm sm:text-base font-bold my-3 shadow-lg shadow-rose-500/10">
          <span>🎯 You got pranked by</span>
          <span className="text-amber-300 font-extrabold tracking-wide text-base sm:text-lg underline decoration-amber-400 decoration-2 underline-offset-4">
            Hariom Yadav
          </span>
          <span className="text-lg">😎</span>
        </div>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-200 font-semibold max-w-xl mx-auto mb-6">
          Welcome to Yadav Inftech. Your first challenge was catching the Submit button!
        </p>

        {/* Funny Assessment Summary */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10 text-left mb-6 max-w-lg mx-auto space-y-3 font-mono text-xs sm:text-sm">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-slate-400">Prank Mastermind:</span>
            <span className="text-amber-300 font-bold">Hariom Yadav 👑</span>
          </div>
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-slate-400">Candidate Name:</span>
            <span className="text-cyan-300 font-bold">{candidateName}</span>
          </div>
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-slate-400">Target Role:</span>
            <span className="text-amber-300 font-semibold">{roleApplied}</span>
          </div>
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-slate-400">Submit Button Speed:</span>
            <span className="text-rose-400 font-bold">Mach 3.8 (Ultra Reflex)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Interview Result:</span>
            <span className="text-emerald-400 font-bold">Certified Button Chaser 🏆</span>
          </div>
        </div>

        {/* Privacy Assurance Badge */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 bg-white/5 py-2.5 px-4 rounded-xl max-w-md mx-auto mb-8 border border-white/5">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>No personal data or resumes were transmitted. Everything stayed safely in your browser!</span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto mb-6">
          {/* Certificate View */}
          <button
            onClick={() => {
              sound.playClick();
              setShowCertificate(true);
            }}
            className="py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-heading font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Award className="w-4 h-4" />
            <span>Get Offer Letter</span>
          </button>

          {/* Share with Friends */}
          <button
            onClick={handleShare}
            className="py-3 px-4 rounded-xl glass-panel-interactive border border-cyan-500/30 text-cyan-300 font-heading font-semibold text-xs sm:text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Prank Friends</span>
              </>
            )}
          </button>

          {/* Try Again */}
          <button
            onClick={() => {
              sound.playClick();
              onReset();
            }}
            className="py-3 px-4 rounded-xl glass-panel-interactive border border-white/10 text-slate-300 hover:text-white font-heading font-semibold text-xs sm:text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>

        {/* Small Fictional Disclaimer */}
        <p className="text-[11px] text-slate-500 max-w-md mx-auto leading-relaxed">
          * Disclaimer: Yadav Inftech is a humorous web application demonstration. No job offer was harmed or dispatched in the making of this prank.
        </p>
      </motion.div>

      {/* Modal: Interactive "Official Prank Offer Letter / Certificate" */}
      <AnimatePresence>
        {showCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-2xl w-full bg-slate-950 border-2 border-amber-400/60 p-6 sm:p-10 rounded-3xl text-left relative shadow-2xl my-8 text-white font-sans"
              ref={certRef}
            >
              <button
                onClick={() => setShowCertificate(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Certificate Border Header */}
              <div className="text-center border-b border-amber-500/30 pb-6 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono mb-2">
                  <Award className="w-3.5 h-3.5" />
                  <span>HONORARY MERIT CERTIFICATE</span>
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                  YADAV INFTECH CORPORATION
                </h3>
                <p className="text-xs text-amber-300 font-mono tracking-widest mt-1">
                  OFFICIAL OFFER OF ENDLESS PERSISTENCE
                </p>
              </div>

              {/* Body */}
              <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-normal">
                <p>
                  This document officially certifies that <strong className="text-white text-base font-semibold">{candidateName}</strong> has demonstrated unmatched tenacity, lightning-fast mouse tracking, and unwavering patience while applying for the role of <span className="text-amber-300 font-semibold">{roleApplied}</span>.
                </p>

                <p>
                  Whereas most mortal applicants give up when the Submit button breaks the speed of sound, you valiantly chased it across the screen, proving your qualifications as a true engineer who never surrenders to rebellious UI bugs.
                </p>

                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs font-mono space-y-1">
                  <div>✦ Position Awarded: <span className="text-amber-300">Chief Elusive Button Wrangler</span></div>
                  <div>✦ Annual Compensation: <span className="text-emerald-400">∞ Infinite Laughs + 100 Karma Points</span></div>
                  <div>✦ Reporting Manager: <span className="text-cyan-300">The Escaping Submit Button 🏃💨</span></div>
                  <div>✦ Verification Hash: <span className="text-slate-400">YADAV-PRANK-2026-LEGENDARY</span></div>
                </div>
              </div>

              {/* Signatures */}
              <div className="pt-8 mt-6 border-t border-amber-500/30 flex items-center justify-between text-xs font-mono">
                <div>
                  <div className="font-serif italic text-base text-amber-300">Hariom Yadav</div>
                  <div className="text-slate-400">Founder & Chief Prankster</div>
                  <div className="text-[10px] text-slate-500">Yadav Inftech Labs</div>
                </div>

                <div className="text-right">
                  <div className="font-serif italic text-base text-cyan-300">Submit Button</div>
                  <div className="text-slate-400">Director of Dodging</div>
                  <div className="text-[10px] text-slate-500">Still Running Away</div>
                </div>
              </div>

              {/* Print / Save button */}
              <div className="mt-8 flex justify-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs flex items-center gap-2 transition-all"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save Certificate</span>
                </button>

                <button
                  onClick={() => setShowCertificate(false)}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 text-black font-semibold text-xs flex items-center gap-2 hover:bg-amber-400 transition-all"
                >
                  <span>Close Certificate</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
