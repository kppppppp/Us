import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Card, CardContent } from './card';
import { Marquee } from './3d-testimonails';

const testimonials = [
  {
    name: 'R jhunjhunwala',
    username: '@rj',
    body: 'Unexpected Solutions made our workflow 10x faster and extremely seamless!',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    country: '🇦🇺 AU',
  },
  {
    name: 'R jhunjhunwala',
    username: '@rj',
    body: 'The speed, communication, and visual fidelity are out of this world.',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
    country: '🇩🇪 DE',
  },
  {
    name: 'Abhnya Events',
    username: '@mat',
    body: 'Buttery smooth interactions. The lanyard logic alone is worth five stars!',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    country: '🇮🇹 IT',
  },
  {
    name: 'Ariya Shop',
    username: '@ariya.in',
    body: 'Partnering with them was the best business decision we made this year.',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    country: '🇮🇳 IN',
  },
  {
    name: 'Yash Furniture',
    username: '@noah',
    body: 'Incredibly professional frontend engineering. Pure design masterclass.',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    country: '🇺🇸 US',
  },
  {
    name: 'Lucas Stone',
    username: '@luc',
    body: 'Tailored, premium feel. They do not ship basic MVPs, they ship products that wow.',
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    country: '🇫🇷 FR',
  },
  {
    name: 'Haruto Sato',
    username: '@haru',
    body: 'Excellent responsiveness across mobile viewports. High performance builds.',
    img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    country: '🇯🇵 JP',
  },
  {
    name: 'Emma Lee',
    username: '@emma',
    body: 'The transition effects, glowing borders, and animations are goated.',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    country: '🇨🇦 CA',
  },
  {
    name: 'Carlos Ray',
    username: '@carl',
    body: 'Clean code structure and excellent communication throughout.',
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    country: '🇪🇸 ES',
  },
];

function TestimonialCard({ img, name, username, body, country }: (typeof testimonials)[number]) {
  return (
    <Card className="w-[260px] bg-white/40 backdrop-blur-md border border-brand-border/60 hover:border-brand-purple/20 transition-all duration-300 hover:shadow-brand-sm rounded-2xl p-5 shrink-0 flex flex-col justify-between">
      <CardContent className="p-0">
        <div className="flex items-center gap-2.5">
          <Avatar className="size-9 border border-brand-border/60">
            <AvatarImage src={img} alt={name} className="object-cover" />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <figcaption className="text-sm font-semibold text-brand-text flex items-center gap-1">
              {name} <span className="text-xs opacity-75">{country}</span>
            </figcaption>
            <p className="text-xs text-neutral-400 font-light">{username}</p>
          </div>
        </div>
        <blockquote className="mt-3 text-xs md:text-sm text-neutral-600 font-light leading-relaxed">
          "{body}"
        </blockquote>
      </CardContent>
    </Card>
  );
}

export default function TestimonialsDemo() {
  return (
    <div className="border border-brand-border/40 bg-white/10 backdrop-blur-sm rounded-[32px] relative flex h-[480px] w-full max-w-[1000px] flex-row items-center justify-center overflow-hidden gap-1.5 [perspective:1000px] shadow-brand-sm">
      <div
        className="flex flex-row items-center gap-6 h-[600px]"
        style={{
          transform:
            'translateX(-20px) translateY(0px) translateZ(-50px) rotateX(15deg) rotateY(-8deg) rotateZ(12deg)',
        }}
      >
        {/* Vertical Marquee 1 */}
        <Marquee vertical pauseOnHover repeat={3} className="[--duration:30s] h-full">
          {testimonials.map((review) => (
            <TestimonialCard key={review.username} {...review} />
          ))}
        </Marquee>
        {/* Vertical Marquee 2 */}
        <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:25s] h-full">
          {testimonials.map((review) => (
            <TestimonialCard key={review.username} {...review} />
          ))}
        </Marquee>
        {/* Vertical Marquee 3 */}
        <Marquee vertical pauseOnHover repeat={3} className="[--duration:35s] h-full">
          {testimonials.map((review) => (
            <TestimonialCard key={review.username} {...review} />
          ))}
        </Marquee>
        {/* Vertical Marquee 4 */}
        <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:28s] h-full">
          {testimonials.map((review) => (
            <TestimonialCard key={review.username} {...review} />
          ))}
        </Marquee>
      </div>

      {/* Subtle brand gradient overlays for vertical marquee */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/5 bg-gradient-to-b from-[#FAF9F6] to-transparent"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-[#FAF9F6] to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-[#FAF9F6] to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-[#FAF9F6] to-transparent"></div>
    </div>
  );
}
