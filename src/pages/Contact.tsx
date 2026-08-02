import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Plus, 
  Minus, 
  TrendingUp, 
  Cpu, 
  Users, 
  Zap,
  ChevronDown
} from 'lucide-react';
import DotField from '../components/ui/DotField';
import DecayCard from '../components/ui/DecayCard';
import VariableProximity from '../components/ui/VariableProximity';
import ElectricBorder from '../components/ui/ElectricBorder';
import purpleGlass from '../assets/image4.webp';

gsap.registerPlugin(ScrollTrigger);

// Services list
const SERVICES = [
  'Website Development',
  'Web Applications',
  'AI Solutions',
  'UI/UX Design',
  'Branding',
  'SEO',
  'Digital Marketing',
  'Meta Ads',
  'Social Media Management',
  'Professional Photoshoots'
];

// Budget options
const BUDGET_OPTIONS = [
  '< Rs. 50,000',
  'Rs. 50,000 – Rs. 1,50,000',
  'Rs. 1,50,000 – Rs. 3,50,000',
  'Rs. 3,50,000 – Rs. 7,50,000',
  'Rs. 7,50,000+'
];

// Timeline options
const TIMELINE_OPTIONS = [
  '< 1 Month',
  '1 – 3 Months',
  '3 – 6 Months',
  '6+ Months'
];

// Why Work With Us
const WHY_US_CARDS = [
  {
    icon: Zap,
    title: 'Fast Communication',
    description: 'We respond instantly and deliver updates with high velocity. No delays, no bottlenecks.'
  },
  {
    icon: TrendingUp,
    title: 'Business Focused',
    description: 'We align design and tech with your actual business growth metrics and ROI objectives.'
  },
  {
    icon: Cpu,
    title: 'Scalable Solutions',
    description: 'Our codebases and systems are engineered to scale seamlessly from thousands to millions.'
  },
  {
    icon: Users,
    title: 'Long-Term Partnership',
    description: 'We do not just hand over files. We support, iterate, and build long-term momentum.'
  }
];

// FAQs
const FAQS = [
  {
    question: 'How long does a project take?',
    answer: 'Standard projects take between 4 to 12 weeks, depending on complexity. A bespoke corporate website typically launches in 6–8 weeks, whereas a custom web application or complex AI integration may require 12–16 weeks.'
  },
  {
    question: 'What does a website cost?',
    answer: 'Pricing is project-based and reflects the scale, customization, and engineering involved. Most of our custom marketing websites start around Rs. 50,000, while bespoke applications, interactive web platforms, and advanced integrations scale from there.'
  },
  {
    question: 'Can you redesign an existing website?',
    answer: 'Yes. We analyze your current platform’s performance, conversion bottlenecks, and technical debt to rebuild it with modern visual aesthetics, improved UX, faster load times, and an optimized conversion funnel.'
  },
  {
    question: 'Do you provide maintenance?',
    answer: 'Yes, we provide ongoing post-launch SLA support, security monitoring, infrastructure updates, and iterative improvements to ensure your digital platform stays performant, secure, and current.'
  },
  {
    question: 'Do you work internationally?',
    answer: 'Absolutely. We operate globally and work with clients across North America, Europe, Asia, and India. Our operational infrastructure, team meetings, and communications are fully optimized for remote project delivery.'
  },
  {
    question: 'How do we get started?',
    answer: 'Simply fill out the inquiry form below, selecting your required services, budget, and timeline. Our team will review the details and get in touch within 24 hours to schedule a discovery call.'
  }
];

