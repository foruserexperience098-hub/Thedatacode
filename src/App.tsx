/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  ArrowRight, 
  Target, 
  BarChart3, 
  MessageSquare, 
  Layers, 
  Cpu, 
  Users, 
  Zap, 
  Mail, 
  Linkedin, 
  Github,
  ExternalLink,
  ChevronRight,
  Code,
  Layout,
  Search,
  Workflow,
  FileText
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Types ---

interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  clients?: { name: string; role: string; points: string[] }[];
}

interface Project {
  title: string;
  tag: string;
  role: string;
  metrics: string;
  description: string;
}

// --- Data ---

const EXPERIENCES: Experience[] = [
  {
    company: "Seattle Software Developers",
    role: "GTM & Content Strategist",
    period: "Feb 2023 - June 2024",
    location: "Seattle, WA",
    description: "Led go-to-market strategy, messaging, and content execution for B2B and B2C clients across AutoTech (IoT), mental healthcare, safety, and e-commerce.",
    highlights: [
      "Developed GTM for enterprise dynamic pricing engine ($250K revenue opportunity)",
      "Increased high-intent lead capture by 15% via targeted content funnels",
      "Reduced post-launch churn by 20% through improved onboarding content",
      "Streamlined AI Content Chains using Multi-Modal prompting; increased content velocity by 40%",
      "Directed end-to-end launch readiness for high-stakes client releases"
    ],
    clients: [
      {
        name: "SafeLot",
        role: "Brand Strategy Consultant",
        points: [
          "Designed market entry infrastructure for early-stage IoT SaaS",
          "Structured comprehensive messaging framework for core IoT solutions",
          "Defined 'Safety & Efficiency' market identity to cultivate institutional trust"
        ]
      },
      {
        name: "Grace MindCare",
        role: "Strategy Consultant",
        points: [
          "Formulated foundational market positioning and patient-acquisition strategy",
          "Systematized a scalable service portfolio (Ketamine, IV Therapy, Autism Evals)",
          "Crystallized industry credibility via content ecosystem of press narratives"
        ]
      },
      {
        name: "Safety & Women-Focused Initiatives",
        role: "Messaging Lead",
        points: [
          "Guided trust-focused and empathy-led messaging for vulnerable communities",
          "Contributed to early-stage product positioning for safety-focused platforms"
        ]
      }
    ]
  },
  {
    company: "Hewlett Packard Enterprise (HPE)",
    role: "Product Content & Enablement",
    period: "Jan 2022 - Nov 2022",
    location: "India",
    description: "Led product analysis and customer-facing enablement content for Aruba Central, improving user adoption for 10,000+ enterprise users.",
    highlights: [
      "Led 8-person team through platform relaunch using JTBD framework",
      "Resulted in 15% MRR increase and 20% reduction in onboarding friction",
      "Drove strategy for analytics dashboard generating $50K+ new MRR via RICE prioritization",
      "Redesigned Information Architecture and AI chatbot, reducing support tickets by 23%",
      "Awarded GEM recognition for digital experience initiatives"
    ]
  },
  {
    company: "Tata Consultancy Services (TCS)",
    role: "Product Analyst",
    period: "Jun 2017 - Dec 2021",
    location: "India",
    description: "Executed SAP S/4HANA implementation and SolMan content activation; utilized SAP SLT for real-time data replication.",
    highlights: [
      "Managed high-stakes SAP content deployments ensuring zero-latency transitions",
      "Authored SAP Conversational AI chatbot and 200+ article digital knowledge base",
      "Mentored junior analysts and promoted to lead enterprise deployment projects",
      "Recognized with multiple GEM awards for project excellence"
    ]
  }
];

const PROJECTS: Project[] = [
  {
    title: "Auvra App Relaunch",
    tag: "Mental Healthcare",
    role: "Brand & Strategy Lead",
    metrics: "25% Retention Increase",
    description: "Synthesized patient feedback in Figma to architect an empathy-led onboarding roadmap, reducing service ambiguity."
  },
  {
    title: "User Growth & Engagement",
    tag: "Hugging Face",
    role: "UX/UI Lead",
    metrics: "25% Engagement Surge",
    description: "Led UX/UI redesign in Figma; utilized SQL and A/B testing to simplify technical onboarding, delivering 10% lift in sign-ups."
  },
  {
    title: "Sustainable AI",
    tag: "Brand Strategy",
    role: "Lead Strategist",
    metrics: "15% Waste Reduction",
    description: "Formulated a 'Green-AI' positioning strategy translating technical cloud-optimization into a market narrative."
  },
  {
    title: "AI-Powered Workflow Tracker",
    tag: "Deloitte",
    role: "Data Strategist",
    metrics: "Sentiment-Driven Insights",
    description: "Created a Tableau dashboard and communication strategy utilizing Power BI to translate complex workforce metrics."
  }
];

