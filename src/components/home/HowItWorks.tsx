import React from 'react';
import {
  Upload,
  Sliders,
  DollarSign,
  Printer,
  ArrowRight,
} from 'lucide-react';
import { Translations } from '../../i18n/translations';

interface HowItWorksProps {
  t: Translations;
  onCtaClick: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ t, onCtaClick }) => {
  const steps = [
    {
      number: '01',
      icon: Upload,
      title: '1. Subir STL',
      description: 'Arrastra tu archivo .STL al analizador 3D para extraer dimensiones milimétricas X, Y, Z, volumen y malla poligonal.',
    },
    {
      number: '02',
      icon: Sliders,
      title: '2. Configurar',
      description: 'Selecciona el polímero industrial (PLA, PETG, ABS, Resina SLA o Nylon SLS), resolución de capa, % de relleno y acabados.',
    },
    {
      number: '03',
      icon: DollarSign,
      title: '3. Estimación',
      description: 'Obtén al instante un desglose orientativo transparente de material, tiempo de máquina y descuento por volumen sin login previo.',
    },
    {
      number: '04',
      icon: Printer,
      title: '4. Fabricación',
      description: 'El equipo de PROJECT 3D valida la geometría, imprime en máquinas calibradas y realiza el control dimensional antes del envío.',
    },
  ];

  return (
    <section id="proceso" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <p className="text-xs font-mono text-[#059669] tracking-wider mb-2 font-bold uppercase">
            FLUJO DE PRODUCCIÓN
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Cómo Funciona el Proceso en 4 Pasos
          </h2>
          <p className="mt-3 text-base text-[#475569] leading-relaxed">
            Un flujo sin fricción diseñado para ingenieros y responsables de compras: sube tu modelo, recibe la estimación y nosotros nos encargamos del resto.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-[#FAFBFD] border border-slate-200 hover:border-slate-300 p-6 rounded-2xl transition-all relative flex flex-col justify-between group shadow-xs hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-3xl font-black text-[#059669]">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#0F172A] flex items-center justify-center group-hover:bg-[#059669] group-hover:text-white transition-colors shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-[#0F172A] font-mono mb-2 group-hover:text-[#059669] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#475569] leading-relaxed font-sans">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Action Button */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onCtaClick}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#059669] hover:bg-[#047857] text-white font-bold rounded-2xl text-xs font-mono transition-all cursor-pointer shadow-md shadow-emerald-600/25 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Subir Archivo STL y Calcular Estimación</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
