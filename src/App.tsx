/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence, useInView } from "motion/react";
import {
  CheckCircle2,
  ShieldCheck,
  Zap,
  FileText,
  Search,
  Layout,
  ArrowRight,
  BarChart3,
  AlertCircle,
  Users,
  Building2,
  ClipboardCheck,
  Sparkles,
  Camera,
  ChevronRight,
  Image as ImageIcon,
  Sun,
  Moon,
  Eraser,
  Maximize2,
  Layers,
  Zap as ZapIcon,
  Clock,
  Handshake,
  Megaphone,
  Share2,
  Upload,
  Download,
  Info,
  Eye,
  Flag,
  Activity,
  MapPin,
  AlertTriangle
} from "lucide-react";
import { useRef, useState, useEffect, ReactNode, MouseEvent } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DemoPage, { WatchRiaThinkSection, RoleSwitcher, JourneyTimeline } from "./DemoPage";

const professionalEase = [0.22, 1, 0.36, 1];

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

const FadeIn = ({ children, delay = 0, direction = "up" }: FadeInProps) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
      x: direction === "left" ? 20 : direction === "right" ? -20 : 0,
      filter: "blur(4px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }
    }
  };

  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={variants}>
      {children}
    </motion.div>
  );
};

const RiaStudio = () => {
  const [activeTool, setActiveTool] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [revealPosition, setRevealPosition] = useState(50);
  const [stagingStyle, setStagingStyle] = useState("Modern Neutral");
  const [compareMode, setCompareMode] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const tools = [
    {
      id: "Virtual Staging",
      icon: Layers,
      desc: "Transform empty spaces into inviting homes.",
      features: ["AI-powered furniture placement", "Style-matched decor", "Realistic lighting & shadows"],
      price: "$29",
      before: "https://picsum.photos/seed/studio-empty/1200/800",
      after: {
        "Modern Neutral": "https://picsum.photos/seed/studio-staged-modern/1200/800",
        "Luxury Contemporary": "https://picsum.photos/seed/studio-staged-luxury/1200/800",
        "Scandinavian Bright": "https://picsum.photos/seed/studio-staged-scandi/1200/800"
      }
    },
    {
      id: "Image Enhancement",
      icon: Maximize2,
      desc: "Professional-grade clarity for every shot.",
      features: ["Color correction & balancing", "Vertical alignment", "Sky replacement"],
      price: "$1.50",
      before: "https://picsum.photos/seed/studio-dull/1200/800",
      after: "https://picsum.photos/seed/studio-enhanced/1200/800"
    },
    {
      id: "Day to Dusk",
      icon: Moon,
      desc: "Capture the magic of twilight, anytime.",
      features: ["Atmospheric sky transition", "Window light activation", "Exterior glow enhancement"],
      price: "$15",
      before: "https://picsum.photos/seed/studio-day/1200/800",
      after: "https://picsum.photos/seed/studio-dusk/1200/800"
    },
    {
      id: "Virtual Item Removal",
      icon: Eraser,
      desc: "Declutter spaces for a cleaner presentation.",
      features: ["Seamless object removal", "Background reconstruction", "Texture matching"],
      price: "$10",
      before: "https://picsum.photos/seed/studio-clutter/1200/800",
      after: "https://picsum.photos/seed/studio-clean/1200/800"
    }
  ];

  const handleToolChange = (index: number) => {
    setIsProcessing(true);
    setActiveTool(index);
    setTimeout(() => setIsProcessing(false), 1000);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setRevealPosition(Math.max(0, Math.min(100, x)));
  };

  const currentTool = tools[activeTool];

  return (
    <section className="py-24 bg-[#F7F9FC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Studio-Grade Media. Zero Editing Required.</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Ria automatically edits and stages your raw photos for maximum market appeal.
            </p>
          </FadeIn>
        </div>

        {/* Compare Mode Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-1 rounded-full border border-divider shadow-sm flex items-center">
            <button
              onClick={() => setCompareMode(false)}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${!compareMode ? "bg-brand-blue text-white shadow-lg" : "text-text-muted hover:text-text-primary"}`}
            >
              STUDIO VIEW
            </button>
            <button
              onClick={() => setCompareMode(true)}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${compareMode ? "bg-brand-blue text-white shadow-lg" : "text-text-muted hover:text-text-primary"}`}
            >
              COMPARE MODE
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: Floating Tool Selector */}
          <div className="lg:col-span-2 space-y-3 sticky top-24">
            {tools.map((tool, i) => (
              <button
                key={tool.id}
                onClick={() => handleToolChange(i)}
                className={`w-full flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300 border ${activeTool === i
                  ? "bg-white border-brand-blue shadow-xl shadow-brand-blue/5 text-brand-blue"
                  : "bg-transparent border-transparent text-text-muted hover:bg-white/50 hover:border-divider"
                  }`}
              >
                <tool.icon className="w-6 h-6" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-center">{tool.id}</span>
              </button>
            ))}
          </div>

          {/* Center: Interactive Canvas */}
          <div className={`${compareMode ? "lg:col-span-10" : "lg:col-span-7"}`}>
            <AnimatePresence mode="wait">
              {compareMode ? (
                <motion.div
                  key="compare"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="grid md:grid-cols-3 gap-4"
                >
                  {[
                    { label: "ORIGINAL", img: tools[1].before },
                    { label: "ENHANCED", img: tools[1].after as string },
                    { label: "STAGED", img: (tools[0].after as any)["Modern Neutral"] }
                  ].map((item, i) => (
                    <div key={i} className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-divider shadow-lg bg-white group">
                      <img src={item.img} alt={item.label} loading="lazy" width="400" height="300" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur text-white text-[10px] font-bold rounded-full">
                        {item.label}
                      </div>
                      <div className="absolute inset-0 bg-brand-blue/0 group-hover:bg-brand-blue/5 transition-colors" />
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="studio"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  ref={canvasRef}
                  onMouseMove={handleMouseMove}
                  className="relative aspect-[4/3] bg-white rounded-3xl shadow-2xl shadow-black/5 border border-divider overflow-hidden cursor-ew-resize group"
                >
                  {/* ... existing canvas content ... */}
                  <AnimatePresence mode="wait">
                    {isProcessing && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-40 bg-white/40 backdrop-blur-sm flex items-center justify-center"
                      >
                        <div className="relative flex flex-col items-center">
                          <div className="w-16 h-16 border-4 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin mb-4" />
                          <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            <Sparkles className="w-6 h-6 text-brand-blue" />
                          </motion.div>
                          <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest">AI Processing...</span>
                        </div>
                        {/* Scanning Line */}
                        <motion.div
                          className="absolute left-0 right-0 h-px bg-brand-blue shadow-[0_0_15px_rgba(59,91,255,0.5)] z-50"
                          initial={{ top: "0%" }}
                          animate={{ top: "100%" }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Before Image */}
                  <img
                    src={currentTool.before}
                    alt="Before AI Enhancement"
                    loading="lazy"
                    width="800"
                    height="600"
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />

                  {/* After Image (Masked) */}
                  <div
                    className="absolute inset-0 w-full h-full overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - revealPosition}% 0 0)` }}
                  >
                    <img
                      src={typeof currentTool.after === 'string' ? currentTool.after : currentTool.after[stagingStyle as keyof typeof currentTool.after]}
                      alt="After AI Enhancement"
                      loading="lazy"
                      width="800"
                      height="600"
                      className="absolute inset-0 w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />

                    {/* Tool-specific effects */}
                    {activeTool === 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-brand-blue/5 pointer-events-none"
                      >
                        <div className="absolute inset-0 border-2 border-brand-blue/20 m-8 rounded-2xl border-dashed animate-pulse" />
                      </motion.div>
                    )}
                    {activeTool === 1 && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/3 -skew-x-12 pointer-events-none"
                        animate={{ left: ["-100%", "200%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                    )}
                  </div>

                  {/* Drag Handle */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-xl z-30 flex items-center justify-center"
                    style={{ left: `${revealPosition}%` }}
                  >
                    <div className="w-8 h-8 bg-white rounded-full shadow-xl border border-divider flex items-center justify-center">
                      <div className="flex gap-0.5">
                        <div className="w-0.5 h-3 bg-divider" />
                        <div className="w-0.5 h-3 bg-divider" />
                      </div>
                    </div>
                  </div>

                  {/* Labels */}
                  <div className="absolute top-6 left-6 z-20 px-3 py-1 bg-black/50 backdrop-blur text-white text-[10px] font-bold rounded-full">
                    ORIGINAL
                  </div>
                  <div className="absolute top-6 right-6 z-20 px-3 py-1 bg-brand-blue text-white text-[10px] font-bold rounded-full">
                    RIA ENHANCED
                  </div>

                  {/* Floating Price Card */}
                  <AnimatePresence>
                    {!isProcessing && (
                      <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 bg-white p-4 rounded-2xl shadow-2xl border border-divider flex items-center gap-6"
                      >
                        <div>
                          <p className="text-[8px] font-bold text-text-muted uppercase mb-1">Starting at</p>
                          <div className="flex items-end gap-1">
                            <span className="text-xl font-bold text-brand-blue">{currentTool.price}</span>
                            <span className="text-[8px] text-text-muted mb-1">per image</span>
                          </div>
                        </div>
                        <div className="h-8 w-px bg-divider" />
                        <div>
                          <p className="text-[8px] font-bold text-text-muted uppercase mb-1">Turnaround</p>
                          <p className="text-[10px] font-bold">Within 24 hours</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Tool Settings Panel */}
          {!compareMode && (
            <div className="lg:col-span-3 space-y-6">
              <div className="glass-card p-6">
                <div className="inline-flex items-center gap-2 px-2 py-1 bg-brand-blue/10 text-brand-blue text-[10px] font-bold rounded mb-4">
                  STUDIO MODE
                </div>
                <h3 className="text-xl font-bold mb-2">{currentTool.id}</h3>
                <p className="text-xs text-text-secondary leading-relaxed mb-6">
                  {currentTool.desc}
                </p>

                {activeTool === 0 && (
                  <div className="mb-6">
                    <p className="text-[10px] font-bold text-text-muted uppercase mb-3">Staging Style</p>
                    <div className="grid grid-cols-1 gap-2">
                      {Object.keys(currentTool.after).map((style) => (
                        <button
                          key={style}
                          onClick={() => setStagingStyle(style)}
                          className={`text-left px-3 py-2 rounded-lg text-[10px] font-bold transition-all border ${stagingStyle === style
                            ? "bg-brand-blue text-white border-brand-blue"
                            : "bg-bg-primary text-text-secondary border-divider hover:border-brand-blue/30"
                            }`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-bold text-text-muted uppercase mb-2">What Ria Does</p>
                    <ul className="space-y-2">
                      {currentTool.features.map(f => (
                        <li key={f} className="flex items-center gap-2 text-[10px] text-text-secondary">
                          <CheckCircle2 className="w-3 h-3 text-status-success" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-divider">
                  <button className="w-full py-3 bg-brand-blue text-white rounded-xl text-xs font-bold hover:bg-brand-blue-dark transition-colors shadow-lg shadow-brand-blue/20">
                    Apply to Listing
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-20 text-center">
          <FadeIn>
            <h3 className="text-2xl font-bold mb-4">Upgrade your listing presentation in minutes.</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-8 py-4 bg-brand-blue text-white rounded-full font-bold shadow-xl shadow-brand-blue/20 hover:scale-105 transition-transform">
                Optimize Your First Listing
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const ProductDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const products = [
    {
      title: "Smart Intake",
      desc: "Collect seller documents and property details in one secure flow.",
      icon: Search,
    },
    {
      title: "MLS Automation",
      desc: "Build, verify, and prepare MLS-ready drafts in minutes.",
      icon: Layout,
    },
    {
      title: "Compliance & QA",
      desc: "Score listings for risk, missing data, and contradictions.",
      icon: ShieldCheck,
    },
    {
      title: "Virtual Staging",
      desc: "AI-enhanced media and presentation upgrades.",
      icon: Sparkles,
    }
  ];

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button aria-expanded={isOpen} className="flex items-center gap-1 hover:text-brand-blue transition-colors py-4 text-sm font-medium text-text-secondary">
        Product
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="w-3 h-3 rotate-90" />
        </motion.div>
      </button>

      {/* Desktop Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 pt-2 hidden md:block"
          >
            <div className="w-[640px] bg-white border border-[#E6EAF0] rounded-2xl p-6 shadow-xl">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-6 block">
                CORE PRODUCTS
              </span>

              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                {products.map((item, i) => (
                  <Link
                    to={item.title === "Virtual Staging" ? "/demo" : "#"}
                    key={i}
                    className="flex gap-4 group/item items-start p-2 -m-2 rounded-xl hover:bg-bg-primary transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-bg-primary flex items-center justify-center shrink-0 border border-[#E6EAF0] group-hover/item:border-brand-blue/30 transition-colors">
                      <item.icon className="w-5 h-5 text-brand-blue" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-text-primary mb-1 group-hover/item:text-brand-blue transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Fallback */}
      <div className="md:hidden">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-white border border-[#E6EAF0] shadow-sm rounded-xl mt-2 p-4 space-y-4"
            >
              {products.map((item, i) => (
                <Link
                  to={item.title === "Virtual Staging" ? "/demo" : "#"}
                  key={i}
                  className="flex gap-3 items-center"
                >
                  <div className="w-8 h-8 rounded-lg bg-bg-primary border border-[#E6EAF0] flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-brand-blue" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-text-primary">
                      {item.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

function LandingPage() {
  const [score, setScore] = useState(72);
  const [typingText, setTypingText] = useState("");
  const fullText = "Stunning 4-bedroom colonial in the heart of Oakwood. Recently renovated kitchen with quartz countertops and stainless steel appliances. Spacious backyard perfect for entertaining...";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => {
      if (score < 94) setScore(prev => prev + 1);
    }, 50);
    return () => clearTimeout(timer);
  }, [score, isInView]);

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const interval = setInterval(() => {
      setTypingText(fullText.slice(0, i));
      i++;
      if (i > fullText.length + 100) i = 0;
    }, 20);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <div className="min-h-screen selection:bg-brand-blue/10 selection:text-brand-blue">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
                <Sparkles className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight">Ria</span>
            </Link>
            <div className="hidden md:block">
              <ProductDropdown />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
            <Link to="/login" className="hover:text-brand-blue transition-colors">Login</Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Try Ria application for free"
              className="btn-primary py-2 text-sm"
            >
              Try Ria Free
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-22 px-6 overflow-hidden" ref={ref}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <FadeIn direction="up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/5 border border-brand-blue/10 text-brand-blue text-xs font-semibold">
                <Zap className="w-3 h-3" />
                <span>MLS COMPLIANCE ENGINE</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-text-primary mb-6">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: professionalEase }}
                  className="text-4xl text-brand-blue"
                >
                  Ria Your AI Listing Manager.
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: professionalEase }}
                  className="block text-6xl "
                >
                  Prepare complete, compliant listings in <span className="text-brand-blue">minutes.</span>
                </motion.span>
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: professionalEase }}
                className="text-lg md:text-xl text-text-secondary mb-10 max-w-xl leading-relaxed"
              >
                Simply drop in your raw files. Ria instantly synthesizes tax records, photos, and compliance rules into a flawless, ready-to-publish MLS draft.
              </motion.p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary flex items-center justify-center gap-2"
                >
                  Draft a Listing <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
              <p className="mt-4 text-xs text-text-muted">
                Draft only. You stay in control of submission.
              </p>
            </FadeIn>
          </div>

          <div className="relative">
            <FadeIn direction="right" delay={0.2}>
              <div className="glass-card p-6 relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-bg-accent flex items-center justify-center">
                      <Layout className="text-brand-blue w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Listing Draft #482</div>
                      <p className="text-xs text-text-muted">1248 Oakwood Ave, San Francisco</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-status-success">{score}%</div>
                    <div className="text-[10px] uppercase tracking-wider font-bold text-text-muted">Readiness Score</div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-4 bg-bg-primary rounded-xl border border-border-subtle">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-text-muted uppercase">Public Remarks</span>
                      <span className="text-[10px] font-medium text-brand-blue">AI Optimizing...</span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed min-h-[60px]">
                      {typingText}
                      <span className="inline-block w-1 h-4 bg-brand-blue ml-0.5 animate-pulse" />
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="relative group">
                        <img
                          src={`https://picsum.photos/seed/house${i}/200/150`}
                          alt={`House ${i} Preview`}
                          loading="lazy"
                          width="200"
                          height="150"
                          className="rounded-lg w-full aspect-video object-cover border border-border-subtle"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-white/90 backdrop-blur rounded text-[8px] font-bold text-text-primary">
                          {i === 1 ? "KITCHEN" : i === 2 ? "LIVING" : "EXTERIOR"}
                        </div>
                        {i === 1 && (
                          <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-status-success rounded-full flex items-center justify-center text-white shadow-lg">
                            <CheckCircle2 className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-status-warning/5 border border-status-warning/20 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-status-warning" />
                    <p className="text-[10px] font-medium text-status-warning">
                      MLS Compliance: Missing mandatory Lead-Based Paint disclosure for pre-1978 build.
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-cyan/5 rounded-full blur-3xl -z-10" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Problem Reframe */}
      <section className="py-24 bg-white border-y border-divider">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeIn>
              <h2 className="text-4xl font-bold tracking-tight mb-4">Listings aren’t data entry. They’re revenue.</h2>
              <p className="text-text-secondary">The difference between a fast sale and a stale listing is often the quality of the initial presentation and compliance speed.</p>
            </FadeIn>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { title: "Go live in minutes, not hours", desc: "Automate the tedious assembly of property data, tax records, and disclosures.", icon: Zap },
              { title: "Reduce MLS revisions", desc: "Our compliance engine catches errors before you hit submit, preventing costly delays.", icon: ShieldCheck },
              { title: "Stronger presentation", desc: "AI-optimized remarks and auto-tagged media ensure your listing stands out from day one.", icon: Sparkles },
            ].map((benefit, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
              >
                <div className="glass-card p-8 hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-12 h-12 bg-bg-accent rounded-xl flex items-center justify-center mb-6">
                    <benefit.icon className="text-brand-blue w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <RiaEngine />

      <RiaStudio />

      {/* How it Works - Replaced with Watch Ria Think section */}
      <WatchRiaThinkSection isDemoPage={false} />

      <IntelligenceLayersSection />

      <LiveListingAuditSection />

      <RoleSwitcher />

      <JourneyTimeline />

      {/* Final CTA */}
      <section className="py-32 bg-white border-t border-divider">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-5xl font-bold tracking-tight mb-6">Launch a winning listing in under 5 minutes.</h2>
            <p className="text-xl text-text-secondary mb-10">Complete. Compliant. Optimized. MLS draft saved.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center justify-center gap-2"
              >
                Draft a Listing <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-bg-primary border-t border-divider">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand-blue rounded flex items-center justify-center">
              <Sparkles className="text-white w-4 h-4" />
            </div>
            <span className="font-bold text-lg tracking-tight">Ria</span>
          </div>
          <div className="flex gap-8 text-xs font-medium text-text-muted">
            <a href="#" className="hover:text-text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-text-primary transition-colors">Contact Support</a>
          </div>
          <div className="text-xs text-text-muted">
            © 2026 Ria. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

const IntelligenceLayersSection = () => {
  const [hoveredModule, setHoveredModule] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });

  useEffect(() => {
    if (!isInView || hoveredModule !== null) return;
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, [isInView, hoveredModule]);

  const getActiveState = (index: number) => {
    if (hoveredModule !== null) return hoveredModule === index;
    return activeIndex === index;
  };

  const modules = [
    {
      id: "Listing Intelligence",
      icon: Search,
      bg: "bg-brand-blue/10",
      color: "text-brand-blue",
      bullets: ["Automated tax record synthesis", "Historical price analysis", "Neighborhood insights"],
      preview: <ListingIntelligencePreview active={getActiveState(0)} />
    },
    {
      id: "Remark Optimizer",
      icon: Sparkles,
      bg: "bg-indigo-500/10",
      color: "text-indigo-500",
      bullets: ["Tone-specific generation", "Local search optimization", "Character limit management"],
      preview: <RemarkOptimizerPreview active={getActiveState(1)} />
    },
    {
      id: "Media Intelligence",
      icon: ImageIcon,
      bg: "bg-emerald-500/10",
      color: "text-emerald-500",
      bullets: ["Auto-room labeling", "Virtual staging suggestions", "Image quality enhancement"],
      preview: <MediaIntelligencePreview active={getActiveState(2)} />
    },
    {
      id: "Compliance Guard",
      icon: ShieldCheck,
      bg: "bg-emerald-500/10",
      color: "text-emerald-500",
      bullets: ["Local MLS rule validation", "Fair Housing check", "Disclosure tracking"],
      preview: <ComplianceGuardPreview active={getActiveState(3)} />
    }
  ];

  return (
    <section className="py-32 bg-[#F7F9FC] overflow-hidden relative" ref={ref}>
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/5 border border-brand-blue/10 text-brand-blue text-[10px] font-bold uppercase tracking-widest mb-4"
          >
            <Activity className="w-3 h-3" />
            Intelligence Layers
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Inside Ria’s Intelligence Engine</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">Four interconnected systems engineering your listing for maximum visibility and zero compliance risk.</p>
        </div>

        {/* Central Brain Layout */}
        <div className="relative max-w-5xl mx-auto min-h-[700px] flex items-center justify-center hidden lg:flex">
          {/* Connector Lines (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0 0 8px rgba(59,91,255,0.2))' }}>
            <ConnectorLine start="50%,50%" end="20%,25%" active={hoveredModule !== null ? hoveredModule === 0 : true} />
            <ConnectorLine start="50%,50%" end="80%,25%" active={hoveredModule !== null ? hoveredModule === 1 : false} />
            <ConnectorLine start="50%,50%" end="20%,75%" active={hoveredModule !== null ? hoveredModule === 2 : false} />
            <ConnectorLine start="50%,50%" end="80%,75%" active={hoveredModule !== null ? hoveredModule === 3 : true} />
          </svg>

          {/* Center Node */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", damping: 12, stiffness: 100 }}
            className="relative z-20 w-32 h-32 bg-white rounded-full shadow-2xl border border-divider flex items-center justify-center"
            animate={{
              boxShadow: hoveredModule !== null || activeIndex !== null ? "0 0 40px rgba(59,91,255,0.2)" : "0 0 20px rgba(0,0,0,0.05)",
              scale: hoveredModule !== null ? 1.05 : 1
            }}
          >
            <div className="w-24 h-24 bg-brand-blue rounded-full flex items-center justify-center relative overflow-hidden">
              <Sparkles className="text-white w-10 h-10 relative z-10" />
              <motion.div
                className="absolute inset-0 bg-white/20"
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-brand-blue uppercase tracking-widest">
              Ria Core Engine
            </div>
          </motion.div>

          {/* Modules */}
          <div className="absolute inset-0">
            {modules.map((module, i) => {
              const isActive = hoveredModule !== null ? hoveredModule === i : (i === 0 || i === 3);
              return (
                <ModuleCard
                  key={module.id}
                  module={module}
                  index={i}
                  isActive={isActive}
                  isHovered={hoveredModule === i}
                  onHover={() => setHoveredModule(i)}
                  onLeave={() => setHoveredModule(null)}
                />
              );
            })}
          </div>
        </div>

        {/* Mobile Layout */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid md:grid-cols-2 gap-6 lg:hidden"
        >
          {modules.map((module, i) => (
            <motion.div
              key={module.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
            >
              <ModuleCard
                module={module}
                index={i}
                isHovered={hoveredModule === i}
                onHover={() => setHoveredModule(i)}
                onLeave={() => setHoveredModule(null)}
                mobile
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ConnectorLine = ({ start, end, active }: { start: string, end: string, active: boolean }) => {
  return (
    <motion.line
      x1={start.split(',')[0]}
      y1={start.split(',')[1]}
      x2={end.split(',')[0]}
      y2={end.split(',')[1]}
      stroke={active ? "#3B5BFF" : "#E2E8F0"}
      strokeWidth={active ? "2" : "1"}
      strokeDasharray="4 4"
      animate={{
        strokeDashoffset: active ? [0, -20] : 0,
        opacity: active ? 1 : 0.3
      }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
};

const ModuleCard = ({ module, index, isActive, isHovered, onHover, onLeave, mobile }: any) => {
  const positions = [
    "top-[5%] left-[5%]",   // 0: Top Left
    "top-[5%] right-[5%]",  // 1: Top Right
    "bottom-[5%] left-[5%]", // 2: Bottom Left
    "bottom-[5%] right-[5%]" // 3: Bottom Right
  ];

  const hoverOffsets = [
    { x: 20, y: 20 },
    { x: -20, y: 20 },
    { x: 20, y: -20 },
    { x: -20, y: -20 }
  ];

  if (mobile) {
    return (
      <div
        className="bg-white rounded-[18px] border border-divider shadow-sm p-6"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${module.bg} ${module.color}`}>
            <module.icon className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg">{module.id}</h3>
        </div>

        <div className="space-y-3 mb-6">
          {module.bullets.map((bullet: string, i: number) => (
            <div key={bullet} className="flex items-center gap-2 text-xs text-text-secondary">
              <div className={`w-1 h-1 rounded-full ${module.color.replace('text-', 'bg-')}`} />
              {bullet}
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-divider">
          {module.preview}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={`absolute ${positions[index]} w-[320px] z-30`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      animate={{
        x: isHovered ? hoverOffsets[index].x : 0,
        y: isHovered ? hoverOffsets[index].y : 0,
        scale: isHovered ? 1.02 : 1
      }}
    >
      <div className={`bg-white rounded-[18px] border transition-all duration-300 overflow-hidden ${isActive ? "border-brand-blue shadow-[0_40px_80px_rgba(0,0,0,0.08)] -translate-y-1" : "border-divider shadow-[0_20px_40px_rgba(0,0,0,0.04)]"
        }`}>
        <div className="p-6">
          <div className={`flex items-center gap-4 transition-all duration-300 ${isActive ? "mb-4" : "mb-0"}`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${module.bg} ${module.color}`}>
              <module.icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg">{module.id}</h3>
          </div>

          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="space-y-3 mb-6 pt-2">
                  {module.bullets.map((bullet: string, i: number) => (
                    <motion.div
                      key={bullet}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="flex items-center gap-2 text-xs text-text-secondary"
                    >
                      <div className={`w-1 h-1 rounded-full ${module.color.replace('text-', 'bg-')}`} />
                      {bullet}
                    </motion.div>
                  ))}
                </div>
                <div className="pt-4 border-t border-divider">
                  {module.preview}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const ListingIntelligencePreview = ({ active }: { active: boolean }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (active) {
      const timer = setInterval(() => {
        setProgress(p => Math.min(p + 2, 100));
      }, 20);
      return () => clearInterval(timer);
    } else {
      setProgress(0);
    }
  }, [active]);

  return (
    <div className="space-y-3 bg-bg-primary/50 p-3 rounded-xl">
      <div className="flex items-center justify-between text-[10px] font-bold text-text-muted uppercase">
        <span>Tax Data Ingest</span>
        <span className="text-brand-blue">{progress}%</span>
      </div>
      <div className="h-1 bg-divider rounded-full overflow-hidden">
        <motion.div className="h-full bg-brand-blue" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex gap-2">
        <div className="flex-1 h-12 bg-white rounded border border-divider p-2">
          <div className="w-full h-full relative overflow-hidden">
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-brand-blue/10"
              initial={{ height: 0 }}
              animate={active ? { height: "60%" } : { height: 0 }}
            />
            <svg className="absolute inset-0 w-full h-full">
              <motion.path
                d="M0,40 Q25,10 50,30 T100,20"
                fill="none"
                stroke="#3B5BFF"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={active ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1 }}
              />
            </svg>
          </div>
        </div>
        <div className="w-16 h-12 bg-white rounded border border-divider flex flex-col items-center justify-center">
          <MapPin className="w-3 h-3 text-brand-blue mb-1" />
          <span className="text-[8px] font-bold">94/100</span>
        </div>
      </div>
    </div>
  );
};

const RemarkOptimizerPreview = ({ active }: { active: boolean }) => {
  const [text, setText] = useState("");
  const fullText = "Stunning colonial with modern upgrades...";

  useEffect(() => {
    if (active) {
      let i = 0;
      const interval = setInterval(() => {
        setText(fullText.slice(0, i));
        i++;
        if (i > fullText.length + 50) i = 0;
      }, 30);
      return () => clearInterval(interval);
    } else {
      setText("");
    }
  }, [active]);

  return (
    <div className="space-y-3 bg-bg-primary/50 p-3 rounded-xl">
      <div className="flex items-center justify-between mb-1">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-indigo-500" />
          <div className="w-2 h-2 rounded-full bg-indigo-200" />
        </div>
        <span className="text-[8px] font-bold text-indigo-500">OPTIMIZING...</span>
      </div>
      <div className="p-2 bg-white rounded border border-divider min-h-[60px]">
        <p className="text-[10px] text-text-secondary leading-tight">
          {text}
          <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-0.5 h-3 bg-indigo-500 ml-0.5" />
        </p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          <span className="text-[8px] px-1.5 py-0.5 bg-indigo-50 rounded text-indigo-500 font-bold">#LUXURY</span>
          <span className="text-[8px] px-1.5 py-0.5 bg-indigo-50 rounded text-indigo-500 font-bold">#MODERN</span>
        </div>
        <span className="text-[8px] text-text-muted font-bold">{text.length}/2000</span>
      </div>
    </div>
  );
};

const MediaIntelligencePreview = ({ active }: { active: boolean }) => {
  return (
    <div className="space-y-3 bg-bg-primary/50 p-3 rounded-xl">
      <div className="relative aspect-video bg-white rounded border border-divider overflow-hidden">
        <img src="https://picsum.photos/seed/media-intel/300/200" alt="Media Intelligence Analysis" loading="lazy" width="300" height="200" className="w-full h-full object-cover opacity-50" referrerPolicy="no-referrer" />
        <AnimatePresence>
          {active && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-2 left-2 px-2 py-1 bg-emerald-500 text-white text-[8px] font-bold rounded shadow-lg"
              >
                KITCHEN
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-2 right-2 px-2 py-1 bg-white/90 text-emerald-500 text-[8px] font-bold rounded border border-emerald-500/20 shadow-lg"
              >
                STAGING SUGGESTED
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-divider rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-emerald-500"
            initial={{ width: 0 }}
            animate={active ? { width: "85%" } : { width: 0 }}
          />
        </div>
        <span className="text-[8px] font-bold text-emerald-500">8.5/10</span>
      </div>
    </div>
  );
};

const ComplianceGuardPreview = ({ active }: { active: boolean }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (active) {
      const interval = setInterval(() => {
        setStep(s => (s + 1) % 4);
      }, 800);
      return () => clearInterval(interval);
    } else {
      setStep(0);
    }
  }, [active]);

  return (
    <div className="space-y-3 bg-bg-primary/50 p-3 rounded-xl">
      <div className="space-y-2">
        {[
          { label: "MLS Rules", ok: step >= 1 },
          { label: "Fair Housing", ok: step >= 2 },
          { label: "Disclosures", ok: step >= 3 }
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-[10px] font-medium text-text-secondary">{item.label}</span>
            {item.ok ? (
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            ) : (
              <div className="w-3 h-3 rounded-full border border-divider animate-pulse" />
            )}
          </div>
        ))}
      </div>
      <AnimatePresence>
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded flex items-center gap-2"
          >
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            <span className="text-[8px] font-bold text-emerald-500 uppercase">Fair Housing Check Passed</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LiveListingAuditSection = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [score, setScore] = useState(0);
  const [activeCategory, setActiveCategory] = useState<number | null>(1);
  const [completedFixes, setCompletedFixes] = useState<number[]>([]);

  const categories = [
    {
      id: "Completeness",
      score: 96,
      summary: "All mandatory MLS fields are populated. We enriched 14 missing fields using tax records and historical data.",
      items: [
        { label: "Property Type & Subtype", status: "success" },
        { label: "Beds/Baths & Square Footage", status: "success" },
        { label: "HOA Information", status: "success" },
        { label: "Tax ID & Legal Description", status: "success" }
      ]
    },
    {
      id: "Compliance",
      score: 89,
      summary: "2 warnings detected regarding Fair Housing language and missing state-mandated disclosures.",
      warnings: [
        {
          label: "Potential Fair Housing Violation",
          subtext: "Review remark: 'Walking distance to...'",
          tooltip: "Phrases like 'walking distance' can be construed as discriminatory against individuals with mobility disabilities. Suggested: 'Close to...'"
        },
        {
          label: "Missing Lead-Based Paint Disclosure",
          subtext: "Property built in 1974",
          tooltip: "Federal law requires this disclosure for properties built before 1978."
        }
      ],
      passed: [
        { label: "No Branded Media" },
        { label: "Valid Agent Info" },
        { label: "Photo Resolution" }
      ]
    },
    {
      id: "Marketability",
      score: 92,
      summary: "Listing description is strong, but adding a virtual tour could increase engagement by 30%.",
      bullets: [
        "Description sentiment is overwhelmingly positive.",
        "High-value amenities (Pool, Updated Kitchen) are highlighted.",
        "Missing Virtual Tour link."
      ],
      opportunityScore: 85
    }
  ];


  const fixes = [
    { id: 0, text: "Upload Lead-Based Paint Disclosure", priority: "High" },
    { id: 1, text: "Revise 'walking distance' in remarks", priority: "High" },
    { id: 2, text: "Add missing Virtual Tour URL (Optional)", priority: "Medium" }
  ];

  const toggleFix = (index: number) => {
    if (completedFixes.includes(index)) {
      setCompletedFixes(completedFixes.filter(i => i !== index));
    } else {
      setCompletedFixes([...completedFixes, index]);
    }
  };

  return (
    <section className="py-32 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/5 border border-brand-blue/10 text-brand-blue text-[10px] font-bold uppercase tracking-widest mb-4"
          >
            <ShieldCheck className="w-3 h-3" />
            Live Listing Audit
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Live Listing Audit Panel</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Ria cross-references 200+ regional data points to eliminate compliance risks before you hit publish.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: Overall Score Panel */}
          <motion.div
            className="lg:col-span-5 bg-white p-10 rounded-[18px] shadow-[0_40px_80px_rgba(0,0,0,0.04)] text-center border border-[#E6EAF0] sticky top-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            onViewportEnter={() => {
              if (!hasAnimated) {
                setHasAnimated(true);
                let start = 0;
                const end = 94;
                const duration = 600;
                const timer = setInterval(() => {
                  start += 2;
                  if (start >= end) {
                    setScore(end);
                    clearInterval(timer);
                  } else {
                    setScore(start);
                  }
                }, duration / (end / 2));
              }
            }}
            viewport={{ once: true }}
          >
            <div className="relative w-56 h-56 mx-auto mb-8">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="112"
                  cy="112"
                  r="100"
                  stroke="currentColor"
                  strokeWidth="14"
                  fill="transparent"
                  className="text-divider"
                />
                {/* Confidence Segments */}
                <motion.circle
                  cx="112"
                  cy="112"
                  r="100"
                  stroke="currentColor"
                  strokeWidth="14"
                  fill="transparent"
                  strokeDasharray={628.32}
                  initial={{ strokeDashoffset: 628.32 }}
                  animate={hasAnimated ? { strokeDashoffset: 628.32 * (1 - 94 / 100) } : {}}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="text-brand-blue"
                />

                {/* Visual feedback for active categories */}
                {activeCategory !== null && (
                  <motion.circle
                    cx="112"
                    cy="112"
                    r="100"
                    stroke="currentColor"
                    strokeWidth="16"
                    fill="transparent"
                    strokeDasharray="20 608"
                    animate={{
                      rotate: activeCategory * 90,
                      opacity: [0, 1, 0]
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-brand-blue/30"
                  />
                )}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-7xl font-bold text-text-primary tracking-tighter">{score}</span>
                <span className="text-[8px] font-bold text-text-muted uppercase tracking-widest mt-1">Overall Readiness Score</span>
              </div>
            </div>

            <AnimatePresence>
              {score >= 94 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-status-success/10 text-status-success rounded-full mb-6 border border-status-success/20"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wide">MLS Draft Ready - Minor Improvements Suggested</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0 }}
              animate={score >= 94 ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <p className="text-xs text-text-muted font-medium">
                Top 20% of listings in your area score above 90.
              </p>
              <div className="pt-6 border-t border-divider">
                <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold opacity-60">
                  Every score is traceable to a source.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Expandable Category Panels */}
          <div className="lg:col-span-7 space-y-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${activeCategory === i ? "border-brand-blue shadow-lg" : "border-[#E6EAF0] hover:border-brand-blue/30"
                  }`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <button
                  onClick={() => setActiveCategory(activeCategory === i ? null : i)}
                  aria-expanded={activeCategory === i}
                  aria-label={`${activeCategory === i ? 'Collapse' : 'Expand'} ${cat.id} audit details`}
                  className="w-full p-6 flex items-center justify-between text-left group"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold group-hover:text-brand-blue transition-colors">{cat.id}</h3>
                      <span className={`text-lg font-bold transition-all ${activeCategory === i ? "scale-110 text-brand-blue" : "text-text-primary"}`}>{cat.score}%</span>
                    </div>
                    <div className="h-1.5 bg-divider rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${cat.score >= 90 ? "bg-brand-blue" : "bg-amber-500"}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.score}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: activeCategory === i ? 180 : 0 }}
                    className="ml-6 text-text-muted"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {activeCategory === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-divider/50">
                        <p className="text-xs text-text-secondary mb-6 leading-relaxed">{cat.summary}</p>

                        {cat.id === "Completeness" && (
                          <div className="grid md:grid-cols-2 gap-4">
                            {cat.items?.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-3">
                                {item.status === "success" ? (
                                  <CheckCircle2 className="w-4 h-4 text-status-success" />
                                ) : (
                                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                                )}
                                <span className="text-xs text-text-secondary">{item.label}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {cat.id === "Compliance" && (
                          <div className="space-y-6">
                            <div>
                              <p className="text-[10px] font-bold text-status-error uppercase tracking-widest mb-3">Warnings</p>
                              <div className="space-y-4">
                                {cat.warnings?.map((warning, idx) => (
                                  <div key={idx} className="group relative">
                                    <div className="flex items-start gap-3">
                                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                      <div>
                                        <p className="text-xs font-bold text-text-primary">{warning.label}</p>
                                        <p className="text-[10px] text-text-muted cursor-help underline decoration-dotted decoration-divider hover:decoration-brand-blue transition-colors">
                                          {warning.subtext}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-0 mb-2 bg-text-primary text-white text-[10px] py-2 px-3 rounded shadow-xl max-w-[200px] z-50 pointer-events-none leading-tight">
                                      {warning.tooltip}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-status-success uppercase tracking-widest mb-3">Passed Checks</p>
                              <div className="grid md:grid-cols-2 gap-3">
                                {cat.passed?.map((item, idx) => (
                                  <div key={idx} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-status-success" />
                                    <span className="text-xs text-text-secondary">{item.label}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {cat.id === "Marketability" && (
                          <div className="space-y-6">
                            <div className="space-y-3">
                              {cat.bullets?.map((bullet, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                  <span className="text-xs text-text-secondary">{bullet}</span>
                                </div>
                              ))}
                            </div>
                            <div className="pt-4 border-t border-divider">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold text-text-muted uppercase">Opportunity Score</span>
                                <span className="text-xs font-bold text-indigo-500">{cat.opportunityScore}%</span>
                              </div>
                              <div className="h-1 bg-divider rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-indigo-500"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${cat.opportunityScore}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Fix Before Publishing Checklist */}
        <motion.div
          className="mt-12 bg-[#F9FBFF] p-8 rounded-[18px] border border-[#E6EAF0] shadow-[0_20px_40px_rgba(0,0,0,0.02)] relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-blue/10 rounded-xl flex items-center justify-center">
                <ClipboardCheck className="w-5 h-5 text-brand-blue" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Fix Before Publishing</h3>
                <p className="text-xs text-text-secondary">Operational improvements detected by Ria</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
                  Improve to 98% by resolving {fixes.length - completedFixes.length} issues
                </span>
                <span className="text-xs font-bold text-brand-blue">{completedFixes.length} of {fixes.length}</span>
              </div>
              <div className="w-64 h-1.5 bg-divider rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-brand-blue"
                  animate={{ width: `${(completedFixes.length / fixes.length) * 100}%` }}
                  transition={{ duration: 0.4, ease: professionalEase }}
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-1 gap-3">
            {["High", "Medium"].map(priority => (
              <div key={priority} className="space-y-3">
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">{priority} Priority</p>
                {fixes.filter(f => f.priority === priority).map((fix) => (
                  <motion.div
                    key={fix.id}
                    onClick={() => toggleFix(fix.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer group relative ${completedFixes.includes(fix.id)
                      ? "bg-white border-status-success/30 opacity-60"
                      : `bg-white border-[#E6EAF0] hover:border-brand-blue/30 ${priority === 'High' ? 'border-l-4 border-l-amber-500' : ''}`
                      }`}
                  >
                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${completedFixes.includes(fix.id)
                      ? "bg-status-success border-status-success text-white"
                      : "border-divider group-hover:border-brand-blue"
                      }`}>
                      {completedFixes.includes(fix.id) && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                    <span className={`text-sm font-medium transition-all ${completedFixes.includes(fix.id) ? "text-text-muted line-through" : "text-text-primary"
                      }`}>
                      {fix.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">
              Ria cross-references 200+ regional data points before preparing your MLS draft.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const RiaEngine = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-200px" });

  const stages = [
    {
      id: "Assemble",
      icon: Upload,
      status: "Extracting structured data...",
      desc: "Ria ingests documents, photos, and tax records, automatically structuring 200+ data points with verified sources."
    },
    {
      id: "Validate",
      icon: ShieldCheck,
      status: "Running compliance checks...",
      desc: "Every field is cross-referenced against MLS rules and brokerage standards to prevent violations before they happen."
    },
    {
      id: "Optimize",
      icon: Sparkles,
      status: "Improving clarity and marketability...",
      desc: "AI-driven remarks and media enhancements ensure your listing stands out and reaches the right audience."
    },
    {
      id: "Publish",
      icon: Download,
      status: "Preparing MLS-ready draft...",
      desc: "A final, verified draft is ready for export. You stay in total control of the final submission."
    }
  ];

  useEffect(() => {
    if (isPaused || !isInView) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isPaused, isInView, stages.length]);

  return (
    <section className="py-24 bg-[#F7F9FC] overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/5 border border-brand-blue/10 text-brand-blue text-[10px] font-bold uppercase tracking-widest mb-4"
          >
            <Zap className="w-3 h-3" />
            The Ria Engine
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">How Ria Manages Your Listing</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">A high-precision infrastructure designed to transform raw property data into market-ready assets.</p>
        </div>

        {/* Pipeline */}
        <div className="max-w-4xl mx-auto mb-20 relative px-2">

          {/* Track Container (lines and pulse) */}
          <div className="absolute top-6 left-16 right-16 h-0.5 pointer-events-none -mt-px -translate-y-1/2 z-10 w-[calc(100%-8rem)]">
            {/* Base Line */}
            <div className="absolute inset-0 bg-divider" />

            {/* Active Line Progress */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-full">
              <motion.div
                className="absolute inset-y-0 left-0 bg-brand-blue origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: activeStage / (stages.length - 1) }}
                transition={{ duration: 0.6, ease: [0.645, 0.045, 0.355, 1] }}
                style={{ width: "100%" }}
              />
            </div>

            {/* Pulse Animation */}
            <AnimatePresence>
              {activeStage < stages.length - 1 && (
                <motion.div
                  key={`pulse-${activeStage}`}
                  className="absolute top-1/2 -translate-y-1/2 left-0 h-[2px] bg-gradient-to-r from-transparent via-brand-blue to-transparent w-32 blur-[2px] z-20"
                  initial={{ x: `calc(${(activeStage / (stages.length - 1)) * 100}% - 4rem)`, left: "0px" }}
                  animate={{ x: `calc(${((activeStage + 1) / (stages.length - 1)) * 100}% - 4rem)`, left: "0px" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Nodes */}
          <div className="relative flex justify-between items-start z-30">
            {stages.map((stage, i) => {
              const isActive = activeStage === i;
              const isPast = activeStage > i;

              return (
                <div key={stage.id} className="flex flex-col items-center w-32 relative">
                  <div className="h-12 w-12 relative flex items-center justify-center mb-5 z-20">
                    <button
                      onClick={() => {
                        setActiveStage(i);
                        setIsPaused(true);
                      }}
                      onMouseEnter={() => !isActive && setIsPaused(true)}
                      onMouseLeave={() => !isActive && !isPaused && setIsPaused(false)}
                      aria-label={`Switch to ${stage.id} stage`}
                      className={`absolute inset-0 rounded-full flex items-center justify-center transition-all duration-300 border-2 origin-center ${isActive
                        ? "bg-brand-blue border-brand-blue text-white shadow-xl shadow-brand-blue/30 scale-125"
                        : isPast
                          ? "bg-brand-blue/10 border-brand-blue text-brand-blue bg-white"
                          : "bg-white border-divider text-text-muted hover:border-brand-blue/30 hover:scale-105"
                        }`}
                    >
                      <stage.icon className="w-5 h-5 absolute" />
                    </button>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-[-8px] rounded-full bg-brand-blue/10 -z-10"
                      />
                    )}
                  </div>
                  <div className="text-center w-full px-2">
                    <p className={`text-xs font-bold transition-colors ${isActive ? "text-text-primary" : "text-text-muted"}`}>
                      {stage.id}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live UI Preview Panel */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl shadow-black/5 border border-divider overflow-hidden min-h-[550px] flex flex-col">
            {/* Panel Header */}
            <div className="px-6 py-4 border-b border-divider bg-bg-primary/50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-status-error/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-status-warning/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-status-success/20" />
                </div>
                <div className="h-4 w-px bg-divider mx-2" />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeStage}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="text-[10px] font-bold text-text-muted uppercase tracking-widest"
                  >
                    {stages[activeStage]?.status}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="text-[10px] font-bold text-brand-blue uppercase tracking-widest hover:opacity-70 transition-opacity"
                >
                  {isPaused ? "Resume" : "Pause"}
                </button>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
                  <span className="text-[10px] font-bold text-status-success">LIVE ENGINE</span>
                </div>
              </div>
            </div>

            {/* Panel Content */}
            <div className="flex-1 p-8 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-full"
                >
                  <EngineStageContent stage={activeStage} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <p className="text-xs text-text-muted font-medium italic">
              {activeStage === 3 ? "Draft prepared. You stay in control." : "System operating autonomously..."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const EngineStageContent = ({ stage }: { stage: number }) => {
  const [fields, setFields] = useState<any[]>([]);
  const [counter, setCounter] = useState(0);
  const [complianceScore, setComplianceScore] = useState(84);
  const [marketabilityScore, setMarketabilityScore] = useState(72);
  const [typingText, setTypingText] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [warningResolved, setWarningResolved] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    if (stage === 0) {
      setFields([]);
      setCounter(0);
      const data = [
        { label: "Bedrooms", value: "4", source: "County Tax Record" },
        { label: "Bathrooms", value: "3.5", source: "Appraisal PDF" },
        { label: "Square Feet", value: "2,840", source: "Floor Plan" },
        { label: "Year Built", value: "1974", source: "Public Record" }
      ];
      let i = 0;
      const interval = setInterval(() => {
        if (i < data.length) {
          setFields(prev => [...prev, data[i]]);
          setCounter(prev => Math.min(prev + 50, 200));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 400);
      return () => clearInterval(interval);
    }

    if (stage === 1) {
      setComplianceScore(84);
      setShowWarning(true);
      setWarningResolved(false);
      const timer1 = setTimeout(() => {
        setWarningResolved(true);
        setComplianceScore(96);
      }, 1500);
      return () => clearTimeout(timer1);
    }

    if (stage === 2) {
      setMarketabilityScore(72);
      setTypingText("");
      const fullText = "Stunning 4-bedroom colonial in the heart of Oakwood. Recently renovated kitchen with quartz countertops and stainless steel appliances...";
      let i = 0;
      const interval = setInterval(() => {
        setTypingText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) {
          setMarketabilityScore(94);
        }
        if (i > fullText.length + 80) {
          i = 0;
          setMarketabilityScore(72);
        }
      }, 20);
      return () => clearInterval(interval);
    }
  }, [stage, isInView]);

  if (stage === 0) {
    return (
      <div className="grid md:grid-cols-2 gap-12 items-center h-full" ref={ref}>
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold">Assemble</h3>
            <div className="text-right">
              <motion.div className="text-3xl font-bold text-brand-blue">
                {counter}+
              </motion.div>
              <div className="text-[8px] font-bold text-text-muted uppercase tracking-widest">Fields Structured</div>
            </div>
          </div>
          <div className="grid gap-3">
            {fields.map((field, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-bg-primary rounded-xl border border-divider flex items-center justify-between group relative cursor-help"
              >
                <div>
                  <p className="text-[10px] font-bold text-text-muted uppercase mb-1">{field?.label}</p>
                  <p className="text-sm font-bold">{field?.value}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[8px] font-bold text-brand-blue px-2 py-1 bg-brand-blue/5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {field?.source}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-status-success" />
                </div>

                {/* Elite: Source Trace Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-all pointer-events-none bg-text-primary text-white text-[9px] py-1.5 px-3 rounded shadow-xl whitespace-nowrap z-50">
                  Source: {field?.source}
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="flex items-center gap-2 text-[10px] font-bold text-status-success"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-status-success" />
            SOURCES VERIFIED
          </motion.div>
        </div>
        <div className="bg-bg-accent rounded-2xl p-6 border border-divider h-full flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-8 gap-1 p-2">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="aspect-square bg-brand-blue rounded-sm" />
              ))}
            </div>
          </div>
          <FileText className="w-16 h-16 text-brand-blue/20 mb-4" />
          <p className="text-xs text-text-secondary max-w-[200px]">Processing tax records, deeds, and previous MLS history...</p>
        </div>
      </div>
    );
  }

  if (stage === 1) {
    return (
      <div className="grid md:grid-cols-2 gap-12 items-center h-full" ref={ref}>
        <div className="space-y-6">
          <h3 className="text-2xl font-bold">Validate</h3>
          <div className="space-y-4">
            <div className="p-5 bg-bg-primary rounded-2xl border border-divider">
              <div className="flex justify-between items-end mb-3">
                <span className="text-[10px] font-bold text-text-muted uppercase">Compliance Score</span>
                <motion.span className="text-2xl font-bold text-status-success">{complianceScore}%</motion.span>
              </div>
              <div className="h-2 bg-divider rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "84%" }}
                  animate={{ width: `${complianceScore}%` }}
                  className="h-full bg-status-success"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-divider">
                <CheckCircle2 className="w-4 h-4 text-status-success" />
                <span className="text-xs font-medium">MLS Rule Validation</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-divider">
                <CheckCircle2 className="w-4 h-4 text-status-success" />
                <span className="text-xs font-medium">Brokerage Standard Alignment</span>
              </div>
              <AnimatePresence mode="wait">
                {!warningResolved ? (
                  <motion.div
                    key="warning"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex items-center justify-between p-3 bg-status-error/5 border border-status-error/20 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-4 h-4 text-status-error" />
                      <span className="text-xs font-bold text-status-error">Missing disclosure detected</span>
                    </div>
                    <span className="text-[8px] font-bold text-status-error animate-pulse">FIXING...</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="resolved"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-3 p-3 bg-status-success/5 border border-status-success/20 rounded-xl"
                  >
                    <ShieldCheck className="w-4 h-4 text-status-success" />
                    <span className="text-xs font-bold text-status-success">Disclosure conflict resolved</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className="bg-bg-primary rounded-2xl p-8 border border-divider h-full">
          <div className="flex items-center gap-2 mb-6">
            <ClipboardCheck className="w-5 h-5 text-brand-blue" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Rule Engine v4.0</span>
          </div>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-status-success" />
                <div className="h-2 bg-divider rounded flex-1" />
                <div className="w-12 h-2 bg-divider rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (stage === 2) {
    return (
      <div className="grid md:grid-cols-2 gap-12 items-center h-full" ref={ref}>
        <div className="space-y-6">
          <h3 className="text-2xl font-bold">Optimize</h3>
          <div className="p-5 bg-bg-primary rounded-2xl border border-divider">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-blue" />
                <span className="text-[10px] font-bold uppercase text-brand-blue">AI Remarks Generation</span>
              </div>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue/30" />
              </div>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed min-h-[100px]">
              {typingText}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-1 h-4 bg-brand-blue ml-1 align-middle"
              />
            </p>
          </div>
          <div className="p-5 bg-status-success/5 border border-status-success/20 rounded-2xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold text-status-success uppercase">Marketability Score</span>
              <span className="text-xl font-bold text-status-success">{marketabilityScore}%</span>
            </div>
            <div className="h-1.5 bg-status-success/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "72%" }}
                animate={{ width: `${marketabilityScore}%` }}
                className="h-full bg-status-success"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 h-full">
          <div className="aspect-[3/4] bg-bg-accent rounded-2xl relative overflow-hidden group border border-divider">
            <img src="https://picsum.photos/seed/room-before/400/600" alt="Room before staging" loading="lazy" width="400" height="600" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[10px] font-bold text-white uppercase">Before</span>
            </div>
          </div>
          <div className="aspect-[3/4] bg-bg-accent rounded-2xl relative overflow-hidden group border border-brand-blue/30">
            <img src="https://picsum.photos/seed/room-after/400/600" alt="Room after virtual staging" loading="lazy" width="400" height="600" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute top-2 right-2 px-2 py-1 bg-brand-blue text-white text-[8px] font-bold rounded"
            >
              VIRTUAL STAGING
            </motion.div>
            <div className="absolute inset-0 bg-brand-blue/10 pointer-events-none" />
          </div>
        </div>
      </div>
    );
  }

  if (stage === 3) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-8" ref={ref}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-status-success/10 rounded-full flex items-center justify-center relative"
        >
          <CheckCircle2 className="w-12 h-12 text-status-success" />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-status-success"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        <div className="space-y-2">
          <h3 className="text-3xl font-bold">Ready for MLS</h3>
          <p className="text-text-secondary max-w-md">Your listing is fully optimized, compliant, and ready for publication across all major platforms.</p>
        </div>

        <div className="grid grid-cols-3 gap-6 w-full max-w-2xl">
          {[
            { label: "Data Accuracy", value: "100%" },
            { label: "Compliance", value: "Verified" },
            { label: "Media Quality", value: "Enhanced" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="p-4 bg-bg-primary rounded-2xl border border-divider"
            >
              <p className="text-[10px] font-bold text-text-muted uppercase mb-1">{stat?.label}</p>
              <p className="text-base font-bold text-brand-blue">{stat?.value}</p>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          animate={{ boxShadow: ["0 0 0px rgba(59,91,255,0)", "0 0 20px rgba(59,91,255,0.4)", "0 0 0px rgba(59,91,255,0)"] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="px-12 py-4 bg-brand-blue text-white rounded-2xl font-bold shadow-xl shadow-brand-blue/20 flex items-center gap-3"
        >
          <Download className="w-5 h-5" />
          Export to MLS Draft
        </motion.button>
      </div>
    );
  }

  return null;
};

export default function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/demo" element={<DemoPage />} />
        </Routes>
      </main>
    </Router>
  );
}
