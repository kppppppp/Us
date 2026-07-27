import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Infinity as InfinityIcon, ShoppingCart, Code, Smartphone, ThumbsUp, Target, User, TrendingUp, Camera } from 'lucide-react';
import { SERVICES_DATA, ORBIT_LAYOUT } from '../../../../constants/layout';

// Icon map for mapping string keys to Lucide React components
const iconMap: Record<string, React.ComponentType<any>> = {
  Infinity: InfinityIcon,
  ShoppingCart,
  Code,
  Smartphone,
  ThumbsUp,
  Target,
  User,
  TrendingUp,
  Camera
};

export const ServiceNodes: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full" style={{ zIndex: 10 }}>
      {SERVICES_DATA.map((service) => {
        // Resolve Ring radius
       const radius = ORBIT_LAYOUT.serviceRadius;

        // Convert polar to cartesian coordinates
        const angleRad = (service.angle * Math.PI) / 180;
        const x = Math.cos(angleRad) * radius;
        const y = Math.sin(angleRad) * radius;

        // Icon Component lookup
        const IconComponent = iconMap[service.icon] || Code;

        // Determine node text layout alignment (left side nodes should align text to left of icon, right side to right)
        // Nodes with angle between 90 and 270 are on the left side
const isLeftSide = x < 0;
        return (
          <motion.a
            key={service.id}
            href={`#services/${service.slug}`}
            data-reveal="node"
            aria-label={`Learn more about ${service.title}`}
            className="absolute flex items-center gap-3 cursor-pointer select-none group focus-visible:outline-2 focus-visible:outline-brand-purple"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: 'translate(-50%, -50%)',
              flexDirection: isLeftSide ? 'row-reverse' : 'row'
            }}
            whileHover={{
              x: isLeftSide ? -6 : 6,
              transition: { duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }
            }}
          >
            {/* Circular Outlined Icon */}
            <motion.div
              className="w-12 h-12 rounded-full border border-[rgba(0,0,0,0.06)] bg-white flex items-center justify-center text-brand-text shadow-brand-sm group-hover:bg-brand-purple group-hover:text-white group-hover:border-transparent transition-all duration-300 shrink-0"
              whileHover={{ scale: 1.08 }}
            >
              <IconComponent className="w-5 h-5" strokeWidth={1.8} />
            </motion.div>

            {/* Title & Chevron */}
            <div className={`flex items-center gap-1 w-max max-w-[160px] ${isLeftSide ? 'text-right' : 'text-left'}`}>
              <span className="text-sm font-semibold text-brand-text group-hover:text-brand-purple transition-colors duration-300">
                {service.title}
              </span>
              <motion.span
                className="inline-flex shrink-0 text-neutral-400 group-hover:text-brand-purple"
                variants={{
                  initial: { x: 0 },
                  hover: { x: 3 }
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
              </motion.span>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
};
export default ServiceNodes;