const HIGHLIGHTS = [
  { title: "Cross-Industry GTM", desc: "Developed brand messaging for AutoTech, HealthTech, and E-commerce portfolios." },
  { title: "Customer Lifecycle", desc: "Optimized end-to-end journey for 10,000+ enterprise customers, reducing friction." },
  { title: "Impact Optimization", desc: "Designed roadmaps that increased engagement by 25% and reduced churn by 20%." },
  { title: "Content Leadership", desc: "Led cross-functional teams to ensure consistent brand messaging across global launches." }
];

const COMPETENCIES = [
  { icon: Target, title: "GTM Strategy", desc: "Go-to-Market execution for B2B SaaS" },
  { icon: MessageSquare, title: "Product Messaging", desc: "Translating complex tech into clear narratives" },
  { icon: Users, title: "Journey Mapping", desc: "Optimizing end-to-end user adoption" },
  { icon: BarChart3, title: "Marketing Analytics", desc: "Data-informed insights via GA4 & SQL" },
  { icon: Workflow, title: "Content Operations", desc: "Workflow optimization & AI Content Chains" },
  { icon: Layout, title: "UX/UI Strategy", desc: "High-fidelity wireframing & user research" }
];

// --- Components ---

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-12">
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="flex items-center gap-4 mb-2"
    >
      <div className="h-[1px] w-12 bg-accent" />
      <span className="text-accent font-mono text-xs uppercase tracking-widest">{subtitle || "Section"}</span>
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-4xl md:text-6xl font-serif italic"
    >
      {title}
    </motion.h2>
  </div>
);

