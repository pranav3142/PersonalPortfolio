import { useState } from 'react';

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
  Chatbot,
} from './components';
import { ThreeBackground } from './components/ThreeBackground';

function App() {
  const [isLoading, setIsLoading] = useState(true);


  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>

      {/* Loading Screen - conditionally displayed */}
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}



      {/* Three.js Background */}
      <ThreeBackground />

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

        {/* Chatbot */}
        <Chatbot />
      </div>
    </>
  );
}

export default App;
