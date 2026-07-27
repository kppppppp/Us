import React from 'react';
import { Logo } from '../Navbar/Logo';
import { socialLinks, contactInfo } from '../../constants/navigation';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-neutral-50 border-t border-[rgba(0,0,0,0.06)] py-16 px-6 select-none">
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Branding */}
        <div className="flex flex-col items-start gap-4">
          <Logo />
          <p className="text-sm text-neutral-500 max-w-sm mt-2 leading-relaxed">
            Solving today's complexity. Building tomorrow's advantage. Premium digital experiences for enterprise operations.
          </p>
        </div>

        {/* Contact info */}
        <div className="flex flex-col gap-3">
          <span className="text-[11px] uppercase tracking-[0.2em] font-extrabold text-neutral-400">Contact Us</span>
          <span className="text-sm text-brand-text font-semibold">{contactInfo.email}</span>
          <span className="text-sm text-neutral-600">{contactInfo.phone}</span>
          <span className="text-sm text-neutral-500 leading-normal">{contactInfo.address}</span>
        </div>

        {/* Socials & Copyright */}
        <div className="flex flex-col items-start md:items-end justify-between gap-6">
          <div className="flex gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-sm text-neutral-500 hover:text-brand-purple transition-colors"
              >
                {social.label}
              </a>
            ))}
          </div>
          <span className="text-xs text-neutral-400">
            © {new Date().getFullYear()} Unexpected Solutions. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
