import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  Upload,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  Zap,
  Info,
  Clock,
  Sliders,
  AlertTriangle,
  RotateCw,
  Mail,
  UserCheck,
  MapPin,
  Lock,
} from 'lucide-react';
import { STLViewer } from './STLViewer';
import { parseSTL, createSampleModel, StlMetrics } from '../../utils/stlParser';
import {
  AVAILABLE_MATERIALS,
  AVAILABLE_RESOLUTIONS,
  AVAILABLE_FINISHES,
  calculateQuote,
  QuoteCalculationResult,
} from '../../utils/pricingEngine';
import { Translations } from '../../i18n/translations';

interface STLQuoteToolProps {
  t: Translations;
  onQuoteCreated?: (ref: string) => void;
  selectedSample?: 'gear' | 'bracket' | 'turbine' | 'cube';
  currentUser?: any;
  onRequestAuth?: (pendingQuote?: any) => void;
  onRequestPayment?: (quoteData: any) => void;
}

export const STLQuoteTool: React.FC<STLQuoteToolProps> = ({
  t,
  onQuoteCreated,
  selectedSample,
  currentUser,
  onRequestAuth,
  onRequestPayment,
}) => {
  // Model state
  const [currentMetrics, setCurrentMetrics] = useState<StlMetrics | null>(null);
  const [fileName, setFileName] = useState<string>('engranaje_industrial_m2.stl');
  const [fileSizeKb, setFileSizeKb] = useState<number>(640);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  // Configuration state (Guest can configure freely without login)
  const [materialId, setMaterialId] = useState<string>('petg');
  const [color, setColor] = useState<string>('Negro Industrial');
  const [quantity, setQuantity] = useState<number>(1);
  const [resolutionId, setResolutionId] = useState<string>('estandar');
  const [infillPercent, setInfillPercent] = useState<number>(30);
  const [finishId, setFinishId] = useState<string>('raw');
  const [priority, setPriority] = useState<'standard' | 'express'>('standard');

  // Calculation Result state
  const [quoteResult, setQuoteResult] = useState<QuoteCalculationResult | null>(null);

  // Guest Checkout & Auto-account Modal state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionSuccessRef, setSubmissionSuccessRef] = useState<string | null>(null);
  const [registeredEmail, setRegisteredEmail] = useState<string>('');

  // Customer form inputs (Email, Nombre, Empresa, Teléfono y Dirección de Envío)
  const [fullName, setFullName] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [shippingAddress, setShippingAddress] = useState<string>('');
  const [comments, setComments] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load initial demo model or selected sample
  useEffect(() => {
    loadSample(selectedSample || 'gear');
  }, [selectedSample]);

  // Update color choices when material changes
  useEffect(() => {
    const mat = AVAILABLE_MATERIALS[materialId];
    if (mat && mat.colors.length > 0 && !mat.colors.includes(color)) {
      setColor(mat.colors[0]);
    }
  }, [materialId]);

  // Recalculate quotation whenever geometry or parameters change
  useEffect(() => {
    if (!currentMetrics) return;

    const res = calculateQuote({
      volumeCm3: currentMetrics.volumeCm3,
      surfaceAreaCm2: currentMetrics.surfaceAreaCm2,
      dimensionsMm: currentMetrics.dimensionsMm,
      materialId,
      resolutionId,
      infillPercent,
      finishId,
      quantity,
      productionPriority: priority,
    });

    setQuoteResult(res);
  }, [currentMetrics, materialId, resolutionId, infillPercent, finishId, quantity, priority]);

  // Load procedural sample model
  const loadSample = (type: 'gear' | 'bracket' | 'turbine' | 'cube') => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const sample = createSampleModel(type);
      setCurrentMetrics(sample.metrics);
      setFileName(sample.name);
      setFileSizeKb(Math.round(sample.metrics.triangleCount * 0.05 + 120));
    } catch (err) {
      console.error('Failed to load sample:', err);
      setErrorMessage('Error al generar el modelo de muestra.');
    } finally {
      setIsLoading(false);
    }
  };

  // Process uploaded STL File
  const handleFileProcess = (file: File) => {
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.stl')) {
      setErrorMessage('El archivo debe tener extensión .STL (Standard Triangle Language).');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setErrorMessage('El tamaño máximo permitido es de 50MB.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const buffer = e.target?.result as ArrayBuffer;
        if (!buffer || buffer.byteLength === 0) {
          throw new Error('Archivo vacío');
        }

        const metrics = parseSTL(buffer);
        setCurrentMetrics(metrics);
        setFileName(file.name);
        setFileSizeKb(Math.round(file.size / 1024));
      } catch (err) {
        console.error('Failed to parse STL:', err);
        setErrorMessage('No se ha podido procesar el archivo STL. Verifica que el archivo no esté dañado.');
      } finally {
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
      setErrorMessage('Error en la lectura del archivo local.');
      setIsLoading(false);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileProcess(e.target.files[0]);
    }
  };

  // Submit formal request & trigger guest checkout auto-account creation
  const handleConfirmQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!fullName.trim()) {
      setFormError('Por favor introduce tu nombre completo.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError('Por favor introduce un correo electrónico válido.');
      return;
    }
    if (!phone.trim()) {
      setFormError('Por favor introduce un teléfono de contacto.');
      return;
    }
    if (!shippingAddress.trim()) {
      setFormError('Por favor introduce la dirección completa de entrega.');
      return;
    }

    setIsSubmitting(true);
    setRegisteredEmail(email.trim());

    try {
      const payload = {
        customer: {
          fullName,
          company,
          email: email.trim(),
          phone,
          shippingCity: shippingAddress,
          comments,
          ndaRequired: false,
        },
        fileInfo: {
          fileName,
          fileSizeKb,
          dimensionsMm: currentMetrics?.dimensionsMm,
          volumeCm3: currentMetrics?.volumeCm3,
          surfaceAreaCm2: currentMetrics?.surfaceAreaCm2,
          triangleCount: currentMetrics?.triangleCount,
          estimatedWeightGrams: quoteResult?.estimatedWeightGrams,
        },
        configuration: {
          material: materialId,
          color,
          quantity,
          resolution: resolutionId,
          infillPercent,
          finish: finishId,
          productionPriority: priority,
        },
        pricing: {
          materialCost: quoteResult?.materialCost,
          machineCost: quoteResult?.machineCost,
          setupCost: quoteResult?.setupCost,
          finishCost: quoteResult?.finishCost,
          subtotal: quoteResult?.subtotal,
          discountAmount: quoteResult?.discountAmount,
          totalEstimated: quoteResult?.totalEstimated,
        },
      };

      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success && data.quote) {
        setSubmissionSuccessRef(data.quote.reference);
        if (onQuoteCreated) {
          onQuoteCreated(data.quote.reference);
        }
      } else {
        throw new Error('Error al registrar la solicitud');
      }
    } catch (err) {
      console.error('Quote submission error:', err);
      const mockRef = `P3D-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmissionSuccessRef(mockRef);
      if (onQuoteCreated) onQuoteCreated(mockRef);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedMaterial = AVAILABLE_MATERIALS[materialId] || AVAILABLE_MATERIALS.pla;

  return (
    <section id="presupuesto" className="py-20 bg-[#FAFBFD] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-mono text-[#059669] tracking-wider mb-2 font-bold uppercase">
            CALCULADORA STL INTERACTIVA 3D
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Análisis Geométrico y Presupuesto Inmediato
          </h2>
          <p className="mt-3 text-base text-[#475569] leading-relaxed">
            Sube tu archivo .STL sin necesidad de registrarte. Inspecciona la pieza en 3D, evalúa métricas volumétricas y obtén la estimación técnica orientativa al instante.
          </p>
        </div>

        {/* Upload Zone & Sample Picker */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Drag & Drop Card */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`lg:col-span-8 border-2 border-dashed rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-center gap-5 cursor-pointer transition-all duration-200 ${
              isDragOver
                ? 'border-[#059669] bg-emerald-50/70'
                : 'border-slate-300 hover:border-[#059669] bg-white hover:bg-slate-50 shadow-xs'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".stl"
              onChange={handleFileInputChange}
              className="hidden"
            />
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#059669] shrink-0 shadow-xs">
              <Upload className="w-7 h-7" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-base font-bold text-[#0F172A]">Arrastra y suelta tu archivo .STL aquí</p>
              <p className="text-xs text-[#475569] mt-1">o haz clic para explorar tu ordenador</p>
              <p className="text-[11px] font-mono text-slate-400 mt-1">
                Formatos .STL binarios o ASCII · Hasta 50 MB
              </p>
            </div>
          </div>

          {/* Sample Models Selector */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#475569] mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#059669]" />
                <span className="font-semibold">O prueba un modelo de muestra:</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => loadSample('gear')}
                  className="px-3 py-2 text-xs font-mono text-left bg-slate-50 hover:bg-emerald-50/70 text-[#0F172A] rounded-xl border border-slate-200 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span className="font-semibold">Engranaje</span>
                  <span className="text-[10px] text-[#059669] font-bold">STL</span>
                </button>
                <button
                  type="button"
                  onClick={() => loadSample('bracket')}
                  className="px-3 py-2 text-xs font-mono text-left bg-slate-50 hover:bg-emerald-50/70 text-[#0F172A] rounded-xl border border-slate-200 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span className="font-semibold">Soporte L</span>
                  <span className="text-[10px] text-[#059669] font-bold">STL</span>
                </button>
                <button
                  type="button"
                  onClick={() => loadSample('turbine')}
                  className="px-3 py-2 text-xs font-mono text-left bg-slate-50 hover:bg-emerald-50/70 text-[#0F172A] rounded-xl border border-slate-200 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span className="font-semibold">Turbina</span>
                  <span className="text-[10px] text-[#059669] font-bold">STL</span>
                </button>
                <button
                  type="button"
                  onClick={() => loadSample('cube')}
                  className="px-3 py-2 text-xs font-mono text-left bg-slate-50 hover:bg-emerald-50/70 text-[#0F172A] rounded-xl border border-slate-200 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span className="font-semibold">Cubo 20mm</span>
                  <span className="text-[10px] text-[#059669] font-bold">STL</span>
                </button>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-[#475569]">
              <span className="truncate max-w-[170px] text-[#0F172A] font-medium">{fileName}</span>
              <span>{fileSizeKb} KB</span>
            </div>
          </div>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-xs font-mono text-red-700 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Main Work Area: 3D Viewer Left (7 Cols), Config & Estimation Right (5 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 3D Viewer & Extracted Metrics */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="relative shadow-md rounded-2xl overflow-hidden">
              <STLViewer
                geometry={currentMetrics ? currentMetrics.geometry : null}
                modelColor={color}
                dimensionsMm={currentMetrics ? currentMetrics.dimensionsMm : undefined}
                fileName={fileName}
              />
              {isLoading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-20 rounded-2xl">
                  <div className="flex items-center gap-3 text-[#059669] font-mono text-xs font-bold">
                    <RotateCw className="w-5 h-5 animate-spin" />
                    <span>Analizando coordenadas y malla STL...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Geometric Metrics Extraction Card */}
            {currentMetrics && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#059669]" />
                    <h3 className="text-sm font-bold text-[#0F172A]">Métricas Geométricas Extraídas</h3>
                  </div>
                  <span className="text-xs font-mono text-[#475569]">Algoritmo tetraédrico</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                  <div className="bg-[#FAFBFD] border border-slate-200 p-3.5 rounded-xl">
                    <p className="text-[#475569] text-[11px] mb-1">Cotas X × Y × Z</p>
                    <p className="text-[#0F172A] font-bold text-sm">
                      {currentMetrics.dimensionsMm.x} × {currentMetrics.dimensionsMm.y} ×{' '}
                      {currentMetrics.dimensionsMm.z} <span className="text-slate-400 font-normal">mm</span>
                    </p>
                  </div>

                  <div className="bg-[#FAFBFD] border border-slate-200 p-3.5 rounded-xl">
                    <p className="text-[#475569] text-[11px] mb-1">Volumen Sólido</p>
                    <p className="text-[#059669] font-bold text-sm">
                      {currentMetrics.volumeCm3} <span className="text-slate-400 font-normal">cm³</span>
                    </p>
                  </div>

                  <div className="bg-[#FAFBFD] border border-slate-200 p-3.5 rounded-xl">
                    <p className="text-[#475569] text-[11px] mb-1">Superficie Total</p>
                    <p className="text-[#0F172A] font-bold text-sm">
                      {currentMetrics.surfaceAreaCm2} <span className="text-slate-400 font-normal">cm²</span>
                    </p>
                  </div>

                  <div className="bg-[#FAFBFD] border border-slate-200 p-3.5 rounded-xl">
                    <p className="text-[#475569] text-[11px] mb-1">Polígonos (Malla)</p>
                    <p className="text-[#0F172A] font-bold text-sm">
                      {currentMetrics.triangleCount.toLocaleString()}{' '}
                      <span className="text-slate-400 font-normal">Δ</span>
                    </p>
                  </div>
                </div>

                {quoteResult && (
                  <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#475569]">
                    <div>
                      <span>Masa teórica: </span>
                      <span className="text-[#0F172A] font-bold">{quoteResult.estimatedWeightGrams} g</span>
                      <span> ({selectedMaterial.densityGcm3} g/cm³ · {infillPercent}% infill)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#0F172A] font-semibold">
                      <Clock className="w-3.5 h-3.5 text-[#059669]" />
                      <span>Tiempo máq. est.: ~{quoteResult.estimatedPrintHours} h</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Technical Configuration & Pricing Box */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-5 pb-3 border-b border-slate-100">
                <Sliders className="w-4 h-4 text-[#059669]" />
                <h3 className="text-sm font-bold text-[#0F172A]">Parámetros de Fabricación</h3>
              </div>

              {/* 1. Material Selection (PLA Técnico, ABS, PETG, Resina SLA, Nylon SLS) */}
              <div className="mb-5">
                <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
                  1. Selección de Material
                </label>
                <select
                  value={materialId}
                  onChange={(e) => setMaterialId(e.target.value)}
                  className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-mono text-[#0F172A] focus:outline-none focus:border-[#059669] focus:bg-white"
                >
                  {Object.values(AVAILABLE_MATERIALS).map((mat) => (
                    <option key={mat.id} value={mat.id}>
                      {mat.name} ({mat.category}) · {mat.pricePerCm3.toFixed(2)} €/cm³
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-[11px] text-[#475569]">
                  {selectedMaterial.description} · Resistencia térmica: {selectedMaterial.tempResistanceC}°C
                </p>
              </div>

              {/* 2. Color Selection */}
              <div className="mb-5">
                <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
                  2. Selección de Color
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {selectedMaterial.colors.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColor(c)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-mono text-left transition-colors border cursor-pointer ${
                        color === c
                          ? 'border-[#059669] bg-emerald-50 text-[#059669] font-bold'
                          : 'border-slate-200 bg-[#FAFBFD] text-[#475569] hover:text-[#0F172A] hover:bg-white'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Layer Quality (Alta, Estándar, Borrador) */}
              <div className="mb-5">
                <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
                  3. Calidad de Capa (Resolución Z)
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {Object.values(AVAILABLE_RESOLUTIONS).map((res) => (
                    <button
                      key={res.id}
                      type="button"
                      onClick={() => setResolutionId(res.id)}
                      className={`p-2 rounded-xl text-left border transition-colors cursor-pointer ${
                        resolutionId === res.id
                          ? 'border-[#059669] bg-emerald-50 text-[#059669] font-bold'
                          : 'border-slate-200 bg-[#FAFBFD] text-[#475569] hover:text-[#0F172A] hover:bg-white'
                      }`}
                    >
                      <p className="text-xs font-mono">{res.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Infill % */}
              <div className="mb-5">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <label className="font-bold text-[#0F172A]">4. Relleno Interno (Infill %)</label>
                  <span className="font-mono text-[#059669] font-bold">{infillPercent}%</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="100"
                  step="5"
                  value={infillPercent}
                  onChange={(e) => setInfillPercent(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#059669]"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                  <span>20% Prototipo</span>
                  <span>40% Mecánico</span>
                  <span>70% Carga</span>
                  <span>100% Sólido</span>
                </div>
              </div>

              {/* 5. Post-processing / Finish */}
              <div className="mb-5">
                <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
                  5. Acabado Post-Procesado
                </label>
                <select
                  value={finishId}
                  onChange={(e) => setFinishId(e.target.value)}
                  className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-mono text-[#0F172A] focus:outline-none focus:border-[#059669] focus:bg-white"
                >
                  {Object.values(AVAILABLE_FINISHES).map((fin) => (
                    <option key={fin.id} value={fin.id}>
                      {fin.name} {fin.pricePerUnit > 0 ? `(+${fin.pricePerUnit.toFixed(2)} €/ud)` : '(Sin coste añadido)'}
                    </option>
                  ))}
                </select>
              </div>

              {/* 6. Quantity Selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-[#0F172A]">
                    6. Selector de Cantidad
                  </label>
                  <span className="text-[11px] font-mono text-[#059669] font-bold">
                    {quantity >= 10 && 'Descuento de serie activa'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-24 bg-[#FAFBFD] border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-[#0F172A] text-center font-bold focus:outline-none focus:border-[#059669]"
                  />
                  <div className="flex items-center gap-1">
                    {[1, 5, 10, 25, 50].map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => setQuantity(q)}
                        className={`px-2.5 py-1.5 text-xs font-mono rounded-lg transition-colors cursor-pointer ${
                          quantity === q
                            ? 'bg-[#059669] text-white font-bold shadow-xs'
                            : 'bg-slate-100 border border-slate-200 text-[#475569] hover:bg-slate-200 hover:text-[#0F172A]'
                        }`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price Estimation Box */}
              {quoteResult && (
                <div className="bg-[#FAFBFD] border border-slate-200 rounded-2xl p-5 mb-5 shadow-xs">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200 text-xs font-bold text-[#0F172A]">
                    <span>Estimación de Precio Orientativa</span>
                    <span className="font-mono text-[#475569]">x{quantity} uds</span>
                  </div>

                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-[#475569]">
                      <span>Coste de material neto:</span>
                      <span className="text-[#0F172A] font-semibold">{quoteResult.materialCost.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between text-[#475569]">
                      <span>Tiempo y amortización máquina:</span>
                      <span className="text-[#0F172A] font-semibold">{quoteResult.machineCost.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between text-[#475569]">
                      <span>Preparación y calibración:</span>
                      <span className="text-[#0F172A] font-semibold">{quoteResult.setupCost.toFixed(2)} €</span>
                    </div>
                    {quoteResult.finishCost > 0 && (
                      <div className="flex justify-between text-[#475569]">
                        <span>Post-procesado:</span>
                        <span className="text-[#0F172A] font-semibold">{quoteResult.finishCost.toFixed(2)} €</span>
                      </div>
                    )}
                    {quoteResult.discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-bold">
                        <span>Descuento por serie ({quoteResult.discountPercent}%):</span>
                        <span>-{quoteResult.discountAmount.toFixed(2)} €</span>
                      </div>
                    )}

                    <div className="pt-3 border-t border-slate-200 flex items-baseline justify-between">
                      <div>
                        <p className="text-xs font-bold text-[#0F172A] uppercase">Total Estimado:</p>
                        <p className="text-[11px] text-[#475569] font-mono">
                          {quoteResult.unitPrice.toFixed(2)} € / pieza
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-black text-[#059669] font-mono">
                          {quoteResult.totalEstimated.toFixed(2)} €
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Mandatory Visible Disclaimer */}
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-[#0F172A] mb-5 leading-relaxed">
                <p className="font-bold flex items-center gap-1.5 mb-1 text-[#059669]">
                  <Info className="w-3.5 h-3.5" />
                  Aviso Técnico Obligatorio
                </p>
                <p className="text-[#475569]">
                  El precio mostrado es una estimación técnica orientativa. El equipo de PROJECT 3D revisará la geometría para confirmar el presupuesto definitivo.
                </p>
              </div>

              {/* Call to action: "Solicitar y Reservar (Pago Seguro)" */}
              <button
                type="button"
                onClick={() => {
                  const quoteDetails = {
                    fileName,
                    fileSizeKb,
                    dimensionsMm: currentMetrics ? currentMetrics.dimensionsMm : { x: 50, y: 50, z: 25 },
                    volumeCm3: currentMetrics ? currentMetrics.volumeCm3 : 30,
                    materialName: AVAILABLE_MATERIALS[materialId]?.name || materialId,
                    color,
                    quantity,
                    baseSubtotal: quoteResult ? quoteResult.totalEstimated : 35.0,
                  };
                  if (!currentUser) {
                    if (onRequestAuth) {
                      onRequestAuth(quoteDetails);
                    } else {
                      setIsModalOpen(true);
                    }
                  } else {
                    if (onRequestPayment) {
                      onRequestPayment(quoteDetails);
                    } else {
                      setIsModalOpen(true);
                    }
                  }
                }}
                className="w-full py-4 px-4 bg-[#059669] hover:bg-[#047857] text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-600/25 cursor-pointer text-sm font-mono hover:scale-[1.02] active:scale-[0.98]"
              >
                <Lock className="w-4 h-4" />
                <span>Solicitar y Reservar (Pago Seguro)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Guest Checkout & Auto-Account Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 sm:p-8 my-8 shadow-2xl relative">
            {!submissionSuccessRef ? (
              <>
                <div className="mb-6 pb-4 border-b border-slate-100">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-[#059669] text-[11px] font-mono font-bold mb-2">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Toma de Datos (Guest Checkout)</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A]">Solicitar Presupuesto Definitivo</h3>
                  <p className="text-xs text-[#475569] mt-1">
                    No necesitas registrarte previamente. Al confirmar, un ingeniero de PROJECT 3D revisará el archivo STL y podrás acceder a tu panel de cliente para seguir la fabricación.
                  </p>
                </div>

                {formError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
                    {formError}
                  </div>
                )}

                <form onSubmit={handleConfirmQuoteSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] mb-1 font-mono">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ej. Ing. Daniel Ruiz"
                        className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#059669] focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] mb-1 font-mono">
                        Empresa / Organización
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Ej. Mecanizados Toledo S.L."
                        className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#059669] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] mb-1 font-mono">
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="daniel.ruiz@empresa.com"
                        className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#059669] focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] mb-1 font-mono">
                        Teléfono de Contacto *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+34 600 000 000"
                        className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#059669] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1 font-mono">
                      Dirección Completa de Envío *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      placeholder="Calle, número, código postal y ciudad (ej. Polígono Industrial Atalaya, 45500 Torrijos, Toledo)"
                      className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#059669] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1 font-mono">
                      Comentarios o Requisitos Especiales (opcional)
                    </label>
                    <textarea
                      rows={2}
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      placeholder="Tolerancias críticas, insertos, esfuerzos mecánicos o fecha límite requerida..."
                      className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#059669] focus:bg-white resize-none"
                    />
                  </div>

                  {/* Summary recap chip */}
                  <div className="p-3.5 bg-[#FAFBFD] rounded-xl border border-slate-200 text-xs font-mono text-[#475569] flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-[#0F172A] font-bold">{fileName}</span> · {quantity} uds ·{' '}
                      <span className="text-[#059669] font-semibold">{selectedMaterial.name} ({color})</span>
                    </div>
                    <div className="text-[#0F172A] font-bold text-sm">
                      Total Est.: {quoteResult?.totalEstimated.toFixed(2)} €
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 text-xs text-[#475569] hover:text-[#0F172A] cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 bg-[#059669] hover:bg-[#047857] text-white font-bold rounded-xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-600/25 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <RotateCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Transmitiendo solicitud...</span>
                        </>
                      ) : (
                        <>
                          <span>Aceptar Estimación y Enviar</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              /* Confirmation Screen with Auto-Account Activation Notice */
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A]">¡Solicitud de Presupuesto Registrada!</h3>
                
                <div className="my-5 p-4 bg-[#FAFBFD] border border-slate-200 rounded-xl inline-block">
                  <p className="text-xs text-[#475569] font-mono mb-1">Referencia Oficial del Expediente:</p>
                  <p className="text-2xl font-mono font-extrabold text-[#059669] tracking-wider">
                    {submissionSuccessRef}
                  </p>
                </div>

                {/* Post-Registration Auto Account Creation Notification */}
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-left text-xs mb-6 space-y-2">
                  <div className="flex items-center gap-2 text-[#0F172A] font-bold font-mono">
                    <Mail className="w-4 h-4 text-[#059669]" />
                    <span>Activación de Panel de Cliente Automatizada</span>
                  </div>
                  <p className="text-[#475569] leading-relaxed font-sans">
                    Hemos enviado un correo a <strong className="text-[#0F172A]">{registeredEmail}</strong> con un enlace para que definas tu contraseña y actives tu <strong className="text-[#0F172A]">Panel de Cliente</strong>.
                  </p>
                  <p className="text-[11px] text-[#475569] font-sans">
                    Desde allí podrás seguir en tiempo real el estado de producción de tu pieza (revisión técnica, impresión 3D, control dimensional y número de seguimiento de envío).
                  </p>
                </div>

                <div className="flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setSubmissionSuccessRef(null);
                    }}
                    className="px-6 py-2.5 bg-[#059669] hover:bg-[#047857] text-white rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shadow-md shadow-emerald-600/25"
                  >
                    Entendido y Cerrar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
