import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface UnderlineLinkProps {
  href: string;
  label: string;
  showArrow?: boolean;
  className?: string;
}

export const UnderlineLink: React.FC<UnderlineLinkProps> = ({
  href,
  label,
  showArrow = true,
  className = ''
}) => {
  return (
    <a
      href={href}
      className={`relative inline-flex items-center gap-1.5 font-medium text-base text-brand-text hover:text-brand-purple transition-colors duration-300 group cursor-pointer ${className}`}
    >
      <span>{label}</span>
      {showArrow && (
        <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-brand-purple group-hover:translate-x-[2px] group-hover:translate-y-[-2px] transition-all" />
      )}
      
      {/* Underline expanding from the center */}
      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-text group-hover:bg-brand-purple scale-x-100 origin-center transition-transform duration-300" />
    </a>
  );
};
export default UnderlineLink;
