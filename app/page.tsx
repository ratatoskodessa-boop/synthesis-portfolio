'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

// --- КОМПОНЕНТ: Header ---
function Header() {
  return (
    <motion.header initial={{ y: -100 }} animate={{ y: 0 }} className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 backdrop-blur-md bg-background/50 border-b border-foreground/10">
      <div className="font-syne font-bold text-xl tracking-tight">Synthesis</div>
      <nav className="hidden md:flex gap-8 font-medium text-sm text-foreground/80">
        <a href="#work" className="hover:text-amber transition-colors">Showcases</a>
        <a href="#team" className="hover:text-amber transition-colors">Team</a>
        <a href="#contacts" className="hover:text-amber transition-colors">Contacts</a>
      </nav>
      <button className="px-5 py-2 rounded-full bg-foreground text-background text-sm font-medium hover:bg-amber hover:text-foreground transition-all">
        Let's talk
      </button>
    </motion.header>
  );
}

// --- КОМПОНЕНТ: Hero ---
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <motion.div animate={{ scale: [1, 1.2, 1], x: [0, 50, -50, 0], y: [0, -50, 50, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-mint/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
      <motion.div animate={{ scale: [1, 1.3, 1], x: [0, -60, 40, 0], y: [0, 60, -40, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] bg-cyan/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="font-syne text-6xl md:text-8xl font-extrabold tracking-tighter leading-tight text-foreground mb-6">
          Where ideas <br /> come together.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-lg md:text-xl text-foreground/80 max-w-2xl mb-10 leading-relaxed">
          We're Synthesis, Syngenta's in-house digital studio. We bring products, design, and markets together into landing pages, microsites, and campaigns that teams and clients genuinely love.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex gap-4">
          <button className="px-8 py-4 rounded-full bg-foreground text-background font-medium hover:bg-mint transition-colors cursor-pointer">Start a project</button>
          <button className="px-8 py-4 rounded-full border border-foreground/20 font-medium hover:border-amber transition-colors backdrop-blur-sm cursor-pointer">See our work</button>
        </motion.div>
      </div>
    </section>
  );
}

// --- КОМПОНЕНТ: About ---
function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const bgChange = useTransform(scrollYProgress, [0, 0.5, 1], ['#F4F6F8', '#2D3339', '#F4F6F8']);
  const textChange = useTransform(scrollYProgress, [0, 0.5, 1], ['#2D3339', '#F4F6F8', '#2D3339']);
  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.8, 1], [0, 1, 1]);

  return (
    <motion.section ref={containerRef} style={{ backgroundColor: bgChange, color: textChange }} className="relative h-[300vh] transition-colors duration-300">
      <div className="sticky top-0 h-screen flex flex-col justify-center items-center px-8 text-center max-w-5xl mx-auto overflow-hidden">
        <motion.div style={{ opacity: opacity1 }} className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
          <h2 className="font-syne text-5xl md:text-7xl font-bold mb-6">The sum is greater than its parts.</h2>
          <p className="text-xl md:text-2xl max-w-3xl leading-relaxed">Synthesis was born inside Syngenta from one simple belief: the best digital work happens when the right people, ideas, and craft come together.</p>
        </motion.div>
        <motion.div style={{ opacity: opacity2 }} className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
          <h2 className="font-syne text-5xl md:text-7xl font-bold mb-6 text-mint">Not an external vendor.</h2>
          <p className="text-xl md:text-2xl max-w-3xl leading-relaxed">Our superpower is combining a warm, human way of working with a premium standard of execution.</p>
        </motion.div>
        <motion.div style={{ opacity: opacity3 }} className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
          <h3 className="font-syne text-3xl font-bold mb-8 text-cyan">What we believe</h3>
          <p className="text-2xl md:text-4xl font-syne max-w-4xl leading-snug">
            Good design is respect for someone's time. <br/> Simplicity is harder than complexity. <br/> And nothing great is ever built alone.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}

// --- КОМПОНЕНТ: Showcases ---
function Showcases() {
  const [hovered, setHovered] = useState<number | null>(null);
  const mouseX = useSpring(0, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 20 });

  const projects = [
    { name: 'Baloric', desc: 'A product launch page built from scratch. [+45% time on page]', color: 'bg-mint' },
    { name: 'Vaniva', desc: 'A product hub that became a template. [12 markets]', color: 'bg-cyan' },
    { name: 'Vixeran', desc: 'An interactive microsite with character. [+30% engagement]', color: 'bg-amber' },
    { name: 'DDG Hyvido', desc: 'A campaign page for hybrid barley. [+25% in leads]', color: 'bg-mint' }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section id="work" className="py-32 px-8 relative max-w-7xl mx-auto">
      <h2 className="font-syne text-5xl md:text-6xl font-bold mb-16 border-b border-foreground/10 pb-8">Work we're proud of.</h2>
      <div className="relative">
        {projects.map((proj, i) => (
          <div key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-foreground/10 cursor-pointer">
            <h3 className="font-syne text-4xl md:text-5xl font-medium transition-transform group-hover:translate-x-4">{proj.name}</h3>
            <p className="text-foreground/60 text-lg md:text-xl font-medium mt-2 md:mt-0">{proj.desc}</p>
          </div>
        ))}
      </div>
      <motion.div style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }} className="fixed top-0 left-0 pointer-events-none z-50 hidden md:block">
        <motion.div animate={{ opacity: hovered !== null ? 1 : 0, scale: hovered !== null ? 1 : 0.8 }} className={`w-72 h-48 rounded-2xl backdrop-blur-xl bg-white/40 border border-white/50 shadow-2xl flex items-center justify-center overflow-hidden ${hovered !== null ? projects[hovered].color : 'bg-transparent'}`}>
          <span className="font-syne font-bold text-background text-2xl mix-blend-exclusion">{hovered !== null ? projects[hovered].name : ''}</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

// --- КОМПОНЕНТ: Team ---
function Team() {
  const team = ["Aarav Nair", "Priya Menon", "Sofiia Hrytsenko", "Maksym Bondar", "Jordan Bennett", "Mia Carter"];
  return (
    <section id="team" className="py-24 bg-foreground text-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 mb-16">
        <h2 className="font-syne text-4xl md:text-5xl font-bold mb-4">A professional team, working across the globe.</h2>
        <p className="text-xl text-background/70">Spread across India, Ukraine, the USA, and Switzerland.</p>
      </div>
      <div className="relative flex whitespace-nowrap">
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 20 }} className="flex gap-16 font-syne text-7xl md:text-9xl font-bold opacity-20">
          {[...team, ...team].map((member, i) => <span key={i} className="hover:text-amber transition-colors cursor-default">{member}</span>)}
        </motion.div>
      </div>
    </section>
  );
}

