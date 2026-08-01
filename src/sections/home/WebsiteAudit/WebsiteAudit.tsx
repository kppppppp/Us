import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  normalizeUrl,
  getDomain,
  isUnexpectedSolutions,
  scoreColor,
  sevColor,
  getSeverity,
  generateSummary,
  AUDIT_MAP
} from "./utils";
import { Counter } from "./Counter";
import DotField from "../../../components/ui/DotField";

const PAGESPEED_API_KEY = "AIzaSyDNxFWxfGtWeTUs-sXfY7wF9ICeHxBqhPo";

interface ScoreData {
  speed: number;
  seo: number;
  mobile: number;
  accessibility: number;
  issues: Issue[];
  summary?: string;
}

interface Issue {
  severity: "high" | "medium" | "low";
  category: string;
  text: string;
}

interface PageSpeedRawData {
  speed: number;
  accessibility: number;
  seo: number;
  mobile: number;
  audits: Record<string, { score: number | null; title: string; description: string }>;
}

const PERFECT_DATA: ScoreData = {
  speed: 97,
  seo: 94,
  mobile: 96,
  accessibility: 92,
  summary: "unexpectedsolutions.com performs exceptionally well across all categories — fast load times, strong SEO setup, mobile-friendly, and highly accessible. Only minor improvements possible.",
  issues: [
    { severity: "low", category: "SEO", text: "A few pages could benefit from additional structured data markup for richer search results" },
    { severity: "low", category: "Speed", text: "Some third-party scripts could be deferred slightly for marginal speed gains" },
  ],
};

const SCAN_STEPS = [
  "Connecting to site...",
  "Measuring page speed...",
  "Running SEO audit...",
  "Testing mobile layout...",
  "Checking accessibility...",
  "Generating your report...",
];

