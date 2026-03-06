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
  AlertTriangle,
  Play,
  Pause,
  TrendingUp,
  Quote,
  Lock,
  CircleCheck,
  X,
  Check,
  Menu,
  ChevronDown,
  Palette,
  Globe,
  FileUp,
  PanelsTopLeft
} from "lucide-react";
import { useRef, useState, useEffect, ReactNode, MouseEvent, useMemo, Key } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useSpring, useMotionValue } from "motion/react";
// import DemoPage from "./DemoPage"; // Removed to make App.tsx standalone

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
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        delay,
        ease: professionalEase
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

const Magnetic = ({ children, strength = 0.5 }: { children: ReactNode; strength?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    x.set((clientX - centerX) * strength);
    y.set((clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
};

const StaggerContainer = ({ children, delayChildren = 0, staggerChildren = 0.1, className = "" }: { children: ReactNode; delayChildren?: number; staggerChildren?: number; className?: string }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        visible: {
          transition: {
            delayChildren,
            staggerChildren
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StaggerItem = ({ children, direction = "up", className = "" }: { children: ReactNode; direction?: "up" | "down" | "left" | "right"; className?: string; key?: Key }) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
      x: direction === "left" ? 30 : direction === "right" ? -30 : 0,
      filter: "blur(8px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: professionalEase }
    }
  };

  return <motion.div variants={variants} className={className}>{children}</motion.div>;
};

const RevealSection = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-150px" }}
      transition={{ duration: 0.8, ease: professionalEase }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

const AnnouncementBanner = ({ onDismiss }: { onDismiss: () => void }) => {
  return (
    <div className="bg-[#EFF6FF] border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 h-10 flex items-center justify-center relative">
        <div className="flex items-center gap-2 text-sm text-blue-900">
          <Sparkles className="w-4 h-4" />
          <span>
            We’re in beta — already live with selected customers.
            Want in?

            <a href="#virtual-staging" className="underline hover:no-underline">Get early access →</a></span>
        </div>
        <button
          onClick={onDismiss}
          className="absolute right-4 text-blue-900 hover:text-blue-700 transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const HeroStats = () => {
  const stats = [
    { value: "2,400", suffix: "+", label: "MLS drafts prepared" },
    { value: "4m 12s", suffix: "", label: "Average draft time" },
    { id: "reg", label: "Regulatory Ready", sub: "Built by licensed agents" }
  ];

  return (
    <>
      <div className="max-w-7xl mx-auto px-6">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <StaggerItem key={i}>
              <div className="flex flex-col items-center text-center">
                {stat.value ? (
                  <>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-3xl font-bold text-text-primary">{stat.value}</span>
                      <span className="text-xl font-bold text-brand-blue">{stat.suffix}</span>
                    </div>
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{stat.label}</span>
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-brand-blue" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-text-primary uppercase tracking-tight leading-none mb-1">{stat.label}</p>
                      <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest leading-none">{stat.sub}</p>
                    </div>
                  </div>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </>
  );
};

const SellerCollaborationSection = () => {
  const features = [
    {
      title: "Draft Approval",
      desc: "Sellers review remarks, photos, and details before you submit. No more surprises.",
      icon: ClipboardCheck,
      emoji: "📝"
    },
    {
      title: "Prep Tracker",
      desc: "Visual checklist shows sellers exactly what's done and what's needed — in real time.",
      icon: Activity,
      emoji: "📊"
    },
    {
      title: "Document Upload",
      desc: "Sellers add disclosures, warranties, HOA docs directly. AI extracts the data.",
      icon: Upload,
      emoji: "📁"
    },
    {
      title: "Smart Follow-ups",
      desc: "AI auto-asks for missing info. No more chasing texts. Sellers answer in one tap.",
      icon: Megaphone,
      emoji: "🔔"
    }
  ];

  return (
    <RevealSection className="py-24 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/5 border border-brand-blue/10 text-brand-blue text-[10px] font-bold uppercase tracking-widest mb-4">
              SELLER COLLABORATION
            </div>
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Your sellers deserve better<br />than text updates.
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Ria gives sellers a portal to track prep, upload docs, and approve drafts — without calling you for updates.
            </p>
          </FadeIn>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <StaggerItem key={i}>
              <div className="glass-card p-8 h-full flex flex-col items-center text-center hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 bg-bg-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-brand-blue" />
                </div>
                <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </RevealSection>
  );
};



const RiaStudio = () => {
  const [activeTool, setActiveTool] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [revealPosition, setRevealPosition] = useState(50);
  const [stagingStyle, setStagingStyle] = useState("Modern Neutral");
  const [showAllStyles, setShowAllStyles] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const tools = [
    {
      id: "Virtual Staging",
      icon: Layers,
      desc: "Transform empty spaces into inviting homes.",
      features: ["AI-powered furniture placement", "Style-matched decor", "Realistic lighting & shadows"],
      price: "$29",
      before: "/images/staging-after.jpg",
      after: {
        "Modern Neutral": "/images/staging-before.jpg",
        "Luxury Contemporary": "/images/staging-before.jpg",
        "Scandinavian Bright": "/images/staging-before.jpg"
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
    if (!canvasRef.current || isDragging) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setRevealPosition(Math.max(0, Math.min(100, x)));
  };

  const [isDragging, setIsDragging] = useState(false);

  const currentTool = tools[activeTool];

  return (
    <section className="py-24 bg-bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <FadeIn>
            <h2 className="text-4xl font-bold tracking-tight mb-4">Premium Media That Sells. Market-Ready <span className="block"> in Minutes.</span></h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Virtual staging from $29. Enhancement in seconds. Day-to-dusk conversion that makes buyers stop scrolling.
            </p>
          </FadeIn>
        </div>

        {/* Compare Mode Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-bg-secondary p-1 rounded-full border border-divider shadow-sm flex items-center">
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
                  ? "bg-bg-secondary border-brand-blue shadow-xl shadow-brand-blue/5 text-brand-blue"
                  : "bg-transparent border-transparent text-text-muted hover:bg-bg-secondary/50 hover:border-divider"
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
                    { label: "ORIGINAL", img: (tools[0].after as any)["Modern Neutral"] },
                    { label: "STAGED", img: tools[0].before as string },
                    { label: "ENHANCED", img: "/images/os-enhanced-new.jpg" }
                  ].map((item, i) => (
                    <div key={i} className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-divider shadow-lg bg-bg-secondary group">
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
                  className="relative aspect-[4/3] bg-bg-secondary rounded-3xl shadow-2xl shadow-black/5 border border-divider overflow-hidden cursor-ew-resize group"
                >
                  {/* ... existing canvas content ... */}
                  <AnimatePresence mode="wait">
                    {isProcessing && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-40 bg-bg-secondary/40 backdrop-blur-sm flex items-center justify-center"
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
                  <motion.div
                    drag="x"
                    dragConstraints={canvasRef}
                    dragElastic={0}
                    dragMomentum={false}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={() => setIsDragging(false)}
                    onDrag={(e, info) => {
                      if (!canvasRef.current) return;
                      const rect = canvasRef.current.getBoundingClientRect();
                      const x = ((info.point.x - rect.left) / rect.width) * 100;
                      setRevealPosition(Math.max(0, Math.min(100, x)));
                    }}
                    className="absolute top-0 bottom-0 w-1 bg-bg-secondary shadow-xl z-30 flex items-center justify-center cursor-ew-resize group/handle"
                    style={{ left: `${revealPosition}%` }}
                  >
                    <div className="w-12 h-12 bg-bg-secondary rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.25)] border-2 border-divider flex items-center justify-center group-hover/handle:scale-110 transition-transform">
                      <div className="flex gap-1">
                        <div className="w-1 h-5 bg-divider rounded-full" />
                        <div className="w-1 h-5 bg-divider rounded-full" />
                      </div>
                    </div>
                    {/* Visual hint for dragging */}
                    <div className="absolute top-1/2 -translate-y-1/2 -left-10 right-0 pointer-events-none opacity-0 group-hover/handle:opacity-100 transition-opacity">
                      <div className="flex items-center gap-[60px] text-white/50">
                        <ChevronRight className="w-4 h-4 rotate-180" />
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Labels & Pricing Badge */}
                  <div className="absolute top-6 left-6 z-20 px-3 py-1 bg-black/50 backdrop-blur text-white text-[10px] font-bold rounded-full">
                    ORIGINAL
                  </div>
                  <div className="absolute top-6 right-6 z-30 flex flex-col items-end gap-2">
                    <div className="px-3 py-1 bg-brand-blue text-white text-[10px] font-bold rounded-full shadow-lg">
                      RIA ENHANCED
                    </div>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-bg-secondary/90 backdrop-blur p-3 rounded-xl shadow-xl border border-brand-blue/20 text-right"
                    >
                      <p className="text-[8px] font-bold text-brand-blue uppercase tracking-widest mb-0.5">Starting at</p>
                      <div className="flex items-end justify-end gap-1">
                        <span className="text-xl font-bold text-brand-blue">{currentTool.price}</span>
                        <span className="text-[8px] text-text-muted mb-1">/image</span>
                      </div>
                      <p className="text-[8px] font-medium text-text-muted mt-1 italic">Delivered within 24 hours</p>
                    </motion.div>
                  </div>

                  {/* Floating CTA (Replaces old price card) */}
                  <AnimatePresence>
                    {!isProcessing && (
                      <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3"
                      >
                        <button className="px-6 py-3 bg-brand-blue text-white rounded-xl text-xs font-bold shadow-2xl shadow-brand-blue/30 hover:scale-105 transition-transform flex items-center gap-2">
                          Enhance This Image
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Tool Settings Panel */}
          {!compareMode && (
            <div className="lg:col-span-3 space-y-6 h-[527px] overflow-y-auto">
              <div className="glass-card p-6">
                <h3 className="text-xl font-bold mb-2">{currentTool.id}</h3>
                <p className="text-xs text-text-secondary leading-relaxed mb-6">
                  {currentTool.desc}
                </p>

                {activeTool === 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[10px] font-bold text-text-muted uppercase">Staging Style</p>
                      <button
                        onClick={() => setShowAllStyles(!showAllStyles)}
                        className="text-[10px] font-bold text-brand-blue hover:underline"
                      >
                        {showAllStyles ? "Show Less" : "See All Styles"}
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {Object.keys(currentTool.after)
                        .slice(0, showAllStyles ? undefined : 3)
                        .map((style) => (
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
                  {activeTool === 0 && (
                    <div className="p-4 bg-brand-blue/5 border border-brand-blue/10 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-3 h-3 text-brand-blue" />
                        <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest">Market Insight</span>
                      </div>
                      <p className="text-[11px] font-bold text-text-primary leading-tight">
                        Virtually staged listings receive <span className="text-brand-blue">40% more online views</span> than empty ones.
                      </p>
                      <p className="text-[8px] text-text-muted mt-1">— NAR Research</p>
                    </div>
                  )}
                </div>

                <div className="mt-8 p-6 border-t border-divider sticky bottom-0 bg-bg-secondary">
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
              <button className="py-5 px-10 bg-brand-blue text-white rounded-2xl font-bold hover:bg-brand-blue-dark hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl shadow-brand-blue/20">
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
          <ChevronDown className="w-4 h-4" />
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
            <div className="w-[640px] bg-bg-secondary border border-border-subtle rounded-2xl p-6 shadow-xl">
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
                    <div className="w-10 h-10 rounded-xl bg-bg-primary flex items-center justify-center shrink-0 border border-border-subtle group-hover/item:border-brand-blue/30 transition-colors">
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
    </div>
  );
};

const MainNavigation = ({ showBanner, onDismissBanner, isDark, toggleTheme }: { showBanner: boolean; onDismissBanner: () => void; isDark: boolean; toggleTheme: () => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50">
      {showBanner && <AnnouncementBanner onDismiss={onDismissBanner} />}
      <nav className="w-full bg-bg-secondary/95 backdrop-blur-md border-b border-divider relative">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-[53px] h-10 md:w-11 md:h-11 overflow-hidden shrink-0">
                <img src="/images/logo.jpg" alt="RIA Logo" className="w-full h-full object-cover mix-blend-darken" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-none tracking-tight text-text-primary">RIA</span>
                <span className="text-[9px] font-bold text-brand-blue uppercase tracking-widest mt-0.5">Agentic AI OS</span>
              </div>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <ProductDropdown />
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/login" className="text-text-secondary hover:text-gray-900 font-medium text-sm hidden md:block">Login</Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-bold hidden sm:block"
            >
              Start Free
            </motion.button>
            <Link to="/demo" className="px-4 py-2 border border-divider text-text-secondary rounded-lg hover:bg-gray-50 transition-colors hidden lg:block text-sm font-bold">
              Book Demo
            </Link>
            <button
              onClick={toggleTheme}
              className="text-text-secondary hover:text-brand-blue p-2 ml-1 rounded-full transition-colors hidden sm:block"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              className="md:hidden text-text-secondary p-2 ml-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden absolute top-16 left-0 w-full bg-bg-secondary border-b border-divider shadow-2xl"
            >
              <div className="p-6 space-y-6">
                <div>
                  <div className="font-bold text-[10px] text-text-muted uppercase tracking-widest mb-4">Products</div>
                  <div className="flex flex-col gap-4 pl-2">
                    <Link to="#" className="block text-text-primary hover:text-brand-blue font-semibold text-sm">Listing Intelligence</Link>
                    <Link to="#" className="block text-text-primary hover:text-brand-blue font-semibold text-sm">MLS Automation</Link>
                    <Link to="#" className="block text-text-primary hover:text-brand-blue font-semibold text-sm">Compliance & QA</Link>
                    <Link to="/demo" className="block text-text-primary hover:text-brand-blue font-semibold text-sm">Virtual Staging</Link>
                  </div>
                </div>

                <div className="h-px bg-bg-accent w-full" />

                <div className="flex flex-col gap-4">
                  <Link to="/login" className="block text-text-primary hover:text-brand-blue font-semibold text-sm">Login</Link>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 pb-4">
                  <Link to="/demo" className="px-4 py-3 border border-divider text-center rounded-lg hover:bg-gray-50 transition-colors text-sm font-bold">
                    Demo
                  </Link>
                  <button className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-bold">
                    Start Free
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

const StepTimeline = ({ activeStep }: { activeStep: number }) => {
  const steps = [
    { id: 1, title: "Upload", sub: "Ingest documents & media" },
    { id: 2, title: "Build + Improve", sub: "AI optimization & compliance" },
    { id: 3, title: "Review + Save Draft", sub: "Final audit & MLS export" }
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15
          }
        }
      }}
      className="space-y-12 relative"
    >
      <div className="absolute left-4 top-2 bottom-2 w-px bg-divider -z-10" />
      {steps.map((step, i) => {
        const isActive = activeStep === i;
        const isPast = activeStep > i;

        return (
          <motion.div
            key={step.id}
            variants={{
              hidden: { opacity: 0, x: -20 },
              show: { opacity: 1, x: 0 }
            }}
            className="flex gap-6 items-start"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 z-10 ${isActive ? "bg-brand-blue text-white scale-110 shadow-lg shadow-brand-blue/20" :
              isPast ? "bg-status-success text-white" : "bg-bg-secondary border border-border-subtle text-text-muted"
              }`}>
              {isPast ? <CheckCircle2 className="w-4 h-4" /> : `0${step.id}`}
            </div>
            <div className={`transition-all duration-500 ${isActive ? "opacity-100 translate-x-2" : "opacity-40"}`}>
              <h3 className={`font-bold ${isActive ? "text-text-primary" : "text-text-muted"}`}>{step.title}</h3>
              <p className="text-xs text-text-secondary mt-1">{step.sub}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
export const WatchRiaThinkSection = ({ isDemoPage = false }: { isDemoPage?: boolean }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });

  useEffect(() => {
    if (isPaused || !isInView) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 6000); // 6 seconds per step to allow animations to play out

    return () => clearInterval(interval);
  }, [isPaused, isInView]);

  return (
    <div id={isDemoPage ? undefined : "How Ria Lists Property"} ref={ref}>
      <section className={`${isDemoPage ? 'pt-32' : 'pt-24'} pb-12 px-6`}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/5 border border-brand-blue/10 text-brand-blue text-xs font-semibold mb-6"
          >
            <Sparkles className="w-3 h-3" />
            <span>INTERACTIVE PRODUCT TOUR</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold tracking-tight mb-4"
          >
            How Ria Lists Property
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary max-w-2xl mx-auto"
          >
            Experience how Ria transforms raw property data into a compliant, high-performing MLS listing.
          </motion.p>
        </div>
      </section>

      {/* The Live Demo Section */}
      <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-20 pb-24">
        {/* Left Side: Timeline */}
        <div className="py-12">
          <StepTimeline activeStep={activeStep} />

          <div className="mt-16 p-6 bg-bg-secondary rounded-2xl border border-border-subtle shadow-sm">
            <h4 className="font-bold text-sm mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-blue" />
              Operational Intelligence
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Ria doesn't just fill forms. It cross-references every data point against your uploaded documents to ensure 100% accuracy and compliance.
            </p>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="text-[10px] font-bold text-brand-blue uppercase tracking-widest px-4 py-2 bg-brand-blue/5 rounded-full hover:bg-brand-blue/10 transition-colors"
            >
              {isPaused ? "Resume Tour" : "Pause Tour"}
            </button>
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  aria-label={`Switch to story step ${i + 1}`}
                  onClick={() => {
                    setActiveStep(i);
                    setIsPaused(true);
                  }}
                  className={`w-6 h-6 flex items-center justify-center rounded-full transition-all`}
                >
                  <div className={`rounded-full transition-all ${activeStep === i ? "w-6 h-2 bg-brand-blue" : "w-2 h-2 bg-divider"}`} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Live UI Panel */}
        <div className="md:pt-12">
          <div className="sticky top-32">
            <LiveUIDemo step={activeStep} />

            <div className="mt-8 flex items-center justify-between text-[10px] font-bold text-text-muted uppercase tracking-widest px-2">
              <span>Auto-playing demo</span>
              <div className="flex items-center gap-2">
                <span className="text-[8px] opacity-50">Step {activeStep + 1} of 3</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
const LiveUIDemo = ({ step }: { step: number }) => {
  const [typingText, setTypingText] = useState("");
  const fullText = "Stunning 4-bedroom colonial in the heart of Oakwood. Recently renovated kitchen with quartz countertops and stainless steel appliances. Spacious backyard perfect for entertaining...";

  useEffect(() => {
    if (step === 1) {
      let i = 0;
      const interval = setInterval(() => {
        setTypingText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) clearInterval(interval);
      }, 20);
      return () => clearInterval(interval);
    }
  }, [step]);

  return (
    <div className="glass-card w-full h-[500px] overflow-hidden flex flex-col relative bg-bg-secondary">
      {/* Header */}
      <div className="p-4 border-b border-divider flex items-center justify-between bg-bg-primary/50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-status-error" />
          <div className="w-2 h-2 rounded-full bg-status-warning" />
          <div className="w-2 h-2 rounded-full bg-status-success" />
          <span className="ml-2 text-[10px] font-bold text-text-muted uppercase tracking-widest">Ria Engine</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
            <span className="text-[10px] font-bold text-status-success">LIVE</span>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-full flex flex-col items-center justify-center text-center"
            >
              <div className="w-20 h-20 bg-bg-accent rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden">
                <Upload className="text-brand-blue w-8 h-8" />
                <motion.div
                  className="absolute inset-0 bg-brand-blue/10"
                  initial={{ top: "100%" }}
                  animate={{ top: "0%" }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <h2 className="font-bold text-lg mb-2">Drop listing assets here</h2>
              <p className="text-sm text-text-secondary max-w-xs">PDFs, JPEGs, and property notes. Ria handles the extraction.</p>

              <div className="mt-8 flex gap-3">
                {[1, 2, 3].map(i => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="w-12 h-16 bg-bg-secondary border border-border-subtle rounded shadow-sm flex items-center justify-center"
                  >
                    <FileText className="w-6 h-6 text-text-muted" />
                  </motion.div>
                ))}
              </div>
              <motion.p
                className="mt-6 text-[10px] font-bold text-brand-blue uppercase tracking-widest"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Extracting structured data...
              </motion.p>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Bedrooms", value: "4", source: "Tax Record" },
                  { label: "Bathrooms", value: "3.5", source: "Appraisal" },
                  { label: "Square Feet", value: "2,840", source: "Floor Plan", warning: true },
                  { label: "Year Built", value: "1974", source: "Public Record" }
                ].map((field, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-3 rounded-lg border ${field.warning ? "bg-status-warning/5 border-status-warning/20" : "bg-bg-primary border-border-subtle"}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[10px] font-bold text-text-muted uppercase">{field.label}</span>
                      <div className="group relative">
                        <Info className="w-3 h-3 text-text-muted cursor-help" />
                        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-text-primary text-white text-[8px] py-1 px-2 rounded whitespace-nowrap">
                          Source: {field.source}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm">{field.value}</span>
                      {field.warning && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-1 text-[8px] font-bold text-status-warning"
                        >
                          <AlertCircle className="w-2 h-2" />
                          CONFLICT RESOLVED
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-4 bg-bg-primary rounded-xl border border-border-subtle">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-text-muted uppercase">Public Remarks</span>
                  <div className="flex gap-2">
                    <span className="text-[10px] font-medium text-brand-blue px-2 py-0.5 bg-brand-blue/5 rounded">Luxury Tone</span>
                  </div>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed min-h-[80px]">
                  {typingText}
                  <span className="inline-block w-1 h-4 bg-brand-blue ml-0.5 animate-pulse" />
                </p>
                <div className="mt-3 flex gap-2">
                  <span className="text-[9px] font-bold text-brand-blue bg-brand-blue/10 px-2 py-1 rounded cursor-pointer hover:bg-brand-blue/20 transition-colors">
                    + Highlight recent kitchen renovation?
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col"
            >
              <div className="flex-1 space-y-6">
                <div className="flex items-center justify-between p-4 bg-status-success/5 border border-status-success/20 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-status-success rounded-full flex items-center justify-center text-white">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold">MLS Draft Ready</h3>
                      <p className="text-[10px] text-text-secondary">All 248 fields validated and compliant.</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-status-success">96%</div>
                    <div className="text-[8px] font-bold text-text-muted uppercase">Readiness</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="space-y-2">
                      <div className="aspect-video bg-bg-accent rounded-lg overflow-hidden relative border border-border-subtle">
                        <img
                          src={`https://picsum.photos/seed/house${i + 10}/200/150`}
                          alt={`House interior ${i}`}
                          loading="lazy"
                          width="200"
                          height="150"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-1 right-1">
                          <CheckCircle2 className="w-4 h-4 text-status-success bg-bg-secondary rounded-full" />
                        </div>
                      </div>
                      <div className="text-[8px] font-bold text-text-muted uppercase text-center">
                        {i === 1 ? "Auto-Tagged: Kitchen" : i === 2 ? "Auto-Tagged: Living" : "Auto-Tagged: Master"}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border border-divider rounded-xl bg-bg-primary/30">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-4 h-4 text-brand-blue" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Audit Trail</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[9px]">
                      <span className="text-text-secondary">Square Footage Source</span>
                      <span className="font-bold text-brand-blue underline cursor-pointer">Floor Plan Pg. 3</span>
                    </div>
                    <div className="flex justify-between text-[9px]">
                      <span className="text-text-secondary">Roof Age Verification</span>
                      <span className="font-bold text-brand-blue underline cursor-pointer">Inspection Report</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-brand-blue text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-brand-blue/20 relative overflow-hidden group"
                >
                  <Download className="w-5 h-5" />
                  Export to MLS Draft
                  <motion.div
                    className="absolute inset-0 bg-bg-secondary/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};


const Counter = ({ from, to, label, active }: { from: string, to: string, label: string, active: boolean }) => {
  const [current, setCurrent] = useState(from);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent(to);
    }, 500);
    return () => clearTimeout(timer);
  }, [to]);

  return (
    <div className="flex flex-col items-start">
      <p className={`text-[9px] font-bold uppercase tracking-wider mb-0.5 ${active ? "text-white/70" : "text-text-muted"}`}>{label}</p>
      <div className="flex items-center gap-1.5">
        <span className={`text-[10px] line-through opacity-40 ${active ? "text-white" : "text-text-muted"}`}>{from}</span>
        <ArrowRight className={`w-2.5 h-2.5 ${active ? "text-white" : "text-brand-blue"}`} />
        <motion.span
          key={current}
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          className={`text-xs font-bold ${active ? "text-white" : "text-brand-blue"}`}
        >
          {current}
        </motion.span>
      </div>
    </div>
  );
};

const RolePreview = ({ role }: { role: string }) => {
  const [score, setScore] = useState(82);
  const [complianceScore, setComplianceScore] = useState(92);
  const [complianceResolved, setComplianceResolved] = useState(false);

  useEffect(() => {
    if (role === "Agents") {
      setScore(82);
      const timer = setTimeout(() => setScore(94), 800);
      return () => clearTimeout(timer);
    }
    if (role === "Compliance") {
      setComplianceScore(92);
      setComplianceResolved(false);
      const timer1 = setTimeout(() => setComplianceScore(99.8), 800);
      const timer2 = setTimeout(() => setComplianceResolved(true), 1200);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
    setScore(82);
  }, [role]);

  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const transition = { duration: 0.25, ease: "easeOut" };

  return (
    <div className="relative">
      {/* Role-aware intelligence pulse line */}
      <div className="absolute -top-8 left-0 right-0 flex flex-col items-center gap-2">
        <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest opacity-60">Role-aware intelligence</span>
        <div className="w-full h-px bg-divider relative overflow-hidden">
          <motion.div
            key={role}
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-brand-blue to-transparent"
          />
        </div>
      </div>

      <div className="bg-bg-secondary rounded-2xl shadow-2xl shadow-black/5 border border-divider p-8 min-h-[500px] overflow-hidden relative">
        <AnimatePresence mode="wait">
          {role === "Agents" && (
            <motion.div key="agents" {...variants} transition={transition} className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                    <Layout className="w-6 h-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold">List faster, win more.</h3>
                    <p className="text-xs text-text-muted leading-relaxed">Go from signed agreement to live MLS in a single afternoon. Ria handles the data entry so you can focus on your seller relationship.</p>
                  </div>
                </div>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="px-3 py-1 bg-status-success text-white text-[10px] font-bold rounded-full shadow-lg shadow-status-success/20"
                >
                  READY TO PUBLISH
                </motion.div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-5 bg-bg-primary rounded-2xl border border-brand-blue/20 relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-brand-blue" />
                        <span className="text-[10px] font-bold uppercase text-brand-blue">AI Remarks Optimized</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} className="h-2 bg-brand-blue/10 rounded" />
                      <motion.div initial={{ width: 0 }} animate={{ width: "90%" }} transition={{ delay: 0.1 }} className="h-2 bg-brand-blue/10 rounded" />
                      <motion.div initial={{ width: 0 }} animate={{ width: "75%" }} transition={{ delay: 0.2 }} className="h-2 bg-brand-blue/10 rounded" />
                    </div>
                    <div className="absolute inset-0 bg-brand-blue/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>

                  <div className="p-5 bg-bg-primary rounded-2xl border border-divider">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold text-text-muted uppercase">80% Prep Time Reduction</span>
                      <div className="flex items-baseline gap-1">
                        <motion.span className="text-2xl font-bold text-brand-blue">
                          {score}%
                        </motion.span>
                      </div>
                    </div>
                    <div className="h-2 bg-divider rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: "82%" }}
                        animate={{ width: `${score}%` }}
                        className="h-full bg-brand-blue"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-text-muted uppercase">Photo Gallery</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2].map(i => (
                      <div key={i} className="aspect-square bg-bg-accent rounded-xl relative overflow-hidden group">
                        <img src={`https://picsum.photos/seed/agent-ui-${i}/300/300`} alt="Agent UI Interface" loading="lazy" width="300" height="300" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="absolute bottom-2 left-2 right-2 bg-bg-secondary/90 backdrop-blur py-1 px-2 rounded text-[8px] font-bold text-brand-blue text-center border border-brand-blue/20"
                        >
                          {i === 1 ? "AUTO-TAGGED: KITCHEN" : "AUTO-TAGGED: EXTERIOR"}
                        </motion.div>
                      </div>
                    ))}
                  </div>
                  <motion.button
                    animate={{ boxShadow: ["0 0 0px rgba(59,91,255,0)", "0 0 15px rgba(59,91,255,0.3)", "0 0 0px rgba(59,91,255,0)"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-full py-3 bg-brand-blue text-white rounded-xl text-xs font-bold shadow-xl shadow-brand-blue/20"
                  >
                    GO LIVE
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {role === "Coordinators" && (
            <motion.div key="coordinators" {...variants} transition={transition} className="space-y-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-base font-bold">Manage 3x the listings, zero the errors.</h3>
                  <p className="text-xs text-text-muted leading-relaxed">Ria automates the assembly and compliance checks you do manually today. One dashboard for every listing in your pipeline.</p>
                </div>
                <button className="px-4 py-2 bg-brand-blue/10 text-brand-blue text-[10px] font-bold rounded-lg hover:bg-brand-blue/20 transition-colors">
                  BULK REVIEW (3)
                </button>
              </div>

              <div className="grid gap-3">
                {[
                  { addr: "482 Pine St", progress: 85, status: "DRAFT READY", type: "Single Family" },
                  { addr: "129 Market Ave", progress: 40, status: "IN REVIEW", type: "Condo" },
                  { addr: "901 Ocean Blvd", progress: 100, status: "COMPLETED", type: "Luxury" }
                ].map((listing, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 bg-bg-primary rounded-2xl border border-divider flex items-center justify-between group hover:border-brand-blue/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${listing.progress === 100 ? "bg-status-success/10 text-status-success" : "bg-brand-blue/10 text-brand-blue"
                        }`}>
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{listing.addr}</p>
                        <p className="text-[10px] text-text-muted">{listing.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="hidden md:block w-32">
                        <div className="flex justify-between text-[8px] font-bold text-text-muted uppercase mb-1">
                          <span>Progress</span>
                          <span>{listing.progress}%</span>
                        </div>
                        <div className="h-1.5 bg-divider rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${listing.progress}%` }}
                            transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                            className={`h-full ${listing.progress === 100 ? "bg-status-success" : "bg-brand-blue"}`}
                          />
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded text-[8px] font-bold ${listing.status === "COMPLETED" ? "bg-status-success/10 text-status-success" :
                        listing.status === "DRAFT READY" ? "bg-brand-blue/10 text-brand-blue" : "bg-status-warning/10 text-status-warning"
                        }`}>
                        {listing.status}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-4 bg-brand-blue/5 border border-brand-blue/10 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-brand-blue" />
                  <span className="text-xs font-bold text-brand-blue">Operational Throughput: +150%</span>
                </div>
                <span className="text-[10px] text-brand-blue font-medium px-2 py-1 bg-bg-secondary/50 rounded">System Optimized</span>
              </div>
            </motion.div>
          )}

          {role === "Brokerages" && (
            <motion.div key="brokerages" {...variants} transition={transition} className="space-y-8">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                className="absolute top-0 left-0 right-0 h-1.5 bg-brand-blue origin-left"
              />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold">Brand-consistent listings across every office.</h3>
                  <p className="text-xs text-text-muted leading-relaxed">Enforce brand guidelines, listing standards, and compliance rules across your entire organization. One template, total alignment.</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-bg-accent rounded-lg text-xs font-bold border border-divider">
                  <Building2 className="w-4 h-4 text-brand-blue" />
                  West Coast Region
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 border border-brand-blue/20 bg-brand-blue/5 rounded-2xl relative overflow-hidden">
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-4 right-4 px-2 py-0.5 bg-brand-blue text-white text-[8px] font-bold rounded-full flex items-center gap-1 shadow-lg shadow-brand-blue/20"
                  >
                    <Zap className="w-2 h-2" />
                    ELITE VERSION
                  </motion.div>
                  <div className="flex items-center gap-2 mb-6">
                    <CheckCircle2 className="w-5 h-5 text-status-success" />
                    <span className="text-sm font-bold uppercase tracking-wider">Brand Alignment Verified</span>
                  </div>
                  <div className="space-y-4">
                    <p className="text-xs text-text-secondary leading-relaxed">
                      Automatically enforcing logos, colors, and typography across 100% of your organization's output.
                    </p>
                    <div className="flex items-center gap-3 p-3 bg-bg-secondary/50 rounded-xl border border-brand-blue/10">
                      <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                        <Users className="w-4 h-4 text-brand-blue" />
                      </div>
                      <span className="text-[10px] font-bold text-brand-blue">Active in 18 Offices</span>
                    </div>
                  </div>
                  <motion.div
                    className="absolute -right-8 -bottom-8 w-24 h-24 bg-brand-blue/10 rounded-full blur-2xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-text-muted uppercase">Brand Template Selector</p>
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`aspect-[3/4] rounded-xl border-2 transition-all cursor-pointer ${i === 1 ? "border-brand-blue bg-brand-blue/5" : "border-divider bg-bg-accent hover:border-brand-blue/30"}`}>
                        <div className="h-full flex flex-col p-2">
                          <div className={`h-1 w-full rounded-full mb-2 ${i === 1 ? "bg-brand-blue" : "bg-divider"}`} />
                          <div className="flex-1 bg-bg-secondary/50 rounded" />
                          {i === 1 && <div className="mt-2 text-[6px] font-bold text-brand-blue text-center uppercase">ACTIVE</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-bg-primary rounded-xl border border-divider">
                    <p className="text-[10px] font-bold text-text-muted uppercase mb-2">Audit Summary</p>
                    <div className="flex justify-between items-end">
                      <span className="text-xs font-bold">100% Brand Compliance</span>
                      <span className="text-[10px] text-status-success font-bold">Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {role === "Compliance" && (
            <motion.div key="compliance" {...variants} transition={transition} className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold">Catch problems before they become lawsuits.</h3>
                  <p className="text-xs text-text-muted leading-relaxed">Fair Housing language review, disclosure validation, and regulatory checks—automatically on every listing.</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
                  <span className="text-[10px] font-bold text-status-success">SECURE MONITORING</span>
                </div>
              </div>

              <div className="space-y-4">
                <AnimatePresence mode="wait">
                  {!complianceResolved ? (
                    <motion.div
                      key="alert"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                      className="p-5 bg-status-error/5 border border-status-error/20 rounded-2xl flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-status-error/10 rounded-xl flex items-center justify-center">
                          <Flag className="w-5 h-5 text-status-error" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-status-error">Fair Housing Alert</p>
                          <p className="text-[10px] text-text-secondary">Prohibited terminology detected in remarks</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-status-error animate-pulse">ACTION REQUIRED</span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="resolved"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-5 bg-status-success/5 border border-status-success/20 rounded-2xl flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-status-success/10 rounded-xl flex items-center justify-center">
                          <ShieldCheck className="w-5 h-5 text-status-success" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-status-success">Violation Prevented</p>
                          <p className="text-[10px] text-text-secondary">Remark auto-corrected for compliance</p>
                        </div>
                      </div>
                      <div className="px-3 py-1 bg-status-success text-white text-[10px] font-bold rounded-full">
                        RESOLVED
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-5 bg-bg-primary rounded-2xl border border-divider">
                    <div className="flex justify-between items-end mb-3">
                      <span className="text-[10px] font-bold text-text-muted uppercase">Compliance Score</span>
                      <span className="text-xl font-bold text-status-success">{complianceScore}%</span>
                    </div>
                    <div className="h-2 bg-divider rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: "92%" }}
                        animate={{ width: `${complianceScore}%` }}
                        transition={{ duration: 1.5 }}
                        className="h-full bg-status-success"
                      />
                    </div>
                  </div>
                  <div className="p-5 bg-bg-primary rounded-2xl border border-divider">
                    <p className="text-[10px] font-bold text-text-muted uppercase mb-3">Audit Log</p>
                    <div className="space-y-2">
                      <div className="h-1.5 w-full bg-divider rounded" />
                      <div className="h-1.5 w-3/4 bg-divider rounded" />
                      <div className="h-1.5 w-1/2 bg-divider rounded" />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-bg-accent rounded-xl border border-divider text-center">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[10px] font-bold text-text-muted tracking-wider"
                  >
                    EVERY LISTING AUDITED AGAINST 200+ COMPLIANCE RULES
                  </motion.p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const SocialProof = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto px-6 hidden">
        <div className="text-center mb-16">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/5 border border-brand-blue/10 text-brand-blue text-[10px] font-bold uppercase tracking-widest mb-4">
              <Handshake className="w-3 h-3" />
              Social Proof
            </div>
            <h2 className="text-4xl font-bold tracking-tight mb-4">Used by agents who don’t want to go back.</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">Real agents. Real listings. Real time saved.</p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <FadeIn direction="left">
            <div className="bg-bg-secondary h-full p-8 rounded-2xl border border-border-subtle shadow-sm hover:shadow-md hover:border-brand-blue/20 transition-all group">
              <Quote className="w-8 h-8 text-brand-blue/10 mb-6 group-hover:text-brand-blue/20 transition-colors" />
              <p className="text-lg text-text-primary mb-8 leading-relaxed italic">“Ria cut my listing prep from 3 hours to 12 minutes. I’m never going back to manual data entry.”</p>
              <div className="flex items-center gap-4">
                <img alt="Sarah Jenkins" className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" />
                <div>
                  <h4 className="font-bold text-text-primary">Sarah Jenkins</h4>
                  <p className="text-xs text-text-muted uppercase tracking-wider font-medium">Private Beta User · CA Coastal Properties</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right">
            <div className="bg-bg-secondary h-full p-8 rounded-2xl border border-border-subtle shadow-sm hover:shadow-md hover:border-brand-blue/20 transition-all group">
              <Quote className="w-8 h-8 text-brand-blue/10 mb-6 group-hover:text-brand-blue/20 transition-colors" />
              <p className="text-lg text-text-primary mb-8 leading-relaxed italic">“The compliance checks alone are worth it. It's like having a second pair of eyes that never gets tired.”</p>
              <div className="flex items-center gap-4">
                <img alt="Marcus Thorne" className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop" />
                <div>
                  <h4 className="font-bold text-text-primary">Marcus Thorne</h4>
                  <p className="text-xs text-text-muted uppercase tracking-wider font-medium">Top Producer · Luxury Realty Group</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="py-12 border-y border-divider mb-16 hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FadeIn delay={0.1}>
              <div className="text-center">
                <div className="text-4xl font-bold text-text-primary mb-2">94%</div>
                <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Average readiness score</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="text-center">
                <div className="text-4xl font-bold text-text-primary mb-2">12 min</div>
                <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Avg time to MLS-ready draft</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="text-center">
                <div className="text-4xl font-bold text-text-primary mb-2">75%</div>
                <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Reduction in listing prep time</p>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="space-y-12">
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            <div className="flex items-center gap-2 opacity-60 grayscale hover:grayscale-0 transition-all">
              <Lock className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Encrypted at rest & in transit</span>
            </div>
            <div className="flex items-center gap-2 opacity-60 grayscale hover:grayscale-0 transition-all text-text-primary">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">MLS-ready workflow engine</span>
            </div>
            <div className="flex items-center gap-2 opacity-60 grayscale hover:grayscale-0 transition-all text-text-primary">
              <Users className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Built by licensed agents</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


function LandingPage() {
  const [showBanner, setShowBanner] = useState(true);
  const [score, setScore] = useState(72);
  const [typingText, setTypingText] = useState("");
  const fullText = "Stunning 4-bedroom colonial in the heart of Oakwood. Recently renovated kitchen with quartz countertops and stainless steel appliances. Spacious backyard perfect for entertaining...";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

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
    <div className="min-h-screen selection:bg-brand-blue/10 selection:text-brand-blue bg-bg-primary overflow-x-hidden w-full max-w-[100vw]">
      {/* Navigation */}
      <MainNavigation showBanner={showBanner} onDismissBanner={() => setShowBanner(false)} isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />

      {/* Hero Section */}
      <RevealSection className="pt-38 pb-30 px-6 overflow-hidden">
        <div ref={ref} className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <FadeIn direction="up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/5 border border-brand-blue/10 text-brand-blue text-xs font-semibold mb-6">
                <Zap className="w-3 h-3" />
                <span>The Agentic AI Operating System for Real Estate</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-text-primary mb-6">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: professionalEase }}
                  className="block text-6xl "
                >Your listings, assembled, optimized, and live <span className="text-brand-blue block">in minutes.</span>
                </motion.span>
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: professionalEase }}
                className="text-lg md:text-xl text-text-secondary mb-10 max-w-xl leading-relaxed"
              >
                Ria is the agentic platform that runs the entire listing workflow end-to-end, so you ship MLS-ready listings faster, with higher quality, and full control.
              </motion.p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-lg">
                  Start Free
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button className="px-6 py-3 border-2 border-divider text-text-secondary rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center text-lg">
                  Book Demo
                </button>
              </div>
              <p className="mt-4 text-xs text-text-muted">
                {/* No credit card required · You control every submission · Cancel anytime */}
                This is a new way to ship listings — faster, cleaner, and fully controlled.
              </p>
            </FadeIn>
          </div>

          <div className="relative">
            <FadeIn direction="left" delay={0.3}>
              <div className="relative z-10 glass-card p-1 bg-bg-secondary/50 backdrop-blur-xl border-white/20 shadow-2xl">
                <div className="bg-bg-primary rounded-2xl overflow-hidden border border-divider">
                  {/* Status Bar */}
                  <div className="px-6 py-4 border-b border-divider flex items-center justify-between bg-bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-status-error/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-status-warning/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-status-success/20" />
                      </div>
                      <div className="h-4 w-px bg-divider mx-1" />
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Listing OS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
                      <span className="text-[10px] font-bold text-status-success uppercase tracking-widest">Engine Active</span>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-sm font-bold text-text-primary mb-1">Listing Created</h3>
                        <p className="text-[10px] text-text-secondary uppercase font-bold tracking-wider">Ready To Publish</p>
                      </div>
                      <div className="text-right">
                        <motion.div
                          className="text-sm font-bold text-brand-blue"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {/* {score}% */}
                          <div class="mb-6 p-4 border border-green-200 bg-green-50 rounded-lg" data-fg-eh6d48="1.16:1.6728:/src/app/components/Hero.tsx:84:15:3813:675:e:div:e"><div class="flex items-center gap-2 text-green-700" data-fg-eh6d49="1.16:1.6728:/src/app/components/Hero.tsx:85:17:3903:564:e:div:ete"><svg class="size-5" fill="currentColor" viewBox="0 0 20 20" data-fg-eh6d50="1.16:1.6728:/src/app/components/Hero.tsx:86:19:3978:380:e:svg:e"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" data-fg-eh6d51="1.16:1.6728:/src/app/components/Hero.tsx:87:21:4063:270:e:path"></path></svg><span class="font-semibold" data-fg-eh6d52="1.16:1.6728:/src/app/components/Hero.tsx:93:19:4377:67:e:span:t">Compliant</span></div></div>
                        </motion.div>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="p-4 bg-bg-secondary rounded-xl border border-divider">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Public Remarks</span>
                          <span className="text-[10px] font-bold text-brand-blue px-2 py-0.5 bg-brand-blue/5 rounded">AI Optimized</span>
                        </div>
                        <p className="text-xs text-text-primary leading-relaxed min-h-[60px]">
                          {typingText}
                          <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="inline-block w-1 h-3 bg-brand-blue ml-0.5"
                          />
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* <div className="p-4 bg-bg-accent/50 rounded-xl border border-divider">
                        <p className="text-[10px] font-bold text-text-muted uppercase mb-1">Compliance Checks</p>
                        <p className="text-lg font-bold text-text-primary">
                          <svg class="size-5 text-green-700" fill="currentColor" viewBox="0 0 20 20" data-fg-eh6d50="1.16:1.6728:/src/app/components/Hero.tsx:86:19:3978:380:e:svg:e"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" data-fg-eh6d51="1.16:1.6728:/src/app/components/Hero.tsx:87:21:4063:270:e:path"></path></svg>
                        </p>
                      </div>
                      <div className="p-4 bg-bg-accent/50 rounded-xl border border-divider">
                        <p className="text-[10px] font-bold text-text-muted uppercase mb-1">Field Accuracy</p>
                        <p className="text-lg font-bold text-text-primary">
                          <svg class="size-5 text-green-700" fill="currentColor" viewBox="0 0 20 20" data-fg-eh6d50="1.16:1.6728:/src/app/components/Hero.tsx:86:19:3978:380:e:svg:e"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" data-fg-eh6d51="1.16:1.6728:/src/app/components/Hero.tsx:87:21:4063:270:e:path"></path></svg>
                        </p>
                      </div> */}
                      <div className="col-span-2">
                        <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2">
                          Photos (12 uploaded)
                        </div>

                        <div className="grid grid-cols-3 gap-3 w-full">

                          <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-sm">
                            <img src="/images/os-staged.jpg" alt="Virtually Staged" loading="lazy" width={400} height={300} className="w-full h-full object-cover border border-border-subtle rounded-lg" referrerPolicy="no-referrer" />

                            <div className="absolute top-2 right-2 bg-status-success text-white p-1 rounded-full shadow-sm flex items-center justify-center">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                              </svg>
                            </div>

                            <div className="absolute bottom-2 left-2 text-[8px] font-bold uppercase tracking-widest text-brand-blue bg-bg-secondary/95 backdrop-blur-sm px-2 py-1 rounded shadow-sm border border-brand-blue/10">
                              Virtually Staged
                            </div>
                          </div>

                          <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-sm">
                            <img src="/images/os-enhanced-new.jpg" alt="AI Enhanced" loading="lazy" width={400} height={300} className="w-full h-full object-cover border border-border-subtle rounded-lg" referrerPolicy="no-referrer" />

                            <div className="absolute top-2 right-2 bg-status-success text-white p-1 rounded-full shadow-sm flex items-center justify-center">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                              </svg>
                            </div>

                            <div className="absolute bottom-2 left-2 text-[8px] font-bold uppercase tracking-widest text-brand-blue bg-bg-secondary/95 backdrop-blur-sm px-2 py-1 rounded shadow-sm border border-brand-blue/10">
                              AI Enhanced
                            </div>
                          </div>

                          <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-sm">
                            <img src="/images/os-dusk-new.jpg" alt="Day to Dusk" loading="lazy" width={400} height={300} className="w-full h-full object-cover border border-border-subtle rounded-lg" referrerPolicy="no-referrer" />

                            <div className="absolute top-2 right-2 bg-status-success text-white p-1 rounded-full shadow-sm flex items-center justify-center">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                              </svg>
                            </div>

                            <div className="absolute bottom-2 left-2 text-[8px] font-bold uppercase tracking-widest text-brand-blue bg-bg-secondary/95 backdrop-blur-sm px-2 py-1 rounded shadow-sm border border-brand-blue/10">
                              Day to Dusk
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-cyan/5 rounded-full blur-3xl -z-10" />
            </FadeIn>
          </div>
        </div>
      </RevealSection>


      {/* Problem Reframe */}
      <>
        <div className="max-w-7xl mx-auto px-6 hidden">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeIn>
              <h2 className="text-4xl font-bold tracking-tight mb-4">Listings aren’t data entry. They’re revenue.</h2>
              <p className="text-text-secondary max-w-2xl mx-auto">Ria isn't a shortcut for one step. It's the platform where your entire listing lifecycle lives—from preparation to publication to close.</p>
            </FadeIn>
          </div>

          <StaggerContainer
            className="grid md:grid-cols-2 gap-8"
          >
            {[
              { title: "Fast", desc: "Ready to Publish in 10 min", icon: Zap },
              { title: "Zero compliance surprises", desc: "Every listing scored and checked before it touches MLS. Fair housing, required fields, missing addenda.", icon: ShieldCheck },
            ].map((benefit, i) => (
              <StaggerItem key={i}>
                <div className="glass-card p-8 hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-12 h-12 bg-bg-accent rounded-xl flex items-center justify-center mb-6">
                    <benefit.icon className="text-brand-blue w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </>

      <ThreePillarsSection />

      <WatchRiaThinkSection isDemoPage={false} />

      <RiaStudio />

      <IntelligenceLayersSection />

      <LiveListingAuditSection />

      <SellerCollaborationSection />


      {/* Final CTA */}
      <RevealSection className="py-32 bg-bg-secondary border-t border-divider">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-4xl font-bold tracking-tight mb-6">Launch a winning listing in minutes.</h2>
            <p className="text-xl text-text-secondary mb-10">Complete. Compliant. Optimized. MLS draft saved.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Magnetic strength={0.2}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary flex items-center justify-center gap-2"
                >
                  Draft a Listing <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Magnetic>
            </div>
          </FadeIn>
        </div>
      </RevealSection>

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
    <>
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 hidden">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/5 border border-brand-blue/10 text-brand-blue text-[10px] font-bold uppercase tracking-widest mb-4"
          >
            <Activity className="w-3 h-3" />
            Intelligence Layers
          </motion.div>
          <h2 className="text-4xl font-bold tracking-tight mb-4">Listing Readiness Score</h2>
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
            className="relative z-20 w-32 h-32 bg-bg-secondary rounded-full shadow-2xl border border-divider flex items-center justify-center"
            animate={{
              boxShadow: hoveredModule !== null || activeIndex !== null ? "0 0 40px rgba(59,91,255,0.2)" : "0 0 20px rgba(0,0,0,0.05)",
              scale: hoveredModule !== null ? 1.05 : 1
            }}
          >
            <div className="w-24 h-24 bg-brand-blue rounded-full flex items-center justify-center relative overflow-hidden">
              <Sparkles className="text-white w-10 h-10 relative z-10" />
              <motion.div
                className="absolute inset-0 bg-bg-secondary/20"
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
    </>
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
    "top-[5%] left-[5%]",
    "top-[5%] right-[5%]",
    "bottom-[5%] left-[5%]",
    "bottom-[5%] right-[5%]"
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
        className="bg-bg-secondary rounded-[18px] border border-divider shadow-sm p-6"
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
        <div className="flex-1 h-12 bg-bg-secondary rounded border border-divider p-2">
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
        <div className="w-16 h-12 bg-bg-secondary rounded border border-divider flex flex-col items-center justify-center">
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
      <div className="p-2 bg-bg-secondary rounded border border-divider min-h-[60px]">
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
      <div className="relative aspect-video bg-bg-secondary rounded border border-divider overflow-hidden">
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
                className="absolute bottom-2 right-2 px-2 py-1 bg-bg-secondary/90 text-emerald-500 text-[8px] font-bold rounded border border-emerald-500/20 shadow-lg"
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
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [completedFixes, setCompletedFixes] = useState<number[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [activeField, setActiveField] = useState<string | null>(null);

  const categories = [
    {
      id: "Completeness",
      score: 96,
      confidence: 98
    },
    {
      id: "Compliance",
      score: 89,
      confidence: 94
    },
    {
      id: "Marketability",
      score: 92,
      confidence: 88
    }
  ];

  const auditSteps = [
    "Initializing neural audit engine...",
    "Syncing with regional MLS data nodes...",
    "Verifying tax records for 4821 Oakmont...",
    "HEURISTIC: Checking property subtype...",
    "COMPLIANCE: Scanning public remarks...",
    "MATCH: Found potential Fair Housing trigger...",
    "AUDIT: Cross-referencing HOA disclosures...",
    "VALUATION: Analyzing marketability score..."
  ];

  useEffect(() => {
    if (hasAnimated && logs.length === 0) {
      auditSteps.forEach((step, i) => {
        setTimeout(() => {
          setLogs(prev => [...prev, step].slice(-5));
          if (step.includes("remarks")) setActiveField("remarks");
          if (step.includes("tax")) setActiveField("address");
          if (step.includes("HOA")) setActiveField("hoa");
        }, i * 1200);
      });
    }
  }, [hasAnimated]);

  const toggleFix = (id: number) => {
    setIsCalibrating(true);
    setTimeout(() => {
      setIsCalibrating(false);
      if (id === 1) setActiveField(null); // Clear remark warning
    }, 1200);

    if (completedFixes.includes(id)) {
      setCompletedFixes(completedFixes.filter(i => i !== id));
    } else {
      setCompletedFixes([...completedFixes, id]);
    }
  };

  const targetScore = 94 + (completedFixes.length * 2);

  useEffect(() => {
    if (hasAnimated && !isCalibrating) {
      setScore(targetScore);
    }
  }, [targetScore, hasAnimated, isCalibrating]);

  const fixes = [
    { id: 0, text: "Upload Lead-Based Paint Disclosure", priority: "High" },
    { id: 1, text: "Revise 'walking distance' in remarks", priority: "High" },
    { id: 2, text: "Add missing Virtual Tour URL", priority: "Medium" }
  ];

  return (
    <section className="py-32 bg-bg-primary text-text-primary overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[140px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[140px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-[10px] font-bold uppercase tracking-widest mb-6 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              Machine Intelligence Audit
            </div>
            <h2 className="text-5xl font-bold tracking-tight mb-6 text-text-primary">Every Listing Gets a Quality Score</h2>
            <p className="text-text-secondary max-w-2xl mx-auto text-lg leading-relaxed">
              Ria audits 200+ regional data points to ensure your listing is accurate, compliant, and optimized for peak market exposure.
            </p>
          </FadeIn>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          {/* Left: Ria's Live Console */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="flex-1 bg-bg-secondary border border-border-subtle rounded-[32px] p-6 relative overflow-hidden flex flex-col min-h-[440px] shadow-[0_20px_40px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-2 mb-6 border-b border-divider pb-4">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                </div>
                <span className="text-[10px] font-mono text-text-secondary uppercase tracking-widest ml-3 font-semibold">Ria_Audit_System</span>
              </div>

              <div className="space-y-4 font-mono text-[11px] flex-1">
                <AnimatePresence initial={false}>
                  {logs.map((log, i) => (
                    <motion.div
                      key={log + i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex gap-3 text-text-secondary"
                    >
                      <span className="text-brand-blue font-bold shrink-0">[{new Date().toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' })}]</span>
                      <span className={log.includes("MATCH") || log.includes("COMPLIANCE") ? "text-amber-600 font-semibold" : ""}>
                        {log}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="mt-4 pt-4 border-t border-divider">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-brand-blue"
                  />
                  <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest mt-0.5">Stream Processing active...</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center: The Neural Dial */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center py-10">
            <motion.div
              className="relative w-72 h-72"
              onViewportEnter={() => setHasAnimated(true)}
              viewport={{ once: true }}
            >
              {/* Spinning Scanners */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-20px] border border-dashed border-brand-blue/15 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-40px] border border-dashed border-border-subtle rounded-full"
              />

              <svg className="w-full h-full transform -rotate-90 relative z-10 filter drop-shadow-[0_10px_20px_rgba(59,130,246,0.1)]">
                <circle cx="144" cy="144" r="130" stroke="#F1F4F9" strokeWidth="14" fill="#FFFFFF" />
                <motion.circle
                  cx="144" cy="144" r="130"
                  stroke="currentColor" strokeWidth="14" fill="transparent"
                  strokeDasharray={816.8}
                  initial={{ strokeDashoffset: 816.8 }}
                  animate={{ strokeDashoffset: 816.8 * (1 - score / 100) }}
                  transition={{ duration: isCalibrating ? 0.4 : 1.5, ease: "circOut" }}
                  strokeLinecap="round"
                  className={`${isCalibrating ? 'text-amber-500' : 'text-brand-blue'}`}
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                <motion.span
                  key={score}
                  initial={{ scale: 0.9, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-8xl font-black text-text-primary tracking-tighter"
                >
                  {score}
                </motion.span>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">Quality Index</span>
              </div>
            </motion.div>

            <div className="mt-12 w-full max-w-[280px]">
              <div className="flex flex-col gap-3">
                {categories.map((cat, i) => (
                  <div
                    key={cat.id}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${activeCategory === i
                      ? 'bg-bg-secondary border-brand-blue/30 text-brand-blue shadow-[0_10px_30px_rgba(0,0,0,0.04)] ring-1 ring-brand-blue/5'
                      : 'bg-bg-secondary/50 border-border-subtle text-text-secondary'
                      }`}
                  >
                    <span className="text-[11px] font-bold uppercase tracking-wider">{cat.id}</span>
                    <span className={`text-sm font-black ${activeCategory === i ? 'text-brand-blue' : 'text-slate-400'}`}>{cat.score}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: AI Vision Preview */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex-1 bg-bg-secondary border border-border-subtle rounded-[40px] p-8 relative overflow-hidden flex flex-col shadow-[0_20px_80px_rgba(0,0,0,0.03)]">
              {/* Scanner Line Overlay */}
              <motion.div
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-24 bg-gradient-to-b from-transparent via-brand-blue/[0.03] to-transparent z-20 pointer-events-none"
              />

              <div className="relative z-10 flex-1">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#F1F4F9] flex items-center justify-center">
                      <Layout className="w-6 h-6 text-brand-blue" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-text-primary">Listing Canvas</h3>
                      <p className="text-[10px] uppercase text-text-secondary font-black tracking-widest">4821 Oakmont Dr, Charlotte</p>
                    </div>
                  </div>
                  <div className="px-3 py-1.5 bg-brand-blue/10 text-brand-blue rounded-full text-[10px] font-bold border border-brand-blue/20">
                    DRAFT_STAGING
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Field: Address */}
                  <div className={`p-5 rounded-2xl border transition-all duration-500 ${activeField === 'address' ? 'bg-brand-blue/5 border-brand-blue/30 ring-1 ring-brand-blue/5' : 'bg-[#FAFBFC] border-divider'}`}>
                    <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-2 block">Public Property Source</label>
                    <p className="text-sm font-semibold text-text-primary">1234 Ont, Chtte, NC 2345</p>
                    <div className="mt-3 flex items-center gap-2">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${activeField === 'address' ? 'text-brand-blue' : 'text-slate-300'}`} />
                      <span className="text-[9px] font-bold text-slate-400">Verified against 4 public record sources</span>
                    </div>
                  </div>

                  {/* Field: Remarks */}
                  <div className={`p-5 rounded-2xl border transition-all duration-500 ${activeField === 'remarks' ? 'bg-amber-50 border-amber-200 ring-1 ring-amber-100' : 'bg-[#FAFBFC] border-divider'}`}>
                    <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-2 block">AI Compliance Check</label>
                    <p className="text-xs text-text-secondary leading-relaxed italic pr-4">
                      "Stunning 4-bed home with <span className={completedFixes.includes(1) ? "text-emerald-600 font-bold bg-emerald-50 px-1 rounded" : "bg-amber-200 text-amber-800 px-1 rounded"}>{completedFixes.includes(1) ? "close proximity to" : "walking distance to"}</span> Freedom Park. Brand new chef's kitchen..."
                    </p>
                  </div>

                  {/* Field: HOA Disclosures */}
                  <div className={`p-5 rounded-2xl border transition-all duration-500 ${activeField === 'hoa' ? 'bg-brand-blue/5 border-brand-blue/30' : 'bg-[#FAFBFC] border-divider'}`}>
                    <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-2 block">Ownership & Encumbrances</label>
                    <div className="flex gap-4">
                      <div className="flex-1 bg-bg-secondary border border-divider rounded-xl p-3 text-[10px] text-text-secondary font-bold shadow-sm">HOA: $450/m</div>
                      <div className="flex-1 bg-bg-secondary border border-divider rounded-xl p-3 text-[10px] text-brand-blue font-bold shadow-sm">Status: Verified</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-divider flex items-center justify-between">
                <div className="flex items-center gap-3 text-text-secondary">
                  <Activity className="w-4 h-4 text-brand-blue" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Confidence: {categories[activeCategory].confidence}%</span>
                </div>
                <div className="flex gap-3 text-[#E1E6ED]">
                  <FileText className="w-4 h-4" />
                  <Search className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Panel */}
        <div className="mt-24 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <div className="inline-block px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-black tracking-widest mb-4 border border-amber-100">
              URGENT ACTIONS
            </div>
            <h3 className="text-3xl font-bold mb-8 text-text-primary tracking-tight">Audit Checklist</h3>
            <div className="space-y-4">
              {fixes.map((fix) => (
                <motion.div
                  key={fix.id}
                  onClick={() => toggleFix(fix.id)}
                  whileHover={{ x: 6, backgroundColor: "rgba(59, 130, 246, 0.02)" }}
                  className={`p-5 rounded-[20px] border flex items-center gap-4 cursor-pointer transition-all duration-300 ${completedFixes.includes(fix.id)
                    ? 'bg-emerald-50/50 border-emerald-100 opacity-60'
                    : 'bg-bg-secondary border-border-subtle shadow-sm hover:border-brand-blue/30 hover:shadow-md'
                    }`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${completedFixes.includes(fix.id) ? 'bg-emerald-500 border-emerald-500' : 'border-border-subtle'}`}>
                    {completedFixes.includes(fix.id) && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <span className={`text-[13px] font-bold tracking-tight ${completedFixes.includes(fix.id) ? 'line-through text-slate-400' : 'text-text-primary'}`}>
                    {fix.text}
                  </span>
                  {!completedFixes.includes(fix.id) && (
                    <div className="ml-auto w-8 h-8 rounded-full bg-[#F1F4F9] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-4 h-4 text-brand-blue" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="p-10 rounded-[40px] bg-bg-secondary border border-border-subtle shadow-[0_40px_100px_rgba(0,0,0,0.04)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-blue/[0.02] rounded-full blur-[60px] -mr-24 -mt-24" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center mb-8">
                <Zap className="w-6 h-6 text-brand-blue" />
              </div>
              <p className="text-text-primary text-lg leading-relaxed mb-8">
                Your listing data has been verified against <span className="text-brand-blue font-black underline decoration-2 decoration-brand-blue/20 underline-offset-4">150+ regional sources</span>. Accuracy is currently at <span className="text-brand-blue font-black">94%</span>—putting this listing in the top 5% for completeness in your market.
              </p>
              <button className="w-full py-5 bg-brand-blue text-white rounded-2xl font-bold hover:bg-brand-blue-dark hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl shadow-brand-blue/20">
                Proceed to Final Draft <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ThreePillarsSection = () => {
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      title: "Listing Agent",
      tagline: "LIVE",
      desc: "Ria acts as your second brain for every listing. It extracts data, audits compliance, and builds your MLS draft automatically.",
      features: [
        "150+ MLS fields extracted from documents",
        "Fair Housing & compliance AI audit",
        "Missing disclosure & addenda detection",
        "Real-time listing readiness scoring",
        "Automated public record cross-referencing"
      ],
      cta: "Automate your listing assembly",
      color: "blue",
      preview: {
        title: "MLS Draft: 4821 Oakmont",
        progress: 92,
        items: [
          { label: "Tax record sync", status: "Completed", color: "emerald" },
          { label: "Public record verify", status: "Completed", color: "emerald" },
          { label: "Fair Housing audit", status: "Passed", color: "emerald" },
          { label: "Lead paint disclosure", status: "Required", color: "amber" }
        ]
      }
    },
    {
      title: "Virtual Staging & Media",
      tagline: "LIVE",
      desc: "Turn raw property photos into stunning, market-ready assets. professional edits and virtual staging delivered in 24 hours.",
      features: [
        "AI-powered virtual staging",
        "Professional photo enhancement",
        "Day-to-dusk lighting conversion",
        "Object & clutter removal (AI-Eraser)",
        "Brand-matched marketing collateral"
      ],
      cta: "Enhance your listing visuals",
      color: "indigo",
      preview: {
        title: "Media Assets: 4821 Oakmont",
        progress: 65,
        items: [
          { label: "Exterior enhancement", status: "Completed", color: "emerald" },
          { label: "Kitchen staging", status: "Processing", color: "blue" },
          { label: "Living room staging", status: "Reviewing", color: "amber" },
          { label: "Item removal", status: "Completed", color: "emerald" }
        ]
      }
    },
    {
      title: "Seller Collaboration",
      tagline: "LIVE",
      desc: "Keep your sellers in the loop without the endless texts and emails. They see progress, upload docs, and approve drafts — all in one portal.",
      features: [
        "Shared dashboard — track prep in real time",
        "Draft approval — review before submission",
        "Document upload — sellers add docs directly",
        "AI follow-ups — auto-ask for missing info",
        "Prep checklist — visual readiness tracker"
      ],
      cta: "Show your sellers a better experience",
      color: "teal",
      preview: {
        title: "Your Listing Prep",
        progress: 78,
        items: [
          { label: "Disclosure form", status: "Completed", color: "emerald" },
          { label: "Photos uploaded", status: "18 of 24", color: "amber" },
          { label: "Draft approval", status: "Awaiting review", color: "blue" },
          { label: "HOA docs", status: "Not started", color: "slate" }
        ]
      }
    },
    {
      title: "Listing Intelligence",
      tagline: "LIVE",
      desc: "Every listing gets a data-driven quality score. Ria audits 200+ data points for accuracy, compliance, and marketability before you hit publish.",
      features: [
        "150+ regional data point cross-reference",
        "Fair Housing & compliance AI guardrails",
        "Automatic tax & historical record sync",
        "Listing readiness scoring (0-100)",
        "Missing field & discrepancy detection"
      ],
      cta: "Audit your listing quality",
      color: "amber",
      preview: {
        title: "Audit Score: 4821 Oakmont",
        progress: 94,
        items: [
          { label: "MLS Field Accuracy", status: "98%", color: "emerald" },
          { label: "Compliance Risk", status: "Low", color: "emerald" },
          { label: "Marketability Score", status: "92%", color: "blue" },
          { label: "Fair Housing", status: "Verified", color: "emerald" }
        ]
      }
    }
  ];

  const currentPillar = pillars[activePillar];

  return (
    <section className="py-24 bg-bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/5 border border-brand-blue/10 text-brand-blue text-[10px] font-bold uppercase tracking-widest mb-4"
          >
            <Zap className="w-3 h-3" />
            The Ria Platform
          </motion.div>
          <h2 className="text-4xl font-bold tracking-tight mb-4">Four pillars. One operating system.</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Every module is designed to work together—and eliminate the chaos of managing listings across disconnected tools.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {pillars.map((pillar, i) => (
            <button
              key={pillar.title}
              onClick={() => setActivePillar(i)}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 border
                ${activePillar === i
                  ? pillar.color === 'teal'
                    ? "bg-teal-50 border-teal-600 text-teal-600 border-2"
                    : pillar.color === 'blue'
                      ? "bg-blue-50 border-blue-600 text-blue-600 border-2"
                      : pillar.color === 'amber'
                        ? "bg-amber-50 border-amber-600 text-amber-600 border-2"
                        : "bg-indigo-50 border-indigo-600 text-indigo-600 border-2"
                  : "bg-bg-secondary border-divider text-text-muted hover:border-slate-300"
                }
              `}
            >
              {pillar.title}
            </button>
          ))}
        </div>

        {/* Pillar Content Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePillar}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-bg-secondary rounded-[48px] border border-divider shadow-xl shadow-black/[0.02] overflow-hidden"
          >
            <div className="grid lg:grid-cols-2 gap-12 p-8 md:p-16">
              <div className="flex flex-col justify-center">
                <div className={`w-[70px] justify-center inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 
                  ${currentPillar.color === 'teal' ? 'bg-emerald-500/10 text-emerald-600' :
                    currentPillar.color === 'blue' ? 'bg-blue-500/10 text-blue-600' :
                      currentPillar.color === 'amber' ? 'bg-amber-500/10 text-amber-600' : 'bg-indigo-500/10 text-indigo-600'}`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${currentPillar.color === 'teal' ? 'bg-emerald-500' : currentPillar.color === 'blue' ? 'bg-blue-500' : currentPillar.color === 'amber' ? 'bg-amber-500' : 'bg-indigo-500'}`} />
                  {currentPillar.tagline}
                </div>

                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-text-primary">{currentPillar.title}</h3>
                <p className="text-lg text-text-muted leading-relaxed mb-8 ">
                  {currentPillar.desc}
                </p>

                <div className="space-y-4 mb-10">
                  {currentPillar.features.map((feature) => (
                    <div key={feature} className="flex gap-3 items-start">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5
                        ${currentPillar.color === 'teal' ? 'bg-emerald-50 text-emerald-600' :
                          currentPillar.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                            currentPillar.color === 'amber' ? 'bg-amber-50 text-amber-600' : 'bg-indigo-50 text-indigo-600'}`}
                      >
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="text-text-secondary font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`btn-primary self-start font-bold py-4 px-8 flex items-center gap-2
                    ${currentPillar.color === 'teal' ? 'bg-teal-600 hover:bg-teal-700' :
                      currentPillar.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                        currentPillar.color === 'amber' ? 'bg-amber-600 hover:bg-amber-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                  {currentPillar.cta} <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Desktop Desktop Preview */}
              <div className="flex items-center justify-center relative w-full lg:mt-0">
                {/* Decorative glows */}
                <div className={`absolute w-[120%] h-[120%] rounded-full blur-[120px] opacity-10 -z-10
                  ${currentPillar.color === 'teal' ? 'bg-emerald-500' :
                    currentPillar.color === 'blue' ? 'bg-blue-500' :
                      currentPillar.color === 'amber' ? 'bg-amber-500' : 'bg-indigo-500'}`}
                />

                <div className="w-full max-w-[500px] h-[500px] lg:max-w-none bg-bg-secondary border border-divider/60 rounded-2xl shadow-2xl relative overflow-hidden flex flex-col">
                  {/* Browser/Desktop Top Bar */}
                  <div className="bg-bg-accent border-b border-divider/60 px-4 py-3 flex items-center gap-4">
                    <div className="flex gap-1.5 opacity-80">
                      <div className="w-3 h-3 rounded-full bg-slate-300" />
                      <div className="w-3 h-3 rounded-full bg-slate-300" />
                      <div className="w-3 h-3 rounded-full bg-slate-300" />
                    </div>
                    <div className="flex-1 bg-bg-secondary rounded-md border border-divider/60 text-[10px] text-slate-400 font-mono px-3 py-1.5 flex items-center justify-center shadow-sm">
                      ria.app/{currentPillar.title.toLowerCase().replace(/ /g, '-')}
                    </div>
                  </div>

                  {/* Desktop Content Area */}
                  <div className="bg-bg-secondary p-6 md:p-8 flex-1 flex flex-col text-text-primary overflow-hidden">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-border-subtle pb-6 shrink-0">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                          {currentPillar.preview.title}
                        </p>
                        <h4 className="text-2xl font-bold text-text-primary">4221 Oot Dr</h4>
                      </div>

                      {/* Overall Progress */}
                      <div className="bg-bg-accent rounded-xl p-4 border border-border-subtle min-w-[180px]">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] uppercase tracking-wider text-text-muted font-bold">Progress</span>
                          <span className={`text-sm font-black ${currentPillar.color === 'teal' ? 'text-emerald-600' :
                            currentPillar.color === 'amber' ? 'text-amber-600' : 'text-blue-600'}`}>
                            {currentPillar.preview.progress}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${currentPillar.preview.progress}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className={`h-full rounded-full ${currentPillar.color === 'teal' ? 'bg-gradient-to-r from-emerald-400 to-teal-500' :
                              currentPillar.color === 'amber' ? 'bg-gradient-to-r from-amber-400 to-orange-500' : 'bg-gradient-to-r from-blue-400 to-indigo-500'}`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Preview Items - List Layout */}
                    <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-2 pb-4">
                      {currentPillar.preview.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 sm:px-4 sm:py-3 border border-border-subtle rounded-lg hover:border-divider transition-colors bg-bg-secondary hover:bg-bg-accent">
                          <span className="text-sm font-medium text-text-secondary">{item.label}</span>
                          <span className={`text-[10px] font-bold uppercase py-1 px-2.5 rounded-md
                            ${item.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                              item.color === 'blue' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                item.color === 'amber' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-bg-accent text-text-muted border border-divider'}`}
                          >
                            {item.status}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="flex justify-end pt-4 mt-auto border-t border-border-subtle bg-bg-secondary z-10 shrink-0">
                      <button className={`px-5 py-2 rounded-lg text-sm font-bold shadow-sm transition-transform hover:-translate-y-0.5
                        ${currentPillar.color === 'teal' ? 'bg-emerald-600 text-white hover:bg-emerald-700' :
                          currentPillar.color === 'blue' ? 'bg-blue-600 text-white hover:bg-blue-700' :
                            currentPillar.color === 'amber' ? 'bg-amber-600 text-white hover:bg-amber-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                      >
                        {currentPillar.color === 'teal' ? 'Upload Documents →' :
                          currentPillar.color === 'blue' ? 'Finalize MLS Draft →' :
                            currentPillar.color === 'amber' ? 'View Audit Report →' : 'Manage Media Lab →'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export const VisualIntelligenceStudio = () => {
  const [activeTool, setActiveTool] = useState(0);
  const [showAfter, setShowAfter] = useState(true);

  const tools = [
    {
      id: "Virtual Staging",
      icon: Layers,
      desc: "Transform empty spaces into inviting homes.",
      features: ["AI-powered furniture placement", "Style-matched decor", "Realistic lighting & shadows"],
      bestFor: "Vacant properties and new constructions.",
      turnaround: "Delivered within 24 hours",
      price: "$29",
      priceUnit: "per image",
      beforeImg: "https://picsum.photos/seed/empty-room/800/600",
      afterImg: "https://picsum.photos/seed/staged-room/800/600",
    },
    {
      id: "Image Enhancement",
      icon: Maximize2,
      desc: "Professional-grade clarity for every shot.",
      features: ["Color correction & balancing", "Vertical alignment", "Sky replacement"],
      bestFor: "Standard listing photos needing a professional touch.",
      turnaround: "Delivered within 12 hours",
      price: "$1.50",
      priceUnit: "per image",
      beforeImg: "https://picsum.photos/seed/dull-house/800/600",
      afterImg: "https://picsum.photos/seed/bright-house/800/600",
    },
    {
      id: "Day to Dusk",
      icon: Moon,
      desc: "Capture the magic of twilight, anytime.",
      features: ["Atmospheric sky transition", "Window light activation", "Exterior glow enhancement"],
      bestFor: "High-end luxury listings and curb appeal.",
      turnaround: "Delivered within 24 hours",
      price: "$15",
      priceUnit: "per image",
      beforeImg: "https://picsum.photos/seed/day-house/800/600",
      afterImg: "https://picsum.photos/seed/dusk-house/800/600",
    },
    {
      id: "Virtual Item Removal",
      icon: Eraser,
      desc: "Declutter spaces for a cleaner presentation.",
      features: ["Seamless object removal", "Background reconstruction", "Texture matching"],
      bestFor: "Removing personal items or unsightly clutter.",
      turnaround: "Delivered within 24 hours",
      price: "$10",
      priceUnit: "per image",
      beforeImg: "https://picsum.photos/seed/cluttered-room/800/600",
      afterImg: "https://picsum.photos/seed/clean-room/800/600",
    }
  ];

  const currentTool = tools[activeTool];

  return (
    <section id="virtual-staging" className="py-24 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Transform Every Listing Photo Into a Market-Ready Asset</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Ria automatically edits and stages your raw photos for maximum market appeal.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left: Tool Selector */}
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
            className="lg:col-span-4 space-y-3"
          >
            {tools.map((tool, i) => (
              <motion.button
                key={tool.id}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  show: { opacity: 1, x: 0 }
                }}
                whileHover={{ x: 8 }}
                onClick={() => {
                  setActiveTool(i);
                  setShowAfter(true);
                }}
                className={`w-full text-left p-5 rounded-xl transition-all duration-300 border flex items-center gap-4 ${activeTool === i
                  ? "bg-bg-secondary border-brand-blue shadow-lg shadow-brand-blue/5 z-10"
                  : "bg-transparent border-transparent hover:bg-bg-secondary/50 hover:border-divider"
                  }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activeTool === i ? "bg-brand-blue text-white" : "bg-bg-secondary text-brand-blue border border-divider"
                  }`}>
                  <tool.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`font-bold text-sm ${activeTool === i ? "text-text-primary" : "text-text-muted"}`}>{tool.id}</h3>
                </div>
                {activeTool === i && (
                  <motion.div layoutId="activeArrow" className="ml-auto">
                    <ChevronRight className="w-4 h-4 text-brand-blue" />
                  </motion.div>
                )}
              </motion.button>
            ))}

            <div className="mt-8 p-6 bg-brand-blue/5 border border-brand-blue/10 rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-brand-blue" />
                <span className="text-xs font-bold uppercase text-brand-blue">Bundle & Save</span>
              </div>
              <h4 className="font-bold text-sm mb-1">Media Boost Package</h4>
              <p className="text-[10px] text-text-secondary mb-4">Includes Enhancement, Day to Dusk, and Virtual Staging.</p>
              <div className="flex items-end gap-1">
                <span className="text-xl font-bold">$199</span>
                <span className="text-[10px] text-text-muted mb-1">per listing</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Preview Panel */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTool}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="bg-bg-secondary rounded-2xl border border-divider shadow-xl shadow-black/5 overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Image Preview */}
                    <div className="flex-1 space-y-4">
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-bg-accent group">
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={showAfter ? "after" : "before"}
                            src={showAfter ? currentTool.afterImg : currentTool.beforeImg}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </AnimatePresence>

                        {/* Tool-specific overlays */}
                        {showAfter && activeTool === 0 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 pointer-events-none"
                          >
                            <div className="absolute inset-0 bg-brand-blue/5 border-2 border-brand-blue/20 m-4 rounded-lg border-dashed animate-pulse" />
                          </motion.div>
                        )}

                        {showAfter && activeTool === 1 && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/4 -skew-x-12 pointer-events-none"
                            animate={{ left: ["-100%", "200%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          />
                        )}

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex bg-bg-secondary/90 backdrop-blur p-1 rounded-full shadow-lg border border-divider z-20">
                          <button
                            onClick={() => setShowAfter(false)}
                            className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all ${!showAfter ? "bg-brand-blue text-white" : "text-text-muted hover:text-text-primary"}`}
                          >
                            BEFORE
                          </button>
                          <button
                            onClick={() => setShowAfter(true)}
                            className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all ${showAfter ? "bg-brand-blue text-white" : "text-text-muted hover:text-text-primary"}`}
                          >
                            AFTER
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="w-full md:w-72 flex flex-col">
                      <div className="flex-1">
                        <div className="inline-flex items-center gap-2 px-2 py-1 bg-brand-blue/10 text-brand-blue text-[10px] font-bold rounded mb-4">
                          AVAILABLE INSIDE RIA
                        </div>
                        <h3 className="text-xl font-bold mb-2">{currentTool.id}</h3>
                        <p className="text-xs text-text-secondary leading-relaxed mb-6">
                          {currentTool.desc}
                        </p>

                        <div className="space-y-4 mb-8">
                          <div>
                            <p className="text-[10px] font-bold text-text-muted uppercase mb-2">What Ria Does</p>
                            <ul className="space-y-2">
                              {currentTool.features.map(f => (
                                <li key={f} className="flex items-center gap-2 text-[11px] text-text-secondary">
                                  <CheckCircle2 className="w-3 h-3 text-status-success" /> {f}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-text-muted uppercase mb-1">Best For</p>
                            <p className="text-[11px] text-text-secondary">{currentTool.bestFor}</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-divider">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="text-[10px] font-bold text-text-muted uppercase">Starting at</p>
                            <div className="flex items-end gap-1">
                              <span className="text-2xl font-bold text-brand-blue">{currentTool.price}</span>
                              <span className="text-[10px] text-text-muted mb-1">{currentTool.priceUnit}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] font-bold text-text-muted uppercase">Turnaround</p>
                            <p className="text-[11px] font-bold text-text-primary">{currentTool.turnaround}</p>
                          </div>
                        </div>
                        <button className="w-full py-3 bg-brand-blue text-white rounded-xl text-xs font-bold hover:bg-brand-blue-dark transition-colors shadow-lg shadow-brand-blue/20">
                          Enhance My Listing
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold mb-4">Upgrade your listing presentation in minutes.</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="btn-primary self-start font-bold py-4 px-8 flex items-center gap-2
                    bg-blue-600 hover:bg-blue-700">
              Optimize Your First Listing
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const phases = [
  {
    id: "Step 1",
    title: "Pre-Listing",
    description: "Seller onboarding and automated data assembly.",
    status: "Live",
    icon: Users,
    details: {
      capabilities: ["Seller intake", "Document extraction", "Compliance check"],
      window: "Available Now",
      impact: "Listing ready in hours"
    }
  },
  {
    id: "Step 2",
    title: "MLS Draft",
    description: "High-precision field extraction and remarks.",
    status: "Live",
    icon: Zap,
    details: {
      capabilities: ["Field mapping", "Remarks generation", "Quality scoring"],
      window: "Available Now",
      impact: "Zero manual data entry"
    }
  },
  {
    id: "Step 3",
    title: "Visual Media",
    description: "Market-ready imagery and virtual enhancements.",
    status: "Live",
    icon: Camera,
    details: {
      capabilities: ["Virtual staging", "Photo enhancement", "Media ordering"],
      window: "Available Now",
      impact: "Maximum buyer engagement"
    }
  },
  {
    id: "Step 4",
    title: "Marketing",
    description: "Dynamic property websites and automated social assets.",
    status: "Coming Soon",
    icon: Megaphone,
    hasCTA: true,
    details: {
      capabilities: ["Property website", "Social content", "Email campaigns"],
      window: "Q4 2024",
      impact: "Omnichannel presence"
    }
  },
  {
    id: "Step 5",
    title: "Offers & Closing",
    description: "Seamless offer tracking and transaction coordination.",
    status: "Coming Soon",
    icon: Handshake,
    hasCTA: true,
    details: {
      capabilities: ["Offer comparison", "Transaction management", "Closing coordination"],
      window: "Q1 2025",
      impact: "Accelerated transaction speed"
    }
  }
];

export const RoadmapSection = () => {


  return (
    <>
      <div className="max-w-7xl mx-auto px-6 relative z-10 hidden">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/5 border border-brand-blue/10 text-brand-blue text-[10px] font-bold uppercase tracking-widest mb-4"
          >
            <Zap className="w-3 h-3" />
            System Evolution
          </motion.div>
          <h2 className="text-4xl font-bold tracking-tight mb-4">The Roadmap to Listing Mastery</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Ria is not a static tool. It is an evolving operating system for modern real estate.
          </p>
        </div>

        {/* Horizontal Progress Spine */}
        <div className="relative mb-24 px-12">
          <div className="absolute top-1/2 left-0 w-full h-px bg-divider -translate-y-1/2" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute top-1/2 left-0 w-full h-px bg-brand-blue -translate-y-1/2 origin-left"
          />
          <div className="relative flex justify-between items-center">
            {phases.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 + 0.5 }}
                className="relative z-10 flex flex-col items-center"
              >
                <div className={`w-3 h-3 rounded-full border-2 relative ${phase.status === 'Live' ? 'bg-brand-blue border-brand-blue' : 'bg-bg-secondary border-divider'}`}>
                  {phase.status === 'Live' && (
                    <motion.div
                      animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -inset-1 bg-brand-blue rounded-full"
                    />
                  )}
                </div>
                <span className={`absolute top-6 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap ${phase.status === 'Live' ? 'text-brand-blue' : 'text-text-muted'}`}>
                  {phase.id}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Roadmap Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-start">
          {phases.map((phase, i) => {
            const isLive = phase.status === "Live";
            const isExpanded = true;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                // No click handler needed as all cards are expanded
                className={`overflow-hidden relative p-4 rounded-2xl border transition-all cursor-pointer group
                  ${isLive
                    ? "bg-bg-secondary border-brand-blue/20 shadow-sm"
                    : "bg-bg-primary border-divider border-dashed hover:border-solid hover:-translate-y-1"
                  }
                `}
              >
                {/* Current Phase Highlight Bar */}
                {isLive && (
                  <div className="absolute left-0 top-0 h-full w-1 bg-brand-blue rounded-l-2xl" />
                )}

                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    animate={isLive ? {
                      backgroundColor: ["rgba(59, 130, 246, 0.05)", "rgba(59, 130, 246, 0.1)", "rgba(59, 130, 246, 0.05)"]
                    } : {}}
                    transition={{ duration: 4, repeat: Infinity }}
                    className={`p-2 rounded-lg ${isLive ? 'bg-brand-blue/5' : 'bg-divider/50'}`}
                  >
                    <phase.icon className={`w-5 h-5 ${isLive ? 'text-brand-blue' : 'text-text-muted'}`} />
                  </motion.div>
                  {isLive && (
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 text-[9px] font-bold uppercase tracking-wider">
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                      />
                      Live
                    </div>
                  )}
                </div>

                <h3 className={`text-lg font-bold mb-2 ${isLive ? 'text-text-primary' : 'text-text-muted'}`}>{phase.title}</h3>
                <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                  {phase.description}
                </p>

                {/* Expandable Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-divider space-y-4">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2">Key Capabilities</p>
                          <ul className="space-y-1.5">
                            {phase.details.capabilities.map((cap, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-xs text-text-secondary">
                                <CheckCircle2 className="w-3 h-3 text-brand-blue" />
                                {cap}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-text-muted">Target Window</p>
                            <p className="text-xs font-medium text-text-primary">{phase.details.window}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[9px] font-bold uppercase tracking-widest text-text-muted">Impact</p>
                            <p className="text-xs font-medium text-brand-blue">{phase.details.impact}</p>
                          </div>
                        </div>

                        {phase.hasCTA && (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-2.5 bg-brand-blue text-white rounded-lg text-xs font-bold shadow-lg shadow-brand-blue/20 mt-2"
                          >
                            Request Early Access
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!isExpanded && (
                  <div className="mt-4 flex items-center gap-1 text-[10px] font-bold text-brand-blue uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to expand <ChevronRight className="w-3 h-3" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export const DemoPage = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Simple Nav */}
      <MainNavigation showBanner={showBanner} onDismissBanner={() => setShowBanner(false)} isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />

      <main className="relative">
        <h1 className="sr-only">Ria Interactive Demo</h1>
        <WatchRiaThinkSection isDemoPage={true} />

        <VisualIntelligenceStudio />

        <RoadmapSection />

        {/* Final CTA on Demo Page */}
        <section className="py-24 bg-bg-secondary border-t border-divider">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold tracking-tight mb-6">Launch a winning listing in under 5 minutes.</h2>
            <p className="text-lg text-text-secondary mb-10">Complete. Compliant. Optimized. MLS draft saved.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Draft a Listing
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/" className="btn-secondary flex items-center justify-center gap-2">
                  Back to Home
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 bg-bg-primary border-t border-divider">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand-blue rounded flex items-center justify-center">
              <Sparkles className="text-white w-4 h-4" />
            </div>
            <span className="font-bold text-lg tracking-tight">Ria</span>
          </div>
          <div className="text-xs text-text-muted">
            © 2026 Ria. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
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
