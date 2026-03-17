/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Menu, 
  X, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  BookOpen, 
  ClipboardCheck,
  GraduationCap,
  MessageSquare,
  ArrowUp,
  Youtube
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Constants
const PHONE_NUMBER = "+91 77976 15088";
const PHONE_CLICKABLE = "tel:+917797615088";
const TUTOR_NAME = "Mamon Aktar";
const YOUTUBE_URL = "https://youtube.com/@mamunakhtar8866?si=lerIG5jer97z4TTt";

const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg 
    viewBox="0 0 448 512" 
    width={size} 
    height={size} 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.1 0-65.6-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.5-11.3 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.3 3.7-5.6 5.5-9.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.5 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
  </svg>
);

const HERO_IMAGES = [
  { url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1920", alt: "Physics Formulas" },
  { url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=1920", alt: "Deep Space Galaxy" },
  { url: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&q=80&w=1920", alt: "Black Hole in Space" },
  { url: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=1920", alt: "Scientific Equipment" },
  { url: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80&w=1920", alt: "Atomic Model" },
  { url: "https://picsum.photos/seed/isaacnewton/1920/1080", alt: "Sir Isaac Newton" },
  { url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1920", alt: "Laboratory Apparatus" },
  { url: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=1920", alt: "Scientific Research" },
];

const NAV_ITEMS = ["Home", "About", "Classes", "Teaching", "Mock Tests", "Location", "Contact"];

const FadeInSection = ({ children, className = "" }: { children: React.ReactNode, className?: string, key?: React.Key }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const { current } = domRef;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div
      className={`fade-in-section ${isVisible ? 'is-visible' : ''} ${className}`}
      ref={domRef}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('theme');
        if (saved) return saved === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
    } catch (e) {
      console.warn("LocalStorage access denied, using defaults.");
    }
    return true;
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Theme Toggle - Targets documentElement for Tailwind and persists to localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      try {
        localStorage.setItem('theme', 'dark');
      } catch (e) {}
    } else {
      root.classList.remove('dark');
      try {
        localStorage.setItem('theme', 'light');
      } catch (e) {}
    }
  }, [isDark]);

  // Slider Logic
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
  };

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(nextSlide, 4000);
      return () => clearInterval(timer);
    }
  }, [isPaused, nextSlide]);

  // Keyboard Navigation for Slider
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide]);

  // Back to Top Visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300 font-sans selection:bg-cyan-500/30">
      
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <span className="text-2xl font-bold tracking-tighter text-cyan-600 dark:text-cyan-400">M.A Physics</span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
              {NAV_ITEMS.map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-sm font-medium hover:text-cyan-500 transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <a 
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-500 transition-colors"
                aria-label="YouTube Channel"
              >
                <Youtube size={22} />
              </a>
              <a 
                href={`https://wa.me/${PHONE_NUMBER.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-[#25D366] transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon size={22} />
              </a>
              <button 
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="block px-3 py-4 text-base font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-20">
        
        {/* Hero Section */}
        <section 
          id="home" 
          className="relative h-[80vh] min-h-[600px] overflow-hidden group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          aria-roledescription="carousel"
          aria-label="Physics Tuition Hero Slider"
        >
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${currentSlide + 1} of ${HERO_IMAGES.length}`}
              >
                <img 
                  src={HERO_IMAGES[currentSlide].url} 
                  alt={HERO_IMAGES[currentSlide].alt}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/60" />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight max-w-4xl"
            >
              Master Physics with Careful Concept-Based Teaching
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-2xl text-cyan-100 mb-8 max-w-2xl font-light"
            >
              Concept clarity • Problem solving • Mock tests • Classes for Class 11 & 12
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <a 
                href="#contact"
                className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-cyan-600/20"
              >
                Enquire Now
              </a>
            </motion.div>
          </div>

          {/* Slider Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
            {HERO_IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all ${idx === currentSlide ? 'w-8 bg-cyan-400' : 'bg-white/40'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-4 bg-neutral-50 dark:bg-neutral-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <FadeInSection>
                <h2 className="text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-4">About the Tutor</h2>
                <h3 className="text-4xl font-bold mb-6">{TUTOR_NAME}</h3>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
                  Mamon Aktar is an experienced physics tutor with a strong academic background. He focuses on clear concept delivery, worked examples, and regular mock tests to prepare students for boards and competitive exams.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: <Award size={20} />, text: "B.Sc (Hons. in Physics)" },
                    { icon: <Award size={20} />, text: "M.Sc (Particle Physics)" },
                    { icon: <Award size={20} />, text: "B.Ed" },
                    { icon: <Award size={20} />, text: "Bihar STET Qualified" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-3 text-neutral-700 dark:text-neutral-300">
                      <div className="text-cyan-500">{item.icon}</div>
                      <span className="text-sm font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </FadeInSection>
              <FadeInSection className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl group">
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} className="w-full h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=1000" 
                    alt="Physics Education"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-cyan-600/10 mix-blend-overlay pointer-events-none" />
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* Classes Section */}
        <section id="classes" className="py-24 px-4">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <FadeInSection>
              <h2 className="text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-4">Tuition Classes</h2>
              <h3 className="text-4xl font-bold">Focused Learning for Class 11 & 12</h3>
            </FadeInSection>
          </div>
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              { 
                title: "Class 11 Physics", 
                desc: "Building strong foundations in Mechanics, Thermodynamics, and Waves.",
                features: ["Basic to Advanced Concepts", "Numerical Problem Solving", "Foundation for JEE/NEET"]
              },
              { 
                title: "Class 12 Physics", 
                desc: "In-depth study of Electromagnetism, Optics, and Modern Physics.",
                features: ["Board Exam Focused", "Derivation Mastery", "Regular Revision Cycles"]
              }
            ].map((cls, i) => (
              <FadeInSection 
                key={i}
                className="h-full"
              >
                <motion.div 
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="p-8 h-full rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-cyan-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/10 group"
                >
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-500 mb-6 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                    <BookOpen size={24} />
                  </div>
                  <h4 className="text-2xl font-bold mb-4">{cls.title}</h4>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6">{cls.desc}</p>
                  <ul className="space-y-3">
                    {cls.features.map((f, j) => (
                      <li key={j} className="flex items-center space-x-3 text-sm">
                        <CheckCircle2 size={16} className="text-cyan-500" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </section>

        {/* Teaching Method Section */}
        <section id="teaching" className="py-24 px-4 bg-neutral-950 text-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500 rounded-full blur-[120px]" />
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <FadeInSection className="text-center mb-16">
              <h2 className="text-sm font-bold uppercase tracking-widest text-cyan-400 mb-4">Teaching Approach</h2>
              <h3 className="text-4xl font-bold">How We Master Physics</h3>
            </FadeInSection>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  icon: <GraduationCap size={32} />, 
                  title: "Concept First", 
                  desc: "Lessons with visual diagrams and real-world examples for intuitive understanding." 
                },
                { 
                  icon: <MessageSquare size={32} />, 
                  title: "Doubt Clearing", 
                  desc: "Dedicated sessions to resolve every query and ensure no student is left behind." 
                },
                { 
                  icon: <ClipboardCheck size={32} />, 
                  title: "Problem Solving", 
                  desc: "Step-by-step strategies for board exams and competitive entrance tests." 
                },
                { 
                  icon: <Award size={32} />, 
                  title: "Exam Temperament", 
                  desc: "Building confidence through regular practice and timed assessments." 
                }
              ].map((method, i) => (
                <FadeInSection 
                  key={i}
                  className="text-center p-6 cursor-default transition-colors"
                >
                  <motion.div whileHover={{ y: -12, scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }} className="group">
                    <motion.div 
                      initial={{ rotate: -15, scale: 0.5, opacity: 0 }}
                      whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
                      whileHover={{ rotate: 12, scale: 1.15 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 260, damping: 20, delay: i * 0.1 }}
                      className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 text-cyan-400 mb-6 group-hover:bg-cyan-400/20 group-hover:text-cyan-300 transition-colors"
                    >
                      {method.icon}
                    </motion.div>
                    <h4 className="text-xl font-bold mb-3">{method.title}</h4>
                    <p className="text-neutral-400 text-sm leading-relaxed">{method.desc}</p>
                  </motion.div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* Mock Tests Section */}
        <section id="mock-tests" className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <FadeInSection className="bg-cyan-600 rounded-3xl p-8 md:p-16 text-white overflow-hidden relative">
              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-widest text-cyan-100 mb-4">Mock Tests</h2>
                  <h3 className="text-4xl font-bold mb-6">Regular Performance Evaluation</h3>
                  <p className="text-lg text-cyan-50 mb-8">
                    Structured mock tests with detailed solutions and performance feedback. We conduct weekly chapter-wise tests and monthly full-syllabus simulations.
                  </p>
                  <ul className="space-y-4">
                    {["Chapter-wise assessments", "Full syllabus mock exams", "Detailed performance analysis", "Time management training"].map((item, i) => (
                      <li key={i} className="flex items-center space-x-3">
                        <CheckCircle2 size={20} className="text-cyan-200" />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="hidden md:block">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-xl font-bold">Test Schedule</span>
                      <span className="px-3 py-1 bg-white/20 rounded-full text-xs">Upcoming</span>
                    </div>
                    <div className="space-y-6">
                      {[
                        { date: "Every Sunday", subject: "Chapter Mock Test" },
                        { date: "Monthly End", subject: "Unit Assessment" },
                        { date: "Quarterly", subject: "Full Syllabus Simulation" },
                      ].map((test, i) => (
                        <div key={i} className="flex items-center justify-between border-b border-white/10 pb-4 last:border-0">
                          <div>
                            <div className="text-sm font-bold">{test.subject}</div>
                            <div className="text-xs text-cyan-100">{test.date}</div>
                          </div>
                          <ChevronRight size={16} className="text-cyan-200" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative circle */}
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            </FadeInSection>
          </div>
        </section>

        {/* Location Section */}
        <section id="location" className="py-24 px-4 bg-neutral-50 dark:bg-neutral-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <FadeInSection>
                <h2 className="text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-4">Location & Timings</h2>
                <h3 className="text-4xl font-bold mb-8">Visit Our Classroom</h3>
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-500 mt-1">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Address</h4>
                      <p className="text-neutral-600 dark:text-neutral-400">Bhabta 118 no Railgate, Beldanga, Murshidabad</p>
                      <p className="text-neutral-600 dark:text-neutral-400 mt-1">In-person classes for Class 11 & 12.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-500 mt-1">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Contact for Timings</h4>
                      <p className="text-neutral-600 dark:text-neutral-400">Batch timings vary by class. Please call to confirm available slots.</p>
                      <a href={PHONE_CLICKABLE} className="text-cyan-600 dark:text-cyan-400 font-bold mt-2 inline-block hover:underline">
                        {PHONE_NUMBER}
                      </a>
                    </div>
                  </div>
                </div>
              </FadeInSection>
              <FadeInSection className="bg-white dark:bg-neutral-900 p-4 rounded-3xl shadow-xl border border-neutral-200 dark:border-neutral-800 transition-all duration-300 hover:shadow-2xl">
                <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                  <div className="aspect-video rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex flex-col items-center justify-center text-neutral-400 space-y-4">
                    <MapPin size={48} className="text-cyan-500" />
                    <div className="text-center px-8">
                      <p className="font-bold text-neutral-900 dark:text-white mb-2">Bhabta 118 no Railgate</p>
                      <p className="text-sm">Static map placeholder. Replace with actual map image at /assets/location/map.png</p>
                    </div>
                  </div>
                </motion.div>
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FadeInSection>
              <h2 className="text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-4">Contact</h2>
              <h3 className="text-4xl md:text-5xl font-bold mb-8">Ready to Start Your Physics Journey?</h3>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-12">
                Enrol now for the upcoming batches. Call or WhatsApp to enquire about fees, schedule, and mock tests.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a 
                  href={PHONE_CLICKABLE}
                  className="w-full sm:w-auto px-10 py-5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full font-bold text-lg flex items-center justify-center space-x-3 hover:scale-105 transition-transform shadow-xl"
                >
                  <Phone size={24} />
                  <span>Call {PHONE_NUMBER}</span>
                </a>
                <a 
                  href={`https://wa.me/${PHONE_NUMBER.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-10 py-5 border-2 border-[#25D366] text-[#25D366] rounded-full font-bold text-lg flex items-center justify-center space-x-3 hover:bg-[#25D366] hover:text-white transition-all shadow-lg hover:shadow-[#25D366]/20"
                >
                  <WhatsAppIcon size={28} />
                  <span>WhatsApp Us</span>
                </a>
              </div>
              
              <p className="mt-12 text-sm text-neutral-500 dark:text-neutral-500">
                This site is informational only. Contact via phone for tuition enquiries.
              </p>
            </FadeInSection>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="pt-12 pb-24 md:pb-12 px-4 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="text-xl font-bold tracking-tighter">M.A Physics</div>
            <a 
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-500 transition-colors"
              aria-label="YouTube Channel"
            >
              <Youtube size={20} />
            </a>
            <a 
              href={`https://wa.me/${PHONE_NUMBER.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-[#25D366] transition-colors"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon size={20} />
            </a>
          </div>
          <div className="text-sm text-neutral-500 dark:text-neutral-500">
            © {new Date().getFullYear()} M.A Physics by Mamon Aktar. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {NAV_ITEMS.map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-xs font-medium hover:text-cyan-500 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": TUTOR_NAME,
          "jobTitle": "Physics Tutor",
          "description": "Concept-based Physics Tuition for Class 11 & 12",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bhabta",
            "addressRegion": "Murshidabad",
            "streetAddress": "118 no Railgate"
          },
          "telephone": PHONE_NUMBER,
          "hasCredential": [
            "B.Sc (Hons. in Physics)",
            "M.Sc (Special in Particle Physics)",
            "B.Ed"
          ]
        })}
      </script>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-8 left-8 z-50">
        <motion.a
          initial={{ opacity: 0, scale: 0.5, x: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          href={`https://wa.me/${PHONE_NUMBER.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 bg-[#25D366] text-white rounded-full shadow-2xl transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center group"
          aria-label="Chat on WhatsApp"
        >
          <WhatsAppIcon size={28} />
          <span className="absolute left-full ml-4 px-3 py-1 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none">
            WhatsApp Us
          </span>
        </motion.a>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full shadow-2xl transition-all transform hover:scale-110 active:scale-95"
            aria-label="Back to top"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
