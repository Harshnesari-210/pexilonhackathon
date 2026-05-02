import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Lock, Truck, CreditCard, Check } from 'lucide-react';
import ConfettiBurst from '../common/ConfettiBurst';

const SHIPPING_FLAT = 9.99;
const TAX_RATE = 0.08;

const inputClass =
  'w-full rounded-xl bg-white/[0.06] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-[#CCFF00]/60 focus:ring-1 focus:ring-[#CCFF00]/40 transition-colors';

const Checkout = ({ open, draft, onClose, onOrderComplete }) => {
  const [step, setStep] = useState('form');
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [form, setForm] = useState({
    email: '',
    fullName: '',
    address1: '',
    city: '',
    postal: '',
    country: 'United States',
  });

  useEffect(() => {
    if (open) {
      setStep('form');
      setSubmitting(false);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const { subtotal, tax, total } = useMemo(() => {
    if (!draft) return { subtotal: 0, tax: 0, total: 0 };
    const sub = draft.unitPrice * draft.quantity;
    const taxAmt = Math.round(sub * TAX_RATE * 100) / 100;
    const tot = Math.round((sub + SHIPPING_FLAT + taxAmt) * 100) / 100;
    return { subtotal: sub, tax: taxAmt, total: tot };
  }, [draft]);

  if (!open || !draft) return null;

  const canSubmit =
    form.email.trim() &&
    form.fullName.trim() &&
    form.address1.trim() &&
    form.city.trim() &&
    form.postal.trim();

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handlePlaceOrder = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setOrderId(`PX-${Date.now().toString(36).toUpperCase().slice(-8)}`);
    setStep('success');
  };

  const handleBackToStore = () => {
    const completed = step === 'success';
    setStep('form');
    onClose();
    if (completed) onOrderComplete?.();
  };

  return (
    <div
      className="fixed inset-0 z-[200] bg-[#050505] text-white overflow-y-auto overscroll-contain"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
      data-lenis-prevent
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[min(90vw,520px)] h-[min(90vw,520px)] rounded-full blur-[120px] opacity-25 pointer-events-none"
        style={{ backgroundColor: draft.productBuild?.accentColor ?? draft.mood.color }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-5 pt-[max(5.5rem,env(safe-area-inset-top))] pb-[max(3rem,env(safe-area-inset-bottom))] md:px-8 md:pt-28 md:pb-16">
        <button
          type="button"
          onClick={handleBackToStore}
          className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-white/50 hover:text-[#CCFF00] transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          Continue shopping
        </button>

        {step === 'success' ? (
          <>
            <ConfettiBurst key={orderId} />
            <div className="max-w-md mx-auto text-center py-12 md:py-20 relative z-10">
            <div className="w-16 h-16 mx-auto mb-8 rounded-full bg-[#CCFF00]/15 border border-[#CCFF00]/40 flex items-center justify-center">
              <Check className="w-8 h-8 text-[#CCFF00]" strokeWidth={2} />
            </div>
            <p className="text-xs font-mono tracking-[0.35em] text-white/40 uppercase mb-3">
              Order confirmed
            </p>
            <h1 id="checkout-title" className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              You&apos;re in the queue.
            </h1>
            <p className="text-white/55 text-sm leading-relaxed mb-8">
              Reference <span className="text-[#CCFF00] font-mono">{orderId}</span>. A receipt is
              headed to {form.email}.
            </p>
            <button
              type="button"
              onClick={handleBackToStore}
              className="w-full md:w-auto px-10 py-4 bg-[#CCFF00] text-black font-bold rounded-xl text-[10px] uppercase tracking-widest hover:bg-[#b3e600] transition-colors"
            >
              Back to site
            </button>
          </div>
          </>
        ) : (
          <>
            <header className="mb-10 md:mb-14">
              <p className="text-xs font-mono tracking-[0.3em] text-white/40 uppercase mb-3">
                Secure checkout
              </p>
              <h1 id="checkout-title" className="text-3xl md:text-5xl font-bold tracking-tight">
                Complete your order.
              </h1>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
              <div className="lg:col-span-3 space-y-8">
                <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-white/90 font-semibold mb-6">
                    <Truck className="w-4 h-4 text-[#CCFF00]" strokeWidth={1.5} />
                    Shipping
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-white/45 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        autoComplete="email"
                        className={inputClass}
                        placeholder="you@domain.com"
                        value={form.email}
                        onChange={update('email')}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-white/45 mb-2">
                        Full name
                      </label>
                      <input
                        type="text"
                        autoComplete="name"
                        className={inputClass}
                        placeholder="Name on the label"
                        value={form.fullName}
                        onChange={update('fullName')}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-white/45 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        autoComplete="street-address"
                        className={inputClass}
                        placeholder="Street, unit"
                        value={form.address1}
                        onChange={update('address1')}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-white/45 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        className={inputClass}
                        placeholder="City"
                        value={form.city}
                        onChange={update('city')}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-white/45 mb-2">
                        Postal code
                      </label>
                      <input
                        type="text"
                        autoComplete="postal-code"
                        className={inputClass}
                        placeholder="ZIP / Postal"
                        value={form.postal}
                        onChange={update('postal')}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-white/45 mb-2">
                        Country
                      </label>
                      <select
                        className={`${inputClass} appearance-none cursor-pointer`}
                        value={form.country}
                        onChange={update('country')}
                      >
                        {['United States', 'Canada', 'United Kingdom', 'India', 'Other'].map(
                          (c) => (
                            <option key={c} value={c} className="bg-neutral-900">
                              {c}
                            </option>
                          ),
                        )}
                      </select>
                    </div>
                  </div>
                </section>

                <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-white/90 font-semibold mb-2">
                    <CreditCard className="w-4 h-4 text-[#CCFF00]" strokeWidth={1.5} />
                    Payment
                  </div>
                  <p className="text-xs text-white/45 mb-6">
                    Demo only — no card is charged. Connect Stripe or your PSP when you go live.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 opacity-60 pointer-events-none">
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-white/45 mb-2">
                        Card number
                      </label>
                      <input
                        className={inputClass}
                        placeholder="4242 4242 4242 4242"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-white/45 mb-2">
                        Expiry
                      </label>
                      <input className={inputClass} placeholder="MM / YY" readOnly />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-white/45 mb-2">
                        CVC
                      </label>
                      <input className={inputClass} placeholder="123" readOnly />
                    </div>
                  </div>
                </section>
              </div>

              <aside className="lg:col-span-2">
                <div className="lg:sticky lg:top-28 rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-7 backdrop-blur-md">
                  <h2 className="text-sm font-bold text-white mb-6">Order summary</h2>

                  <div className="flex gap-4 pb-6 border-b border-white/10">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/5 shrink-0 border border-white/10">
                      <img
                        src={draft.mood.hpImg}
                        alt=""
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-white truncate">Acoustic Delivery System</p>
                      <p className="text-xs text-[#CCFF00] mt-1">{draft.mood.name}</p>
                      <p className="text-[11px] text-white/50 mt-2 line-clamp-2">
                        {draft.prescription}
                      </p>
                      <p className="text-xs text-white/40 mt-2">Qty {draft.quantity}</p>
                      {draft.productBuild && (
                        <ul className="text-[10px] text-white/45 mt-3 space-y-1 font-mono uppercase tracking-wider">
                          <li>
                            Aura: {draft.productBuild.accentLabel}
                            {draft.productBuild.finish ? ` · ${draft.productBuild.finish}` : ''}
                          </li>
                          {draft.productBuild.engraving ? (
                            <li className="text-[#CCFF00]/90 tracking-[0.2em]">
                              “{draft.productBuild.engraving}”
                            </li>
                          ) : null}
                          {draft.productBuild.configSignature ? (
                            <li className="text-white/55 normal-case tracking-normal">
                              {draft.productBuild.configSignature}
                            </li>
                          ) : null}
                        </ul>
                      )}
                    </div>
                  </div>

                  <dl className="space-y-3 text-sm mt-6">
                    <div className="flex justify-between text-white/60">
                      <dt>Subtotal</dt>
                      <dd className="text-white tabular-nums">${subtotal.toFixed(2)}</dd>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <dt>Shipping</dt>
                      <dd className="text-white tabular-nums">${SHIPPING_FLAT.toFixed(2)}</dd>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <dt>Est. tax</dt>
                      <dd className="text-white tabular-nums">${tax.toFixed(2)}</dd>
                    </div>
                    <div className="flex justify-between text-base font-bold text-white pt-4 border-t border-white/10">
                      <dt>Total</dt>
                      <dd className="tabular-nums text-[#CCFF00]">${total.toFixed(2)}</dd>
                    </div>
                  </dl>

                  <button
                    type="button"
                    disabled={!canSubmit || submitting}
                    onClick={handlePlaceOrder}
                    className="mt-8 w-full flex items-center justify-center gap-2 bg-[#CCFF00] hover:bg-[#b3e600] disabled:opacity-40 disabled:pointer-events-none text-black font-bold py-4 rounded-xl text-[10px] uppercase tracking-widest transition-colors"
                  >
                    {submitting ? (
                      'Processing…'
                    ) : (
                      <>
                        <Lock className="w-4 h-4" strokeWidth={2} />
                        Place order
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-white/35 text-center mt-4 leading-relaxed">
                    Encrypted checkout demo. Replace with real payment + order API.
                  </p>
                </div>
              </aside>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
