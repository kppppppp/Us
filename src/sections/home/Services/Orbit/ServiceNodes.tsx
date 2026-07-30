import React, { useState } from 'react';
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
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="absolute inset-0 w-full h-full" style={{ zIndex: 10 }}>
      {/* SVG layer for subtle radial connector lines from center to each service anchor */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        {SERVICES_DATA.map((service) => {
          const radius = ORBIT_LAYOUT.serviceRadius;
          const angleRad = (service.angle * Math.PI) / 180;
          const x = Math.cos(angleRad) * radius;
          const y = Math.sin(angleRad) * radius;
          const isHovered = hoveredId === service.id;

          return (
            <line
              key={`connector-${service.id}`}
              x1="50%"
              y1="50%"
              x2={`calc(50% + ${x}px)`}
              y2={`calc(50% + ${y}px)`}
              stroke={isHovered ? 'rgba(93, 70, 216, 0.12)' : 'rgba(0, 0, 0, 0.03)'}
              strokeWidth="1"
              strokeDasharray="4 6"
              style={{ transition: 'stroke 300ms ease' }}
            />
          );
        })}
      </svg>

      {/* Service nodes */}
      {SERVICES_DATA.map((service) => {
        const radius = ORBIT_LAYOUT.serviceRadius;
        const angleRad = (service.angle * Math.PI) / 180;
        const x = Math.cos(angleRad) * radius;
        const y = Math.sin(angleRad) * radius;

        const IconComponent = iconMap[service.icon] || Code;
        const isLeftSide = x < -10;
        const isHovered = hoveredId === service.id;

        return (
          <a
            key={service.id}
            href={`/services/${service.slug}`}
            data-reveal="node"
            aria-label={`Learn more about ${service.title}`}
            className="absolute flex items-center gap-3 cursor-pointer select-none group outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 rounded-full"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: 'translate(-50%, -50%)',
              flexDirection: isLeftSide ? 'row-reverse' : 'row',
            }}
            onMouseEnter={() => setHoveredId(service.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Orbit anchor dot */}
            <div
              className="absolute w-[6px] h-[6px] rounded-full shrink-0"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: isHovered ? 'rgba(93, 70, 216, 0.5)' : 'rgba(93, 70, 216, 0.15)',
                transition: 'background-color 300ms ease',
                zIndex: -1,
              }}
            />

            {/* Circular Icon Container */}
            <div
              className="w-12 h-12 rounded-full border flex items-center justify-center shrink-0"
              style={{
                backgroundColor: isHovered ? '#5D46D8' : '#ffffff',
                borderColor: isHovered ? 'transparent' : 'rgba(0, 0, 0, 0.06)',
                color: isHovered ? '#ffffff' : '#141414',
                boxShadow: isHovered
                  ? '0 4px 20px rgba(93, 70, 216, 0.25)'
                  : '0 1px 3px rgba(0, 0, 0, 0.04)',
                transition: 'all 300ms cubic-bezier(0.22, 0.61, 0.36, 1)',
              }}
            >
              <IconComponent className="w-5 h-5" strokeWidth={1.8} />
            </div>

            {/* Title & Chevron */}
            <div
              className={`flex items-center gap-1 whitespace-nowrap ${isLeftSide ? 'text-right' : 'text-left'}`}
            >
              <span
                className="text-[13px] font-semibold"
                style={{
                  color: isHovered ? '#5D46D8' : '#141414',
                  transition: 'color 300ms ease',
                }}
              >
                {service.title}
              </span>
              <span
                className="inline-flex shrink-0"
                style={{
                  color: isHovered ? '#5D46D8' : 'rgba(0, 0, 0, 0.25)',
                  transition: 'color 300ms ease',
                }}
              >
                <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
              </span>
            </div>
          </a>
        );
      })}
    </div>
  );
};
export default ServiceNodes;
