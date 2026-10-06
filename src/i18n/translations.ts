export type Language = 'es' | 'en' | 'fr' | 'de';

export interface Translations {
  nav: {
    home: string;
    about: string;
    services: string;
    gallery: string;
    howItWorks: string;
    quoteTool: string;
    faq: string;
    contact: string;
    admin: string;
    uploadStl: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    statPrecision: string;
    statPrecisionLabel: string;
    statMaterials: string;
    statMaterialsLabel: string;
    statDelivery: string;
    statDeliveryLabel: string;
  };
  about: {
    kicker: string;
    title: string;
    p1: string;
    p2: string;
    p3: string;
    whatIsTitle: string;
    whatIsDesc: string;
    whoWeHelpTitle: string;
    whoWeHelpDesc: string;
    valuePropTitle: string;
    valuePropDesc: string;
  };
  services: {
    kicker: string;
    title: string;
    subtitle: string;
    s1Title: string;
    s1Desc: string;
    s2Title: string;
    s2Desc: string;
    s3Title: string;
    s3Desc: string;
    s4Title: string;
    s4Desc: string;
    s5Title: string;
    s5Desc: string;
    s6Title: string;
    s6Desc: string;
  };
  gallery: {
    kicker: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterPrototypes: string;
    filterMechanics: string;
    filterEnclosures: string;
    filterTooling: string;
  };
  howItWorks: {
    kicker: string;
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    step5Title: string;
    step5Desc: string;
    step6Title: string;
    step6Desc: string;
  };
  quoteTool: {
    kicker: string;
    title: string;
    subtitle: string;
    dropzoneTitle: string;
    dropzoneSubtitle: string;
    dropzoneFormats: string;
    orSampleTitle: string;
    btnSampleGear: string;
    btnSampleBracket: string;
    btnSampleTurbine: string;
    btnSampleCube: string;
    metricsTitle: string;
    dimX: string;
    dimY: string;
    dimZ: string;
    volume: string;
    surfaceArea: string;
    triangles: string;
    estimatedWeight: string;
    configTitle: string;
    materialLabel: string;
    colorLabel: string;
    quantityLabel: string;
    resolutionLabel: string;
    infillLabel: string;
    finishLabel: string;
    priorityLabel: string;
    priorityStandard: string;
    priorityExpress: string;
    summaryTitle: string;
    materialCost: string;
    machineCost: string;
    setupCost: string;
    finishCost: string;
    subtotal: string;
    volumeDiscount: string;
    totalEstimated: string;
    taxNotice: string;
    disclaimerNotice: string;
    btnSubmitQuote: string;
    viewerReset: string;
    viewerWireframe: string;
    viewerSolid: string;
    viewIsometric: string;
    viewTop: string;
    viewFront: string;
  };
  quoteModal: {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    cityLabel: string;
    cityPlaceholder: string;
    commentsLabel: string;
    commentsPlaceholder: string;
    ndaCheckbox: string;
    rgpdCheckbox: string;
    btnConfirm: string;
    btnCancel: string;
    successTitle: string;
    successMessage: string;
    refLabel: string;
    btnClose: string;
  };
  faq: {
    kicker: string;
    title: string;
    subtitle: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
    q4: string;
    a4: string;
    q5: string;
    a5: string;
    q6: string;
    a6: string;
  };
  contact: {
    kicker: string;
    title: string;
    subtitle: string;
    locationTitle: string;
    proposedLocationNote: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    refVivero: string;
    emailLabel: string;
    phoneLabel: string;
    hoursLabel: string;
    hoursValue: string;
    formTitle: string;
    formName: string;
    formEmail: string;
    formSubject: string;
    formMessage: string;
    btnSend: string;
    sendSuccess: string;
  };
  footer: {
    rights: string;
    legalNote: string;
    confidentiality: string;
    terms: string;
    privacy: string;
  };
  chatbot: {
    title: string;
    subtitle: string;
    placeholder: string;
    send: string;
    quick1: string;
    quick2: string;
    quick3: string;
    quick4: string;
    humanSupport: string;
  };
  admin: {
    navTitle: string;
    exitAdmin: string;
    loginTitle: string;
    loginSubtitle: string;
    passcodePlaceholder: string;
    btnLogin: string;
    demoHint: string;
    kpiTotal: string;
    kpiInReview: string;
    kpiInProduction: string;
    kpiCompleted: string;
    kpiVolume: string;
    tabQuotes: string;
    tabPricing: string;
    tabMaterials: string;
    searchPlaceholder: string;
    filterAllStatus: string;
    colRef: string;
    colDate: string;
    colCustomer: string;
    colFile: string;
    colMaterial: string;
    colQty: string;
    colTotal: string;
    colStatus: string;
    colActions: string;
    btnViewDetails: string;
    modalTitle: string;
    clientInfo: string;
    specsInfo: string;
    pricingBreakdown: string;
    pipelineStatus: string;
    saveChanges: string;
    inspect3d: string;
    pricingTitle: string;
    pricingDesc: string;
    machineRate: string;
    setupFee: string;
    saveConfig: string;
    configSavedSuccess: string;
  };
}

