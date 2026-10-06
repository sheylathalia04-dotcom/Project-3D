import React, { useState, useEffect } from 'react';
import {
  Lock,
  X,
  ArrowRight,
  ShieldCheck,
  KeyRound,
  AlertCircle,
  User,
  Mail,
  Building,
  CheckCircle2,
} from 'lucide-react';
import { Isologo3D } from '../brand/Isologo3D';

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  createdAt: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCustomerLogin: (user: CustomerUser) => void;
  onAdminLogin: () => void;
  initialTab?: 'login' | 'register';
  redirectMessage?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onCustomerLogin,
  onAdminLogin,
  initialTab = 'login',
  redirectMessage,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);

  // Login form state
  const [loginEmailOrCode, setLoginEmailOrCode] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');

  // Register form state
  const [regName, setRegName] = useState<string>('');
  const [regCompany, setRegCompany] = useState<string>('');
  const [regEmail, setRegEmail] = useState<string>('');
  const [regPassword, setRegPassword] = useState<string>('');

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setError(null);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const credential = loginEmailOrCode.trim();

    // Check for Admin access codes
    if (
      credential === 'PROJECT3D-ADMIN' ||
      credential === 'admin123' ||
      credential === 'admin' ||
      credential === 'PROJECT3D' ||
      loginPassword.trim() === 'PROJECT3D-ADMIN'
    ) {
      sessionStorage.setItem('project3d_admin_auth', 'true');
      onAdminLogin();
      onClose();
      return;
    }

    if (!credential) {
      setError('Por favor, introduce tu correo electrónico o clave de acceso.');
      return;
    }

    // Client login simulation
    const existingUsersJson = localStorage.getItem('project3d_customers');
    const existingUsers: CustomerUser[] = existingUsersJson ? JSON.parse(existingUsersJson) : [];
    const found = existingUsers.find((u) => u.email.toLowerCase() === credential.toLowerCase());

    const userToLogin: CustomerUser = found || {
      id: `usr-${Date.now()}`,
      name: credential.includes('@') ? credential.split('@')[0] : credential,
      email: credential.includes('@') ? credential : `${credential}@cliente.com`,
      company: 'Empresa Cliente',
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('project3d_current_user', JSON.stringify(userToLogin));
    onCustomerLogin(userToLogin);
    onClose();
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setError('Todos los campos obligatorios deben ser completados.');
      return;
    }

    const newUser: CustomerUser = {
      id: `usr-${Date.now()}`,
      name: regName.trim(),
      email: regEmail.trim(),
      company: regCompany.trim() || 'Particular / Pyme',
      createdAt: new Date().toISOString(),
    };

    const existingUsersJson = localStorage.getItem('project3d_customers');
    const existingUsers: CustomerUser[] = existingUsersJson ? JSON.parse(existingUsersJson) : [];
    existingUsers.push(newUser);
    localStorage.setItem('project3d_customers', JSON.stringify(existingUsers));
    localStorage.setItem('project3d_current_user', JSON.stringify(newUser));

    onCustomerLogin(newUser);
    onClose();
  };

  const handleFillDemoAdmin = () => {
    setActiveTab('login');
    setLoginEmailOrCode('PROJECT3D-ADMIN');
    setLoginPassword('PROJECT3D-ADMIN');
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 animate-in zoom-in-95 duration-200 font-sans max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Brand Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <Isologo3D size={42} />
          <div>
            <h3 className="text-lg font-black text-[#0F172A] font-mono tracking-tight flex items-center gap-1.5">
              <span>PROJECT 3D</span>
              <span className="text-xs font-mono font-bold text-[#059669] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                PORTAL
              </span>
            </h3>
            <p className="text-[11px] text-[#475569] font-mono">
              Acceso a Cotizaciones, Producción y Panel Interno
            </p>
          </div>
        </div>

        {redirectMessage && (
          <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-[#0F172A] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
            <span className="font-mono">{redirectMessage}</span>
          </div>
        )}

        {/* 2 Tabs: Iniciar Sesión / Crear Cuenta */}
        <div className="flex bg-slate-100 p-1 rounded-2xl mb-6 font-mono text-xs">
          <button
            type="button"
            onClick={() => {
              setActiveTab('login');
              setError(null);
            }}
            className={`flex-1 py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === 'login'
                ? 'bg-white text-[#0F172A] shadow-sm'
                : 'text-[#475569] hover:text-[#0F172A]'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('register');
              setError(null);
            }}
            className={`flex-1 py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === 'register'
                ? 'bg-white text-[#0F172A] shadow-sm'
                : 'text-[#475569] hover:text-[#0F172A]'
            }`}
          >
            Crear Cuenta
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2 font-mono">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* TAB 1: INICIAR SESIÓN */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-[#0F172A] mb-1.5">
                Email o Código de Acceso
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={loginEmailOrCode}
                  onChange={(e) => setLoginEmailOrCode(e.target.value)}
                  placeholder="ejemplo@empresa.com o PROJECT3D-ADMIN"
                  autoFocus
                  className="w-full bg-[#FAFBFD] border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#059669] focus:bg-white font-mono"
                />
                <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#0F172A] mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Introduce tu contraseña..."
                  className="w-full bg-[#FAFBFD] border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#059669] focus:bg-white font-mono"
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Clave Demo Admin Required Note */}
            <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-3 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#059669] shrink-0" />
                <span className="text-[#0F172A] font-medium">Clave Demo Admin:</span>
                <span className="font-bold text-[#059669]">PROJECT3D-ADMIN</span>
              </div>
              <button
                type="button"
                onClick={handleFillDemoAdmin}
                className="text-[11px] font-bold text-[#059669] hover:underline cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors shadow-2xs"
              >
                Autocompletar
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#059669] hover:bg-[#047857] text-white font-bold rounded-xl text-xs font-mono transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-600/25 hover:shadow-lg active:scale-[0.99]"
            >
              <span>Acceder al Sistema</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* TAB 2: CREAR CUENTA */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-mono font-bold text-[#0F172A] mb-1">
                Nombre Completo *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Ej. Ing. Daniel Ruiz"
                  className="w-full bg-[#FAFBFD] border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#059669] focus:bg-white font-mono"
                />
                <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#0F172A] mb-1">
                Empresa u Organización (Opcional)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={regCompany}
                  onChange={(e) => setRegCompany(e.target.value)}
                  placeholder="Ej. Mecanizados y Robótica Toledo"
                  className="w-full bg-[#FAFBFD] border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#059669] focus:bg-white font-mono"
                />
                <Building className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#0F172A] mb-1">
                Correo Electrónico *
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="daniel@mecanizadostoledo.es"
                  className="w-full bg-[#FAFBFD] border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#059669] focus:bg-white font-mono"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#0F172A] mb-1">
                Contraseña de Acceso *
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Crea una contraseña segura"
                  className="w-full bg-[#FAFBFD] border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#059669] focus:bg-white font-mono"
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <p className="text-[11px] text-[#475569] leading-relaxed">
              Al registrarte, podrás seguir el estado de fabricación de tus piezas STL, descargar facturas y acceder a la biblioteca técnica de modelos.
            </p>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#059669] hover:bg-[#047857] text-white font-bold rounded-xl text-xs font-mono transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-600/25 hover:shadow-lg active:scale-[0.99]"
            >
              <span>Crear Cuenta y Continuar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Footer info */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-[#475569]">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#059669]" />
            Encriptación TLS / SSL 256-bit
          </span>
          <button
            type="button"
            onClick={onClose}
            className="hover:text-[#0F172A] cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
