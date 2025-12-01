import { motion } from 'framer-motion';
import { Medal } from 'lucide-react';

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
    title: 'Prism',
    description: 'HTX Microsoft Hacx hackathon 2025. A modern application for data visualization, analytics using edge AI with real-time collaboration features. Made for prisoner transport vehicles',
    image: '/projects/Prism.png',
    techStack: ['React', 'TypeScript', 'Vite', 'Azure', 'PostgreSQL'],
    badge: '2nd place winners',
  },
  {
    id: 'swolemates',
    title: 'Swolemates',
    description: 'Made for CP2106 Independent Software Development Project Fitness tracking and social platform connecting workout enthusiasts. Personalized AI workout generator and smart buddy matching using ML reccomendation system.',
    image: '/projects/swolemates.png',
    techStack: ['React Native', 'Node.js', 'Supabase', 'Firebase', 'Expo', 'FastAPI', 'Gemini API', 'PostgreSQL'],
    badge: 'Apollo level of achievement',
  },
  {
    id: 'crisis-trainer',
    title: 'Crisis Trainer+',
    description: 'Made for DSTA BrainHack hackathon 2025. Interactive training platform for emergency response scenarios with AI-powered feedback and assessment.',
    image: '/projects/crisistrainer.png',
    techStack: ['React', 'FastAPI', 'TensorFlow', 'PostgreSQL'],
    badge: 'Semi-Finalist',
  },
  {
    id: 'movie-recc-telegram-bot',
    title: 'Movie Recomendation Telegram Bot',
    description: 'Using telegram bot API and cosine similarity to provide movie recomendations based on user input.',
    image: '/projects/MoviereccBott.png',
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
            A selection of projects. View the full list of projects on my GitHub profile.
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
                    {project.techStack[0]} • {project.techStack[1]}
                  </div>
                  <h3 className="text-xl lg:text-2xl font-light text-gray-900 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-3 py-1 bg-gray-100 text-gray-700 font-light"
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


