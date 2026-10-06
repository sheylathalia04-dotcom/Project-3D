import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Initialize GoogleGenAI SDK server-side
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Pricing Configuration State
export interface PricingConfig {
  machineHourlyRate: number; // €/hour
  baseSetupFee: number; // €
  materials: Record<string, { pricePerCm3: number; densityGcm3: number; label: string }>;
  resolutions: Record<string, { multiplier: number; speedFactor: number; label: string }>;
  finishes: Record<string, { pricePerUnit: number; label: string }>;
}

let pricingConfig: PricingConfig = {
  machineHourlyRate: 14.5,
  baseSetupFee: 6.0,
  materials: {
    pla: { pricePerCm3: 0.08, densityGcm3: 1.24, label: 'PLA Técnico' },
    abs: { pricePerCm3: 0.13, densityGcm3: 1.05, label: 'ABS' },
    petg: { pricePerCm3: 0.11, densityGcm3: 1.27, label: 'PETG' },
    sla_standard: { pricePerCm3: 0.28, densityGcm3: 1.18, label: 'Resina SLA' },
    nylon_sls: { pricePerCm3: 0.32, densityGcm3: 1.02, label: 'Nylon SLS' },
  },
  resolutions: {
    alta: { multiplier: 1.35, speedFactor: 1.6, label: 'Alta (0.12 mm)' },
    estandar: { multiplier: 1.0, speedFactor: 1.0, label: 'Estándar (0.20 mm)' },
    borrador: { multiplier: 0.85, speedFactor: 0.7, label: 'Borrador (0.28 mm)' },
  },
  finishes: {
    raw: { pricePerUnit: 0.0, label: 'Sin postprocesado (Despaletizado estándar)' },
    sanded: { pricePerUnit: 6.5, label: 'Lijado técnico y eliminación de soportes' },
    chemical_smoothing: { pricePerUnit: 14.0, label: 'Suavizado por vaporización química' },
    primed_painted: { pricePerUnit: 22.0, label: 'Imprimación técnica y pintura monocromo' },
    threaded_inserts: { pricePerUnit: 8.5, label: 'Inserción de casquillos roscados en latón (M3/M4/M5)' },
  },
};

