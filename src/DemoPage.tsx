/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Search,
  ChevronRight,
  Download,
  Info,
  Users,
  Building2,
  ClipboardCheck,
  BarChart3,
  Layout,
  Eye,
  Flag,
  Share2,
  Megaphone,
  Handshake,
  Clock,
  Image as ImageIcon,
  Sun,
  Moon,
  Eraser,
  Maximize2,
  Layers,
  Zap
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const StepTimeline = ({ activeStep }: { activeStep: number }) => {
  const steps = [
    { id: 1, title: "Upload", sub: "Ingest documents & media" },
    { id: 2, title: "Build + Improve", sub: "AI optimization & compliance" },
    { id: 3, title: "Review + Save Draft", sub: "Final audit & MLS export" }
  ];

  return (
    <div className="space-y-12 relative">
      <div className="absolute left-4 top-2 bottom-2 w-px bg-divider -z-10" />
      {steps.map((step, i) => {
        const isActive = activeStep === i;
        const isPast = activeStep > i;

        return (
          <div key={step.id} className="flex gap-6 items-start">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 z-10 ${isActive ? "bg-brand-blue text-white scale-110 shadow-lg shadow-brand-blue/20" :
              isPast ? "bg-status-success text-white" : "bg-white border border-border-subtle text-text-muted"
              }`}>
              {isPast ? <CheckCircle2 className="w-4 h-4" /> : `0${step.id}`}
            </div>
            <div className={`transition-all duration-500 ${isActive ? "opacity-100 translate-x-2" : "opacity-40"}`}>
              <h4 className={`font-bold ${isActive ? "text-text-primary" : "text-text-muted"}`}>{step.title}</h4>
              <p className="text-xs text-text-secondary mt-1">{step.sub}</p>
            </div>
          </div>
        );
      })}
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
    <div className="glass-card w-full h-[500px] overflow-hidden flex flex-col relative bg-white">
      {/* Header */}
      <div className="p-4 border-b border-divider flex items-center justify-between bg-bg-primary/50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-status-error" />
          <div className="w-2 h-2 rounded-full bg-status-warning" />
          <div className="w-2 h-2 rounded-full bg-status-success" />
          <span className="ml-2 text-[10px] font-bold text-text-muted uppercase tracking-widest">Ria Engine v2.4</span>
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
              <h3 className="font-bold text-lg mb-2">Drop listing assets here</h3>
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
                    <span className="text-[10px] font-medium text-brand-blue px-2 py-0.5 bg-brand-blue/5 rounded">SEO Optimized</span>
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
                      <h4 className="text-sm font-bold">MLS Draft Ready</h4>
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
                          alt="House"
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
                    <h4 className="text-base font-bold">Listing Preview</h4>
                    <p className="text-xs text-text-muted">1248 Oakwood Ave • Draft</p>
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
                      <span className="text-[10px] font-bold text-text-muted uppercase">Readiness Score</span>
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
                        <img src={`https://picsum.photos/seed/agent-ui-${i}/300/300`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
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
                  <h4 className="text-base font-bold">Multi-Listing Dashboard</h4>
                  <p className="text-xs text-text-muted">Operational Overview • 12 Active</p>
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
                  <h4 className="text-base font-bold">Brand Governance</h4>
                  <p className="text-xs text-text-muted">Standardizing 18 Offices</p>
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
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-status-success" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Brand Style Enforcement</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "Logo Placement", status: "Compliant" },
                      { label: "Typography (Plus Jakarta)", status: "Compliant" },
                      { label: "Color Palette", status: "Compliant" },
                      { label: "Remark Tone", status: "Standardized" }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="flex items-center justify-between text-xs"
                      >
                        <span className="text-text-secondary">{item.label}</span>
                        <span className="text-status-success font-bold">{item.status}</span>
                      </motion.div>
                    ))}
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
                      <span className="text-xs font-bold">100% Alignment</span>
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
                  <h4 className="text-base font-bold">Compliance Audit Trail</h4>
                  <p className="text-xs text-text-muted">Risk Mitigation Engine</p>
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
                    4 POTENTIAL VIOLATIONS PREVENTED TODAY
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

export const RoleSwitcher = () => {
  const [activeRole, setActiveRole] = useState("Agents");
  const roles = [
    { id: "Agents", icon: Users, desc: "For high-volume producers", metric: { label: "Time to publish", from: "2h", to: "12m" } },
    { id: "Coordinators", icon: ClipboardCheck, desc: "For operational leads", metric: { label: "Listings managed", from: "5", to: "15" } },
    { id: "Brokerages", icon: Building2, desc: "For brand owners", metric: { label: "Offices aligned", from: "3", to: "18" } },
    { id: "Compliance", icon: ShieldCheck, desc: "For risk managers", metric: { label: "Risk flags caught", from: "0", to: "4 prevented" } }
  ];

  return (
    <section className="py-32 bg-[#F1F4F9]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Designed for every role in the listing workflow</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">Ria becomes what you need, scaling with your organization from solo agent to national brokerage.</p>
        </div>

        {/* Horizontal Role Selector - Pill Style */}
        <div className="flex flex-wrap justify-center gap-4 mb-24">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setActiveRole(role.id)}
              className={`flex items-center gap-5 px-6 py-4 rounded-full transition-all duration-300 border ${activeRole === role.id
                ? "bg-brand-blue text-white border-brand-blue shadow-xl shadow-brand-blue/20 scale-105 z-10"
                : "bg-white text-text-primary border-divider hover:border-brand-blue/30"
                }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${activeRole === role.id ? "bg-white/20" : "bg-bg-accent text-brand-blue"
                }`}>
                <role.icon className="w-5 h-5" />
              </div>
              <div className="text-left pr-2">
                <h4 className="font-bold text-sm mb-0.5">{role.id}</h4>
                <Counter
                  from={role.metric.from}
                  to={role.metric.to}
                  label={role.metric.label}
                  active={activeRole === role.id}
                />
              </div>
            </button>
          ))}
        </div>

        <div className="max-w-5xl mx-auto">
          <RolePreview role={activeRole} />
        </div>
      </div>
    </section>
  );
};

