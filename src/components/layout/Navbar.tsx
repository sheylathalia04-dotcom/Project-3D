import React, { useState } from 'react';
import {
  Upload,
  Lock,
  Menu,
  X,
  ChevronDown,
  Globe,
  UserCheck,
  User,
} from 'lucide-react';
import { Translations, Language } from '../../i18n/translations';
import { Isologo3D } from '../brand/Isologo3D';
import { CustomerUser } from '../auth/AuthModal';

interface NavbarProps {
  t: Translations;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenLoginModal: () => void;
  currentUser?: CustomerUser | null;
  onNavigateToPortal?: () => void;
  onLogoutCustomer?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  t,
  currentLanguage,
  onLanguageChange,
  onOpenLoginModal,
  currentUser,
  onNavigateToPortal,
  onLogoutCustomer,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState<boolean>(false);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  ];

  const currentLangObj = languages.find((l) => l.code === currentLanguage) || languages[0];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-40 navbar-light-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo with 3D Isometric Isotype (Cube / Extrusion Nozzle in Titanium & Emerald) */}
          <div
            className="flex items-center gap-3.5 cursor-pointer group"
            onClick={() => scrollToSection('inicio')}
          >
            <Isologo3D size={42} />
            <div>
              <span className="text-xl font-black tracking-tight text-[#0F172A] font-mono block leading-none group-hover:text-[#059669] transition-colors">
                PROJECT <span className="text-[#059669]">3D</span>
              </span>
              <span className="text-[10px] font-mono text-[#475569] font-bold tracking-wider block mt-1 uppercase">
                PROTOTIPADO INDUSTRIAL • TORRIJOS
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-7 text-xs font-mono font-semibold text-[#475569]">
            <button
              onClick={() => scrollToSection('servicios')}
              className="hover:text-[#0F172A] transition-colors cursor-pointer"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection('materiales')}
              className="hover:text-[#0F172A] transition-colors cursor-pointer"
            >
              Materiales
            </button>
            <button
              onClick={() => scrollToSection('proceso')}
              className="hover:text-[#0F172A] transition-colors cursor-pointer"
            >
              Cómo Funciona
            </button>
            <button
              onClick={() => scrollToSection('presupuesto')}
              className="text-[#059669] hover:text-[#047857] transition-colors cursor-pointer font-bold"
            >
              Calculadora STL
            </button>
            <button
              onClick={() => scrollToSection('galeria')}
              className="hover:text-[#0F172A] transition-colors cursor-pointer"
            >
              Galería
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="hover:text-[#0F172A] transition-colors cursor-pointer"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className="hover:text-[#0F172A] transition-colors cursor-pointer"
            >
              Contacto
            </button>
          </div>

          {/* Right Action Icons: Language, Exact "Login / Registro" Button, Primary CTA */}
          <div className="hidden md:flex items-center space-x-3.5">
            {/* Language Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-mono text-[#0F172A] transition-colors cursor-pointer"
              >
                <span>{currentLangObj.flag}</span>
                <span className="uppercase font-semibold">{currentLangObj.code}</span>
                <ChevronDown className="w-3 h-3 text-[#475569]" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-1.5 text-left text-xs font-mono flex items-center justify-between transition-colors cursor-pointer ${
                        currentLanguage === lang.code
                          ? 'bg-emerald-50 text-[#059669] font-bold'
                          : 'text-[#475569] hover:bg-slate-50 hover:text-[#0F172A]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* If user is logged in, show user portal button; otherwise exact "Login / Registro" */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onNavigateToPortal}
                  className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200 text-xs font-mono font-bold text-[#059669] transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <User className="w-3.5 h-3.5 text-[#059669]" />
                  <span>Mi Cuenta ({currentUser.name.split(' ')[0]})</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={onOpenLoginModal}
                title="Acceso Clientes y Registro"
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-mono font-bold text-[#475569] hover:text-[#0F172A] transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Lock className="w-3.5 h-3.5 text-[#059669]" />
                <span>Login / Registro</span>
              </button>
            )}

            {/* Primary STL CTA Button */}
            <button
              type="button"
              onClick={() => scrollToSection('presupuesto')}
              className="py-2.5 px-4 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs font-mono flex items-center gap-2 shadow-md shadow-emerald-600/25 hover:shadow-lg hover:shadow-emerald-600/35 transition-all cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Subir STL</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => onLanguageChange(currentLanguage === 'es' ? 'en' : 'es')}
              className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-xs font-mono text-[#0F172A]"
            >
              {currentLangObj.flag} {currentLanguage.toUpperCase()}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#475569] hover:text-[#0F172A] hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 font-mono text-sm shadow-xl">
          <button
            onClick={() => scrollToSection('servicios')}
            className="block w-full text-left py-2 text-[#0F172A] border-b border-slate-100"
          >
            Servicios
          </button>
          <button
            onClick={() => scrollToSection('materiales')}
            className="block w-full text-left py-2 text-[#0F172A] border-b border-slate-100"
          >
            Materiales
          </button>
          <button
            onClick={() => scrollToSection('proceso')}
            className="block w-full text-left py-2 text-[#0F172A] border-b border-slate-100"
          >
            Cómo Funciona
          </button>
          <button
            onClick={() => scrollToSection('presupuesto')}
            className="block w-full text-left py-2 text-[#059669] font-bold border-b border-slate-100"
          >
            Calculadora STL
          </button>
          <button
            onClick={() => scrollToSection('galeria')}
            className="block w-full text-left py-2 text-[#0F172A] border-b border-slate-100"
          >
            Galería
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="block w-full text-left py-2 text-[#0F172A] border-b border-slate-100"
          >
            FAQ
          </button>
          <button
            onClick={() => scrollToSection('contacto')}
            className="block w-full text-left py-2 text-[#0F172A] border-b border-slate-100"
          >
            Contacto
          </button>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => scrollToSection('presupuesto')}
              className="w-full py-3 bg-[#059669] hover:bg-[#047857] text-white font-bold rounded-xl text-center flex items-center justify-center gap-2 shadow-md shadow-emerald-600/25"
            >
              <Upload className="w-4 h-4" />
              <span>Subir STL y Cotizar</span>
            </button>
            {currentUser ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigateToPortal) onNavigateToPortal();
                }}
                className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-[#059669] font-bold rounded-xl text-center flex items-center justify-center gap-2 text-xs border border-emerald-200"
              >
                <User className="w-3.5 h-3.5 text-[#059669]" />
                <span>Mi Cuenta ({currentUser.name})</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLoginModal();
                }}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-[#0F172A] font-semibold rounded-xl text-center flex items-center justify-center gap-2 text-xs border border-slate-200"
              >
                <Lock className="w-3.5 h-3.5 text-[#059669]" />
                <span>Login / Registro</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
