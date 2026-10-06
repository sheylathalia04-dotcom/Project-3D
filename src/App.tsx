import React, { useState, useEffect } from 'react';
import { translations, Language } from './i18n/translations';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/home/Hero';
import { About } from './components/home/About';
import { Services } from './components/home/Services';
import { MaterialsSection } from './components/home/MaterialsSection';
import { HowItWorks } from './components/home/HowItWorks';
import { Gallery } from './components/home/Gallery';
import { STLQuoteTool } from './components/stl/STLQuoteTool';
import { FAQ } from './components/home/FAQ';
import { Contact } from './components/home/Contact';
import { Footer } from './components/layout/Footer';
import { IndustrialChatbot } from './components/chatbot/IndustrialChatbot';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AuthModal, CustomerUser } from './components/auth/AuthModal';
import { PaymentGatewayModal, OrderItemRecord } from './components/checkout/PaymentGatewayModal';
import { CustomerPortal } from './components/customer/CustomerPortal';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('project3d_lang');
    if (saved && (saved === 'es' || saved === 'en' || saved === 'fr' || saved === 'de')) {
      return saved;
    }
    return 'es';
  });

  // Current authenticated customer user (if any)
  const [currentUser, setCurrentUser] = useState<CustomerUser | null>(() => {
    const savedUser = localStorage.getItem('project3d_current_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Navigation views: 'public' | 'admin' | 'customer'
  const [currentView, setCurrentView] = useState<'public' | 'admin' | 'customer'>('public');

  // Auth modal state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  const [authRedirectMessage, setAuthRedirectMessage] = useState<string | undefined>();

  // Payment Gateway modal state
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [pendingQuoteData, setPendingQuoteData] = useState<any>(null);

  // Notifications
  const [recentNotification, setRecentNotification] = useState<{ title: string; message: string } | null>(null);

  // Sync language to localStorage
  useEffect(() => {
    localStorage.setItem('project3d_lang', currentLanguage);
  }, [currentLanguage]);

  // Initial URL check: if /admin or /mi-cuenta is requested
  useEffect(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;

    if (path === '/admin' || hash === '#admin') {
      const isAuth = sessionStorage.getItem('project3d_admin_auth') === 'true';
      if (isAuth) {
        setCurrentView('admin');
      } else {
        setCurrentView('public');
        setAuthModalTab('login');
        setAuthRedirectMessage('Introduce la clave de acceso de administrador.');
        setIsAuthModalOpen(true);
      }
    } else if (path === '/mi-cuenta' || hash === '#mi-cuenta') {
      const savedUser = localStorage.getItem('project3d_current_user');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
        setCurrentView('customer');
      } else {
        setCurrentView('public');
        setAuthModalTab('login');
        setAuthRedirectMessage('Inicia sesión o regístrate para acceder a tu panel de cliente.');
        setIsAuthModalOpen(true);
      }
    }
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;

      if (path === '/admin' || hash === '#admin') {
        if (sessionStorage.getItem('project3d_admin_auth') === 'true') {
          setCurrentView('admin');
        } else {
          setCurrentView('public');
        }
      } else if (path === '/mi-cuenta' || hash === '#mi-cuenta') {
        if (localStorage.getItem('project3d_current_user')) {
          setCurrentView('customer');
        } else {
          setCurrentView('public');
        }
      } else {
        setCurrentView('public');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const t = translations[currentLanguage] || translations.es;

  const scrollTo = (id: string) => {
    if (currentView !== 'public') {
      setCurrentView('public');
      window.history.pushState(null, '', '/');
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open Auth modal (e.g. from "Login / Registro" button)
  const handleOpenAuth = (tab: 'login' | 'register' = 'login', message?: string) => {
    setAuthModalTab(tab);
    setAuthRedirectMessage(message);
    setIsAuthModalOpen(true);
  };

  // Customer logged in or registered
  const handleCustomerLogin = (user: CustomerUser) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);

    // If there was an active pending quote awaiting payment, open payment gateway immediately
    if (pendingQuoteData) {
      setIsPaymentModalOpen(true);
    } else {
      // Navigate to customer portal
      setCurrentView('customer');
      window.history.pushState(null, '', '/mi-cuenta');
    }
  };

  // Admin logged in
  const handleAdminLogin = () => {
    setIsAuthModalOpen(false);
    setCurrentView('admin');
    window.history.pushState(null, '', '/admin');
  };

  // Customer log out
  const handleLogoutCustomer = () => {
    localStorage.removeItem('project3d_current_user');
    setCurrentUser(null);
    setCurrentView('public');
    window.history.pushState(null, '', '/');
  };

  // Admin exit back to public site
  const handleExitAdmin = () => {
    setCurrentView('public');
    window.history.pushState(null, '', '/');
  };

  // STL Quote Tool requests checkout
  const handleRequestAuthForQuote = (quoteDetails: any) => {
    setPendingQuoteData(quoteDetails);
    handleOpenAuth(
      'register',
      'Regístrate o inicia sesión para tramitar el pago seguro y reservar tu fabricación.'
    );
  };

  const handleRequestPayment = (quoteDetails: any) => {
    setPendingQuoteData(quoteDetails);
    setIsPaymentModalOpen(true);
  };

  // Payment successfully finished
  const handlePaymentSuccess = (order: OrderItemRecord) => {
    setRecentNotification({
      title: '¡Pago Confirmado!',
      message: `Tu pedido #${order.reference} ha entrado en la cola de producción.`,
    });
    setPendingQuoteData(null);
    setTimeout(() => {
      setRecentNotification(null);
    }, 9000);
  };

  // Navigate to customer portal (/mi-cuenta)
  const handleNavigateToCustomerPortal = () => {
    setCurrentView('customer');
    window.history.pushState(null, '', '/mi-cuenta');
  };

  // Re-quote model from customer portal library
  const handleRequoteFile = (fileInfo: { fileName: string; material: string }) => {
    setCurrentView('public');
    window.history.pushState(null, '', '/');
    setTimeout(() => {
      scrollTo('presupuesto');
    }, 150);
  };

  // If in Admin Dashboard view
  if (currentView === 'admin') {
    return <AdminDashboard t={t} onExit={handleExitAdmin} />;
  }

  // If in Customer Portal view (/mi-cuenta)
  if (currentView === 'customer' && currentUser) {
    return (
      <CustomerPortal
        user={currentUser}
        onLogout={handleLogoutCustomer}
        onExit={() => {
          setCurrentView('public');
          window.history.pushState(null, '', '/');
        }}
        onRequoteFile={handleRequoteFile}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFBFD] text-[#0F172A] flex flex-col font-sans selection:bg-[#059669]/20 selection:text-[#059669]">
      {/* Toast Notification */}
      {recentNotification && (
        <div className="fixed top-24 right-4 sm:right-8 z-50 bg-white border border-slate-200 p-4 rounded-2xl shadow-xl flex items-center gap-3.5 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 text-[#059669] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="text-xs font-mono">
            <p className="font-bold text-[#0F172A]">{recentNotification.title}</p>
            <p className="text-[#475569]">{recentNotification.message}</p>
          </div>
          {currentUser && (
            <button
              onClick={handleNavigateToCustomerPortal}
              className="ml-2 px-3 py-1.5 bg-[#059669] hover:bg-[#047857] text-white font-bold rounded-lg text-[11px] font-mono transition-colors shadow-xs cursor-pointer"
            >
              Ver Pedidos
            </button>
          )}
          <button
            onClick={() => setRecentNotification(null)}
            className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Unified Auth Modal (Iniciar Sesión / Crear Cuenta) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onCustomerLogin={handleCustomerLogin}
        onAdminLogin={handleAdminLogin}
        initialTab={authModalTab}
        redirectMessage={authRedirectMessage}
      />

      {/* Payment Gateway Modal (Stripe Simulation + Breakdown) */}
      {isPaymentModalOpen && currentUser && pendingQuoteData && (
        <PaymentGatewayModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          currentUser={currentUser}
          quoteData={pendingQuoteData}
          onPaymentSuccess={handlePaymentSuccess}
          onNavigateToPortal={handleNavigateToCustomerPortal}
        />
      )}

      {/* Corporate Glassmorphic Light Navbar with Isologo3D and 'Login / Registro' button */}
      <Navbar
        t={t}
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        onOpenLoginModal={() => handleOpenAuth('login')}
        currentUser={currentUser}
        onNavigateToPortal={handleNavigateToCustomerPortal}
        onLogoutCustomer={handleLogoutCustomer}
      />

      {/* Landing Page Corporate Sections */}
      <main className="flex-1">
        <Hero
          t={t}
          onCtaClick={() => scrollTo('presupuesto')}
          onServicesClick={() => scrollTo('servicios')}
        />

        <About t={t} />

        <Services
          t={t}
          onSelectService={() => scrollTo('presupuesto')}
        />

        <MaterialsSection
          onSelectMaterial={(materialId) => {
            scrollTo('presupuesto');
          }}
        />

        <HowItWorks
          t={t}
          onCtaClick={() => scrollTo('presupuesto')}
        />

        <Gallery
          t={t}
        />

        {/* 3D STL Quotation Tool with 'Solicitar y Reservar (Pago Seguro)' */}
        <STLQuoteTool
          t={t}
          currentUser={currentUser}
          onRequestAuth={handleRequestAuthForQuote}
          onRequestPayment={handleRequestPayment}
          onQuoteCreated={(ref) => {
            setRecentNotification({
              title: 'Presupuesto Calculado',
              message: `Referencia: ${ref}`,
            });
            setTimeout(() => setRecentNotification(null), 7000);
          }}
        />

        <FAQ t={t} />

        <Contact t={t} />
      </main>

      {/* Corporate Footer */}
      <Footer
        t={t}
        onOpenAdmin={() => handleOpenAuth('login')}
      />

      {/* Multilingual Floating Chatbot with 3D Extrusion Avatar */}
      <IndustrialChatbot
        t={t}
        currentLanguage={currentLanguage}
        onNavigateToQuote={() => scrollTo('presupuesto')}
        onNavigateToContact={() => scrollTo('contacto')}
      />
    </div>
  );
}
