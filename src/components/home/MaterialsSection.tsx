import React, { useState } from 'react';
import { Layers, Flame, Gauge, ArrowRight, ShieldCheck, CheckCircle2, Sparkles, Activity } from 'lucide-react';

interface MaterialsSectionProps {
  onSelectMaterial: (materialId: string) => void;
}

interface MaterialData {
  id: string;
  name: string;
  category: string;
  tempC: number;
  tempLabel: string;
  tensileMpa: number;
  tensileLabel: string;
  impact: string;
  features: string;
  apps: string;
  badge: string;
  price: string;
}

export const MaterialsSection: React.FC<MaterialsSectionProps> = ({ onSelectMaterial }) => {
  const [activeMaterialId, setActiveMaterialId] = useState<string>('petg');

  const materialsList: MaterialData[] = [
    {
      id: 'pla',
      name: 'PLA Técnico',
      category: 'FDM Industrial',
      tempC: 55,
      tempLabel: '55 °C',
      tensileMpa: 48,
      tensileLabel: '48 MPa',
      impact: 'Media (3.4 kJ/m²)',
      features: 'Alta estabilidad dimensional, contracción casi nula y excelente fidelidad de aristas.',
      apps: 'Prototipos conceptuales rápidos, maquetas ergonómicas, verificación volumétrica y galgas.',
      badge: 'Prototipado Rápido',
      price: '0.08 €/cm³',
    },
    {
      id: 'abs',
      name: 'ABS Industrial',
      category: 'FDM Industrial',
      tempC: 98,
      tempLabel: '98 °C',
      tensileMpa: 45,
      tensileLabel: '45 MPa',
      impact: 'Muy Alta (22 kJ/m²)',
      features: 'Gran tenacidad, resistencia al impacto repetitivo y apto para postprocesado químico.',
      apps: 'Carcasas electrónicas, componentes de automoción y piezas sometidas a choque térmico.',
      badge: 'Térmico & Impacto',
      price: '0.13 €/cm³',
    },
    {
      id: 'petg',
      name: 'PETG',
      category: 'FDM Industrial',
      tempC: 78,
      tempLabel: '78 °C',
      tensileMpa: 52,
      tensileLabel: '52 MPa',
      impact: 'Alta (8.5 kJ/m²)',
      features: 'Resistencia a aceites, alcoholes y químicos. Estanqueidad hidráulica y alta ductilidad.',
      apps: 'Piezas mecánicas funcionales, conductos presurizados, soportes mecánicos y carcasas.',
      badge: 'Resistencia Química',
      price: '0.11 €/cm³',
    },
    {
      id: 'sla_standard',
      name: 'Resina SLA',
      category: 'Estereolitografía Láser',
      tempC: 65,
      tempLabel: '65 °C',
      tensileMpa: 62,
      tensileLabel: '62 MPa',
      impact: 'Media-Alta (4.8 kJ/m²)',
      features: 'Resolución micrométrica sin capas visibles, superficie lisa idéntica al moldeo por inyección.',
      apps: 'Moldes maestros de silicona, micro-mecanismos de precisión y piezas médicas de exhibición.',
      badge: 'Ultra Definición',
      price: '0.28 €/cm³',
    },
    {
      id: 'nylon_sls',
      name: 'Nylon SLS (PA12)',
      category: 'Sinterizado Láser Selectivo',
      tempC: 165,
      tempLabel: '165 °C',
      tensileMpa: 50,
      tensileLabel: '50 MPa',
      impact: 'Extrema (32 kJ/m²)',
      features: 'Piezas 100% isotrópicas sin soportes, resistencia a fatiga dinámica y fricción continua.',
      apps: 'Series cortas de producción final, engranajes técnicos de alta velocidad y piezas de vuelo.',
      badge: 'Producción Directa',
      price: '0.32 €/cm³',
    },
  ];

  // Maximum scales for graphical progress bars: Temp max 200°C, Tensile max 80 MPa
  const maxTemp = 180;
  const maxTensile = 70;

  return (
    <section id="materiales" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-mono text-[#059669] font-bold tracking-wider mb-2 uppercase">
            FICHAS TÉCNICAS DE MATERIALES
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            Polímeros Técnicos y Termoplásticos de Ingeniería
          </h2>
          <p className="mt-3 text-base text-[#475569] leading-relaxed">
            Indicadores normalizados de Resistencia Térmica (°C) y Dureza Mecánica (MPa) para seleccionar el material óptimo según la carga de trabajo de tu pieza.
          </p>
        </div>

        {/* 5 Material Datasheet Cards with Visual Progress Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materialsList.map((m) => {
            const tempPercent = Math.min(100, Math.round((m.tempC / maxTemp) * 100));
            const tensilePercent = Math.min(100, Math.round((m.tensileMpa / maxTensile) * 100));

            return (
              <div
                key={m.id}
                className="bg-[#FAFBFD] border border-slate-200 hover:border-slate-300 rounded-2xl p-6 flex flex-col justify-between transition-all hover:shadow-lg hover:shadow-slate-200/50 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono text-[#475569] font-medium uppercase">
                      {m.category}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-[#059669] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      {m.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-[#0F172A] mb-1 font-mono group-hover:text-[#059669] transition-colors">
                    {m.name}
                  </h3>
                  <p className="text-xs text-[#475569] mb-4 leading-relaxed font-sans">{m.features}</p>

                  {/* Interactive Visual Indicators for Resistencia Térmica and Dureza Mecánica */}
                  <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 space-y-3 font-mono text-xs shadow-2xs">
                    {/* Visual Bar 1: Resistencia Térmica */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[#475569] flex items-center gap-1.5 text-[11px] font-medium">
                          <Flame className="w-3.5 h-3.5 text-[#059669]" />
                          Resistencia Térmica
                        </span>
                        <span className="font-bold text-[#0F172A]">{m.tempLabel}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-[#059669] to-[#10B981] h-2 rounded-full transition-all duration-500"
                          style={{ width: `${tempPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Visual Bar 2: Dureza Mecánica / Tensión */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[#475569] flex items-center gap-1.5 text-[11px] font-medium">
                          <Gauge className="w-3.5 h-3.5 text-[#059669]" />
                          Dureza Mecánica (Tracción)
                        </span>
                        <span className="font-bold text-[#0F172A]">{m.tensileLabel}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-[#059669] to-[#10B981] h-2 rounded-full transition-all duration-500"
                          style={{ width: `${tensilePercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Impact Spec */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-[#475569]">Resistencia al Choque:</span>
                      <span className="font-semibold text-[#0F172A]">{m.impact}</span>
                    </div>
                  </div>

                  <div className="text-xs text-[#475569] mb-4">
                    <span className="font-semibold text-[#0F172A]">Aplicaciones clave: </span>
                    {m.apps}
                  </div>
                </div>

                {/* Card Footer with Price and Direct Button */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block">Tarifa base</span>
                    <span className="text-sm font-mono font-bold text-[#0F172A]">{m.price}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectMaterial(m.id)}
                    className="px-3.5 py-2 bg-[#059669] hover:bg-[#047857] text-white rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer hover:shadow-md"
                  >
                    <span>Cotizar con {m.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Consultation Card in Titanium Style */}
          <div className="bg-[#FAFBFD] border-2 border-dashed border-emerald-300 rounded-2xl p-6 flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#059669] border border-emerald-200 flex items-center justify-center mb-4 shadow-xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-mono text-[#0F172A] mb-2">¿Necesitas otro polímero?</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Fabricamos también en TPU 95A flexible, compuestos reforzados con Fibra de Carbono (PA-CF) y resinas de grado biocompatible o calcinable bajo consulta técnica directa.
              </p>
            </div>
            <div className="pt-6">
              <a
                href="#contacto"
                className="w-full py-3 bg-white hover:bg-slate-50 text-[#0F172A] border border-slate-300 font-bold rounded-xl text-xs font-mono flex items-center justify-center gap-2 transition-colors shadow-2xs"
              >
                <span>Consultar con Oficina Técnica</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#059669]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
