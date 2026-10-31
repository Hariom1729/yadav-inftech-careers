import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ShieldAlert, 
  Sparkles, 
  AlertCircle, 
  Smile, 
  Zap,
  Lock,
  Target
} from 'lucide-react';
import { sound } from '../utils/soundEffects';

const FUNNY_MESSAGES = [
  "Oops! Too slow 😂",
  "Are you really trying to catch me?",
  "Almost there!",
  "Your future is running away!",
  "Nice try, candidate!",
  "Yadav Inftech security is too strong!",
  "The HR team is watching you 👀",
  "Error 418: Button has sentient reflexes! 🤖",
  "You need at least 120Hz refresh rate for this!",
  "Work on your mouse agility, future engineer! ⚡"
];

export default function EscapingSubmitButton({ onTriggerCelebration }) {
  const containerRef = useRef(null);
  const buttonRef = useRef(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageKey, setMessageKey] = useState(0);
  const [showPreRevealModal, setShowPreRevealModal] = useState(false);
  const [lastDodgeTime, setLastDodgeTime] = useState(0);

  // Maximum attempts before triggering completion popup
  const MAX_ATTEMPTS = 6;

  // Move button to a safe random spot inside container
  const escapeToRandomPosition = useCallback((fromCursorX = null, fromCursorY = null) => {
    const now = Date.now();
    // throttle slightly to avoid vibrating spasm
    if (now - lastDodgeTime < 180) return;
    setLastDodgeTime(now);

    const container = containerRef.current;
    const button = buttonRef.current;
    if (!container || !button) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    // Available bounds inside container
    const padding = 20;
    const maxDeltaX = (containerRect.width - buttonRect.width) / 2 - padding;
    const maxDeltaY = (containerRect.height - buttonRect.height) / 2 - padding;

    // Pick a new random offset
    let newX = (Math.random() * 2 - 1) * Math.max(80, maxDeltaX);
    let newY = (Math.random() * 2 - 1) * Math.max(60, maxDeltaY);

    // If we have cursor position, push away from it
    if (fromCursorX !== null && fromCursorY !== null) {
      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      const buttonCenterY = buttonRect.top + buttonRect.height / 2;

      const diffX = buttonCenterX - fromCursorX;
      const diffY = buttonCenterY - fromCursorY;

      const angle = Math.atan2(diffY, diffX);
      const jumpDistance = 140 + Math.random() * 80;

      newX = Math.min(Math.max(position.x + Math.cos(angle) * jumpDistance, -maxDeltaX), maxDeltaX);
      newY = Math.min(Math.max(position.y + Math.sin(angle) * jumpDistance, -maxDeltaY), maxDeltaY);
    }

    setPosition({ x: newX, y: newY });

    // Pick a funny message
    const randomMsg = FUNNY_MESSAGES[Math.floor(Math.random() * FUNNY_MESSAGES.length)];
    setCurrentMessage(randomMsg);
    setMessageKey((k) => k + 1);

    // Play playful sound
    if (Math.random() > 0.4) {
      sound.playWhoosh();
    } else {
      sound.playBoing();
    }

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    // After 5-7 attempts (threshold = 6), reveal interview completion dialogue!
    if (nextAttempts >= MAX_ATTEMPTS) {
      setTimeout(() => {
        setShowPreRevealModal(true);
      }, 500);
    }
  }, [attempts, lastDodgeTime, position]);

  // Proximity detection on container
  const handleMouseMove = (e) => {
    if (showPreRevealModal) return;

    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;

    const dist = Math.hypot(e.clientX - buttonCenterX, e.clientY - buttonCenterY);

    // Proximity trigger distance: ~95 pixels
    if (dist < 95) {
      escapeToRandomPosition(e.clientX, e.clientY);
    }
  };

  // Mobile touch trigger
  const handleTouchStart = (e) => {
    if (showPreRevealModal) return;
    const touch = e.touches[0];
    if (touch) {
      escapeToRandomPosition(touch.clientX, touch.clientY);
    } else {
      escapeToRandomPosition();
    }
  };

  return (
    <div className="relative w-full">
      {/* Submissions Arena Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative w-full min-h-[300px] sm:min-h-[340px] rounded-3xl bg-slate-950/70 border-2 border-dashed border-cyan-500/30 p-6 flex flex-col items-center justify-center overflow-hidden select-none"
      >
        {/* Subtle grid background to look like a high-security validation chamber */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #38bdf8 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Security / Anti-bot telemetry headers */}
        <div className="absolute top-4 left-5 right-5 flex items-center justify-between text-[11px] font-mono text-slate-400 pointer-events-none">
          <div className="flex items-center gap-1.5 text-cyan-400">
            <Lock className="w-3.5 h-3.5" />
            <span>FINAL GATEWAY: 256-BIT ENCRYPTED DISPATCH</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">REFLEX VERIFICATION:</span>
            <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              ATTEMPTS: {attempts} / {MAX_ATTEMPTS}
            </span>
          </div>
        </div>

        {/* Informational hint */}
        <p className="text-xs text-slate-400 mb-8 text-center max-w-md pointer-events-none">
          Click below to finalize and transmit your credentials to the Yadav Inftech Executive Hiring Board.
        </p>

        {/* The Escaping Button Wrapper */}
        <div className="relative">
          <motion.div
            ref={buttonRef}
            animate={{
              x: position.x,
              y: position.y,
            }}
            transition={{
              type: 'spring',
              stiffness: 480,
              damping: 24,
              mass: 0.55,
            }}
            className="relative cursor-pointer"
            onTouchStart={handleTouchStart}
            onClick={() => escapeToRandomPosition()}
          >
            {/* Funny Message Speech Bubble */}
            <AnimatePresence mode="wait">
              {currentMessage && (
                <motion.div
                  key={messageKey}
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-black font-extrabold text-xs sm:text-sm shadow-xl shadow-amber-500/30 flex items-center gap-1.5 z-30 pointer-events-none"
                >
                  <span>{currentMessage}</span>
                  {/* Bubble tail */}
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-rose-500 rotate-45 -z-10" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Glowing 3D Submit Button */}
            <div className="relative group p-[2px] rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-400/80 transition-shadow">
              <button
                type="button"
                className="relative px-8 py-4 sm:px-10 sm:py-4.5 rounded-[14px] bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white font-heading font-black text-sm sm:text-base tracking-wider uppercase flex items-center gap-3 overflow-hidden"
              >
                {/* Button Internal Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-white/20 to-cyan-500/10 -translate-x-full animate-[shimmer_2.5s_infinite]" />
                
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent drop-shadow">
                  SUBMIT APPLICATION
                </span>
                <ArrowRight className="w-5 h-5 text-cyan-400" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Helper Bar */}
        <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
          <span className="text-[11px] font-mono text-slate-500">
            {attempts === 0 ? (
              '✦ Move cursor to click Submit ✦'
            ) : attempts < MAX_ATTEMPTS ? (
              <span className="text-amber-400 font-semibold">
                ⚠️ Button trajectory unstable! Keep trying... ({attempts}/{MAX_ATTEMPTS})
              </span>
            ) : (
              <span className="text-cyan-400 font-bold">
                🎉 Interview criteria exceeded!
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Pre-reveal Dialog Popup (Shown after 5-7 failed attempts) */}
      <AnimatePresence>
        {showPreRevealModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="max-w-md w-full glass-card border-2 border-cyan-400 p-8 rounded-3xl text-center shadow-2xl relative overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />

              <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-cyan-500/30">
                <Target className="w-8 h-8 animate-pulse text-cyan-300" />
              </div>

              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
                EVALUATION COMPLETE
              </span>

              <h3 className="font-heading text-2xl font-black text-white mt-2 mb-3">
                Congratulations!
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                You have successfully completed our most difficult interview round: <br />
                <span className="text-cyan-300 font-semibold italic">"The Elusive Submit Button Challenge"</span>
              </p>

              <button
                onClick={() => {
                  setShowPreRevealModal(false);
                  onTriggerCelebration();
                }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-black font-heading font-black text-base tracking-wider uppercase shadow-xl shadow-cyan-500/30 hover:shadow-cyan-400/60 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-black" />
                <span>Reveal the Truth 🔓</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