// --- КОМПОНЕНТ: CTA & Footer ---
function CTAAndFooter() {
  return (
    <>
      <section id="contacts" className="py-32 px-8 flex flex-col items-center justify-center text-center">
        <h2 className="font-syne text-5xl md:text-7xl font-bold mb-6">Got an idea? <br/> Let's bring it together.</h2>
        <motion.button whileHover="hover" variants={{ hover: { borderRadius: ["20%", "40% 60% 70% 30%", "30% 70% 50% 50%", "50%"] } }} transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }} style={{ borderRadius: "50rem" }} className="relative mt-12 group px-12 py-8 bg-mint text-foreground font-syne font-bold text-2xl cursor-pointer">
          <span className="relative z-10 group-hover:scale-110 transition-transform inline-block">Start a project</span>
        </motion.button>
      </section>
      <footer className="bg-background pt-24 pb-8 px-8 border-t border-foreground/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm font-medium text-foreground/50 group">
          <p className="group-hover:text-foreground transition-colors duration-500">Synthesis, part of Syngenta GDM.</p>
          <p className="group-hover:text-foreground transition-colors duration-500">Made together, around the world.</p>
        </div>
      </footer>
    </>
  );
}

// --- ГОЛОВНА СТОРІНКА (Збирає все разом) ---
export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <Header />
      <Hero />
      <About />
      <Showcases />
      <Team />
      <CTAAndFooter />
    </main>
  );
}
