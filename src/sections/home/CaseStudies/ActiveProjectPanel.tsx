import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { CaseStudy } from '../../../constants/caseStudies';

interface ActiveProjectPanelProps {
  project: CaseStudy;
}

export const ActiveProjectPanel: React.FC<ActiveProjectPanelProps> = ({ project }) => {
  return (
    <div className="relative min-h-[240px] w-full flex flex-col justify-between mt-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4"
        >
          {/* Industry & Title */}
          <div>
            <span className="text-[10px] lg:text-[11px] font-bold text-brand-purple tracking-widest uppercase block mb-1">
              {project.industry}
            </span>
            <h3 className="text-2xl lg:text-3xl font-serif text-neutral-900 font-bold tracking-tight">
              {project.name}
            </h3>
          </div>

          {/* Description */}
          <p className="text-xs lg:text-sm leading-relaxed text-neutral-500 max-w-[480px]">
            {project.description}
          </p>

          {/* Services & Tech */}
          <div className="flex flex-wrap gap-2 my-1">
            {project.technologies.slice(0, 3).map((tech) => (
              <span 
                key={tech} 
                className="text-[10px] lg:text-[11px] font-medium text-neutral-600 bg-neutral-50/50 border border-neutral-100/80 rounded-full px-3 py-1"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Visit Project Button CTA */}
          <div className="mt-2">
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 group text-xs lg:text-sm font-bold text-brand-purple uppercase tracking-wider"
            >
              <span>Visit Project</span>
              <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-brand-purple/5 border border-brand-purple/10 group-hover:bg-brand-purple group-hover:text-white transition-all duration-300">
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-[1px] group-hover:translate-y-[-1px] transition-transform duration-300" />
              </span>
            </a>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
export default ActiveProjectPanel;