const StrategyPulse = () => {
  const [activeNode, setActiveNode] = useState(0);
  const nodes = [
    { label: "GTM Launch", status: "Active", color: "bg-green-500" },
    { label: "Content Audit", status: "Optimizing", color: "bg-accent" },
    { label: "Lead Gen", status: "15% Growth", color: "bg-blue-500" },
    { label: "Churn Rate", status: "-20% Reduc", color: "bg-red-500" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % nodes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-2 p-4 glass rounded-xl w-48 absolute -bottom-12 -right-12 z-20 hidden md:flex">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[8px] font-mono uppercase tracking-widest text-muted">Strategy Pulse</span>
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
      </div>
      {nodes.map((node, i) => (
        <div key={i} className={cn("flex items-center justify-between gap-4 transition-opacity duration-500", activeNode === i ? "opacity-100" : "opacity-30")}>
          <span className="text-[10px] font-mono">{node.label}</span>
          <span className={cn("text-[8px] font-mono px-1.5 py-0.5 rounded-full text-bg", node.color)}>{node.status}</span>
        </div>
      ))}
    </div>
  );
};

const ExperienceCard = ({ exp, index, isPrinting }: { exp: Experience; index: number; isPrinting?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative border-b border-white/10 py-12 cursor-pointer overflow-hidden print:border-gray-200"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-muted font-mono text-xs">{exp.period}</span>
            <span className="h-1 w-1 rounded-full bg-accent" />
            <span className="text-muted font-mono text-xs">{exp.location}</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-medium group-hover:text-accent transition-colors print:text-black">
            {exp.company}
          </h3>
          <p className="text-muted mt-1 italic font-serif print:text-gray-600">{exp.role}</p>
        </div>
        
        <div className="flex items-center gap-4 print:hidden">
          <motion.div 
            animate={{ rotate: isOpen ? 90 : 0 }}
            className="p-2 rounded-full border border-white/10 group-hover:border-accent/50 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {(isOpen || isPrinting) && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden ExperienceCard-content"
          >
            <div className="pt-8 grid md:grid-cols-2 gap-8 print:grid-cols-1">
              <div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6 print:text-gray-700">
                  {exp.description}
                </p>
                <ul className="space-y-3">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm print:text-gray-800">
                      <Zap className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {exp.clients && (
                <div className="space-y-6 print:mt-4">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-accent">Strategic Consulting</h4>
                  {exp.clients.map((client, i) => (
                    <div key={i} className="p-4 rounded-lg bg-white/5 border border-white/5 print:bg-gray-50 print:border-gray-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium print:text-black">{client.name}</span>
                        <span className="text-[10px] font-mono text-muted uppercase">{client.role}</span>
                      </div>
                      <ul className="space-y-2">
                        {client.points.map((p, pi) => (
                          <li key={pi} className="text-xs text-muted leading-relaxed flex gap-2 print:text-gray-700">
                            <span className="text-accent">→</span> {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hover Background Effect */}
      <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/[0.02] transition-colors -z-0 print:hidden" />
    </motion.div>
  );
};

export default function App() {
  const [isPrinting, setIsPrinting] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const handleBeforePrint = () => setIsPrinting(true);
    const handleAfterPrint = () => setIsPrinting(false);

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, []);

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-bg selection:bg-accent selection:text-bg">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 border-b border-white/5 bg-bg/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center font-mono font-bold text-bg">AS</div>
            <span className="font-mono text-sm tracking-tighter hidden sm:block">AAKRITY SINGH</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#experience" className="text-xs font-mono uppercase tracking-widest hover:text-accent transition-colors">Experience</a>
            <a href="#projects" className="text-xs font-mono uppercase tracking-widest hover:text-accent transition-colors">Projects</a>
            <button 
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest hover:text-accent transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden md:inline">PDF</span>
            </button>
            <a href="mailto:reach2writer@gmail.com" className="p-2 rounded-full border border-white/10 hover:border-accent transition-colors">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 blur-[120px] rounded-full" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/5 text-accent text-[10px] font-mono uppercase tracking-widest mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                Available for Strategic Partnerships
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-8xl font-serif leading-[0.9] mb-8"
              >
                Strategic <br />
                <span className="italic text-accent">Storyteller.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl text-muted leading-relaxed max-w-xl mb-10"
              >
                Marketing strategist leveraging a foundation in systems analysis to drive cross-channel content strategy and digital engagement for B2B SaaS.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <button className="px-8 py-4 bg-accent text-bg font-bold rounded-sm hover:translate-y-[-2px] transition-transform flex items-center gap-2">
                  View Strategy Map <ArrowRight className="w-4 h-4" />
                </button>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  className="px-8 py-4 border border-white/10 hover:border-accent transition-colors rounded-sm flex items-center gap-2"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  className="px-8 py-4 border border-white/10 hover:border-accent transition-colors rounded-sm flex items-center gap-2"
                >
                  <Github className="w-4 h-4" /> GitHub
                </a>
              </motion.div>
            </div>
            
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="hidden lg:grid grid-cols-2 gap-4 relative"
              >
                <StrategyPulse />
                {COMPETENCIES.slice(0, 4).map((item, i) => (
                <div key={i} className="p-8 glass rounded-2xl hover:border-accent/50 transition-colors group">
                  <item.icon className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent" />
        </motion.div>
      </section>

      {/* Career Highlights Section */}
      <section className="py-32 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Career Highlights" subtitle="Impact" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HIGHLIGHTS.map((h, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 glass rounded-xl border border-white/5 hover:border-accent/30 transition-all"
              >
                <h4 className="font-bold text-accent mb-2">{h.title}</h4>
                <p className="text-xs text-muted leading-relaxed">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Matrix (Bento Grid) */}
      <section className="py-32 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Impact Matrix" subtitle="Capabilities" />
          
          <div className="grid md:grid-cols-3 gap-6">
            {COMPETENCIES.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 border border-white/5 bg-bg hover:border-accent/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-bg transition-colors">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Professional Journey" subtitle="Experience" />
          <div className="space-y-0">
            {EXPERIENCES.map((exp, i) => (
              <div key={exp.company + i}>
                <ExperienceCard exp={exp} index={i} isPrinting={isPrinting} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Strategic Initiatives" subtitle="Case Studies" />
          
          <div className="grid md:grid-cols-3 gap-8">
            {PROJECTS.map((project, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -10 }}
                className="relative group aspect-[4/5] overflow-hidden rounded-2xl border border-white/10"
              >
                {/* Background Image Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-bg" />
                <div className="absolute inset-0 bg-bg/60 backdrop-blur-[2px] group-hover:backdrop-blur-none transition-all" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-accent bg-accent/10 px-2 py-1 rounded">
                      {project.tag}
                    </span>
                  </div>
                  <h3 className="text-3xl font-serif italic mb-2">{project.title}</h3>
                  <p className="text-sm text-muted mb-6 line-clamp-2">{project.description}</p>
                  
                  <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-mono uppercase text-muted">Impact</p>
                      <p className="font-bold text-accent">{project.metrics}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-accent group-hover:text-bg transition-all">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills / Toolkit Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <SectionHeading title="The Toolkit" subtitle="Technical Stack" />
              <p className="text-xl text-muted leading-relaxed mb-12">
                Bridging the gap between creative strategy and technical execution with a modern stack of marketing and analysis tools.
              </p>
              
              <div className="space-y-8">
                {[
                  { label: "AI & Automation", skills: ["Agentic AI Workflows", "Multi-Modal Prompting", "AI Content Chains", "AI Chatbot Logic", "GenAI"] },
                  { label: "Marketing & Growth", skills: ["Brand Positioning", "GTM Strategy", "Content Lifecycle", "SEO (SEMrush)", "GA4"] },
                  { label: "Product & Design", skills: ["UX/UI (Figma)", "Wireframing", "JTBD Framework", "RICE Prioritization", "Agile/Scrum"] },
                  { label: "Data & Systems", skills: ["SQL", "Python", "Tableau", "Power BI", "SAP S/4HANA", "SLT"] }
                ].map((group, i) => (
                  <div key={i}>
                    <h4 className="font-mono text-[10px] uppercase tracking-widest text-accent mb-4">{group.label}</h4>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill, si) => (
                        <span key={si} className="px-3 py-1.5 rounded-sm border border-white/10 text-xs hover:border-accent/50 transition-colors cursor-default">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square glass rounded-3xl p-12 flex flex-col justify-center items-center text-center overflow-hidden">
                <div className="absolute inset-0 grid-pattern opacity-10" />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[120%] h-[120%] border border-dashed border-accent/20 rounded-full"
                />
                <div className="relative z-10">
                  <Cpu className="w-16 h-16 text-accent mb-6 mx-auto" />
                  <h3 className="text-3xl font-serif italic mb-4">Systems Thinking</h3>
                  <p className="text-muted max-w-xs mx-auto">
                    Leveraging a foundation in Computer Science to architect marketing ecosystems that scale.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Command Palette Simulation */}
      <div className="fixed bottom-6 right-6 z-50 hidden md:block">
        <div className="glass px-4 py-2 rounded-full flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-muted border border-white/10">
          <div className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10">⌘</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10">K</kbd>
          </div>
          <span>Strategy Console</span>
        </div>
      </div>

      {/* Footer / Contact */}
      <footer className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            <div>
              <h2 className="text-4xl md:text-6xl font-serif italic mb-4">Let's build <br /> the next narrative.</h2>
              <p className="text-muted font-mono text-sm">Bellevue, Washington • Global Availability</p>
            </div>
            
            <div className="flex flex-col gap-4">
              <a 
                href="mailto:reach2writer@gmail.com" 
                className="text-2xl md:text-4xl font-medium hover:text-accent transition-colors flex items-center gap-4"
              >
                reach2writer@gmail.com <ArrowRight className="w-8 h-8" />
              </a>
              <div className="flex gap-6 mt-4">
                <a href="#" className="text-muted hover:text-accent transition-colors font-mono text-xs uppercase tracking-widest">LinkedIn</a>
                <a href="#" className="text-muted hover:text-accent transition-colors font-mono text-xs uppercase tracking-widest">GitHub</a>
                <button 
                  onClick={handleDownloadPDF}
                  className="text-muted hover:text-accent transition-colors font-mono text-xs uppercase tracking-widest cursor-pointer"
                >
                  Resume PDF
                </button>
                <a href="#" className="text-muted hover:text-accent transition-colors font-mono text-xs uppercase tracking-widest">Twitter</a>
              </div>
            </div>
          </div>
          
          <div className="mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-mono text-muted uppercase tracking-widest">© 2026 AAKRITY SINGH • STRATEGY COMMAND CENTER</p>
            <p className="text-[10px] font-mono text-muted uppercase tracking-widest">Built with Precision & Empathy</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