const VisualIntelligenceStudio = () => {
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
    <section className="py-24 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Transform Every Listing Photo Into a Market-Ready Asset</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Ria enhances, stages, refines, and optimizes your media — ready for MLS and marketing.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left: Tool Selector */}
          <div className="lg:col-span-4 space-y-3">
            {tools.map((tool, i) => (
              <button
                key={tool.id}
                onClick={() => {
                  setActiveTool(i);
                  setShowAfter(true);
                }}
                className={`w-full text-left p-5 rounded-xl transition-all duration-300 border flex items-center gap-4 ${activeTool === i
                  ? "bg-white border-brand-blue shadow-lg shadow-brand-blue/5 translate-x-2"
                  : "bg-transparent border-transparent hover:bg-white/50 hover:border-divider"
                  }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activeTool === i ? "bg-brand-blue text-white" : "bg-white text-brand-blue border border-divider"
                  }`}>
                  <tool.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`font-bold text-sm ${activeTool === i ? "text-text-primary" : "text-text-muted"}`}>{tool.id}</h4>
                </div>
                {activeTool === i && (
                  <motion.div layoutId="activeArrow" className="ml-auto">
                    <ChevronRight className="w-4 h-4 text-brand-blue" />
                  </motion.div>
                )}
              </button>
            ))}

            <div className="mt-8 p-6 bg-brand-blue/5 border border-brand-blue/10 rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-brand-blue" />
                <span className="text-xs font-bold uppercase text-brand-blue">Bundle & Save</span>
              </div>
              <h5 className="font-bold text-sm mb-1">Media Boost Package</h5>
              <p className="text-[10px] text-text-secondary mb-4">Includes Enhancement, Day to Dusk, and Virtual Staging.</p>
              <div className="flex items-end gap-1">
                <span className="text-xl font-bold">$199</span>
                <span className="text-[10px] text-text-muted mb-1">per listing</span>
              </div>
            </div>
          </div>

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
              Enhance My Listing with Ria
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export const JourneyTimeline = () => {
  const [activeStage, setActiveStage] = useState(0);
  const stages = [
    {
      id: "Pre-Listing",
      status: "Active",
      icon: FileText,
      desc: "Assemble property data and documents.",
      preview: (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-border-subtle shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-blue/10 rounded flex items-center justify-center">
                <Upload className="w-4 h-4 text-brand-blue" />
              </div>
              <span className="text-xs font-bold">Tax Record Ingested</span>
            </div>
            <CheckCircle2 className="w-4 h-4 text-status-success" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="h-12 bg-bg-accent rounded-lg animate-pulse" />
            <div className="h-12 bg-bg-accent rounded-lg animate-pulse" />
          </div>
          <div className="p-3 border border-divider rounded-lg">
            <div className="flex justify-between text-[10px] mb-2">
              <span className="text-text-muted uppercase font-bold">Checklist</span>
              <span className="text-brand-blue font-bold">80%</span>
            </div>
            <div className="h-1 bg-divider rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: "80%" }} className="h-full bg-brand-blue" />
            </div>
          </div>
        </div>
      )
    },
    {
      id: "MLS Draft",
      status: "Active",
      icon: Layout,
      desc: "Validated, optimized, and ready to save.",
      preview: (
        <div className="space-y-4">
          <div className="p-4 bg-brand-blue/5 border border-brand-blue/20 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-brand-blue" />
              <span className="text-[10px] font-bold uppercase text-brand-blue">Compliance Verified</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-2xl font-bold">94%</span>
              <span className="text-[8px] text-text-muted uppercase font-bold mb-1">Readiness Score</span>
            </div>
          </div>
          <div className="p-3 bg-white rounded-lg border border-border-subtle shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-3 h-3 text-brand-blue" />
              <span className="text-[10px] font-bold">AI Remark Optimization</span>
            </div>
            <div className="h-2 w-full bg-divider rounded mb-1" />
            <div className="h-2 w-3/4 bg-divider rounded" />
          </div>
        </div>
      )
    },
    {
      id: "Marketing",
      status: "Soon",
      icon: Megaphone,
      desc: "Auto-generated assets for social & print.",
      preview: (
        <div className="space-y-4 opacity-60">
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-square bg-bg-accent rounded-lg flex flex-col items-center justify-center p-4 border border-dashed border-divider">
              <Share2 className="w-6 h-6 text-text-muted mb-2" />
              <span className="text-[8px] font-bold text-center uppercase">Social Post Generator</span>
            </div>
            <div className="aspect-square bg-bg-accent rounded-lg flex flex-col items-center justify-center p-4 border border-dashed border-divider">
              <FileText className="w-6 h-6 text-text-muted mb-2" />
              <span className="text-[8px] font-bold text-center uppercase">Flyer Builder</span>
            </div>
          </div>
          <div className="p-3 bg-white rounded-lg border border-border-subtle flex items-center justify-between">
            <span className="text-[10px] font-bold">Listing Performance</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4].map(i => <div key={i} className="w-1 h-4 bg-divider rounded-full" />)}
            </div>
          </div>
        </div>
      )
    },
    {
      id: "Closing",
      status: "Soon",
      icon: Handshake,
      desc: "End-to-end offer and closing tracking.",
      preview: (
        <div className="space-y-4 opacity-60">
          <div className="p-4 bg-bg-accent rounded-xl border border-dashed border-divider">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-text-muted" />
              <span className="text-[10px] font-bold uppercase">Closing Timeline</span>
            </div>
            <div className="space-y-3">
              {[1, 2].map(i => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-divider" />
                  <div className="h-2 w-24 bg-divider rounded" />
                </div>
              ))}
            </div>
          </div>
          <div className="p-3 bg-white rounded-lg border border-border-subtle flex items-center justify-between">
            <span className="text-[10px] font-bold">Offer Summary</span>
            <div className="w-8 h-4 bg-divider rounded" />
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">From prep to closing — Ria stays with the listing.</h2>
          <p className="text-text-secondary">Built to manage every stage of the listing lifecycle.</p>
        </div>

        <div className="relative mb-20">
          {/* The Line */}
          <div className="absolute top-6 left-0 w-full h-0.5 bg-divider -translate-y-1/2" />
          <motion.div
            className="absolute top-6 left-0 h-0.5 bg-brand-blue -translate-y-1/2 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Elite Version: Flowing Energy Effect */}
          <motion.div
            className="absolute top-6 left-0 h-0.5 bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-y-1/2 w-32 blur-sm z-10"
            animate={{
              left: ["-10%", "110%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 1
            }}
          />

          {/* Nodes */}
          <div className="relative flex justify-between">
            {stages.map((stage, i) => {
              const isActive = activeStage === i;
              const isSoon = stage.status === "Soon";
              const isPast = activeStage > i;

              return (
                <div key={stage.id} className="flex flex-col items-center">
                  <button
                    onClick={() => setActiveStage(i)}
                    className={`group relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${isActive
                      ? "bg-brand-blue text-white shadow-xl shadow-brand-blue/30 scale-110"
                      : isPast
                        ? "bg-brand-blue/10 border-2 border-brand-blue text-brand-blue"
                        : "bg-white border-2 border-divider text-text-muted hover:border-brand-blue/30"
                      } ${isSoon && !isActive ? "opacity-50" : ""}`}
                  >
                    <stage.icon className="w-5 h-5" />
                    {isSoon && (
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-bg-accent text-text-muted text-[8px] font-bold rounded-full border border-divider whitespace-nowrap">
                        SOON
                      </span>
                    )}
                    {isActive && (
                      <motion.div
                        layoutId="activeGlow"
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
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-8 bg-bg-primary/30"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-2 py-1 bg-brand-blue/10 text-brand-blue text-[10px] font-bold rounded mb-4">
                    PHASE 0{activeStage + 1}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{stages[activeStage].id}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-6">
                    {stages[activeStage].desc}
                  </p>
                  <ul className="space-y-3">
                    {activeStage === 0 && ["Document scanning", "Data extraction", "Checklist automation"].map(item => (
                      <li key={item} className="flex items-center gap-2 text-xs text-text-secondary">
                        <CheckCircle2 className="w-3 h-3 text-status-success" /> {item}
                      </li>
                    ))}
                    {activeStage === 1 && ["MLS rule validation", "AI remark generation", "Media auto-tagging"].map(item => (
                      <li key={item} className="flex items-center gap-2 text-xs text-text-secondary">
                        <CheckCircle2 className="w-3 h-3 text-status-success" /> {item}
                      </li>
                    ))}
                    {activeStage >= 2 && ["Future integration", "Brokerage requests", "Coming 2026"].map(item => (
                      <li key={item} className="flex items-center gap-2 text-xs text-text-muted italic">
                        <div className="w-1 h-1 bg-divider rounded-full" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-divider shadow-sm">
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

export const WatchRiaThinkSection = ({ isDemoPage = false }: { isDemoPage?: boolean }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 6000); // 6 seconds per step to allow animations to play out

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div id={isDemoPage ? undefined : "how-it-works"}>
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
            className="text-5xl md:text-6xl font-bold tracking-tight text-text-primary mb-6"
          >
            Watch Ria think.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-text-secondary"
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
            <h5 className="font-bold text-sm mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-blue" />
              Operational Intelligence
            </h5>
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
                  onClick={() => {
                    setActiveStep(i);
                    setIsPaused(true);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${activeStep === i ? "w-6 bg-brand-blue" : "bg-divider"}`}
                />
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

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Simple Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">Ria</span>
          </Link>
          <Link to="/" className="text-sm font-medium text-text-secondary hover:text-brand-blue transition-colors">
            Back to Home
          </Link>
        </div>
      </nav>

      <main className="relative">
        <WatchRiaThinkSection isDemoPage={true} />

        <RoleSwitcher />

        <JourneyTimeline />

        <VisualIntelligenceStudio />

        {/* Final CTA on Demo Page */}
        <section className="py-32 bg-white border-t border-divider">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold tracking-tight mb-6">Ready to automate your workflow?</h2>
            <p className="text-lg text-text-secondary mb-10">Join 5,000+ agents using Ria to go live faster.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">Get Started with Ria</button>
              <Link to="/" className="btn-secondary flex items-center justify-center gap-2">
                Back to Home
              </Link>
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
