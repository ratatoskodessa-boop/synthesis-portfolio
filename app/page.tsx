'use client';

import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from 'framer-motion';
import { useRef, useState } from 'react';

// --- 0. HEADER ---
function Header() {
  return (
    <motion.header initial={{ y: -100 }} animate={{ y: 0 }} className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 backdrop-blur-md bg-white/50 border-b border-gray-100">
      <div className="font-syne font-bold text-2xl tracking-tight text-[#1A1F24]">Synthesis</div>
      <nav className="hidden md:flex gap-8 font-medium text-sm text-gray-500">
        <a href="#work" className="hover:text-[#1A1F24] transition-colors">Work</a>
        <a href="#services" className="hover:text-[#1A1F24] transition-colors">Services</a>
        <a href="#team" className="hover:text-[#1A1F24] transition-colors">Team</a>
      </nav>
      <button className="px-6 py-3 rounded-full bg-[#1A1F24] text-white text-sm font-medium hover:bg-gray-800 transition-all cursor-pointer">
        Let's talk
      </button>
    </motion.header>
  );
}

// --- 1. HERO SECTION (Зі шлейфом) ---
function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useSpring(0, { stiffness: 30, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 30, damping: 20 });
  const trailOpacity = useSpring(0, { stiffness: 40, damping: 15 });

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
      onMouseEnter={() => trailOpacity.set(1)}
      onMouseLeave={() => trailOpacity.set(0)}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-[#F4F6F8] cursor-default"
    >
      {/* Анімований фон з 4 кольорів */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ scale: [1, 1.4, 1], x: ['0%', '30%', '-10%', '0%'], y: ['0%', '-30%', '20%', '0%'] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] bg-pink-300/40 rounded-full mix-blend-multiply filter blur-[80px] md:blur-[120px]" />
        <motion.div animate={{ scale: [1, 1.5, 1], x: ['0%', '-40%', '20%', '0%'], y: ['0%', '40%', '-20%', '0%'] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-[10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-300/40 rounded-full mix-blend-multiply filter blur-[80px] md:blur-[120px]" />
        <motion.div animate={{ scale: [1, 1.3, 1], x: ['0%', '20%', '-30%', '0%'], y: ['0%', '30%', '-40%', '0%'] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-[-20%] left-[10%] w-[40vw] h-[40vw] bg-yellow-200/50 rounded-full mix-blend-multiply filter blur-[80px] md:blur-[120px]" />
        <motion.div animate={{ scale: [1, 1.6, 1], x: ['0%', '-30%', '40%', '0%'], y: ['0%', '-20%', '30%', '0%'] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute bottom-[0%] right-[10%] w-[45vw] h-[45vw] bg-emerald-300/40 rounded-full mix-blend-multiply filter blur-[80px] md:blur-[120px]" />
      </div>

      {/* ШЛЕЙФ ВІД КУРСОРА */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay"
        style={{
          opacity: trailOpacity,
          background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.7), transparent 100%)`,
        }}
      />

      {/* Градієнт для плавного переходу вниз */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

      <div className="relative z-10 text-center px-6 pointer-events-none">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="font-syne text-7xl md:text-[10rem] font-bold tracking-tighter text-[#1A1F24] uppercase leading-none"
        >
          We Are <br /> Agency
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="mt-16 flex justify-center pointer-events-auto"
        >
          <a href="#about" className="flex items-center gap-4 text-lg font-medium text-[#1A1F24] hover:opacity-70 transition-opacity">
            <span>Scroll to explore</span>
            <div className="w-12 h-12 rounded-full border border-[#1A1F24] flex items-center justify-center">
              ↓
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// --- 2. ABOUT: FARMERS PARALLAX (Із текстом та портретами) ---
function AboutFarmers() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

  const yUp = useTransform(scrollYProgress, [0, 1], [150, -400]);
  const yDown = useTransform(scrollYProgress, [0, 1], [-400, 150]);

  // Мікс фотографій та дружніх слоганів
  const items = [
    { type: 'img', content: 'https://images.unsplash.com/photo-1592982537447-6f23342a27b3?w=600&q=80' },
    { type: 'text', content: 'Hands in the dirt.' },
    { type: 'img', content: 'https://images.unsplash.com/photo-1586771107445-d3afeb0dc151?w=600&q=80' },
    { type: 'img', content: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&q=80' },
    { type: 'text', content: 'Grown with care.' },
    { type: 'img', content: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80' },
    { type: 'text', content: 'Yielding results.' },
    { type: 'img', content: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80' },
    { type: 'text', content: 'Digital harvest.' }
  ];

  return (
    <section id="about" className="relative py-32 bg-white overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center relative z-20">
        <h2 className="font-syne text-5xl md:text-7xl font-bold max-w-5xl mx-auto leading-tight text-[#1A1F24]">
          To make farmers the hero of every story.
        </h2>
        <p className="mt-8 text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
          We combine data, design, and deep agricultural expertise to build digital experiences that empower those who feed the world.
        </p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 px-4 h-[60vh] md:h-[80vh] overflow-hidden relative">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
        
        {[0, 1, 2, 3, 4, 5].map((colIndex) => (
          <motion.div 
            key={colIndex}
            style={{ y: colIndex % 2 === 0 ? yUp : yDown }}
            className="flex flex-col gap-4"
          >
            {[...Array(5)].map((_, i) => {
              const item = items[(colIndex + i) % items.length];
              return (
                <div key={i} className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden flex items-center justify-center bg-[#F4F6F8]">
                  {item.type === 'img' ? (
                    <img src={item.content} alt="Agriculture" className="object-cover w-full h-full" />
                  ) : (
                    <div className="p-6 text-center font-syne font-bold text-2xl text-[#1A1F24] leading-tight">
                      {item.content}
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// --- 3. GALLERY ARCH (Світлий фон, агро-фото) ---
function CurvedGallery() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  const images = [
    "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80",
    "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80",
    "https://images.unsplash.com/photo-1592982537447-6f23342a27b3?w=800&q=80",
    "https://images.unsplash.com/photo-1586771107445-d3afeb0dc151?w=800&q=80",
    "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80"
  ];

  const getCurveOffset = (index: number) => {
    const center = images.length / 2 - 0.5;
    const distance = Math.abs(index - center);
    return Math.pow(distance, 2) * 15; 
  };

  return (
    <section id="work" ref={targetRef} className="relative h-[300vh] bg-[#F4F6F8] text-[#1A1F24]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        
        <h2 className="font-syne text-5xl md:text-7xl font-bold mb-10 absolute top-32">Our Work</h2>
        
        <motion.div style={{ x }} className="flex gap-8 px-[50vw]">
          {images.map((src, index) => (
            <div 
              key={index}
              style={{ marginTop: `${getCurveOffset(index)}px` }}
              className="min-w-[300px] md:min-w-[450px] aspect-[4/3] bg-gray-200 rounded-3xl overflow-hidden flex-shrink-0 shadow-xl transition-transform hover:scale-105 cursor-pointer"
            >
              <img src={src} alt="Agro Project" className="w-full h-full object-cover" />
            </div>
          ))}
        </motion.div>

        <div className="absolute bottom-24">
          <button className="px-10 py-5 bg-[#1A1F24] text-white rounded-full font-medium hover:bg-gray-800 transition-colors shadow-lg cursor-pointer">
            See all our work
          </button>
        </div>
      </div>
    </section>
  );
}

// --- 4. SERVICES (Із кнопкою) ---
function Services() {
  const services = [
    { title: "UI/UX Design", desc: "Creating intuitive and user-centered interfaces for complex agricultural platforms." },
    { title: "Web Development", desc: "Building scalable, fast, and secure websites and web applications." },
    { title: "Video Production", desc: "Telling your brand's story through high-quality video content." },
    { title: "Branding", desc: "Crafting memorable identities that resonate with your target audience." }
  ];

  return (
    <section id="services" className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-syne text-5xl md:text-7xl font-bold mb-16 text-[#1A1F24]">Our Services</h2>
        <div className="flex flex-col border-t border-gray-200">
          {services.map((service, i) => (
            <a key={i} href={`#service-${i}`} className="group flex flex-col md:flex-row md:items-center justify-between py-12 border-b border-gray-200 hover:bg-gray-50 transition-colors px-6 -mx-6 rounded-2xl">
              <h3 className="font-syne text-3xl md:text-5xl font-medium text-[#1A1F24] group-hover:translate-x-4 transition-transform">{service.title}</h3>
              <p className="mt-4 md:mt-0 text-gray-500 text-lg max-w-sm md:text-right">{service.desc}</p>
            </a>
          ))}
        </div>
        
        {/* Кнопка "Всі сервіси" */}
        <div className="mt-16 text-center">
          <button className="px-10 py-5 rounded-full border border-gray-300 text-[#1A1F24] font-medium hover:bg-gray-50 transition-colors cursor-pointer">
            View all services
          </button>
        </div>
      </div>
    </section>
  );
}

// --- 5. TESTIMONIALS (Відновлено) ---
function Testimonials() {
  const quotes = [
    { quote: "Synthesis feels less like an internal team and more like a top-tier agency.", name: "Anna Müller", role: "Global Marketing Lead" },
    { quote: "They understand our brand natively, which saves us weeks of onboarding.", name: "Carlos Rivera", role: "Product Manager" },
    { quote: "The attention to detail and human approach makes every project a breeze.", name: "Sarah Jenkins", role: "UX Director" },
    { quote: "From brief to launch, the process was seamless and the visual results exceeded expectations.", name: "David Chen", role: "Commercial Head" }
  ];

  return (
    <section className="py-32 bg-[#F4F6F8] overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-8 mb-16">
        <h2 className="font-syne text-5xl md:text-7xl font-bold text-[#1A1F24]">What they say.</h2>
      </div>
      <div className="relative flex whitespace-nowrap">
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 40 }} className="flex gap-8 px-4">
          {[...quotes, ...quotes].map((item, i) => (
            <div key={i} className="flex flex-col justify-between w-[85vw] md:w-[45vw] lg:w-[35vw] whitespace-normal bg-white p-10 md:p-14 rounded-[2rem] shadow-sm hover:-translate-y-2 transition-transform duration-300">
              <p className="font-syne text-2xl md:text-3xl font-medium leading-snug mb-12 text-[#1A1F24]">"{item.quote}"</p>
              <div>
                <p className="font-bold text-[#1A1F24] text-xl">{item.name}</p>
                <p className="text-gray-400 text-sm font-bold tracking-widest uppercase mt-2">{item.role}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// --- 6. TEAM (Відновлено) ---
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
  ];

  return (
    <section id="team" className="py-24 px-8 min-h-screen flex items-center relative overflow-hidden bg-white text-[#1A1F24]">
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-end">
        <motion.div animate={{ scale: [1, 1.3, 1], x: ['0%', '-20%', '10%', '0%'], y: ['0%', '20%', '-20%', '0%'] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} className="w-[70vw] h-[70vw] bg-pink-200/50 rounded-full mix-blend-multiply filter blur-[100px] md:blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-[90rem] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center lg:justify-start">
          {teamMembers.map((member, i) => (
            <motion.img
              key={i} src={member.image} alt={member.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: hoveredIndex === i ? 1 : 0, scale: hoveredIndex === i ? 1 : 0.95, zIndex: hoveredIndex === i ? 10 : 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute max-w-[240px] md:max-w-[400px] aspect-[4/5] object-cover rounded-3xl shadow-2xl"
            />
          ))}
        </div>
        <div className="flex flex-col text-right items-end justify-center">
          <h2 className="font-syne text-sm md:text-lg text-gray-400 mb-6 font-bold uppercase tracking-widest">The Team</h2>
          <div className="flex flex-col">
            {teamMembers.map((member, i) => (
              <div key={i} onMouseEnter={() => setHoveredIndex(i)} className={`cursor-pointer py-[4px] md:py-2 font-syne text-3xl md:text-5xl transition-all duration-300 ${hoveredIndex === i ? 'opacity-100 font-bold translate-x-0' : 'opacity-30 font-medium translate-x-4 hover:opacity-60'}`}>
                {member.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// --- 7. CONTACT FORM (Let's build it) ---
function ContactForm() {
  return (
    <section className="bg-white py-16 px-4 md:px-8 border-t border-gray-100">
      <div className="max-w-[90rem] mx-auto bg-[#F9FAF8] rounded-[2rem] overflow-hidden flex flex-col lg:flex-row shadow-sm border border-gray-100">
        
        {/* Left Side: Form */}
        <div className="w-full lg:w-1/2 p-10 md:p-16 lg:p-24 flex flex-col justify-center">
          <h2 className="font-syne text-5xl md:text-7xl font-bold text-[#1A1F24] leading-tight tracking-tight">
            Got a brief?<br />Let's build it.
          </h2>
          <p className="mt-6 text-xl text-gray-500 max-w-md">
            Tell us the market, the crop and the goal. We'll take it from there.
          </p>

          <form className="mt-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Name Surname</label>
                <input type="text" placeholder="Your full name" className="bg-transparent border-b border-gray-300 py-2 focus:outline-none focus:border-[#1A1F24] transition-colors placeholder:text-gray-300 text-lg" />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Requester Email</label>
                <input type="email" placeholder="you@company.com" className="bg-transparent border-b border-gray-300 py-2 focus:outline-none focus:border-[#1A1F24] transition-colors placeholder:text-gray-300 text-lg" />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Support Request Type *</label>
              <select className="bg-transparent border-b border-gray-300 py-2 focus:outline-none focus:border-[#1A1F24] text-lg text-gray-700 appearance-none cursor-pointer">
                <option>Select a service</option>
                <option>UI/UX Design</option>
                <option>Web Development</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Description</label>
              <textarea placeholder="Tell us about the request" rows={2} className="bg-transparent border-b border-gray-300 py-2 focus:outline-none focus:border-[#1A1F24] transition-colors placeholder:text-gray-300 text-lg resize-none" />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Country</label>
              <input type="text" placeholder="Your country / market" className="bg-transparent border-b border-gray-300 py-2 focus:outline-none focus:border-[#1A1F24] transition-colors placeholder:text-gray-300 text-lg" />
            </div>

            <div className="flex pt-6">
              {/* Стилізована кнопка, яка підходить під весь сайт */}
              <button type="button" className="px-10 py-5 rounded-full bg-[#A3D5B9] text-[#1A1F24] font-bold tracking-widest uppercase hover:bg-[#8ec2a3] transition-colors cursor-pointer shadow-lg">
                Send Request
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Image & Info */}
        <div className="w-full lg:w-1/2 p-4 flex flex-col">
          <div className="flex-1 rounded-[1.5rem] overflow-hidden bg-gray-100 relative min-h-[400px]">
            <img src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80" alt="Abstract Greens" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="mt-4 bg-white border border-gray-100 rounded-[1.5rem] p-8 flex flex-col gap-6">
            <div className="flex justify-between items-start border-b border-gray-100 pb-6">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Address</span>
              <span className="text-right text-[#1A1F24] font-medium">Agency HQ<br/>Global, 90+ markets</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Mail</span>
              <span className="text-[#1A1F24] font-medium">hello@synthesis.example</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- MAIN PAGE ASSEMBLY ---
export default function Home() {
  return (
    <main className="flex flex-col w-full bg-white">
      <Header />
      <Hero />
      <AboutFarmers />
      <CurvedGallery />
      <Services />
      <Team />
      <Testimonials />
      <ContactForm />
    </main>
  );
}
