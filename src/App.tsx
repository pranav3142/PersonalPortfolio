import { Suspense, lazy, useState } from 'react';

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

// Code-split the heavy dependencies out of the initial bundle so first paint
// doesn't pay for them: ThreeBackground pulls in three + @react-three/*, and
// Chatbot pulls in @google/generative-ai. Both load after the page is up.
const ThreeBackground = lazy(() =>
  import('./components/ThreeBackground').then((m) => ({ default: m.ThreeBackground }))
);
const Chatbot = lazy(() => import('./components/Chatbot'));

function App() {
  const [isLoading, setIsLoading] = useState(true);

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
    </>
  );
}

export default App;
