import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { cn } from '../../utils/cn';

const AnimateTitle = ({ children, className, delay = 0, isReady = true }) => {
  const textRef = useRef(null);

  useEffect(() => {
    // STOP: If the app isn't ready yet, don't run the animation!
    if (!textRef.current || !isReady) return;

    const text = new SplitType(textRef.current, { types: 'words, chars' });
    
    gsap.set(text.words, { y: '100%', opacity: 0 });

    gsap.to(text.words, {
      y: '0%',
      opacity: 1,
      duration: 1,
      stagger: 0.05,
      ease: 'power4.out',
      delay: delay,
    });

    return () => text.revert(); 
  }, [delay, isReady]); // Re-run this effect when isReady becomes true

  return (
    <div className="overflow-hidden">
      <div ref={textRef} className={cn("will-change-transform", className)}>
        {children}
      </div>
    </div>
  );
};

export default AnimateTitle;