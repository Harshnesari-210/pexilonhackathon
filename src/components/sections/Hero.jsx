import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { Volume2, VolumeX } from 'lucide-react';

// Add this file to /public (exact name):
// Dancin (KRONO Remix)  DANCE EDIT.mp3
const HERO_AUDIO_SRC = encodeURI('/Dancin (KRONO Remix)  DANCE EDIT.mp3');

const Hero = () => {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const introScreenRef = useRef(null);
  const progressRef = useRef(null);
  const contentRef = useRef(null);
  const soundOnRef = useRef(true);
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    soundOnRef.current = soundOn;
  }, [soundOn]);

  // Browsers block autoplay with sound; first real gesture unlocks playback.
  useEffect(() => {
    const unlock = () => {
      if (!soundOnRef.current) return;
      const a = audioRef.current;
      if (!a) return;
      a.play().catch(() => {});
    };
    const capOnce = { capture: true, once: true };
    const touchOnce = { capture: true, once: true, passive: true };
    document.documentElement.addEventListener('pointerdown', unlock, capOnce);
    document.documentElement.addEventListener('keydown', unlock, capOnce);
    document.documentElement.addEventListener('touchstart', unlock, touchOnce);
    return () => {
      document.documentElement.removeEventListener('pointerdown', unlock, capOnce);
      document.documentElement.removeEventListener('keydown', unlock, capOnce);
      document.documentElement.removeEventListener('touchstart', unlock, touchOnce);
    };
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible =
          entry.isIntersecting && entry.intersectionRatio > 0.15;
        const audio = audioRef.current;
        if (!audio) return;
        if (!visible) {
          audio.pause();
          return;
        }
        if (soundOnRef.current) {
          audio.play().catch(() => {});
        }
      },
      { threshold: [0, 0.15, 0.35, 0.6] },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const toggleSound = useCallback(async () => {
    const audio = audioRef.current;
    const next = !soundOnRef.current;
    soundOnRef.current = next;
    setSoundOn(next);

    if (!audio) return;

    if (next) {
      try {
        await audio.play();
      } catch {
        /* blocked until another gesture */
      }
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
    }

    const ctx = gsap.context(() => {
      gsap.set(contentRef.current, { opacity: 0 });
      gsap.set(progressRef.current, { scaleX: 0 });

      const tl = gsap.timeline();

      tl.to(progressRef.current, {
        scaleX: 1,
        duration: 1.1,
        ease: 'power2.inOut',
      })
        .call(() => {
          video?.play().catch(() => {});
          const a = audioRef.current;
          if (a && soundOnRef.current) {
            a.play().catch(() => {});
          }
        })
        .to(
          introScreenRef.current,
          {
            yPercent: -100,
            duration: 1.15,
            ease: 'expo.inOut',
          },
          '-=0.15',
        )
        .to(
          contentRef.current,
          { opacity: 1, duration: 0.85, ease: 'power2.out' },
          '-=0.45',
        )
        .call(() => {
          const a = audioRef.current;
          if (!a || !soundOnRef.current) return;
          if (a.paused) {
            a.play().catch(() => {});
          }
        });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden"
    >
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60 z-0"
      >
        <source src="/dancing.mp4" type="video/mp4" />
      </video>

      <div
        className="pointer-events-none absolute inset-0 z-[5] opacity-[0.04] mix-blend-overlay"
        aria-hidden
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.14) 2px,
            rgba(255,255,255,0.14) 4px
          )`,
        }}
      />

      <audio
        ref={audioRef}
        src={HERO_AUDIO_SRC}
        loop
        preload="auto"
        playsInline
        className="hidden"
      />

      <div ref={contentRef} className="relative z-10 text-center px-4 sm:px-6 max-w-[100vw]">
        <p className="text-[#CCFF00] font-mono text-[10px] sm:text-xs tracking-[0.35em] sm:tracking-[0.5em] mb-3 sm:mb-4 uppercase">
          Neural Audio Engine
        </p>
        <h1 className="text-[clamp(2.5rem,12vw,6.5rem)] md:text-[9vw] font-black leading-[0.88] tracking-tighter uppercase mb-6 sm:mb-8">
          Acoustic <br /> Escapism
        </h1>
        <button
          type="button"
          className="w-full max-w-[280px] sm:w-auto sm:max-w-none px-8 sm:px-10 py-3.5 sm:py-4 mx-auto bg-white text-black font-bold rounded-full uppercase text-[10px] tracking-widest hover:bg-[#CCFF00] transition-colors hover:scale-[1.03] active:scale-[0.98]"
          onClick={() =>
            document
              .getElementById('calibration')
              ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        >
          Enter the Void
        </button>
      </div>

      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={soundOn}
        aria-label={soundOn ? 'Mute hero music' : 'Play hero music'}
        className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 sm:right-6 md:bottom-10 md:right-10 z-[160] flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-3 py-2.5 sm:px-4 sm:py-3 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white backdrop-blur-md transition-all hover:border-[#CCFF00]/50 hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]"
      >
        {soundOn ? (
          <Volume2 className="h-4 w-4 text-[#CCFF00]" strokeWidth={2} />
        ) : (
          <VolumeX className="h-4 w-4 text-white/70" strokeWidth={2} />
        )}
        <span className="hidden sm:inline">{soundOn ? 'Sound on' : 'Sound'}</span>
      </button>

      <div
        ref={introScreenRef}
        onPointerDown={() => {
          if (soundOnRef.current) {
            audioRef.current?.play().catch(() => {});
          }
        }}
        className="absolute inset-0 z-[100] bg-black flex flex-col items-center justify-center cursor-pointer"
      >
        <p className="absolute bottom-[28%] left-0 right-0 text-center text-[10px] font-mono uppercase tracking-[0.35em] text-white/35 pointer-events-none">
          Tap to unlock audio
        </p>
        <div className="w-40 sm:w-56 h-[2px] bg-white/15 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full w-full bg-[#CCFF00] origin-left scale-x-0"
          />
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />
    </section>
  );
};

export default Hero;