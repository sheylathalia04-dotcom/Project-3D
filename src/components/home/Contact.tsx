import React, { useState } from 'react';
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  Navigation,
} from 'lucide-react';
import { Translations } from '../../i18n/translations';

interface ContactProps {
  t: Translations;
}

export const Contact: React.FC<ContactProps> = ({ t }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setIsSubmitted(true);
  };

  return (
    <section id="contacto" className="py-20 bg-[#FAFBFD] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-mono text-[#059669] tracking-wider mb-2 font-bold uppercase">
            CONTACTO Y LOCALIZACIÓN DE REFERENCIA
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Oficina Técnica y Planta de Producción
          </h2>
          <p className="mt-3 text-base text-[#475569] leading-relaxed">
            Consúltanos sobre especificaciones técnicas, tolerancias ISO o visítanos en nuestra ubicación de referencia en Torrijos (Toledo).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Official Proposed Location & Contact Details */}
          <div className="lg:col-span-6 space-y-6">
            {/* Location Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#059669] border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0F172A] font-mono">
                    Ubicación Propuesta para el Proyecto
                  </h3>
                  <p className="text-xs text-[#059669] font-mono mt-0.5 font-bold">
                    Polígono Industrial Atalaya · Torrijos (Toledo)
                  </p>
                </div>
              </div>

              {/* Exact Address */}
              <div className="bg-[#FAFBFD] border border-slate-200 rounded-xl p-4 text-xs font-mono space-y-1 text-[#475569] mb-4">
                <p className="font-bold text-[#0F172A]">PROJECT 3D</p>
                <p>Av. de los Trabajadores, 21 · Polígono Industrial Atalaya</p>
                <p>45500 Torrijos, Toledo, España</p>
                <p className="text-[#059669] pt-1.5 border-t border-slate-200 font-bold">
                  Situada frente al Vivero de Empresas de Torrijos (Ref. 22)
                </p>
              </div>

              {/* Note on Proposed Location */}
              <p className="text-[11px] text-[#475569] leading-relaxed border-l-2 border-[#059669] pl-3 font-sans">
                Nota: Tratada estrictamente como propuesta de ubicación del proyecto frente al Vivero de Empresas de Torrijos. Enlace rápido con el eje A-40 / A-5 hacia Madrid, Toledo y Talavera de la Reina.
              </p>
            </div>

            {/* Operating Hours and Channels */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 text-xs font-mono shadow-xs">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#059669] shrink-0" />
                <div>
                  <span className="text-[#475569] block text-[10px]">Horario Taller y Oficina Técnica:</span>
                  <span className="text-[#0F172A] font-semibold">Lunes a Viernes: 08:00 - 18:30 (Ininterrumpido)</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#059669] shrink-0" />
                <div>
                  <span className="text-[#475569] block text-[10px]">Correo Oficina Técnica:</span>
                  <span className="text-[#0F172A] font-semibold">ingenieria@project3d-torrijos.es</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#059669] shrink-0" />
                <div>
                  <span className="text-[#475569] block text-[10px]">Atención Técnica:</span>
                  <span className="text-[#0F172A] font-semibold">+34 925 770 000 (Centralita Taller)</span>
                </div>
              </div>
            </div>

            {/* Schematic Map Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs relative overflow-hidden">
              <div className="flex items-center justify-between mb-3 text-xs font-mono">
                <span className="text-[#0F172A] font-bold flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-[#059669]" />
                  <span>Acceso Polígono Industrial Atalaya (Torrijos, Toledo)</span>
                </span>
                <span className="text-slate-400 text-[10px]">Autovía A-40</span>
              </div>
              
              <div className="h-44 bg-[#FAFBFD] border border-slate-200 rounded-xl relative overflow-hidden flex items-center justify-center">
                <div className="absolute top-1/2 left-0 right-0 h-3 bg-slate-200 -translate-y-1/2 flex items-center justify-around">
                  <span className="text-[9px] font-mono text-slate-500 font-semibold">Autovía A-40 (Madrid ↔ Torrijos ↔ Toledo)</span>
                </div>
                <div className="absolute top-0 bottom-0 left-1/3 w-3 bg-slate-200 flex items-center justify-center">
                  <span className="text-[8px] font-mono text-slate-500 rotate-90 whitespace-nowrap">Av. de los Trabajadores</span>
                </div>

                <div className="relative z-10 bg-[#059669] text-white px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold shadow-md shadow-emerald-600/30 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>PROJECT 3D (Ref. 22)</span>
                </div>

                <div className="absolute bottom-3 right-4 z-10 bg-white border border-slate-300 px-2.5 py-1 rounded-lg text-[10px] font-mono text-[#0F172A] shadow-xs">
                  Vivero de Empresas
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <h3 className="text-base font-bold text-[#0F172A] font-mono mb-1">Envíanos una Consulta</h3>
            <p className="text-xs text-[#475569] mb-6 font-sans">
              Adjunta detalles sobre tolerancias o materiales. Respondemos en menos de 4 horas laborables.
            </p>

            {isSubmitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                <CheckCircle2 className="w-10 h-10 text-[#059669] mx-auto mb-3" />
                <h4 className="text-sm font-bold text-[#0F172A] font-mono">¡Mensaje Transmitido con Éxito!</h4>
                <p className="text-xs text-[#475569] mt-2 leading-relaxed font-sans">
                  Hemos recibido tu consulta técnica. Un ingeniero de PROJECT 3D revisará tu solicitud y se pondrá en contacto contigo a la brevedad.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-5 px-4 py-2 bg-white hover:bg-slate-50 text-[#0F172A] text-xs font-mono rounded-lg transition-colors border border-slate-200 font-semibold cursor-pointer shadow-xs"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-[#0F172A] font-semibold mb-1">Nombre Completo o Empresa *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Ing. Carlos Morales"
                    className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#059669] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[#0F172A] font-semibold mb-1">Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="carlos.morales@empresa.com"
                    className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#059669] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[#0F172A] font-semibold mb-1">Asunto / Tipo de Pieza</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Ej. Cotización serie corta en Nylon SLS"
                    className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#059669] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[#0F172A] font-semibold mb-1">Descripción del Proyecto *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Detalla requisitos técnicos, esfuerzos mecánicos, acabado superficial o plazos..."
                    className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#059669] focus:bg-white transition-all resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#059669] hover:bg-[#047857] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-600/25 hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar Mensaje a Ingeniería</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
