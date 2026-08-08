import { ShieldCheck, Cpu, Network, Code2 } from 'lucide-react';

export const ARTICLES = [
  {
    id: 1,
    category: 'ciberseguridad',
    categoryLabel: 'Ciberseguridad',
    featured: true,
    cover: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    icon: ShieldCheck,
    accent: '#20c997',
    accentBg: 'rgba(32,201,151,0.10)',
    title: 'Blindaje Antifraude 2026: Estrategias de Ciberseguridad y Arquitectura Defensiva contra Ransomware en Pymes',
    date: '15 Jul 2026',
    readTime: '10 min lectura',
    author: 'Ing. Sergio Luis Pérez C.',
    authorRole: 'Director de Ingeniería & Seguridad TI',
    summary: 'Guía técnica exhaustiva basada en NIST CSF 2.0, arquitectura Zero Trust, copias inmutables 3-2-1-1-0 y autenticación MFA obligatoria para prevenir secuestros de información y pérdidas financieras.',
    highlights: [
      'Estándar NIST Cybersecurity Framework 2.0',
      'Estrategia de Backup Inmutable 3-2-1-1-0',
      'Segmentación de Red por VLANs y Firewalls',
      'Políticas MFA y Control de Acceso Zero Trust'
    ],
    metricsTable: [
      { metric: 'Ataques Neutralizados con MFA', value: '99.4%' },
      { metric: 'Tiempo Promedio de RTO (Recuperación)', value: '< 2 Horas' },
      { metric: 'Pérdida de Datos RPO (Backup Inmutable)', value: '0 Bytes' },
    ],
    sections: [
      {
        heading: '1. El Panorama Actual del Ransomware y la Extorsión Doble (2025-2026)',
        body: `El ransomware ha evolucionado de un malware genérico a una industria delictiva altamente organizada (Ransomware-as-a-Service o RaaS). En la actualidad, más del 88% de los ataques a infraestructuras en Latinoamérica afectan directamente a Pymes debido a configuraciones de red planas y falta de respaldos fuera de línea.\n\nLos atacantes modernos no solo cifran las bases de datos contables y servidores de archivos, sino que ejecutan una 'doble extorsión': extraen información confidencial antes del cifrado y amenazan con publicarla en la Dark Web. El tiempo desde la intrusión inicial hasta el cifrado total del dominio se ha reducido a menos de 3 horas.`,
      },
      {
        heading: '2. Implementación del Marco NIST Cybersecurity Framework (CSF 2.0)',
        body: `Para construir un blindaje defensivo efectivo, aplicamos las 6 funciones fundamentales del estándar NIST CSF 2.0:\n\n1. Governar (Gobernanza): Establecer políticas de uso aceptable de tecnología y gestión del riesgo.\n2. Identificar: Inventariar todos los activos informáticos, servidores, puestos de trabajo y bases de datos.\n3. Proteger: Implementar autenticación multifactor (MFA), encriptación de discos y segmentación VLAN.\n4. Detectar: Configurar sistemas EDR (Endpoint Detection & Response) y monitoreo de logs de red 24/7.\n5. Responder: Aislar inmediatamente computadores comprometidos de la red local.\n6. Recuperar: Ejecutar planes de continuidad de negocio respaldados por copias inmutables.`,
      },
      {
        heading: '3. La Regla Avanzada de Respaldos 3-2-1-1-0',
        body: `Para garantizar que su empresa jamás tenga que pagar un rescate, la arquitectura de copia de seguridad debe cumplir con la norma 3-2-1-1-0:\n\n- 3 Copias de datos: La versión original de producción y 2 copias de respaldo independientes.\n- 2 Medios diferentes: Almacenar en disco local de alta velocidad (NAS) y en la nube cifrada.\n- 1 Copia Off-Site: Guardar una copia fuera de la sede física de la empresa.\n- 1 Copia Inmutable (Air-Gapped): Un respaldo con protección WORM (Write Once, Read Many) imposible de alterar o borrar incluso con credenciales de administrador.\n- 0 Errores: Realizar pruebas periódicas de restauración automatizada para verificar que los archivos sean 100% funcionales.`,
      },
      {
        heading: '4. Segmentación Perimetral y Filosofía Zero Trust',
        body: `El modelo Zero Trust opera bajo el principio de 'nunca confiar, siempre verificar'. Dividir la red empresarial mediante VLANs asignadas por departamentos (Administración, Operaciones, Cámaras IP, Wi-Fi Invitados) evita que un virus en un computador portátil infecte los servidores de bases de datos o el sistema ERP de la empresa.`,
      }
    ],
    recommendation: 'Solicite una auditoría técnica perimetral y prueba de penetración en su infraestructura para detectar vulnerabilidades antes de sufrir un incidente crítico.',
  },
  {
    id: 2,
    category: 'ia',
    categoryLabel: 'Inteligencia Artificial',
    featured: false,
    cover: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80',
    icon: Cpu,
    accent: '#f37021',
    accentBg: 'rgba(243,112,33,0.10)',
    title: 'Asistentes Virtuales con IA: Automatización Comercial, RAG y Conexión 24/7 en WhatsApp',
    date: '02 Ago 2026',
    readTime: '9 min lectura',
    author: 'Ing. Sergio Luis Pérez C.',
    authorRole: 'Especialista en IA & Automatización',
    summary: 'Análisis detallado sobre la integración de modelos LLM (OpenAI / Gemini) mediante RAG a sistemas ERP y Meta WhatsApp Cloud API para automatizar atención al cliente y ventas.',
    highlights: [
      'Respuesta Inmediata en WhatsApp < 3s',
      'Arquitectura RAG sobre Bases de Datos',
      'Integración con Meta WhatsApp Cloud API',
      'Calificación Automática de Prospectos'
    ],
    metricsTable: [
      { metric: 'Tiempo de Respuesta Comercial', value: '< 3 Segundos' },
      { metric: 'Aumento en Tasa de Conversión', value: '+38%' },
      { metric: 'Carga de Atención Automatizada', value: '65% de Consultas' },
    ],
    sections: [
      {
        heading: '1. Por Qué la Inmediatez Determina la Conversión Comercial',
        body: `En el entorno digital actual, el 75% de las oportunidades de venta en WhatsApp o chat web se pierden si el prospecto no recibe atención en los primeros 5 minutos. Los menús de opciones rígidos tradicionales frustran a los clientes.\n\nLa Inteligencia Artificial conversacional permite interpretar la intención del usuario en lenguaje natural, responder preguntas complejas sobre productos o servicios y mantener una conversación fluida en cualquier horario del día.`,
      },
      {
        heading: '2. Arquitectura RAG (Retrieval-Augmented Generation) para Datos Corporativos',
        body: `Para evitar las 'alucinaciones' de los modelos de IA y garantizar respuestas exactas basadas en la realidad de su negocio, utilizamos la arquitectura RAG:\n\n1. Ingesta de Datos: Indexamos catálogos de precios, manuales de servicio, políticas de garantía y preguntas frecuentes.\n2. Bases de Datos Vectoriales: Transformamos el conocimiento de su empresa en vectores matemáticos de búsqueda instantánea.\n3. Consulta de Precisión: Cuando un usuario pregunta por disponibilidad o precios, la IA recupera el dato exacto de la base de datos y redacta una respuesta profesional en segundos.`,
      },
      {
        heading: '3. Integración Directa con Meta WhatsApp Cloud API y CRM',
        body: `Conectar la IA directamente a la API oficial de WhatsApp permite:\n- Enviar cotizaciones personalizadas en PDF automáticamente.\n- Agendar citas directamente en el calendario del equipo comercial.\n- Transferir la conversación a un asesor humano cuando el prospecto demuestra alta intención de compra.`,
      }
    ],
    recommendation: 'Un piloto de IA comercial permite automatizar más del 65% de las consultas repetitivas desde la primera semana de implementación.',
  },
  {
    id: 3,
    category: 'redes',
    categoryLabel: 'Redes & CCTV',
    featured: false,
    cover: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    icon: Network,
    accent: '#3b82f6',
    accentBg: 'rgba(59,130,246,0.10)',
    title: 'Cableado Estructurado Cat6A vs. Wi-Fi 6 Mesh: Optimizando la Conectividad Corporativa Cero Caídas',
    date: '28 Jul 2026',
    readTime: '11 min lectura',
    author: 'Ing. Sergio Luis Pérez C.',
    authorRole: 'Consultor de Infraestructura & Telecomunicaciones',
    summary: 'Guía de diseño de red empresarial bajo norma ANSI/TIA-568.2-D, 10GBASE-T, Wi-Fi 6 Mesh (802.11ax), alimentación PoE++ y switches administrables para alta disponibilidad.',
    highlights: [
      'Norma ANSI/TIA-568.2-D Certificada',
      'Velocidad 10GBASE-T en Cableado Cat6A',
      'Tecnología Wi-Fi 6 (802.11ax) OFDMA',
      'Alimentación PoE+ / PoE++ para IP Devices'
    ],
    metricsTable: [
      { metric: 'Ancho de Banda Cat6A (500 MHz)', value: '10 Gbps' },
      { metric: 'Latencia en Puestos Fijos', value: '< 1 ms' },
      { metric: 'Uptime de Red Garantizado SLA', value: '99.99%' },
    ],
    sections: [
      {
        heading: '1. La Arquitectura Híbrida Ideal para Entornos Corporativos',
        body: `La productividad de una empresa no depende solo de la velocidad contratada con el proveedor de internet, sino de cómo se distribuye internamente esa conectividad.\n\nRecomendamos una arquitectura híbrida: cableado estructurado Categoría 6A para puestos fijos, servidores y cámaras CCTV (garantizando 10 Gbps a 500 MHz sin interferencia electromagnética), combinado con red Wi-Fi 6 Mesh para movilidad de computadores portátiles y dispositivos móviles.`,
      },
      {
        heading: '2. Estándares ANSI/TIA-568.2-D y Certificación Fluke',
        body: `Cada punto de red debe ser instalado respetando las normas internacionales de curvatura, peinado de cables en patch panels y ponchado estandarizado T568B. Certificar los puntos con un analizador de red garantiza que la instalación soporte velocidades multigigabit durante más de 10 años sin degradación.`,
      },
      {
        heading: '3. Switches Administrables L2/L3 y Alimentación PoE+',
        body: `El uso de switches PoE+ (802.3at) permite alimentar cámaras de seguridad IP, teléfonos VoIP y puntos de acceso inalámbricos a través del mismo cable de datos, centralizando el respaldo eléctrico en un banco de baterías UPS.`,
      }
    ],
    recommendation: 'Diseñar e instalar cableado estructurado certificado protege su inversión en infraestructura tecnológica por más de una década.',
  },
  {
    id: 4,
    category: 'software',
    categoryLabel: 'Software a Medida',
    featured: false,
    cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    icon: Code2,
    accent: '#8b5cf6',
    accentBg: 'rgba(139,92,246,0.10)',
    title: '¿Software Comercial Licenciado o Sistema a Medida? Análisis Técnico de ROI, TCO y Arquitectura',
    date: '20 Jul 2026',
    readTime: '10 min lectura',
    author: 'Ing. Sergio Luis Pérez C.',
    authorRole: 'Arquitecto Principal de Software',
    summary: 'Comparativa financiera e ingenieril del Costo Total de Propiedad (TCO) entre el software SaaS por suscripción y el desarrollo de software a medida con propiedad total del código.',
    highlights: [
      'Propiedad 100% del Código Fuente',
      'Eliminación de Licencias Mensuales por Usuario',
      'Arquitectura de Microservicios & REST APIs',
      'Independencia Tecnológica y Cero Vendor Lock-in'
    ],
    metricsTable: [
      { metric: 'Ahorro Financiero a 3 Años', value: 'Hasta 65%' },
      { metric: 'Adaptación a Procesos Internos', value: '100% Fiel' },
      { metric: 'Retorno de Inversión (ROI)', value: '6 a 12 Meses' },
    ],
    sections: [
      {
        heading: '1. El Verdadero Costo Total de Propiedad (TCO) del Software SaaS',
        body: `Pagar licencias mensuales por cada empleado que ingresa a un software contable o comercial representa un costo recurrente que aumenta año tras año. A medida que la empresa crece, el software empaquetado se convierte en una fuga constante de capital.\n\nPor el contrario, el desarrollo de software a medida se contabiliza como un activo intangible de la empresa: se paga la construcción inicial y el sistema es propiedad permanente de la compañía con usuarios ilimitados.`,
      },
      {
        heading: '2. Adaptabilidad Total a los Procesos Únicos de su Negocio',
        body: `Forzar a sus colaboradores a adaptarse a las limitaciones de un programa genérico genera duplicidad de tareas en hojas de cálculo externas. El software a medida se diseña respetando los flujos, formatos, aprobaciones y reglas operativas exactas de su organización.`,
      },
      {
        heading: '3. Arquitectura Limpia, APIs ABIERTAS e Integración con IA',
        body: `Nuestros desarrollos utilizan stacks modernos (React, Node.js, Python, PostgreSQL, Docker), permitiendo conectar fácilmente el sistema con pasarelas de pago, facturación electrónica, dispositivos IoT o agentes de Inteligencia Artificial.`,
      }
    ],
    recommendation: 'El desarrollo de software a medida otorga independencia tecnológica, propiedad de activos y ventajas competitivas sostenibles.',
  },
  {
    id: 5,
    category: 'redes',
    categoryLabel: 'Redes & CCTV',
    featured: false,
    cover: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80',
    icon: ShieldCheck,
    accent: '#f37021',
    accentBg: 'rgba(243,112,33,0.10)',
    title: 'Videovigilancia IP con Analítica IA: Prevención Activa de Pérdidas y Control Móvil en Tiempo Real',
    date: '10 Jul 2026',
    readTime: '8 min lectura',
    author: 'Ing. Sergio Luis Pérez C.',
    authorRole: 'Ingeniero de Sistemas & CCTV',
    summary: 'Evaluación técnica de cámaras de seguridad IP 4K, algoritmos de analítica de video AcuSense, compresión de video H.265+ y monitoreo remoto cifrado desde smartphones.',
    highlights: [
      'Resolución 4K Ultra HD (8 Megapíxeles)',
      'Analítica de Video con Detección de Humanos',
      'Compresión Eficiente H.265+ y RAID 5',
      'Monitoreo Móvil Cifrado P2P en Tiempo Real'
    ],
    metricsTable: [
      { metric: 'Resolución de Imagen', value: '4K Ultra HD' },
      { metric: 'Ahorro de Almacenamiento H.265+', value: '-70% Disco' },
      { metric: 'Disponibilidad de Grabación Continuo', value: '24/7/365' },
    ],
    sections: [
      {
        heading: '1. De la Grabación Pasiva a la Prevención Inteligente de Incidencias',
        body: `Las cámaras analógicas convencionales solo servían para revisar grabaciones después de que se producía un robo o daño. Los sistemas de videovigilancia IP modernos incorporan procesadores con analítica de inteligencia artificial capaces de diferenciar entre personas, vehículos y falsas alarmas (lluvia, animales, vegetación).\n\nAnte una intrusión fuera del horario comercial, el sistema activa sirenas estroboscópicas e inmediatamente notifica al smartphone de los supervisores de seguridad con un clip de video en tiempo real.`,
      },
      {
        heading: '2. Optimización de Disco Duro con Códec H.265+ y Servidores NVR',
        body: `Grabar múltiples cámaras en resolución 4K requiere discos duros especiales para trabajo continuo (Western Digital Purple / Seagate SkyHawk) configurados en arreglos redundantes RAID 5. El códec de compresión inteligente H.265+ reduce en hasta un 70% el espacio de disco necesario sin perder nitidez gráfica.`,
      },
      {
        heading: '3. Acceso Remoto Cifrado y Respaldo por UPS de Energía',
        body: `Configuramos conexiones P2P cifradas bajo protocolos TLS 1.3 para visualizar las cámaras desde cualquier lugar del mundo sin exponer puertos vulnerables en el router. Además, respaldamos los grabadores NVR y switches PoE con bancos de baterías UPS para mantener la vigilancia incluso durante apagones.`,
      }
    ],
    recommendation: 'Un sistema CCTV con análisis inteligente y respaldo de energía UPS garantiza la protección preventiva de sus instalaciones las 24 horas del día.',
  }
];

export const CATEGORIES = [
  { id: 'todos', label: 'Todos los Artículos' },
  { id: 'ciberseguridad', label: 'Ciberseguridad' },
  { id: 'ia', label: 'Inteligencia Artificial' },
  { id: 'software', label: 'Software a Medida' },
  { id: 'redes', label: 'Redes & CCTV' },
];
