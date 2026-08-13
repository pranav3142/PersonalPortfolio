export { LoadingScreen } from './LoadingScreen';
export { Navigation } from './Navigation';
export { Hero } from './Hero';
export { About } from './About';
export { Projects } from './Projects';
export { Experience } from './Experience';
export { Education } from './Education';
export { Skills } from './Skills';
export { Contact } from './Contact';
export { Footer } from './Footer';
// Chatbot is intentionally NOT re-exported here — App.tsx lazy-imports it
// directly so the Gemini SDK splits into its own chunk. Re-exporting it from
// this barrel would statically pull it back into the main bundle.
