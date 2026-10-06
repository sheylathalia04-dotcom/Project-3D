import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Translations } from '../../i18n/translations';

interface FAQProps {
  t: Translations;
}

export const FAQ: React.FC<FAQProps> = ({ t }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 },
    { q: t.faq.q4, a: t.faq.a4 },
    { q: t.faq.q5, a: t.faq.a5 },
    { q: t.faq.q6, a: t.faq.a6 },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-mono text-[#059669] tracking-wider mb-2 font-bold uppercase">
            PREGUNTAS FRECUENTES (FAQ)
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Dudas Técnicas Habituales
          </h2>
          <p className="mt-3 text-base text-[#475569] leading-relaxed max-w-xl mx-auto">
            Resolvemos las consultas más comunes de ingenieros y responsables de compras sobre materiales, tolerancias, archivos y plazos.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#FAFBFD] border border-slate-200 rounded-xl overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 transition-colors hover:bg-slate-100/60 cursor-pointer"
                >
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#0F172A]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#059669] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-[#475569] leading-relaxed border-t border-slate-200/60 font-sans">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
