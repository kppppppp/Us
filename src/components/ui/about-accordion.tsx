import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

const items = [
  {
    id: "1",
    title: "Our Vision",
    content:
      "We envision a world where technology and design converge to create digital experiences that don't just meet expectations—they shatter them. Our mission is to partner with ambitious brands and transform their digital presence into a competitive advantage.",
  },
  {
    id: "2",
    title: "Our Philosophy",
    content:
      "We believe premium design isn't a luxury—it's a growth engine. Every pixel, every interaction, every line of code is a deliberate choice that compounds into extraordinary user experiences and measurable business outcomes.",
  },
  {
    id: "3",
    title: "Our Approach",
    content:
      "We don't follow templates. Each project begins with deep discovery—understanding your market, your users, and your goals. From there, we architect solutions that are as strategically sound as they are visually compelling.",
  },
  {
    id: "4",
    title: "Design & Code",
    content:
      "We bridge the gap between design and engineering. Our team doesn't just hand off mockups—we build living, breathing digital products with modern frameworks, performant architectures, and pixel-perfect execution.",
  },
  {
    id: "5",
    title: "Our People",
    content:
      "Senior-first. No junior handoffs. You work directly with veteran product designers, software architects, and growth strategists who have shipped enterprise platforms and scaled digital ecosystems.",
  },
  {
    id: "6",
    title: "Who We Partner With",
    content:
      "We collaborate with startups, scale-ups, and enterprises who value craft over shortcuts. If you're building something that matters—something that needs to stand out in a crowded market—we're your team.",
  },
  {
    id: "7",
    title: "Our Toolkit",
    content:
      "React, Next.js, TypeScript, GSAP, Three.js, Figma—these are instruments in our orchestra. But tools serve the vision, not the other way around. We choose the right stack for your specific challenge.",
  },
  {
    id: "8",
    title: "Let's Connect",
    content:
      "Ready to build something unexpected? Reach out through our contact page or drop us a line directly. We're always open to new projects, bold ideas, and meaningful collaborations.",
  },
];

export function AboutAccordion() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <Accordion type="single" defaultValue="1" collapsible className="w-full">
        {items.map((item) => (
          <AccordionItem 
            value={item.id} 
            key={item.id} 
            className="last:border-b border-brand-purple/10"
          >
            <AccordionTrigger 
              className="text-left pl-6 md:pl-14 overflow-hidden text-neutral-300 duration-200 hover:no-underline cursor-pointer -space-y-6 data-[state=open]:space-y-0 data-[state=open]:text-brand-text [&>svg]:hidden"
            >
              <div className="flex flex-1 items-start gap-4">
                <p className="text-xs font-mono text-brand-purple/60">{item.id.padStart(2, '0')}</p>
                <h3 className="uppercase relative text-center text-2xl md:text-4xl lg:text-5xl font-serif font-bold tracking-tight">
                  {item.title}
                </h3>
              </div>
            </AccordionTrigger>

            <AccordionContent className="text-neutral-500 pb-6 pl-6 md:px-20 text-sm md:text-base leading-relaxed font-light">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default AboutAccordion;
