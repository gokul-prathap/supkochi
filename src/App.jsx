import React from 'react';

export default function App() {
  const sessions = [
    { 
      type: "Sunrise Morning Session", 
      time: "6:30 AM - 8:30 AM", 
      tag: "Guided Session",
      price: "₹900",
      features: ["Licensed Instructors", "Lifejackets Provided", "Morning Refreshments"]
    },
    { 
      type: "Sunset Evening Session", 
      time: "4:30 PM - 6:45 PM", 
      tag: "Guided Session",
      price: "₹900",
      features: ["Licensed Instructors", "Lifejackets Provided", "Sunset Viewpoint"]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-between p-4 md:p-12 relative overflow-hidden font-sans">
      {/* Abstract Background Blurs */}
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-400/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/5 rounded-full blur-[120px]" />

      {/* Main Content Area */}
      <main className="relative z-10 max-w-5xl w-full mb-16">
        <header className="text-center mb-16">
          <h1 className="text-7xl font-black text-blue-950 tracking-tighter uppercase leading-none">
            SUP <span className="text-blue-600">Kochi</span>
          </h1>
          <p className="text-blue-900/40 font-bold mt-4 tracking-[0.4em] uppercase text-xs">
            Premium Paddleboarding Experiences
          </p>
        </header>

        {/* Sessions Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {sessions.map((s, i) => (
            <div key={i} className="group bg-white/40 backdrop-blur-md border border-white/60 p-10 rounded-[40px] shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="flex justify-between items-start mb-6">
                <span className="text-[10px] font-black tracking-widest uppercase bg-blue-600 text-white px-4 py-1.5 rounded-full">
                  {s.tag}
                </span>
                <p className="text-2xl font-black text-blue-950">{s.price}</p>
              </div>
              
              <h3 className="text-blue-900/50 font-bold text-xs uppercase mb-2">{s.type}</h3>
              <p className="text-4xl font-black text-blue-950 mb-8">{s.time}</p>
              
              <ul className="space-y-3">
                {s.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm font-semibold text-blue-900/70">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="w-full mt-10 py-4 rounded-2xl bg-blue-950 text-white font-bold hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/10">
                Reserve Spot
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Glass Footer Section */}
      <footer className="relative z-10 w-full max-w-5xl">
        <div className="bg-blue-600/90 backdrop-blur-2xl border border-blue-400/30 rounded-[35px] p-8 md:p-12 shadow-2xl shadow-blue-900/30 text-white">
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
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer border border-white/20">
                  <span className="text-[10px] font-bold">IG</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer border border-white/20">
                  <span className="text-[10px] font-bold">FB</span>
                </div>
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