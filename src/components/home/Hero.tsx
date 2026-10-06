import React, { useRef, useState } from 'react';
import {
  Upload,
  ArrowRight,
  ShieldCheck,
  Zap,
  MapPin,
  Sparkles,
  CheckCircle2,
  Cpu,
  Layers,
} from 'lucide-react';
import { Translations } from '../../i18n/translations';
import heroPrintImg from '../../assets/images/industrial_3d_print_1791194311965.jpg';

interface HeroProps {
  t: Translations;
  onCtaClick: () => void;
  onServicesClick: () => void;
  onFileSelect?: (file: File) => void;
  onSampleSelect?: (sample: 'gear' | 'bracket' | 'turbine' | 'cube') => void;
}

export const Hero: React.FC<HeroProps> = ({
  t,
  onCtaClick,
  onServicesClick,
  onFileSelect,
  onSampleSelect,
}) => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (onFileSelect) {
        onFileSelect(e.dataTransfer.files[0]);
      }
      onCtaClick();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (onFileSelect) {
        onFileSelect(e.target.files[0]);
      }
      onCtaClick();
    }
  };

  return (
    <section id="inicio" className="relative overflow-hidden bg-[#FAFBFD] py-12 lg:py-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Split 2-Column Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline, Technical Badges, Subtitle & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Badges superiores de confianza B2B */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-[#0F172A] font-semibold shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
                Tolerancias ISO 2768
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#059669] font-bold shadow-xs">
                <Zap className="w-3.5 h-3.5 text-[#059669]" />
                Entrega Express 24/48h
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-[#0F172A] font-semibold shadow-xs">
                <MapPin className="w-3.5 h-3.5 text-[#059669]" />
                Fabricado en Torrijos (España)
              </span>
            </div>

            {/* Titular gigante (weight 900) con degradado neón en MÁXIMA PRECISIÓN */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0F172A] leading-[1.08] font-sans">
              INGENIERÍA Y FABRICACIÓN 3D DE{' '}
              <span className="bg-gradient-to-r from-[#059669] to-[#10B981] bg-clip-text text-transparent">
                MÁXIMA PRECISIÓN
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#475569] max-w-2xl leading-relaxed">
              Servicios industriales de prototipado funcional, fabricación aditiva de polímeros de ingeniería (FDM, SLA, SLS) y series cortas certificadas. De tu archivo digital a la pieza física con control dimensional riguroso.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                type="button"
                onClick={onCtaClick}
                className="px-8 py-4 bg-[#059669] hover:bg-[#047857] text-white font-bold rounded-2xl transition-all shadow-md shadow-emerald-600/25 text-sm font-mono flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <Upload className="w-4 h-4" />
                <span>Presupuestar Archivo STL</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onServicesClick}
                className="px-7 py-4 bg-white hover:bg-slate-50 text-[#0F172A] border border-slate-300 font-semibold rounded-2xl transition-colors text-sm font-mono flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Explorar Servicios</span>
              </button>
            </div>

            {/* Micro Technical Stats */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-xs font-mono">
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#059669]">±0.08 mm</p>
                <p className="text-[#475569] text-[11px] mt-0.5">Tolerancia estándar</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#0F172A]">5+ Polímeros</p>
                <p className="text-[#475569] text-[11px] mt-0.5">Grado ingeniería</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#059669]">24h - 48h</p>
                <p className="text-[#475569] text-[11px] mt-0.5">Servicio Express</p>
              </div>
            </div>
          </div>

          {/* Right Column: High-Quality Industrial 3D Print Render with 2 Floating Glassmorphic Cards */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200 rounded-3xl p-3 sm:p-4 shadow-xl relative overflow-hidden group">
              {/* Image Frame Container */}
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-900 border border-slate-100">
                <img
                  src={heroPrintImg}
                  alt="Cabezal de impresión 3D industrial fabricando una pieza técnica compleja"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle dark gradient overlay to ensure text contrast for glassmorphic cards */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/20 pointer-events-none" />

                {/* Floating Glassmorphic Card 1: "Tolerancia: ±0.1 mm" */}
                <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md border border-white/70 shadow-lg px-3.5 py-2 rounded-xl flex items-center gap-2 text-xs font-mono text-[#0F172A] animate-in fade-in slide-in-from-top-2 duration-300">
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                  <span className="font-bold tracking-tight">Tolerancia: ±0.1 mm</span>
                </div>

                {/* Floating Glassmorphic Card 2: "Material: ABS Industrial / SLA" */}
                <div className="absolute bottom-4 right-4 z-20 bg-white/90 backdrop-blur-md border border-white/70 shadow-lg px-3.5 py-2 rounded-xl flex items-center gap-2 text-xs font-mono text-[#0F172A] animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#059669] animate-pulse shrink-0" />
                  <span className="font-bold tracking-tight">Material: ABS Industrial / SLA</span>
                </div>

                {/* Badge Status in top right */}
                <div className="absolute top-4 right-4 z-10 bg-slate-900/80 backdrop-blur-md text-white border border-white/20 px-2.5 py-1 rounded-lg text-[10px] font-mono flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-semibold">Taller Torrijos</span>
                </div>
              </div>

              {/* Direct Drag & Drop / Instant Quote Bar below the Image */}
              <div className="mt-3.5 pt-3 border-t border-slate-100">
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                  }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-3.5 rounded-xl border border-dashed transition-all flex items-center justify-between gap-3 cursor-pointer ${
                    isDragOver
                      ? 'border-[#059669] bg-emerald-50'
                      : 'border-slate-300 hover:border-[#059669] bg-[#FAFBFD] hover:bg-emerald-50/50'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".stl"
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 text-[#059669] flex items-center justify-center shrink-0">
                      <Upload className="w-4 h-4" />
                    </div>
                    <div className="text-left font-mono">
                      <p className="text-xs font-bold text-[#0F172A]">
                        Arrastra tu archivo .STL o haz clic
                      </p>
                      <p className="text-[10px] text-[#475569]">
                        Estimación instantánea sin login previo
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1.5 bg-[#059669] hover:bg-[#047857] text-white text-[11px] font-mono font-bold rounded-lg transition-colors shrink-0 shadow-xs">
                    Subir STL
                  </span>
                </div>

                {/* Quick samples bar */}
                <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-[#475569]">
                  <span className="flex items-center gap-1 text-[10px]">
                    <Sparkles className="w-3 h-3 text-[#059669]" />
                    Muestras:
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        if (onSampleSelect) onSampleSelect('gear');
                        onCtaClick();
                      }}
                      className="px-2 py-0.5 rounded bg-slate-100 hover:bg-emerald-50 hover:text-[#059669] text-[#0F172A] border border-slate-200 transition-colors cursor-pointer text-[10px]"
                    >
                      Engranaje
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (onSampleSelect) onSampleSelect('bracket');
                        onCtaClick();
                      }}
                      className="px-2 py-0.5 rounded bg-slate-100 hover:bg-emerald-50 hover:text-[#059669] text-[#0F172A] border border-slate-200 transition-colors cursor-pointer text-[10px]"
                    >
                      Soporte
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (onSampleSelect) onSampleSelect('turbine');
                        onCtaClick();
                      }}
                      className="px-2 py-0.5 rounded bg-slate-100 hover:bg-emerald-50 hover:text-[#059669] text-[#0F172A] border border-slate-200 transition-colors cursor-pointer text-[10px]"
                    >
                      Turbina
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
