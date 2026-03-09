import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Ensure these images are in your /src folder
import bgSunrise from './assets/bg-backwaters.png';
import bgSunsetPurple from './assets/bg-sunset-purple.png';

const BookingModal = ({ isOpen, onClose, session }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [people, setPeople] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!date) newErrors.date = 'Date is required';
    if (!people || people < 1) newErrors.people = 'Number of people is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
  
    // Use asterisks (*) for bold text in WhatsApp
    const message = 
  `*New SUP Booking Request* 🏄‍♂️
  --------------------------
  *Session:* ${session.type}
  *Date:* ${date}
  *Name:* ${name}
  *Group Size:* ${people} Guests
  
  Hi! I'd like to book this Standup Paddling session. Please let me know if these spots are available!`;
  
    const whatsappUrl = `https://wa.me/917994737321?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-[30px] p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-3xl font-black text-blue-950 mb-2">Reserve Your Spot</h2>
        <p className="text-blue-600 font-bold mb-6">{session.type}</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-blue-950 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-600 outline-none font-medium"
              placeholder="Your name"
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-blue-950 mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-600 outline-none font-medium"
            />
            {errors.date && <p className="text-red-600 text-sm mt-1">{errors.date}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-blue-950 mb-2">Number of People</label>
            <input
              type="number"
              min="1"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-600 outline-none font-medium"
              placeholder="1"
            />
            {errors.people && <p className="text-red-600 text-sm mt-1">{errors.people}</p>}
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border-2 border-blue-200 text-blue-950 font-bold hover:bg-blue-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`flex-1 py-3 rounded-xl ${session.buttonColor} text-white font-bold transition-transform active:scale-95 shadow-lg`}
          >
            Send via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

const ParallaxCard = ({ session, onReserve }) => {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div 
      ref={ref}
      className="group relative w-full h-[500px] rounded-[40px] overflow-hidden shadow-2xl shadow-black/40 border border-white/60 mb-10"
    >
      {/* BACKGROUND IMAGE LAYER */}
      <motion.div 
        style={{ 
          backgroundImage: `url(${session.background})`,
          y: y 
        }}
        className="absolute inset-0 bg-cover bg-center scale-125 z-0"
      />
      
      {/* GLASS OVERLAY (White tinted for light theme) */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] z-10" />

      {/* CONTENT LAYER */}
      <div className="relative z-20 p-10 h-full flex flex-col justify-between">
        <div>
          <span className={`text-[10px] font-black tracking-widest uppercase ${session.buttonColor} text-white px-4 py-1.5 rounded-full shadow-lg`}>
            {session.tag}
          </span>
          <h3 className="text-white font-bold text-xs uppercase mt-8 mb-2">{session.type}</h3>
          <p className="text-4xl font-black text-white drop-shadow-sm">{session.time}</p>
        </div>

        <div>
          <ul className="space-y-3 mb-10">
            {session.features.map((feature, idx) => (
              <li key={idx} className="flex items-center text-xl font-bold text-white">
                <span className="w-2 h-2 bg-white rounded-full mr-3 shadow"></span>
                {feature}
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center">
            <p className="text-5xl font-black text-white">{session.price}</p>
            <button 
              onClick={onReserve}
              className={`${session.buttonColor} px-10 py-4 rounded-2xl text-white font-bold transition-transform active:scale-95 shadow-lg`}
            >
              Reserve Spot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  const handleReserve = (session) => {
    setSelectedSession(session);
    setModalOpen(true);
  };

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
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-6 md:p-12 font-sans relative overflow-hidden">
      {/* Abstract Background Blurs */}
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <main className="relative z-10 w-full max-w-4xl space-y-12">
        <header className="text-center mb-20 mt-10">
          <h1 className="text-7xl font-black text-blue-950 tracking-tighter uppercase leading-none">
            SUP <span className="text-blue-600">Kochi</span>
          </h1>
          <p className="text-blue-900/40 font-bold mt-4 tracking-[0.4em] uppercase text-xs">
            Premium Paddleboarding Experiences
          </p>
        </header>

        {sessions.map((s, i) => (
          <ParallaxCard key={i} session={s} onReserve={() => handleReserve(s)} />
        ))}
      </main>

      {selectedSession && (
        <BookingModal 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)} 
          session={selectedSession} 
        />
      )}

      <main className="relative z-10 w-full max-w-4xl space-y-12" style={{display: 'none'}}>
      </main>

      {/* Glass Footer Section */}
      <footer className="relative z-10 w-full max-w-4xl mt-20">
        <div className="bg-blue-600/90 backdrop-blur-2xl border border-blue-400/30 rounded-[35px] p-8 md:p-12 shadow-2xl text-white">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h4 className="text-blue-100/50 font-black text-xs uppercase tracking-widest mb-4">Location</h4>
              <address className="not-italic text-2xl font-bold leading-tight max-w-xs">
                Elayadath house,<br />
                Mumdamveli po manassery,<br />
                Kochi, Kerala
              </address>
            </div>
            
            <div className="flex flex-col md:items-end gap-6">
              <div className="md:text-right">
                <h4 className="text-blue-100/50 font-black text-xs uppercase tracking-widest mb-2">Inquiries</h4>
                <p className="text-3xl font-black">+91 98765 43210</p>
                <p className="text-blue-100/70 font-medium">hello@supkochi.com</p>
              </div>
            </div>
          </div>
          
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-blue-100/30 uppercase tracking-[0.2em]">
            <p>© 2026 SUP KOCHI ADVENTURES</p>
            <p>Safety Certified • Licensed Operators</p>
          </div>
        </div>
      </footer>
    </div>
  );
}