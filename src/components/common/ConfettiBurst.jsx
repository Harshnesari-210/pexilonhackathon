import { useEffect, useState } from 'react';

const COLORS = ['#CCFF00', '#ffffff', '#FF2D6A', '#00F5FF', '#B066FF', '#f5f5f5'];

const ConfettiBurst = () => {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const n = 36;
    const next = Array.from({ length: n }, (_, i) => ({
      id: `${i}-${Date.now()}`,
      left: 20 + Math.random() * 60,
      drift: (Math.random() - 0.5) * 220,
      delay: Math.random() * 0.12,
      duration: 1.1 + Math.random() * 0.55,
      rotation: 360 + Math.random() * 540,
      color: COLORS[i % COLORS.length],
      w: 3 + Math.random() * 4,
      h: 4 + Math.random() * 6,
    }));
    setPieces(next);
    const t = window.setTimeout(() => setPieces([]), 2800);
    return () => window.clearTimeout(t);
  }, []);

  if (pieces.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[280] overflow-hidden"
      aria-hidden
    >
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece absolute rounded-[1px] top-[38%]"
          style={{
            left: `${p.left}%`,
            width: p.w,
            height: p.h,
            backgroundColor: p.color,
            boxShadow: `0 0 8px ${p.color}`,
            ['--drift']: `${p.drift}px`,
            ['--rot']: `${p.rotation}deg`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiBurst;
