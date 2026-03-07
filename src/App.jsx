import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Ensure these images are in your /src folder
import bgSunrise from './assets/bg-backwaters.png';
import bgSunsetPurple from './assets/bg-sunset-purple.png';

const ParallaxCard = ({ session }) => {
  const ref = useRef(null);
  
  // Track the scroll progress of the individual card
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // This creates the parallax: the image moves slower than the card
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div 
      ref={ref}
      className="group relative w-full h-[500px] rounded-[40px] overflow-hidden shadow-xl border border-white/20 mb-10"
    >
      {/* BACKGROUND IMAGE LAYER (The Parallax) */}
      <motion.div 
        style={{ 
          backgroundImage: `url(${session.background})`,
          y: y 
        }}
        className="absolute inset-0 bg-cover bg-center scale-125 z-0"
      />
      
      {/* GLASS OVERLAY (Keeps text readable) */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-10" />

      {/* CONTENT LAYER */}
      <div className="relative z-20 p-10 h-full flex flex-col justify-between text-white">
        <div>
          <span className={`text-[10px] font-black tracking-widest uppercase ${session.buttonColor} text-white px-4 py-1.5 rounded-full shadow-lg`}>
            {session.tag}
          </span>
          <h3 className="text-white/70 font-bold text-xs uppercase mt-8 mb-2">{session.type}</h3>
          <p className="text-4xl font-black drop-shadow-lg">{session.time}</p>
        </div>

        <div>
          <ul className="space-y-3 mb-10">
            {session.features.map((feature, idx) => (
              <li key={idx} className="flex items-center text-sm font-semibold">
                <span className="w-1.5 h-1.5 bg-blue-300 rounded-full mr-3 shadow"></span>
                {feature}
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center">
            <p className="text-3xl font-black">{session.price}</p>
            <button className={`${session.buttonColor} px-10 py-4 rounded-2xl font-bold transition-transform active:scale-95 shadow-lg`}>
              Reserve Spot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const sessions = [
    { 
      type: "Sunrise Morning Session", 
      time: "6:30 AM - 8:30 AM", 
      tag: "Sunrise SUP",
      price: "₹900",
      features: ["Licensed Instructors", "Lifejackets Provided", "Morning Refreshments"],
      background: bgSunrise,
      buttonColor: "bg-blue-600 hover:bg-blue-700"
    },
    { 
      type: "Sunset Evening Session", 
      time: "4:30 PM - 6:45 PM", 
      tag: "Sunset SUP",
      price: "₹900",
      features: ["Licensed Instructors", "Lifejackets Provided", "Sunset Viewpoint"],
      background: bgSunsetPurple, 
      buttonColor: "bg-purple-700 hover:bg-purple-800"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center p-6 md:p-12 font-sans">
      <header className="text-center mb-20 mt-10">
        <h1 className="text-7xl font-black text-white tracking-tighter uppercase leading-none italic">
          SUP <span className="text-blue-500">Kochi</span>
        </h1>
        <p className="text-blue-100/30 font-bold mt-4 tracking-[0.4em] uppercase text-xs">
          Kumbalangi Backwaters
        </p>
      </header>

      <main className="w-full max-w-4xl space-y-12">
        {sessions.map((s, i) => (
          <ParallaxCard key={i} session={s} />
        ))}
      </main>

      <footer className="w-full max-w-4xl mt-20 bg-blue-900/20 backdrop-blur-xl border border-white/10 rounded-[40px] p-10 text-white">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h4 className="text-blue-400 font-black text-xs uppercase tracking-widest mb-4">Location</h4>
            <address className="not-italic text-2xl font-bold">
              Elayadath house,<br /> Mumdamveli po manassery
            </address>
          </div>
          <div className="md:text-right">
            <h4 className="text-blue-400 font-black text-xs uppercase tracking-widest mb-4">Safety</h4>
            <p className="text-lg font-medium opacity-70 italic">Licensed Instructors • Premium Lifejackets</p>
          </div>
        </div>
      </footer>
    </div>
  );
}