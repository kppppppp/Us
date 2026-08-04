"use client";

import { useState, memo, useMemo, useCallback } from 'react';
import { FaLinkedinIn, FaTwitter, FaBehance, FaInstagram } from 'react-icons/fa';
import { cn } from '../../lib/utils';

// Import local team photos
import aditiImg from '../../assets/team/aditi.webp';
import krishImg from '../../assets/team/krish.webp';
import shoneImg from '../../assets/team/shone.webp';
import varadImg from '../../assets/team/varad.webp';

const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    behance?: string;
  };
}

// Custom dynamic initials placeholder generator for members without photos
function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return parts[0] ? parts[0][0].toUpperCase() : '';
}

function createInitialsPlaceholder(name: string) {
  if (typeof document === 'undefined') return '';
  const W = 310;
  const H = 330;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Gradient background (Deep neutral dark purple)
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, '#191724');
  grad.addColorStop(1, '#0e0c12');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Subtle border highlight
  ctx.strokeStyle = 'rgba(93, 70, 216, 0.12)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(8, 8, W - 16, H - 16, 12);
  ctx.stroke();

  // Subtle inner card gradient glow
  const glow = ctx.createRadialGradient(W / 2, H / 2, 10, W / 2, H / 2, 120);
  glow.addColorStop(0, 'rgba(93, 70, 216, 0.08)');
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // Large Initials
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.font = '900 68px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(getInitials(name), W / 2, H / 2);

  return canvas.toDataURL('image/png');
}

const DEFAULT_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Yash Singh',
    role: 'Founder',
    image: 'Placeholder',
    social: { linkedin: '#', twitter: '#' },
  },
  {
    id: '2',
    name: 'Kashish',
    role: 'Co-Founder',
    image: 'Placeholder',
    social: { linkedin: '#', twitter: '#' },
  },
  {
    id: '3',
    name: 'Krish Panchal',
    role: 'Director - Technology & Business Growth',
    image: krishImg,
    social: { linkedin: '#', twitter: '#' },
  },
  {
    id: '4',
    name: 'Varad Madhav',
    role: 'Full Stack Developer',
    image: varadImg,
    social: { linkedin: '#', twitter: '#' },
  },
  {
    id: '5',
    name: 'Shone Chavan',
    role: 'MERN Developer',
    image: shoneImg,
    social: { linkedin: '#', twitter: '#' },
  },
  {
    id: '6',
    name: 'Aditi Jha',
    role: 'Frontend Developer • Social Media',
    image: aditiImg,
    social: { linkedin: '#', instagram: '#' },
  },
  {
    id: '7',
    name: 'Khushi Panchal',
    role: 'Sales Head',
    image: 'Placeholder',
    social: { linkedin: '#' },
  },
];

interface TeamShowcaseProps {
  members?: TeamMember[];
}

