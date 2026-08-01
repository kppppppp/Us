import React, { useState } from 'react';
import { ArrowUpRight, Mail, Phone, MapPin, Copy, Check } from 'lucide-react';
import  Logofoot  from '../../assets/footer.png';
import { socialLinks, contactInfo } from '../../constants/navigation';
import DotField from '../ui/DotField';

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#0E0E10] text-[#8F8E94] py-20 px-6 overflow-hidden select-none border-t border-neutral-900">
      {/* Dynamic Background DotField (Opacity 40 for subtle dark-mode blend) */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-40">
        <DotField
          dotRadius={2.4}
          dotSpacing={18}
          bulgeStrength={45}
          glowRadius={160}
          sparkle={false}
          waveAmplitude={0}
          gradientFrom="rgba(255, 255, 255, 0.05)"
          gradientTo="rgba(255, 255, 255, 0.02)"
          glowColor="rgba(139, 127, 244, 0.05)"
        />
      </div>

      {/* Grid line overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Radial Glow Accents */}
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-brand-purple/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] rounded-full bg-[#FF9FFC]/5 blur-[90px] pointer-events-none" />

      <div className="max-w-[1500px] mx-auto relative z-10">
        {/* Top Call-to-Action Panel */}
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-16 mb-16 border-b border-neutral-900">
          <div className="max-w-2xl">
            <h3 className="text-3xl md:text-5xl font-serif text-white font-semibold leading-tight tracking-tight mb-4">
              Have an idea? Let's build something <span className="bg-gradient-to-r from-brand-purple to-[#B39DFF] bg-clip-text text-transparent">unexpected.</span>
            </h3>
            <p className="text-sm text-neutral-400 max-w-lg leading-relaxed">
              We partner with ambitious startups and established enterprises to build software that scales. Get in touch to start your project.
            </p>
          </div>
          <a
            href="/contact"
            className="group flex items-center gap-2.5 px-8 py-5 bg-white text-brand-text hover:bg-brand-purple hover:text-white rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-lg hover:shadow-[0_0_24px_rgba(93,70,216,0.3)] shrink-0"
          >
            <span>Start Your Project</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
        </div>

        {/* Middle Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
          {/* Identity */}
          <div className="flex flex-col items-start gap-5">
            {/* Custom Inverse Logo for Dark Footer */}
            <div className="hover:opacity-95 transition-opacity duration-300">
  <img
    src={Logofoot}
    alt="Unexpected Solutions"
    className="h-14 w-auto object-contain"
  />
</div>
            <p className="text-xs md:text-sm text-neutral-400 leading-relaxed max-w-xs mt-2">
              Engineering high-performance software, custom design systems, and digital strategy with zero compromise.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.25em] mb-1 block">Solutions</span>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'Services', href: '/services' },
                { label: 'Featured Work', href: '/projects' },
                { label: 'About Us', href: '/about' },
                { label: 'Get In Touch', href: '/contact' }
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-neutral-400 hover:text-white transition-colors duration-300 w-max"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.25em] mb-1 block">Connect Directly</span>
            <div className="flex flex-col gap-3.5">
              {/* Email with copy action */}
              <div className="flex flex-col items-start gap-1 group">
                <span className="text-[9px] font-extrabold text-neutral-500 uppercase tracking-widest flex items-center gap-1">
                  <Mail className="w-3 h-3 text-neutral-400" />
                  Email
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-sm text-white font-medium hover:text-[#B39DFF] transition-colors duration-300"
                  >
                    {contactInfo.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1 rounded bg-neutral-900 border border-neutral-800/80 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-all duration-300"
                    title="Copy Email Address"
                  >
                    {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col items-start gap-1">
                <span className="text-[9px] font-extrabold text-neutral-500 uppercase tracking-widest flex items-center gap-1">
                  <Phone className="w-3 h-3 text-neutral-400" />
                  Call Us
                </span>
                <span className="text-sm text-neutral-300 mt-0.5">{contactInfo.phone}</span>
              </div>

              {/* Address */}
              <div className="flex flex-col items-start gap-1">
                <span className="text-[9px] font-extrabold text-neutral-500 uppercase tracking-widest flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-neutral-400" />
                  Navi Mumbai ,India
                </span>
                <span className="text-xs text-neutral-400 leading-normal mt-0.5 max-w-[220px]">{contactInfo.address}</span>
              </div>
            </div>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.25em] mb-1 block">Follow Us</span>
            <div className="flex flex-col gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition-colors duration-300"
                >
                  <span>{social.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright metadata & back to top */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-neutral-900 text-xs text-neutral-500">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-8 gap-y-2">
            <span>© {new Date().getFullYear()} Unexpected Solutions. All rights reserved.</span>
            <a href="#privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors duration-300">Terms of Service</a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800/80 hover:border-brand-purple hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-full transition-all duration-300"
          >
            <span>Back to Top</span>
            <span className="group-hover:-translate-y-0.5 transition-transform duration-300">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
