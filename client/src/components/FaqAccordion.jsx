import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function FaqAccordion({ faqs, dark = false }) {
  const [openId, setOpenId] = useState(faqs[0]?._id ?? null);

  return (
    <div className="space-y-3">
      {faqs.map((faq) => {
        const isOpen = openId === faq._id;
        return (
          <div
            key={faq._id}
            className={`rounded-lg border overflow-hidden ${
              dark ? 'border-white/25 bg-white/5' : 'border-primary-100 bg-white'
            }`}
          >
            <button
              onClick={() => setOpenId(isOpen ? null : faq._id)}
              className={`w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-semibold font-heading ${
                dark ? 'text-white' : 'text-primary-800'
              }`}
            >
              {faq.question}
              <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }} className={dark ? 'text-gold-500' : 'text-accent-600'}>
                &#9660;
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className={`px-5 pb-4 text-sm leading-relaxed ${dark ? 'text-primary-100' : 'text-primary-600'}`}>
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
