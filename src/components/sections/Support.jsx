import React from 'react';
import { ArrowLeft, Headphones, Package, Shield, Mail, MessageCircle } from 'lucide-react';

const SUPPORT_IMG = '/support.png';

const Support = ({ onBack }) => {
  return (
    <div className="relative min-h-screen bg-[#030303] text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(204,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(204,255,0,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_20%,black,transparent)]" />

      <div className="absolute top-1/4 -right-20 w-[420px] h-[420px] rounded-full bg-[#CCFF00]/[0.07] blur-[100px]" />
      <div className="absolute bottom-0 -left-20 w-[360px] h-[360px] rounded-full bg-[#CCFF00]/[0.05] blur-[90px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-5 pt-[max(6.5rem,env(safe-area-inset-top))] pb-[max(4rem,env(safe-area-inset-bottom))] md:pt-32 md:pb-28 md:px-8">
        <button
          type="button"
          onClick={onBack}
          className="group flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.28em] text-white/45 hover:text-[#CCFF00] transition-colors mb-12 md:mb-16"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" strokeWidth={1.5} />
          Back to experience
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-xs font-mono tracking-[0.35em] text-[#CCFF00] uppercase mb-4">
              Support · Signal desk
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase leading-[0.95] mb-6">
              Real humans.
              <br />
              <span className="text-white/35">Low latency.</span>
            </h1>
            <p className="text-white/55 text-sm sm:text-base md:text-lg leading-relaxed max-w-md mb-8 sm:mb-10">
              Calibration weird? Shipment stalled? Reach the team below — fast answers on orders,
              hardware, and warranty.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-10 sm:mb-12">
              <a
                href="mailto:signal@pixelon.dev"
                className="inline-flex items-center gap-2 rounded-full border border-[#CCFF00]/40 bg-[#CCFF00]/10 px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-[#CCFF00] hover:bg-[#CCFF00]/20 transition-colors"
              >
                <Mail className="w-4 h-4" strokeWidth={2} />
                Email the desk
              </a>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-[10px] font-mono uppercase tracking-wider text-white/40">
                <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                Avg. reply {'<'} 4h
              </span>
            </div>

            <ul className="space-y-4">
              {[
                {
                  icon: Package,
                  title: 'Orders & shipping',
                  body: 'Tracking, address changes, and pre-order batch windows.',
                },
                {
                  icon: Headphones,
                  title: 'Hardware & calibration',
                  body: 'Mood profiles, driver quirks, and “why is it humming”.',
                },
                {
                  icon: Shield,
                  title: 'Warranty',
                  body: '12-month defect coverage. No receipt drama.',
                },
              ].map(({ icon: Icon, title, body }) => (
                <li
                  key={title}
                  className="flex gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-sm"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#CCFF00]/25 bg-[#CCFF00]/5">
                    <Icon className="h-5 w-5 text-[#CCFF00]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm tracking-tight">{title}</h3>
                    <p className="text-xs text-white/50 mt-1 leading-relaxed">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative lg:pl-4">
            <div
              className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#CCFF00]/20 via-transparent to-transparent opacity-60 blur-2xl"
              aria-hidden
            />
            <figure className="relative rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-2 shadow-[0_0_0_1px_rgba(204,255,0,0.12),0_32px_80px_-20px_rgba(0,0,0,0.9)]">
              <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
                <img
                  src={SUPPORT_IMG}
                  alt="Support"
                  className="w-full h-auto object-cover aspect-[4/5] sm:aspect-auto sm:max-h-[min(72vh,640px)] object-center"
                />
              </div>
              <figcaption className="mt-4 px-3 pb-2 flex items-center justify-between gap-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/35">
                  Field notes
                </span>
                <span className="text-[10px] font-mono text-[#CCFF00]/80">PX-SUP-01</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
