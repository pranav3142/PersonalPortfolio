import { Suspense, lazy, useEffect, useState } from 'react';

import {
  LoadingScreen,
  Navigation,
  Hero,
  About,
  Projects,
  Experience,
  Education,
  Skills,
  Contact,
  Footer,
} from './components';
import { CtfBanner } from './components/CtfBanner';

// Code-split the heavy dependencies out of the initial bundle so first paint
// doesn't pay for them: ThreeBackground pulls in three + @react-three/*, and
// Chatbot pulls in @google/generative-ai. Both load after the page is up.
const ThreeBackground = lazy(() =>
  import('./components/ThreeBackground').then((m) => ({ default: m.ThreeBackground }))
);
const Chatbot = lazy(() => import('./components/Chatbot'));
const Ctf = lazy(() => import('./components/Ctf'));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [vaultOpen, setVaultOpen] = useState(false);

  // Hidden treasure hunt: Stage 1 (console hint) + #vault / Konami triggers.
  useEffect(() => {
    const solved = (() => {
      try {
        return localStorage.getItem('ctf_solved') === '1';
      } catch {
        return false;
      }
    })();
    console.log('%c🔐 psst…', 'font-size:16px;font-weight:bold');
    console.log(
      solved
        ? '%cyou already cracked the vault. respect. 😎'
        : '%cThere is a 3-stage hunt hidden in this site.\nStage 1 ▸ even robots follow rules.  (hint: /robots.txt)',
      'color:#94a3b8;line-height:1.6'
    );

    const checkHash = () => setVaultOpen(window.location.hash.toLowerCase() === '#vault');
    checkHash();
    window.addEventListener('hashchange', checkHash);

    // Konami code → open the vault.
    const seq = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
    let i = 0;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      i = k === seq[i] ? i + 1 : k === seq[0] ? 1 : 0;
      if (i === seq.length) {
        i = 0;
        window.location.hash = 'vault';
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('hashchange', checkHash);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const closeVault = () => {
    setVaultOpen(false);
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>

      {/* Pixel-art mountain loading screen (fades out, then unmounts) */}
      {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}

      {/* Three.js Background (lazy — falls back to nothing while loading) */}
      <Suspense fallback={null}>
        <ThreeBackground />
      </Suspense>

      {/* Main Application */}
      <div className="min-h-screen relative text-gray-900">
        {/* Navigation */}
        <Navigation />

        {/* Main content wrapper with semantic HTML */}
        <main id="main-content">
          {/* Hero Section */}
          <Hero />

          {/* About Section */}
          <About />

          {/* Projects Section */}
          <Projects />

          {/* Experience Section */}
          <Experience />

          {/* Education Section */}
          <Education />

          {/* Skills Section */}
          <Skills />

          {/* Contact Section */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Chatbot (lazy — Gemini SDK loads only when this mounts) */}
        <Suspense fallback={null}>
          <Chatbot />
        </Suspense>
      </div>

      {/* Bottom-left nudge advertising the hidden CTF */}
      <CtfBanner />

      {/* Hidden CTF vault (lazy — only loads when triggered) */}
      {vaultOpen && (
        <Suspense fallback={null}>
          <Ctf onClose={closeVault} />
        </Suspense>
      )}
    </>
  );
}

export default App;
