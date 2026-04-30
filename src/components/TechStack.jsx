import React from 'react';
import { motion } from 'framer-motion';

const technologies = [
  { name: 'Git', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'GitHub', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { name: 'React', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
  { name: 'Vite', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg' },
  { name: 'TypeScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Tailwind CSS', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },  
  { name: 'JavaScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Python', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'PHP', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { name: 'Kotlin', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' },
  { name: 'Java', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
];

const TechStack = () => {
  return (
    <section className="space-y-6">
      <motion.h3 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.001 }}
        className="text-xl font-semibold text-zinc-300 flex items-center gap-2"
      >
        <span className="text-2xl"></span> Language and tools
      </motion.h3>

      <div className="flex flex-wrap gap-4 justify-center bg-zinc-800/50 p-6 rounded-2xl border border-zinc-700/50 backdrop-blur-sm">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 } }}
            whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.1 } }}
            className="relative group p-2 bg-zinc-700/30 rounded-xl hover:bg-zinc-700/50 transition-colors cursor-pointer"
            title={tech.name}
          >
            <img 
              src={tech.src} 
              alt={`${tech.name} logo`} 
              className="h-10 w-10 md:h-12 md:w-12 object-contain drop-shadow-md" 
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
