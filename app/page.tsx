'use client';

import { motion, useScroll, useTransform, useSpring, useMotionTemplate, AnimatePresence } from 'framer-motion';
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

'use client';

import { motion, useScroll, useTransform, useSpring, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

// --- КОМПОНЕНТ: Preloader (Seed to System) ---
function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Прелоадер зникає через 3.5 секунди
    const timer = setTimeout(() => setIsLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
        >
          <div className="relative flex items-center justify-center w-64 h-64">
            
            {/* Етап 1: Органічна форма (Насіння / Крапля) */}
            <motion.div
              initial={{ scale: 0, borderRadius: "50%", opacity: 1 }}
              animate={{ 
                scale: [0, 1, 1.2, 0], 
                borderRadius: ["50%", "40% 60% 70% 30%", "30% 70% 50% 50%", "10%"] 
              }}
              transition={{ duration: 1.5, ease: "easeInOut", times: [0, 0.4, 0.8, 1] }}
              className="absolute w-32 h-32 bg-mint/80 backdrop-blur-md"
            />

            {/* Етап 2: Наукова структура (Сітка / Вузли) */}
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -45 }}
              animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0], rotate: 0 }}
              transition={{ duration: 1.2, delay: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 grid grid-cols-3 gap-2 p-8"
            >
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-full h-full bg-cyan/60 rounded-sm" />
              ))}
            </motion.div>

            {/* Етап 3: Синтез (Поява логотипу) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 2.2, ease: "easeOut" }}
              className="absolute font-syne text-4xl font-bold tracking-tight text-foreground"
            >
              Synthesis
            </motion.div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
// --- КОМПОНЕНТ: Hero (Discovery Lens Effect) ---
function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Пружинна анімація для лінзи
  const mouseX = useSpring(0, { stiffness: 40, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 40, damping: 20 });
  const lensOpacity = useSpring(0, { stiffness: 40, damping: 15 });

  const handleMouseMove = (e: any) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => lensOpacity.set(1)}
      onMouseLeave={() => lensOpacity.set(0)}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-background cursor-crosshair"
    >
      
      {/* 1. БАЗОВИЙ ШАР (Чистий та людяний) */}
      <div className="absolute inset-0 z-0">
        <motion.div animate={{ scale: [1, 1.4, 1], x: ['0%', '20%', '0%'] }} transition={{ duration: 20, repeat: Infinity }} className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-pink-300/30 rounded-full mix-blend-multiply blur-[100px]" />
        <motion.div animate={{ scale: [1, 1.5, 1], x: ['0%', '-20%', '0%'] }} transition={{ duration: 25, repeat: Infinity }} className="absolute bottom-0 right-0 w-[45vw] h-[45vw] bg-emerald-300/30 rounded-full mix-blend-multiply blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <h1 className="font-syne text-6xl md:text-[7rem] font-extrabold tracking-tighter leading-[0.9] text-foreground mb-8">
          Where ideas <br /> come together.
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mb-12">
          We're Synthesis, Syngenta's in-house digital studio. We bring products, design, and markets together into landing pages, microsites, and campaigns that teams and clients genuinely love.
        </p>
      </div>

      {/* 2. НАУКОВИЙ ШАР (Прихований маскою, видимий через лінзу) */}
      <motion.div 
        className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center bg-[#1A1F24]"
        style={{
          opacity: lensOpacity,
          WebkitMaskImage: useMotionTemplate`radial-gradient(180px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`,
          maskImage: useMotionTemplate`radial-gradient(180px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`,
        }}
      >
        {/* Науковий бекграунд: CSS-сітка (можна замінити на SVG топографії) */}
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'linear-gradient(#A3D5B9 1px, transparent 1px), linear-gradient(90deg, #A3D5B9 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
        
        {/* Дублюємо контент, але в технологічному стилі */}
        <div className="relative max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
          <h1 className="font-syne text-6xl md:text-[7rem] font-extrabold tracking-tighter leading-[0.9] text-mint mb-8 uppercase" style={{ WebkitTextStroke: '1px #A3D5B9', color: 'transparent' }}>
            Where ideas <br /> come together.
          </h1>
          <p className="text-lg md:text-xl text-mint/80 max-w-2xl mb-12 font-mono text-sm uppercase tracking-widest">
            [ DATA_NODE: SYNTHESIS_STUDIO ] <br/>
            AGGREGATING PRODUCTS, DESIGN, AND MARKETS. <br/>
            STATUS: ACTIVE.
          </p>
        </div>
      </motion.div>

      {/* Кнопки поверх усього */}
      <div className="absolute bottom-20 z-30 flex gap-4 pointer-events-auto">
        <button className="px-8 py-4 rounded-full bg-foreground text-background font-medium hover:scale-105 transition-transform shadow-lg">Start a project</button>
        <button className="px-8 py-4 rounded-full border border-foreground/20 font-medium hover:bg-white/50 backdrop-blur-md transition-colors">See our work</button>
      </div>

    </section>
  );
}
// --- КОМПОНЕНТ: About ---
function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  
  // Плавний перехід через кольори Hero (Пастельний рожевий -> синій -> зелений)
  const bgChange = useTransform(scrollYProgress, 
    [0, 0.25, 0.35, 0.65, 0.75, 1], 
    ['#F4F6F8', '#fbcfe8', '#bfdbfe', '#a7f3d0', '#F4F6F8', '#F4F6F8']
  );
  
  const opacity1 = useTransform(scrollYProgress, [0, 0.25, 0.35, 1], [1, 1, 0, 0]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.25, 0.35, 0.65, 0.75, 1], [0, 0, 1, 1, 0, 0]);
  const opacity3 = useTransform(scrollYProgress, [0, 0.65, 0.75, 1], [0, 0, 1, 1]);

  return (
    <motion.section ref={containerRef} style={{ backgroundColor: bgChange }} className="relative h-[300vh] transition-colors duration-300 text-foreground">
      <div className="sticky top-0 h-screen flex flex-col justify-center items-center px-8 text-center max-w-5xl mx-auto overflow-hidden">
        
        {/* Теза 1 */}
        <motion.div style={{ opacity: opacity1 }} className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
          <h2 className="font-syne text-5xl md:text-7xl font-bold mb-6">The sum is greater than its parts.</h2>
          <p className="text-xl md:text-2xl max-w-3xl leading-relaxed">Synthesis was born inside Syngenta from one simple belief: the best digital work happens when the right people, ideas, and craft come together.</p>
        </motion.div>

        {/* Теза 2 */}
        <motion.div style={{ opacity: opacity2 }} className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
          <h2 className="font-syne text-5xl md:text-7xl font-bold mb-6 text-foreground">Not an external vendor.</h2>
          <p className="text-xl md:text-2xl max-w-3xl leading-relaxed">Our superpower is combining a warm, human way of working with a premium standard of execution.</p>
        </motion.div>

        {/* Теза 3 */}
        <motion.div style={{ opacity: opacity3 }} className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
          <h3 className="font-syne text-3xl font-bold mb-8 text-foreground/70">What we believe</h3>
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
    { name: 'DDG Hyvido', desc: 'A campaign page for hybrid barley. [+25% in leads]', color: 'bg-mint' },
    { name: 'Incipio', desc: 'A launch that looks like a million. [8% CTR]', color: 'bg-cyan' },
    { name: 'Simodis', desc: 'A demo you want to keep exploring. [+60% scroll depth]', color: 'bg-amber' }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section id="work" className="py-32 px-8 relative max-w-[90rem] mx-auto">
      <h2 className="font-syne text-5xl md:text-7xl font-bold mb-20 border-b border-foreground/10 pb-8">Work we're proud of.</h2>
      
      <div className="relative flex flex-col w-full">
        {projects.map((proj, i) => (
          <div 
            key={i} 
            onMouseEnter={() => setHovered(i)} 
            onMouseLeave={() => setHovered(null)} 
            // Збільшені відступи (py-12 замість py-8) та доданий gap для кращого простору
            className="group flex flex-col xl:flex-row xl:items-center justify-between py-12 border-b border-foreground/10 cursor-pointer gap-6 xl:gap-12 w-full"
          >
            {/* Збільшений шрифт назви та сильніший зсув при ховері */}
            <h3 className="font-syne text-5xl md:text-6xl font-medium transition-transform duration-300 group-hover:translate-x-8">
              {proj.name}
            </h3>
            {/* Збільшений шрифт опису та вирівнювання по правому краю на великих екранах */}
            <p className="text-foreground/60 text-xl md:text-2xl font-medium xl:text-right max-w-2xl">
              {proj.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Оновлена, значно більша картка при ховері */}
      <motion.div 
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }} 
        className="fixed top-0 left-0 pointer-events-none z-50 hidden md:block"
      >
        <motion.div 
          animate={{ opacity: hovered !== null ? 1 : 0, scale: hovered !== null ? 1 : 0.8 }} 
          // Збільшені розміри (w-[32rem] h-[22rem]) та округлення (rounded-3xl)
          className={`w-[32rem] h-[22rem] rounded-3xl backdrop-blur-2xl bg-white/30 border border-white/50 shadow-2xl flex items-center justify-center overflow-hidden transition-colors duration-300 ${hovered !== null ? projects[hovered].color : 'bg-transparent'}`}
        >
          {/* Збільшений текст всередині картки */}
          <span className="font-syne font-bold text-background text-5xl mix-blend-exclusion">
            {hovered !== null ? projects[hovered].name : ''}
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
// --- КОМПОНЕНТ: Testimonials ---
function Testimonials() {
  const quotes = [
    {
      quote: "Synthesis feels less like an internal team and more like a top-tier agency.",
      name: "Anna Müller",
      role: "Global Marketing Lead",
      project: "Hyvido Campaign"
    },
    {
      quote: "They understand our brand natively, which saves us weeks of onboarding and revisions.",
      name: "Carlos Rivera",
      role: "Product Manager",
      project: "Vaniva Hub"
    },
    {
      quote: "The attention to detail and human approach makes every project a breeze.",
      name: "Sarah Jenkins",
      role: "UX Director",
      project: "Vev Design System"
    },
    {
      quote: "From brief to launch, the process was seamless and the visual results exceeded expectations.",
      name: "David Chen",
      role: "Commercial Head",
      project: "Incipio Launch"
    }
  ];

  return (
    <section className="py-32 bg-background overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-8 mb-16">
        <h2 className="font-syne text-5xl md:text-7xl font-bold mb-4">What they say.</h2>
      </div>

      <div className="relative flex whitespace-nowrap">
        {/* Анімація нескінченної прокрутки */}
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          className="flex gap-8 px-4"
        >
          {/* Подвоюємо масив для безшовного циклу */}
          {[...quotes, ...quotes].map((item, i) => (
            <div 
              key={i} 
              className="flex flex-col justify-between w-[85vw] md:w-[45vw] lg:w-[35vw] whitespace-normal bg-white/40 backdrop-blur-xl p-10 md:p-14 rounded-[2rem] border border-white/60 shadow-xl hover:-translate-y-2 transition-transform duration-300"
            >
              <p className="font-syne text-2xl md:text-3xl font-medium leading-snug mb-12 text-foreground">
                "{item.quote}"
              </p>
              <div>
                <p className="font-bold text-foreground text-xl">{item.name}</p>
                <p className="text-foreground/50 text-sm font-bold tracking-widest uppercase mt-2">
                  {item.role} <span className="text-mint mx-1">•</span> {item.project}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
// --- КОМПОНЕНТ: Team ---
function Team() {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  const teamMembers = [
    { name: "Aarav Nair", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80" },
    { name: "Priya Menon", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80" },
    { name: "Sofiia Hrytsenko", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80" },
    { name: "Maksym Bondar", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" },
    { name: "Jordan Bennett", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80" },
    { name: "Mia Carter", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80" },
    { name: "Lukas Meier", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80" },
    { name: "Elena Vogel", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80" },
    { name: "Carlos Rivera", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" },
    { name: "Anna Müller", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80" },
    { name: "David Chen", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80" },
    { name: "Sarah Jenkins", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80" },
    { name: "Yuki Tanaka", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80" },
    { name: "Tom Newman", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80" },
    { name: "Nina Ricci", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80" },
  ];

  return (
    <section id="team" className="py-24 px-8 min-h-screen flex items-center relative overflow-hidden bg-background text-foreground">
      
      {/* РОЗМИТИЙ ЧЕРВОНИЙ/РОЖЕВИЙ ФОН (як у Hero) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-end">
        <motion.div 
          animate={{ scale: [1, 1.3, 1], x: ['0%', '-20%', '10%', '0%'], y: ['0%', '20%', '-20%', '0%'] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} 
          className="w-[70vw] h-[70vw] bg-pink-400/30 rounded-full mix-blend-multiply filter blur-[100px] md:blur-[140px]" 
        />
      </div>

      <div className="relative z-10 max-w-[90rem] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Ліва частина: Зона появи фотографій */}
        <div className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center lg:justify-start">
          {teamMembers.map((member, i) => (
            <motion.img
              key={i}
              src={member.image}
              alt={member.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: hoveredIndex === i ? 1 : 0, 
                scale: hoveredIndex === i ? 1 : 0.95,
                zIndex: hoveredIndex === i ? 10 : 0
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute max-w-[240px] md:max-w-[400px] aspect-[4/5] object-cover rounded-2xl shadow-2xl"
            />
          ))}
        </div>

        {/* Права частина: Список імен */}
        <div className="flex flex-col text-right items-end justify-center">
          <h2 className="font-syne text-sm md:text-lg text-foreground/50 mb-6 font-bold uppercase tracking-widest">
            The Team
          </h2>
          
          <div className="flex flex-col">
            {teamMembers.map((member, i) => (
              <div 
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                className={`cursor-pointer py-[2px] md:py-1 font-syne text-2xl md:text-4xl transition-all duration-300 ${
                  hoveredIndex === i 
                    ? 'opacity-100 font-bold translate-x-0' 
                    : 'opacity-30 font-medium translate-x-3 hover:opacity-60'
                }`}
              >
                {member.name}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// --- КОМПОНЕНТ: CTA & Footer ---
function CTAAndFooter() {
  const btnRef = useRef<HTMLButtonElement>(null);
  
  // Пружинна анімація створює ефект в'язкості (води), яка злегка "відстає" від курсора
  const mouseX = useSpring(0, { stiffness: 40, damping: 15 });
  const mouseY = useSpring(0, { stiffness: 40, damping: 15 });

  const handleMouseMove = (e: any) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    // Вираховуємо позицію курсора відносно самої кнопки
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <>
      <section id="contacts" className="py-32 px-8 flex flex-col items-center justify-center text-center">
        <h2 className="font-syne text-5xl md:text-7xl font-bold mb-6">Got an idea? <br/> Let's bring it together.</h2>
        
        <motion.button 
          ref={btnRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            // Коли курсор йде, плавно повертаємо "воду" в центр кнопки
            if(btnRef.current){
              mouseX.set(btnRef.current.offsetWidth / 2);
              mouseY.set(btnRef.current.offsetHeight / 2);
            }
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative mt-12 overflow-hidden px-16 py-8 rounded-full bg-mint text-foreground font-syne font-bold text-2xl cursor-pointer shadow-lg transition-shadow hover:shadow-mint/50 group"
        >
          {/* "Водяний" відблиск, що рухається за курсором */}
          <motion.div 
            className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-screen"
            style={{
              background: useMotionTemplate`radial-gradient(120px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.9), transparent 100%)`,
            }}
          />
          <span className="relative z-10 pointer-events-none text-foreground">Start a project</span>
        </motion.button>

        <p className="mt-12 text-foreground/60 font-medium text-lg">
          Or just message us, <a href="#" className="underline decoration-amber hover:text-amber transition-colors">let's chat.</a>
        </p>
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
      {/* і так далі */}
    </main>
  );
}
