import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { cn } from '../../utils/cn';

const Navbar = ({
  cartCount = 0,
  onOpenCheckout,
  onCloseCheckout,
  checkoutOpen = false,
  supportOpen = false,
  onOpenSupport,
  onCloseSupport,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger the glass effect after 50px of scrolling
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navIds = [
    { id: 'hardware', short: 'Shop', long: 'Hardware' },
    { id: 'calibration', short: 'Moods', long: 'Calibration' },
    { id: 'manifesto', short: 'Story', long: 'Manifesto' },
  ];

  const scrollToSection = (id) => {
    if (supportOpen) {
      onCloseSupport?.();
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-[150] px-3 sm:px-5 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 md:px-6 md:py-6 flex justify-center pointer-events-none"
    >
      <div
        className={cn(
          'flex items-center gap-2 sm:gap-3 w-full max-w-6xl px-3 py-3 sm:px-5 sm:py-3.5 md:px-8 md:py-4 rounded-2xl border transition-all duration-500 pointer-events-auto min-w-0',
          isScrolled
            ? 'bg-black/50 backdrop-blur-xl border-white/10 md:translate-y-[-6px] shadow-[0_20px_50px_rgba(0,0,0,0.3)]'
            : 'bg-black/30 md:bg-transparent border-white/5 md:border-transparent',
        )}
      >
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (checkoutOpen) onCloseCheckout?.();
            if (supportOpen) onCloseSupport?.();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full bg-white text-black transition-transform hover:rotate-180 duration-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]"
          aria-label="Home"
        >
          <span className="w-2.5 h-2.5 bg-black rounded-full" />
        </a>

        {/* Mobile: horizontal section links */}
        <div className="flex md:hidden flex-1 min-w-0 items-center gap-0.5 overflow-x-auto scrollbar-none py-0.5 px-0.5">
          {navIds.map(({ id, short, long }) => (
            <a
              key={id}
              href={`#${id}`}
              title={long}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(id);
              }}
              className="shrink-0 rounded-lg px-2 py-2 text-[9px] font-mono uppercase tracking-wide text-white/55 hover:text-[#CCFF00] hover:bg-white/5 transition-colors"
            >
              {short}
            </a>
          ))}
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center justify-center flex-1 gap-8 lg:gap-10">
          {navIds.map(({ id, long }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(id);
              }}
              className="text-[10px] font-mono uppercase tracking-[0.28em] text-white/50 hover:text-[#CCFF00] transition-colors"
            >
              {long}
            </a>
          ))}
        </div>

        <div className="flex items-center shrink-0 gap-1.5 sm:gap-3">
          <button
  type="button"
  onClick={() => {
    onOpenSupport?.();
    window.scrollTo({ top: 0, behavior: 'auto' });
  }}
  className={cn(
    "text-[9px] sm:text-[10px] font-mono uppercase tracking-wider transition-all duration-500 px-1 sm:px-1.5 whitespace-nowrap outline-none",
    // Pure animation class - no text-white/45 to hold it back
    "animate-glow-intense hover:animate-none hover:text-[#CCFF00] hover:drop-shadow-[0_0_8px_rgba(204,255,0,0.8)]"
  )}
  aria-label="Support"
>
  <span className="sm:hidden">Help</span>
  <span className="hidden sm:inline">Support</span>
</button>
          <button
            type="button"
            onClick={() => {
              if (cartCount > 0) onOpenCheckout?.();
              else scrollToSection('hardware');
            }}
            className="relative bg-white text-black px-4 py-2.5 sm:px-6 rounded-xl text-[9px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-widest hover:bg-[#CCFF00] transition-all hover:scale-[1.02] active:scale-95 shadow-lg"
          >
            <span className="flex items-center gap-2">
              <ShoppingBag className="w-3.5 h-3.5" strokeWidth={2} />
              Cart
            </span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[1.125rem] h-[1.125rem] px-1 flex items-center justify-center rounded-full bg-[#CCFF00] text-black text-[9px] font-bold">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;