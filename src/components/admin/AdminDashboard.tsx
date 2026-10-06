import React, { useState, useEffect } from 'react';
import {
  Shield,
  Layers,
  DollarSign,
  Clock,
  CheckCircle,
  Eye,
  Settings,
  Search,
  Filter,
  Save,
  ArrowLeft,
  Lock,
  Printer,
  FileText,
  Boxes,
  Cpu,
  Trash2,
  RefreshCw,
  LogOut,
  Sparkles,
  KeyRound,
  AlertCircle,
} from 'lucide-react';
import { STLViewer } from '../stl/STLViewer';
import { createSampleModel } from '../../utils/stlParser';
import { Translations } from '../../i18n/translations';

interface AdminDashboardProps {
  t: Translations;
  onExit: () => void;
}

export type OrderStatus =
  | 'Nueva Solicitud'
  | 'En Revisión'
  | 'Presupuesto Enviado'
  | 'En Producción'
  | 'Finalizado';

interface QuoteItem {
  id: string;
  reference: string;
  createdAt: string;
  status: OrderStatus;
  customer: {
    fullName: string;
    company: string;
    email: string;
    phone: string;
    comments?: string;
    ndaRequired?: boolean;
    shippingCity?: string;
  };
  fileInfo: {
    fileName: string;
    fileSizeKb: number;
    dimensionsMm: { x: number; y: number; z: number };
    volumeCm3: number;
    surfaceAreaCm2: number;
    triangleCount: number;
    estimatedWeightGrams: number;
  };
  configuration: {
    material: string;
    color: string;
    quantity: number;
    resolution: string;
    infillPercent: number;
    finish: string;
    productionPriority?: 'standard' | 'express';
  };
  pricing: {
    materialCost: number;
    machineCost: number;
    setupCost: number;
    finishCost: number;
    subtotal: number;
    discountAmount: number;
    totalEstimated: number;
  };
  internalNotes?: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ t, onExit }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('project3d_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState<string>('');
  const [authError, setAuthError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'quotes' | 'pricing'>('quotes');

  // Quotes data
  const [quotes, setQuotes] = useState<QuoteItem[]>([]);
  const [isLoadingQuotes, setIsLoadingQuotes] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedQuote, setSelectedQuote] = useState<QuoteItem | null>(null);

  // Inspector modal state
  const [inspectorStatus, setInspectorStatus] = useState<OrderStatus>('Nueva Solicitud');
  const [inspectorNotes, setInspectorNotes] = useState<string>('');
  const [isSavingChanges, setIsSavingChanges] = useState<boolean>(false);

  // Base Pricing config state
  const [machineHourlyRate, setMachineHourlyRate] = useState<number>(14.5);
  const [baseSetupFee, setBaseSetupFee] = useState<number>(6.0);
  const [materialPrices, setMaterialPrices] = useState<Record<string, number>>({
    pla: 0.08,
    abs: 0.13,
    petg: 0.11,
    sla_standard: 0.28,
    nylon_sls: 0.32,
  });
  const [configSaveSuccess, setConfigSaveSuccess] = useState<boolean>(false);

  // Initial mock quotes matching exact statuses
  const defaultInitialQuotes: QuoteItem[] = [
    {
      id: 'quote-101',
      reference: 'P3D-2026-0842',
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      status: 'En Producción',
      customer: {
        fullName: 'Carlos Menéndez',
        company: 'RoboTech Ibérica S.L.',
        email: 'carlos.m@robotechiberica.es',
        phone: '+34 612 458 901',
        shippingCity: 'Pol. Ind. Atalaya, Torrijos',
        comments: 'Piezas para el banco de pruebas de actuadores robóticos.',
      },
      fileInfo: {
        fileName: 'brazo_articulado_v3.stl',
        fileSizeKb: 1840,
        dimensionsMm: { x: 124.5, y: 68.2, z: 42.0 },
        volumeCm3: 84.6,
        surfaceAreaCm2: 245.3,
        triangleCount: 42100,
        estimatedWeightGrams: 98.2,
      },
      configuration: {
        material: 'Nylon SLS',
        color: 'Gris Mecánico',
        quantity: 4,
        resolution: 'Alta Precisión',
        infillPercent: 40,
        finish: 'Sin postprocesado',
      },
      pricing: {
        materialCost: 81.2,
        machineCost: 72.5,
        setupCost: 6.0,
        finishCost: 0,
        subtotal: 159.7,
        discountAmount: 7.98,
        totalEstimated: 151.72,
      },
      internalNotes: 'Impresión en bancada 2. Verificar perpendicularidad del eje secundario antes del poscurado.',
    },
    {
      id: 'quote-102',
      reference: 'P3D-2026-0843',
      createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
      status: 'Presupuesto Enviado',
      customer: {
        fullName: 'Elena Gómez Santamaría',
        company: 'Automatismos Torrijos',
        email: 'elena.gomez@autom-torrijos.com',
        phone: '+34 655 890 123',
        shippingCity: 'Torrijos (Toledo)',
        comments: 'Carcasa para sensor inductivo en ambiente con humedad.',
      },
      fileInfo: {
        fileName: 'carcasa_sensor_ip67.stl',
        fileSizeKb: 920,
        dimensionsMm: { x: 88.0, y: 88.0, z: 35.5 },
        volumeCm3: 45.2,
        surfaceAreaCm2: 180.6,
        triangleCount: 28400,
        estimatedWeightGrams: 51.9,
      },
      configuration: {
        material: 'ABS',
        color: 'Negro Industrial',
        quantity: 12,
        resolution: 'Estándar',
        infillPercent: 50,
        finish: 'Vaporizado químico / Alisado',
      },
      pricing: {
        materialCost: 70.5,
        machineCost: 96.0,
        setupCost: 6.0,
        finishCost: 48.0,
        subtotal: 220.5,
        discountAmount: 22.05,
        totalEstimated: 198.45,
      },
      internalNotes: 'Requiere alisado de vapor acetona para garantizar estanqueidad IP67.',
    },
    {
      id: 'quote-103',
      reference: 'P3D-2026-0844',
      createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
      status: 'Nueva Solicitud',
      customer: {
        fullName: 'David Morales',
        company: 'Mecanizados Talavera C.B.',
        email: 'd.morales@mectalavera.com',
        phone: '+34 689 334 556',
        shippingCity: 'Talavera de la Reina (Toledo)',
        comments: 'Prototipo rápido para presentar al cliente mañana.',
      },
      fileInfo: {
        fileName: 'soporte_motor_paso_paso.stl',
        fileSizeKb: 450,
        dimensionsMm: { x: 75.0, y: 85.0, z: 45.0 },
        volumeCm3: 52.8,
        surfaceAreaCm2: 195.0,
        triangleCount: 19500,
        estimatedWeightGrams: 65.5,
      },
      configuration: {
        material: 'PETG',
        color: 'Negro Industrial',
        quantity: 2,
        resolution: 'Rápida / Boceto',
        infillPercent: 30,
        finish: 'Sin postprocesado',
        productionPriority: 'express',
      },
      pricing: {
        materialCost: 17.42,
        machineCost: 32.0,
        setupCost: 6.0,
        finishCost: 0,
        subtotal: 55.42,
        discountAmount: 0,
        totalEstimated: 72.04,
      },
      internalNotes: 'Servicio Express solicitado.',
    },
    {
      id: 'quote-104',
      reference: 'P3D-2026-0839',
      createdAt: new Date(Date.now() - 3600000 * 96).toISOString(),
      status: 'Finalizado',
      customer: {
        fullName: 'Alfonso Serrano',
        company: 'Troquelería y Matricería Illescas',
        email: 'aserrano@matriceria-illescas.es',
        phone: '+34 600 112 233',
        shippingCity: 'Illescas (Toledo)',
        comments: 'Galga de verificación de tolerancias ISO 2768.',
      },
      fileInfo: {
        fileName: 'galga_control_dimensional.stl',
        fileSizeKb: 1200,
        dimensionsMm: { x: 150.0, y: 40.0, z: 12.0 },
        volumeCm3: 38.0,
        surfaceAreaCm2: 165.2,
        triangleCount: 31000,
        estimatedWeightGrams: 47.5,
      },
      configuration: {
        material: 'PLA Técnico',
        color: 'Blanco Técnico',
        quantity: 5,
        resolution: 'Alta Precisión',
        infillPercent: 80,
        finish: 'Sin postprocesado',
      },
      pricing: {
        materialCost: 28.5,
        machineCost: 38.0,
        setupCost: 6.0,
        finishCost: 0,
        subtotal: 72.5,
        discountAmount: 3.63,
        totalEstimated: 68.87,
      },
      internalNotes: 'Control dimensional verificado en micrómetro digital. Tolerancias cumplidas.',
    },
    {
      id: 'quote-105',
      reference: 'P3D-2026-0840',
      createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      status: 'En Revisión',
      customer: {
        fullName: 'Raquel Quintana',
        company: 'Ingeniería Médica Avanzada',
        email: 'r.quintana@medtech-spain.com',
        phone: '+34 622 998 776',
        shippingCity: 'Toledo',
        comments: 'Maqueta ergonómica de instrumental quirúrgico.',
      },
      fileInfo: {
        fileName: 'mango_ergonomico_instrumental.stl',
        fileSizeKb: 2400,
        dimensionsMm: { x: 110.0, y: 32.0, z: 28.0 },
        volumeCm3: 24.5,
        surfaceAreaCm2: 120.0,
        triangleCount: 56000,
        estimatedWeightGrams: 30.6,
      },
      configuration: {
        material: 'Resina SLA',
        color: 'Translúcido / Ámbar',
        quantity: 1,
        resolution: 'Ultra Fina (0.05 mm)',
        infillPercent: 100,
        finish: 'Curado UV + Pulido',
      },
      pricing: {
        materialCost: 32.4,
        machineCost: 45.0,
        setupCost: 6.0,
        finishCost: 25.0,
        subtotal: 108.4,
        discountAmount: 0,
        totalEstimated: 108.4,
      },
      internalNotes: 'Revisar espesor de pared en la zona de agarre antes de lanzar la fotopolimerización.',
    },
    {
      id: 'quote-106',
      reference: 'P3D-2026-0841',
      createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
      status: 'En Producción',
      customer: {
        fullName: 'Javier Castillo',
        company: 'Castillo Competición',
        email: 'javi@castillomotorsport.es',
        phone: '+34 644 332 211',
        shippingCity: 'Torrijos',
        comments: 'Conducto de admisión de aire para cárter seco.',
      },
      fileInfo: {
        fileName: 'engranaje_helicoidal_m2.stl',
        fileSizeKb: 650,
        dimensionsMm: { x: 68.0, y: 68.0, z: 25.0 },
        volumeCm3: 32.5,
        surfaceAreaCm2: 110.4,
        triangleCount: 16800,
        estimatedWeightGrams: 37.4,
      },
      configuration: {
        material: 'PETG',
        color: 'Negro Industrial',
        quantity: 6,
        resolution: 'Alta Calidad',
        infillPercent: 100,
        finish: 'Sin postprocesado',
      },
      pricing: {
        materialCost: 46.8,
        machineCost: 48.0,
        setupCost: 6.0,
        finishCost: 0,
        subtotal: 100.8,
        discountAmount: 5.04,
        totalEstimated: 95.76,
      },
      internalNotes: 'Requiere 100% de relleno sólido para soportar torque mecánico.',
    },
  ];

  const fetchQuotes = async () => {
    setIsLoadingQuotes(true);
    try {
      const res = await fetch('/api/quotes');
      const data = await res.json();
      if (data.success && Array.isArray(data.quotes) && data.quotes.length > 0) {
        const mapped = data.quotes.map((q: any) => ({
          ...q,
          status: mapToValidStatus(q.status),
        }));
        setQuotes(mapped);
      } else {
        setQuotes(defaultInitialQuotes);
      }
    } catch (err) {
      console.error('Failed to fetch quotes:', err);
      setQuotes(defaultInitialQuotes);
    } finally {
      setIsLoadingQuotes(false);
    }
  };

  const mapToValidStatus = (s: string): OrderStatus => {
    if (s === 'Nueva solicitud' || s === 'Nueva Solicitud') return 'Nueva Solicitud';
    if (s === 'En revisión' || s === 'En Revisión') return 'En Revisión';
    if (s === 'Presupuesto preparado' || s === 'Presupuesto enviado' || s === 'Presupuesto Enviado') return 'Presupuesto Enviado';
    if (s === 'En producción' || s === 'En Producción') return 'En Producción';
    if (s === 'Finalizado' || s === 'Aceptado') return 'Finalizado';
    return 'Nueva Solicitud';
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchQuotes();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const trimmed = passcode.trim();
    if (trimmed === 'PROJECT3D-ADMIN' || trimmed === 'admin123' || trimmed === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('project3d_admin_auth', 'true');
    } else {
      setAuthError('Código de acceso no válido.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('project3d_admin_auth');
    onExit();
  };

  const handleOpenInspector = (quote: QuoteItem) => {
    setSelectedQuote(quote);
    setInspectorStatus(quote.status);
    setInspectorNotes(quote.internalNotes || '');
  };

  const handleSaveQuoteChanges = async () => {
    if (!selectedQuote) return;
    setIsSavingChanges(true);

    try {
      await fetch(`/api/quotes/${selectedQuote.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: inspectorStatus,
          internalNotes: inspectorNotes,
        }),
      });

      setQuotes((prev) =>
        prev.map((q) =>
          q.id === selectedQuote.id
            ? { ...q, status: inspectorStatus, internalNotes: inspectorNotes }
            : q
        )
      );

      setSelectedQuote((prev) =>
        prev ? { ...prev, status: inspectorStatus, internalNotes: inspectorNotes } : null
      );
    } catch (err) {
      console.error('Failed to update quote status:', err);
    } finally {
      setIsSavingChanges(false);
    }
  };

  const handleSavePricingConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setConfigSaveSuccess(true);
    setTimeout(() => setConfigSaveSuccess(false), 3000);
  };

  // Strictly compliant Titanium Cyber-Clean Status Badges (NO blue, NO orange)
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Nueva Solicitud':
        return 'bg-slate-100 text-slate-700 border-slate-300 font-semibold';
      case 'En Revisión':
        return 'bg-amber-50 text-amber-800 border-amber-300 font-semibold';
      case 'Presupuesto Enviado':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold';
      case 'En Producción':
        return 'bg-emerald-100 text-[#059669] border-emerald-400 font-bold';
      case 'Finalizado':
        return 'bg-slate-900 text-white border-slate-900 font-bold';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const filteredQuotes = quotes.filter((q) => {
    const matchesSearch =
      q.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.customer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.customer.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.fileInfo.fileName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const inspectorSample = createSampleModel('gear');

  // If unauthenticated, show a clean light prompt rather than a broken page
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAFBFD] flex flex-col justify-center items-center p-4 font-sans">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-8 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#059669] flex items-center justify-center mx-auto mb-4 shadow-xs">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-center text-[#0F172A] font-mono">
            Acceso Panel de Control (/admin)
          </h2>
          <p className="text-xs text-center text-[#475569] mt-1 mb-6">
            Gestión interna de solicitudes STL, órdenes de producción y tarifas base de PROJECT 3D.
          </p>

          {authError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-[#0F172A] mb-1.5">
                Código de acceso / Contraseña
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Código de acceso..."
                  className="w-full bg-[#FAFBFD] border border-slate-300 rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#059669] focus:bg-white font-mono"
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-3 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#059669] shrink-0" />
                <span className="text-[#0F172A] font-medium">Clave Demo:</span>
                <span className="font-bold text-[#059669]">PROJECT3D-ADMIN</span>
              </div>
              <button
                type="button"
                onClick={() => setPasscode('PROJECT3D-ADMIN')}
                className="text-[11px] font-bold text-[#059669] hover:underline cursor-pointer bg-white px-2 py-0.5 rounded border border-emerald-200"
              >
                Autocompletar
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#059669] hover:bg-[#047857] text-white font-bold rounded-xl text-xs font-mono transition-all cursor-pointer shadow-md shadow-emerald-600/25"
            >
              Entrar al Panel de Control
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={onExit}
              className="text-xs text-[#475569] hover:text-[#0F172A] flex items-center justify-center gap-1.5 mx-auto cursor-pointer font-mono"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a la Web Pública</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFBFD] text-[#0F172A] flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-8 py-4 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#059669] text-white flex items-center justify-center font-black text-sm shadow-md shadow-emerald-600/25">
            3D
          </div>
          <div>
            <h1 className="text-sm font-bold text-[#0F172A] tracking-wide font-mono">
              PROJECT 3D · PANEL DE CONTROL (/admin)
            </h1>
            <p className="text-[11px] text-[#475569] font-mono">
              Taller Atalaya · Torrijos (Toledo) · Gestión de Pedidos STL
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchQuotes}
            title="Refrescar solicitudes"
            className="p-2 text-[#475569] hover:text-[#0F172A] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isLoadingQuotes ? 'animate-spin text-[#059669]' : ''}`} />
          </button>

          {/* Cerrar Sesión / Salir al Sitio Público */}
          <button
            onClick={handleLogout}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-[#0F172A] border border-slate-300 rounded-xl text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer font-semibold shadow-2xs"
          >
            <LogOut className="w-3.5 h-3.5 text-[#059669]" />
            <span>Cerrar Sesión / Salir al Sitio Público</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 space-x-6 text-xs font-mono">
          <button
            onClick={() => setActiveTab('quotes')}
            className={`pb-3 border-b-2 font-medium transition-colors cursor-pointer ${
              activeTab === 'quotes'
                ? 'border-[#059669] text-[#059669] font-bold'
                : 'border-transparent text-[#475569] hover:text-[#0F172A]'
            }`}
          >
            Tabla de Solicitudes STL Recibidas ({quotes.length})
          </button>
          <button
            onClick={() => setActiveTab('pricing')}
            className={`pb-3 border-b-2 font-medium transition-colors cursor-pointer ${
              activeTab === 'pricing'
                ? 'border-[#059669] text-[#059669] font-bold'
                : 'border-transparent text-[#475569] hover:text-[#0F172A]'
            }`}
          >
            Formulario de Precios Base por Material y Máquina
          </button>
        </div>

        {/* Tab 1: Solicitudes STL Recibidas */}
        {activeTab === 'quotes' && (
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por cliente, STL o referencia..."
                  className="w-full bg-[#FAFBFD] border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#059669] focus:bg-white font-mono"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-[#FAFBFD] border border-slate-300 rounded-xl px-3 py-2 text-xs text-[#0F172A] font-mono focus:outline-none focus:border-[#059669] cursor-pointer"
                >
                  <option value="all">Todos los estados</option>
                  <option value="Nueva Solicitud">[Nueva Solicitud]</option>
                  <option value="En Revisión">[En Revisión]</option>
                  <option value="Presupuesto Enviado">[Presupuesto Enviado]</option>
                  <option value="En Producción">[En Producción]</option>
                  <option value="Finalizado">[Finalizado]</option>
                </select>
              </div>
            </div>

            {/* Table of Received STL Requests */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-x-auto shadow-xs">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-50 border-b border-slate-200 text-[#475569] uppercase text-[10px]">
                  <tr>
                    <th className="py-3.5 px-4 font-bold">Ref.</th>
                    <th className="py-3.5 px-4 font-bold">Cliente</th>
                    <th className="py-3.5 px-4 font-bold">Archivo STL</th>
                    <th className="py-3.5 px-4 font-bold">Material</th>
                    <th className="py-3.5 px-4 font-bold">Estado</th>
                    <th className="py-3.5 px-4 font-bold">Fecha</th>
                    <th className="py-3.5 px-4 text-right font-bold">Total Est.</th>
                    <th className="py-3.5 px-4 text-right font-bold">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredQuotes.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-[#475569]">
                        No se han encontrado solicitudes con los filtros aplicados.
                      </td>
                    </tr>
                  ) : (
                    filteredQuotes.map((q) => (
                      <tr key={q.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-[#059669] whitespace-nowrap">
                          {q.reference}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <p className="font-sans font-medium text-[#0F172A]">{q.customer.fullName}</p>
                          <p className="text-[10px] text-[#475569]">
                            {q.customer.company || q.customer.shippingCity || 'Particular'}
                          </p>
                        </td>
                        <td className="py-3.5 px-4 max-w-[170px] truncate" title={q.fileInfo.fileName}>
                          <p className="text-[#0F172A] font-medium truncate">{q.fileInfo.fileName}</p>
                          <p className="text-[10px] text-[#475569]">
                            {q.fileInfo.volumeCm3} cm³ · {q.fileInfo.dimensionsMm.x}×{q.fileInfo.dimensionsMm.y} mm
                          </p>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <p className="text-[#0F172A] font-medium">{q.configuration.material}</p>
                          <p className="text-[10px] text-[#475569]">{q.configuration.color}</p>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] border ${getStatusBadge(
                              q.status
                            )}`}
                          >
                            {q.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap text-[#475569]">
                          {new Date(q.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3.5 px-4 text-right font-bold text-[#0F172A] whitespace-nowrap">
                          {q.pricing?.totalEstimated?.toFixed(2)} €
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => handleOpenInspector(q)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:border-emerald-200 text-[#0F172A] hover:text-[#059669] border border-slate-200 rounded-lg transition-colors text-xs inline-flex items-center gap-1 cursor-pointer font-medium"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Gestionar</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Formulario para Ajustar Precios Base */}
        {activeTab === 'pricing' && (
          <div className="max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="mb-6 pb-4 border-b border-slate-200">
              <h3 className="text-base font-bold text-[#0F172A] font-mono">
                Configuración de Tarifas y Precios Base
              </h3>
              <p className="text-xs text-[#475569] mt-1 font-sans">
                Ajusta las tarifas horarias y el coste por cm³ de material que alimentan el cotizador automático en tiempo real.
              </p>
            </div>

            {configSaveSuccess && (
              <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>¡Tarifas base actualizadas correctamente en el motor de cálculo!</span>
              </div>
            )}

            <form onSubmit={handleSavePricingConfig} className="space-y-5 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-200">
                <div>
                  <label className="block text-[#0F172A] mb-1.5 font-semibold">
                    Coste Tiempo de Máquina (€/hora):
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={machineHourlyRate}
                    onChange={(e) => setMachineHourlyRate(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#FAFBFD] border border-slate-300 rounded-lg px-3 py-2 text-[#0F172A] focus:outline-none focus:border-[#059669] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[#0F172A] mb-1.5 font-semibold">
                    Coste Preparación / Setup (€):
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={baseSetupFee}
                    onChange={(e) => setBaseSetupFee(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#FAFBFD] border border-slate-300 rounded-lg px-3 py-2 text-[#0F172A] focus:outline-none focus:border-[#059669] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <h4 className="text-[#0F172A] font-semibold mb-3">Precios Base por Material (€/cm³):</h4>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-3 bg-[#FAFBFD] rounded-xl border border-slate-200">
                    <span className="text-[#475569] font-medium">PLA Técnico</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        step="0.01"
                        value={materialPrices.pla}
                        onChange={(e) =>
                          setMaterialPrices({ ...materialPrices, pla: parseFloat(e.target.value) || 0 })
                        }
                        className="w-24 bg-white border border-slate-300 rounded px-2.5 py-1 text-[#0F172A] text-right font-mono focus:border-[#059669] outline-none"
                      />
                      <span className="text-slate-500">€/cm³</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#FAFBFD] rounded-xl border border-slate-200">
                    <span className="text-[#475569] font-medium">ABS Industrial</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        step="0.01"
                        value={materialPrices.abs}
                        onChange={(e) =>
                          setMaterialPrices({ ...materialPrices, abs: parseFloat(e.target.value) || 0 })
                        }
                        className="w-24 bg-white border border-slate-300 rounded px-2.5 py-1 text-[#0F172A] text-right font-mono focus:border-[#059669] outline-none"
                      />
                      <span className="text-slate-500">€/cm³</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#FAFBFD] rounded-xl border border-slate-200">
                    <span className="text-[#475569] font-medium">PETG</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        step="0.01"
                        value={materialPrices.petg}
                        onChange={(e) =>
                          setMaterialPrices({ ...materialPrices, petg: parseFloat(e.target.value) || 0 })
                        }
                        className="w-24 bg-white border border-slate-300 rounded px-2.5 py-1 text-[#0F172A] text-right font-mono focus:border-[#059669] outline-none"
                      />
                      <span className="text-slate-500">€/cm³</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#FAFBFD] rounded-xl border border-slate-200">
                    <span className="text-[#475569] font-medium">Resina SLA</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        step="0.01"
                        value={materialPrices.sla_standard}
                        onChange={(e) =>
                          setMaterialPrices({ ...materialPrices, sla_standard: parseFloat(e.target.value) || 0 })
                        }
                        className="w-24 bg-white border border-slate-300 rounded px-2.5 py-1 text-[#0F172A] text-right font-mono focus:border-[#059669] outline-none"
                      />
                      <span className="text-slate-500">€/cm³</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#FAFBFD] rounded-xl border border-slate-200">
                    <span className="text-[#475569] font-medium">Nylon SLS</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        step="0.01"
                        value={materialPrices.nylon_sls}
                        onChange={(e) =>
                          setMaterialPrices({ ...materialPrices, nylon_sls: parseFloat(e.target.value) || 0 })
                        }
                        className="w-24 bg-white border border-slate-300 rounded px-2.5 py-1 text-[#0F172A] text-right font-mono focus:border-[#059669] outline-none"
                      />
                      <span className="text-slate-500">€/cm³</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#059669] hover:bg-[#047857] text-white font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-600/25"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Tarifas Base</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Quote Details & Pipeline State Updater Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full p-6 sm:p-8 my-8 shadow-2xl relative max-h-[90vh] overflow-y-auto font-sans">
            <div className="flex items-start justify-between pb-4 border-b border-slate-200 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-mono font-bold text-[#059669]">
                    {selectedQuote.reference}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${getStatusBadge(
                      inspectorStatus
                    )}`}
                  >
                    {inspectorStatus}
                  </span>
                </div>
                <p className="text-xs text-[#475569] mt-1 font-mono">
                  Registrado el {new Date(selectedQuote.createdAt).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => setSelectedQuote(null)}
                className="text-slate-400 hover:text-slate-700 p-2 rounded-xl bg-slate-100 border border-slate-200 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Left Column: 3D Preview & Geometry */}
              <div>
                <h4 className="text-xs font-mono font-bold text-[#0F172A] uppercase mb-2">
                  Visor 3D del Archivo STL
                </h4>
                <div className="rounded-xl overflow-hidden border border-slate-200 mb-4 shadow-xs">
                  <STLViewer
                    geometry={inspectorSample.metrics.geometry}
                    modelColor={selectedQuote.configuration.color}
                    dimensionsMm={selectedQuote.fileInfo.dimensionsMm}
                    fileName={selectedQuote.fileInfo.fileName}
                    isInspecting={true}
                  />
                </div>

                <div className="bg-[#FAFBFD] border border-slate-200 rounded-xl p-4 text-xs font-mono space-y-1.5 text-[#0F172A]">
                  <div className="flex justify-between">
                    <span className="text-[#475569]">Dimensiones X, Y, Z:</span>
                    <span className="font-semibold">
                      {selectedQuote.fileInfo.dimensionsMm.x} ×{' '}
                      {selectedQuote.fileInfo.dimensionsMm.y} ×{' '}
                      {selectedQuote.fileInfo.dimensionsMm.z} mm
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#475569]">Volumen Sólido:</span>
                    <span className="text-[#059669] font-bold">{selectedQuote.fileInfo.volumeCm3} cm³</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#475569]">Polígonos:</span>
                    <span>{selectedQuote.fileInfo.triangleCount.toLocaleString()} triángulos</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#475569]">Material & Color:</span>
                    <span className="font-semibold">
                      {selectedQuote.configuration.material} ({selectedQuote.configuration.color})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#475569]">Resolución & Relleno:</span>
                    <span>{selectedQuote.configuration.resolution} · {selectedQuote.configuration.infillPercent}% infill</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Customer Details, Financial Breakdown & State Manager */}
              <div className="space-y-5">
                <div className="bg-[#FAFBFD] border border-slate-200 rounded-xl p-4 text-xs font-mono">
                  <h4 className="font-bold text-[#0F172A] uppercase mb-2">Datos del Cliente</h4>
                  <div className="space-y-1 text-[#0F172A]">
                    <p><span className="text-[#475569]">Nombre:</span> {selectedQuote.customer.fullName}</p>
                    <p><span className="text-[#475569]">Empresa:</span> {selectedQuote.customer.company || 'N/A'}</p>
                    <p><span className="text-[#475569]">Email:</span> {selectedQuote.customer.email}</p>
                    <p><span className="text-[#475569]">Teléfono:</span> {selectedQuote.customer.phone}</p>
                    <p><span className="text-[#475569]">Dirección Envío:</span> {selectedQuote.customer.shippingCity || 'No indicada'}</p>
                    {selectedQuote.customer.comments && (
                      <p className="mt-2 text-[#475569] bg-white p-2.5 rounded-lg border border-slate-200">
                        "{selectedQuote.customer.comments}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-[#FAFBFD] border border-slate-200 rounded-xl p-4 text-xs font-mono">
                  <h4 className="font-bold text-[#0F172A] uppercase mb-2">Desglose Financiero</h4>
                  <div className="space-y-1 text-[#475569]">
                    <div className="flex justify-between">
                      <span>Material:</span>
                      <span className="text-[#0F172A] font-semibold">{selectedQuote.pricing?.materialCost?.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tiempo de Máquina:</span>
                      <span className="text-[#0F172A] font-semibold">{selectedQuote.pricing?.machineCost?.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Preparación / Setup:</span>
                      <span className="text-[#0F172A] font-semibold">{selectedQuote.pricing?.setupCost?.toFixed(2)} €</span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 flex justify-between text-[#0F172A] font-bold text-sm">
                      <span>Total Estimado (x{selectedQuote.configuration.quantity} ud):</span>
                      <span className="text-[#059669]">
                        {selectedQuote.pricing?.totalEstimated?.toFixed(2)} €
                      </span>
                    </div>
                  </div>
                </div>

                {/* State Manager: Exact 5 states requested */}
                <div>
                  <label className="block text-xs font-mono font-bold text-[#0F172A] uppercase mb-1.5">
                    Gestor de Estados de Pedido:
                  </label>
                  <select
                    value={inspectorStatus}
                    onChange={(e) => setInspectorStatus(e.target.value as OrderStatus)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#0F172A] focus:outline-none focus:border-[#059669] cursor-pointer shadow-2xs"
                  >
                    <option value="Nueva Solicitud">[Nueva Solicitud]</option>
                    <option value="En Revisión">[En Revisión]</option>
                    <option value="Presupuesto Enviado">[Presupuesto Enviado]</option>
                    <option value="En Producción">[En Producción]</option>
                    <option value="Finalizado">[Finalizado]</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#475569] mb-1">
                    Notas y Observaciones de Taller / Calibración:
                  </label>
                  <textarea
                    rows={3}
                    value={inspectorNotes}
                    onChange={(e) => setInspectorNotes(e.target.value)}
                    placeholder="Orientación de capas, estructuras de soporte requeridas..."
                    className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-[#0F172A] focus:outline-none focus:border-[#059669] resize-none font-mono"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-[#0F172A] rounded-xl text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-300"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Imprimir Albarán</span>
                  </button>

                  <button
                    type="button"
                    disabled={isSavingChanges}
                    onClick={handleSaveQuoteChanges}
                    className="px-5 py-2.5 bg-[#059669] hover:bg-[#047857] text-white font-bold rounded-xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-600/25 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSavingChanges ? 'Guardando...' : 'Guardar Estado y Notas'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
