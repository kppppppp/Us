import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { X, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { navigationItems, socialLinks, contactInfo } from '../../constants/navigation';
import { CTAButton } from './CTAButton';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuVariants: Variants = {
  closed: {
    x: '100%',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  },
  open: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  closed: { opacity: 0, x: 50 },
  open: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' } }
};

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 z-[98] backdrop-blur-sm"
          />

          {/* Fullscreen Sliding Panel */}
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 bottom-0 w-full max-w-[500px] bg-white z-[99] shadow-brand-lg border-l border-[rgba(0,0,0,0.06)] p-8 flex flex-col justify-between overflow-y-auto select-none"
          >
            {/* Header / Close section */}
            <div className="flex justify-between items-center mb-8">
              <span className="text-xs tracking-[0.2em] font-extrabold uppercase text-neutral-400">
                Menu
              </span>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-[rgba(0,0,0,0.06)] bg-white flex items-center justify-center cursor-pointer hover:bg-neutral-50 transition-colors"
              >
                <X className="w-5 h-5 text-brand-text" />
              </button>
            </div>

            {/* Navigation links */}
            <div className="flex flex-col gap-6 my-auto">
              {navigationItems.map((item) => (
                <motion.div key={item.label} variants={itemVariants}>
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="group flex items-center justify-between text-[28px] md:text-[34px] font-bold text-brand-text hover:text-brand-purple transition-colors"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-brand-purple" />
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Bottom Section with CTA and Contact/Socials */}
            <div className="mt-8 flex flex-col gap-6">
              {/* Divider */}
              <motion.div 
                variants={itemVariants}
                className="h-[1px] w-full bg-gradient-to-r from-[rgba(0,0,0,0.06)] via-[rgba(93,70,216,0.15)] to-[rgba(0,0,0,0.06)]"
              />

              {/* Large CTA */}
              <motion.div variants={itemVariants} className="w-full">
                <CTAButton onClick={onClose} className="w-full justify-center py-4" />
              </motion.div>

              {/* Contact Information */}
              <motion.div variants={itemVariants} className="flex flex-col gap-3.5 text-sm text-neutral-600">
                <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 hover:text-brand-purple transition-colors">
                  <Mail className="w-4 h-4 text-brand-purple" />
                  <span>{contactInfo.email}</span>
                </a>
                <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-3 hover:text-brand-purple transition-colors">
                  <Phone className="w-4 h-4 text-brand-purple" />
                  <span>{contactInfo.phone}</span>
                </a>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-purple shrink-0 mt-0.5" />
                  <span>{contactInfo.address}</span>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div variants={itemVariants} className="flex gap-5 mt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-[0.1em] font-semibold text-neutral-400 hover:text-brand-purple transition-colors"
                  >
                    {social.label}
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
