import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    // 1. Wrap everything in gsap.context() for React Strict Mode safety
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        onComplete: onComplete 
      });

      tl.fromTo(textRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
        .to(progressRef.current, { scaleX: 1, duration: 1, ease: "power2.inOut" }, "-=0.4")
        .to({}, { duration: 0.5 }) 
        .to([textRef.current, progressRef.current], { opacity: 0, y: -20, duration: 0.5, ease: "power3.in" })
        .to(loaderRef.current, { yPercent: -100, duration: 1, ease: "expo.inOut" }, "-=0.2");
        
    }, loaderRef); // 2. Scope the context to this component

    // 3. Revert the context on unmount! This kills the double-animation bug instantly.
    return () => ctx.revert();
    
  }, []); // 4. VERY IMPORTANT: Empty array means this runs exactly ONCE.

  return (
    <div 
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background text-text origin-top"
    >
      <h1 ref={textRef} className="text-6xl md:text-8xl font-heading font-bold tracking-tighter mb-4 opacity-0">
        Pixelon.
      </h1>
      
      <div className="w-32 h-[2px] bg-primary overflow-hidden rounded-full">
        <div 
          ref={progressRef} 
          className="w-full h-full bg-text origin-left scale-x-0" 
        />
      </div>
    </div>
  );
};

export default Preloader;