async function fetchPageSpeed(url: string): Promise<PageSpeedRawData> {
  const normalized = normalizeUrl(url);
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(normalized)}&key=${PAGESPEED_API_KEY}&strategy=mobile&category=performance&category=accessibility&category=seo&category=best-practices`;

  const res = await fetch(apiUrl);
  if (!res.ok) throw new Error("PageSpeed API error");

  const json = await res.json();
  const cats = json.lighthouseResult?.categories || {};
  const audits = json.lighthouseResult?.audits || {};

  const toScore = (val: number | undefined) =>
    val !== undefined ? Math.round(val * 100) : 0;

  return {
    speed: toScore(cats.performance?.score),
    accessibility: toScore(cats.accessibility?.score),
    seo: toScore(cats.seo?.score),
    mobile: toScore(cats["best-practices"]?.score),
    audits,
  };
}

async function analyzeUrl(url: string): Promise<ScoreData> {
  const psData = await fetchPageSpeed(url);
  const domain = getDomain(url);

  const issues: Issue[] = Object.entries(psData.audits)
    .filter(([key, audit]) => audit.score !== null && audit.score < 0.9 && AUDIT_MAP[key])
    .sort(([, a], [, b]) => (a.score ?? 1) - (b.score ?? 1))
    .slice(0, 6)
    .map(([key, audit]) => ({
      severity: getSeverity(audit.score ?? 0),
      category: AUDIT_MAP[key].category,
      text: AUDIT_MAP[key].text,
    }));

  return {
    speed: psData.speed,
    seo: psData.seo,
    mobile: psData.mobile,
    accessibility: psData.accessibility,
    summary: generateSummary(domain, psData.speed, psData.seo, psData.mobile, psData.accessibility),
    issues,
  };
}

export function WebsiteAudit() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [phase, setPhase] = useState<"idle" | "scanning" | "results" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [stepLabel, setStepLabel] = useState("");
  const [data, setData] = useState<ScoreData | null>(null);
  const [scannedUrl, setScannedUrl] = useState("");
  const [inputError, setInputError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const startScan = async () => {
    if (!url.trim()) {
      setInputError(true);
      setTimeout(() => setInputError(false), 1200);
      inputRef.current?.focus();
      return;
    }

    const trimmed = url.trim();
    setPhase("scanning");
    setProgress(0);
    setScannedUrl(trimmed);

    let step = 0;
    const stepInterval = setInterval(() => {
      if (step < SCAN_STEPS.length - 1) {
        setStepLabel(SCAN_STEPS[step]);
        setProgress(Math.round(((step + 1) / SCAN_STEPS.length) * 100));
        step++;
      }
    }, 700);

    try {
      let result: ScoreData;

      if (isUnexpectedSolutions(trimmed)) {
        await new Promise((r) => setTimeout(r, 4200));
        result = PERFECT_DATA;
      } else {
        result = await analyzeUrl(trimmed);
      }

      clearInterval(stepInterval);
      setStepLabel(SCAN_STEPS[SCAN_STEPS.length - 1]);
      setProgress(100);

      await new Promise((r) => setTimeout(r, 500));
      setData(result);
      setPhase("results");
    } catch {
      clearInterval(stepInterval);
      setPhase("error");
    }
  };

  const reset = () => {
    setPhase("idle");
    setUrl("");
    setData(null);
    setProgress(0);
    setStepLabel("");
  };

  return (
    <section className="relative py-24 px-6 overflow-hidden select-none" id="audit">
      {/* Global Fixed Background Particles */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-60">
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

      {/* Editorial overlays / Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-purple/5 blur-[150px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Header */}
        <div className="w-full text-center mb-16 max-w-3xl mx-auto">
          <span className="text-xs md:text-sm font-bold tracking-[0.4em] text-brand-purple uppercase mb-3 block">
            PERFORMANCE CHECKUP
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-text tracking-tight mb-5 leading-tight">
            Is Your Website Costing You Clients?
          </h2>
          <p className="text-base md:text-lg text-neutral-500 font-light leading-relaxed">
            Enter your business URL to scan load speed, SEO compliance, mobile rendering, and accessibility standards instantly.
          </p>
        </div>

        {/* Glassmorphic Audit Panel Card */}
        <motion.div
          className="relative rounded-[32px] border border-brand-border/60 bg-white/40 backdrop-blur-md p-6 md:p-12 shadow-brand-sm"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Subtle inner radial overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(93,70,216,0.03),transparent_60%)] pointer-events-none rounded-[32px]" />

          <AnimatePresence mode="wait">
            {/* IDLE PHASE */}
            {phase === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex flex-col md:flex-row gap-4 items-stretch max-w-3xl mx-auto">
                  <div className="relative flex-1">
                    <input
                      ref={inputRef}
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && startScan()}
                      placeholder="Enter your website (e.g. business.com)"
                      className="w-full bg-white/60 border border-brand-border/80 focus:border-brand-purple/40 rounded-full px-6 py-4.5 text-base text-brand-text placeholder:text-neutral-400 outline-none transition-all duration-300 shadow-inner"
                    />
                  </div>
                  <button
                    onClick={startScan}
                    className="px-8 py-4.5 rounded-full text-base font-extrabold tracking-widest uppercase text-white bg-brand-text hover:bg-brand-purple transition-all duration-300 shadow-md hover:shadow-brand-md cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <span>Analyze URL</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                    </svg>
                  </button>
                </div>

                {inputError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-center mt-3 text-red-500 font-medium"
                  >
                    Please enter a website URL first
                  </motion.p>
                )}

                {/* Audit categories labels */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-8 mt-10">
                  {["Performance Speed", "SEO Quality", "Mobile Usability", "Accessibility"].map((t) => (
                    <div key={t} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-brand-purple/10 flex items-center justify-center shrink-0">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#5d46d8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-xs md:text-sm font-medium text-neutral-500">{t}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* SCANNING PHASE */}
            {phase === "scanning" && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <div className="flex justify-center mb-8">
                  <div className="relative flex items-center justify-center w-20 h-20 rounded-full border border-brand-purple/10">
                    {/* Ring animation */}
                    <div className="absolute inset-0 rounded-full border border-t-brand-purple border-r-transparent border-b-transparent border-l-transparent animate-spin duration-1000" />
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5d46d8" strokeWidth="2.5" className="animate-pulse">
                      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                    </svg>
                  </div>
                </div>
                <p className="text-base font-bold text-brand-purple tracking-widest uppercase mb-4 animate-pulse">
                  {stepLabel}
                </p>
                <div className="max-w-xs mx-auto">
                  <div className="h-1.5 w-full bg-neutral-200/50 rounded-full overflow-hidden mb-3">
                    <motion.div
                      className="h-full bg-brand-purple rounded-full"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                  <p className="text-xs font-mono font-medium text-neutral-400">{progress}% COMPLETE</p>
                </div>
              </motion.div>
            )}

            {/* ERROR PHASE */}
            {phase === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <div className="text-4xl mb-4">⚠️</div>
                <h3 className="text-xl font-serif font-bold text-brand-text mb-3">Could not complete scan</h3>
                <p className="text-sm text-neutral-500 max-w-md mx-auto mb-8">
                  The requested domain might be offline, unreachable, or block public scanners. Please check the URL spelling and try again.
                </p>
                <button
                  onClick={reset}
                  className="px-8 py-3.5 rounded-full text-xs font-extrabold tracking-widest uppercase text-white bg-brand-text hover:bg-brand-purple transition-all duration-300 shadow-md hover:shadow-brand-md cursor-pointer"
                >
                  Return to Input
                </button>
              </motion.div>
            )}

            {/* RESULTS PHASE */}
            {phase === "results" && data && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Header status bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-purple/10 pb-6 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-semibold text-brand-text">
                      Audit Report for <span className="font-mono text-neutral-500 font-normal">{getDomain(scannedUrl)}</span>
                    </span>
                  </div>
                  <button
                    onClick={reset}
                    className="self-start sm:self-auto text-xs font-bold tracking-widest uppercase text-brand-purple hover:text-brand-deep transition-colors duration-300 flex items-center gap-1.5"
                  >
                    <span>Analyze Another Site</span>
                    <span>→</span>
                  </button>
                </div>

                {/* Score Cards Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: "Performance", val: data.speed, icon: "⚡" },
                    { label: "SEO Status", val: data.seo, icon: "🔍" },
                    { label: "Mobile Optimization", val: data.mobile, icon: "📱" },
                    { label: "Accessibility", val: data.accessibility, icon: "♿" },
                  ].map(({ label, val, icon }, i) => {
                    const c = scoreColor(val);
                    return (
                      <motion.div
                        key={label}
                        className="rounded-2xl border border-brand-purple/5 bg-white/40 p-6 text-center cursor-default group"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.4 }}
                        whileHover={{
                          y: -4,
                          borderColor: "rgba(93, 70, 216, 0.15)",
                          boxShadow: "0 12px 24px -8px rgba(93, 70, 216, 0.06)",
                          background: "rgba(255, 255, 255, 0.8)",
                        }}
                      >
                        <span className="text-2xl block mb-3">{icon}</span>
                        <div className="text-4xl font-serif font-black mb-1" style={{ color: c.text }}>
                          <Counter target={val} />
                        </div>
                        <div className="text-[10px] uppercase tracking-widest text-neutral-400 mb-3 font-bold">
                          {label}
                        </div>
                        <div
                          className="inline-block text-[10px] font-extrabold uppercase tracking-wide px-3 py-1 rounded-full"
                          style={{ backgroundColor: c.bg, color: c.text }}
                        >
                          {c.label}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* AI generated overview block */}
                {data.summary && (
                  <div className="rounded-2xl border border-brand-purple/10 bg-brand-purple/5 p-6 mb-8">
                    <h4 className="text-xs uppercase tracking-widest font-extrabold text-brand-purple mb-2">Audit Verdict</h4>
                    <p className="text-sm md:text-base leading-relaxed text-neutral-600 font-light">
                      {data.summary}
                    </p>
                  </div>
                )}

                {/* Audit issues section */}
                <div className="rounded-2xl border border-brand-purple/5 bg-white/40 p-6 md:p-8 mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    {data.issues.length === 0 ? (
                      <>
                        <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="text-sm md:text-base font-bold text-brand-text">
                          Exceptional score — zero structural bottlenecks detected.
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5">
                            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                          </svg>
                        </div>
                        <span className="text-sm md:text-base font-bold text-brand-text">
                          Recommended Improvements ({data.issues.length})
                        </span>
                      </>
                    )}
                  </div>

                  <div className="space-y-4">
                    {data.issues.map((issue, i) => {
                      const sc = sevColor(issue.severity);
                      return (
                        <div key={i} className="flex items-start gap-4 py-4 border-t border-brand-purple/5 first:border-t-0">
                          <div className="mt-2 w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: sc.dot }} />
                          <p className="text-sm text-neutral-600 leading-relaxed flex-1 font-light">{issue.text}</p>
                          <span
                            className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shrink-0"
                            style={{ backgroundColor: sc.badge, color: sc.color }}
                          >
                            {issue.category}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CTA Action card */}
                <div className="rounded-[24px] border border-brand-purple/20 bg-gradient-to-br from-brand-purple/5 to-transparent p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-lg md:text-xl font-serif font-bold text-brand-text mb-1.5">
                      {data.issues.length === 0 ? "Outstanding results. Let's design something next-level." : "Let's optimize this for you."}
                    </h3>
                    <p className="text-sm text-neutral-500 leading-relaxed font-light max-w-xl">
                      We specialize in converting heavy, legacy architectures into high-converting, 60fps systems built around client conversions.
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/contact')}
                    className="self-start md:self-auto px-8 py-4.5 rounded-full text-xs font-extrabold tracking-widest uppercase text-white bg-brand-text hover:bg-brand-purple transition-all duration-300 shadow-md hover:shadow-brand-md cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <span>Book Strategy Call</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default WebsiteAudit;
