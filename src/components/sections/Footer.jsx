import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="manifesto" className="relative w-full bg-black pt-24 pb-[max(2.5rem,env(safe-area-inset-bottom))] px-4 sm:px-6 md:px-16 border-t border-white/5 overflow-x-hidden scroll-mt-24">
      
      {/* BACKGROUND DECORATION: Massive glowing orb to match the mood colors */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* TOP SECTION: Filling that Top-Left space with "Technical Details" */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-16 md:mb-24">
          
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 bg-[#CCFF00] rounded-full animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/40">System Status: Optimal</span>
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                Revolutionizing <br />
                <span className="text-white/30 italic">Personal Audio.</span>
              </h3>
            </div>

            {/* Technical Metadata (Fills the gap) */}
            <div className="mt-12 grid grid-cols-2 gap-4 border-t border-white/10 pt-8">
              <div>
                <p className="text-[10px] font-mono uppercase text-white/30 mb-1">Latency</p>
                <p className="text-sm font-mono text-white/70">0.002ms</p>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase text-white/30 mb-1">Architecture</p>
                <p className="text-sm font-mono text-white/70">Neural-Link v1.4</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
            <div className="space-y-6">
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/40">Product</h4>
              <ul className="text-sm space-y-4 text-white/60">
                <li className="hover:text-[#CCFF00] transition-colors cursor-pointer">The Hardware</li>
                <li className="hover:text-[#CCFF00] transition-colors cursor-pointer">The App</li>
                <li className="hover:text-[#CCFF00] transition-colors cursor-pointer">Neural Tech</li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/40">Company</h4>
              <ul className="text-sm space-y-4 text-white/60">
                <li className="hover:text-[#CCFF00] transition-colors cursor-pointer">Our Story</li>
                <li className="hover:text-[#CCFF00] transition-colors cursor-pointer">Manifesto</li>
                <li className="hover:text-[#CCFF00] transition-colors cursor-pointer">Press</li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/40">Social</h4>
              <ul className="text-sm space-y-4 text-white/60">
                <li className="hover:text-[#CCFF00] transition-colors cursor-pointer">Instagram</li>
                <li className="hover:text-[#CCFF00] transition-colors cursor-pointer">Twitter</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CENTERPIECE: Massive Typography — wraps on narrow screens */}
        <div className="py-8 md:py-10 border-y border-white/10 overflow-hidden px-1">
          <h2
            className="font-black leading-[0.92] tracking-tighter text-transparent uppercase select-none text-center text-[clamp(2.25rem,11vw,7rem)] max-w-[100%]"
            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.12)' }}
          >
            ACOUSTIC PERSONA
          </h2>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-10 md:mt-12 gap-6 text-center md:text-left">
          <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest max-w-xs md:max-w-none">
            © {currentYear} Pixelon. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-3">
            <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest hover:text-white cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest hover:text-white cursor-pointer transition-colors">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;