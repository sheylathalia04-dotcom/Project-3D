import React from 'react';
import {
  Cpu,
  Layers,
  Wrench,
  Boxes,
  ArrowRight,
} from 'lucide-react';
import { Translations } from '../../i18n/translations';

interface ServicesProps {
  t: Translations;
  onSelectService: () => void;
}

export const Services: React.FC<ServicesProps> = ({ t, onSelectService }) => {
  const serviceCards = [
    {
      icon: Cpu,
      title: 'Prototipado Industrial',
      subtitle: 'Validación Funcional & Ergonomía',
      description: 'Ensayos cinemáticos, comprobación de esfuerzos mecánicos y análisis de ajuste con polímeros técnicos antes de matricería tradicional.',
      technologies: 'FDM Técnico · SLA Alta Precisión',
      materials: 'PETG · ABS · PA12 Nylon',
    },
    {
      icon: Layers,
      title: 'Impresión 3D (FDM / SLA / SLS)',
      subtitle: 'Fabricación Aditiva Multitecnología',
      description: 'Producción en cámaras climatizadas de alta temperatura y sinterizado láser para piezas con acabado isotrópico y libre de tensiones residuales.',
      technologies: 'FDM Industrial · Estereolitografía · SLS Poliamida',
      materials: 'PLA Técnico · Resina SLA · Nylon SLS · PA-CF',
    },
    {
      icon: Wrench,
      title: 'Piezas Funcionales & Repuestos',
      subtitle: 'Componentes de Ingeniería a Medida',
      description: 'Reproducción y optimización de componentes descatalogados, engranajes técnicos, carcasas específicas y adaptadores para maquinaria de planta.',
      technologies: 'Mecanizado de precisión & Aditiva',
      materials: 'Nylon PA12 · TPU 95A · ASA Resistente UV',
    },
    {
      icon: Boxes,
      title: 'Utillajes & Pequeñas Series',
      subtitle: 'Producción Ágil sin Moldes (10 - 500 uds)',
      description: 'Galgas de control Go/No-Go, mordazas blandas para centros de mecanizado CNC, plantillas de montaje y series cortas de entrega inmediata.',
      technologies: 'Nesting de bandeja optimizado',
      materials: 'Compuestos reforzados · Polímeros macizos',
    },
  ];

  return (
    <section id="servicios" className="py-20 bg-[#FAFBFD] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-mono text-[#059669] tracking-wider mb-2 font-bold uppercase">
            CAPACIDADES INDUSTRIALES
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Servicios Especializados de Fabricación Aditiva
          </h2>
          <p className="mt-3 text-base text-[#475569] leading-relaxed">
            Soluciones a medida para cada fase del desarrollo de piezas industriales: desde el prototipo preliminar hasta series finales para automoción, robótica y maquinaria.
          </p>
        </div>

        {/* 4 Core Industrial Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceCards.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 hover:border-slate-300 p-7 rounded-2xl transition-all duration-200 flex flex-col justify-between group shadow-xs hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#059669] border border-emerald-200 flex items-center justify-center group-hover:bg-[#059669] group-hover:text-white transition-colors shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono text-[#475569] font-medium uppercase bg-slate-100 px-2.5 py-1 rounded-full">
                      {s.technologies}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0F172A] mb-1 font-mono group-hover:text-[#059669] transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[#059669] font-mono font-bold mb-3">{s.subtitle}</p>
                  <p className="text-xs text-[#475569] leading-relaxed mb-6 font-sans">
                    {s.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#475569]">
                    <span className="text-[#0F172A] font-semibold">Materiales:</span> {s.materials}
                  </span>
                  <button
                    type="button"
                    onClick={onSelectService}
                    className="text-[#059669] hover:text-[#047857] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Cotizar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
