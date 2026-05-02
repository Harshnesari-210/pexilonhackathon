import React, { useState, useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { Sparkles } from 'lucide-react';

const ACCENT_PRESETS = [
  { id: 'mood', label: 'Mood', color: null },
  { id: 'void', label: 'Void', color: '#CCFF00' },
  { id: 'plasma', label: 'Plasma', color: '#FF2D6A' },
  { id: 'ice', label: 'Ice', color: '#00F5FF' },
];

const ProductReveal = ({ activeMood, cartCount = 0, onAddToCart }) => {
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [prescription, setPrescription] = useState('');
  const [accentId, setAccentId] = useState('mood');
  const [finish, setFinish] = useState('gloss');
  const [engraving, setEngraving] = useState('');
  const hpRef = useRef(null);

  const glowColor = useMemo(() => {
    const preset = ACCENT_PRESETS.find((a) => a.id === accentId);
    return preset?.color ?? activeMood.color;
  }, [accentId, activeMood.color]);

  const finishClass =
    finish === 'matte'
      ? 'contrast-[1.06] saturate-[0.88] brightness-[0.93]'
      : 'contrast-[1.12] saturate-[1.18] brightness-[1.06]';

  const configSignature = useMemo(() => {
    const raw = `${activeMood.id}|${accentId}|${finish}|${engraving}`;
    let h = 5381;
    for (let i = 0; i < raw.length; i++) {
      h = (Math.imul(h, 33) + raw.charCodeAt(i)) | 0;
    }
    const hex = (h >>> 0).toString(16).toUpperCase().padStart(4, '0').slice(0, 4);
    return `PX-${activeMood.id.toUpperCase()}-${accentId.toUpperCase()}-${finish === 'matte' ? 'M' : 'G'}-${hex}`;
  }, [activeMood.id, accentId, finish, engraving]);

  const buildSnapshot = useMemo(
    () => ({
      accentId,
      accentLabel: ACCENT_PRESETS.find((a) => a.id === accentId)?.label ?? 'Mood',
      accentColor: glowColor,
      finish,
      engraving: engraving.trim().slice(0, 14),
      configSignature,
    }),
    [accentId, glowColor, finish, engraving, configSignature],
  );

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(hpRef.current, {
        y: "-=25",
        duration: 2.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
    });
    return () => ctx.revert();
  }, []);

  const runVibeCheck = async () => {
    setIsDiagnosing(true);
    setPrescription('');
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({ mood: activeMood?.id, timestamp: Date.now() }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });
      if (response.ok) {
        setTimeout(() => {
          setIsDiagnosing(false);
          setPrescription(`Calibration Complete. Optimized for ${activeMood?.name} Mode.`);
        }, 1500);
      }
    } catch (error) {
      setIsDiagnosing(false);
      setPrescription('Connection error.');
    }
  };

  const addToCart = () => {
    gsap.fromTo(hpRef.current, { scale: 1 }, { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1 });
    onAddToCart?.(prescription, buildSnapshot);
  };

  if (!activeMood) return null;

  return (
    <section id="hardware" className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center py-16 sm:py-24 px-0 overflow-x-hidden border-t border-white/5 scroll-mt-28 md:scroll-mt-24">
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[80vw] md:w-[600px] h-[600px] rounded-full blur-[150px] opacity-20 z-0 pointer-events-none transition-[opacity,transform] duration-700"
        style={{ backgroundColor: glowColor }}
      />

      <div className="relative z-10 text-center mb-10 px-4">
        <p className="text-xs font-mono tracking-[0.3em] text-white/40 uppercase mb-4">Hardware Profile</p>
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white tracking-tight px-2">
          Acoustic Delivery System.
        </h2>
      </div>

      {/* Floating Product & Specs */}
      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 items-center px-4 sm:px-6">
        {/* Specs Left */}
        <div className="hidden md:flex flex-col gap-8 text-left border-l border-white/10 pl-8">
          <div>
            <h4 className="text-white font-bold text-lg">Drivers</h4>
            <p className="text-white/50 text-sm">40mm Liquid Crystal Polymer</p>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg">Audio</h4>
            <p className="text-white/50 text-sm">360 Reality Audio Integration</p>
          </div>
        </div>

        {/* Headphone Center */}
        <div className="flex flex-col items-center justify-center h-[40vh] md:h-[50vh]">
          <div
            className="relative flex justify-center items-center w-full max-w-md h-full rounded-3xl transition-shadow duration-500 p-4"
            style={{
              boxShadow: `0 0 0 1px rgba(255,255,255,0.08), 0 0 80px -20px ${glowColor}`,
            }}
          >
            <img
              ref={hpRef}
              src={activeMood.hpImg}
              className={`w-full h-full object-contain max-h-[min(42vh,420px)] transition-[filter] duration-500 drop-shadow-[0_24px_60px_rgba(0,0,0,0.85)] ${finishClass}`}
              alt="Headphones"
            />
          </div>
          {buildSnapshot.engraving ? (
            <p className="mt-5 font-mono text-[10px] tracking-[0.45em] text-white/45 uppercase px-4 py-2 rounded-lg border border-white/15 bg-white/[0.04]">
              {buildSnapshot.engraving}
            </p>
          ) : (
            <p className="mt-5 text-[10px] font-mono text-white/25 uppercase tracking-[0.35em]">
              Optional engraving below
            </p>
          )}
        </div>

        {/* Specs Right */}
        <div className="hidden md:flex flex-col gap-8 text-right border-r border-white/10 pr-8">
          <div>
            <h4 className="text-white font-bold text-lg">Battery</h4>
            <p className="text-white/50 text-sm">30-hour runtime with Fast Charge</p>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg">Build</h4>
            <p className="text-white/50 text-sm">Hand-stitched protein leather</p>
          </div>
        </div>
      </div>

      {/* Void build — hackathon-speed customizer */}
      <div className="relative z-10 w-full max-w-2xl mt-10 sm:mt-14 px-4 sm:px-5">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-[#CCFF00]" strokeWidth={1.5} />
            <h3 className="text-sm font-bold text-white tracking-tight">Void build</h3>
            <span className="text-[10px] font-mono text-white/35 uppercase tracking-wider ml-auto">
              Live
            </span>
          </div>

          <p className="mb-6 rounded-lg border border-[#CCFF00]/25 bg-[#CCFF00]/[0.06] px-2.5 sm:px-3 py-2.5 text-center text-[9px] sm:text-[10px] font-mono tracking-wide sm:tracking-[0.12em] text-[#CCFF00] break-all leading-snug">
            <span className="text-white/45 block sm:inline sm:mr-1">Configuration ID ·</span>{' '}
            {configSignature}
          </p>

          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 mb-3">
                Aura color
              </p>
              <div className="flex flex-wrap gap-2">
                {ACCENT_PRESETS.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setAccentId(a.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border ${
                      accentId === a.id
                        ? 'border-[#CCFF00] bg-[#CCFF00]/10 text-white'
                        : 'border-white/10 bg-white/[0.04] text-white/60 hover:border-white/25'
                    }`}
                  >
                    {a.color && (
                      <span
                        className="w-3 h-3 rounded-full border border-white/20 shrink-0"
                        style={{ backgroundColor: a.color }}
                      />
                    )}
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 mb-3">
                Shell finish
              </p>
              <div className="flex gap-2">
                {['gloss', 'matte'].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFinish(f)}
                    className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${
                      finish === f
                        ? 'border-[#CCFF00] bg-[#CCFF00]/15 text-white'
                        : 'border-white/10 text-white/50 hover:border-white/20'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="void-engrave"
                className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 mb-2 block"
              >
                Engraving (14 chars)
              </label>
              <input
                id="void-engrave"
                type="text"
                maxLength={14}
                value={engraving}
                onChange={(e) => setEngraving(e.target.value.toUpperCase())}
                placeholder="YOUR TAG"
                className="w-full rounded-xl bg-white/[0.06] border border-white/10 px-4 py-3 text-sm text-white font-mono tracking-widest placeholder:text-white/25 focus:outline-none focus:border-[#CCFF00]/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Area */}
      <div className="relative z-10 w-full max-w-md mt-10 sm:mt-12 px-4 sm:px-5">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
          {prescription ? (
            <div className="space-y-6">
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <span className="text-[#CCFF00] font-mono text-sm tracking-tighter"> {prescription}</span>
                <p className="text-white mt-2 font-bold text-xl">${activeMood.id === 'retro' ? '199' : '349'}.00</p>
              </div>
              <button onClick={addToCart} className="w-full bg-[#CCFF00] hover:bg-[#b3e600] text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02]">
                Add to Cart ({cartCount})
              </button>
            </div>
          ) : (
            <button onClick={runVibeCheck} disabled={isDiagnosing} className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-all">
              {isDiagnosing ? 'Analyzing…' : 'Run calibration'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductReveal;