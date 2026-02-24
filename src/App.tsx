/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
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
  Share2
} from "lucide-react";
import { useRef, useState, useEffect, ReactNode, MouseEvent } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DemoPage from "./DemoPage";

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
    <section className="py-32 bg-[#F7F9FC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Transform Every Listing Photo Into a Market-Ready Asset</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Ria enhances, stages, refines, and optimizes your media — ready for MLS and marketing.
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
                className={`w-full flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300 border ${
                  activeTool === i 
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
                      <img src={item.img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
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
                    alt="Before" 
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
                      alt="After" 
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
                          className={`text-left px-3 py-2 rounded-lg text-[10px] font-bold transition-all border ${
                            stagingStyle === style 
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

              <div className="p-6 bg-brand-blue/5 border border-brand-blue/10 rounded-2xl group cursor-pointer hover:bg-brand-blue/10 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <ZapIcon className="w-4 h-4 text-brand-blue" />
                  <span className="text-[10px] font-bold uppercase text-brand-blue">Bundle & Save</span>
                </div>
                <h5 className="font-bold text-sm mb-1">Media Boost Package</h5>
                <p className="text-[10px] text-text-secondary mb-4">Includes Enhancement, Day to Dusk, and Virtual Staging.</p>
                <div className="flex items-end gap-1">
                  <span className="text-xl font-bold">$199</span>
                  <span className="text-[10px] text-text-muted mb-1">per listing</span>
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
                Enhance My Listing with Ria
              </button>
              <button className="px-8 py-4 bg-white text-text-primary border border-divider rounded-full font-bold hover:bg-bg-accent transition-colors">
                See Before & After Examples
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

function LandingPage() {
  const [score, setScore] = useState(72);
  const [typingText, setTypingText] = useState("");
  const fullText = "Stunning 4-bedroom colonial in the heart of Oakwood. Recently renovated kitchen with quartz countertops and stainless steel appliances. Spacious backyard perfect for entertaining...";

  useEffect(() => {
    const timer = setTimeout(() => {
      if (score < 94) setScore(prev => prev + 1);
    }, 50);
    return () => clearTimeout(timer);
  }, [score]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypingText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen selection:bg-brand-blue/10 selection:text-brand-blue">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">Ria</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
            <a href="#features" className="hover:text-brand-blue transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-brand-blue transition-colors">How it Works</a>
            <Link to="/demo" className="hover:text-brand-blue transition-colors">Interactive Demo</Link>
            <button className="btn-primary py-2 text-sm">Get Started</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <FadeIn direction="up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/5 border border-brand-blue/10 text-brand-blue text-xs font-semibold mb-6">
                <Zap className="w-3 h-3" />
                <span>NEW: MLS COMPLIANCE ENGINE 2.0</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-text-primary mb-6">
                Meet Ria your AI Listing Manager. Go live in <span className="text-brand-blue">under 5 minutes.</span>
              </h1>
              <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-xl leading-relaxed">
                Upload docs and photos. Ria assembles, validates, optimizes, and prepares your MLS draft—so you review, not retype.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-primary flex items-center justify-center gap-2">
                  Get Started with Ria <ArrowRight className="w-4 h-4" />
                </button>
                <Link to="/demo" className="btn-secondary flex items-center justify-center">
                  See Interactive Demo
                </Link>
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
                      <h3 className="font-semibold text-sm">Listing Draft #482</h3>
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
                          alt="House" 
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

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Go live in minutes, not hours", desc: "Automate the tedious assembly of property data, tax records, and disclosures.", icon: Zap },
              { title: "Reduce MLS revisions", desc: "Our compliance engine catches errors before you hit submit, preventing costly delays.", icon: ShieldCheck },
              { title: "Stronger presentation", desc: "AI-optimized remarks and auto-tagged media ensure your listing stands out from day one.", icon: Sparkles },
            ].map((benefit, i) => (
              <div key={i}>
                <FadeIn delay={i * 0.1}>
                  <div className="glass-card p-8 hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-12 h-12 bg-bg-accent rounded-xl flex items-center justify-center mb-6">
                      <benefit.icon className="text-brand-blue w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{benefit.desc}</p>
                  </div>
                </FadeIn>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What it does */}
      <section id="features" className="py-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Assemble", desc: "Pull data from tax records, previous listings, and uploaded documents automatically.", icon: FileText },
              { title: "Validate", desc: "Real-time compliance checks against local MLS rules and brokerage standards.", icon: ClipboardCheck },
              { title: "Optimize", desc: "Generate high-converting remarks and virtually stage photos with one click.", icon: Sparkles },
              { title: "Publish", desc: "Export a perfect, ready-to-save draft directly to your MLS system.", icon: Layout },
            ].map((item, i) => (
              <div key={i}>
                <FadeIn delay={i * 0.1}>
                  <div className="group glass-card p-6 hover:border-brand-blue/30 transition-all duration-300 cursor-default">
                    <div className="w-10 h-10 bg-bg-accent rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold mb-2">{item.title}</h4>
                    <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
                  </div>
                </FadeIn>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RiaStudio />

      {/* How it Works - Updated to link to Demo */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1">
              <FadeIn direction="left">
                <h2 className="text-4xl font-bold tracking-tight mb-8">How it works</h2>
                <div className="space-y-12">
                  {[
                    { step: "01", title: "Upload", desc: "Drop in your photos, inspection reports, and property notes." },
                    { step: "02", title: "Build + Improve", desc: "AI assembles the listing and suggests optimizations for remarks and media." },
                    { step: "03", title: "Review + Save Draft", desc: "Verify the data and export directly to your MLS as a ready-to-go draft." },
                  ].map((step, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="text-4xl font-bold text-brand-blue/20">{step.step}</div>
                      <div>
                        <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                        <p className="text-text-secondary text-sm">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-12">
                  <Link to="/demo" className="inline-flex items-center gap-2 text-brand-blue font-bold hover:gap-3 transition-all">
                    Experience the interactive demo <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </FadeIn>
            </div>
            <div className="flex-1 w-full max-w-md">
              <FadeIn direction="right">
                <Link to="/demo" className="block relative aspect-square bg-bg-accent rounded-3xl overflow-hidden border border-border-subtle group">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-3/4 glass-card p-6 flex flex-col gap-4 group-hover:scale-105 transition-transform duration-500">
                      <div className="h-4 w-1/2 bg-bg-accent rounded animate-pulse" />
                      <div className="h-4 w-3/4 bg-bg-accent rounded animate-pulse" />
                      <div className="h-32 w-full bg-bg-accent rounded-xl animate-pulse" />
                      <div className="flex gap-2">
                        <div className="h-12 w-12 bg-bg-accent rounded animate-pulse" />
                        <div className="h-12 w-12 bg-bg-accent rounded animate-pulse" />
                        <div className="h-12 w-12 bg-bg-accent rounded animate-pulse" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-brand-blue/0 group-hover:bg-brand-blue/5 transition-colors flex items-center justify-center">
                    <div className="bg-white px-4 py-2 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-xs font-bold text-brand-blue">
                      <Sparkles className="w-3 h-3" />
                      Launch Demo
                    </div>
                  </div>
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Listing Readiness Score */}
      <section className="py-24 bg-bg-accent/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-card p-12 overflow-hidden relative">
            <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <FadeIn>
                  <h2 className="text-4xl font-bold tracking-tight mb-6">Listing Readiness Score</h2>
                  <p className="text-text-secondary mb-8">
                    Our proprietary scoring system ensures your listing is complete, compliant, and optimized for maximum market impact before you ever go live.
                  </p>
                  <div className="space-y-4">
                    {[
                      { label: "Completeness", value: 96, color: "text-brand-blue" },
                      { label: "Compliance", value: 89, color: "text-status-warning" },
                      { label: "Marketability", value: 92, color: "text-status-success" },
                    ].map((stat, i) => (
                      <div key={i} className="group relative">
                        <div className="flex justify-between items-end mb-2">
                          <span className="text-sm font-semibold">{stat.label}</span>
                          <span className={`text-lg font-bold ${stat.color}`}>{stat.value}%</span>
                        </div>
                        <div className="h-2 bg-bg-accent rounded-full overflow-hidden">
                          <motion.div 
                            className={`h-full ${stat.color.replace('text', 'bg')}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${stat.value}%` }}
                            transition={{ duration: 1, delay: i * 0.2 }}
                          />
                        </div>
                        {/* Tooltip mock */}
                        <div className="absolute -top-12 right-0 opacity-0 group-hover:opacity-100 transition-opacity bg-text-primary text-white text-[10px] py-1 px-2 rounded pointer-events-none">
                          {i === 1 ? "2 required disclosures missing" : i === 2 ? "3 photo improvements suggested" : "Remark strength below benchmark"}
                        </div>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </div>
              <div className="flex justify-center">
                <FadeIn direction="right">
                  <div className="relative w-64 h-64">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#E6EAF0" strokeWidth="8" />
                      <motion.circle 
                        cx="50" cy="50" r="45" fill="none" stroke="#3B5BFF" strokeWidth="8" 
                        strokeDasharray="283"
                        initial={{ strokeDashoffset: 283 }}
                        whileInView={{ strokeDashoffset: 283 - (283 * 0.94) }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-bold text-text-primary">94</span>
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Total Score</span>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
            {/* Background grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3B5BFF 1px, transparent 0)', backgroundSize: '24px 24px' }} />
          </div>
        </div>
      </section>

      {/* Feature Pillars */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { title: "Listing Intelligence", items: ["Auto-fill from tax data", "Historical price analysis", "Neighborhood insights"] },
              { title: "Remark Optimizer", items: ["Tone-specific generation", "SEO keyword injection", "Character limit management"] },
              { title: "Media Intelligence", items: ["Auto-room labeling", "Virtual staging suggestions", "Image quality enhancement"] },
              { title: "Compliance Guard", items: ["Local MLS rule validation", "Fair Housing check", "Disclosure tracking"] },
            ].map((pillar, i) => (
              <div key={i}>
                <FadeIn delay={i * 0.1}>
                  <div className="space-y-6">
                    <div className="w-10 h-10 bg-bg-accent rounded-lg flex items-center justify-center">
                      <Search className="w-5 h-5 text-brand-blue" />
                    </div>
                    <h3 className="text-lg font-bold">{pillar.title}</h3>
                    <ul className="space-y-3">
                      {pillar.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-text-secondary">
                          <div className="w-1 h-1 bg-brand-blue rounded-full" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Designed For */}
      <section className="py-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-4xl font-bold tracking-tight">Designed for</h2>
            </FadeIn>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: "Agents", desc: "Go live faster with stronger presentation.", icon: Users },
              { title: "Coordinators", desc: "Manage 3x more listings with half the effort.", icon: ClipboardCheck },
              { title: "Brokerages", desc: "Ensure brand consistency across all offices.", icon: Building2 },
              { title: "Compliance", desc: "Reduce audit risks and MLS violation fines.", icon: ShieldCheck },
            ].map((role, i) => (
              <div key={i}>
                <FadeIn delay={i * 0.1}>
                  <div className="glass-card p-8 text-center hover:border-brand-blue/30 transition-all cursor-default">
                    <div className="w-12 h-12 bg-bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                      <role.icon className="w-6 h-6 text-brand-blue" />
                    </div>
                    <h4 className="font-bold mb-2">{role.title}</h4>
                    <p className="text-xs text-text-secondary leading-relaxed">{role.desc}</p>
                  </div>
                </FadeIn>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Teaser */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold tracking-tight mb-12">Built for the full seller journey.</h2>
            <div className="relative">
              <div className="absolute top-1/2 left-0 w-full h-px bg-divider -z-10" />
              <div className="flex justify-between">
                {[
                  { label: "Pre-Listing", status: "Active" },
                  { label: "MLS Draft", status: "Active" },
                  { label: "Marketing", status: "Upcoming" },
                  { label: "Closing", status: "Upcoming" },
                ].map((milestone, i) => (
                  <div key={i} className="flex flex-col items-center gap-4">
                    <div className={`w-3 h-3 rounded-full border-2 ${milestone.status === 'Active' ? 'bg-brand-blue border-brand-blue' : 'bg-white border-divider'}`} />
                    <div className="flex flex-col">
                      <span className={`text-xs font-bold ${milestone.status === 'Active' ? 'text-text-primary' : 'text-text-muted'}`}>{milestone.label}</span>
                      {milestone.status === 'Upcoming' && <span className="text-[8px] text-text-muted uppercase tracking-widest font-bold">Soon</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-white border-t border-divider">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-5xl font-bold tracking-tight mb-6">Launch a winning listing in under 5 minutes.</h2>
            <p className="text-xl text-text-secondary mb-10">Complete. Compliant. Optimized. MLS draft saved.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary flex items-center justify-center gap-2">
                Get Started with Ria <ArrowRight className="w-4 h-4" />
              </button>
              <Link to="/demo" className="btn-secondary flex items-center justify-center">
                See Interactive Demo
              </Link>
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

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/demo" element={<DemoPage />} />
      </Routes>
    </Router>
  );
}
