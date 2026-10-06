import React, { useState, useEffect } from 'react';
import { Lock, X, ArrowRight, ShieldCheck, KeyRound, AlertCircle } from 'lucide-react';
import { Translations } from '../../i18n/translations';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  t?: Translations;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [passcode, setPasscode] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setPasscode('');
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = passcode.trim();
    if (
      trimmed === 'PROJECT3D-ADMIN' ||
      trimmed === 'admin123' ||
      trimmed === 'admin' ||
      trimmed === 'PROJECT3D'
    ) {
      sessionStorage.setItem('project3d_admin_auth', 'true');
      onSuccess();
      onClose();
    } else {
      setError('Código de acceso no válido. Utiliza la clave demo interactiva.');
    }
  };

  const handleFillDemo = () => {
    setPasscode('PROJECT3D-ADMIN');
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-7 sm:p-8 shadow-2xl z-10 animate-in zoom-in-95 duration-200 font-sans">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#059669] flex items-center justify-center shrink-0 shadow-xs">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#0F172A] font-mono leading-tight">
              Acceso Clientes / Admin
            </h3>
            <p className="text-xs text-[#475569] font-mono mt-0.5">
              Panel de Control y Taller de PROJECT 3D
            </p>
          </div>
        </div>

        <p className="text-xs text-[#475569] leading-relaxed mb-6">
          Introduce tu código de acceso para consultar el estado de fabricación de piezas STL o entrar al backoffice de gestión interna.
        </p>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-bold text-[#0F172A] mb-1.5">
              Código de acceso / Contraseña
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Introduce la contraseña..."
                autoFocus
                className="w-full bg-[#FAFBFD] border border-slate-300 rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#059669] focus:bg-white font-mono transition-colors"
              />
              <KeyRound className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Interactive Demo Key Note Required */}
          <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-3 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#059669] shrink-0" />
              <span className="text-[#0F172A] font-medium">Clave Demo Admin:</span>
              <span className="font-bold text-[#059669]">PROJECT3D-ADMIN</span>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[11px] font-bold text-[#059669] hover:underline cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors shadow-2xs"
            >
              Autocompletar
            </button>
          </div>

          {/* Primary Action Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-[#059669] hover:bg-[#047857] text-white font-bold rounded-xl text-xs font-mono transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-600/25 hover:shadow-lg hover:shadow-emerald-600/30 active:scale-[0.99]"
          >
            <span>Entrar al Panel de Control</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer link to cancel */}
        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-mono text-[#475569] hover:text-[#0F172A] transition-colors cursor-pointer"
          >
            Permanecer en el Sitio Público
          </button>
        </div>
      </div>
    </div>
  );
};
