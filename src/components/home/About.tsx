import React from 'react';
import { Target, CheckCircle2, Factory, Compass } from 'lucide-react';
import { Translations } from '../../i18n/translations';

interface AboutProps {
  t: Translations;
}

export const About: React.FC<AboutProps> = ({ t }) => {
  return (
    <section id="empresa" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-mono text-[#059669] tracking-wider mb-2 font-bold uppercase">
            FILOSOFÍA DE INGENIERÍA Y RIGOR TÉCNICO
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Ingeniería Mecánica y Producción Ágil
          </h2>
        </div>

        {/* Philosophy Prose Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-7 space-y-4 text-[#475569] text-sm leading-relaxed">
            <p className="text-slate-800 font-medium">
              PROJECT 3D nace con la misión de eliminar las barreras entre el diseño CAD y la pieza física final. Nos enfocamos en ofrecer a la industria una vía directa, flexible y rigurosa para materializar componentes técnicos sin incurrir en los elevados costes y plazos de matricería o moldes tradicionales.
            </p>
            <p>
              Entendemos el prototipado industrial no solo como una réplica visual, sino como un elemento de validación crítica: ensayos de esfuerzo, comprobaciones de ajuste cinemático, compatibilidad química y resistencia térmica en condiciones de trabajo reales.
            </p>
            <p>
              Nuestras instalaciones y propuesta de proyecto se sitúan estratégicamente en el Polígono Industrial Atalaya de Torrijos (Toledo), conectando ágilmente con el corredor industrial de Castilla-La Mancha y la zona centro peninsular.
            </p>
          </div>

          <div className="lg:col-span-5 bg-[#FAFBFD] border border-slate-200 rounded-2xl p-6 relative overflow-hidden shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#059669] border border-emerald-200 flex items-center justify-center">
                <Factory className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0F172A] font-mono">UBICACIÓN TÉCNICA PROPUESTA</h3>
                <p className="text-xs text-[#475569] font-mono">Polígono Industrial Atalaya</p>
              </div>
            </div>
            <div className="space-y-2 text-xs font-mono text-[#475569] border-t border-slate-200 pt-4">
              <p className="font-bold text-[#0F172A]">PROJECT 3D</p>
              <p>Av. de los Trabajadores, 21</p>
              <p>Polígono Industrial Atalaya</p>
              <p>45500 Torrijos, Toledo, España</p>
              <div className="mt-3 pt-3 border-t border-slate-200">
                <p className="text-xs text-[#059669] font-bold">
                  Situada frente al Vivero de Empresas de Torrijos (Ref. 22)
                </p>
                <p className="text-[11px] text-slate-500 mt-1 font-sans">
                  Nota: Tratada como propuesta de ubicación del proyecto. Conexión directa por A-40 / A-5 con Madrid y Toledo.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FAFBFD] border border-slate-200 p-6 rounded-2xl hover:border-slate-300 transition-all shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-white text-[#059669] border border-slate-200 flex items-center justify-center mb-4 shadow-xs">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0F172A] mb-2 font-mono">¿Qué es el Prototipado Industrial?</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Es la fabricación preliminar de un componente con propiedades mecánicas análogas al producto final para someterlo a pruebas de montaje, ergonomía, resistencia y flujo de fluidos antes de lanzar la producción masiva.
            </p>
          </div>

          <div className="bg-[#FAFBFD] border border-slate-200 p-6 rounded-2xl hover:border-slate-300 transition-all shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-white text-[#059669] border border-slate-200 flex items-center justify-center mb-4 shadow-xs">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0F172A] mb-2 font-mono">¿A quién ayudamos?</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Equipos de I+D+i, departamentos de ingeniería mecánica, plantas industriales con necesidad de repuestos obsoletos, talleres de automatización, empresas de robótica y desarrolladores de dispositivos electrónicos.
            </p>
          </div>

          <div className="bg-[#FAFBFD] border border-slate-200 p-6 rounded-2xl hover:border-slate-300 transition-all shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-white text-[#059669] border border-slate-200 flex items-center justify-center mb-4 shadow-xs">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0F172A] mb-2 font-mono">Nuestra Propuesta de Valor</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Auditoría previa de imprimibilidad STL, trazabilidad de lote, selección de termoplásticos de alto rendimiento y asesoramiento técnico directo con ingenieros especialistas en fabricación aditiva.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
