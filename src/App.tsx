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
          <span><strong>New:</strong> Virtual staging now available starting at $29/image — 24-hour turnaround <a href="#virtual-staging" className="underline hover:no-underline">Learn more →</a></span>
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
    <section className="py-24 bg-[#F7F9FC] border-y border-[#E6EAF0]">
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
    </section>
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
    <RevealSection className="py-24 bg-white">
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
const RiaEngine = () => {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      id: "Assemble",
      icon: Upload,
      title: "Assemble",
      status: "Extracting structured data...",
      benefit: "200+ Fields Structured",
      description: "Processing tax records, deeds, and previous MLS history...",
      fields: [
        { label: "Bedrooms", value: "4", source: "County Tax Record" },
        { label: "Bathrooms", value: "3.5", source: "Appraisal PDF" },
        { label: "Square Feet", value: "2,840", source: "Floor Plan" },
        { label: "Year Built", value: "1974", source: "Public Record" }
      ]
    },
    {
      id: "Validate",
      icon: ShieldCheck,
      title: "Validate",
      status: "Auditing compliance...",
      benefit: "Zero Errors",
      description: "Checking fair housing, local MLS rules, and mandatory disclosures.",
      fields: []
    },
    {
      id: "Optimize",
      icon: Sparkles,
      title: "Optimize",
      status: "Polishing assets...",
      benefit: "Live Ready",
      description: "Enhancing photos, generating remarks, and tagging media.",
      fields: []
    },
    {
      id: "Publish",
      icon: Download,
      title: "Publish",
      status: "Finalizing package...",
      benefit: "MLS Ready",
      description: "Drafting MLS listing and preparing seller portal.",
      fields: []
    }
  ];

  return (
    <section className="py-24 bg-[#F7F9FC] overflow-hidden">
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
          <h2 className="text-4xl font-bold tracking-tight mb-4">How Ria Manages Your Listing</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            A high-precision infrastructure designed to transform raw property data into market-ready assets.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-20 relative px-2">
          {/* Progress Line */}
          <div className="absolute top-6 left-16 right-16 h-0.5 pointer-events-none -mt-px -translate-y-1/2 z-10 w-[calc(100%-8rem)]">
            <div className="absolute inset-0 bg-divider" />
            <motion.div
              className="absolute inset-0 bg-brand-blue origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: activeStage / (stages.length - 1) }}
              transition={{ duration: 0.5, ease: professionalEase }}
            />
            <motion.div
              className={`absolute top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent via-brand-blue to-transparent w-32 blur-[2px] z-20 transition-opacity duration-300 ${activeStage === stages.length - 1 ? 'opacity-0' : 'opacity-100'}`}
              animate={{ left: `${(activeStage / (stages.length - 1)) * 100}%` }}
              transition={{ duration: 0.5, ease: professionalEase }}
              style={{ x: "-50%" }}
            />
          </div>

          <div className="relative flex justify-between items-start z-30">
            {stages.map((stage, i) => (
              <div key={stage.id} className="flex flex-col items-center w-32 relative">
                <div className="h-12 w-12 relative flex items-center justify-center mb-5 z-20">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveStage(i)}
                    aria-label={`Switch to ${stage.title} stage`}
                    className={`absolute inset-0 rounded-full flex items-center justify-center transition-all duration-300 border-2 origin-center ${activeStage === i
                      ? "bg-brand-blue border-brand-blue text-white shadow-xl shadow-brand-blue/30 scale-125"
                      : activeStage > i
                        ? "bg-brand-blue/10 border-brand-blue text-brand-blue"
                        : "bg-white border-divider text-text-muted hover:border-brand-blue/30"
                      }`}
                  >
                    <stage.icon className="w-5 h-5 absolute" />
                  </motion.button>
                  {activeStage === i && (
                    <motion.div
                      layoutId="engineGlow"
                      className="absolute inset-[-8px] rounded-full bg-brand-blue/10 -z-10"
                    />
                  )}
                </div>
                <div className="text-center w-full px-2">
                  <p className={`text-xs font-bold transition-colors ${activeStage === i ? "text-text-primary" : "text-text-muted"}`}>
                    {stage.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            className="bg-white rounded-3xl shadow-2xl shadow-black/5 border border-divider overflow-hidden min-h-[550px] flex flex-col"
            layout
          >
            {/* Engine Header */}
            <div className="px-6 py-4 border-b border-divider bg-white flex items-center justify-between">
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
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-[10px] font-bold text-text-muted uppercase tracking-widest"
                  >
                    {stages[activeStage].status}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="flex items-center gap-3">
                <button className="text-[10px] font-bold text-brand-blue uppercase tracking-widest hover:opacity-70 transition-opacity">Resume</button>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
                  <span className="text-[10px] font-bold text-status-success">LIVE ENGINE</span>
                </div>
              </div>
            </div>

            {/* Engine Content */}
            <div className="flex-1 p-8 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: professionalEase }}
                  className="h-full"
                >
                  <div className="grid md:grid-cols-2 gap-12 items-center h-full">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold">{stages[activeStage].title}</h3>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-brand-blue">{stages[activeStage].benefit}</div>
                          <div className="text-[8px] font-bold text-text-muted uppercase tracking-widest">Efficiency Benchmark</div>
                        </div>
                      </div>

                      {activeStage === 0 ? (
                        <div className="grid gap-3">
                          {stages[0].fields.map((field, i) => (
                            <motion.div
                              key={field.label}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="p-4 bg-bg-primary rounded-xl border border-divider flex items-center justify-between group relative cursor-help"
                            >
                              <div>
                                <p className="text-[10px] font-bold text-text-muted uppercase mb-1">{field.label}</p>
                                <p className="text-sm font-bold">{field.value}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[8px] font-bold text-brand-blue px-2 py-1 bg-brand-blue/5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                  {field.source}
                                </span>
                                <CircleCheck className="w-4 h-4 text-status-success" />
                              </div>
                            </motion.div>
                          ))}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center gap-2 text-[10px] font-bold text-status-success"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-status-success" /> SOURCES VERIFIED
                          </motion.div>
                        </div>
                      ) : (
                        <div className="bg-bg-primary/50 rounded-2xl p-8 border border-divider border-dashed flex flex-col items-center justify-center text-center">
                          {(() => {
                            const Icon = stages[activeStage].icon;
                            return <Icon className="w-12 h-12 text-brand-blue/20 mb-4" />;
                          })()}
                          <p className="text-sm text-text-secondary leading-relaxed">
                            {stages[activeStage].description}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="bg-bg-accent rounded-2xl p-6 border border-divider h-full flex flex-col items-center justify-center text-center relative overflow-hidden">
                      <div className="absolute inset-0 opacity-10">
                        <div className="grid grid-cols-8 gap-1 p-2">
                          {[...Array(64)].map((_, i) => (
                            <div key={i} className="aspect-square bg-brand-blue rounded-sm" />
                          ))}
                        </div>
                      </div>
                      <FileText className="w-16 h-16 text-brand-blue/20 mb-4" />
                      <p className="text-xs text-text-secondary max-w-[200px]">
                        {stages[activeStage].description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
          <div className="mt-8 flex justify-center text-center">
            <p className="text-xs text-text-muted font-medium italic">System operating autonomously...</p>
          </div>
        </div>
      </div>
    </section>
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
    if (!canvasRef.current || isDragging) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setRevealPosition(Math.max(0, Math.min(100, x)));
  };

  const [isDragging, setIsDragging] = useState(false);

  const currentTool = tools[activeTool];

  return (
    <section className="py-24 bg-[#F7F9FC] overflow-hidden">
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
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-xl z-30 flex items-center justify-center cursor-ew-resize group/handle"
                    style={{ left: `${revealPosition}%` }}
                  >
                    <div className="w-8 h-8 bg-white rounded-full shadow-2xl border border-divider flex items-center justify-center group-hover/handle:scale-110 transition-transform">
                      <div className="flex gap-0.5">
                        <div className="w-0.5 h-3 bg-divider rounded-full" />
                        <div className="w-0.5 h-3 bg-divider rounded-full" />
                      </div>
                    </div>
                    {/* Visual hint for dragging */}
                    <div className="absolute top-1/2 -translate-y-1/2 -left-8 right-0 pointer-events-none opacity-0 group-hover/handle:opacity-100 transition-opacity">
                      <div className="flex items-center gap-12 text-white/50">
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
                      className="bg-white/90 backdrop-blur p-3 rounded-xl shadow-xl border border-brand-blue/20 text-right"
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

                <div className="mt-8 p-6 border-t border-divider sticky bottom-0 bg-white">
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
      <button aria-expanded={isOpen} className="flex items-center gap-1 hover:text-brand-blue transition-colors py-4 text-sm font-medium text-gray-700">
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
    </div>
  );
};

const MainNavigation = ({ showBanner, onDismissBanner }: { showBanner: boolean; onDismissBanner: () => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50">
      {showBanner && <AnnouncementBanner onDismiss={onDismissBanner} />}
      <nav className="w-full bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center">
              <svg width="80" height="32" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="RIA Logo">
                <defs>
                  <linearGradient id="logoGradientHorizontal" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#2563eb" />
                    <stop offset="100%" stop-color="#7c3aed" />
                  </linearGradient>
                </defs>
                <g transform="translate(2, 2)">
                  <circle cx="18" cy="18" r="16" fill="url(#logoGradientHorizontal)" opacity="0.1" />
                  <path d="M11 10h7.5c2.5 0 4.5 2 4.5 4.5 0 1.8-1 3.3-2.5 4L23 24h-3.5l-2.5-5.5h-2V24h-4V10z" fill="url(#logoGradientHorizontal)" />
                  <rect x="15" y="14" width="3.5" height="2" fill="white" rx="0.7" />
                  <circle cx="28" cy="12" r="1.5" fill="#2563eb" opacity="0.8" />
                  <circle cx="31" cy="15" r="1" fill="#7c3aed" opacity="0.6" />
                </g>
                <text x="42" y="27" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="700" fill="#030213" letter-spacing="-0.5">RIA</text>
              </svg>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <ProductDropdown />
              <Link to="#pricing" className="text-gray-700 hover:text-gray-900 font-medium text-sm">Pricing</Link>
              <Link to="#resources" className="text-gray-700 hover:text-gray-900 font-medium text-sm">Resources</Link>
              <Link to="#blog" className="text-gray-700 hover:text-gray-900 font-medium text-sm">Blog</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-gray-700 hover:text-gray-900 font-medium text-sm hidden md:block">Login</Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-bold"
            >
              Start Free
            </motion.button>
            <Link to="/demo" className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors hidden lg:block text-sm font-bold">
              Book a Demo
            </Link>
            <button
              className="md:hidden text-gray-700 p-2"
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
              className="md:hidden border-t border-gray-100 bg-white"
            >
              <div className="p-4 space-y-4">
                <Link to="#pricing" className="block text-gray-700 hover:text-gray-900 font-medium py-2">Pricing</Link>
                <Link to="#resources" className="block text-gray-700 hover:text-gray-900 font-medium py-2">Resources</Link>
                <Link to="#blog" className="block text-gray-700 hover:text-gray-900 font-medium py-2">Blog</Link>
                <Link to="/login" className="block text-gray-700 hover:text-gray-900 font-medium py-2">Login</Link>
                <Link to="/demo" className="block text-gray-700 hover:text-gray-900 font-medium py-2">Book a Demo</Link>
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
              isPast ? "bg-status-success text-white" : "bg-white border border-border-subtle text-text-muted"
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
    <div className="glass-card w-full h-[500px] overflow-hidden flex flex-col relative bg-white">
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
                    className="w-12 h-16 bg-white border border-border-subtle rounded shadow-sm flex items-center justify-center"
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
                          <CheckCircle2 className="w-4 h-4 text-status-success bg-white rounded-full" />
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
                    className="absolute inset-0 bg-white/20"
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
    <div id={isDemoPage ? undefined : "how-it-works"} ref={ref}>
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
            How it works
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

          <div className="mt-16 p-6 bg-white rounded-2xl border border-border-subtle shadow-sm">
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

      <div className="bg-white rounded-2xl shadow-2xl shadow-black/5 border border-divider p-8 min-h-[500px] overflow-hidden relative">
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
                          className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur py-1 px-2 rounded text-[8px] font-bold text-brand-blue text-center border border-brand-blue/20"
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
                <span className="text-[10px] text-brand-blue font-medium px-2 py-1 bg-white/50 rounded">System Optimized</span>
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
                    <div className="flex items-center gap-3 p-3 bg-white/50 rounded-xl border border-brand-blue/10">
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
                          <div className="flex-1 bg-white/50 rounded" />
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
    <section className="section-padding bg-bg-primary border-t border-divider overflow-hidden transition-colors duration-300 py-24">
      <div className="max-w-7xl mx-auto px-6">
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

        <div className="py-12 border-y border-divider mb-16">
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
    </section>
  );
};

const RoleSwitcher = () => {
  const [activeRole, setActiveRole] = useState("Agents");
  const roles = [
    {
      id: "Agents",
      icon: Users,
      heading: "Go from signed listing agreement to live MLS in an afternoon",
      desc: "Ria handles the assembly, compliance checks, and remarks — you handle the relationship.",
      keyMetric: "80% faster time-to-market vs. manual listing prep",
      features: [
        "Auto-populate 200+ MLS fields from documents",
        "AI-written public remarks optimized for your market",
        "Real-time compliance validation",
        "One-click MLS export"
      ],
      preview: (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-bg-secondary rounded-xl border border-divider shadow-sm">
            <div>
              <div className="font-bold text-text-primary">123 Ok Street</div>
              <div className="text-xs text-text-secondary">Draft ready for review</div>
            </div>
            <div className="px-3 py-0.5 bg-status-success/10 text-status-success rounded-full text-[10px] font-bold">
              96% Ready
            </div>
          </div>
          <div className="p-6 bg-brand-blue/5 border border-brand-blue/10 rounded-xl">
            <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2">Time saved on this listing</div>
            <div className="text-4xl font-black text-brand-blue">3.2 hours</div>
          </div>
        </div>
      )
    },
    {
      id: "Coordinators",
      icon: ClipboardCheck,
      heading: "Manage 3x the listings, zero the errors.",
      desc: "Scale your operations without adding headcount by automating the mundane documentation tasks.",
      keyMetric: "40+ active listings managed per coordinator",
      features: [
        "Automated document collection tracking",
        "Cross-team collaboration portal",
        "Bulk compliance auditing",
        "Task prioritization dashboard"
      ],
      preview: (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-3 p-3 bg-bg-secondary rounded-lg border border-divider">
              <div className="w-2 h-2 rounded-full bg-brand-blue" />
              <div className="flex-1 h-2 bg-divider rounded" />
              <div className="w-8 h-4 bg-brand-blue/10 rounded" />
            </div>
          ))}
          <div className="mt-4 p-4 bg-brand-blue/5 rounded-xl border border-brand-blue/10 flex items-center justify-between">
            <span className="text-xs font-bold text-text-primary">Throughput Increase</span>
            <span className="text-xl font-bold text-brand-blue">+300%</span>
          </div>
        </div>
      )
    },
    {
      id: "Brokerages",
      icon: Building2,
      heading: "Brand-consistent listings across every office.",
      desc: "Maintain peak quality standards and brand identity across thousands of agents effortlessly.",
      keyMetric: "100% brand compliance on every public draft",
      features: [
        "Global listing style guides",
        "Broker-level visibility & reporting",
        "Automated brand voice enforcement",
        "Recruitment & retention advantage"
      ],
      preview: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square bg-bg-secondary rounded-lg border border-divider p-2 flex flex-col justify-end">
                <div className="h-1 w-full bg-divider rounded mb-1" />
                <div className="h-1 w-2/3 bg-divider rounded" />
              </div>
            ))}
          </div>
          <div className="p-3 bg-status-success/5 rounded-lg border border-status-success/10 flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-status-success" />
            <span className="text-[10px] font-bold text-status-success uppercase">Quality Score: 100/100</span>
          </div>
        </div>
      )
    },
    {
      id: "Compliance",
      icon: ShieldCheck,
      heading: "Catch problems before they become lawsuits.",
      desc: "Ria acts as a 24/7 audit layer, ensuring every field and remark meets state and local regulations.",
      keyMetric: "200+ automated compliance rules checked instantly",
      features: [
        "Fair Housing act violation detection",
        "Mandatory disclosure verification",
        "Local regulation enforcement",
        "Audit-ready trail for every listing"
      ],
      preview: (
        <div className="space-y-3">
          <div className="p-4 bg-status-error/5 border border-status-error/10 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-status-error" />
              <span className="text-[10px] font-bold text-status-error uppercase">Flagged: Fair Housing</span>
            </div>
            <div className="h-2 w-full bg-divider rounded mb-1" />
            <div className="h-2 w-2/3 bg-divider rounded" />
          </div>
          <div className="p-4 bg-status-success/5 border border-status-success/10 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-status-success" />
              <span className="text-[10px] font-bold text-status-success uppercase">Fixed: Mandatory Field</span>
            </div>
            <div className="h-2 w-full bg-divider rounded mb-1" />
            <div className="h-2 w-1/3 bg-divider rounded" />
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="section-padding bg-bg-primary transition-colors duration-300 overflow-hidden py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Designed for</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">Ria becomes what you need, scaling with your organization from solo agent to national brokerage.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setActiveRole(role.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all border ${activeRole === role.id
                ? "bg-brand-blue text-white border-brand-blue shadow-lg shadow-brand-blue/20"
                : "bg-bg-secondary text-text-muted border-divider hover:border-brand-blue/30"
                }`}
            >
              <role.icon className="w-4 h-4" />
              {role.id}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {roles.map((role) => role.id === activeRole && (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/5 text-brand-blue rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                  <role.icon className="w-4 h-4" />
                  {role.id}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-text-primary mb-6 leading-tight">
                  {role.heading}
                </h3>
                <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                  {role.desc}
                </p>

                <div className="p-6 bg-brand-blue/5 rounded-2xl border border-divider mb-8 group overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-12 h-12 text-brand-blue" />
                  </div>
                  <div className="text-xs font-bold text-text-muted uppercase tracking-widest mb-2">Key Metric</div>
                  <div className="text-2xl font-black text-brand-blue">
                    {role.keyMetric}
                  </div>
                </div>

                <ul className="space-y-4">
                  {role.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-6 h-6 rounded-full bg-brand-blue text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg shadow-brand-blue/20">
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      </div>
                      <span className="text-text-primary font-medium">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="order-1 lg:order-2 relative">
                <div className="absolute -inset-4 bg-brand-blue/5 rounded-[40px] blur-2xl opacity-50"></div>
                <div className="relative bg-bg-secondary rounded-3xl p-8 border border-divider shadow-2xl shadow-brand-blue/5 min-h-[400px] flex flex-col justify-center transition-colors">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {role.preview}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export const JourneyTimeline = () => {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      id: "Pre-Listing",
      desc: "Assemble property data and documents.",
      preview: (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-bg-primary rounded-lg border border-divider shadow-sm gap-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-blue/10 rounded flex items-center justify-center">
                <Upload className="w-4 h-4 text-brand-blue" />
              </div>
              <span className="text-xs font-bold text-text-primary">Tax Record Ingested</span>
            </div>
            <CircleCheck className="w-4 h-4 text-status-success" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="h-12 bg-bg-accent rounded-lg animate-pulse" />
            <div className="h-12 bg-bg-accent rounded-lg animate-pulse" />
          </div>
          <div className="p-3 border border-divider rounded-lg bg-bg-primary">
            <div className="flex justify-between text-[10px] mb-2">
              <span className="text-text-muted uppercase font-bold">Checklist</span>
              <span className="text-brand-blue font-bold">80%</span>
            </div>
            <div className="h-1 bg-divider rounded-full overflow-hidden">
              <div className="h-full bg-brand-blue" style={{ width: '80%' }} />
            </div>
          </div>
        </div>
      ),
      icon: FileText,
      status: "active",
      list: ["Document scanning", "Data extraction", "Checklist automation"]
    },
    {
      id: "MLS Draft",
      desc: "Review remarks, media, and fields.",
      preview: <div className="w-full h-40 bg-bg-primary rounded-xl border border-dashed border-divider flex items-center justify-center text-text-muted text-xs">Draft Preview</div>,
      icon: PanelsTopLeft,
      status: "active",
      list: ["Remark generation", "Media ordering", "Field mapping"]
    },
    {
      id: "Marketing",
      desc: "Publish property websites and social posts.",
      preview: <div className="h-40 bg-bg-primary rounded-xl border border-divider flex items-center justify-center text-text-muted text-xs flex-col gap-2"><Megaphone className="w-6 h-6 opacity-50" /><span>Coming Soon</span></div>,
      icon: Megaphone,
      status: "soon",
      list: []
    },
    {
      id: "Closing",
      desc: "Manage offers, documents, and coordinates.",
      preview: <div className="h-40 p-4 bg-bg-secondary rounded-xl border border-divider flex items-center justify-center text-text-muted text-xs flex-col gap-2"><Handshake className="w-6 h-6 opacity-50" /><span>Coming Soon</span></div>,
      icon: Handshake,
      status: "soon",
      list: []
    }
  ];

  return (
    <section className="section-padding bg-bg-secondary transition-colors duration-300 overflow-hidden border-t border-divider py-24 hidden ">
      <div className="max-w-7xl container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-text-primary mb-4">From prep to closing — Ria stays with the listing.</h2>
          <p className="text-text-secondary">Built to manage every stage of the listing lifecycle.</p>
        </div>

        <div className="relative mb-20 max-w-4xl mx-auto">
          {/* Progress Line */}
          <div className="absolute top-6 left-8 right-8 h-0.5 bg-divider -translate-y-1/2" />
          <motion.div
            className="absolute top-6 left-8 h-0.5 bg-brand-blue -translate-y-1/2 origin-left z-0"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: activeStage / 1 }} // Only 2 active steps (0 and 1)
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ width: 'calc(33.33% - 2rem)' }} // Approx space between step 1 and 2
          />

          <div className="relative flex justify-between px-4">
            {stages.map((stage, i) => {
              const isActive = activeStage === i;
              const isPast = i <= activeStage;
              const isSoon = stage.status === "soon";

              return (
                <div key={stage.id} className="flex flex-col items-center relative z-10 w-24">
                  <button
                    onClick={() => !isSoon && setActiveStage(i)}
                    disabled={isSoon}
                    className={`group relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${isActive ? 'bg-brand-blue border-brand-blue text-white shadow-xl shadow-brand-blue/30 scale-110' : isPast ? 'bg-bg-primary border-2 border-brand-blue text-brand-blue' : 'bg-bg-primary border-2 border-divider text-text-muted'} ${!isSoon ? 'cursor-pointer hover:border-brand-blue/50' : 'cursor-not-allowed opacity-50'}`}
                  >
                    <stage.icon className="w-5 h-5" />
                    {isSoon && (
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-bg-accent text-text-muted text-[8px] font-bold rounded-full border border-divider whitespace-nowrap">SOON</span>
                    )}
                    {isActive && (
                      <motion.div
                        layoutId="activeTimelineGlow"
                        className="absolute inset-0 rounded-full bg-brand-blue/20 blur-lg -z-10"
                      />
                    )}
                  </button>
                  <div className="mt-4 text-center">
                    <p className={`text-xs font-bold transition-colors ${isActive ? "text-text-primary" : "text-text-muted"}`}>
                      {stage.id}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Preview Panel */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-8 bg-bg-primary/50 border border-divider shadow-sm"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-2 py-1 bg-brand-blue/5 text-brand-blue text-[10px] font-bold rounded mb-4 uppercase tracking-wider">
                    PHASE 0{activeStage + 1}
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-3">{stages[activeStage].id}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-6">
                    {stages[activeStage].desc}
                  </p>
                  {stages[activeStage].list.length > 0 && (
                    <ul className="space-y-3">
                      {stages[activeStage].list.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs font-medium text-text-secondary">
                          <CircleCheck className="w-3.5 h-3.5 text-status-success" /> {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="bg-bg-secondary p-6 rounded-2xl border border-divider shadow-inner min-h-[220px] flex items-center justify-center">
                  {stages[activeStage].preview}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

function LandingPage() {
  const [showBanner, setShowBanner] = useState(true);
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
    <div className="min-h-screen selection:bg-brand-blue/10 selection:text-brand-blue bg-white">
      {/* Navigation */}
      <MainNavigation showBanner={showBanner} onDismissBanner={() => setShowBanner(false)} />

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
                  Start Your First Listing Free
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center text-lg">
                  Book a Demo
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
              <div className="relative z-10 glass-card p-1 bg-white/50 backdrop-blur-xl border-white/20 shadow-2xl">
                <div className="bg-bg-primary rounded-2xl overflow-hidden border border-divider">
                  {/* Status Bar */}
                  <div className="px-6 py-4 border-b border-divider flex items-center justify-between bg-white/50">
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
                        <h3 className="text-sm font-bold text-text-primary mb-1">Listing Integrity Score</h3>
                        <p className="text-[10px] text-text-secondary uppercase font-bold tracking-wider">Analysis in progress...</p>
                      </div>
                      <div className="text-right">
                        <motion.div
                          className="text-sm font-bold text-brand-blue"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {/* {score}% */}
                          <div class="mb-6 p-4 border border-green-200 bg-green-50 rounded-lg" data-fg-eh6d48="1.16:1.6728:/src/app/components/Hero.tsx:84:15:3813:675:e:div:e"><div class="flex items-center gap-2 text-green-700" data-fg-eh6d49="1.16:1.6728:/src/app/components/Hero.tsx:85:17:3903:564:e:div:ete"><svg class="size-5" fill="currentColor" viewBox="0 0 20 20" data-fg-eh6d50="1.16:1.6728:/src/app/components/Hero.tsx:86:19:3978:380:e:svg:e"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" data-fg-eh6d51="1.16:1.6728:/src/app/components/Hero.tsx:87:21:4063:270:e:path"></path></svg><span class="font-semibold" data-fg-eh6d52="1.16:1.6728:/src/app/components/Hero.tsx:93:19:4377:67:e:span:t">Compliant – Ready to publish</span></div></div>
                        </motion.div>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="p-4 bg-white rounded-xl border border-divider">
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
                      <div className="p-4 bg-bg-accent/50 rounded-xl border border-divider">
                        <p className="text-[10px] font-bold text-text-muted uppercase mb-1">Compliance Checks</p>
                        <p className="text-lg font-bold text-text-primary">142/142</p>
                      </div>
                      <div className="p-4 bg-bg-accent/50 rounded-xl border border-divider">
                        <p className="text-[10px] font-bold text-text-muted uppercase mb-1">Field Accuracy</p>
                        <p className="text-lg font-bold text-text-primary">99.8%</p>
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

      <HeroStats />

      {/* Problem Reframe */}
      <RevealSection className="py-24 bg-white border-y border-divider">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeIn>
              <h2 className="text-4xl font-bold tracking-tight mb-4">Listings aren’t data entry. They’re revenue.</h2>
              <p className="text-text-secondary max-w-2xl mx-auto">Ria isn't a shortcut for one step. It's the platform where your entire listing lifecycle lives—from preparation to publication to close.</p>
            </FadeIn>
          </div>

          <StaggerContainer
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { title: "Draft-ready in 4 minutes", desc: "200+ MLS fields extracted and structured from your documents automatically.", icon: Zap },
              { title: "Zero compliance surprises", desc: "Every listing scored and checked before it touches MLS. Fair housing, required fields, missing addenda.", icon: ShieldCheck },
              { title: "Market-ready visuals", desc: "Virtual staging, enhancement, and day-to-dusk — from $29/image with 24-hour turnaround.", icon: Sparkles },
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
      </RevealSection>

      <ThreePillarsSection />

      <RiaEngine />

      <RiaStudio />

      {/* How it Works - Replaced with Watch Ria Think section */}
      <WatchRiaThinkSection isDemoPage={false} />

      <IntelligenceLayersSection />

      <LiveListingAuditSection />

      <SellerCollaborationSection />

      <RoleSwitcher />

      <JourneyTimeline />

      <RoadmapSection />

      <SocialProof />

      {/* Final CTA */}
      <RevealSection className="py-32 bg-white border-t border-divider">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-4xl font-bold tracking-tight mb-6">Launch a winning listing in under 5 minutes.</h2>
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
    <section className="py-24 bg-[#F7F9FC] overflow-hidden relative" ref={ref}>
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
    <section className="py-24 bg-[#F7F9FC]">
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
          <h2 className="text-4xl font-bold tracking-tight mb-4">Every Listing Gets a Quality Score</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Before you see your draft, Ria has already checked 200+ data points for accuracy, compliance, and marketability. Here’s what that looks like
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
              <div className="mt-8 p-4 bg-brand-blue/5 border border-brand-blue/10 rounded-xl flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 text-brand-blue" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-brand-blue uppercase tracking-widest mb-0.5">Competitive Insight</p>
                  <p className="text-xs text-text-primary font-medium">
                    Top 20% of listings in your area score above 90.
                  </p>
                </div>
              </div>
              <div className="pt-6 border-t border-divider">
                <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold opacity-60">
                  Every score is traceable to a source.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Tab-based Category Panels */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap gap-2 p-1 bg-bg-primary/50 border border-divider rounded-2xl mb-6">
              {categories.map((cat, i) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(i)}
                  className={`flex-1 min-w-[120px] py-4 px-4 rounded-xl font-bold text-xs transition-all duration-300 flex items-center justify-between ${activeCategory === i
                    ? "bg-white text-brand-blue shadow-lg border border-divider"
                    : "text-text-muted hover:text-text-primary"
                    }`}
                >
                  <span>{cat.id}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-8 bg-divider rounded-full overflow-hidden hidden sm:block">
                      <motion.div
                        className={`h-full ${cat.score >= 90 ? "bg-brand-blue" : "bg-amber-500"}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.score}%` }}
                      />
                    </div>
                    <span className={activeCategory === i ? "text-brand-blue" : "opacity-40"}>{cat.score}%</span>
                  </div>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeCategory !== null && (
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl border border-divider shadow-[0_20px_40px_rgba(0,0,0,0.02)] p-8 min-h-[400px]"
                >
                  <div className="mb-8 flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{categories[activeCategory].id}</h3>
                      <p className="text-sm text-text-secondary max-w-md">{categories[activeCategory].summary}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-brand-blue">{categories[activeCategory].score}%</div>
                      <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">Section Score</div>
                    </div>
                  </div>

                  <div className="border-t border-divider/50 pt-8">
                    {activeCategory === 0 && (
                      <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
                        {categories[0].items?.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-bg-primary/30 rounded-lg border border-divider/50">
                            <span className="text-xs text-text-secondary font-medium">{item.label}</span>
                            <CheckCircle2 className="w-4 h-4 text-status-success" />
                          </div>
                        ))}
                      </div>
                    )}

                    {activeCategory === 1 && (
                      <div className="space-y-8">
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                            <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Active Alerts Required Action</p>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-4">
                            {categories[1].warnings?.map((warning, idx) => (
                              <div key={idx} className="group relative p-4 bg-amber-50 border border-amber-200 rounded-xl hover:bg-amber-100/50 transition-colors">
                                <p className="text-xs font-bold text-text-primary mb-1">{warning.label}</p>
                                <p className="text-[10px] text-text-muted underline decoration-dotted decoration-divider cursor-help">
                                  {warning.subtext}
                                </p>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-0 mb-2 bg-text-primary text-white text-[10px] py-2 px-3 rounded shadow-xl max-w-[200px] z-50 pointer-events-none leading-tight">
                                  {warning.tooltip}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-status-success uppercase tracking-widest mb-4">Verified Compliance Checks</p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {categories[1].passed?.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-2 bg-bg-primary/30 p-2 rounded-lg border border-divider/50">
                                <CheckCircle2 className="w-3 h-3 text-status-success" />
                                <span className="text-[10px] text-text-secondary">{item.label}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeCategory === 2 && (
                      <div className="space-y-8">
                        <div className="grid sm:grid-cols-2 gap-4">
                          {categories[2].bullets?.map((bullet, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-4 bg-bg-primary/30 rounded-xl border border-divider/50">
                              <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                              <span className="text-xs text-text-secondary">{bullet}</span>
                            </div>
                          ))}
                        </div>
                        <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-indigo-500" />
                              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Market Exposure Potential</span>
                            </div>
                            <span className="text-xl font-bold text-indigo-500">{categories[2].opportunityScore}%</span>
                          </div>
                          <div className="h-2 bg-indigo-200 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-indigo-500"
                              initial={{ width: 0 }}
                              animate={{ width: `${categories[2].opportunityScore}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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

const ThreePillarsSection = () => {
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      title: "Listing Manager",
      tagline: "LIVE",
      desc: "Ria acts as your second brain for every listing. It extracts data, audits compliance, and builds your MLS draft automatically.",
      features: [
        "200+ MLS fields extracted from documents",
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
        "AI-powered virtual staging ($29/image)",
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
    }
  ];

  const currentPillar = pillars[activePillar];

  return (
    <section className="py-24 bg-[#F7F9FC] overflow-hidden">
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
          <h2 className="text-4xl font-bold tracking-tight mb-4">Three pillars. One operating system.</h2>
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
                      : "bg-indigo-50 border-indigo-600 text-indigo-600 border-2"
                  : "bg-white border-divider text-slate-500 hover:border-slate-300"
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
            className="bg-white rounded-[48px] border border-divider shadow-xl shadow-black/[0.02] overflow-hidden"
          >
            <div className="grid lg:grid-cols-2 gap-12 p-8 md:p-16">
              <div className="flex flex-col justify-center">
                <div className={`w-[70px] justify-center inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 
                  ${currentPillar.color === 'teal' ? 'bg-emerald-500/10 text-emerald-600' :
                    currentPillar.color === 'blue' ? 'bg-blue-500/10 text-blue-600' : 'bg-indigo-500/10 text-indigo-600'}`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${currentPillar.color === 'teal' ? 'bg-emerald-500' : currentPillar.color === 'blue' ? 'bg-blue-500' : 'bg-indigo-500'}`} />
                  {currentPillar.tagline}
                </div>

                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">{currentPillar.title}</h3>
                <p className="text-lg text-slate-500 leading-relaxed mb-8 ">
                  {currentPillar.desc}
                </p>

                <div className="space-y-4 mb-10">
                  {currentPillar.features.map((feature) => (
                    <div key={feature} className="flex gap-3 items-start">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5
                        ${currentPillar.color === 'teal' ? 'bg-emerald-50 text-emerald-600' :
                          currentPillar.color === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-indigo-50 text-indigo-600'}`}
                      >
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="text-slate-600 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`btn-primary self-start font-bold py-4 px-8 flex items-center gap-2
                    ${currentPillar.color === 'teal' ? 'bg-teal-600 hover:bg-teal-700' :
                      currentPillar.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                  {currentPillar.cta} <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Desktop Desktop Preview */}
              <div className="flex items-center justify-center relative w-full lg:mt-0">
                {/* Decorative glows */}
                <div className={`absolute w-[120%] h-[120%] rounded-full blur-[120px] opacity-10 -z-10
                  ${currentPillar.color === 'teal' ? 'bg-emerald-500' :
                    currentPillar.color === 'blue' ? 'bg-blue-500' : 'bg-indigo-500'}`}
                />

                <div className="w-full max-w-[500px] lg:max-w-none bg-white border border-slate-200/60 rounded-2xl shadow-2xl relative overflow-hidden flex flex-col h-[400px]">
                  {/* Browser/Desktop Top Bar */}
                  <div className="bg-slate-50 border-b border-slate-200/60 px-4 py-3 flex items-center gap-4">
                    <div className="flex gap-1.5 opacity-80">
                      <div className="w-3 h-3 rounded-full bg-slate-300" />
                      <div className="w-3 h-3 rounded-full bg-slate-300" />
                      <div className="w-3 h-3 rounded-full bg-slate-300" />
                    </div>
                    <div className="flex-1 bg-white rounded-md border border-slate-200/60 text-[10px] text-slate-400 font-mono px-3 py-1.5 flex items-center justify-center shadow-sm">
                      ria.app/{currentPillar.title.toLowerCase().replace(/ /g, '-')}
                    </div>
                  </div>

                  {/* Desktop Content Area */}
                  <div className="bg-white p-6 md:p-8 flex-1 flex flex-col text-slate-800 overflow-y-auto custom-scrollbar">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-slate-100 pb-6">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                          {currentPillar.preview.title}
                        </p>
                        <h4 className="text-2xl font-bold text-slate-900">4221 Oamot Dr</h4>
                      </div>

                      {/* Overall Progress */}
                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 min-w-[180px]">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Progress</span>
                          <span className={`text-sm font-black ${currentPillar.color === 'teal' ? 'text-emerald-600' : 'text-blue-600'}`}>
                            {currentPillar.preview.progress}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${currentPillar.preview.progress}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className={`h-full rounded-full ${currentPillar.color === 'teal' ? 'bg-gradient-to-r from-emerald-400 to-teal-500' : 'bg-gradient-to-r from-blue-400 to-indigo-500'}`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Preview Items - List Layout */}
                    <div className="space-y-3 flex-1 mb-6">
                      {currentPillar.preview.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 sm:px-4 sm:py-3 border border-slate-100 rounded-lg hover:border-slate-200 transition-colors bg-white hover:bg-slate-50">
                          <span className="text-sm font-medium text-slate-700">{item.label}</span>
                          <span className={`text-[10px] font-bold uppercase py-1 px-2.5 rounded-md
                            ${item.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                              item.color === 'blue' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                item.color === 'amber' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-slate-50 text-slate-500 border border-slate-200'}`}
                          >
                            {item.status}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="flex justify-end pt-4 border-t border-slate-100">
                      <button className={`px-5 py-2 rounded-lg text-sm font-bold shadow-sm transition-transform hover:-translate-y-0.5
                        ${currentPillar.color === 'teal' ? 'bg-emerald-600 text-white hover:bg-emerald-700' :
                          currentPillar.color === 'blue' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                      >
                        {currentPillar.color === 'teal' ? 'Upload Documents →' : currentPillar.color === 'blue' ? 'Finalize MLS Draft →' : 'Manage Media Lab →'}
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
    <section id="virtual-staging" className="py-24 bg-[#F7F9FC]">
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
                  ? "bg-white border-brand-blue shadow-lg shadow-brand-blue/5 z-10"
                  : "bg-transparent border-transparent hover:bg-white/50 hover:border-divider"
                  }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activeTool === i ? "bg-brand-blue text-white" : "bg-white text-brand-blue border border-divider"
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
                className="bg-white rounded-2xl border border-divider shadow-xl shadow-black/5 overflow-hidden"
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

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex bg-white/90 backdrop-blur p-1 rounded-full shadow-lg border border-divider z-20">
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
            <button className="px-8 py-4 bg-brand-blue text-white rounded-full font-bold shadow-xl shadow-brand-blue/20 hover:scale-105 transition-transform">
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
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
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
                <div className={`w-3 h-3 rounded-full border-2 relative ${phase.status === 'Live' ? 'bg-brand-blue border-brand-blue' : 'bg-white border-divider'}`}>
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
                    ? "bg-white border-brand-blue/20 shadow-sm"
                    : "bg-[#F7F9FC] border-divider border-dashed hover:border-solid hover:-translate-y-1"
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
    </section>
  );
};

export const DemoPage = () => {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Simple Nav */}
      <MainNavigation showBanner={showBanner} onDismissBanner={() => setShowBanner(false)} />

      <main className="relative">
        <h1 className="sr-only">Ria Interactive Demo</h1>
        <WatchRiaThinkSection isDemoPage={true} />

        <RoleSwitcher />

        <JourneyTimeline />

        <VisualIntelligenceStudio />

        <RoadmapSection />

        {/* Final CTA on Demo Page */}
        <section className="py-24 bg-white border-t border-divider">
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
}

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
