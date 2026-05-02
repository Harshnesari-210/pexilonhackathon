import React from 'react';

const MoodCustomizer = ({ activeMood, setActiveMood, moods }) => {
  return (
    <section
      id="calibration"
      className="relative w-full min-h-screen bg-black py-24 sm:py-28 md:py-32 px-4 sm:px-6 border-t border-white/5 scroll-mt-28 md:scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-mono tracking-[0.3em] text-white/40 uppercase mb-4 text-center">
          Moods
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white tracking-tight text-center mb-4 px-2">
          Tune the vibe.
        </h2>
        <p className="text-white/50 text-center max-w-xl mx-auto mb-14 md:mb-16">
          Each profile restyles the drop. Pick one — hardware preview updates below.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {moods.map((mood) => {
            const isActive = activeMood?.id === mood.id;
            return (
              <button
                key={mood.id}
                type="button"
                onClick={() => setActiveMood(mood)}
                className={`group relative overflow-hidden rounded-2xl border text-left transition-all duration-300 aspect-[4/5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                  isActive
                    ? 'border-[#CCFF00] shadow-[0_0_40px_rgba(204,255,0,0.12)]'
                    : 'border-white/10 hover:border-white/25'
                }`}
              >
                <img
                  src={mood.bgImg}
                  alt=""
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${mood.imageClass ?? ''}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                {isActive && (
                  <div className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-[#CCFF00] shadow-[0_0_12px_#CCFF00]" />
                )}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1.5">
                    {mood.name}
                  </h3>
                  <p className="text-sm text-white/65 leading-snug">{mood.tag}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MoodCustomizer;