export const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    companyName: '',
    phone: '',
    description: ''
  });

  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedBudget, setSelectedBudget] = useState<string>('');
  const [selectedTimeline, setSelectedTimeline] = useState<string>('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Validation / status states
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // FAQ states
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    // Scroll Lenis to top on mount
    window.scrollTo(0, 0);

    const container = containerRef.current;
    if (!container) return;

    // 1. Hero Reveal Animations
    const heroTl = gsap.timeline();
    heroTl.fromTo(
      '.hero-subtitle',
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    );
    heroTl.fromTo(
      '.hero-title',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power4.out' },
      '-=0.4'
    );
    heroTl.fromTo(
      '.hero-description',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
      '-=0.5'
    );
    heroTl.fromTo(
      '.hero-cta',
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.5)' },
      '-=0.4'
    );

    // Subtle background lighting gradient follow
    const glow = container.querySelector('.bg-glow-gradient');
    let onMouseMoveGlow: ((e: MouseEvent) => void) | null = null;
    if (glow) {
      onMouseMoveGlow = (e: MouseEvent) => {
        gsap.to(glow, {
          x: e.clientX - 250,
          y: e.clientY - 250,
          duration: 1.5,
          ease: 'power2.out'
        });
      };
      window.addEventListener('mousemove', onMouseMoveGlow);
    }

    // spotlight effect for final CTA
    const cta = ctaRef.current;
    let onMouseMoveCta: ((e: MouseEvent) => void) | null = null;
    if (cta) {
      const spotlight = cta.querySelector('.cta-spotlight');
      if (spotlight) {
        onMouseMoveCta = (e: MouseEvent) => {
          const rect = cta.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          gsap.to(spotlight, {
            left: `${x}px`,
            top: `${y}px`,
            duration: 0.6,
            ease: 'power2.out'
          });
        };
        cta.addEventListener('mousemove', onMouseMoveCta);
      }
    }

    // ScrollTrigger reveals for sections
    const sections = container.querySelectorAll('.reveal-section');
    sections.forEach((sec: any) => {
      gsap.fromTo(
        sec,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Magnetic buttons interaction
    const magneticButtons = container.querySelectorAll('.magnetic-button');
    const cleanupButtons: Array<{ btn: any; onMove: any; onLeave: any }> = [];

    magneticButtons.forEach((btn: any) => {
      const onMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
          x: x * 0.45,
          y: y * 0.45,
          duration: 0.3,
          ease: 'power2.out'
        });
      };

      const onMouseLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1.1, 0.4)'
        });
      };

      btn.addEventListener('mousemove', onMouseMove);
      btn.addEventListener('mouseleave', onMouseLeave);
      cleanupButtons.push({ btn, onMove: onMouseMove, onLeave: onMouseLeave });
    });

    return () => {
      if (onMouseMoveGlow) {
        window.removeEventListener('mousemove', onMouseMoveGlow);
      }
      if (cta && onMouseMoveCta) {
        cta.removeEventListener('mousemove', onMouseMoveCta);
      }
      cleanupButtons.forEach(({ btn, onMove, onLeave }) => {
        btn.removeEventListener('mousemove', onMove);
        btn.removeEventListener('mouseleave', onLeave);
      });
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };



  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // scroll to first error
      const firstError = Object.keys(newErrors)[0];
      const el = document.getElementsByName(firstError)[0];
      if (el) el.focus();
      return;
    }

    // Success transition
    setFormSubmitted(true);
    // Reset form data after transition
    setTimeout(() => {
      setFormData({
        fullName: '',
        email: '',
        companyName: '',
        phone: '',
        description: ''
      });
      setSelectedService('');
      setSelectedBudget('');
      setSelectedTimeline('');
    }, 400);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full bg-[#FAF9FC] overflow-x-hidden pt-18 md:pt-22 pb-12 select-none"
    >
      {/* Global Fixed DotField Canvas Background */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-95">
        <DotField
          dotRadius={2.8}
          dotSpacing={16}
          bulgeStrength={55}
          glowRadius={180}
          sparkle={false}
          waveAmplitude={0}
          gradientFrom="rgba(0, 0, 0, 0.28)"
          gradientTo="rgba(0, 0, 0, 0.12)"
          glowColor="rgba(0, 0, 0, 0.02)"
        />
      </div>

      {/* Editorial overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(93,70,216,0.03),transparent_50%)] pointer-events-none" />
      <div className="bg-glow-gradient absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(139,127,244,0.04)_0%,transparent_70%)] pointer-events-none hidden lg:block" />

      {/* EDITORIAL HERO */}
      <div ref={heroRef} className="relative w-full overflow-hidden border-b border-brand-border/60 bg-white/10 pt-6 pb-8 md:pt-8 md:pb-10 mb-12 md:mb-16">
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="hero-subtitle text-xs md:text-sm font-bold tracking-[0.4em] text-brand-purple uppercase mb-4 block">
              Contact Us
            </span>
            
            <h1 className="hero-title text-4xl md:text-[5vw] lg:text-[5.5vw] font-serif font-black text-brand-text tracking-tight leading-[0.95] max-w-[1200px] mb-6 relative">
              <VariableProximity
                label="Let's Build Something Extraordinary Together."
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={heroRef}
                radius={220}
                falloff="linear"
              />
            </h1>

            <p className="hero-description text-lg md:text-2xl font-sans font-light text-neutral-600 leading-relaxed max-w-[900px] mb-8">
              Whether you're launching a startup, scaling your business, or transforming your digital presence, we'd love to hear your story and help bring your vision to life.
            </p>

            <div className="hero-cta flex flex-wrap gap-4" data-reveal>
              <a 
                href="#inquiry-form"
                className="group inline-flex items-center gap-2 px-7 py-4 bg-brand-text text-white hover:bg-brand-purple rounded-full text-xs font-extrabold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-brand-md"
              >
                <span>Start Your Project</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a 
                href="https://calendly.com" 
                target="_blank" 
                rel="noreferrer"
                className="group inline-flex items-center gap-2 px-7 py-4 bg-white/60 hover:bg-white text-brand-text border border-brand-border/60 hover:border-brand-purple/20 rounded-full text-xs font-extrabold tracking-widest uppercase transition-all duration-300 shadow-sm"
              >
                <span>Book a Discovery Call</span>
              </a>
            </div>
          </div>

          {/* Right Column: Premium DecayCard Interactive visual */}
          <div className="lg:col-span-5 flex items-center justify-center w-full">
            <DecayCard 
              width={340} 
              height={410} 
              image={purpleGlass}
              baseFrequency={0.012}
              numOctaves={5}
              maxDisplacement={180}
              movementBound={40}
            >
              {/* Overlay inside DecayCard text container */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none rounded-3xl" />
              <div className="absolute inset-x-6 bottom-6 text-left pointer-events-none">
                <span className="text-[10px] font-bold text-white/60 tracking-[0.2em] uppercase block mb-1">
                  Visualizing Momentum
                </span>
                <h3 className="text-lg md:text-xl font-serif font-bold text-white leading-tight">
                  Interactive<br />Distortion Mesh
                </h3>
              </div>
            </DecayCard>
          </div>
        </div>
      </div>

      {/* MAIN CONTACT SECTION & SPLIT LAYOUT */}
      <div id="inquiry-form" className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Premium Contact Form wrapped in ElectricBorder */}
          <ElectricBorder
            color="#5D46D8"
            speed={0.8}
            chaos={0.1}
            borderRadius={32}
            className="lg:col-span-8 bg-white/50 backdrop-blur-xl border border-brand-border/60 p-6 md:p-10 lg:p-12 shadow-sm text-left"
          >
            {formSubmitted ? (
              <div className="w-full min-h-[400px] flex flex-col items-center justify-center text-center p-6 transition-opacity duration-500">
                <div className="w-20 h-20 bg-brand-light-purple/20 border border-brand-purple/20 text-brand-purple flex items-center justify-center rounded-full mb-6 animate-bounce">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-text mb-4">
                  Inquiry Received Successfully.
                </h3>
                <p className="text-neutral-500 max-w-[500px] leading-relaxed mb-8">
                  Thank you for reaching out to Unexpected Solutions. Our brand engineering team will review your requirements and follow up within 24 hours.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-3.5 bg-brand-text hover:bg-brand-purple text-white rounded-full text-xs font-extrabold tracking-widest uppercase transition-all duration-300"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-text tracking-tight mb-2">
                    Send an Inquiry
                  </h2>
                  <p className="text-sm text-neutral-500">
                    Tell us about your project, target objectives, and expected milestones.
                  </p>
                </div>

                {/* Form fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="relative group">
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder=" "
                      className={`w-full px-5 py-4 bg-[#FAF9FC]/60 border rounded-2xl text-brand-text text-sm font-medium outline-none transition-all duration-300 ${
                        errors.fullName 
                          ? 'border-red-400 focus:border-red-400 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.06)]' 
                          : 'border-brand-border/60 focus:border-brand-purple/40 focus:bg-white focus:shadow-[0_0_0_4px_rgba(93,70,216,0.06)]'
                      }`}
                    />
                    <label className="absolute left-5 top-4 text-xs font-semibold text-neutral-400 uppercase tracking-widest transition-all duration-300 pointer-events-none transform -translate-y-0 scale-100 origin-left">
                      Full Name *
                    </label>
                    {errors.fullName && (
                      <span className="text-xs text-red-500 mt-1 block pl-1">{errors.fullName}</span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="relative group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder=" "
                      className={`w-full px-5 py-4 bg-[#FAF9FC]/60 border rounded-2xl text-brand-text text-sm font-medium outline-none transition-all duration-300 ${
                        errors.email 
                          ? 'border-red-400 focus:border-red-400 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.06)]' 
                          : 'border-brand-border/60 focus:border-brand-purple/40 focus:bg-white focus:shadow-[0_0_0_4px_rgba(93,70,216,0.06)]'
                      }`}
                    />
                    <label className="absolute left-5 top-4 text-xs font-semibold text-neutral-400 uppercase tracking-widest transition-all duration-300 pointer-events-none transform -translate-y-0 scale-100 origin-left">
                      Email Address *
                    </label>
                    {errors.email && (
                      <span className="text-xs text-red-500 mt-1 block pl-1">{errors.email}</span>
                    )}
                  </div>

                  {/* Company Name */}
                  <div className="relative group">
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder=" "
                      className="w-full px-5 py-4 bg-[#FAF9FC]/60 border border-brand-border/60 rounded-2xl text-brand-text text-sm font-medium outline-none transition-all duration-300 focus:border-brand-purple/40 focus:bg-white focus:shadow-[0_0_0_4px_rgba(93,70,216,0.06)]"
                    />
                    <label className="absolute left-5 top-4 text-xs font-semibold text-neutral-400 uppercase tracking-widest transition-all duration-300 pointer-events-none transform -translate-y-0 scale-100 origin-left">
                      Company Name
                    </label>
                  </div>

                  {/* Phone Number */}
                  <div className="relative group">
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder=" "
                      className="w-full px-5 py-4 bg-[#FAF9FC]/60 border border-brand-border/60 rounded-2xl text-brand-text text-sm font-medium outline-none transition-all duration-300 focus:border-brand-purple/40 focus:bg-white focus:shadow-[0_0_0_4px_rgba(93,70,216,0.06)]"
                    />
                    <label className="absolute left-5 top-4 text-xs font-semibold text-neutral-400 uppercase tracking-widest transition-all duration-300 pointer-events-none transform -translate-y-0 scale-100 origin-left">
                      Phone Number
                    </label>
                  </div>
                </div>

                {/* SERVICE INTERESTED IN (Custom Dropdown Selection) */}
                <div className="space-y-3 relative" ref={dropdownRef}>
                  <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                    Service Interested In
                  </h3>
                  
                  {/* Dropdown Trigger */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="w-full px-5 py-4 bg-[#FAF9FC]/60 border border-brand-border/60 rounded-2xl text-left text-brand-text text-sm font-medium outline-none transition-all duration-300 focus:border-brand-purple/40 focus:bg-white focus:shadow-[0_0_0_4px_rgba(93,70,216,0.06)] flex items-center justify-between cursor-pointer select-none"
                    >
                      <span className={selectedService ? 'text-brand-text' : 'text-neutral-400 font-normal'}>
                        {selectedService || 'Select a service...'}
                      </span>
                      <ChevronDown 
                        size={18} 
                        className={`text-neutral-400 transition-transform duration-300 ${
                          dropdownOpen ? 'rotate-180 text-brand-purple' : ''
                        }`}
                      />
                    </button>

                    {/* Dropdown List */}
                    {dropdownOpen && (
                      <div className="absolute left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border border-brand-border/80 rounded-2xl shadow-brand-lg z-50 py-2.5 max-h-[260px] overflow-y-auto overflow-x-hidden transition-all duration-200">
                        {SERVICES.map((service) => {
                          const isSelected = selectedService === service;
                          return (
                            <button
                              key={service}
                              type="button"
                              onClick={() => {
                                setSelectedService(service);
                                setDropdownOpen(false);
                              }}
                              className={`w-full text-left px-5 py-3 text-xs font-semibold transition-all duration-150 block cursor-pointer select-none ${
                                isSelected
                                  ? 'bg-brand-purple text-white'
                                  : 'text-neutral-600 hover:bg-brand-light-purple hover:text-brand-purple'
                              }`}
                            >
                              {service}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* ESTIMATED BUDGET OPTIONS */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                    Estimated Budget (INR / Rs.)
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {BUDGET_OPTIONS.map((option) => {
                      const isSelected = selectedBudget === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setSelectedBudget(option)}
                          className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 border backdrop-blur-sm shadow-sm cursor-pointer select-none ${
                            isSelected
                              ? 'bg-brand-purple text-white border-brand-purple shadow-brand-sm'
                              : 'bg-white/40 border-brand-border/60 text-neutral-600 hover:border-brand-purple/35 hover:text-brand-purple'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ESTIMATED TIMELINE OPTIONS */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                    Project Timeline
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {TIMELINE_OPTIONS.map((option) => {
                      const isSelected = selectedTimeline === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setSelectedTimeline(option)}
                          className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 border backdrop-blur-sm shadow-sm cursor-pointer select-none ${
                            isSelected
                              ? 'bg-brand-purple text-white border-brand-purple shadow-brand-sm'
                              : 'bg-white/40 border-brand-border/60 text-neutral-600 hover:border-brand-purple/35 hover:text-brand-purple'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Project Description */}
                <div className="relative group">
                  <textarea
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder=" "
                    className="w-full px-5 py-4 bg-[#FAF9FC]/60 border border-brand-border/60 rounded-2xl text-brand-text text-sm font-medium outline-none transition-all duration-300 focus:border-brand-purple/40 focus:bg-white focus:shadow-[0_0_0_4px_rgba(93,70,216,0.06)] resize-none"
                  />
                  <label className="absolute left-5 top-4 text-xs font-semibold text-neutral-400 uppercase tracking-widest transition-all duration-300 pointer-events-none transform -translate-y-0 scale-100 origin-left">
                    Project Description / Requirements
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="magnetic-button group inline-flex items-center gap-2 px-8 py-4 bg-brand-text hover:bg-brand-purple text-white rounded-full text-xs font-extrabold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-brand-md cursor-pointer"
                  >
                    <span>Send Inquiry</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </form>
            )}
          </ElectricBorder>

          {/* Right Column: Office info Glass Cards */}
          <div className="lg:col-span-4 flex flex-col gap-6 text-left">
            {/* Card 1: HQ India */}
            <div className="reveal-section bg-white/40 backdrop-blur-md border border-brand-border/60 rounded-3xl p-6 md:p-8 shadow-sm hover:translate-y-[-4px] transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[120px] h-[120px] rounded-full bg-brand-purple/5 filter blur-2xl pointer-events-none group-hover:bg-brand-purple/10 transition-colors duration-500" />
              
              <div className="w-10 h-10 bg-brand-light-purple/20 border border-brand-purple/10 text-brand-purple flex items-center justify-center rounded-xl mb-6">
                <MapPin size={20} />
              </div>
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5">
                Our Office
              </h3>
              <h4 className="text-xl font-serif font-bold text-brand-text mb-4">
                India HQ
              </h4>
              <p className="text-sm text-neutral-600 font-light leading-relaxed">
                
                Navi Mumbai, Maharashtra, India
              </p>
            </div>

            {/* Card 2: Contact Info */}
            <div className="reveal-section bg-white/40 backdrop-blur-md border border-brand-border/60 rounded-3xl p-6 md:p-8 shadow-sm hover:translate-y-[-4px] transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[120px] h-[120px] rounded-full bg-brand-purple/5 filter blur-2xl pointer-events-none group-hover:bg-brand-purple/10 transition-colors duration-500" />
              
              <div className="w-10 h-10 bg-brand-light-purple/20 border border-brand-purple/10 text-brand-purple flex items-center justify-center rounded-xl mb-6">
                <Mail size={20} />
              </div>
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5">
                Direct Contact
              </h3>
              <h4 className="text-xl font-serif font-bold text-brand-text mb-4">
                Say Hello
              </h4>
              
              <div className="space-y-3.5">
                <a 
                  href="mailto:hello@unexpectedsolns.com" 
                  className="flex items-center gap-2.5 text-sm text-neutral-600 hover:text-brand-purple transition-colors duration-300 font-light"
                >
                  <Mail size={16} className="text-brand-purple" />
                  <span>info@unexpectedsolution.in</span>
                </a>
                <a 
                  href="tel:+919876543210" 
                  className="flex items-center gap-2.5 text-sm text-neutral-600 hover:text-brand-purple transition-colors duration-300 font-light"
                >
                  <Phone size={16} className="text-brand-purple" />
                  <span>+91 98765 43210</span>
                </a>
              </div>
            </div>

            {/* Card 3: Timings */}
            <div className="reveal-section bg-white/40 backdrop-blur-md border border-brand-border/60 rounded-3xl p-6 md:p-8 shadow-sm hover:translate-y-[-4px] transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[120px] h-[120px] rounded-full bg-brand-purple/5 filter blur-2xl pointer-events-none group-hover:bg-brand-purple/10 transition-colors duration-500" />
              
              <div className="w-10 h-10 bg-brand-light-purple/20 border border-brand-purple/10 text-brand-purple flex items-center justify-center rounded-xl mb-6">
                <Clock size={20} />
              </div>
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5">
                Operational Hours
              </h3>
              <h4 className="text-xl font-serif font-bold text-brand-text mb-4">
                Availability
              </h4>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-neutral-600 font-light">
                  <span>Monday – Saturday</span>
                  <span>9 AM – 7 PM</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-600 font-light">
                  <span>Sunday</span>
                  <span className="text-brand-purple font-semibold">Closed</span>
                </div>
                <div className="border-t border-brand-border/40 mt-3 pt-3 flex justify-between text-xs text-neutral-400 uppercase font-bold tracking-wider">
                  <span>Average Response</span>
                  <span className="text-brand-purple">Within 24 Hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WHY WORK WITH US */}
      <div className="reveal-section max-w-[1200px] mx-auto px-6 mb-28">
        <div className="text-center max-w-[700px] mx-auto mb-16">
          <span className="px-3 py-1 bg-brand-light-purple/10 border border-brand-purple/15 text-brand-purple text-[10px] md:text-xs font-bold tracking-widest uppercase rounded-full">
            Our Commitment
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-text tracking-tight mt-5 mb-5">
            Why Work With Us
          </h2>
          <p className="text-sm md:text-base text-neutral-500 font-light">
            We deliver highly optimized software architecture and high-velocity digital craft tailored for scalable business success.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_US_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <div 
                key={i} 
                className="bg-white/40 backdrop-blur-md border border-brand-border/60 rounded-3xl p-6 md:p-8 shadow-sm hover:translate-y-[-4px] transition-all duration-300 text-left group relative"
              >
                <div className="w-10 h-10 bg-brand-light-purple/20 border border-brand-purple/10 text-brand-purple flex items-center justify-center rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={20} />
                </div>
                <h3 className="text-lg font-serif font-bold text-brand-text mb-3">
                  {card.title}
                </h3>
                <p className="text-xs md:text-sm text-neutral-500 font-light leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQ SECTION Accordion */}
      <div className="reveal-section max-w-[900px] mx-auto px-6 mb-28">
        <div className="text-center mb-16">
          <span className="px-3 py-1 bg-brand-light-purple/10 border border-brand-purple/15 text-brand-purple text-[10px] md:text-xs font-bold tracking-widest uppercase rounded-full">
            Questions
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-text tracking-tight mt-5 mb-5">
            Frequently Asked Questions
          </h2>
          <p className="text-sm md:text-base text-neutral-500 font-light max-w-[600px] mx-auto">
            Everything you need to know about our workflow, project costs, and launch timelines.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div 
                key={index} 
                className="bg-white/45 backdrop-blur-sm border border-brand-border/60 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 text-left"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 md:py-6 flex items-center justify-between text-left focus:outline-none select-none cursor-pointer"
                >
                  <span className="text-sm md:text-base font-serif font-bold text-brand-text pr-4">
                    {faq.question}
                  </span>
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-brand-light-purple/20 border border-brand-purple/10 text-brand-purple flex-shrink-0">
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>
                
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 text-xs md:text-sm text-neutral-500 font-light leading-relaxed border-t border-brand-border/20 pt-4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* LOCATION SECTION (DARK STYLE MAP) */}
      <div className="reveal-section max-w-[1200px] mx-auto px-6 mb-28 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left info */}
          <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-8">
            <span className="px-3 py-1 bg-brand-light-purple/10 border border-brand-purple/15 text-brand-purple text-[10px] md:text-xs font-bold tracking-widest uppercase rounded-full mb-5">
              Location
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-text tracking-tight mb-5">
              Visit or Connect With Us
            </h2>
            <p className="text-sm md:text-base text-neutral-500 font-light leading-relaxed mb-6">
              Located in Ahmedabad, India's fast-growing business and technology corridor. Drop by for a meeting, or coordinate with us digitally across global standard time zones.
            </p>
            <div className="flex flex-col gap-3 font-semibold text-xs md:text-sm tracking-wide uppercase text-brand-text">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-brand-purple" />
                <span>Elite Business Hub, Ahmedabad, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-brand-purple" />
                <span>Monday - Saturday, 9am - 7pm IST</span>
              </div>
            </div>
          </div>

          {/* Right custom dark styled Google map iframe */}
          <div className="lg:col-span-7 w-full h-[320px] md:h-[450px] rounded-[32px] overflow-hidden border border-brand-border/60 shadow-brand-sm relative bg-[#FAF9FC]">
            {/* Custom map style inversion filter applied via CSS */}
            <iframe
              title="Unexpected Solutions Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.2185208465134!2d72.50293121541243!3d23.052028684938676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1m1zRWxpdGUgQnVzaW5lc3MgSHVi!5e0!3m2!1sen!2sin!4v1659092825482!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(65%) contrast(92%)' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            />
            {/* Elegant glass overlay to prevent map zoom lock-in */}
            <div className="absolute inset-x-4 top-4 p-3.5 rounded-xl bg-white/60 backdrop-blur-md border border-white/40 shadow-sm text-xs font-semibold text-neutral-600 leading-none select-none max-w-max pointer-events-none">
              India Headquarters
            </div>
          </div>
        </div>
      </div>

      {/* FINAL CTA WITH GLOWING SPOTLIGHT AND MESH BACKGROUND */}
      <div className="max-w-[1200px] mx-auto px-6 relative z-10 mb-16">
        <div 
          ref={ctaRef}
          className="w-full text-center py-20 bg-white rounded-[32px] border border-brand-border/60 shadow-brand-sm relative overflow-hidden group select-none cursor-default"
        >
          {/* Glowing spotlight tracker mesh background */}
          <div className="cta-spotlight absolute w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(93,70,216,0.06)_0%,transparent_75%)] rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.7),rgba(255,255,255,0.95))] pointer-events-none" />

          <div className="relative z-10 max-w-[800px] mx-auto px-6 flex flex-col items-center">
            <span className="px-3 py-1 bg-brand-light-purple/10 border border-brand-purple/15 text-brand-purple text-[10px] md:text-xs font-bold tracking-widest uppercase rounded-full mb-6">
              Launch Now
            </span>
            <h2 className="text-3xl md:text-6xl font-serif font-bold text-brand-text tracking-tight mb-6">
              Your Next Big Idea Deserves<br className="hidden md:inline" /> Better Than Ordinary.
            </h2>
            <p className="text-sm md:text-lg text-neutral-500 leading-relaxed font-light mb-10 max-w-[550px]">
              Let's create something meaningful together. Reach out today and begin engineering your digital platform with maximum speed.
            </p>
            
            <div className="hero-cta">
              <a 
                href="#inquiry-form"
                className="magnetic-button group inline-flex items-center gap-2.5 px-8 py-5 bg-brand-text text-white hover:bg-brand-purple rounded-full text-sm font-extrabold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-brand-md cursor-pointer"
              >
                <span>Start Your Project</span>
                <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
