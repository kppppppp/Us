import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

interface DropdownItem {
  title: string;
  description: string;
  href: string;
  iconName?: string;
}

interface NavDropdownProps {
  isOpen: boolean;
  items: DropdownItem[];
}

export const NavDropdown: React.FC<NavDropdownProps> = ({ isOpen, items }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[480px] bg-white border border-[rgba(0,0,0,0.06)] rounded-3xl shadow-brand-lg p-5 z-[100] origin-top backdrop-blur-xl"
        >
          {/* Arrow indicator */}
          <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white border-t border-l border-[rgba(0,0,0,0.06)]" />

          <div className="relative grid grid-cols-1 gap-1 z-10">
            {items.map((item, idx) => {
              // Dynamically resolve lucide icons
              const IconComponent = item.iconName ? (Icons as any)[item.iconName] : null;

              return (
                <a
                  key={idx}
                  href={item.href}
                  className="flex items-start gap-4 p-3.5 rounded-2xl transition-colors hover:bg-neutral-50 group/item"
                >
                  {IconComponent && (
                    <div className="w-10 h-10 rounded-xl bg-brand-light-purple flex items-center justify-center text-brand-purple group-hover/item:bg-brand-purple group-hover/item:text-white transition-colors duration-300 shrink-0">
                      <IconComponent className="w-5 h-5" strokeWidth={2} />
                    </div>
                  )}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[15px] font-semibold text-brand-text group-hover/item:text-brand-purple transition-colors">
                      {item.title}
                    </span>
                    <span className="text-[13px] text-neutral-500 leading-normal">
                      {item.description}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