// Quote Interface
export interface QuoteRequest {
  id: string;
  reference: string;
  createdAt: string;
  status:
    | 'Nueva Solicitud'
    | 'En Revisión'
    | 'Presupuesto Enviado'
    | 'En Producción'
    | 'Finalizado';
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
    stlData?: string;
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

// Initial demo quotes representing realistic industrial orders
let quotesDatabase: QuoteRequest[] = [
  {
    id: 'quote-101',
    reference: 'P3D-2026-0842',
    createdAt: new Date(Date.now() - 3600000 * 26).toISOString(),
    status: 'En Producción',
    customer: {
      fullName: 'Carlos Menéndez',
      company: 'RoboTech Ibérica S.L.',
      email: 'carlos.m@robotechiberica.es',
      phone: '+34 612 458 901',
      comments: 'Piezas para el banco de pruebas de actuadores en robot SCARA.',
      shippingCity: 'Torrijos (Toledo)',
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
      color: 'Negro Teñido',
      quantity: 4,
      resolution: 'Alta',
      infillPercent: 50,
      finish: 'sanded',
    },
    pricing: {
      materialCost: 287.64,
      machineCost: 112.5,
      setupCost: 6.0,
      finishCost: 26.0,
      subtotal: 432.14,
      discountAmount: 21.6,
      totalEstimated: 410.54,
    },
    internalNotes: 'Tolerancias críticas en alojamientos de 12mm verificadas.',
  },
  {
    id: 'quote-102',
    reference: 'P3D-2026-0843',
    createdAt: new Date(Date.now() - 3600000 * 14).toISOString(),
    status: 'En Revisión',
    customer: {
      fullName: 'Elena Gómez Santamaría',
      company: 'AgroDron Soluciones',
      email: 'elena.gomez@agrodron.com',
      phone: '+34 689 334 112',
      comments: 'Carcasa para cámara multiespectral de dron agrícola.',
      shippingCity: 'Torrijos (Toledo)',
    },
    fileInfo: {
      fileName: 'carcasa_sensor_multiespectral.stl',
      fileSizeKb: 920,
      dimensionsMm: { x: 88.0, y: 88.0, z: 35.5 },
      volumeCm3: 41.2,
      surfaceAreaCm2: 172.0,
      triangleCount: 28400,
      estimatedWeightGrams: 45.3,
    },
    configuration: {
      material: 'ABS',
      color: 'Gris Ceniza',
      quantity: 10,
      resolution: 'Estándar',
      infillPercent: 30,
      finish: 'chemical_smoothing',
    },
    pricing: {
      materialCost: 53.56,
      machineCost: 82.0,
      setupCost: 6.0,
      finishCost: 140.0,
      subtotal: 281.56,
      discountAmount: 28.15,
      totalEstimated: 253.41,
    },
    internalNotes: 'Comprobar estanqueidad en junta tórica.',
  },
  {
    id: 'quote-103',
    reference: 'P3D-2026-0844',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    status: 'Nueva Solicitud',
    customer: {
      fullName: 'Marc Valls',
      company: 'Automatismos del Tajo',
      email: 'mvalls@autotajo.es',
      phone: '+34 655 771 209',
      comments: 'Engranajes helicoidales de repuesto para línea de embotellado.',
      shippingCity: 'Madrid',
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
      resolution: 'Alta',
      infillPercent: 100,
      finish: 'threaded_inserts',
    },
    pricing: {
      materialCost: 46.8,
      machineCost: 48.0,
      setupCost: 6.0,
      finishCost: 51.0,
      subtotal: 151.8,
      discountAmount: 7.59,
      totalEstimated: 144.21,
    },
    internalNotes: 'Requiere 100% de relleno sólido para soportar torque de 8 Nm.',
  },
];

// API: Quotes endpoints
app.get('/api/quotes', (_req: Request, res: Response) => {
  res.json({ success: true, quotes: quotesDatabase });
});

app.post('/api/quotes', (req: Request, res: Response) => {
  const body = req.body;
  const newRefNumber = `P3D-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const newQuote: QuoteRequest = {
    id: `quote-${Date.now()}`,
    reference: newRefNumber,
    createdAt: new Date().toISOString(),
    status: 'Nueva Solicitud',
    customer: body.customer || {
      fullName: 'Cliente Anónimo',
      company: '',
      email: 'cliente@ejemplo.com',
      phone: '',
      ndaRequired: false,
    },
    fileInfo: body.fileInfo || {
      fileName: 'modelo.stl',
      fileSizeKb: 100,
      dimensionsMm: { x: 50, y: 50, z: 50 },
      volumeCm3: 20,
      surfaceAreaCm2: 60,
      triangleCount: 5000,
      estimatedWeightGrams: 24,
    },
    configuration: body.configuration || {
      material: 'pla',
      color: 'Negro',
      quantity: 1,
      resolution: 'standard',
      infillPercent: 20,
      finish: 'raw',
      productionPriority: 'standard',
    },
    pricing: body.pricing || {
      materialCost: 10,
      machineCost: 15,
      setupCost: 6,
      finishCost: 0,
      subtotal: 31,
      discountAmount: 0,
      totalEstimated: 31,
    },
    internalNotes: 'Solicitud recibida desde la web de PROJECT 3D.',
  };

  quotesDatabase.unshift(newQuote);
  res.status(201).json({ success: true, quote: newQuote });
});

app.patch('/api/quotes/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, internalNotes, pricing } = req.body;

  const quoteIndex = quotesDatabase.findIndex((q) => q.id === id);
  if (quoteIndex === -1) {
    return res.status(404).json({ success: false, message: 'Presupuesto no encontrado' });
  }

  if (status) quotesDatabase[quoteIndex].status = status;
  if (internalNotes !== undefined) quotesDatabase[quoteIndex].internalNotes = internalNotes;
  if (pricing) quotesDatabase[quoteIndex].pricing = { ...quotesDatabase[quoteIndex].pricing, ...pricing };

  res.json({ success: true, quote: quotesDatabase[quoteIndex] });
});

app.delete('/api/quotes/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  quotesDatabase = quotesDatabase.filter((q) => q.id !== id);
  res.json({ success: true, message: 'Solicitud eliminada' });
});

// API: Pricing configuration
app.get('/api/config/pricing', (_req: Request, res: Response) => {
  res.json({ success: true, config: pricingConfig });
});

app.post('/api/config/pricing', (req: Request, res: Response) => {
  const newConfig = req.body;
  pricingConfig = {
    ...pricingConfig,
    ...newConfig,
  };
  res.json({ success: true, config: pricingConfig });
});

// API: Admin Authentication verification (simple secure session check for demo)
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { code } = req.body;
  // Master code for demonstration
  if (code === 'PROJECT3D-ADMIN' || code === 'admin123' || code === 'torrijos3d') {
    res.json({ success: true, token: 'session_auth_project3d_valid', role: 'admin' });
  } else {
    res.status(401).json({ success: false, message: 'Código de acceso no válido' });
  }
});

// API: Multilingual Chatbot powered by Gemini + Engineering Fallback
app.post('/api/chat', async (req: Request, res: Response) => {
  const { message, language = 'es', history = [] } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ success: false, message: 'Mensaje requerido' });
  }

  const systemInstruction = `
Eres el Asistente Técnico y Comercial de "PROJECT 3D", empresa de prototipado industrial, fabricación aditiva y producción de series cortas.
Ubicación oficial propuesta del proyecto:
PROJECT 3D
Av. de los Trabajadores, 21
Polígono Industrial Atalaya
45500 Torrijos, Toledo, España
(Propuesta de ubicación situada frente al Vivero de Empresas de Torrijos, Ref. 22).

DIRECTRICES CLAVE:
1. Idioma: Detecta el idioma en que escribe el usuario (español, inglés, francés, alemán, etc.) y responde SIEMPRE con naturalidad y precisión técnica en ese mismo idioma.
2. Tono: Industrial, profesional, técnico, conciso y orientado a soluciones de ingeniería mecánica y prototipado.
3. Conocimiento técnico:
   - Tecnologías: FDM (Modelado por deposición fundida de grado industrial), SLA (Estereolitografía láser de alta resolución), SLS (Sinterizado selectivo por láser).
   - Materiales disponibles: PLA Industrial, PETG Técnico, ABS/ASA resistente a UV, TPU 95A flexible, PA12 Nylon tenaz para piezas funcionales, Resina estándar y técnica de alta definición, PA-CF Fibra de Carbono para aplicaciones de rigidez extrema.
   - Formatos admitidos: Archivos 3D en formato .STL (también podemos recibir .STEP / .STP en solicitudes personalizadas).
   - Plazos: Prototipado express 24-48h, fabricación estándar 3-5 días laborables según volumen y postprocesado.
   - Presupuestos: La web dispone de un cotizador automático de STL interactivo con visor 3D en tiempo real. Todos los presupuestos calculados en la web son orientativos y son revisados por el equipo de ingeniería antes de la fabricación definitiva.
   - Confidencialidad: Ofrecemos acuerdo de confidencialidad (NDA) para proyectos que lo requieran.
4. RESTRICCIÓN ESTRICTA: No inventes clientes específicos reales, certificaciones inexistentes ni teléfonos no confirmados. Trata la dirección siempre como la ubicación propuesta para el proyecto en Torrijos (Toledo). Si no sabes un dato o se requiere atención humana específica, deriva amablemente al usuario al formulario de presupuesto de la web o a contactar con el equipo técnico.
`;

  if (ai) {
    try {
      // Build conversation contents
      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      // Add recent history if available
      if (Array.isArray(history) && history.length > 0) {
        history.slice(-4).forEach((h: { sender: string; text: string }) => {
          contents.push({
            role: h.sender === 'user' ? 'user' : 'model',
            parts: [{ text: h.text }],
          });
        });
      }

      contents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.4,
        },
      });

      const replyText = response.text || '';
      return res.json({ success: true, reply: replyText });
    } catch (error) {
      console.warn('Gemini API call failed, falling back to engineering response:', error);
    }
  }

  // Graceful rule-based technical fallback when offline or no API key
  const lowerMsg = message.toLowerCase();
  let fallbackReply = '';

  const isEnglish = language === 'en' || /^(hi|hello|what|how|where|material|price|quote|can|is)/i.test(message);
  const isFrench = language === 'fr' || /^(bonjour|salut|comment|quel|matière|devis|où|prix)/i.test(message);
  const isGerman = language === 'de' || /^(hallo|guten|was|wie|wo|material|preis|angebot)/i.test(message);

  if (isEnglish) {
    if (lowerMsg.includes('material') || lowerMsg.includes('filament') || lowerMsg.includes('resin')) {
      fallbackReply =
        'At PROJECT 3D, we work with technical industrial materials: PLA Industrial, PETG, ABS/ASA (UV & heat resistant), TPU 95A (flexible elastomer), PA12 Nylon (high toughness), High-definition SLA Resin, and Carbon Fiber reinforced PA-CF. You can select and calculate costs in our interactive STL quote tool!';
    } else if (lowerMsg.includes('where') || lowerMsg.includes('address') || lowerMsg.includes('location')) {
      fallbackReply =
        'PROJECT 3D is located at Av. de los Trabajadores, 21, Polígono Industrial Atalaya, 45500 Torrijos, Toledo, Spain (proposed location situated in front of Vivero de Empresas de Torrijos, Ref. 22).';
    } else if (lowerMsg.includes('stl') || lowerMsg.includes('quote') || lowerMsg.includes('price') || lowerMsg.includes('cost')) {
      fallbackReply =
        'You can upload your .STL file directly into our 3D quote module on this site. Our engine will calculate bounding dimensions, volume, mass, and provide an instant estimated breakdown. Our engineers then review it to deliver the definitive quote!';
    } else {
      fallbackReply =
        'Hello! I am the technical assistant of PROJECT 3D in Torrijos (Toledo). We specialize in industrial 3D prototyping, functional parts, and short-series additive manufacturing. How can I help you with your project today?';
    }
  } else if (isFrench) {
    if (lowerMsg.includes('matière') || lowerMsg.includes('materiau')) {
      fallbackReply =
        'Chez PROJECT 3D, nous travaillons avec du PLA Industriel, PETG, ABS/ASA, TPU 95A flexible, Nylon PA12 haute ténacité, Résine SLA haute précision et PA-CF fibre de carbone. Vous pouvez tester les matériaux directement dans notre configurateur STL !';
    } else if (lowerMsg.includes('où') || lowerMsg.includes('adresse')) {
      fallbackReply =
        'PROJECT 3D est situé Av. de los Trabajadores, 21, Polígono Industrial Atalaya, 45500 Torrijos, Tolède, Espagne (face au Vivero de Empresas de Torrijos, Réf. 22).';
    } else {
      fallbackReply =
        'Bonjour ! Je suis l\'assistant technique de PROJECT 3D à Torrijos (Tolède). Nous sommes spécialisés dans le prototypage industriel et la fabrication additive 3D. Comment puis-je vous aider pour vos pièces techniques ?';
    }
  } else if (isGerman) {
    if (lowerMsg.includes('material') || lowerMsg.includes('kunststoff')) {
      fallbackReply =
        'Bei PROJECT 3D fertigen wir mit technischem PLA, PETG, ABS/ASA, flexiblem TPU 95A, PA12 Polyamid, hochauflösendem SLA-Harz und carbonfaserverstärktem PA-CF. Probieren Sie unseren 3D-Kalkulator direkt auf dieser Seite aus!';
    } else if (lowerMsg.includes('wo') || lowerMsg.includes('adresse') || lowerMsg.includes('standort')) {
      fallbackReply =
        'PROJECT 3D hat seinen vorgeschlagenen Standort in der Av. de los Trabajadores, 21, Polígono Industrial Atalaya, 45500 Torrijos, Toledo, Spanien (gegenüber dem Vivero de Empresas de Torrijos, Ref. 22).';
    } else {
      fallbackReply =
        'Guten Tag! Ich bin der technische Assistent von PROJECT 3D in Torrijos (Toledo). Wir sind Ihr Partner für industrielles 3D-Prototyping und Kleinserienfertigung. Wie kann ich Ihnen bei Ihren Bauteilen helfen?';
    }
  } else {
    // Default Spanish
    if (lowerMsg.includes('material') || lowerMsg.includes('plastico') || lowerMsg.includes('resina') || lowerMsg.includes('filamento')) {
      fallbackReply =
        'En PROJECT 3D trabajamos con materiales industriales de ingeniería: PLA Industrial (prototipos rápidos), PETG Técnico (resistencia química y mecánica), ABS/ASA (exterior y temperatura), TPU 95A (elastómero flexible), PA12 Nylon (alta tenacidad y resistencia a fatiga), Resinas SLA de alta definición y PA-CF con Fibra de Carbono. Puedes seleccionarlos y comparar costes en nuestro configurador STL.';
    } else if (lowerMsg.includes('donde') || lowerMsg.includes('dónde') || lowerMsg.includes('direccion') || lowerMsg.includes('ubicacion')) {
      fallbackReply =
        'La ubicación propuesta para el proyecto de PROJECT 3D se encuentra en Av. de los Trabajadores, 21, Polígono Industrial Atalaya, 45500 Torrijos, Toledo, España (frente al Vivero de Empresas de Torrijos, Ref. 22). Atendemos proyectos para toda España e internacionalmente.';
    } else if (lowerMsg.includes('precio') || lowerMsg.includes('coste') || lowerMsg.includes('presupuesto') || lowerMsg.includes('stl')) {
      fallbackReply =
        'Puedes subir tu archivo .STL en nuestra sección "Solicitar Presupuesto". Nuestro analizador 3D calculará al instante las dimensiones milimétricas, volumen en cm³, peso estimado y desglose orientativo. Nuestro equipo de ingeniería lo revisará para emitir el presupuesto definitivo.';
    } else if (lowerMsg.includes('plazo') || lowerMsg.includes('tiempo') || lowerMsg.includes('entrega')) {
      fallbackReply =
        'Disponemos de servicio estándar (3 a 5 días laborables) y servicio express de prototipado urgente (24 a 48 horas) para proyectos con alta prioridad temporal.';
    } else {
      fallbackReply =
        '¡Hola! Soy el asistente técnico de PROJECT 3D en Torrijos (Toledo). Te puedo asesorar sobre selección de materiales (PLA, PETG, ABS, Nylon, Resina, Fibra de Carbono), preparación y subida de archivos STL, tolerancias dimensionales, plazos y solicitud de presupuestos. ¿En qué puedo ayudarte?';
    }
  }

  res.json({ success: true, reply: fallbackReply });
});

// Setup Vite middleware in development or serve static in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PROJECT 3D server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
