import React, { useState, useEffect } from 'react';
import {
  Package,
  Layers,
  FileText,
  Download,
  Upload,
  ArrowLeft,
  LogOut,
  Clock,
  CheckCircle2,
  Cpu,
  Boxes,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Printer,
  Eye,
} from 'lucide-react';
import { CustomerUser } from '../auth/AuthModal';
import { OrderItemRecord } from '../checkout/PaymentGatewayModal';
import { Isologo3D } from '../brand/Isologo3D';

interface CustomerPortalProps {
  user: CustomerUser;
  onLogout: () => void;
  onExit: () => void;
  onRequoteFile: (fileInfo: { fileName: string; material: string }) => void;
}

export const CustomerPortal: React.FC<CustomerPortalProps> = ({
  user,
  onLogout,
  onExit,
  onRequoteFile,
}) => {
  const [orders, setOrders] = useState<OrderItemRecord[]>([]);
  const [stlLibrary, setStlLibrary] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'orders' | 'library'>('orders');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<OrderItemRecord | null>(null);

  // Load orders and files from localStorage for this user
  useEffect(() => {
    const historyKey = `project3d_orders_${user.email.toLowerCase()}`;
    const savedOrders: OrderItemRecord[] = JSON.parse(localStorage.getItem(historyKey) || '[]');

    // If empty, provide realistic initial demo order
    if (savedOrders.length === 0) {
      const demoOrder: OrderItemRecord = {
        id: 'ord-demo-01',
        reference: 'P3D-1001',
        createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
        status: 'En Impresión',
        fileName: 'soporte_motor_nema23.stl',
        fileSizeKb: 840,
        material: 'ABS Industrial',
        color: 'Negro Industrial',
        quantity: 4,
        dimensionsMm: { x: 75.0, y: 85.0, z: 45.0 },
        volumeCm3: 52.8,
        basePrice: 68.64,
        taxAmount: 15.78,
        shippingCost: 6.5,
        totalPrice: 90.92,
        customerName: user.name,
        customerEmail: user.email,
        customerCompany: user.company || 'Mecanizados & Robótica S.L.',
        shippingAddress: 'Polígono Industrial Atalaya, Torrijos (Toledo)',
      };
      setOrders([demoOrder]);
      localStorage.setItem(historyKey, JSON.stringify([demoOrder]));
    } else {
      setOrders(savedOrders);
    }

    const libraryKey = `project3d_stl_library_${user.email.toLowerCase()}`;
    const savedLib = JSON.parse(localStorage.getItem(libraryKey) || '[]');
    if (savedLib.length === 0) {
      const demoLib = [
        {
          id: 'stl-1',
          name: 'soporte_motor_nema23.stl',
          sizeKb: 840,
          dimensions: { x: 75.0, y: 85.0, z: 45.0 },
          volumeCm3: 52.8,
          uploadedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
          materialDefault: 'ABS Industrial',
        },
        {
          id: 'stl-2',
          name: 'engranaje_helicoidal_m2.stl',
          sizeKb: 650,
          dimensions: { x: 68.0, y: 68.0, z: 25.0 },
          volumeCm3: 32.5,
          uploadedAt: new Date(Date.now() - 3600000 * 72).toISOString(),
          materialDefault: 'Nylon SLS',
        },
      ];
      setStlLibrary(demoLib);
      localStorage.setItem(libraryKey, JSON.stringify(demoLib));
    } else {
      setStlLibrary(savedLib);
    }
  }, [user.email]);

  const handleDownloadInvoice = (order: OrderItemRecord) => {
    const invoiceContent = `===========================================================
PROJECT 3D - FACTURA OFICIAL / ALBARÁN TÉCNICO
Polígono Industrial Atalaya, Av. de los Trabajadores 21, 45500 Torrijos, Toledo
NIF: B-45982144 · Tel: +34 925 770 000 · Email: administracion@project3d-torrijos.es
===========================================================

NUMERO DE FACTURA: FAC-${order.reference}
REFERENCIA PEDIDO: ${order.reference}
FECHA: ${new Date(order.createdAt).toLocaleDateString()}
ESTADO ACTUAL: ${order.status.toUpperCase()}

RECEPTOR:
Cliente: ${order.customerName}
Empresa: ${order.customerCompany || 'Particular'}
Email: ${order.customerEmail}
Dirección: ${order.shippingAddress}

LÍNEAS DE FABRICACIÓN ADITIVA:
1. Servicio de Fabricación STL: ${order.fileName}
   - Polímero de ingeniería: ${order.material} (${order.color})
   - Volumen de la pieza: ${order.volumeCm3} cm³
   - Dimensiones: ${order.dimensionsMm.x} × ${order.dimensionsMm.y} × ${order.dimensionsMm.z} mm
   - Unidades fabricadas: ${order.quantity} uds
   - Subtotal neto: ${order.basePrice.toFixed(2)} €

2. Portes de Transporte Asegurado (Torrijos / Península): ${order.shippingCost.toFixed(2)} €
3. Cuota IVA (21%): ${order.taxAmount.toFixed(2)} €
-----------------------------------------------------------
IMPORTE TOTAL (EUR): ${order.totalPrice.toFixed(2)} € (PAGADO)

Garantía: Fabricado conforme a norma técnica ISO 2768.
PROJECT 3D · Centro de Prototipado y Fabricación Aditiva en Torrijos.
`;

    const blob = new Blob([invoiceContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Factura_${order.reference}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getOrderStatusBadge = (status: 'En Revisión' | 'En Impresión' | 'Enviado') => {
    switch (status) {
      case 'En Revisión':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-50 text-amber-800 border border-amber-300">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>En Revisión</span>
          </span>
        );
      case 'En Impresión':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-50 text-[#059669] border border-emerald-300">
            <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
            <span>En Impresión</span>
          </span>
        );
      case 'Enviado':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-900 text-white border border-slate-900">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Enviado</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBFD] text-[#0F172A] font-sans flex flex-col">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <Isologo3D size={38} />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-black text-[#0F172A] tracking-wider font-mono">
                PROJECT 3D
              </h1>
              <span className="text-[10px] font-mono text-[#059669] font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                /mi-cuenta
              </span>
            </div>
            <p className="text-[11px] text-[#475569] font-mono">
              Panel Privado de Cliente · {user.name} ({user.company || 'Particular'})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onExit}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 text-[#0F172A] rounded-xl text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#059669]" />
            <span>Volver a la Web Pública</span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            title="Cerrar sesión"
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-8">
        {/* User Welcome & Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <span className="text-xs font-mono text-[#475569] block mb-1">Pedidos Realizados</span>
            <p className="text-2xl font-black text-[#0F172A] font-mono">{orders.length}</p>
            <span className="text-[10px] font-mono text-[#059669] mt-1 block">Trazabilidad por lote</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <span className="text-xs font-mono text-[#475569] block mb-1">Archivos STL Guardados</span>
            <p className="text-2xl font-black text-[#0F172A] font-mono">{stlLibrary.length}</p>
            <span className="text-[10px] font-mono text-[#059669] mt-1 block">Biblioteca privada</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <span className="text-xs font-mono text-[#475569] block mb-1">Centro de Producción</span>
            <p className="text-sm font-black text-[#0F172A] font-mono">Torrijos (Toledo)</p>
            <span className="text-[10px] font-mono text-slate-400 mt-1 block">Pol. Ind. Atalaya</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <span className="text-xs font-mono text-[#475569] block mb-1">Garantía Dimensional</span>
            <p className="text-sm font-black text-[#059669] font-mono">ISO 2768 ±0.08mm</p>
            <span className="text-[10px] font-mono text-slate-400 mt-1 block">Control óptico micrométrico</span>
          </div>
        </div>

        {/* Tab Controls: Orders vs STL Library */}
        <div className="flex border-b border-slate-200 space-x-6 text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`pb-3 border-b-2 font-bold transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'border-[#059669] text-[#059669]'
                : 'border-transparent text-[#475569] hover:text-[#0F172A]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Mis Pedidos y Órdenes de Producción ({orders.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('library')}
            className={`pb-3 border-b-2 font-bold transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'library'
                ? 'border-[#059669] text-[#059669]'
                : 'border-transparent text-[#475569] hover:text-[#0F172A]'
            }`}
          >
            <Boxes className="w-4 h-4" />
            <span>Biblioteca de Archivos STL Guardados ({stlLibrary.length})</span>
          </button>
        </div>

        {/* TAB 1: MIS PEDIDOS */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
                <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-[#0F172A] font-mono">Aún no tienes pedidos registrados</h3>
                <p className="text-xs text-[#475569] mt-1 mb-5">
                  Sube un archivo STL a la calculadora para cotizar y reservar tu primera orden de fabricación.
                </p>
                <button
                  type="button"
                  onClick={onExit}
                  className="px-5 py-2.5 bg-[#059669] text-white font-bold rounded-xl text-xs font-mono transition-colors"
                >
                  Ir al Cotizador STL
                </button>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-50 border-b border-slate-200 text-[#475569] uppercase text-[10px]">
                      <tr>
                        <th className="py-4 px-5 font-bold">Referencia</th>
                        <th className="py-4 px-5 font-bold">Archivo STL</th>
                        <th className="py-4 px-5 font-bold">Material & Uds</th>
                        <th className="py-4 px-5 font-bold">Fecha</th>
                        <th className="py-4 px-5 font-bold">Estado de Fabricación</th>
                        <th className="py-4 px-5 text-right font-bold">Total Factura</th>
                        <th className="py-4 px-5 text-right font-bold">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {orders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-4 px-5 font-bold text-[#059669] whitespace-nowrap">
                            #{ord.reference}
                          </td>
                          <td className="py-4 px-5 max-w-[180px] truncate">
                            <p className="font-bold text-[#0F172A] truncate" title={ord.fileName}>
                              {ord.fileName}
                            </p>
                            <p className="text-[10px] text-[#475569]">
                              {ord.volumeCm3} cm³ · {ord.dimensionsMm.x}×{ord.dimensionsMm.y} mm
                            </p>
                          </td>
                          <td className="py-4 px-5 whitespace-nowrap">
                            <p className="font-semibold text-[#0F172A]">{ord.material}</p>
                            <p className="text-[10px] text-[#475569]">{ord.quantity} unidad(es)</p>
                          </td>
                          <td className="py-4 px-5 whitespace-nowrap text-[#475569]">
                            {new Date(ord.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-5 whitespace-nowrap">
                            {getOrderStatusBadge(ord.status)}
                          </td>
                          <td className="py-4 px-5 text-right font-bold text-[#0F172A] whitespace-nowrap">
                            {ord.totalPrice.toFixed(2)} €
                          </td>
                          <td className="py-4 px-5 text-right whitespace-nowrap space-x-2">
                            <button
                              type="button"
                              onClick={() => handleDownloadInvoice(ord)}
                              title="Descargar Factura PDF"
                              className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-[#059669] hover:border-emerald-200 border border-slate-200 rounded-lg text-xs font-mono transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5 text-[#059669]" />
                              <span>Factura PDF</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setSelectedOrderDetails(ord)}
                              title="Ver Albarán Técnico"
                              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#0F172A] border border-slate-200 rounded-lg text-xs transition-colors inline-flex items-center gap-1 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: BIBLIOTECA DE ARCHIVOS STL GUARDADOS */}
        {activeTab === 'library' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-[#0F172A] font-mono">Tus Modelos 3D Almacenados</h3>
                <p className="text-xs text-[#475569]">Reordena piezas previas o cotiza con nuevos materiales con un solo clic.</p>
              </div>
              <button
                type="button"
                onClick={onExit}
                className="px-4 py-2 bg-[#059669] hover:bg-[#047857] text-white font-bold rounded-xl text-xs font-mono flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Subir Nuevo STL</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {stlLibrary.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#059669] border border-emerald-200 flex items-center justify-center font-mono font-bold text-xs">
                        STL
                      </div>
                      <span className="text-[10px] font-mono text-[#475569]">
                        {new Date(item.uploadedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#0F172A] font-mono mb-2 truncate" title={item.name}>
                      {item.name}
                    </h4>

                    <div className="bg-[#FAFBFD] border border-slate-200 rounded-xl p-3 text-xs font-mono space-y-1 text-[#475569] mb-4">
                      <div className="flex justify-between">
                        <span>Volumen:</span>
                        <span className="font-semibold text-[#0F172A]">{item.volumeCm3} cm³</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cotas X, Y, Z:</span>
                        <span className="font-semibold text-[#0F172A]">{item.dimensions.x}×{item.dimensions.y}×{item.dimensions.z} mm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Material preferente:</span>
                        <span className="text-[#059669] font-bold">{item.materialDefault || 'PLA / ABS'}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onRequoteFile({ fileName: item.name, material: item.materialDefault });
                      onExit();
                    }}
                    className="w-full py-2.5 bg-slate-100 hover:bg-[#059669] hover:text-white text-[#0F172A] font-mono font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200"
                  >
                    <span>Cotizar / Repetir Fabricación</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Order Details Modal if clicked Eye */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative font-sans">
            <button
              onClick={() => setSelectedOrderDetails(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700"
            >
              ✕
            </button>
            <div className="flex items-center gap-2 mb-4">
              <Isologo3D size={32} />
              <h3 className="text-base font-bold text-[#0F172A] font-mono">
                Albarán #{selectedOrderDetails.reference}
              </h3>
            </div>

            <div className="space-y-3 text-xs font-mono text-[#0F172A] bg-[#FAFBFD] p-4 rounded-xl border border-slate-200 mb-4">
              <p><span className="text-[#475569]">Archivo:</span> {selectedOrderDetails.fileName}</p>
              <p><span className="text-[#475569]">Material:</span> {selectedOrderDetails.material} ({selectedOrderDetails.color})</p>
              <p><span className="text-[#475569]">Unidades:</span> {selectedOrderDetails.quantity}</p>
              <p><span className="text-[#475569]">Entrega:</span> {selectedOrderDetails.shippingAddress}</p>
              <p><span className="text-[#475569]">Estado:</span> {selectedOrderDetails.status}</p>
              <p className="pt-2 border-t border-slate-200 font-bold flex justify-between">
                <span>Total Facturado:</span>
                <span className="text-[#059669]">{selectedOrderDetails.totalPrice.toFixed(2)} €</span>
              </p>
            </div>

            <button
              onClick={() => handleDownloadInvoice(selectedOrderDetails)}
              className="w-full py-3 bg-[#059669] hover:bg-[#047857] text-white font-bold rounded-xl text-xs font-mono flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Factura Oficial (.TXT / PDF)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