export const translations: Record<Language, Translations> = {
  es: {
    nav: {
      home: 'Inicio',
      about: 'Sobre Nosotros',
      services: 'Servicios',
      gallery: 'Proyectos',
      howItWorks: 'Cómo Funciona',
      quoteTool: 'Presupuestar STL',
      faq: 'Preguntas Frecuentes',
      contact: 'Contacto',
      admin: 'Panel Gestión',
      uploadStl: 'Subir STL',
    },
    hero: {
      badge: 'Fabricación Aditiva & Prototipado Industrial de Alta Precisión',
      titleLine1: 'TRANSFORMAMOS MODELOS 3D',
      titleLine2: 'EN PIEZAS INDUSTRIALES DE PRECISIÓN',
      description:
        'En PROJECT 3D combinamos tecnología aditiva industrial, polímeros técnicos y metrología dimensional para acelerar el desarrollo de prototipos funcionales y series cortas desde Torrijos (Toledo).',
      ctaPrimary: 'Presupuestar Archivo STL',
      ctaSecondary: 'Explorar Servicios Técnicos',
      statPrecision: '±0.08 mm',
      statPrecisionLabel: 'Tolerancia dimensional estándar',
      statMaterials: '7+ Materiales',
      statMaterialsLabel: 'Polímeros técnicos y compuestos',
      statDelivery: '24h - 48h',
      statDeliveryLabel: 'Plazo en servicio express',
    },
    about: {
      kicker: '01. FILOSOFÍA DE INGENIERÍA',
      title: 'Ingeniería Mecánica y Producción Ágil',
      p1: 'PROJECT 3D nace con la misión de eliminar las barreras entre el diseño CAD y la pieza física final. Nos enfocamos en ofrecer a la industria una vía directa, flexible y altamente rigurosa para materializar componentes técnicos sin incurrir en los elevados costes y plazos de matricería o moldes tradicionales.',
      p2: 'Entendemos el prototipado industrial no solo como una réplica visual, sino como un elemento de validación crítica: ensayos de esfuerzo, comprobaciones de ajuste cinemático, compatibilidad química y resistencia térmica en condiciones de trabajo reales.',
      p3: 'Nuestras instalaciones y propuesta de proyecto se sitúan estratégicamente en el Polígono Industrial Atalaya de Torrijos (Toledo), conectando ágilmente con el corredor industrial de Castilla-La Mancha y la zona centro peninsular.',
      whatIsTitle: '¿Qué es el Prototipado Industrial?',
      whatIsDesc:
        'Es la fabricación preliminar de un componente con propiedades mecánicas análogas al producto final para someterlo a pruebas de montaje, ergonomía, resistencia y flujo de fluidos antes de lanzar la producción masiva.',
      whoWeHelpTitle: '¿A quién ayudamos?',
      whoWeHelpDesc:
        'Equipos de I+D+i, departamentos de ingeniería mecánica, plantas industriales con necesidad de repuestos obsoletos, talleres de automatización, empresas de robótica y desarrolladores de dispositivos electrónicos.',
      valuePropTitle: 'Nuestra Propuesta de Valor',
      valuePropDesc:
        'Auditoría previa de imprimibilidad STL, trazabilidad de lote, selección de termoplásticos de alto rendimiento y asesoramiento técnico directo con ingenieros especialistas en fabricación aditiva.',
    },
    services: {
      kicker: '02. CAPACIDADES DE PRODUCCIÓN',
      title: 'Servicios Industriales Especializados',
      subtitle:
        'Soluciones a medida para cada fase del ciclo de vida del producto industrial, desde la primera iteración conceptual hasta series cortas de producción final.',
      s1Title: 'Prototipado Funcional',
      s1Desc:
        'Validación cinemática y de esfuerzos con materiales de alta tenacidad (PETG, ABS, PA12) para certificar tolerancias antes del paso a mecanizado o inyección.',
      s2Title: 'Impresión 3D Industrial FDM / SLA',
      s2Desc:
        'Fabricación aditiva continua con cámaras climatizadas y control térmico estricto para evitar deformaciones por alabeo (warping) en piezas de gran volumen.',
      s3Title: 'Piezas Personalizadas y Repuestos',
      s3Desc:
        'Digitalización y reproducción de componentes descatalogados, engranajes técnicos, carcasas específicas y adaptadores para maquinaria industrial.',
      s4Title: 'Series Cortas de Producción',
      s4Desc:
        'Fabricación de 10 a 500 unidades bajo demanda sin costes de moldes. Optimización del coste unitario mediante aprovechamiento óptimo del volumen de cámara.',
      s5Title: 'Utillajes, Galgas y Jigs de Montaje',
      s5Desc:
        'Diseño y fabricación de herramientas auxiliares de línea, mordazas blandas para mecanizado CNC, guías de taladro y plantillas de control de calidad.',
      s6Title: 'Asesoramiento Técnico en DfAM',
      s6Desc:
        'Diseño para Fabricación Aditiva (Design for Additive Manufacturing): optimización topológica, orientación de capas y reducción de estructuras de soporte.',
    },
    gallery: {
      kicker: '03. GALERÍA TÉCNICA',
      title: 'Piezas y Proyectos Realizados',
      subtitle:
        'Muestra de geometrías, acabados y aplicaciones fabricadas bajo rigurosos estándares de inspección dimensional.',
      filterAll: 'Todas las piezas',
      filterPrototypes: 'Prototipos',
      filterMechanics: 'Mecánica',
      filterEnclosures: 'Carcasas',
      filterTooling: 'Utillajes',
    },
    howItWorks: {
      kicker: '04. FLUJO DE TRABAJO',
      title: 'De tu Modelo Digital a la Pieza Terminada',
      subtitle: 'Un proceso transparente, trazable y orientado a la agilidad de los proyectos de ingeniería.',
      step1Title: '1. Carga de Archivo STL',
      step1Desc: 'Sube tu modelo 3D en formato .STL a nuestro configurador web seguro. Admite geometría binaria y ASCII.',
      step2Title: '2. Análisis Geométrico Automático',
      step2Desc: 'Nuestro motor extrae al milímetro las dimensiones X, Y, Z, volumen cúbico, superficie total y número de polígonos.',
      step3Title: '3. Selección de Parámetros',
      step3Desc: 'Elige el polímero (PLA, PETG, ABS, Nylon, Resina, Fibra de Carbono), resolución de capa, % de relleno y acabados.',
      step4Title: '4. Estimación y Envío',
      step4Desc: 'Obtienes un desglose de costes en tiempo real y remites la solicitud a nuestro panel de ingeniería con un solo clic.',
      step5Title: '5. Revisión y Fabricación',
      step5Desc: 'Nuestros ingenieros validan la viabilidad del STL, orientan las capas óptimas e inician la producción en máquinas calibradas.',
      step6Title: '6. Control de Calidad y Entrega',
      step6Desc: 'Inspección metrológica dimensional con calibre digital, embalaje protector técnico y entrega en tus instalaciones.',
    },
    quoteTool: {
      kicker: '05. COTIZADOR INTERACTIVO 3D',
      title: 'Analizador de Archivos .STL y Presupuesto',
      subtitle:
        'Inspecciona tu modelo en 3D en el navegador, evalúa su volumen exacto y configura los parámetros de fabricación aditiva.',
      dropzoneTitle: 'Arrastra y suelta tu archivo .STL aquí',
      dropzoneSubtitle: 'o haz clic para seleccionar desde tu equipo',
      dropzoneFormats: 'Formato .STL (binario o ASCII) · Tamaño máximo recomendado 50MB',
      orSampleTitle: 'O inspecciona uno de nuestros modelos de muestra:',
      btnSampleGear: 'Engranaje Helicoidal',
      btnSampleBracket: 'Soporte en L',
      btnSampleTurbine: 'Turbina Impulsora',
      btnSampleCube: 'Cubo Calibración',
      metricsTitle: 'Métricas Geométricas Extraídas',
      dimX: 'Eje X (Ancho):',
      dimY: 'Eje Y (Largo):',
      dimZ: 'Eje Z (Alto):',
      volume: 'Volumen Sólido:',
      surfaceArea: 'Superficie Estimada:',
      triangles: 'Malla Poligonal:',
      estimatedWeight: 'Masa Teórica:',
      configTitle: 'Configuración de Fabricación',
      materialLabel: 'Material / Polímero:',
      colorLabel: 'Color de acabado:',
      quantityLabel: 'Cantidad de piezas:',
      resolutionLabel: 'Resolución de Capa (Z):',
      infillLabel: 'Porcentaje de Relleno Interno (%):',
      finishLabel: 'Post-procesado / Acabado Superficial:',
      priorityLabel: 'Plazo de Fabricación:',
      priorityStandard: 'Estándar (3 - 5 días laborables)',
      priorityExpress: 'Express 24-48h (Prioridad en cola)',
      summaryTitle: 'Desglose de Coste Orientativo',
      materialCost: 'Coste de material neto:',
      machineCost: 'Tiempo y amortización de máquina:',
      setupCost: 'Preparación de cama y calibración:',
      finishCost: 'Post-procesado y acabado:',
      subtotal: 'Subtotal estimado:',
      volumeDiscount: 'Descuento por serie / volumen:',
      totalEstimated: 'PRESUPUESTO ORIENTATIVO:',
      taxNotice: '* Precios orientativos sin IVA (21%). El coste definitivo se confirma tras la revisión técnica del archivo.',
      disclaimerNotice:
        'Aviso: La estimación mostrada se calcula automáticamente sobre la geometría y parámetros seleccionados. PROJECT 3D revisará la imprimibilidad real (soportes, orientaciones de capa y tolerancias críticas) antes de emitir la oferta vinculante.',
      btnSubmitQuote: 'Solicitar Presupuesto Formal con este STL',
      viewerReset: 'Centrar Vista',
      viewerWireframe: 'Alámbrico',
      viewerSolid: 'Sólido',
      viewIsometric: 'Isométrica',
      viewTop: 'Superior',
      viewFront: 'Frontal',
    },
    quoteModal: {
      title: 'Formalizar Solicitud de Presupuesto',
      subtitle:
        'Envía tu configuración y archivo al equipo de ingeniería de PROJECT 3D para recibir la oferta técnica definitiva.',
      nameLabel: 'Nombre completo *',
      namePlaceholder: 'Ej. Juan Fernández',
      companyLabel: 'Empresa u Organización',
      companyPlaceholder: 'Ej. Mecanizados Industriales S.L.',
      emailLabel: 'Correo Electrónico *',
      emailPlaceholder: 'juan.fernandez@empresa.com',
      phoneLabel: 'Teléfono de Contacto *',
      phonePlaceholder: '+34 600 000 000',
      cityLabel: 'Ciudad / Provincia de Entrega',
      cityPlaceholder: 'Ej. Toledo / Madrid',
      commentsLabel: 'Notas o Requisitos Especiales (tolerancias, insertos, esfuerzos)',
      commentsPlaceholder: 'Detalla si requiere tolerancias específicas, roscas o condiciones de trabajo...',
      ndaCheckbox: 'Requiero acuerdo de confidencialidad (NDA) para proteger este modelo propietario.',
      rgpdCheckbox: 'Acepto la política de privacidad y el tratamiento de datos para la gestión técnica de este presupuesto.',
      btnConfirm: 'Enviar Solicitud a Ingeniería',
      btnCancel: 'Cancelar',
      successTitle: '¡Solicitud Registrada con Éxito!',
      successMessage:
        'Hemos recibido los parámetros geométricos de tu modelo STL en nuestro panel de gestión. Un ingeniero de PROJECT 3D revisará el archivo y te enviará la oferta definitiva.',
      refLabel: 'Referencia del Expediente:',
      btnClose: 'Entendido y Cerrar',
    },
    faq: {
      kicker: '06. DUDAS FRECUENTES',
      title: 'Preguntas Técnicas Habituales',
      subtitle: 'Resolvemos las consultas más comunes de ingenieros y responsables de compras.',
      q1: '¿Qué formato de archivo debo exportar desde mi software CAD?',
      a1: 'El formato principal recomendado es .STL (Standard Triangle Language) en binario con resolución fina. También admitimos archivos .STEP o .STP si necesitas que adaptemos o reparemos la geometría en nuestro taller CAD.',
      q2: '¿Qué tolerancias dimensionales podéis garantizar en las piezas?',
      a2: 'En tecnología FDM industrial alcanzamos tolerancias estándar de ±0.15 mm a ±0.2 mm. En tecnologías SLA de alta definición y resinas técnicas se alcanzan precisiones de hasta ±0.05 mm para ajustes de ajuste fino y alojamientos.',
      q3: '¿Cómo elijo entre PLA, PETG, ABS, Nylon y Fibra de Carbono?',
      a3: 'El PLA es óptimo para validaciones de forma ergonómica rápidas. El PETG aporta gran resistencia química e hidrófuga. El ABS/ASA es ideal para automoción y radiación solar. El PA12 Nylon resiste impactos repetitivos y fatiga mecánica. El compuesto PA-CF con fibra de carbono aporta rigidez estructural extrema sin añadir peso.',
      q4: '¿Tratáis mis archivos con confidencialidad y secreto industrial?',
      a4: 'Absolutamente. Todos los archivos subidos están protegidos y sujetos a estricta confidencialidad. Disponemos de plantillas de Acuerdo de No Divulgación (NDA) bilaterales antes de iniciar la revisión de piezas propietarias.',
      q5: '¿Cuál es el plazo de entrega habitual de las piezas?',
      a5: 'El servicio estándar tiene un plazo de 3 a 5 días laborables. Disponemos de servicio express con entrega en 24-48 horas para prototipos urgentes y líneas de montaje con paradas imprevistas.',
      q6: '¿Hacéis envíos fuera de la comarca de Torrijos y Toledo?',
      a6: 'Sí, realizamos envíos técnicos protegidos mediante transporte urgente a toda la península, islas y clientes industriales de la Unión Europea.',
    },
    contact: {
      kicker: '07. LOCALIZACIÓN & CONTACTO',
      title: 'Ponte en Contacto con PROJECT 3D',
      subtitle: 'Visítanos en nuestras instalaciones propuestas o remítenos tu consulta técnica.',
      locationTitle: 'Ubicación Propuesta para el Proyecto',
      proposedLocationNote: 'Nota: Tratada como propuesta de ubicación del proyecto situada frente al Vivero de Empresas de Torrijos (Ref. 22).',
      addressLine1: 'PROJECT 3D',
      addressLine2: 'Av. de los Trabajadores, 21 · Polígono Industrial Atalaya',
      addressLine3: '45500 Torrijos, Toledo, España',
      refVivero: 'Ubicación frente al Vivero de Empresas de Torrijos (Ref. 22)',
      emailLabel: 'Correo de Oficina Técnica:',
      phoneLabel: 'Atención al Cliente e Ingeniería:',
      hoursLabel: 'Horario de Taller y Oficina:',
      hoursValue: 'Lunes a Viernes: 08:00 - 18:30 (Ininterrumpido)',
      formTitle: 'Envíanos un Mensaje',
      formName: 'Tu nombre o empresa',
      formEmail: 'Correo electrónico de contacto',
      formSubject: 'Asunto de la consulta',
      formMessage: 'Cuéntanos sobre tu proyecto o necesidad...',
      btnSend: 'Enviar Mensaje',
      sendSuccess: 'Mensaje transmitido correctamente. Nuestro equipo técnico responderá en menos de 4 horas hábiles.',
    },
    footer: {
      rights: 'Todos los derechos reservados. Especialistas en Prototipado y Fabricación Aditiva.',
      legalNote: 'Dirección tratada como propuesta de ubicación del proyecto en Pol. Ind. Atalaya, Torrijos (Toledo).',
      confidentiality: 'Acuerdo de Confidencialidad NDA',
      terms: 'Condiciones de Fabricación',
      privacy: 'Política de Privacidad RGPD',
    },
    chatbot: {
      title: 'Asistente Técnico PROJECT 3D',
      subtitle: 'Inteligencia industrial multilingüe',
      placeholder: 'Escribe tu consulta en cualquier idioma...',
      send: 'Enviar',
      quick1: '¿Qué materiales recomendáis para piezas mecánicas?',
      quick2: '¿Dónde está ubicada la empresa en Torrijos?',
      quick3: '¿Cómo funciona la estimación del STL?',
      quick4: '¿Qué tolerancias dimensionales tenéis?',
      humanSupport: 'Solicitar contacto técnico humano',
    },
    admin: {
      navTitle: 'Panel Backoffice · PROJECT 3D',
      exitAdmin: 'Salir al Sitio Público',
      loginTitle: 'Acceso Restringido a Gestión Interna',
      loginSubtitle: 'Introduce la clave de acceso del taller técnico de PROJECT 3D.',
      passcodePlaceholder: 'Código de acceso...',
      btnLogin: 'Entrar al Panel',
      demoHint: 'Clave demo de acceso rápido: PROJECT3D-ADMIN o admin123',
      kpiTotal: 'Solicitudes Totales',
      kpiInReview: 'En Revisión Técnica',
      kpiInProduction: 'En Impresión / Taller',
      kpiCompleted: 'Finalizadas',
      kpiVolume: 'Volumen Estimado Acumulado',
      tabQuotes: 'Gestor de Solicitudes y STL',
      tabPricing: 'Configurador de Tarifas Base',
      tabMaterials: 'Inventario de Materiales',
      searchPlaceholder: 'Buscar por referencia, cliente o archivo STL...',
      filterAllStatus: 'Todos los estados',
      colRef: 'Referencia',
      colDate: 'Fecha',
      colCustomer: 'Cliente / Empresa',
      colFile: 'Archivo STL',
      colMaterial: 'Material / Acabado',
      colQty: 'Cant.',
      colTotal: 'Est. Total',
      colStatus: 'Estado de Producción',
      colActions: 'Acciones',
      btnViewDetails: 'Inspeccionar',
      modalTitle: 'Detalle de Solicitud y Visor STL',
      clientInfo: 'Datos del Solicitante',
      specsInfo: 'Especificaciones de Fabricación',
      pricingBreakdown: 'Desglose Financiero',
      pipelineStatus: 'Estado en el Pipeline de Fabricación',
      saveChanges: 'Guardar Estado y Notas',
      inspect3d: 'Visor 3D del Archivo STL',
      pricingTitle: 'Ajuste de Parámetros y Costes Base',
      pricingDesc:
        'Modifica las tarifas horarias y costes de polímeros que alimentan en tiempo real el cotizador de la web.',
      machineRate: 'Tarifa horaria de máquina (€/hora):',
      setupFee: 'Coste fijo de preparación y calibración de bandeja (€):',
      saveConfig: 'Actualizar Tarifas en Vivo',
      configSavedSuccess: '¡Tarifas actualizadas correctamente en el motor de cálculo!',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      gallery: 'Projects',
      howItWorks: 'How It Works',
      quoteTool: 'STL Quote Tool',
      faq: 'FAQ',
      contact: 'Contact',
      admin: 'Admin Panel',
      uploadStl: 'Upload STL',
    },
    hero: {
      badge: 'Additive Manufacturing & High-Precision Industrial Prototyping',
      titleLine1: 'WE TRANSFORM 3D MODELS',
      titleLine2: 'INTO PRECISION INDUSTRIAL PARTS',
      description:
        'At PROJECT 3D, we combine industrial additive technology, engineering polymers, and dimensional metrology to accelerate functional prototypes and short series from Torrijos (Toledo, Spain).',
      ctaPrimary: 'Quote .STL File',
      ctaSecondary: 'Explore Technical Capabilities',
      statPrecision: '±0.08 mm',
      statPrecisionLabel: 'Standard dimensional tolerance',
      statMaterials: '7+ Materials',
      statMaterialsLabel: 'Technical polymers & composites',
      statDelivery: '24h - 48h',
      statDeliveryLabel: 'Express lead time',
    },
    about: {
      kicker: '01. ENGINEERING PHILOSOPHY',
      title: 'Mechanical Engineering & Agile Production',
      p1: 'PROJECT 3D was created to remove the barrier between digital CAD design and the physical industrial component. We provide modern industry with a direct, flexible, and rigorous pathway to manufacture technical parts without the hefty costs and lead times of traditional injection tooling.',
      p2: 'We approach industrial prototyping not merely as aesthetic models, but as critical validation assets: stress tests, kinematic fit, chemical compatibility, and thermal resistance under actual working conditions.',
      p3: 'Our proposed facility location is situated in the Atalaya Industrial Park in Torrijos (Toledo, Spain), conveniently located along key industrial transport corridors.',
      whatIsTitle: 'What is Industrial Prototyping?',
      whatIsDesc:
        'It is the pre-production fabrication of a component with mechanical properties similar to the final piece to validate assembly, ergonomics, strength, and fluid flow prior to high-volume manufacturing.',
      whoWeHelpTitle: 'Who do we help?',
      whoWeHelpDesc:
        'R&D teams, mechanical engineering departments, industrial plants in need of obsolete spares, automation workshops, robotics firms, and electronic enclosure designers.',
      valuePropTitle: 'Our Value Proposition',
      valuePropDesc:
        'STL printability audit, batch traceability, high-performance thermoplastics, and direct consultation with experienced additive manufacturing engineers.',
    },
    services: {
      kicker: '02. PRODUCTION CAPABILITIES',
      title: 'Specialized Industrial Services',
      subtitle:
        'Tailored solutions for every stage of your industrial product lifecycle, from initial conceptual iterations to end-use short series.',
      s1Title: 'Functional Prototyping',
      s1Desc:
        'Kinematic and stress testing with tough polymers (PETG, ABS, PA12) to verify tolerances before investing in mass tooling.',
      s2Title: 'Industrial 3D Printing (FDM / SLA)',
      s2Desc:
        'High-duty additive manufacturing with climate-controlled heated chambers to eliminate warping in large technical parts.',
      s3Title: 'Custom Parts & Spare Components',
      s3Desc:
        'Reverse engineering and manufacturing of discontinued machinery parts, gears, brackets, and custom machine fittings.',
      s4Title: 'Short-Series Production',
      s4Desc:
        'On-demand production of 10 to 500 units without tooling costs. Optimized unit economics via high-efficiency print nesting.',
      s5Title: 'Jigs, Fixtures & Assembly Tooling',
      s5Desc:
        'Design and fabrication of shopfloor tooling, soft jaws for CNC machining, drill guides, and quality inspection gauges.',
      s6Title: 'Technical Consulting & DfAM',
      s6Desc:
        'Design for Additive Manufacturing: topological optimization, layer orientation analysis, and support material minimization.',
    },
    gallery: {
      kicker: '03. TECHNICAL SHOWCASE',
      title: 'Engineered Parts & Past Projects',
      subtitle: 'Real mechanical geometries manufactured under strict dimensional verification standards.',
      filterAll: 'All Parts',
      filterPrototypes: 'Prototypes',
      filterMechanics: 'Mechanical',
      filterEnclosures: 'Enclosures',
      filterTooling: 'Tooling',
    },
    howItWorks: {
      kicker: '04. WORKFLOW PIPELINE',
      title: 'From Digital Model to Delivered Part',
      subtitle: 'A transparent, traceable, and rapid engineering workflow.',
      step1Title: '1. Upload STL File',
      step1Desc: 'Upload your .STL model to our secure web estimator. Binary and ASCII formats supported.',
      step2Title: '2. Automated Geometry Analysis',
      step2Desc: 'Our engine extracts bounding box dimensions (X, Y, Z), cubic volume, surface area, and polygon count.',
      step3Title: '3. Parameter Configuration',
      step3Desc: 'Choose your polymer (PLA, PETG, ABS, Nylon, Resin, Carbon Fiber), layer height, infill %, and post-finishing.',
      step4Title: '4. Instant Estimate & Submission',
      step4Desc: 'Review the transparent itemized cost breakdown and submit your request to our engineering team with one click.',
      step5Title: '5. Engineering Review & Printing',
      step5Desc: 'Our engineers verify mesh printability, orient build layers, and launch production on calibrated machines.',
      step6Title: '6. Quality Inspection & Delivery',
      step6Desc: 'Digital caliper metrology inspection, protective packaging, and rapid dispatch to your premises.',
    },
    quoteTool: {
      kicker: '05. INTERACTIVE 3D QUOTING TOOL',
      title: '.STL File Analyzer & Instant Estimator',
      subtitle:
        'Inspect your model in real-time 3D, verify its exact dimensions and volume, and configure additive manufacturing options.',
      dropzoneTitle: 'Drag and drop your .STL file here',
      dropzoneSubtitle: 'or click to browse from your device',
      dropzoneFormats: '.STL format (binary or ASCII) · Max recommended file size 50MB',
      orSampleTitle: 'Or inspect one of our preloaded demo models:',
      btnSampleGear: 'Helical Gear',
      btnSampleBracket: 'L-Bracket',
      btnSampleTurbine: 'Impeller Turbine',
      btnSampleCube: 'Calibration Cube',
      metricsTitle: 'Extracted Geometric Metrics',
      dimX: 'X Axis (Width):',
      dimY: 'Y Axis (Length):',
      dimZ: 'Z Axis (Height):',
      volume: 'Solid Volume:',
      surfaceArea: 'Estimated Area:',
      triangles: 'Triangle Count:',
      estimatedWeight: 'Theoretical Mass:',
      configTitle: 'Manufacturing Parameters',
      materialLabel: 'Material / Polymer:',
      colorLabel: 'Finish Color:',
      quantityLabel: 'Quantity of parts:',
      resolutionLabel: 'Layer Height (Z resolution):',
      infillLabel: 'Internal Infill Density (%):',
      finishLabel: 'Post-processing / Surface Finish:',
      priorityLabel: 'Turnaround Speed:',
      priorityStandard: 'Standard (3 - 5 business days)',
      priorityExpress: 'Express 24-48h (Queue priority)',
      summaryTitle: 'Itemized Cost Breakdown',
      materialCost: 'Raw material cost:',
      machineCost: 'Machine runtime & depreciation:',
      setupCost: 'Bed prep & machine setup:',
      finishCost: 'Post-processing & finishing:',
      subtotal: 'Estimated subtotal:',
      volumeDiscount: 'Volume series discount:',
      totalEstimated: 'INDICATIVE QUOTE:',
      taxNotice: '* Indicative prices excluding VAT. Final quotation is validated following technical mesh review.',
      disclaimerNotice:
        'Notice: This calculated estimate is indicative. PROJECT 3D engineers will inspect actual printability (overhangs, wall thickness, and critical tolerances) before issuing a binding formal quotation.',
      btnSubmitQuote: 'Request Formal Quotation with this STL',
      viewerReset: 'Center View',
      viewerWireframe: 'Wireframe',
      viewerSolid: 'Solid',
      viewIsometric: 'Isometric',
      viewTop: 'Top',
      viewFront: 'Front',
    },
    quoteModal: {
      title: 'Submit Formal Quotation Request',
      subtitle: 'Send your model and parameters directly to PROJECT 3D engineering for official review.',
      nameLabel: 'Full Name *',
      namePlaceholder: 'e.g. John Doe',
      companyLabel: 'Company / Organization',
      companyPlaceholder: 'e.g. Industrial Automation Corp.',
      emailLabel: 'Email Address *',
      emailPlaceholder: 'john.doe@company.com',
      phoneLabel: 'Phone Number *',
      phonePlaceholder: '+34 600 000 000',
      cityLabel: 'Delivery City / Region',
      cityPlaceholder: 'e.g. Toledo / Madrid / London',
      commentsLabel: 'Special Requirements / Tolerances / Mechanical Loads',
      commentsPlaceholder: 'Provide any specifics on critical fits, thread inserts, or environmental conditions...',
      ndaCheckbox: 'I require a Non-Disclosure Agreement (NDA) to protect this proprietary design.',
      rgpdCheckbox: 'I accept the privacy policy and data processing for this engineering quotation.',
      btnConfirm: 'Send to Engineering Team',
      btnCancel: 'Cancel',
      successTitle: 'Quote Request Registered!',
      successMessage:
        'Your STL geometry and manufacturing configuration have been received. A PROJECT 3D engineer will review the model and issue your formal quote.',
      refLabel: 'File Reference ID:',
      btnClose: 'Done & Close',
    },
    faq: {
      kicker: '06. FREQUENTLY ASKED QUESTIONS',
      title: 'Technical FAQs',
      subtitle: 'Answers to the most common inquiries from engineers and procurement teams.',
      q1: 'Which CAD export format is best for 3D printing?',
      a1: 'We primarily recommend .STL in binary format with high mesh resolution. We can also inspect .STEP or .STP files if geometric repair or design tweaks are required.',
      q2: 'What dimensional tolerances can you achieve?',
      a2: 'On industrial FDM systems, we hold standard tolerances of ±0.15 mm to ±0.2 mm. High-resolution SLA resin systems achieve up to ±0.05 mm for precision housings and snap-fit assemblies.',
      q3: 'How do I choose between PLA, PETG, ABS, Nylon, and Carbon Fiber?',
      a3: 'PLA is best for fast concept validation. PETG offers high chemical and moisture resistance. ABS/ASA is ideal for automotive and UV exposure. PA12 Nylon withstands cyclic fatigue and impact. Carbon fiber composite (PA-CF) provides maximum rigidity and thermal stability.',
      q4: 'Do you protect intellectual property and NDAs?',
      a4: 'Strictly yes. All uploaded CAD files are confidential and never shared. We gladly execute mutual Non-Disclosure Agreements (NDA) before reviewing proprietary files.',
      q5: 'What are typical manufacturing lead times?',
      a5: 'Standard lead time is 3 to 5 business days. We provide a 24-48h express turnaround option for urgent prototypes and breakdown maintenance needs.',
      q6: 'Do you deliver outside Torrijos and Toledo?',
      a6: 'Yes, we ship nationwide across Spain and internationally across Europe via tracked priority courier service.',
    },
    contact: {
      kicker: '07. LOCATION & CONTACT',
      title: 'Contact PROJECT 3D',
      subtitle: 'Get in touch with our technical team or visit our proposed facility in Torrijos.',
      locationTitle: 'Proposed Location for the Project',
      proposedLocationNote: 'Note: Treated as proposed project location situated opposite Vivero de Empresas de Torrijos (Ref. 22).',
      addressLine1: 'PROJECT 3D',
      addressLine2: 'Av. de los Trabajadores, 21 · Polígono Industrial Atalaya',
      addressLine3: '45500 Torrijos, Toledo, Spain',
      refVivero: 'Located opposite Vivero de Empresas de Torrijos (Ref. 22)',
      emailLabel: 'Technical Office Email:',
      phoneLabel: 'Engineering & Customer Inquiries:',
      hoursLabel: 'Workshop & Office Hours:',
      hoursValue: 'Monday to Friday: 08:00 - 18:30 CET',
      formTitle: 'Send Us a Message',
      formName: 'Your Name or Company',
      formEmail: 'Contact Email Address',
      formSubject: 'Subject',
      formMessage: 'Describe your project or inquiry...',
      btnSend: 'Send Message',
      sendSuccess: 'Message received successfully. Our engineering team will respond within 4 business hours.',
    },
    footer: {
      rights: 'All rights reserved. Specialists in Additive Manufacturing & Prototyping.',
      legalNote: 'Address treated as proposed project location at Pol. Ind. Atalaya, Torrijos (Toledo).',
      confidentiality: 'Confidentiality & NDA',
      terms: 'Terms of Service',
      privacy: 'GDPR Privacy Policy',
    },
    chatbot: {
      title: 'PROJECT 3D Technical Assistant',
      subtitle: 'Multilingual industrial AI',
      placeholder: 'Ask any technical question in any language...',
      send: 'Send',
      quick1: 'Which material is best for high-stress parts?',
      quick2: 'Where is the facility located?',
      quick3: 'How does the STL estimation work?',
      quick4: 'What are your dimensional tolerances?',
      humanSupport: 'Request Human Engineer Callback',
    },
    admin: {
      navTitle: 'Backoffice Management · PROJECT 3D',
      exitAdmin: 'Back to Public Website',
      loginTitle: 'Internal Workshop Access',
      loginSubtitle: 'Enter the PROJECT 3D technician access PIN.',
      passcodePlaceholder: 'Access passcode...',
      btnLogin: 'Log In',
      demoHint: 'Demo passkey: PROJECT3D-ADMIN or admin123',
      kpiTotal: 'Total Requests',
      kpiInReview: 'In Technical Review',
      kpiInProduction: 'In Production / Printing',
      kpiCompleted: 'Completed',
      kpiVolume: 'Accumulated Est. Value',
      tabQuotes: 'Quotes & STL Manager',
      tabPricing: 'Base Rates Configurator',
      tabMaterials: 'Materials Inventory',
      searchPlaceholder: 'Search by reference, client or file...',
      filterAllStatus: 'All statuses',
      colRef: 'Reference',
      colDate: 'Date',
      colCustomer: 'Customer / Company',
      colFile: 'STL File',
      colMaterial: 'Material / Finish',
      colQty: 'Qty',
      colTotal: 'Est. Total',
      colStatus: 'Production Status',
      colActions: 'Actions',
      btnViewDetails: 'Inspect',
      modalTitle: 'Request Details & 3D STL Inspector',
      clientInfo: 'Client Information',
      specsInfo: 'Manufacturing Specs',
      pricingBreakdown: 'Financial Breakdown',
      pipelineStatus: 'Pipeline Status',
      saveChanges: 'Save Status & Notes',
      inspect3d: '3D STL Mesh Preview',
      pricingTitle: 'Base Rates & Cost Parameters',
      pricingDesc: 'Update machine hourly rate and polymer pricing that drive the live customer quotation tool.',
      machineRate: 'Machine Hourly Rate (€/hour):',
      setupFee: 'Fixed Setup & Calibration Fee (€):',
      saveConfig: 'Update Live Rates',
      configSavedSuccess: 'Rates successfully updated in calculation engine!',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À Propos',
      services: 'Services',
      gallery: 'Projets',
      howItWorks: 'Fonctionnement',
      quoteTool: 'Devis STL 3D',
      faq: 'FAQ',
      contact: 'Contact',
      admin: 'Gestion Admin',
      uploadStl: 'Charger STL',
    },
    hero: {
      badge: 'Fabrication Additive & Prototypage Industriel de Précision',
      titleLine1: 'NOUS TRANSFORMONS VOS FICHIERS 3D',
      titleLine2: 'EN PIÈCES INDUSTRIELLES DE HAUTE PRÉCISION',
      description:
        'PROJECT 3D allie technologies d\'impression 3D industrielle, polymères techniques et contrôle métrologique à Torrijos (Tolède, Espagne).',
      ctaPrimary: 'Chiffrer Fichier STL',
      ctaSecondary: 'Découvrir Nos Services',
      statPrecision: '±0.08 mm',
      statPrecisionLabel: 'Tolérance dimensionnelle standard',
      statMaterials: '7+ Matériaux',
      statMaterialsLabel: 'Polymères techniques & composites',
      statDelivery: '24h - 48h',
      statDeliveryLabel: 'Délai en service express',
    },
    about: {
      kicker: '01. INGÉNIERIE & MÉCANIQUE',
      title: 'Ingénierie Mécanique & Fabrication Agile',
      p1: 'PROJECT 3D élimine la distance entre conception CAO et composant technique fini, sans les coûts d\'outillage traditionnel.',
      p2: 'Nous concevons le prototypage comme un jalon de validation fonctionnelle rigoureux pour les tests de contraintes réelles.',
      p3: 'Notre implantation proposée se situe au Parc Industriel Atalaya à Torrijos (Tolède, Espagne).',
      whatIsTitle: 'Qu\'est-ce que le prototypage industriel ?',
      whatIsDesc: 'La fabrication préalable de pièces dotées de propriétés mécaniques similaires au produit final pour valider l\'assemblage.',
      whoWeHelpTitle: 'Pour qui travaillons-nous ?',
      whoWeHelpDesc: 'Bureaux d\'études, industries mécaniques, robotique, maintenance et pièces détachées sur-mesure.',
      valuePropTitle: 'Notre engagement',
      valuePropDesc: 'Vérification géométrique STL, traçabilité des matériaux techniques et conseils d\'ingénieurs experts en fabrication additive.',
    },
    services: {
      kicker: '02. CAPACITÉS DE PRODUCTION',
      title: 'Services Industriels de Précision',
      subtitle: 'Des solutions adaptées à chaque étape de votre développement industriel.',
      s1Title: 'Prototypage Fonctionnel',
      s1Desc: 'Validation cinématique et mécanique avec des polymères techniques (PETG, ABS, PA12).',
      s2Title: 'Impression 3D FDM & SLA',
      s2Desc: 'Fabrication en enceintes thermo-régulées pour prévenir toute déformation mécanique.',
      s3Title: 'Pièces Spéciales & Remplacement',
      s3Desc: 'Reproduction de composants obsolètes et fabrication de pièces sur-mesure.',
      s4Title: 'Petites Séries de Production',
      s4Desc: 'Production de 10 à 500 pièces sans frais d\'outillages ni moules.',
      s5Title: 'Gabarits & Outillages de Montage',
      s5Desc: 'Conception d\'outillages d\'atelier, mors doux et calibres de contrôle.',
      s6Title: 'Conseil Technique & DfAM',
      s6Desc: 'Optimisation topologique et orientation de couches pour la fabrication additive.',
    },
    gallery: {
      kicker: '03. RÉALISATIONS',
      title: 'Galerie Technique',
      subtitle: 'Composants industriels réalisés selon des tolérances rigoureuses.',
      filterAll: 'Toutes les pièces',
      filterPrototypes: 'Prototypes',
      filterMechanics: 'Mécanique',
      filterEnclosures: 'Boîtiers',
      filterTooling: 'Outillages',
    },
    howItWorks: {
      kicker: '04. PROCESSUS DE TRAVAIL',
      title: 'Du Modèle 3D à la Pièce Livrée',
      subtitle: 'Un flux transparent et rapide pour l\'ingénierie.',
      step1Title: '1. Envoi du fichier STL',
      step1Desc: 'Déposez votre fichier STL dans notre configurateur sécurisé.',
      step2Title: '2. Analyse géométrique',
      step2Desc: 'Extraction instantanée des cotes X, Y, Z, volume et maillage polygonal.',
      step3Title: '3. Configuration technique',
      step3Desc: 'Choix du polymère, hauteur de couche, remplissage et post-traitement.',
      step4Title: '4. Chiffrage instantané',
      step4Desc: 'Affichage du coût estimé et transmission au bureau d\'études en 1 clic.',
      step5Title: '5. Revue & Production',
      step5Desc: 'Validation par nos ingénieurs et lancement sur nos imprimantes calibrées.',
      step6Title: '6. Contrôle & Expédition',
      step6Desc: 'Contrôle métrologique dimensionnel et expédition sécurisée.',
    },
    quoteTool: {
      kicker: '05. DEVIS EN LIGNE 3D',
      title: 'Analyseur de Fichier .STL & Estimation',
      subtitle: 'Visualisez votre pièce en 3D dans le navigateur et configurez vos paramètres de fabrication.',
      dropzoneTitle: 'Glissez-déposez votre fichier .STL ici',
      dropzoneSubtitle: 'ou cliquez pour parcourir votre ordinateur',
      dropzoneFormats: 'Format .STL (binaire ou ASCII) · Max 50Mo conseillé',
      orSampleTitle: 'Ou testez avec un de nos modèles d\'exemple :',
      btnSampleGear: 'Engrenage Hélicoïdal',
      btnSampleBracket: 'Support Équerre',
      btnSampleTurbine: 'Roue de Turbine',
      btnSampleCube: 'Cube Étalon',
      metricsTitle: 'Données Géométriques Extraites',
      dimX: 'Axe X (Largeur) :',
      dimY: 'Axe Y (Longueur) :',
      dimZ: 'Axe Z (Hauteur) :',
      volume: 'Volume Solide :',
      surfaceArea: 'Surface Totale :',
      triangles: 'Nombre de Triangles :',
      estimatedWeight: 'Masse Théorique :',
      configTitle: 'Paramètres de Fabrication',
      materialLabel: 'Matériau Polymère :',
      colorLabel: 'Couleur de finition :',
      quantityLabel: 'Quantité de pièces :',
      resolutionLabel: 'Résolution de couche (Z) :',
      infillLabel: 'Taux de remplissage (%) :',
      finishLabel: 'Finition & Post-traitement :',
      priorityLabel: 'Délai souhaité :',
      priorityStandard: 'Standard (3 à 5 jours ouvrés)',
      priorityExpress: 'Express 24-48h (Priorité en file)',
      summaryTitle: 'Détail de l\'Estimation',
      materialCost: 'Coût matière première :',
      machineCost: 'Temps & amortissement machine :',
      setupCost: 'Préparation et calibrage :',
      finishCost: 'Post-traitement et finitions :',
      subtotal: 'Sous-total estimé :',
      volumeDiscount: 'Remise sur quantité :',
      totalEstimated: 'ESTIMATION INDICATIVE :',
      taxNotice: '* Prix indicatifs hors TVA. Offre définitive transmise après revue technique.',
      disclaimerNotice:
        'Avis : Ce calcul est une estimation automatique. Les ingénieurs de PROJECT 3D vérifieront l\'imprimabilité avant confirmation définitive.',
      btnSubmitQuote: 'Valider la Demande avec ce STL',
      viewerReset: 'Centrer Vue',
      viewerWireframe: 'Filaire',
      viewerSolid: 'Solide',
      viewIsometric: 'Isométrique',
      viewTop: 'Haut',
      viewFront: 'Face',
    },
    quoteModal: {
      title: 'Transmettre la Demande de Devis',
      subtitle: 'Envoyez votre fichier à nos ingénieurs pour obtenir une offre définitive.',
      nameLabel: 'Nom complet *',
      namePlaceholder: 'ex. Pierre Dupont',
      companyLabel: 'Société / Entité',
      companyPlaceholder: 'ex. Précision Mécanique SAS',
      emailLabel: 'Adresse email *',
      emailPlaceholder: 'pierre.dupont@entreprise.fr',
      phoneLabel: 'Numéro de téléphone *',
      phonePlaceholder: '+33 6 00 00 00 00',
      cityLabel: 'Ville de livraison',
      cityPlaceholder: 'ex. Paris / Lyon / Tolède',
      commentsLabel: 'Spécifications techniques particulières',
      commentsPlaceholder: 'Précisez les tolérances critiques, inserts ou contraintes...',
      ndaCheckbox: 'Je demande un accord de confidentialité (NDA) pour protéger ce modèle.',
      rgpdCheckbox: 'J\'accepte le traitement de mes données pour l\'établissement de ce devis.',
      btnConfirm: 'Envoyer à l\'Ingénierie',
      btnCancel: 'Annuler',
      successTitle: 'Demande Transmise avec Succès !',
      successMessage:
        'Vos données et votre géométrie 3D sont enregistrées. Un ingénieur de PROJECT 3D traitera votre dossier dans les plus brefs délais.',
      refLabel: 'Numéro de Référence :',
      btnClose: 'Fermer',
    },
    faq: {
      kicker: '06. QUESTIONS FRÉQUENTES',
      title: 'Questions Techniques',
      subtitle: 'Réponses aux interrogations courantes de nos clients industriels.',
      q1: 'Quel format exporter depuis le logiciel CAO ?',
      a1: 'Le format standard recommandé est le .STL binaire en haute résolution. Nous acceptons également les fichiers .STEP ou .STP.',
      q2: 'Quelles tolérances dimensionnelles garantissez-vous ?',
      a2: 'En FDM industrielle : ±0.15 mm à ±0.2 mm. En résine SLA haute précision : jusqu\'à ±0.05 mm pour ajustements précis.',
      q3: 'Comment choisir le matériau adapté ?',
      a3: 'PLA pour la forme, PETG pour la résistance chimique, ABS/ASA pour la chaleur et les UV, PA12 Nylon pour les chocs mécaniques, PA-CF pour une rigidité extrême.',
      q4: 'Mes fichiers sont-ils protégés par le secret professionnel ?',
      a4: 'Oui, nous appliquons une stricte confidentialité et pouvons signer des accords NDA bilatéraux.',
      q5: 'Quels sont les délais habituels de fabrication ?',
      a5: 'Délai standard de 3 à 5 jours ouvrés. Service express disponible en 24-48h pour urgences industrielles.',
      q6: 'Livrez-vous hors d\'Espagne ?',
      a6: 'Oui, nous livrons dans toute l\'Union Européenne par transporteur express sécurisé.',
    },
    contact: {
      kicker: '07. CONTACT & LOCALISATION',
      title: 'Contactez PROJECT 3D',
      subtitle: 'Rendez-nous visite ou envoyez-nous votre cahier des charges.',
      locationTitle: 'Emplacement Proposé pour le Projet',
      proposedLocationNote: 'Note : Traitée comme proposition de localisation face au Vivero de Empresas de Torrijos (Réf. 22).',
      addressLine1: 'PROJECT 3D',
      addressLine2: 'Av. de los Trabajadores, 21 · Polígono Industrial Atalaya',
      addressLine3: '45500 Torrijos, Tolède, Espagne',
      refVivero: 'En face du Vivero de Empresas de Torrijos (Réf. 22)',
      emailLabel: 'Email Bureau d\'Études :',
      phoneLabel: 'Support Technique & Commercial :',
      hoursLabel: 'Horaires d\'Ouverture :',
      hoursValue: 'Du lundi au vendredi : 08h00 - 18h30 sans interruption',
      formTitle: 'Laissez-nous un Message',
      formName: 'Votre Nom ou Entreprise',
      formEmail: 'Votre Email de Contact',
      formSubject: 'Objet de la demande',
      formMessage: 'Décrivez votre besoin technique...',
      btnSend: 'Envoyer le Message',
      sendSuccess: 'Message transmis avec succès. Notre équipe vous répondra sous 4 heures ouvrées.',
    },
    footer: {
      rights: 'Tous droits réservés. Spécialistes en Fabrication Additive Industrielle.',
      legalNote: 'Adresse traitée comme proposition d\'implantation au Pol. Ind. Atalaya, Torrijos.',
      confidentiality: 'Accord de Confidentialité NDA',
      terms: 'Conditions Générales',
      privacy: 'Politique RGPD',
    },
    chatbot: {
      title: 'Assistant Technique PROJECT 3D',
      subtitle: 'IA industrielle multilingue',
      placeholder: 'Posez votre question dans n\'importe quelle langue...',
      send: 'Envoyer',
      quick1: 'Quel matériau choisir pour des contraintes mécaniques ?',
      quick2: 'Où se situe l\'atelier à Torrijos ?',
      quick3: 'Comment fonctionne l\'analyse de fichier STL ?',
      quick4: 'Quelles sont vos tolérances dimensionnelles ?',
      humanSupport: 'Demander un contact avec un ingénieur',
    },
    admin: {
      navTitle: 'Gestion Atelier · PROJECT 3D',
      exitAdmin: 'Retour au Site Public',
      loginTitle: 'Accès Réservé à l\'Équipe Technique',
      loginSubtitle: 'Veuillez saisir votre code d\'accès atelier.',
      passcodePlaceholder: 'Code d\'accès...',
      btnLogin: 'Se Connecter',
      demoHint: 'Code démo rapide : PROJECT3D-ADMIN ou admin123',
      kpiTotal: 'Demandes Totales',
      kpiInReview: 'En Revue Technique',
      kpiInProduction: 'En Impression / Atelier',
      kpiCompleted: 'Terminées',
      kpiVolume: 'Valeur Estimée Cumulée',
      tabQuotes: 'Gestion des Devis & STL',
      tabPricing: 'Tarifs de Base',
      tabMaterials: 'Stock de Matériaux',
      searchPlaceholder: 'Rechercher par référence, client ou fichier...',
      filterAllStatus: 'Tous les statuts',
      colRef: 'Référence',
      colDate: 'Date',
      colCustomer: 'Client / Entreprise',
      colFile: 'Fichier STL',
      colMaterial: 'Matériau / Finition',
      colQty: 'Qté',
      colTotal: 'Total Estimé',
      colStatus: 'Statut Production',
      colActions: 'Actions',
      btnViewDetails: 'Inspecter',
      modalTitle: 'Détails de la Commande & Visualiseur STL',
      clientInfo: 'Coordonnées Client',
      specsInfo: 'Spécifications de Fabrication',
      pricingBreakdown: 'Détail Financier',
      pipelineStatus: 'Avancement dans le Pipeline',
      saveChanges: 'Enregistrer Statut & Notes',
      inspect3d: 'Aperçu 3D du Fichier STL',
      pricingTitle: 'Ajustement des Tarifs & Paramètres',
      pricingDesc: 'Modifiez les coûts horaires et matières qui alimentent le calculateur web.',
      machineRate: 'Tarif horaire machine (€/heure) :',
      setupFee: 'Frais de préparation & calibrage (€) :',
      saveConfig: 'Mettre à Jour les Tarifs',
      configSavedSuccess: 'Tarifs actualisés dans le moteur de calcul !',
    },
  },
  de: {
    nav: {
      home: 'Startseite',
      about: 'Über Uns',
      services: 'Leistungen',
      gallery: 'Projekte',
      howItWorks: 'Ablauf',
      quoteTool: 'STL Kalkulator',
      faq: 'FAQ',
      contact: 'Kontakt',
      admin: 'Verwaltung',
      uploadStl: 'STL Hochladen',
    },
    hero: {
      badge: 'Additive Fertigung & Industrielles Prototyping mit Höchster Präzision',
      titleLine1: 'WIR VERWANDELN 3D-MODELLE',
      titleLine2: 'IN PRÄZISE INDUSTRIEBAUTEILE',
      description:
        'Bei PROJECT 3D vereinen wir industrielle additive Fertigung, technische Polymere und dimensionale Messtechnik in Torrijos (Toledo, Spanien).',
      ctaPrimary: '.STL Datei Kalkulieren',
      ctaSecondary: 'Leistungen Entdecken',
      statPrecision: '±0.08 mm',
      statPrecisionLabel: 'Standardmaßtoleranz',
      statMaterials: '7+ Materialien',
      statMaterialsLabel: 'Technische Kunststoffe & Verbundwerkstoffe',
      statDelivery: '24h - 48h',
      statDeliveryLabel: 'Lieferzeit im Express-Service',
    },
    about: {
      kicker: '01. INGENIEURSPHILOSOPHIE',
      title: 'Maschinenbau & Agile Kleinserien',
      p1: 'PROJECT 3D schließt die Lücke zwischen digitalem CAD-Modell und dem realen Bauteil – ohne teure Werkzeugkosten.',
      p2: 'Wir verstehen industrielles Prototyping als kritische Validierungsstufe für Belastungstests, Passgenauigkeit und Thermobeständigkeit.',
      p3: 'Unser vorgeschlagener Standort befindet sich im Gewerbegebiet Atalaya in Torrijos (Toledo, Spanien).',
      whatIsTitle: 'Was ist industrielles Prototyping?',
      whatIsDesc: 'Die Vorabfertigung von Bauteilen mit realitätsnahen mechanischen Eigenschaften zur Prüfung vor der Serienproduktion.',
      whoWeHelpTitle: 'Wen unterstützen wir?',
      whoWeHelpDesc: 'Entwicklungsabteilungen, Maschinenbauunternehmen, Automatisierer und Ersatzteilfertigung.',
      valuePropTitle: 'Unser Wertversprechen',
      valuePropDesc: 'STL-Druckbarkeitsprüfung, lückenlose Materialrückverfolgbarkeit und direkte ingenieurtechnische Beratung.',
    },
    services: {
      kicker: '02. FERTIGUNGSKAPAZITÄTEN',
      title: 'Spezialisierte Industrieleistungen',
      subtitle: 'Maßgeschneiderte Lösungen für jede Entwicklungsphase.',
      s1Title: 'Funktionsprototypen',
      s1Desc: 'Kinematische und mechanische Validierung mit belastbaren Werkstoffen (PETG, ABS, PA12).',
      s2Title: 'Industrieller 3D-Druck (FDM & SLA)',
      s2Desc: 'Produktion in klimatisierten Baukammern zur Vermeidung von Bauteilverzug.',
      s3Title: 'Sonderteile & Ersatzteilfertigung',
      s3Desc: 'Nachfertigung abgekündigter Komponenten und kundenspezifische Vorrichtungen.',
      s4Title: 'Kleinserienfertigung',
      s4Desc: 'Bedarfsgerechte Kleinserien von 10 bis 500 Stück ohne Formenbau.',
      s5Title: 'Vorrichtungen & Montagelehren',
      s5Desc: 'Konstruktion von Montagehilfen, Spannbacken und Prüflehren.',
      s6Title: 'Technische DfAM-Beratung',
      s6Desc: 'Topologieoptimierung und schichtgerechte Bauteilauslegung.',
    },
    gallery: {
      kicker: '03. PROJEKTGALERIE',
      title: 'Gefertigte Bauteile',
      subtitle: 'Präzisionsbauteile nach strengen industriellen Prüfstandards gefertigt.',
      filterAll: 'Alle Bauteile',
      filterPrototypes: 'Prototypen',
      filterMechanics: 'Mechanik',
      filterEnclosures: 'Gehäuse',
      filterTooling: 'Vorrichtungen',
    },
    howItWorks: {
      kicker: '04. WORKFLOW',
      title: 'Vom CAD-Modell zum fertigen Bauteil',
      subtitle: 'Ein transparenter und schneller Ablauf für Ihre Ingenieurprojekte.',
      step1Title: '1. STL-Datei hochladen',
      step1Desc: 'Laden Sie Ihre .STL-Datei in unseren gesicherten Webkonfigurator hoch.',
      step2Title: '2. Automatische Analyse',
      step2Desc: 'Erfassung der Maße X, Y, Z, des Volumens und der Dreiecksanzahl in Echtzeit.',
      step3Title: '3. Parameter festlegen',
      step3Desc: 'Werkstoff, Schichthöhe, Fülldichte und Nachbearbeitungsverfahren wählen.',
      step4Title: '4. Sofortangebot erhalten',
      step4Desc: 'Transparente Kostenübersicht prüfen und Anfrage direkt an unser Team übermitteln.',
      step5Title: '5. Prüfung & Fertigung',
      step5Desc: 'Unsere Ingenieure prüfen die Druckbarkeit und starten die Fertigung auf kalibrierten Maschinen.',
      step6Title: '6. Qualitätskontrolle & Versand',
      step6Desc: 'Messtechnische Maßprüfung mit digitalem Messschieber und sicherer Expressversand.',
    },
    quoteTool: {
      kicker: '05. INTERAKTIVER 3D-KALKULATOR',
      title: '.STL-Dateianalysator & Sofort-Kostenschätzung',
      subtitle: 'Betrachten Sie Ihr Bauteil in 3D und konfigurieren Sie alle Parameter der additiven Fertigung.',
      dropzoneTitle: 'Ziehen Sie Ihre .STL-Datei hierher',
      dropzoneSubtitle: 'oder klicken Sie zum Auswählen vom Computer',
      dropzoneFormats: 'Format .STL (binär oder ASCII) · Max. 50MB empfohlen',
      orSampleTitle: 'Oder testen Sie eines unserer Referenzmodelle:',
      btnSampleGear: 'Schrägstirnrad',
      btnSampleBracket: 'L-Haltewinkel',
      btnSampleTurbine: 'Turbinenlaufrad',
      btnSampleCube: 'Kalibrierwürfel',
      metricsTitle: 'Ermittelte Geometriedaten',
      dimX: 'X-Achse (Breite):',
      dimY: 'Y-Achse (Länge):',
      dimZ: 'Z-Achse (Höhe):',
      volume: 'Volumen:',
      surfaceArea: 'Oberfläche:',
      triangles: 'Polygonanzahl:',
      estimatedWeight: 'Theoretische Masse:',
      configTitle: 'Fertigungsparameter',
      materialLabel: 'Werkstoff / Polymer:',
      colorLabel: 'Farbauswahl:',
      quantityLabel: 'Stückzahl:',
      resolutionLabel: 'Schichthöhe (Z-Auflösung):',
      infillLabel: 'Interne Fülldichte (%):',
      finishLabel: 'Nachbearbeitung / Oberflächenfinish:',
      priorityLabel: 'Fertigungsdauer:',
      priorityStandard: 'Standard (3 - 5 Werktage)',
      priorityExpress: 'Express 24-48h (Prioritäre Fertigung)',
      summaryTitle: 'Kostengliederung',
      materialCost: 'Materialkosten:',
      machineCost: 'Maschinenlaufzeit & Rüstung:',
      setupCost: 'Druckbettvorbereitung & Kalibrierung:',
      finishCost: 'Nachbearbeitung & Veredelung:',
      subtotal: 'Zwischensumme:',
      volumeDiscount: 'Mengenrabatt:',
      totalEstimated: 'RICHTWERT-ANGEBOT:',
      taxNotice: '* Unverbindliche Richtpreise zzgl. MwSt. Verbindliches Angebot folgt nach technischer Prüfung.',
      disclaimerNotice:
        'Hinweis: Die angezeigte Berechnung ist eine automatische Schätzung. PROJECT 3D prüft die reale Druckbarkeit vor Auftragsbestätigung.',
      btnSubmitQuote: 'Offizielles Angebot für dieses STL anfragen',
      viewerReset: 'Ansicht Zentrieren',
      viewerWireframe: 'Drahtgitter',
      viewerSolid: 'Vollkörper',
      viewIsometric: 'Isometrisch',
      viewTop: 'Oben',
      viewFront: 'Vorne',
    },
    quoteModal: {
      title: 'Offizielle Angebotsanfrage Absenden',
      subtitle: 'Übermitteln Sie Ihre Daten an das Ingenieurteam von PROJECT 3D.',
      nameLabel: 'Vollständiger Name *',
      namePlaceholder: 'z.B. Markus Weber',
      companyLabel: 'Unternehmen / Organisation',
      companyPlaceholder: 'z.B. Maschinenbau Weber GmbH',
      emailLabel: 'E-Mail-Adresse *',
      emailPlaceholder: 'markus.weber@unternehmen.de',
      phoneLabel: 'Telefonnummer *',
      phonePlaceholder: '+49 170 000 000',
      cityLabel: 'Lieferort / Region',
      cityPlaceholder: 'z.B. Toledo / Stuttgart / München',
      commentsLabel: 'Besondere technische Anforderungen',
      commentsPlaceholder: 'Geben Sie kritische Passungen, Gewindeeinsätze oder Umgebungsbedingungen an...',
      ndaCheckbox: 'Ich benötige eine Geheimhaltungsvereinbarung (NDA) für dieses Schutzmodell.',
      rgpdCheckbox: 'Ich akzeptiere die Datenschutzerklärung zur Bearbeitung dieses Angebots.',
      btnConfirm: 'Anfrage an Ingenieure Senden',
      btnCancel: 'Abbrechen',
      successTitle: 'Anfrage Erfolgreich Registriert!',
      successMessage:
        'Ihre Modelldaten sind bei uns eingegangen. Ein Ingenieur von PROJECT 3D wird das Bauteil prüfen und sich bei Ihnen melden.',
      refLabel: 'Vorgangsnummer:',
      btnClose: 'Schließen',
    },
    faq: {
      kicker: '06. HÄUFIGE FRAGEN',
      title: 'Technische FAQ',
      subtitle: 'Antworten auf die wichtigsten Fragen von Entwicklern und Einkäufern.',
      q1: 'Welches CAD-Exportformat ist ideal?',
      a1: 'Wir empfehlen binäre .STL-Dateien mit feiner Tesselierung. Gerne akzeptieren wir auch native .STEP oder .STP-Dateien.',
      q2: 'Welche Fertigungstoleranzen erreichen Sie?',
      a2: 'Im industriellen FDM-Druck liegen typische Toleranzen bei ±0.15 mm bis ±0.2 mm. Bei hochpräzisen SLA-Harzen erreichen wir bis zu ±0.05 mm.',
      q3: 'Wie wähle ich das richtige Material?',
      a3: 'PLA für schnelle Prototypen, PETG für Chemikalienbeständigkeit, ABS/ASA für Wärme- und UV-Beständigkeit, PA12 für hohe Zähigkeit, PA-CF für maximale Steifigkeit.',
      q4: 'Werden meine Konstruktionsdaten vertraulich behandelt?',
      a4: 'Selbstverständlich. Sämtliche Daten unterliegen strenger Geheimhaltung. Wir unterzeichnen vorab gerne eine bilaterale Geheimhaltungsvereinbarung (NDA).',
      q5: 'Wie lang sind die üblichen Lieferzeiten?',
      a5: 'Standardmäßig 3 bis 5 Werktage. Für Notfälle bieten wir einen 24-48h Express-Service an.',
      q6: 'Liefern Sie auch überregional?',
      a6: 'Ja, wir beliefern Kunden in ganz Spanien und europaweit per Express-Kurierdienst.',
    },
    contact: {
      kicker: '07. KONTAKT & STANDORT',
      title: 'Kontakt zu PROJECT 3D',
      subtitle: 'Sprechen Sie mit unserem Ingenieurteam in Torrijos.',
      locationTitle: 'Vorgeschlagener Standort für das Projekt',
      proposedLocationNote: 'Hinweis: Vorgeschlagener Projektstandort gegenüber dem Vivero de Empresas de Torrijos (Ref. 22).',
      addressLine1: 'PROJECT 3D',
      addressLine2: 'Av. de los Trabajadores, 21 · Polígono Industrial Atalaya',
      addressLine3: '45500 Torrijos, Toledo, Spanien',
      refVivero: 'Gegenüber dem Vivero de Empresas de Torrijos (Ref. 22)',
      emailLabel: 'E-Mail Technisches Büro:',
      phoneLabel: 'Ingenieurberatung & Kundenservice:',
      hoursLabel: 'Öffnungszeiten:',
      hoursValue: 'Montag bis Freitag: 08:00 - 18:30 Uhr durchgehend',
      formTitle: 'Nachricht Senden',
      formName: 'Ihr Name oder Unternehmen',
      formEmail: 'Ihre E-Mail-Adresse',
      formSubject: 'Betreff',
      formMessage: 'Beschreiben Sie Ihre Anfrage...',
      btnSend: 'Nachricht Absenden',
      sendSuccess: 'Ihre Nachricht wurde übermittelt. Wir antworten innerhalb von 4 Arbeitsstunden.',
    },
    footer: {
      rights: 'Alle Rechte vorbehalten. Spezialisten für Additive Fertigung & Industrielles Prototyping.',
      legalNote: 'Standort als vorgeschlagener Projektstandort im Pol. Ind. Atalaya, Torrijos (Toledo).',
      confidentiality: 'Geheimhaltung & NDA',
      terms: 'Geschäftsbedingungen',
      privacy: 'Datenschutz (DSGVO)',
    },
    chatbot: {
      title: 'Technischer Assistent PROJECT 3D',
      subtitle: 'Mehrsprachige Industrie-KI',
      placeholder: 'Stellen Sie Ihre Frage in beliebiger Sprache...',
      send: 'Senden',
      quick1: 'Welches Material für mechanische Beanspruchung?',
      quick2: 'Wo befindet sich der Standort in Torrijos?',
      quick3: 'Wie funktioniert die STL-Berechnung?',
      quick4: 'Welche Bauteiltoleranzen bieten Sie?',
      humanSupport: 'Rückruf durch Ingenieur anfordern',
    },
    admin: {
      navTitle: 'Verwaltungskonsole · PROJECT 3D',
      exitAdmin: 'Zur öffentlichen Website',
      loginTitle: 'Interner Werkstattzugang',
      loginSubtitle: 'Bitte geben Sie den Autorisierungscode ein.',
      passcodePlaceholder: 'Zugangscode...',
      btnLogin: 'Anmelden',
      demoHint: 'Demo-Zugang: PROJECT3D-ADMIN oder admin123',
      kpiTotal: 'Anfragen Gesamt',
      kpiInReview: 'In Technischer Prüfung',
      kpiInProduction: 'In Fertigung / Druck',
      kpiCompleted: 'Abgeschlossen',
      kpiVolume: 'Geschätztes Auftragsvolumen',
      tabQuotes: 'Anfragen- & STL-Manager',
      tabPricing: 'Grundpreiskonfiguration',
      tabMaterials: 'Materialbestand',
      searchPlaceholder: 'Suche nach Referenz, Kunde oder Datei...',
      filterAllStatus: 'Alle Status',
      colRef: 'Referenz',
      colDate: 'Datum',
      colCustomer: 'Kunde / Firma',
      colFile: 'STL-Datei',
      colMaterial: 'Material / Finish',
      colQty: 'Menge',
      colTotal: 'Gesamtsumme',
      colStatus: 'Produktionsstatus',
      colActions: 'Aktionen',
      btnViewDetails: 'Prüfen',
      modalTitle: 'Anfragedetails & 3D-STL-Inspektor',
      clientInfo: 'Kundendaten',
      specsInfo: 'Fertigungsspezifikationen',
      pricingBreakdown: 'Kostenaufstellung',
      pipelineStatus: 'Status in der Fertigung',
      saveChanges: 'Änderungen Speichern',
      inspect3d: '3D-STL-Vorschau',
      pricingTitle: 'Grundpreise & Maschinenkostensätze',
      pricingDesc: 'Bearbeiten Sie die Stundensätze und Materialpreise des Online-Kalkulators.',
      machineRate: 'Maschinenstundensatz (€/Std.):',
      setupFee: 'Feste Rüst- & Kalibrierpauschale (€):',
      saveConfig: 'Preise Aktualisieren',
      configSavedSuccess: 'Preise im Kalkulationssystem aktualisiert!',
    },
  },
};
