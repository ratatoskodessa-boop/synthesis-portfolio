'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

// --- 1. HERO SECTION ---
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 bg-[#F4F6F8] overflow-hidden">
      <div className="z-10 text-center px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="text-7xl md:text-[10rem] font-bold tracking-tighter text-[#1A1F24] uppercase leading-none"
        >
          We Are <br /> Agency
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="mt-12 flex items-center justify-center gap-6"
        >
          <a href="#about" className="flex items-center gap-3 text-lg font-medium hover:opacity-70 transition-opacity">
            <span>Scroll to explore</span>
            <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center">
              ↓
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// --- 2. ABOUT: FARMERS PARALLAX ---
function AboutFarmers() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

  // Анімації для колонок (парні вниз, непарні вверх)
  const yUp = useTransform(scrollYProgress, [0, 1], [150, -400]);
  const yDown = useTransform(scrollYProgress, [0, 1], [-400, 150]);

  // Тимчасові фото агро-тематики
  const images = [
    "https://images.unsplash.com/photo-1592982537447-6f23342a27b3?w=600&q=80",
    "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=80",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
    "https://images.unsplash.com/photo-1586771107445-d3afeb0dc151?w=600&q=80",
    "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80",
    "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&q=80"
  ];

  return (
    <section id="about" className="relative py-32 bg-white overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center relative z-20">
        <h2 className="text-4xl md:text-7xl font-bold max-w-5xl mx-auto leading-tight text-[#1A1F24]">
          To make farmers the hero of every story.
        </h2>
        <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto">
          We combine data, design, and deep agricultural expertise to build digital experiences that empower those who feed the world.
        </p>
      </div>

      {/* 6 колонок паралаксу */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 px-4 h-[60vh] md:h-[80vh] overflow-hidden relative">
        {/* Градієнти для м'якого розчинення країв */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
        
        {[0, 1, 2, 3, 4, 5].map((colIndex) => (
          <motion.div 
            key={colIndex}
            style={{ y: colIndex % 2 === 0 ? yUp : yDown }}
            className="flex flex-col gap-4"
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="relative aspect-[3/4] w-full rounded-xl overflow-hidden">
                <img 
                  src={images[(colIndex + i) % images.length]} 
                  alt="Agriculture" 
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// --- 3. GALLERY ARCH ---
function CurvedGallery() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  
  // Горизонтальний скрол контейнера
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  const projects = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Функція для створення дуги (параболи)
  const getCurveOffset = (index: number) => {
    const center = projects.length / 2 - 0.5;
    const distance = Math.abs(index - center);
    return Math.pow(distance, 2) * 15; // Множник визначає крутизну дуги
  };

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#1A1F24] text-white">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        
        <h2 className="text-4xl md:text-6xl font-bold mb-10 absolute top-24">Featured Work</h2>
        
        <motion.div style={{ x }} className="flex gap-8 px-[50vw]">
          {projects.map((item, index) => (
            <div 
              key={item}
              style={{ marginTop: `${getCurveOffset(index)}px` }} // Зсув по дузі
              className="min-w-[300px] md:min-w-[450px] aspect-[4/3] bg-gray-800 rounded-2xl overflow-hidden flex-shrink-0 transition-transform hover:scale-105 cursor-pointer"
            >
              <img 
                src={`https://images.unsplash.com/photo-1599839619722-39751411ea63?w=800&q=80`} 
                alt="Project" 
                className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </motion.div>

        <div className="absolute bottom-24">
          <button className="px-8 py-4 bg-white text-[#1A1F24] rounded-full font-bold hover:bg-gray-200 transition-colors">
            See all our work
          </button>
        </div>
      </div>
    </section>
  );
}

// --- 4. SERVICES ---
function Services() {
  const services = [
    { title: "UI/UX Design", desc: "Creating intuitive and user-centered interfaces for complex agricultural platforms." },
    { title: "Web Development", desc: "Building scalable, fast, and secure websites and web applications." },
    { title: "Video Production", desc: "Telling your brand's story through high-quality video content." },
    { title: "Branding", desc: "Crafting memorable identities that resonate with your target audience." }
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-5xl font-bold mb-16">Our Services</h2>
        <div className="flex flex-col border-t border-gray-200">
          {services.map((service, i) => (
            <a key={i} href={`#service-${i}`} className="group flex flex-col md:flex-row md:items-center justify-between py-10 border-b border-gray-200 hover:bg-gray-50 transition-colors px-4 -mx-4 rounded-lg">
              <h3 className="text-3xl md:text-4xl font-medium group-hover:translate-x-4 transition-transform">{service.title}</h3>
              <p className="mt-4 md:mt-0 text-gray-500 max-w-sm md:text-right">{service.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- 5. CONTACT FORM (Let's build it) ---
function ContactForm() {
  return (
    <section className="bg-[#f0f4ea] py-16 px-4 md:px-8">
      <div className="max-w-[90rem] mx-auto bg-white rounded-[2rem] overflow-hidden flex flex-col lg:flex-row shadow-sm">
        
        {/* Left Side: Form */}
        <div className="w-full lg:w-1/2 p-10 md:p-16 lg:p-24 flex flex-col justify-center">
          <h2 className="text-5xl md:text-7xl font-serif text-[#1A1F24] leading-tight tracking-tight">
            Got a brief?<br />Let's build it.
          </h2>
          <p className="mt-6 text-xl text-gray-500 max-w-md">
            Tell us the market, the crop and the goal. We'll take it from there.
          </p>

          <form className="mt-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Name Surname</label>
                <input type="text" placeholder="Your full name" className="border-b border-gray-300 py-2 focus:outline-none focus:border-[#1A1F24] transition-colors placeholder:text-gray-300 text-lg" />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Requester Email</label>
                <input type="email" placeholder="you@company.com" className="border-b border-gray-300 py-2 focus:outline-none focus:border-[#1A1F24] transition-colors placeholder:text-gray-300 text-lg" />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Support Request Type *</label>
              <select className="border-b border-gray-300 py-2 focus:outline-none focus:border-[#1A1F24] bg-transparent text-lg text-gray-700 appearance-none cursor-pointer">
                <option>Select a service</option>
                <option>UI/UX Design</option>
                <option>Web Development</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Description</label>
              <textarea placeholder="Tell us about the request" rows={2} className="border-b border-gray-300 py-2 focus:outline-none focus:border-[#1A1F24] transition-colors placeholder:text-gray-300 text-lg resize-none" />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Country</label>
              <input type="text" placeholder="Your country / market" className="border-b border-gray-300 py-2 focus:outline-none focus:border-[#1A1F24] transition-colors placeholder:text-gray-300 text-lg" />
            </div>

            <div className="flex items-center gap-3 pt-4">
              <input type="checkbox" id="terms" className="w-5 h-5 accent-[#C5E1A5] cursor-pointer" />
              <label htmlFor="terms" className="text-xs font-bold text-gray-400 uppercase tracking-widest cursor-pointer">
                I accept the terms of use
              </label>
            </div>

            <div className="flex pt-4">
              <button type="button" className="flex items-center">
                <span className="bg-[#C5E1A5] text-[#1A1F24] font-bold tracking-widest uppercase px-8 py-5 text-sm hover:bg-[#b0cc90] transition-colors">
                  Send Request
                </span>
                <span className="bg-[#1A1F24] text-white px-6 py-5 flex items-center justify-center hover:bg-black transition-colors">
                  →
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Image & Info */}
        <div className="w-full lg:w-1/2 p-4 flex flex-col">
          <div className="flex-1 rounded-[1.5rem] overflow-hidden bg-gray-100 relative min-h-[400px]">
            {/* Тимчасове зображення (замініть на свою 3D графіку) */}
            <img 
              src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80" 
              alt="Abstract Greens" 
              className="absolute inset-0 w-full h-full object-cover"
            />
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
      <Hero />
      <AboutFarmers />
      <CurvedGallery />
      <Services />
      {/* Сюди можна додати Team та Testimonials, якщо вони у вас винесені в окремі компоненти */}
      <ContactForm />
    </main>
  );
}
