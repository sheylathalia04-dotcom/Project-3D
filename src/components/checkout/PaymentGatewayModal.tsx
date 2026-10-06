import React, { useState } from 'react';
import {
  CreditCard,
  ShieldCheck,
  Lock,
  CheckCircle2,
  X,
  ArrowRight,
  FileText,
  Truck,
  RotateCw,
  ExternalLink,
  Download,
} from 'lucide-react';
import { CustomerUser } from '../auth/AuthModal';

export interface OrderItemRecord {
  id: string;
  reference: string;
  createdAt: string;
  status: 'En Revisión' | 'En Impresión' | 'Enviado';
  fileName: string;
  fileSizeKb: number;
  material: string;
  color: string;
  quantity: number;
  dimensionsMm: { x: number; y: number; z: number };
  volumeCm3: number;
  basePrice: number;
  taxAmount: number;
  shippingCost: number;
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  customerCompany?: string;
  shippingAddress: string;
}

interface PaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: CustomerUser;
  quoteData: {
    fileName: string;
    fileSizeKb: number;
    dimensionsMm: { x: number; y: number; z: number };
    volumeCm3: number;
    materialName: string;
    color: string;
    quantity: number;
    baseSubtotal: number;
  };
  onPaymentSuccess: (order: OrderItemRecord) => void;
  onNavigateToPortal: () => void;
}

