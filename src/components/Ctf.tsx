import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

/**
 * Ctf — the hidden "vault" (Stage 3 of the site's treasure hunt).
 *
 * Reached via the #vault URL fragment (clued by the console banner + robots.txt)
 * or the Konami code. Lazy-loaded by App, so it costs nothing on a normal visit.
 * The puzzle is intentionally easy + on-brand: decode a base64 string whose
 * answer ("homomorphic") nods to Pranav's FHE research. Solved state persists.
 */

const ANSWER = 'homomorphic';
const CIPHER = 'aG9tb21vcnBoaWM='; // base64 → "homomorphic"
const FLAG = 'flag{hire_pranav_for_fhe}';
const SOLVED_KEY = 'ctf_solved';

interface CtfProps {
  onClose: () => void;
}

export function Ctf({ onClose }: CtfProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [solved, setSolved] = useState(() => {
    try {
      return localStorage.getItem(SOLVED_KEY) === '1';
    } catch {
      return false;
    }
  });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim().toLowerCase() === ANSWER) {
      setSolved(true);
      setError(false);
      try {
        localStorage.setItem(SOLVED_KEY, '1');
      } catch {
        /* storage may be blocked — solved state is then session-only */
      }
    } else {
      setError(true);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[120] flex items-center justify-center p-4"
      style={{ background: 'rgba(8,12,24,0.92)', backdropFilter: 'blur(4px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      role="dialog"
      aria-modal="true"
      aria-label="Hidden challenge vault"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <style>{`
        @keyframes ctf-shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-5px)} 75%{transform:translateX(5px)} }
        .ctf-shake { animation: ctf-shake 0.35s ease-in-out; }
      `}</style>

      <div className="w-full max-w-xl overflow-hidden rounded-lg border border-white/15 bg-[#0b1020] font-mono text-sm text-slate-200 shadow-2xl">
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
          <span className="text-slate-400">pranav@portfolio:~/vault</span>
          <button onClick={onClose} aria-label="Close" className="text-slate-400 transition-colors hover:text-white">
            <X size={16} />
          </button>
        </div>

        <div className="space-y-3 p-5 leading-relaxed">
          {!solved ? (
            <>
              <p className="text-slate-400">// Stage 3 of 3 — the vault.</p>
              <p>Decode the ciphertext to get the passphrase:</p>
              <p className="select-all break-all rounded bg-white/5 px-3 py-2 text-emerald-300">{CIPHER}</p>
              <p className="text-xs text-slate-500">hint: it&apos;s base64.</p>

              <form onSubmit={submit} className={`flex items-center gap-2 pt-1 ${error ? 'ctf-shake' : ''}`}>
                <span className="text-emerald-400">{'>'}</span>
                <input
                  ref={inputRef}
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    if (error) setError(false);
                  }}
                  placeholder="passphrase"
                  className="flex-1 bg-transparent outline-none placeholder:text-slate-600"
                  autoComplete="off"
                  spellCheck={false}
                />
                <button
                  type="submit"
                  className="rounded border border-white/15 px-2 py-0.5 text-xs transition-colors hover:bg-white/10"
                >
                  enter
                </button>
              </form>
              {error && <p className="text-xs text-rose-400">access denied — try again.</p>}
            </>
          ) : (
            <div className="space-y-3">
              <p className="text-emerald-300">✓ access granted.</p>
              <p className="break-all text-base text-emerald-400">{FLAG}</p>
              <p className="text-slate-300">
                You opened the console, followed the rules, and cracked the vault — that&apos;s
                exactly the kind of curiosity I bring to building things.
              </p>
              <p className="text-slate-400">
                Enjoyed the hunt?{' '}
                <a href="#contact" onClick={onClose} className="text-white underline">
                  Let&apos;s talk →
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Ctf;
