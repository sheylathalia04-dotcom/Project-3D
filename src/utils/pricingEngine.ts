export interface MaterialOption {
  id: string;
  name: string;
  category: 'FDM' | 'SLA' | 'SLS' | 'Compuesto';
  pricePerCm3: number;
  densityGcm3: number;
  tempResistanceC: number;
  description: string;
  tensileStrengthMpa: number;
  colors: string[];
}

export const AVAILABLE_MATERIALS: Record<string, MaterialOption> = {
  pla: {
    id: 'pla',
    name: 'PLA Técnico',
    category: 'FDM',
    pricePerCm3: 0.08,
    densityGcm3: 1.24,
    tempResistanceC: 55,
    tensileStrengthMpa: 48,
    description: 'Excelente acabado superficial y alta precisión dimensional. Ideal para prototipos conceptuales rápidos y piezas de prueba.',
    colors: ['Negro Industrial', 'Blanco Puro', 'Gris Titán', 'Rojo Alerta', 'Azul Técnico'],
  },
  abs: {
    id: 'abs',
    name: 'ABS',
    category: 'FDM',
    pricePerCm3: 0.13,
    densityGcm3: 1.05,
    tempResistanceC: 95,
    tensileStrengthMpa: 45,
    description: 'Alta resistencia al impacto y estabilidad térmica. Óptimo para carcasas, piezas de automoción y componentes mecánicos sometidos a calor.',
    colors: ['Negro Mate', 'Gris Ceniza', 'Blanco Marfil'],
  },
  petg: {
    id: 'petg',
    name: 'PETG',
    category: 'FDM',
    pricePerCm3: 0.11,
    densityGcm3: 1.27,
    tempResistanceC: 75,
    tensileStrengthMpa: 52,
    description: 'Elevada tenacidad, impermeabilidad y resistencia química a aceites y alcoholes. Gran durabilidad para ensambles.',
    colors: ['Negro Industrial', 'Gris Carbón', 'Translúcido Natural', 'Blanco'],
  },
  sla_standard: {
    id: 'sla_standard',
    name: 'Resina SLA',
    category: 'SLA',
    pricePerCm3: 0.28,
    densityGcm3: 1.18,
    tempResistanceC: 65,
    tensileStrengthMpa: 58,
    description: 'Resolución micrométrica sin marcas de capa visibles. Ideal para moldes maestros, micro-mecanismos y verificación estética.',
    colors: ['Gris Precisión', 'Negro Satinado', 'Transparente Óptico'],
  },
  nylon_sls: {
    id: 'nylon_sls',
    name: 'Nylon SLS',
    category: 'SLS',
    pricePerCm3: 0.32,
    densityGcm3: 1.02,
    tempResistanceC: 160,
    tensileStrengthMpa: 50,
    description: 'Sinterizado selectivo por láser sin necesidad de soportes. Piezas isotrópicas de alta tenacidad mecánica para uso industrial directo.',
    colors: ['Blanco SLS', 'Negro Teñido'],
  },
};

export interface ResolutionOption {
  id: string;
  name: string;
  layerHeightMm: number;
  speedFactor: number;
  description: string;
}

export const AVAILABLE_RESOLUTIONS: Record<string, ResolutionOption> = {
  alta: {
    id: 'alta',
    name: 'Alta Calidad (0.12 mm)',
    layerHeightMm: 0.12,
    speedFactor: 1.6,
    description: 'Máxima definición en curvas, roscas y filetes pequeños.',
  },
  estandar: {
    id: 'estandar',
    name: 'Estándar (0.20 mm)',
    layerHeightMm: 0.20,
    speedFactor: 1.0,
    description: 'Equilibrio óptimo entre velocidad, resistencia y acabado.',
  },
  borrador: {
    id: 'borrador',
    name: 'Borrador (0.28 mm)',
    layerHeightMm: 0.28,
    speedFactor: 0.7,
    description: 'Producción rápida para validación volumétrica preliminar.',
  },
};

export interface FinishOption {
  id: string;
  name: string;
  pricePerUnit: number;
  description: string;
}

export const AVAILABLE_FINISHES: Record<string, FinishOption> = {
  raw: {
    id: 'raw',
    name: 'Sin postprocesado (Despaletizado estándar)',
    pricePerUnit: 0.0,
    description: 'Retirada limpia de soportes manual. Superficie en estado natural tal como sale de máquina.',
  },
  sanded: {
    id: 'sanded',
    name: 'Lijado técnico y desbarbado manual',
    pricePerUnit: 6.5,
    description: 'Eliminación meticulosa de cualquier resto de unión de soportes y suavizado de bordes.',
  },
  chemical_smoothing: {
    id: 'chemical_smoothing',
    name: 'Suavizado por vaporización química',
    pricePerUnit: 14.0,
    description: 'Cámara de vaporización para sellado hidrófugo y acabado liso brillante (especial ABS/ASA).',
  },
  primed_painted: {
    id: 'primed_painted',
    name: 'Imprimación técnica y acabado pintado',
    pricePerUnit: 22.0,
    description: 'Aplicación de aparejo tapaporos bicomponente y acabado en cabina de pintura monocromo.',
  },
  threaded_inserts: {
    id: 'threaded_inserts',
    name: 'Inserción de casquillos roscados en latón (M3/M4/M5)',
    pricePerUnit: 8.5,
    description: 'Instalación térmica de insertos helicoidales para uniones mecánicas de alta resistencia desmontables.',
  },
};