export const PaymentGatewayModal: React.FC<PaymentGatewayModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  quoteData,
  onPaymentSuccess,
  onNavigateToPortal,
}) => {
  // Shipping options
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [shippingAddress, setShippingAddress] = useState<string>('Av. Industrial 42, Polígono Atalaya, Torrijos');
  const [postalCode, setPostalCode] = useState<string>('45500');
  const [city, setCity] = useState<string>('Torrijos (Toledo)');

  // Card Inputs
  const [cardNumber, setCardNumber] = useState<string>('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState<string>('12/28');
  const [cardCvc, setCardCvc] = useState<string>('888');
  const [cardHolder, setCardHolder] = useState<string>(currentUser.name || 'Daniel Ruiz');

  // Status state
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderItemRecord | null>(null);

  if (!isOpen) return null;

  // Financial calculations
  const baseImponible = quoteData.baseSubtotal;
  const shippingCost = baseImponible >= 150 ? 0 : shippingMethod === 'express' ? 12.0 : 6.5;
  const iva21 = (baseImponible + shippingCost) * 0.21;
  const totalAmount = baseImponible + shippingCost + iva21;

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedRef = `P3D-1001`;
      const orderRecord: OrderItemRecord = {
        id: `ord-${Date.now()}`,
        reference: generatedRef,
        createdAt: new Date().toISOString(),
        status: 'En Revisión',
        fileName: quoteData.fileName,
        fileSizeKb: quoteData.fileSizeKb,
        material: quoteData.materialName,
        color: quoteData.color,
        quantity: quoteData.quantity,
        dimensionsMm: quoteData.dimensionsMm,
        volumeCm3: quoteData.volumeCm3,
        basePrice: baseImponible,
        taxAmount: iva21,
        shippingCost,
        totalPrice: totalAmount,
        customerName: currentUser.name,
        customerEmail: currentUser.email,
        customerCompany: currentUser.company,
        shippingAddress: `${shippingAddress}, ${postalCode} ${city}`,
      };

      // Save to customer's order history
      const historyKey = `project3d_orders_${currentUser.email.toLowerCase()}`;
      const existingOrders: OrderItemRecord[] = JSON.parse(localStorage.getItem(historyKey) || '[]');
      existingOrders.unshift(orderRecord);
      localStorage.setItem(historyKey, JSON.stringify(existingOrders));

      // Also save file to customer library
      const libraryKey = `project3d_stl_library_${currentUser.email.toLowerCase()}`;
      const existingLib: any[] = JSON.parse(localStorage.getItem(libraryKey) || '[]');
      const newLibEntry = {
        id: `stl-${Date.now()}`,
        name: quoteData.fileName,
        sizeKb: quoteData.fileSizeKb,
        dimensions: quoteData.dimensionsMm,
        volumeCm3: quoteData.volumeCm3,
        uploadedAt: new Date().toISOString(),
        materialDefault: quoteData.materialName,
      };
      existingLib.unshift(newLibEntry);
      localStorage.setItem(libraryKey, JSON.stringify(existingLib));

      setIsProcessing(false);
      setIsConfirmed(true);
      setConfirmedOrder(orderRecord);
      onPaymentSuccess(orderRecord);
    }, 1500);
  };

  const handleDownloadInvoice = () => {
    if (!confirmedOrder) return;
    const invoiceContent = `===========================================================
PROJECT 3D - FACTURA SIMULADA / ALBARÁN TÉCNICO OFICIAL
Polígono Industrial Atalaya, Av. de los Trabajadores 21, 45500 Torrijos, Toledo
NIF: B-45982144 · Tel: +34 925 770 000 · Email: administracion@project3d-torrijos.es
===========================================================

REFERENCIA PEDIDO: ${confirmedOrder.reference}
FECHA EMISIÓN: ${new Date(confirmedOrder.createdAt).toLocaleDateString()}
ESTADO: PAGADO (Pasarela de Pago Segura Stripe)

DATOS DEL CLIENTE:
Nombre: ${confirmedOrder.customerName}
Empresa: ${confirmedOrder.customerCompany || 'Particular'}
Email: ${confirmedOrder.customerEmail}
Dirección Entrega: ${confirmedOrder.shippingAddress}

DETALLE DEL TRABAJO DE FABRICACIÓN ADITIVA:
- Archivo STL: ${confirmedOrder.fileName} (${confirmedOrder.fileSizeKb} KB)
- Volumen geométrico: ${confirmedOrder.volumeCm3} cm³
- Dimensiones X, Y, Z: ${confirmedOrder.dimensionsMm.x} × ${confirmedOrder.dimensionsMm.y} × ${confirmedOrder.dimensionsMm.z} mm
- Material técnico: ${confirmedOrder.material} (${confirmedOrder.color})
- Cantidad producida: ${confirmedOrder.quantity} unidades

DESGLOSE FINANCIERO:
Base Imponible (Material + Horas Máquina): ${confirmedOrder.basePrice.toFixed(2)} €
Gastos de Envío Asegurado (Torrijos Express): ${confirmedOrder.shippingCost.toFixed(2)} €
IVA (21%): ${confirmedOrder.taxAmount.toFixed(2)} €
-----------------------------------------------------------
TOTAL FACTURADO: ${confirmedOrder.totalPrice.toFixed(2)} € (PAGADO)

Control de Calidad: Conforme a Tolerancias ISO 2768.
PROJECT 3D · Centro de Prototipado y Fabricación Aditiva en Torrijos.
`;

    const blob = new Blob([invoiceContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Factura_${confirmedOrder.reference}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={isProcessing ? undefined : onClose} />

      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 font-sans max-h-[92vh] overflow-y-auto">
        {!isProcessing && !isConfirmed && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* SCREEN 1: PAYMENT GATEWAY FORM */}
        {!isConfirmed ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-slate-200 mb-6">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#059669] flex items-center justify-center shrink-0">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#0F172A] font-mono leading-tight flex items-center gap-2">
                  <span>Pasarela de Pago Segura</span>
                  <span className="text-[10px] font-mono bg-emerald-50 text-[#059669] px-2 py-0.5 rounded-full border border-emerald-200 font-bold">
                    Stripe / SSL 256-bit
                  </span>
                </h3>
                <p className="text-xs text-[#475569] font-mono mt-0.5">
                  Reserva y puesta en cola de fabricación para: <span className="font-bold text-[#0F172A]">{quoteData.fileName}</span>
                </p>
              </div>
            </div>

            <form onSubmit={handleSimulatePayment} className="space-y-6">
              {/* Order & Part Summary Box */}
              <div className="bg-[#FAFBFD] border border-slate-200 rounded-2xl p-4 text-xs font-mono">
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-200 text-[#0F172A] font-bold">
                  <span>Resumen de la Pieza STL</span>
                  <span className="text-[#059669]">{quoteData.quantity} ud(s)</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2.5 text-[#475569]">
                  <div>
                    <span className="block text-[10px] text-slate-400">Material:</span>
                    <span className="font-semibold text-[#0F172A]">{quoteData.materialName}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400">Acabado / Color:</span>
                    <span className="font-semibold text-[#0F172A]">{quoteData.color}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400">Volumen Sólido:</span>
                    <span className="font-semibold text-[#0F172A]">{quoteData.volumeCm3} cm³</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400">Cotas X, Y, Z:</span>
                    <span className="font-semibold text-[#0F172A]">{quoteData.dimensionsMm.x}×{quoteData.dimensionsMm.y} mm</span>
                  </div>
                </div>
              </div>

              {/* Shipping Method Selector */}
              <div>
                <label className="block text-xs font-mono font-bold text-[#0F172A] mb-2 uppercase">
                  1. Método de Envío y Dirección de Entrega
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div
                    onClick={() => setShippingMethod('standard')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      shippingMethod === 'standard'
                        ? 'border-[#059669] bg-emerald-50/50'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Truck className="w-4 h-4 text-[#059669]" />
                      <div className="text-xs font-mono">
                        <p className="font-bold text-[#0F172A]">Envío Estándar</p>
                        <p className="text-[10px] text-[#475569]">24h a 48h tras producción</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#0F172A]">
                      {baseImponible >= 150 ? 'GRATIS' : '6.50 €'}
                    </span>
                  </div>

                  <div
                    onClick={() => setShippingMethod('express')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      shippingMethod === 'express'
                        ? 'border-[#059669] bg-emerald-50/50'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Truck className="w-4 h-4 text-[#059669]" />
                      <div className="text-xs font-mono">
                        <p className="font-bold text-[#0F172A]">Envío Urgente 24h</p>
                        <p className="text-[10px] text-[#475569]">Prioridad de taller y flete</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#0F172A]">12.00 €</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      required
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      placeholder="Calle, número, polígono..."
                      className="w-full bg-[#FAFBFD] border border-slate-300 rounded-xl px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#059669]"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Ciudad / Población"
                      className="w-full bg-[#FAFBFD] border border-slate-300 rounded-xl px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#059669]"
                    />
                  </div>
                </div>
              </div>

              {/* Simulated Card Details */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-mono font-bold text-[#0F172A] uppercase">
                    2. Datos de Pago con Tarjeta
                  </label>
                  <span className="text-[11px] font-mono text-[#059669] flex items-center gap-1 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Entorno de Prueba Seguro
                  </span>
                </div>

                <div className="bg-[#FAFBFD] border border-slate-200 rounded-2xl p-4 space-y-3 font-mono text-xs">
                  <div>
                    <span className="block text-[11px] text-[#475569] mb-1 font-semibold">Número de Tarjeta</span>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-[#0F172A] font-mono font-bold focus:border-[#059669] focus:outline-none"
                      />
                      <CreditCard className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="block text-[11px] text-[#475569] mb-1 font-semibold">Fecha Caducidad</span>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/AA"
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-[#0F172A] font-mono text-center focus:border-[#059669] focus:outline-none"
                      />
                    </div>
                    <div>
                      <span className="block text-[11px] text-[#475569] mb-1 font-semibold">Código CVC / CVV</span>
                      <input
                        type="text"
                        required
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="CVC"
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-[#0F172A] font-mono text-center focus:border-[#059669] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <span className="block text-[11px] text-[#475569] mb-1 font-semibold">Titular de la Tarjeta</span>
                    <input
                      type="text"
                      required
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="Nombre como aparece en la tarjeta"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-[#0F172A] font-mono focus:border-[#059669] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Exact Breakdown: Base Imponible + IVA 21% + Envío */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 font-mono text-xs">
                <div className="flex justify-between text-[#475569]">
                  <span>Base Imponible (Material + Fabricación):</span>
                  <span className="font-semibold text-[#0F172A]">{baseImponible.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-[#475569]">
                  <span>Costes de Envío Asegurado:</span>
                  <span className="font-semibold text-[#0F172A]">{shippingCost.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-[#475569]">
                  <span>IVA Aplicable (21%):</span>
                  <span className="font-semibold text-[#0F172A]">{iva21.toFixed(2)} €</span>
                </div>
                <div className="pt-2.5 border-t border-slate-200 flex justify-between items-baseline text-sm">
                  <div>
                    <span className="font-extrabold text-[#0F172A] uppercase">Total Definitivo a Pagar:</span>
                    <span className="block text-[10px] text-[#475569] font-normal">Factura desglosada con NIF</span>
                  </div>
                  <span className="text-2xl font-black text-[#059669]">
                    {totalAmount.toFixed(2)} €
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-[#059669] hover:bg-[#047857] text-white font-bold rounded-2xl text-xs font-mono transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-600/30 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin" />
                    <span>Conectando con pasarela segura...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pagar {totalAmount.toFixed(2)} € y Reservar Producción</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* SCREEN 2: CONFIRMATION SCREEN (Exact requested text) */
          <div className="text-center py-6 px-2 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-300 text-[#059669] flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-mono font-bold text-[#059669] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
                Transacción Aprobada · Pedido #{confirmedOrder?.reference}
              </span>
              {/* Exact Requested Text */}
              <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] mt-4 mb-2 font-mono leading-snug">
                ¡Pago Confirmado! Tu pedido #{confirmedOrder?.reference} ha entrado en la cola de producción. Recibirás tu factura e informe técnico por email.
              </h3>
              <p className="text-xs text-[#475569] max-w-lg mx-auto font-sans leading-relaxed">
                Nuestros ingenieros en el taller de Torrijos han asignado tu archivo <strong className="text-[#0F172A]">{confirmedOrder?.fileName}</strong> a la máquina de fabricación aditiva correspondiente ({confirmedOrder?.material}).
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToPortal();
                }}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#059669] hover:bg-[#047857] text-white font-bold rounded-xl text-xs font-mono flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/25 cursor-pointer"
              >
                <span>Ir a Mi Panel de Cliente (/mi-cuenta)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleDownloadInvoice}
                className="w-full sm:w-auto px-5 py-3.5 bg-white hover:bg-slate-50 text-[#0F172A] border border-slate-300 font-semibold rounded-xl text-xs font-mono flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <Download className="w-4 h-4 text-[#059669]" />
                <span>Descargar Factura PDF</span>
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-mono text-[#475569] hover:text-[#0F172A] cursor-pointer"
              >
                Cerrar y seguir navegando
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
