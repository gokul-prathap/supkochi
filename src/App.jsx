import React from 'react';

export default function App() {
  const sessions = [
    { 
      type: "Sunrise Morning Session", 
      time: "6:30 AM - 8:30 AM", 
      tag: "Guided Session",
      details: "Includes life jacket & licensed instructors"
    },
    { 
      type: "Sunset Evening Session", 
      time: "4:30 PM - 6:45 PM", 
      tag: "Guided Session",
      details: "Includes life jacket & licensed instructors"
    }
  ];

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-400/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />

      {/* Main Glass Card */}
      <div className="relative z-10 max-w-4xl w-full bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[40px] shadow-2xl p-8 md:p-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-4">
          <div>
            <h1 className="text-6xl font-black text-blue-950 tracking-tighter leading-none">
              SUP <span className="text-blue-600">KOCHI</span>
            </h1>
            <p className="text-blue-900/60 font-medium mt-2 tracking-widest uppercase text-sm">Explore the Backwaters</p>
          </div>
          <div className="bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/80 shadow-sm">
            <p className="text-xs font-bold text-blue-900/50 uppercase">Starting at</p>
            <p className="text-3xl font-black text-blue-950">₹900<span className="text-sm font-medium">/pp</span></p>
          </div>
        </div>

        {/* Sessions Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {sessions.map((s, i) => (
            <div key={i} className="group relative bg-white/30 hover:bg-white/50 border border-white/40 p-8 rounded-[32px] transition-all duration-500 cursor-pointer">
              <div className="absolute top-4 right-6 text-[10px] font-bold tracking-widest uppercase bg-blue-600 text-white px-3 py-1 rounded-full">
                {s.tag}
              </div>
              <h3 className="text-blue-900/60 font-bold text-sm uppercase mb-1">{s.type}</h3>
              <p className="text-3xl font-bold text-blue-950 mb-4">{s.time}</p>
              <p className="text-sm text-blue-900/70 leading-relaxed font-medium">
                {s.details}
              </p>
            </div>
          ))}
        </div>

        {/* Footer/Contact CTA */}
        <div className="mt-12 flex flex-col items-center gap-6">
          <button className="w-full md:w-auto bg-blue-950 text-white hover:bg-blue-800 px-12 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-blue-900/20 transition-all hover:-translate-y-1 active:scale-95">
            Book a Session
          </button>
          <p className="text-[10px] font-bold text-blue-900/40 uppercase tracking-[0.3em]">
            Licensed Instructors • Premium Equipment • Safety First
          </p>
        </div>
      </div>
    </div>
  );
}