export default function TeamShowcase({ members = DEFAULT_MEMBERS }: TeamShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const processedMembers = useMemo(() => {
    return members.map(m => {
      if (m.image === 'Placeholder') {
        return { ...m, image: createInitialsPlaceholder(m.name) };
      }
      return m;
    });
  }, [members]);

  const activeMembers = processedMembers;

  const col1 = useMemo(() => activeMembers.filter((_, i) => i % 3 === 0), [activeMembers]);
  const col2 = useMemo(() => activeMembers.filter((_, i) => i % 3 === 1), [activeMembers]);
  const col3 = useMemo(() => activeMembers.filter((_, i) => i % 3 === 2), [activeMembers]);

  const handleHover = useCallback((id: string | null) => setHoveredId(id), []);

  return (
    <div className="flex flex-col md:flex-row items-start gap-8 md:gap-16 lg:gap-24 select-none w-full max-w-[1200px] mx-auto py-8 px-4 md:px-6 font-sans">
      {/* ── Left: photo grid ── */}
      <div className="flex gap-3 md:gap-4 lg:gap-5 flex-shrink-0 overflow-x-auto pb-1 md:pb-0 mx-auto md:mx-0">
        {/* Column 1 */}
        <div className="flex flex-col gap-3 md:gap-4 lg:gap-5">
          {col1.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[110px] h-[120px] sm:w-[140px] sm:h-[150px] md:w-[170px] md:h-[185px]"
              hoveredId={hoveredId}
              onHover={handleHover}
            />
          ))}
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-3 md:gap-4 lg:gap-5 mt-[48px] sm:mt-[60px] md:mt-[78px]">
          {col2.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[122px] h-[132px] sm:w-[155px] sm:h-[165px] md:w-[188px] md:h-[200px]"
              hoveredId={hoveredId}
              onHover={handleHover}
            />
          ))}
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-3 md:gap-4 lg:gap-5 mt-[22px] sm:mt-[30px] md:mt-[42px]">
          {col3.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[115px] h-[125px] sm:w-[145px] sm:h-[155px] md:w-[178px] md:h-[190px]"
              hoveredId={hoveredId}
              onHover={handleHover}
            />
          ))}
        </div>
      </div>

      {/* ── Right: member name list ── */}
      <div className="flex flex-col sm:grid sm:grid-cols-2 md:flex md:flex-col gap-4 md:gap-5 pt-0 md:pt-2 flex-1 w-full mt-6 md:mt-0">
        {activeMembers.map((member) => (
          <MemberRow
            key={member.id}
            member={member}
            hoveredId={hoveredId}
            onHover={handleHover}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Photo card 
───────────────────────────────────────── */

const PhotoCard = memo(function PhotoCard({
  member,
  className,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  className: string;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  // Use simple transparent fallback data url if the initials placeholder hasn't generated yet
  const imgSrc = member.image || BLANK_PIXEL;

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl cursor-pointer flex-shrink-0 transition-opacity duration-300 border border-brand-border/40 hover:border-brand-purple/30 shadow-sm',
        className,
        isDimmed ? 'opacity-40' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <img
        src={imgSrc}
        alt={member.name}
        loading="lazy"
        className="w-full h-full object-cover transition-[filter,transform] duration-500 hover:scale-103"
        style={{
          filter: isActive ? 'grayscale(0) brightness(1)' : 'grayscale(1) brightness(0.82)',
        }}
      />
    </div>
  );
});

PhotoCard.displayName = 'PhotoCard';

/* ─────────────────────────────────────────
   Member name section
───────────────────────────────────────── */

const MemberRow = memo(function MemberRow({
  member,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;
  const hasSocial = member.social?.twitter ?? member.social?.linkedin ?? member.social?.instagram ?? member.social?.behance;

  return (
    <div
      className={cn(
        'cursor-pointer transition-opacity duration-300 py-1.5 border-b border-brand-border/20 hover:border-brand-border/60',
        isDimmed ? 'opacity-40' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Name + social*/}
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            'w-4.5 h-1 rounded-[5px] flex-shrink-0 transition-all duration-300',
            isActive ? 'bg-brand-purple w-6' : 'bg-foreground/20',
          )}
        />
        <span
          className={cn(
            'text-base md:text-[18px] font-serif font-black leading-none tracking-tight transition-colors duration-300',
            isActive ? 'text-brand-purple' : 'text-brand-text/80',
          )}
        >
          {member.name}
        </span>

        {/* Social icons */}
        {hasSocial && (
          <div
            className={cn(
              'flex items-center gap-1.5 ml-3 transition-all duration-300',
              isActive
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-2 pointer-events-none',
            )}
          >
            {member.social?.twitter && (
              <a
                href={member.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded text-muted-foreground hover:text-brand-purple hover:bg-brand-purple/10 transition-all duration-150 hover:scale-110"
                title="X / Twitter"
              >
                <FaTwitter size={11} />
              </a>
            )}
            {member.social?.linkedin && (
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded text-muted-foreground hover:text-brand-purple hover:bg-brand-purple/10 transition-all duration-150 hover:scale-110"
                title="LinkedIn"
              >
                <FaLinkedinIn size={11} />
              </a>
            )}
            {member.social?.instagram && (
              <a
                href={member.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded text-muted-foreground hover:text-brand-purple hover:bg-brand-purple/10 transition-all duration-150 hover:scale-110"
                title="Instagram"
              >
                <FaInstagram size={11} />
              </a>
            )}
            {member.social?.behance && (
              <a
                href={member.social.behance}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded text-muted-foreground hover:text-brand-purple hover:bg-brand-purple/10 transition-all duration-150 hover:scale-110"
                title="Behance"
              >
                <FaBehance size={11} />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Role */}
      <p className="mt-2 pl-[28px] text-[8px] md:text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-neutral-400">
        {member.role}
      </p>
    </div>
  );
});

MemberRow.displayName = 'MemberRow';
