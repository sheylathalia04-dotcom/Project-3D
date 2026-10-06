import React, { useState } from 'react';
import { Translations } from '../../i18n/translations';

interface GalleryProps {
  t: Translations;
  onSelectSample?: (sampleName: string) => void;
}

interface ProjectItem {
  id: string;
  category: 'prototypes' | 'mechanics' | 'enclosures' | 'tooling';
  title: string;
  material: string;
  technology: string;
  dimensions: string;
  tolerance: string;
  description: string;
}

export const Gallery: React.FC<GalleryProps> = ({ t }) => {
  const [filter, setFilter] = useState<string>('all');

  const items: ProjectItem[] = [
    {
      id: 'p1',
      category: 'enclosures',
      title: 'Carcasa para Sensor Industrial IP67',
      material: 'ABS Grado Químico',
      technology: 'FDM Industrial + Vaporización',
      dimensions: '88 × 88 × 35.5 mm',
      tolerance: '±0.12 mm',
      description: 'Alojamiento para telemetría con ranura para junta tórica y sellado estanco al agua y polvo.',
    },
    {
      id: 'p2',
      category: 'mechanics',
      title: 'Engranaje Helicoidal M2 Z=32',
      material: 'Nylon SLS / PA12 Industrial',
      technology: 'Sinterizado Láser Selectivo',
      dimensions: '68 × 68 × 25.0 mm',
      tolerance: '±0.08 mm',
      description: 'Sustitución de engranaje metálico para reducción de ruido acústico y funcionamiento sin lubricante.',
    },
    {
      id: 'p3',
      category: 'mechanics',
      title: 'Soporte Motor NEMA 23 con Rigidizador',
      material: 'PA-CF Fibra de Carbono',
      technology: 'FDM Alta Temperatura',
      dimensions: '75 × 85 × 45.0 mm',
      tolerance: '±0.10 mm',
      description: 'Estructura ultraligera con nervaduras de refuerzo capaz de absorber pares de hasta 3.2 Nm.',
    },
    {
      id: 'p4',
      category: 'prototypes',
      title: 'Brazo Articulado para Robot SCARA',
      material: 'PETG de Alto Impacto',
      technology: 'FDM Cámara Calefactada',
      dimensions: '124.5 × 68 × 42 mm',
      tolerance: '±0.15 mm',
      description: 'Validación cinemática de ensambles antes de autorizar el mecanizado en duraluminio.',
    },
    {
      id: 'p5',
      category: 'tooling',
      title: 'Mordazas Blandas para Amarre CNC',
      material: 'PETG Técnico 100% Sólido',
      technology: 'FDM Relleno Continuo',
      dimensions: '110 × 40 × 32 mm',
      tolerance: '±0.10 mm',
      description: 'Negativo de sujeción para fijar piezas fundidas irregulares sin marcar la superficie.',
    },
    {
      id: 'p6',
      category: 'enclosures',
      title: 'Chasis para Electrónica con Guías PCB',
      material: 'Resina SLA Alta Precisión',
      technology: 'Estereolitografía Láser',
      dimensions: '95 × 60 × 28 mm',
      tolerance: '±0.05 mm',
      description: 'Carcasa para instrumentación con ranuras milimétricas para tarjetas electrónicas y pasacables.',
    },
  ];

  const filteredItems = filter === 'all' ? items : items.filter((item) => item.category === filter);

  return (
    <section id="galeria" className="py-20 bg-[#FAFBFD] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-mono text-[#059669] tracking-wider mb-2 font-bold uppercase">
              GALERÍA DE PRODUCTOS Y PIEZAS
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Componentes Industriales Fabricados
            </h2>
            <p className="mt-3 text-base text-[#475569] leading-relaxed">
              Muestra técnica de carcasas, prototipos funcionales y componentes mecánicos producidos bajo tolerancias ISO 2768.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl text-xs font-mono overflow-x-auto scrollbar-none shadow-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#059669] text-white font-bold shadow-xs'
                  : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-50'
              }`}
            >
              Todas las piezas
            </button>
            <button
              onClick={() => setFilter('enclosures')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                filter === 'enclosures'
                  ? 'bg-[#059669] text-white font-bold shadow-xs'
                  : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-50'
              }`}
            >
              Carcasas
            </button>
            <button
              onClick={() => setFilter('mechanics')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                filter === 'mechanics'
                  ? 'bg-[#059669] text-white font-bold shadow-xs'
                  : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-50'
              }`}
            >
              Mecánica
            </button>
            <button
              onClick={() => setFilter('prototypes')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                filter === 'prototypes'
                  ? 'bg-[#059669] text-white font-bold shadow-xs'
                  : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-50'
              }`}
            >
              Prototipos
            </button>
            <button
              onClick={() => setFilter('tooling')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                filter === 'tooling'
                  ? 'bg-[#059669] text-white font-bold shadow-xs'
                  : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-50'
              }`}
            >
              Utillajes
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 hover:border-slate-300 p-6 rounded-2xl flex flex-col justify-between transition-all duration-200 group shadow-xs hover:shadow-md"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#475569] mb-3">
                  <span className="text-[#059669] font-bold">{item.technology}</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span>{item.tolerance}</span>
                </div>

                <h3 className="text-base font-bold text-[#0F172A] font-mono mb-2 group-hover:text-[#059669] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#475569] leading-relaxed mb-5 font-sans">{item.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-1.5 text-xs font-mono text-[#475569]">
                <div className="flex justify-between">
                  <span>Material:</span>
                  <span className="text-[#0F172A] font-medium">{item.material}</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimensiones:</span>
                  <span className="text-[#0F172A]">{item.dimensions}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