export interface QuoteCalculationInput {
  volumeCm3: number;
  surfaceAreaCm2: number;
  dimensionsMm: { x: number; y: number; z: number };
  materialId: string;
  resolutionId: string;
  infillPercent: number;
  finishId: string;
  quantity: number;
  productionPriority?: 'standard' | 'express';
  customConfig?: {
    machineHourlyRate?: number;
    baseSetupFee?: number;
  };
}

export interface QuoteCalculationResult {
  effectiveVolumeCm3: number;
  estimatedWeightGrams: number;
  estimatedPrintHours: number;
  materialCost: number;
  machineCost: number;
  setupCost: number;
  finishCost: number;
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  totalEstimated: number;
  unitPrice: number;
  estimatedDays: string;
}

export function calculateQuote(input: QuoteCalculationInput): QuoteCalculationResult {
  const {
    volumeCm3,
    materialId,
    resolutionId,
    infillPercent,
    finishId,
    quantity,
    productionPriority = 'standard',
    customConfig,
  } = input;

  const material = AVAILABLE_MATERIALS[materialId] || AVAILABLE_MATERIALS.pla;
  const resolution = AVAILABLE_RESOLUTIONS[resolutionId] || AVAILABLE_RESOLUTIONS.estandar;
  const finish = AVAILABLE_FINISHES[finishId] || AVAILABLE_FINISHES.raw;

  const machineHourlyRate = customConfig?.machineHourlyRate ?? 14.5;
  const baseSetupFee = customConfig?.baseSetupFee ?? 6.0;

  // External shell fraction (~22%) + infill volume
  const infillRatio = Math.max(0.1, Math.min(1.0, infillPercent / 100));
  const effectiveVolumeFactor = 0.22 + 0.78 * infillRatio;
  const effectiveVolumeCm3 = parseFloat((volumeCm3 * effectiveVolumeFactor).toFixed(2));

  // Weight per part in grams
  const singleWeightGrams = parseFloat((effectiveVolumeCm3 * material.densityGcm3).toFixed(1));
  const estimatedWeightGrams = singleWeightGrams * quantity;

  // Print time in hours per piece
  const baseHoursPerUnit = 0.35 + (volumeCm3 * 0.042 * resolution.speedFactor) * (0.6 + 0.4 * infillRatio);
  const estimatedPrintHours = parseFloat((baseHoursPerUnit * quantity).toFixed(1));

  // Costs
  const materialCost = parseFloat((effectiveVolumeCm3 * material.pricePerCm3 * quantity).toFixed(2));
  const machineCost = parseFloat((baseHoursPerUnit * quantity * machineHourlyRate).toFixed(2));
  const setupCost = parseFloat((baseSetupFee * (1 + 0.12 * Math.pow(quantity - 1, 0.65))).toFixed(2));
  const finishCost = parseFloat((finish.pricePerUnit * quantity).toFixed(2));

  const subtotal = parseFloat((materialCost + machineCost + setupCost + finishCost).toFixed(2));

  // Volume series discount tiers
  let discountPercent = 0;
  if (quantity >= 50) discountPercent = 22;
  else if (quantity >= 25) discountPercent = 16;
  else if (quantity >= 10) discountPercent = 10;
  else if (quantity >= 5) discountPercent = 5;

  const discountAmount = parseFloat((subtotal * (discountPercent / 100)).toFixed(2));
  let totalBeforePriority = subtotal - discountAmount;

  if (productionPriority === 'express') {
    totalBeforePriority *= 1.25;
  }

  const totalEstimated = parseFloat(Math.max(12.0, totalBeforePriority).toFixed(2));
  const unitPrice = parseFloat((totalEstimated / quantity).toFixed(2));

  const estimatedDays =
    productionPriority === 'express'
      ? '24 - 48 horas (Express)'
      : quantity > 20
      ? '5 - 7 días laborables'
      : '3 - 5 días laborables';

  return {
    effectiveVolumeCm3,
    estimatedWeightGrams,
    estimatedPrintHours,
    materialCost,
    machineCost,
    setupCost,
    finishCost,
    subtotal,
    discountPercent,
    discountAmount,
    totalEstimated,
    unitPrice,
    estimatedDays,
  };
}
