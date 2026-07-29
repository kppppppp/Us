import React, { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "../../lib/utils"

export const centralColumnStyle = "w-[90%] max-w-[1340px] mx-auto"
export const pageYPadding = "py-10 md:py-12 lg:py-20 xl:py-30 2xl:py-40"
const defaultTitleClass = "text-xl md:text-2xl font-semibold mb-1 text-brand-text"
const defaultDescriptionClass = "text-sm md:text-base font-medium text-neutral-500 max-w-[420px] leading-[145%]"
const imageClass =
  "absolute top-0 right-0 ml-auto w-auto h-full object-cover rounded-[24px] transition-opacity duration-500 shadow-brand-md border border-brand-border/60"

export interface ItemContent {
  title: string
  description: string
  image: {
    url: string
    width: number
    height: number
    alt: string
  }
}

interface Props extends Omit<React.ComponentProps<"div">, 'title'> {
  items?: ItemContent[]
  contentA?: ItemContent
  contentB?: ItemContent
  contentC?: ItemContent
  titleClass?: string
  descriptionClass?: string
}

export const ScrollRevealContentA: React.FC<Props> = ({
  items,
  contentA,
  contentB,
  contentC,
  titleClass = defaultTitleClass,
  descriptionClass = defaultDescriptionClass,
  className,
  ...props
}) => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const ref0 = useRef<HTMLDivElement>(null)

  // Support both dynamic list of items and individual content props
  const itemsList = items || [contentA, contentB, contentC].filter((c): c is ItemContent => !!c);
  const N = itemsList.length;

  useEffect(() => {
    const handleScroll = () => {
      if (!ref0.current) return
      const rect = ref0.current.getBoundingClientRect()
      
      // Clear header space dynamically to match header layout
      const navbarHeight = window.innerWidth >= 768 ? 120 : 80;
      
      // Total scrollable bounds of the container
      const scrollRange = rect.height - (window.innerHeight - navbarHeight)
      if (scrollRange <= 0) return

      const currentOffset = navbarHeight - rect.top
      const progress = Math.min(Math.max(currentOffset / scrollRange, 0), 1)
      
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    // Fire on mount to set initial active state
    handleScroll()

    // Setup an interval to check in case of lazy loaded images shifting container bounds
    const interval = setInterval(handleScroll, 500)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearInterval(interval)
    }
  }, [N])

  return (
    <div className={cn("relative bg-transparent", className)} ref={ref0} {...props}>
      <div className="max-w-[90vw] mx-auto">
        <div className="flex items-start w-full mx-auto relative z-20">
          <div
            className={cn(centralColumnStyle, "sticky top-[80px] md:top-[120px] flex flex-col w-full items-start justify-start h-[calc(100vh-80px)] md:h-[calc(100vh-120px)]")}
          >
            <div className="flex flex-row gap-16 md:gap-24 lg:gap-32 xl:gap-40 2xl:gap-48 w-full items-start pt-[6vh] md:pt-[12vh]">
              {/* Left timeline content column - top anchored */}
              <div className="lg:!w-[50vw] !w-full h-auto flex flex-col justify-start gap-0">
                {itemsList.map((item, idx) => {
                  const thresholdStart = idx / N;
                  const thresholdEnd = (idx + 1) / N;
                  const numberStr = `0${idx + 1}`;
                  return (
                    <PointItem
                      key={idx}
                      active={true}
                      number={numberStr}
                      title={item.title}
                      description={item.description}
                      thresholdStart={thresholdStart}
                      thresholdEnd={thresholdEnd}
                      scrollProgress={scrollProgress}
                      isLast={idx === N - 1}
                    />
                  );
                })}
              </div>
              
              {/* Right sticky image showcase column - top anchored */}
              <div className="hidden lg:flex flex-col justify-start items-center !w-[50vw] relative h-[45vh] md:h-[50vh] shrink-0 mt-4 md:mt-6">
                {itemsList.map((item, idx) => {
                  const thresholdStart = idx / N;
                  const isVisible = scrollProgress > thresholdStart - (idx === 0 ? 0.1 : 0.05);
                  return (
                    <img
                      key={idx}
                      width={item.image.width}
                      height={item.image.height}
                      src={item.image.url}
                      alt={item.image.alt}
                      className={cn(
                        imageClass, 
                        "w-full h-full object-cover rounded-[24px] shadow-brand-sm border border-brand-border/60",
                        isVisible ? "opacity-100" : "opacity-0"
                      )}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="h-[150vh]" />
        </div>
      </div>
    </div>
  )
}

export default ScrollRevealContentA

const getBarPercentageHeight = (scrollProgress: number, thresholdStart: number, thresholdEnd: number) => {
  if (scrollProgress < thresholdStart) {
    return 0
  }
  if (scrollProgress > thresholdEnd) {
    return 100
  }
  return ((scrollProgress - thresholdStart) / (thresholdEnd - thresholdStart)) * 100
}

interface PointItemProps {
  active: boolean
  number: string
  title: string
  description: string
  thresholdStart: number
  thresholdEnd: number
  scrollProgress: number
  isLast?: boolean
}

const PointItem: React.FC<PointItemProps> = ({
  active,
  number,
  title,
  description,
  thresholdStart,
  thresholdEnd,
  scrollProgress,
  isLast = false
}) => {
  const barHeightPercentage = getBarPercentageHeight(scrollProgress, thresholdStart, thresholdEnd)
  
  // Exactly one item active based on scroll progress bounds
  const isActive = 
    (scrollProgress >= thresholdStart && scrollProgress < thresholdEnd) ||
    (scrollProgress === 1 && thresholdEnd === 1) ||
    (scrollProgress === 0 && thresholdStart === 0);

  return (
    <div className={cn("flex flex-row items-start w-full relative transition-all duration-300", active ? "opacity-100" : "opacity-50")}>
      {/* Left timeline axis: Number and progress bar */}
      <div className="w-[60px] md:w-[70px] flex flex-col items-center shrink-0 self-stretch relative">
        {/* Step index number */}
        <span className={cn(
          "text-sm md:text-base font-serif font-bold transition-all duration-300", 
          isActive ? "text-brand-purple opacity-100 scale-110" : "text-neutral-400 opacity-60 scale-100"
        )}>
          {number}
        </span>
        
        {/* Timeline segment track (except on the last item to prevent tail drift) */}
        {!isLast ? (
          <div className="flex-1 w-[2px] bg-brand-border/40 relative my-2">
            <div
              className="w-full bg-brand-purple absolute top-0 left-0 transition-all duration-75"
              style={{ height: `${barHeightPercentage}%` }}
            />
          </div>
        ) : (
          /* Empty spacer to align content layout cleanly on the last item */
          <div className="flex-1 w-[2px] my-2" />
        )}
      </div>

      {/* Right editorial content */}
      <div className="flex-1 pl-6 md:pl-10 pb-8 md:pb-10 text-left">
        <div className="flex flex-col">
          <h3 className={cn(defaultTitleClass, "font-serif font-bold tracking-tight transition-all duration-300", isActive ? "opacity-100 text-brand-text" : "opacity-40 text-neutral-400")}>
            {title}
          </h3>
          
          <AnimatePresence initial={false}>
            {isActive && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className={cn(defaultDescriptionClass, "pt-2")}>
                  {description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
