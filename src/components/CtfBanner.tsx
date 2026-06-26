import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Flag, X } from 'lucide-react';

/**
 * CtfBanner — a small bottom-left nudge advertising the hidden CTF.
 *
 * Appears a few seconds after load (so it doesn't fight the loading screen /
 * hero entrance), is dismissible, and stays hidden once dismissed or once the
 * vault is solved. Themed to match the vault + loading screen.
 */

const DISMISS_KEY = 'ctf_banner_dismissed';

export function CtfBanner() {
  const [visible, setVisible] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);

  useEffect(() => {
    let dismissed = false;
    let solved = false;
    try {
      dismissed = localStorage.getItem(DISMISS_KEY) === '1';
      solved = localStorage.getItem('ctf_solved') === '1';
    } catch {
      /* storage blocked — just show it */
    }
    if (dismissed || solved) return;
    const t = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* ignore */
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-5 left-5 z-40 max-w-[270px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          role="note"
          aria-label="Hidden challenge hint"
        >
          <div className="flex items-start gap-2.5 rounded-lg border border-white/15 bg-[#0b1020] px-3.5 py-3 font-mono text-xs text-slate-200 shadow-xl">
            <span className="relative mt-0.5 flex-shrink-0">
              <Flag size={14} className="text-emerald-400" />
              <span className="absolute -right-1 -top-1 h-1.5 w-1.5 animate-ping rounded-full bg-emerald-400" />
              <span className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            <div className="min-w-0">
              <p className="text-slate-100">Secret cyber CTF hidden in this site</p>
              {hintVisible ? (
                <p className="mt-0.5 text-slate-400">
                  hint: real hackers open the console <span aria-hidden="true">👀</span>
                </p>
              ) : (
                <button
                  onClick={() => setHintVisible(true)}
                  aria-label="Show hint"
                  className="mt-1 rounded border border-white/15 px-2 py-0.5 text-xs text-slate-300 transition-colors hover:bg-white/10"
                >
                  hint
                </button>
              )}
            </div>
            <button
              onClick={dismiss}
              aria-label="Dismiss hint"
              className="-mr-1 -mt-1 flex-shrink-0 text-slate-500 transition-colors hover:text-white"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CtfBanner;
