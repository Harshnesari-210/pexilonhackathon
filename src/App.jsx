import React, { useState, useCallback, useReducer, useEffect } from 'react';
import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';
import MoodCustomizer from './components/sections/MoodCustomizer';
import ProductReveal from './components/sections/ProductReveal';
import Checkout from './components/sections/Checkout';
import Footer from './components/sections/Footer';
import Support from './components/sections/Support';
import SmoothScroll from './components/common/SmoothScroll';

const MOODS = [
  { id: 'gym', name: 'The Iron', bgImg: '/gym-hamster.png', hpImg: '/hp-beats-red.png', color: '#8B0000', tag: 'Pre-workout engaged.', imageClass: 'object-right scale-110' },
  { id: 'sigma', name: 'The Sigma', bgImg: '/bateman.png', hpImg: '/hp-sony-gold.png', color: '#121212', tag: 'Deep work. Total focus.', imageClass: 'object-right scale-100' },
  { id: 'chill', name: 'The Disconnect', bgImg: '/sunset-hamster.png', hpImg: '/hp-white-air.png', color: '#D8C3A5', tag: 'The vibes are immaculate.', imageClass: 'object-right scale-110' },
  { id: 'retreat', name: 'Tactical Retreat', bgImg: '/mourinho.png', hpImg: '/hp-sony-gold.png', color: '#4A4A4A', tag: 'Meeting could have been an email.', imageClass: 'object-right scale-100' },
  { id: 'retro', name: 'Analog Soul', bgImg: '/monkey.png', hpImg: '/hp-retro-orange.png', color: '#8B5A2B', tag: 'Return to monke.', imageClass: 'object-right scale-100' }
];

const initialCart = { count: 0, draft: null };

function cartReducer(state, action) {
  if (action.type === 'ADD') {
    const count = state.count + 1;
    return {
      count,
      draft: {
        mood: action.payload.mood,
        quantity: count,
        prescription: action.payload.prescription,
        unitPrice: action.payload.unitPrice,
        productBuild: action.payload.productBuild ?? null,
      },
    };
  }
  if (action.type === 'CLEAR') {
    return initialCart;
  }
  return state;
}

function moodFromSearch() {
  if (typeof window === 'undefined') return null;
  const id = new URLSearchParams(window.location.search).get('mood');
  return MOODS.find((m) => m.id === id) ?? null;
}

function App() {
  const [activeMood, setActiveMood] = useState(() => moodFromSearch() ?? MOODS[0]);
  const [cart, dispatchCart] = useReducer(cartReducer, initialCart);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);

  const handleAddToCart = useCallback((prescription, productBuild) => {
    dispatchCart({
      type: 'ADD',
      payload: {
        mood: activeMood,
        prescription,
        unitPrice: activeMood.id === 'retro' ? 199 : 349,
        productBuild,
      },
    });
    setCheckoutOpen(true);
  }, [activeMood]);

  const handleCloseCheckout = useCallback(() => {
    setCheckoutOpen(false);
  }, []);

  const handleOrderComplete = useCallback(() => {
    dispatchCart({ type: 'CLEAR' });
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('mood', activeMood.id);
    const target = `${url.pathname}${url.search}`;
    if (target !== `${window.location.pathname}${window.location.search}`) {
      window.history.replaceState({}, '', target);
    }
  }, [activeMood.id]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (checkoutOpen) {
        handleCloseCheckout();
      } else if (supportOpen) {
        setSupportOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [checkoutOpen, supportOpen, handleCloseCheckout]);

  return (
    <main className="bg-black text-white selection:bg-[#CCFF00] selection:text-black font-sans overflow-x-hidden min-w-0 max-w-[100vw]">
      <SmoothScroll />
      <Navbar
        cartCount={cart.count}
        onOpenCheckout={() => cart.draft && setCheckoutOpen(true)}
        onCloseCheckout={handleCloseCheckout}
        checkoutOpen={checkoutOpen}
        supportOpen={supportOpen}
        onOpenSupport={() => setSupportOpen(true)}
        onCloseSupport={() => setSupportOpen(false)}
      />
      {supportOpen ? (
        <Support onBack={() => setSupportOpen(false)} />
      ) : (
        <>
          <Hero />
          <MoodCustomizer activeMood={activeMood} setActiveMood={setActiveMood} moods={MOODS} />
          <ProductReveal
            activeMood={activeMood}
            cartCount={cart.count}
            onAddToCart={handleAddToCart}
          />
          <Footer />
        </>
      )}
      <Checkout
        open={checkoutOpen}
        draft={cart.draft}
        onClose={handleCloseCheckout}
        onOrderComplete={handleOrderComplete}
      />
    </main>
  );
}

export default App;