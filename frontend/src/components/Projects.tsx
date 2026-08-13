import { motion } from 'framer-motion';
import { Medal, ExternalLink } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  link?: string;
  badge?: string;
}

const projects: Project[] = [
  {
    id: 'prism',
    title: 'PRISM',
    description: 'HacX Microsoft & HTX Hackathon 2025. A prisoner transport safety system using edge AI to process 360° video and vehicle telemetry locally, with TinyML on OBD-II dongles and wearable sensors for high operational feasibility.',
    image: '/projects/Prism.webp',
    techStack: ['Edge AI', 'TinyML', 'React', 'TypeScript', 'Socket.io', 'IoT'],
    badge: '2nd Place Winner',
  },
  {
    id: 'swolemates',
    title: 'Swolemates',
    description: 'Built for CP2106 Independent Software Development Project (Orbital). A full-stack social fitness tracking app with an AI workout generator powered by Google Gemini Flash and ML-based buddy matching using TF-IDF and cosine similarity.',
    image: '/projects/swolemates.webp',
    techStack: ['React Native', 'Expo', 'FastAPI', 'Supabase', 'Firebase', 'Gemini API', 'PostgreSQL', 'scikit-learn'],
    badge: 'Apollo 11 Achievement',
  },
  {
    id: 'exercise-pose',
    title: 'ML Exercise Pose Detection',
    description: 'End-to-end machine learning project for real-time exercise pose classification and rep counting. Uses PyTorch MLP with scikit-learn preprocessing and MediaPipe Pose for client-side 3D landmark extraction streamed to FastAPI.',
    image: '/projects/exercise-pose.png',
    techStack: ['Python', 'PyTorch', 'MediaPipe', 'FastAPI', 'scikit-learn'],
  },
  {
    id: 'ai-rag-chatbot',
    title: 'AI RAG Chatbot',
    description: 'The chatbot powering this portfolio page. A context-aware Retrieval-Augmented Generation (RAG) assistant built with the Gemini API, featuring robust LLM guardrails and query sanitization pipelines to prevent reasoning leaks.',
    image: '/projects/ai-rag-chatbot.webp',
    techStack: ['TypeScript', 'React', 'Gemini API', 'RAG', 'Vite'],
    badge: 'Live on this site',
  },
  {
    id: 'crisis-trainer',
    title: 'Crisis Trainer+',
    description: 'Built for the DSTA CODE_EXP Hackathon. Mobile training platform teaching civilians how to respond, report, and recover from emergencies, with intuitive UI/UX flows designed in Figma.',
    image: '/projects/crisistrainer.webp',
    techStack: ['React Native', 'FastAPI', 'Figma', 'PostgreSQL'],
    badge: 'Semi-Finalist',
  },
  {
    id: 'movie-recc-telegram-bot',
    title: 'Movie Recommendation Telegram Bot',
    description: 'A Telegram bot that suggests movies based on user preferences, using the Telegram Bot API and cosine similarity to rank recommendations.',
    image: '/projects/MoviereccBott.webp',
    techStack: ['Python', 'Telegram Bot API', 'Cosine Similarity'],
  },
];

/**
 * Projects grid component with professional card layout
 */
export function Projects() {

  return (
    <section id="projects" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-600 text-lg font-light max-w-2xl">
            A selection of projects. View the full list of projects on my <a href="https://github.com/pranav3142" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-900 transition-colors">GitHub profile</a>.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                {/* Project image */}
                <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                  <img
                    src={project.image}
                    alt={`${project.title} project`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {project.badge && (
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-5 py-2 rounded-full shadow-md flex items-center gap-2">
                      <Medal className="w-6 h-6 text-yellow-500" />
                      <span className="text-base font-medium text-gray-800">{project.badge}</span>
                    </div>
                  )}
                </div>

                {/* Project content */}
                <div className="p-6 lg:p-8">
                  <div className="text-xs uppercase tracking-wider text-gray-500 mb-2 font-light">
                    {project.techStack.slice(0, 2).join(' • ')}
                  </div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-xl lg:text-2xl font-light text-gray-900">
                      {project.title}
                    </h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-900 transition-colors flex-shrink-0 mt-1"
                        aria-label={`View ${project.title} project`}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                  <p className="text-gray-600 font-light leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-3 py-1 bg-gray-100 text-gray-700 font-light rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


