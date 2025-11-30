import { motion } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  link?: string;
}

const projects: Project[] = [
  {
    id: 'prism',
    title: 'Prism',
    description: 'A modern web application for data visualization and analytics with real-time collaboration features.',
    image: '/projects/prism.jpg',
    techStack: ['React', 'TypeScript', 'D3.js', 'WebSocket'],
  },
  {
    id: 'swolemates',
    title: 'Swolemates',
    description: 'Fitness tracking and social platform connecting workout enthusiasts and enabling shared fitness goals.',
    image: '/projects/swolemates.jpg',
    techStack: ['React Native', 'Node.js', 'MongoDB', 'Firebase'],
  },
  {
    id: 'crisis-trainer',
    title: 'Crisis Trainer+',
    description: 'Interactive training platform for emergency response scenarios with AI-powered feedback and assessment.',
    image: '/projects/crisis-trainer.jpg',
    techStack: ['React', 'FastAPI', 'TensorFlow', 'PostgreSQL'],
  },
  {
    id: 'boycott-pro',
    title: 'BoycottPro',
    description: 'Consumer awareness tool helping users make informed purchasing decisions based on ethical considerations.',
    image: '/projects/boycott-pro.jpg',
    techStack: ['React', 'Node.js', 'Express', 'MySQL'],
  },
  {
    id: 'simplify-next',
    title: 'SimplifyNext',
    description: 'Code generation and automation toolkit streamlining Next.js development workflows and boilerplate.',
    image: '/projects/simplify-next.jpg',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'OpenAI API'],
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
            A selection of projects that showcase my approach to solving complex problems through thoughtful design and development.
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
                <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={project.image}
                    alt={`${project.title} project`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
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


