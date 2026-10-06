import React from 'react';
import { MapPin, Shield, Lock, FileCheck } from 'lucide-react';
import { Translations } from '../../i18n/translations';
import { Isologo3D } from '../brand/Isologo3D';

interface FooterProps {
  t: Translations;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ t, onOpenAdmin }) => {
  return (
    <footer className="bg-white border-t border-slate-200 text-[#475569] py-12 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-200">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <Isologo3D size={32} />
              <div>
                <span className="font-black text-sm text-[#0F172A] tracking-wider font-mono">
                  PROJECT <span className="text-[#059669]">3D</span>
                </span>
                <span className="text-[10px] font-mono text-[#475569] block">
                  PROTOTIPADO INDUSTRIAL • TORRIJOS
                </span>
              </div>
            </div>
            <p className="text-[#475569] text-xs max-w-md leading-relaxed font-sans">
              Plataforma integral de prototipado industrial, fabricación aditiva de alta precisión y producción de series cortas.
            </p>
            <p className="text-[11px] text-slate-500 leading-snug">
              Av. de los Trabajadores, 21 · Polígono Industrial Atalaya · 45500 Torrijos (Toledo, España). Frente al Vivero de Empresas (Ref. 22).
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-3">
              Capacidades Aditivas
            </h4>
            <ul className="space-y-1.5 text-[#475569]">
              <li>Prototipado FDM & SLA</li>
              <li>Sinterizado Láser Nylon SLS</li>
              <li>Polímeros Técnicos (PLA, PETG, ABS)</li>
              <li>Compuesto PA-CF Fibra de Carbono</li>
              <li>Galgas y Utillajes para CNC</li>
            </ul>
          </div>

          {/* Legal & Admin */}
          <div>
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-3">
              Garantía y Gestión
            </h4>
            <ul className="space-y-1.5 text-[#475569]">
              <li className="hover:text-[#0F172A] cursor-pointer">Acuerdo de Confidencialidad NDA</li>
              <li className="hover:text-[#0F172A] cursor-pointer">Política de Privacidad RGPD</li>
              <li className="hover:text-[#0F172A] cursor-pointer">Condiciones de Fabricación</li>
              <li className="pt-2">
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="text-[#059669] hover:text-[#047857] hover:underline flex items-center gap-1.5 cursor-pointer font-bold"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Login / Registro</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} PROJECT 3D. Todos los derechos reservados.</p>
          <div className="flex items-center gap-3">
            <span>Torrijos (Toledo, España)</span>
            <span>·</span>
            <span>Normativa RGPD & Metrología de Precisión</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
