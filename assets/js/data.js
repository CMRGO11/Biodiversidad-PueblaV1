/**
 * ==============================================================================
 * ARCHIVO CENTRAL DE DATOS (UNA SOLA FUENTE DE INFORMACIÓN): data.js
 * ==============================================================================
 * ¡Hola! Este archivo cumple uno de los principios más importantes del documento
 * "Arquitectura y requerimientos del micrositio Puebla, Capital de la Biodiversidad":
 *
 * PRINCIPIO DE "UNA SOLA FUENTE DE INFORMACIÓN" (Secciones 1, 5 y 8 del PDF):
 * "Cada actividad debe tener un identificador único y almacenarse una sola vez.
 *  La agenda, el mapa y las secciones temáticas deben recuperar la información
 *  del mismo registro. El comité puede actualizar o retirar una actividad sin
 *  modificar varias páginas manualmente."
 *
 * ¿CÓMO ACTUALIZAR EL SITIO DESPUÉS DE LA ENTREGA?
 * - Para AGREGAR una actividad: Copia uno de los bloques {...} dentro de ACTIVIDADES_DATA
 *   y cambia sus datos con un nuevo código único (ej. "ACT-013").
 * - Para CAMBIAR EL ESTADO: Cambia el campo "estado" entre:
 *     "confirmada"   -> Aparece con insignia verde (Confirmada / Disponible)
 *     "proximamente" -> Aparece con insignia azul/dorada (Próximamente)
 *     "propuesta"    -> Aparece con insignia naranja (Propuesta en evaluación)
 * - Para RETIRAR una actividad: Cambia "visible: true" por "visible: false" o bórrala.
 * ==============================================================================
 */

const SITIO_CONFIG = {
    nombreIniciativa: "Puebla, Capital de la Biodiversidad",
    congreso: "ICCB 2027 · 33º Congreso Internacional de Biología de la Conservación",
    periodoGeneral: "7 de junio al 2 de julio de 2027",
    diaExploracionFecha: "2 de julio de 2027",
    responsableActualizacion: "Comité Organizador Local ICCB 2027 · BUAP & SCB",
    ultimaActualizacion: "Noviembre 2026"
};

/**
 * ==============================================================================
 * DIRECTORIO ÚNICO DE ACTIVIDADES
 * ==============================================================================
 * Esta lista alimenta automáticamente:
 * - El directorio común y calendario en agenda.html
 * - Los puntos de interés en el mapa interactivo de rutas.html
 * - Los contadores y vistas rápidas de la portada index.html
 *
 * Categorías (campo "tipo"):
 * - "universidad_ong": Universidades, organizaciones y ONG
 * - "gastronomia": Cafeterías, restaurantes y Sabores de la Biodiversidad
 * - "cursos_talleres": Talleres, cursos y educación ambiental (Aprende y participa)
 * - "exposiciones_cultura": Museos, galerías, exposiciones y cultura
 * - "rutas_recorridos": Rutas urbanas, murales de Cholula y naturaleza
 * - "gubernamental": Dependencias gubernamentales y curso para servidores públicos
 * - "exploracion": Jornada de cierre Día de la Exploración (2 de julio)
 */
const ACTIVIDADES_DATA = [
    {
        id: "ACT-001",
        visible: true,
        titulo: "Inauguración de Puebla, Capital de la Biodiversidad",
        descripcion: "Arranque oficial del mes de actividades ciudadanas, académicas y culturales rumbo al ICCB 2027 con instituciones poblanas y aliados internacionales.",
        tipo: "universidad_ong",
        tipoEtiqueta: "Universidad / ONG",
        categoriaMapa: "actividades",
        publico: "todos",
        publicoEtiqueta: "Todo público",
        fecha: "2027-06-07",
        fechaTexto: "Lunes 7 de junio de 2027",
        horario: "10:00 – 12:30 h",
        ubicacion: "Edificio Carolino BUAP, Centro Histórico",
        zona: "Centro Histórico",
        coords: [19.0428, -98.1965],
        organizador: "BUAP · Comité Local ICCB 2027 · SCB",
        idioma: "Bilingüe",
        costo: "Gratuito",
        costoDetalle: "Entrada libre con registro previo",
        accesibilidad: "Acceso con rampas, intérprete de LSM y asientos preferentes",
        contacto: "programa@iccb2027puebla.mx",
        registroUrl: "participa.html#seccion-formularios",
        enlaceComoLlegar: "https://www.google.com/maps/search/?api=1&query=19.0428,-98.1965",
        estado: "confirmada",
        fuenteVerificacion: "Comité Organizador BUAP",
        fechaVerificacion: "2026-11-01"
    },
    {
        id: "ACT-002",
        visible: true,
        titulo: "Curso Ambiental para Servidores Públicos y Gestión Municipal",
        descripcion: "Capacitación práctica en biodiversidad urbana, infraestructura verde, arbolado nativo y criterios de conservación para personal de dependencias gubernamentales.",
        tipo: "gubernamental",
        tipoEtiqueta: "Actividad gubernamental",
        categoriaMapa: "actividades",
        publico: "individual",
        publicoEtiqueta: "Servidores públicos / Individual",
        fecha: "2027-06-11",
        fechaTexto: "Viernes 11 de junio de 2027",
        horario: "09:00 – 14:00 h",
        ubicacion: "Complejo Cultural Universitario (CCU) BUAP",
        zona: "Zona Angelópolis / CCU",
        coords: [19.0196, -98.2401],
        organizador: "Secretaría de Medio Ambiente · Instituto de Ciencias BUAP",
        idioma: "Español",
        costo: "Gratuito",
        costoDetalle: "Gratuito con constancia institucional",
        accesibilidad: "Elevadores, estacionamiento accesible y material digital legible",
        contacto: "capacitacion@iccb2027puebla.mx",
        registroUrl: "participa.html#seccion-formularios",
        enlaceComoLlegar: "https://www.google.com/maps/search/?api=1&query=19.0196,-98.2401",
        estado: "confirmada",
        fuenteVerificacion: "Dirección de Desarrollo Sustentable BUAP",
        fechaVerificacion: "2026-11-02"
    },
    {
        id: "ACT-003",
        visible: true,
        titulo: "Exposición: Talavera y Ecosistemas — Un Diálogo Biocultural",
        descripcion: "Muestra museográfica que conecta la iconografía tradicional de aves, insectos y flora poblana en la cerámica de Talavera con la ciencia de la conservación actual.",
        tipo: "exposiciones_cultura",
        tipoEtiqueta: "Exposiciones y cultura",
        categoriaMapa: "cultura",
        publico: "familias",
        publicoEtiqueta: "Familias y todo público",
        fecha: "2027-06-14",
        fechaTexto: "14 de junio al 2 de julio de 2027",
        horario: "10:00 – 18:00 h",
        ubicacion: "Museo Amparo, 2 Sur 708, Centro Histórico",
        zona: "Centro Histórico",
        coords: [19.0406, -98.1984],
        organizador: "Museo Amparo · Colectivo de Maestros Talaveranos",
        idioma: "Bilingüe",
        costo: "Gratuito",
        costoDetalle: "Acceso gratuito presentando código ICCB Ciudadano",
        accesibilidad: "Rampas, elevador en todas las salas y cédulas en español/inglés",
        contacto: "cultura@iccb2027puebla.mx",
        registroUrl: "participa.html#seccion-formularios",
        enlaceComoLlegar: "https://www.google.com/maps/search/?api=1&query=19.0406,-98.1984",
        estado: "confirmada",
        fuenteVerificacion: "Coordinación de Cultura ICCB",
        fechaVerificacion: "2026-11-03"
    },
    {
        id: "ACT-004",
        visible: true,
        titulo: "Taller Familiar: Jardines para Polinizadores y Hoteles de Insectos",
        descripcion: "Aprende qué plantas nativas sembrar en balcones, escuelas y patios poblanos para alimentar colibríes, mariposas y abejas nativas sin aguijón.",
        tipo: "cursos_talleres",
        tipoEtiqueta: "Cursos y talleres",
        categoriaMapa: "biodiversidad",
        publico: "familias",
        publicoEtiqueta: "Familias, niñas, niños y jóvenes",
        fecha: "2027-06-19",
        fechaTexto: "Sábado 19 de junio de 2027",
        horario: "10:30 – 13:00 h",
        ubicacion: "Jardín Botánico Universitario BUAP, Ciudad Universitaria",
        zona: "Ciudad Universitaria BUAP",
        coords: [18.9985, -98.1980],
        organizador: "Jardín Botánico Universitario BUAP",
        idioma: "Español",
        costo: "Gratuito",
        costoDetalle: "Incluye materiales y plántula nativa (cupo 40 personas)",
        accesibilidad: "Senderos planos accesibles para carriolas y sillas de ruedas",
        contacto: "jardinbotanico@iccb2027puebla.mx",
        registroUrl: "participa.html#seccion-formularios",
        enlaceComoLlegar: "https://www.google.com/maps/search/?api=1&query=18.9985,-98.1980",
        estado: "confirmada",
        fuenteVerificacion: "Jardín Botánico BUAP",
        fechaVerificacion: "2026-11-04"
    },
    {
        id: "ACT-005",
        visible: true,
        titulo: "Recorrido Guiado: Murales de Cholula y Biodiversidad Mesoamericana",
        descripcion: "Caminata interpretativa por San Andrés y San Pedro Cholula explorando el Mural de los Bebedores, flora ritual ancestral y proyectos actuales de rescate de milpa.",
        tipo: "rutas_recorridos",
        tipoEtiqueta: "Rutas y recorridos",
        categoriaMapa: "rutas_urbanas",
        publico: "visitantes_congreso",
        publicoEtiqueta: "Visitantes del congreso y familias",
        fecha: "2027-06-25",
        fechaTexto: "Viernes 25 de junio de 2027",
        horario: "09:00 – 13:30 h",
        ubicacion: "Zona Arqueológica y Centro de Cholula",
        zona: "Cholula",
        coords: [19.0575, -98.3018],
        organizador: "UDLAP · Colectivo Cholula Viva",
        idioma: "Bilingüe",
        costo: "Con cuota",
        costoDetalle: "$120 MXN (incluye acceso y guía bilingüe)",
        accesibilidad: "Recorrido peatonal de dificultad baja (2.5 km); se recomienda calzado cómodo",
        contacto: "rutas@iccb2027puebla.mx",
        registroUrl: "participa.html#seccion-formularios",
        enlaceComoLlegar: "https://www.google.com/maps/search/?api=1&query=19.0575,-98.3018",
        estado: "proximamente",
        fuenteVerificacion: "Comité de Rutas Bioculturales",
        fechaVerificacion: "2026-11-04"
    },
    {
        id: "ACT-006",
        visible: true,
        titulo: "Presentación Final de Proyectos: Laboratorio de Conservación Creativa",
        descripcion: "Equipos interdisciplinarios de estudiantes universitarios presentan sus prototipos de arte, diseño, tecnología y comunicación para resolver retos reales de conservación en Puebla.",
        tipo: "universidad_ong",
        tipoEtiqueta: "Universidad / ONG",
        categoriaMapa: "actividades",
        publico: "estudiantes",
        publicoEtiqueta: "Estudiantes, profesores y organizaciones",
        fecha: "2027-06-28",
        fechaTexto: "Lunes 28 de junio de 2027",
        horario: "11:00 – 15:00 h",
        ubicacion: "Centro de Convenciones de Puebla / Sede ICCB",
        zona: "Centro Histórico",
        coords: [19.0459, -98.1912],
        organizador: "Laboratorio de Conservación Creativa · Consorcio Universitario de Puebla",
        idioma: "Bilingüe",
        costo: "Gratuito",
        costoDetalle: "Entrada libre con registro",
        accesibilidad: "Auditorio con accesibilidad universal, subtitulado en pantalla y LSM",
        contacto: "laboratorio@iccb2027puebla.mx",
        registroUrl: "ccl.html#registro-laboratorio",
        enlaceComoLlegar: "https://www.google.com/maps/search/?api=1&query=19.0459,-98.1912",
        estado: "confirmada",
        fuenteVerificacion: "Coordinación del Laboratorio de Conservación Creativa",
        fechaVerificacion: "2026-11-05"
    },
    {
        id: "ACT-007",
        visible: true,
        titulo: "Cata Biocultural: Café de Sombra y Miel de Abeja Melipona",
        descripcion: "Experiencia sensorial con productoras de la Sierra Norte de Puebla: descubre cómo el café bajo sombra protege aves migratorias y el bosque de niebla.",
        tipo: "gastronomia",
        tipoEtiqueta: "Gastronomía",
        categoriaMapa: "gastronomia",
        publico: "todos",
        publicoEtiqueta: "Todo público y asistentes al congreso",
        fecha: "2027-06-29",
        fechaTexto: "Martes 29 de junio de 2027",
        horario: "17:00 – 19:00 h",
        ubicacion: "Casa Barroca / Cafetería Aliada, 7 Oriente, Centro Histórico",
        zona: "Centro Histórico",
        coords: [19.0414, -98.1960],
        organizador: "Red de Cafetales Sustentables & Cooperativa Tosepan",
        idioma: "Bilingüe",
        costo: "Con cuota",
        costoDetalle: "$180 MXN degustación completa",
        accesibilidad: "Planta baja accesible desde calle peatonal",
        contacto: "sabores@iccb2027puebla.mx",
        registroUrl: "menu.html",
        enlaceComoLlegar: "https://www.google.com/maps/search/?api=1&query=19.0414,-98.1960",
        estado: "confirmada",
        fuenteVerificacion: "Comité de Sabores de la Biodiversidad",
        fechaVerificacion: "2026-11-05"
    },
    {
        id: "ACT-008",
        visible: true,
        titulo: "Ciclo de Cine Documental: Bosques de Agua y Volcanes",
        descripcion: "Proyección al aire libre y conversatorio con cineastas comunitarios y biólogos sobre los ecosistemas del Popocatépetl, Iztaccíhuatl y La Malinche.",
        tipo: "exposiciones_cultura",
        tipoEtiqueta: "Exposiciones y cultura",
        categoriaMapa: "cultura",
        publico: "todos",
        publicoEtiqueta: "Todo público",
        fecha: "2027-06-30",
        fechaTexto: "Miércoles 30 de junio de 2027",
        horario: "18:30 – 20:30 h",
        ubicacion: "Sala Luis Buñuel · Casa de la Cultura de Puebla (5 Oriente 5)",
        zona: "Centro Histórico",
        coords: [19.0422, -98.1979],
        organizador: "Cinemateca Luis Buñuel · Pronatura",
        idioma: "Bilingüe",
        costo: "Gratuito",
        costoDetalle: "Entrada libre hasta completar aforo",
        accesibilidad: "Subtítulos en español e inglés; acceso en planta baja",
        contacto: "cultura@iccb2027puebla.mx",
        registroUrl: "participa.html#seccion-formularios",
        enlaceComoLlegar: "https://www.google.com/maps/search/?api=1&query=19.0422,-98.1979",
        estado: "proximamente",
        fuenteVerificacion: "Casa de la Cultura Puebla",
        fechaVerificacion: "2026-11-05"
    },
    {
        id: "ACT-009",
        visible: true,
        titulo: "Taller de Ciencia Ciudadana: Observación de Aves con iNaturalist y eBird",
        descripcion: "Recorrido matutino para aprender a registrar aves urbanas y contribuir a la base mundial de biodiversidad de Puebla durante el congreso.",
        tipo: "cursos_talleres",
        tipoEtiqueta: "Cursos y talleres",
        categoriaMapa: "biodiversidad",
        publico: "individual",
        publicoEtiqueta: "Participación individual, jóvenes y estudiantes",
        fecha: "2027-07-01",
        fechaTexto: "Jueves 1 de julio de 2027",
        horario: "07:30 – 10:30 h",
        ubicacion: "Parque Ecológico Revolución Mexicana, Puebla",
        zona: "Centro Histórico",
        coords: [19.0315, -98.1842],
        organizador: "CONABIO · Club de Observadores de Aves de Puebla",
        idioma: "Bilingüe",
        costo: "Gratuito",
        costoDetalle: "Actividad gratuita; préstamo de binoculares disponible",
        accesibilidad: "Andadores pavimentados planos",
        contacto: "cienciaciudadana@iccb2027puebla.mx",
        registroUrl: "participa.html#seccion-formularios",
        enlaceComoLlegar: "https://www.google.com/maps/search/?api=1&query=19.0315,-98.1842",
        estado: "propuesta",
        fuenteVerificacion: "Propuesta en evaluación técnica",
        fechaVerificacion: "2026-11-06"
    },
    {
        id: "ACT-010",
        visible: true,
        titulo: "Día de la Exploración · Gran Jornada Pública de Cierre",
        descripcion: "Feria pública de ciencias ambientales, stands interactivos de universidades y ONG, rutas bioculturales y talleres vivos para celebrar la clausura de Puebla, Capital de la Biodiversidad.",
        tipo: "exploracion",
        tipoEtiqueta: "Día de la Exploración",
        categoriaMapa: "exploracion",
        publico: "todos",
        publicoEtiqueta: "Familias, estudiantes y todo público",
        fecha: "2027-07-02",
        fechaTexto: "Viernes 2 de julio de 2027",
        horario: "08:00 – 18:00 h",
        ubicacion: "Zócalo de Puebla y Corredor Centro Histórico",
        zona: "Centro Histórico",
        coords: [19.0437, -98.1983],
        organizador: "BUAP · SCB · Universidades y Aliados de Puebla",
        idioma: "Bilingüe",
        costo: "Gratuito",
        costoDetalle: "Todas las actividades son 100% gratuitas",
        accesibilidad: "Módulos con rampa, intérpretes de LSM, punto de hidratación y zona de descanso",
        contacto: "exploracion@iccb2027puebla.mx",
        registroUrl: "exploracion.html#preregistro-asistentes",
        enlaceComoLlegar: "https://www.google.com/maps/search/?api=1&query=19.0437,-98.1983",
        estado: "confirmada",
        fuenteVerificacion: "Comité Central ICCB 2027",
        fechaVerificacion: "2026-11-06"
    }
];

/**
 * ==============================================================================
 * SABORES DE LA BIODIVERSIDAD
 * ==============================================================================
 * Las experiencias gastronómicas aparecen como disponibles solo cuando el establecimiento y las fechas están confirmados."
 */
const SABORES_DATA = [
    {
        id: "SAB-001",
        visible: true,
        nombrePlatillo: "Café de Sombra de la Sierra Norte y Pan de Maíz Azul",
        establecimiento: "Cafetería El Patio de los Azulejos",
        tipo: "Cafetería y barra de especialidad",
        icono: "assets/img/Logo Animals__Logo_Armadilo.png",
        descripcion: "Café arábica cultivado bajo dosel de bosque mesófilo en Cuetzalan que conserva el hábitat de aves migratorias, acompañado de repostería con maíz criollo.",
        ubicacion: "Av. 3 Poniente 312, Centro Histórico, Puebla",
        coords: [19.0439, -98.2005],
        horario: "Lunes a domingo · 08:30 – 20:30 h",
        precio: "$95 – $180 MXN",
        fechasConfirmadas: "7 de junio al 2 de julio de 2027",
        establecimientoConfirmado: true,
        fechasValidadas: true,
        estado: "confirmada",
        enlaceMapa: "https://www.google.com/maps/search/?api=1&query=19.0439,-98.2005"
    },
    {
        id: "SAB-002",
        visible: true,
        nombrePlatillo: "Mole Poblano Tradicional con Quelites de Milpa Sustentable",
        establecimiento: "Restaurante La Casona del Quelite",
        tipo: "Restaurante de cocina patrimonial",
        icono: "assets/img/Logo Animals__Logo_cacomixtle.png",
        descripcion: "Mole elaborado con chiles poblanos nativos (mulato, pasilla y chilhuacle), cacao criollo agroforestal y guarnición de quelites cultivados en milpa tradicional.",
        ubicacion: "Calle 6 Sur 404, Barrio de los Sapos, Centro Histórico",
        coords: [19.0412, -98.1951],
        horario: "Martes a domingo · 13:00 – 21:00 h",
        precio: "$240 – $380 MXN",
        fechasConfirmadas: "14 de junio al 2 de julio de 2027",
        establecimientoConfirmado: true,
        fechasValidadas: true,
        estado: "confirmada",
        enlaceMapa: "https://www.google.com/maps/search/?api=1&query=19.0412,-98.1951"
    },
    {
        id: "SAB-003",
        visible: true,
        nombrePlatillo: "Degustación de Mieles de Abeja Melipona (Pisilnekmej) e Infusiones",
        establecimiento: "Salón Botánico Tosepan · Sede Invitada",
        tipo: "Experiencia gastronómica y bebidas",
        icono: "assets/img/Logo Animals__Logo_Teporingo.png",
        descripcion: "Bebidas refrescantes e infusiones herbales endulzadas con miel virgen de abeja nativa sin aguijón manejada en ollas de barro por cooperativas totonacas y nahuas.",
        ubicacion: "Calle 5 Oriente 208, Centro Histórico",
        coords: [19.0420, -98.1968],
        horario: "Viernes a domingo · 11:00 – 19:00 h",
        precio: "$110 – $220 MXN",
        fechasConfirmadas: "Fechas en proceso de confirmación con el establecimiento",
        establecimientoConfirmado: true,
        fechasValidadas: false,
        estado: "proximamente",
        enlaceMapa: "https://www.google.com/maps/search/?api=1&query=19.0420,-98.1968"
    },
    {
        id: "SAB-004",
        visible: true,
        nombrePlatillo: "Menú de Temporada: Hongos Comestibles de Cultura Forestal y Tlacoyos",
        establecimiento: "Cocina de Humo Malintzi (En evaluación)",
        tipo: "Restaurante / Cocina tradicional",
        icono: "assets/img/Logo Animals__Logo_Colibri.png",
        descripcion: "Propuesta gastronómica con hongos cultivados de forma sustentable y maíces nativos de San Miguel Canoa. Sujeta a verificación de trazabilidad ecológica.",
        ubicacion: "San Andrés Cholula, Puebla",
        coords: [19.0540, -98.2980],
        horario: "Por definir",
        precio: "$150 – $280 MXN (estimado)",
        fechasConfirmadas: "En evaluación por el comité científico-gastronómico",
        establecimientoConfirmado: false,
        fechasValidadas: false,
        estado: "propuesta",
        enlaceMapa: "https://www.google.com/maps/search/?api=1&query=19.0540,-98.2980"
    }
];

/**
 * ==============================================================================
 * BUSCADOR DE STANDS DEL DÍA DE LA EXPLORACIÓN (2 DE JULIO DE 2027)
 * ==============================================================================
 * "Buscador de stands o puntos de exploración: nombre, organización, tema,descripción, ubicación, horario, público y actividades."
 */
const STANDS_EXPLORACION_DATA = [
    {
        id: "STD-01",
        nombre: "Guardianes de los Volcanes: El Conejo Teporingo",
        organizacion: "Instituto de Ciencias BUAP · Laboratorio de Mastozoología",
        tema: "Especies endémicas y ecosistemas de alta montaña",
        categoriaTema: "fauna",
        descripcion: "Conoce al zacatuche o teporingo, el conejo más pequeño de México que habita en los pastizales alpinos de nuestros volcanes.",
        ubicacion: "Zócalo de Puebla · Zona A (Frente a Catedral), Stand 01",
        coords: [19.0432, -98.1984],
        horario: "08:00 – 18:00 h",
        publico: "Familias, niñas, niños y todo público",
        actividades: "Moldes de huellas en arcilla, observación de cráneos al microscopio y lotería de fauna volcánica.",
        estado: "confirmada"
    },
    {
        id: "STD-02",
        nombre: "Abejas sin Aguijón y Polinizadores Urbanos",
        organizacion: "Jardín Botánico Universitario BUAP & Cooperativa Masehual",
        tema: "Polinizadores, flora nativa y agroecología",
        categoriaTema: "polinizadores",
        descripcion: "Observa de cerca un meliponario didáctico y aprende a distinguir abejas nativas mexicanas de la abeja europea.",
        ubicacion: "Zócalo de Puebla · Zona B (Fuente de San Miguel), Stand 05",
        coords: [19.0438, -98.1980],
        horario: "09:00 – 17:30 h",
        publico: "Todo público y escuelas",
        actividades: "Armado de bombas de semillas nativas, guía ilustrada de plantas para balcones y cata de polen.",
        estado: "confirmada"
    },
    {
        id: "STD-03",
        nombre: "El Agua que Bebemos: Cuencas del Atoyac y Bosques de Niebla",
        organizacion: "IBERO Puebla · Red Ciudadana por el Río Atoyac",
        tema: "Agua, cuencas hidrológicas y restauración ecológica",
        categoriaTema: "agua",
        descripcion: "Maqueta interactiva de la cuenca del Alto Atoyac que muestra cómo los bosques filtran el agua de la ciudad de Puebla.",
        ubicacion: "Zócalo de Puebla · Zona C (Portal Hidalgo), Stand 09",
        coords: [19.0442, -98.1985],
        horario: "08:30 – 18:00 h",
        publico: "Jóvenes, estudiantes y familias",
        actividades: "Experimentos de filtración natural de agua, monitoreo con bioindicadores acuáticos y mapa comunitario.",
        estado: "confirmada"
    },
    {
        id: "STD-04",
        nombre: "Tintes Naturales, Barro y Biodiversidad Textil",
        organizacion: "Barrio del Artista · Colectivo de Artesanas de la Sierra Norte",
        tema: "Arte biocultural, grana cochinilla y añil",
        categoriaTema: "cultura",
        descripcion: "Taller vivo donde maestras artesanas demuestran cómo las plantas, cortezas e insectos dan color a los textiles tradicionales poblanos.",
        ubicacion: "Plazuela del Barrio del Artista · Punto de Exploración 12",
        coords: [19.0425, -98.1942],
        horario: "10:00 – 16:30 h",
        publico: "Familias y visitantes del congreso",
        actividades: "Demostración de teñido con grana cochinilla, pericón y añil; pintura en barro con pigmentos minerales.",
        estado: "proximamente"
    },
    {
        id: "STD-05",
        nombre: "Bioacústica: Los Sonidos Ocultos de la Noche Poblana",
        organizacion: "UDLAP · Sociedad Científica Juvenil",
        tema: "Murciélagos, aves nocturnas y tecnología para la conservación",
        categoriaTema: "fauna",
        descripcion: "Escucha con detectores ultrasónicos cómo los murciélagos controlan plagas y polinizan los agaves de Puebla.",
        ubicacion: "Edificio Carolino · Patio Central, Punto de Exploración 15",
        coords: [19.0428, -98.1965],
        horario: "10:00 – 18:00 h",
        publico: "Estudiantes, niñas, niños y curiosos",
        actividades: "Cabina inmersiva de paisajes sonoros de Puebla y juego de adivinanza de cantos de aves y anfibios.",
        estado: "confirmada"
    },
    {
        id: "STD-06",
        nombre: "Milpa y Agrobiodiversidad: Maíces de Colores de Puebla",
        organizacion: "UPAEP · Red de Custodios de Semillas Nativas",
        tema: "Soberanía alimentaria y agrobiodiversidad",
        categoriaTema: "agroecologia",
        descripcion: "Muestra viva de más de 20 variedades de maíz nativo poblano, frijoles, calabazas y quelites que conviven en el sistema milpa.",
        ubicacion: "Zócalo de Puebla · Zona B, Stand 07",
        coords: [19.0435, -98.1977],
        horario: "09:00 – 17:00 h",
        publico: "Todo público",
        actividades: "Muestrario de mazorcas nativas, intercambio de saberes culinarios y recetario gratuito de quelites.",
        estado: "propuesta"
    }
];

/**
 * ==============================================================================
 * FICHAS DE RUTAS Y RECORRIDOS
 * ==============================================================================
 * "Cada ruta debe tener ficha con descripción, punto de inicio, paradas, mapa, duración estimada,recomendaciones y enlaces para llegar.
 */
const RUTAS_DATA = {
    centro: {
        id: "RUT-01",
        key: "centro",
        nombre: "Ruta Urbana: Centro Histórico y Polinizadores",
        categoria: "rutas_urbanas",
        categoriaEtiqueta: "Ruta Urbana · Patrimonio y Naturaleza",
        estado: "confirmada",
        color: "#003366",
        descripcion: "Recorrido caminable de 3 km por patios virreinales, templos barrocos, arte en Talavera con motivos naturales y jardines urbanos para polinizadores.",
        puntoInicio: "Fuente de San Miguel, Zócalo de Puebla",
        duracionEstimada: "2 horas 30 minutos (caminata suave)",
        distancia: "3.0 km",
        recomendaciones: "Llevar calzado cómodo para adoquín, sombrero o gorra, botella de agua reutilizable y cámara. Ruta 100% peatonal.",
        enlaceComoLlegar: "https://www.google.com/maps/dir/?api=1&origin=19.0437,-98.1983&destination=19.0425,-98.1942&travelmode=walking",
        puntos: [
            {
                nombre: "1. Zócalo de Puebla (Punto de Inicio)",
                coords: [19.0437, -98.1983],
                categoriaMapa: "rutas_urbanas",
                tipo: "Biodiversidad Urbana",
                estado: "confirmada",
                desc: "Jardines históricos arbolados, observación de aves residentes y punto central del Día de la Exploración.",
                enlaceMapa: "https://www.google.com/maps/search/?api=1&query=19.0437,-98.1983"
            },
            {
                nombre: "2. Capilla del Rosario y Templo de Santo Domingo",
                coords: [19.0457, -98.2001],
                categoriaMapa: "cultura",
                tipo: "Patrimonio y Flora Barroca",
                estado: "confirmada",
                desc: "Estudio de las representaciones de flora, vides, mazorcas y aves talladas en estuco dorado novohispano.",
                enlaceMapa: "https://www.google.com/maps/search/?api=1&query=19.0457,-98.2001"
            },
            {
                nombre: "3. Museo Amparo y Terraza Mirador",
                coords: [19.0406, -98.1984],
                categoriaMapa: "cultura",
                tipo: "Cultura y Paisaje Volcánico",
                estado: "confirmada",
                desc: "Sede de la exposición 'Talavera y Ecosistemas' y mirador panorámico hacia los volcanes Popocatépetl, Iztaccíhuatl y La Malinche.",
                enlaceMapa: "https://www.google.com/maps/search/?api=1&query=19.0406,-98.1984"
            },
            {
                nombre: "4. Barrio del Artista y Corredor de Artesanías",
                coords: [19.0425, -98.1942],
                categoriaMapa: "rutas_urbanas",
                tipo: "Oficios Bioculturales",
                estado: "confirmada",
                desc: "Talleres abiertos de alfarería, fibras vegetales, tintes naturales e ilustración científica.",
                enlaceMapa: "https://www.google.com/maps/search/?api=1&query=19.0425,-98.1942"
            }
        ]
    },
    cholula: {
        id: "RUT-02",
        key: "cholula",
        nombre: "Ruta Cultural: Murales de Cholula y Paisaje Ritual",
        categoria: "rutas_urbanas",
        categoriaEtiqueta: "Ruta Urbana · Cholula Milenaria",
        estado: "confirmada",
        color: "#C59B27",
        descripcion: "Recorrido por la ciudad viva más antigua de América: descubre los murales prehispánicos de Cholula, el parque alrededor de la Gran Pirámide (Tlachihualtépetl) y la agrobiodiversidad cholulteca.",
        puntoInicio: "Entrada de la Zona Arqueológica de Cholula (Museo de Sitio)",
        duracionEstimada: "3 horas 30 minutos",
        distancia: "3.8 km",
        recomendaciones: "Usar protector solar biodegradable, gorra y calzado para terracería y escalinatas. Se recomienda llegar por la mañana.",
        enlaceComoLlegar: "https://www.google.com/maps/dir/?api=1&origin=19.0592,-98.3035&destination=19.0575,-98.3018&travelmode=walking",
        puntos: [
            {
                nombre: "1. Museo de Sitio y Mural de los Chapulines",
                coords: [19.0592, -98.3035],
                categoriaMapa: "cultura",
                tipo: "Iconografía Prehispánica",
                estado: "confirmada",
                desc: "Punto de inicio: simbolismo de los insectos y la fertilidad de la tierra en la pintura mural mesoamericana.",
                enlaceMapa: "https://www.google.com/maps/search/?api=1&query=19.0592,-98.3035"
            },
            {
                nombre: "2. Gran Pirámide de Cholula y Patio de los Altares",
                coords: [19.0575, -98.3018],
                categoriaMapa: "rutas_urbanas",
                tipo: "Patrimonio Biocultural",
                estado: "confirmada",
                desc: "Explicación del Mural de los Bebedores y la relación sagrada con el maguey, el pulque y los polinizadores nocturnos.",
                enlaceMapa: "https://www.google.com/maps/search/?api=1&query=19.0575,-98.3018"
            },
            {
                nombre: "3. Corredor de Murales Urbanos y Mercado de San Pedro",
                coords: [19.0615, -98.3062],
                categoriaMapa: "gastronomia",
                tipo: "Arte Urbano y Semillas",
                estado: "confirmada",
                desc: "Murales contemporáneos sobre el agua y el maíz, concluyendo con degustación de cacao de agua y semillas locales.",
                enlaceMapa: "https://www.google.com/maps/search/?api=1&query=19.0615,-98.3062"
            }
        ]
    },
    naturaleza: {
        id: "RUT-03",
        key: "naturaleza",
        nombre: "Ruta de Biodiversidad: Jardín Botánico y Humedal Universitario",
        categoria: "biodiversidad",
        categoriaEtiqueta: "Biodiversidad · Espacios Naturales",
        estado: "confirmada",
        color: "#1B7A43",
        descripcion: "Explora más de 10 hectáreas dedicadas a la conservación de cactáceas, encinos, plantas medicinales y aves acuáticas dentro de Ciudad Universitaria BUAP.",
        puntoInicio: "Acceso Principal del Jardín Botánico Universitario BUAP",
        duracionEstimada: "2 horas",
        distancia: "2.2 km",
        recomendaciones: "Ideal para observación de aves por la mañana; llevar binoculares si cuentas con ellos y respetar los senderos marcados.",
        enlaceComoLlegar: "https://www.google.com/maps/search/?api=1&query=18.9985,-98.1980",
        puntos: [
            {
                nombre: "1. Jardín Etnobotánico y Farmacia Viviente",
                coords: [18.9985, -98.1980],
                categoriaMapa: "biodiversidad",
                tipo: "Flora Medicinal",
                estado: "confirmada",
                desc: "Colección viva de plantas medicinales y comestibles utilizadas por los pueblos originarios de Puebla.",
                enlaceMapa: "https://www.google.com/maps/search/?api=1&query=18.9985,-98.1980"
            },
            {
                nombre: "2. Colección de Cactáceas de Tehuacán-Cuicatlán",
                coords: [18.9972, -98.1965],
                categoriaMapa: "biodiversidad",
                tipo: "Especies Protegidas",
                estado: "confirmada",
                desc: "Ejemplares rescatados y propagados de la Reserva de la Biosfera Tehuacán-Cuicatlán, Patrimonio Mixto de la Humanidad.",
                enlaceMapa: "https://www.google.com/maps/search/?api=1&query=18.9972,-98.1965"
            },
            {
                nombre: "3. Laguna de San Baltazar y Observatorio de Aves",
                coords: [18.9998, -98.1995],
                categoriaMapa: "biodiversidad",
                tipo: "Humedal Urbano",
                estado: "confirmada",
                desc: "Punto de avistamiento de garzas, patos migratorios, colibríes y tortugas en el humedal universitario.",
                enlaceMapa: "https://www.google.com/maps/search/?api=1&query=18.9998,-98.1995"
            }
        ]
    },
    sierra: {
        id: "RUT-04",
        key: "sierra",
        nombre: "Ruta Regional: Sierra Norte, Bosque de Niebla y Meliponarios",
        categoria: "biodiversidad",
        categoriaEtiqueta: "Ruta Turística · Naturaleza y Cultura",
        estado: "proximamente",
        color: "#5C4300",
        descripcion: "Excursión biocultural a Cuetzalan del Progreso para conocer el manejo indígena del kuojtakiloyan (bosque productivo), cafetales bajo sombra y abejas meliponas.",
        puntoInicio: "Centro de Cuetzalan del Progreso / Salida grupal desde Puebla",
        duracionEstimada: "Jornada completa (8 horas incluyendo traslado)",
        distancia: "4.5 km de sendero ecológico",
        recomendaciones: "Llevar impermeable o chamarra ligera para neblina, botas o tenis antiderrapantes y repelente ecológico.",
        enlaceComoLlegar: "https://www.google.com/maps/search/?api=1&query=20.0185,-97.5230",
        puntos: [
            {
                nombre: "1. Cuetzalan — Finca Agroecológica de Café de Sombra",
                coords: [20.0185, -97.5230],
                categoriaMapa: "gastronomia",
                tipo: "Agroecología",
                estado: "proximamente",
                desc: "Cultivo diversificado de café, pimienta gorda, canela y vainilla bajo árboles nativos.",
                enlaceMapa: "https://www.google.com/maps/search/?api=1&query=20.0185,-97.5230"
            },
            {
                nombre: "2. Meliponario Comunitario Pisilnekmej",
                coords: [20.0150, -97.5190],
                categoriaMapa: "biodiversidad",
                tipo: "Conservación Biocultural",
                estado: "proximamente",
                desc: "Crianza ancestral de la abeja nativa Scaptotrigona mexicana en ollas de barro.",
                enlaceMapa: "https://www.google.com/maps/search/?api=1&query=20.0150,-97.5190"
            },
            {
                nombre: "3. Mirador de Helechos Gigantes y Bosque de Niebla",
                coords: [20.0220, -97.5280],
                categoriaMapa: "biodiversidad",
                tipo: "Ecosistema de Montaña",
                estado: "proximamente",
                desc: "Sendero interpretativo entre helechos arborescentes prehistóricos, bromelias y orquídeas silvestres.",
                enlaceMapa: "https://www.google.com/maps/search/?api=1&query=20.0220,-97.5280"
            }
        ]
    }
};

/**
 * ==============================================================================
 * LABORATORIO DE CONSERVACIÓN CREATIVA — LOS 12 EQUIPOS Y 4 EJES TEMÁTICOS
 * ==============================================================================
 * Información oficial extraída de:
 * https://iccb.viep.com.mx/respaldo/index.php?page=conservation-labs
 * (120 horas por estudiante · 12 equipos · 4 ejes · 72 estudiantes · 12 tutores ·
 *  Enero–mayo 2027 · Universidades: UDLAP, IBERO Puebla, UPAEP y BUAP).
 */
const CCL_EQUIPOS_DATA = [
    // =========================================================================
    // EJE 1 · DISEÑO PARA LA CONSERVACIÓN (3 EQUIPOS)
    // =========================================================================
    {
        id: "CCL-01",
        nombreProyecto: "Equipo 1 · Conservación de Tortugas en Ecuador",
        eje: "Eje 1 · Diseño para la Conservación (3 equipos)",
        universidad: "UDLAP · IBERO Puebla · UPAEP · BUAP (Equipos interuniversitarios)",
        estudiantes: "6 estudiantes interdisciplinarios (conformación por sorteo el 25 de noviembre · 120 horas por estudiante)",
        profesorAsesor: "Profesor asesor experto en Diseño para la Conservación (16 sesiones semanales de asesoría)",
        organizacionColaboradora: "Proyecto específico de conservación de tortugas en Ecuador (vinculado por la Coordinación General)",
        reto: "Desarrollar soluciones aplicadas de diseño y comunicación para un proyecto concreto de conservación de tortugas en Ecuador.",
        productoDesarrollado: "Productos de diseño y comunicación acordados con el profesor asesor según las necesidades del proyecto (entrega: principios de mayo 2027; muestra pública: finales de mayo 2027).",
        imagen: "assets/img/Logo Animals__Logo_Teporingo.png",
        estado: "confirmada",
        enlaceProducto: "https://docs.google.com/forms/d/e/1FAIpQLSeNaShmbtlkITkSmOodgJaD7nTkFuyAS4eptApfbJehxj9HMg/viewform"
    },
    {
        id: "CCL-02",
        nombreProyecto: "Equipo 2 · Proyecto de Conservación Relacionado con África",
        eje: "Eje 1 · Diseño para la Conservación (3 equipos)",
        universidad: "UDLAP · IBERO Puebla · UPAEP · BUAP (Equipos interuniversitarios)",
        estudiantes: "6 estudiantes interdisciplinarios (conformación por sorteo el 25 de noviembre · 120 horas por estudiante)",
        profesorAsesor: "Profesor asesor experto en Diseño para la Conservación (16 sesiones semanales de asesoría)",
        organizacionColaboradora: "Proyecto específico de conservación relacionado con África (identificado durante la preparación del programa)",
        reto: "Trabajar sobre un encargo concreto de conservación en África (no sobre el continente completo), delimitando el alcance comunicativo y visual.",
        productoDesarrollado: "Productos de diseño y comunicación definidos junto con el profesor asesor y validados para la muestra pública de mayo de 2027.",
        imagen: "assets/img/Logo Animals__Logo_Jaguar.png",
        estado: "confirmada",
        enlaceProducto: "https://docs.google.com/forms/d/e/1FAIpQLSeNaShmbtlkITkSmOodgJaD7nTkFuyAS4eptApfbJehxj9HMg/viewform"
    },
    {
        id: "CCL-03",
        nombreProyecto: "Equipo 3 · Proyecto de Conservación Relacionado con Asia",
        eje: "Eje 1 · Diseño para la Conservación (3 equipos)",
        universidad: "UDLAP · IBERO Puebla · UPAEP · BUAP (Equipos interuniversitarios)",
        estudiantes: "6 estudiantes interdisciplinarios (conformación por sorteo el 25 de noviembre · 120 horas por estudiante)",
        profesorAsesor: "Profesor asesor experto en Diseño para la Conservación (16 sesiones semanales de asesoría)",
        organizacionColaboradora: "Proyecto específico de conservación relacionado con Asia (identificado durante la preparación del programa)",
        reto: "Desarrollar una propuesta aplicada de diseño y comunicación para un proyecto concreto de conservación en Asia.",
        productoDesarrollado: "Productos de diseño y comunicación acordados con el profesor asesor para entrega a principios de mayo de 2027.",
        imagen: "assets/img/Logo Animals__Logo_Colibri.png",
        estado: "confirmada",
        enlaceProducto: "https://docs.google.com/forms/d/e/1FAIpQLSeNaShmbtlkITkSmOodgJaD7nTkFuyAS4eptApfbJehxj9HMg/viewform"
    },

    // =========================================================================
    // EJE 2 · GASTRONOMÍA “SABORES QUE CONECTAN” (3 EQUIPOS)
    // =========================================================================
    {
        id: "CCL-04",
        nombreProyecto: "Equipo 1 · Plantas (Atlas Gastronómico de Plantas)",
        eje: "Eje 2 · Gastronomía “Sabores que conectan” (3 equipos)",
        universidad: "UDLAP · IBERO Puebla · UPAEP · BUAP (Equipos interuniversitarios)",
        estudiantes: "6 estudiantes interdisciplinarios (120 horas: 16h asesoría, 8h pláticas, 30h campo, 50h autónomo, 16h cierre)",
        profesorAsesor: "Profesor asesor del eje de Gastronomía y Saberes Bioculturales",
        organizacionColaboradora: "Cocineras tradicionales, productores locales y colaboradores gastronómicos de Puebla",
        reto: "Rescate y comunicación cultural de recetas y saberes gastronómicos relacionados con plantas comestibles, mostrando sus historias, prácticas, temporada y significados culturales.",
        productoDesarrollado: "Recetario o catálogo de plantas comestibles (nombre común y científico, uso gastronómico, temporada, región e historia), fichas informativas, material audiovisual con testimonios, muestra gastronómica y Atlas gastronómico ilustrado o digital consultable mediante QR.",
        imagen: "assets/img/Logo Animals__Logo_Armadilo.png",
        estado: "confirmada",
        enlaceProducto: "menu.html"
    },
    {
        id: "CCL-05",
        nombreProyecto: "Equipo 2 · Insectos (Recetario de Entomofagia Tradicional)",
        eje: "Eje 2 · Gastronomía “Sabores que conectan” (3 equipos)",
        universidad: "UDLAP · IBERO Puebla · UPAEP · BUAP (Equipos interuniversitarios)",
        estudiantes: "6 estudiantes interdisciplinarios (120 horas: 16h asesoría, 8h pláticas, 30h campo, 50h autónomo, 16h cierre)",
        profesorAsesor: "Profesor asesor del eje de Gastronomía y Saberes Bioculturales",
        organizacionColaboradora: "Portadores de saberes culinarios tradicionales y comunidades recolectoras de Puebla",
        reto: "Documentar recetas y saberes relacionados con el consumo tradicional de insectos (seleccionando 3–5 insectos, su preparación tradicional, historia, contexto cultural, ingredientes y técnicas).",
        productoDesarrollado: "Fichas gastronómicas y culturales, material audiovisual de entrevistas y procesos, muestra o degustación de preparaciones y Recetario digital o impreso de entomofagia tradicional con material audiovisual mediante QR.",
        imagen: "assets/img/Logo Animals__Logo_cacomixtle.png",
        estado: "confirmada",
        enlaceProducto: "menu.html"
    },
    {
        id: "CCL-06",
        nombreProyecto: "Equipo 3 · Postres y Bebidas (“Dulces de la Biodiversidad Poblana”)",
        eje: "Eje 2 · Gastronomía “Sabores que conectan” (3 equipos)",
        universidad: "UDLAP · IBERO Puebla · UPAEP · BUAP (Equipos interuniversitarios)",
        estudiantes: "6 estudiantes interdisciplinarios (120 horas: 16h asesoría, 8h pláticas, 30h campo, 50h autónomo, 16h cierre)",
        profesorAsesor: "Profesor asesor del eje de Gastronomía y Saberes Bioculturales",
        organizacionColaboradora: "artesanas/os gastronómicos, productores de frutos, semillas y flores comestibles de Puebla",
        reto: "Crear y documentar una colección de 3–5 postres o bebidas inspirados en ingredientes locales o tradicionales vinculados con la biodiversidad (planta o fruto de temporada, semilla, flor comestible o ingrediente tradicional poco utilizado).",
        productoDesarrollado: "Colección de postres y bebidas “Dulces de la biodiversidad poblana”, fichas de ingredientes, recetas e historia del ingrediente, catálogo o recetario digital y muestra gastronómica para presentación pública.",
        imagen: "assets/img/Logo Animals__Logo_Colibri.png",
        estado: "confirmada",
        enlaceProducto: "menu.html"
    },

    // =========================================================================
    // EJE 3 · ARTESANÍAS Y BIOCULTURA “MANOS QUE CONECTAN” (3 EQUIPOS)
    // =========================================================================
    {
        id: "CCL-07",
        nombreProyecto: "Equipo 1 · Cerería Tradicional y Biodiversidad",
        eje: "Eje 3 · Artesanías y biocultura “Manos que conectan” (3 equipos)",
        universidad: "UDLAP · IBERO Puebla · UPAEP · BUAP (Equipos interuniversitarios)",
        estudiantes: "6 estudiantes interdisciplinarios (120 horas por estudiante · Enero–mayo 2027)",
        profesorAsesor: "Profesor asesor experto en Artesanías, Diseño y Patrimonio Biocultural",
        organizacionColaboradora: "Maestras y maestros artesanos cereros de Puebla",
        reto: "Documentar las prácticas artesanales de la cerería, sus procesos y los conocimientos asociados, incluidos materiales, ceras, ingredientes o elementos naturales y sus relaciones con la biodiversidad, respetando el contexto cultural y la participación de artesanas y artesanos.",
        productoDesarrollado: "Intercambio de saberes, documentación de procesos y materiales de divulgación o exposición pública acordados con el profesor asesor y los artesanos colaboradores.",
        imagen: "assets/img/Logo Animals__Logo_Teporingo.png",
        estado: "confirmada",
        enlaceProducto: "https://docs.google.com/forms/d/e/1FAIpQLSeNaShmbtlkITkSmOodgJaD7nTkFuyAS4eptApfbJehxj9HMg/viewform"
    },
    {
        id: "CCL-08",
        nombreProyecto: "Equipo 2 · Árboles de la Vida de la Mixteca",
        eje: "Eje 3 · Artesanías y biocultura “Manos que conectan” (3 equipos)",
        universidad: "UDLAP · IBERO Puebla · UPAEP · BUAP (Equipos interuniversitarios)",
        estudiantes: "6 estudiantes interdisciplinarios (120 horas por estudiante · Enero–mayo 2027)",
        profesorAsesor: "Profesor asesor experto en Artesanías, Diseño y Patrimonio Biocultural",
        organizacionColaboradora: "Artesanas y artesanos alfareros de la región Mixteca poblana",
        reto: "Documentar la tradición de los Árboles de la vida de la Mixteca, sus procesos de barro y pigmentos, los conocimientos asociados y su vínculo simbólico y material con la biodiversidad regional.",
        productoDesarrollado: "Documentación biocultural de procesos, intercambio de saberes y materiales de divulgación y exposición para la muestra pública de finales de mayo de 2027.",
        imagen: "assets/img/Logo Animals__Logo_Jaguar.png",
        estado: "confirmada",
        enlaceProducto: "https://docs.google.com/forms/d/e/1FAIpQLSeNaShmbtlkITkSmOodgJaD7nTkFuyAS4eptApfbJehxj9HMg/viewform"
    },
    {
        id: "CCL-09",
        nombreProyecto: "Equipo 3 · Textiles de la Sierra Norte",
        eje: "Eje 3 · Artesanías y biocultura “Manos que conectan” (3 equipos)",
        universidad: "UDLAP · IBERO Puebla · UPAEP · BUAP (Equipos interuniversitarios)",
        estudiantes: "6 estudiantes interdisciplinarios (120 horas por estudiante · Enero–mayo 2027)",
        profesorAsesor: "Profesor asesor experto en Artesanías, Diseño y Patrimonio Biocultural",
        organizacionColaboradora: "Colectivos de artesanas y artesanos textiles de la Sierra Norte de Puebla",
        reto: "Documentar las prácticas textiles de la Sierra Norte, sus procesos, iconografía de flora y fauna, fibras y tintes naturales vinculados con la biodiversidad, respetando el contexto cultural de las comunidades.",
        productoDesarrollado: "Documentación de procesos, intercambio de saberes y materiales de divulgación o exposición acordados con las artesanas y el profesor asesor.",
        imagen: "assets/img/Logo Animals__Logo_Armadilo.png",
        estado: "confirmada",
        enlaceProducto: "https://docs.google.com/forms/d/e/1FAIpQLSeNaShmbtlkITkSmOodgJaD7nTkFuyAS4eptApfbJehxj9HMg/viewform"
    },

    // =========================================================================
    // EJE 4 · DOCUMENTALES “HISTORIAS QUE CONECTAN” (3 EQUIPOS)
    // =========================================================================
    {
        id: "CCL-10",
        nombreProyecto: "Equipo 1 · Biodiversidad y Experiencias de Personas que Migran a la Ciudad",
        eje: "Eje 4 · Documentales “Historias que conectan” (3 equipos)",
        universidad: "UDLAP · IBERO Puebla · UPAEP · BUAP (Equipos interuniversitarios)",
        estudiantes: "6 estudiantes interdisciplinarios (producción con dispositivos móviles: teléfono o tableta)",
        profesorAsesor: "Profesor experto en narrativa audiovisual y documental",
        organizacionColaboradora: "Habitantes y comunidades migrantes en la ciudad de Puebla",
        reto: "Explorar y narrar las relaciones con la biodiversidad, memorias del territorio y saberes bioculturales a través de las experiencias de personas que migran a la ciudad.",
        productoDesarrollado: "Cortometraje documental de 5–9 minutos creado con dispositivos móviles (incluye investigación, guion, producción, edición y validación para muestra pública).",
        imagen: "assets/img/Logo Animals__Logo_Colibri.png",
        estado: "confirmada",
        enlaceProducto: "https://docs.google.com/forms/d/e/1FAIpQLSeNaShmbtlkITkSmOodgJaD7nTkFuyAS4eptApfbJehxj9HMg/viewform"
    },
    {
        id: "CCL-11",
        nombreProyecto: "Equipo 2 · Percepciones de la Biodiversidad entre Quienes Viven en la Ciudad",
        eje: "Eje 4 · Documentales “Historias que conectan” (3 equipos)",
        universidad: "UDLAP · IBERO Puebla · UPAEP · BUAP (Equipos interuniversitarios)",
        estudiantes: "6 estudiantes interdisciplinarios (producción con dispositivos móviles: teléfono o tableta)",
        profesorAsesor: "Profesor experto en narrativa audiovisual y documental",
        organizacionColaboradora: "Ciudadanía y colectivos urbanos de Puebla",
        reto: "Retratar cómo perciben, entienden y se relacionan con la biodiversidad cotidiana las personas que habitan en la ciudad de Puebla.",
        productoDesarrollado: "Cortometraje documental de 5–9 minutos creado con dispositivos móviles (incluye investigación, guion, producción, edición y validación para muestra pública).",
        imagen: "assets/img/Logo Animals__Logo_cacomixtle.png",
        estado: "confirmada",
        enlaceProducto: "https://docs.google.com/forms/d/e/1FAIpQLSeNaShmbtlkITkSmOodgJaD7nTkFuyAS4eptApfbJehxj9HMg/viewform"
    },
    {
        id: "CCL-12",
        nombreProyecto: "Equipo 3 · Los Huehues en Huejotzingo y Conservación de Animales",
        eje: "Eje 4 · Documentales “Historias que conectan” (3 equipos)",
        universidad: "UDLAP · IBERO Puebla · UPAEP · BUAP (Equipos interuniversitarios)",
        estudiantes: "6 estudiantes interdisciplinarios (producción con dispositivos móviles: teléfono o tableta)",
        profesorAsesor: "Profesor experto en narrativa audiovisual y documental",
        organizacionColaboradora: "Comunidad y cuadrillas de Huehues en Huejotzingo, Puebla",
        reto: "Documentar el diálogo entre la tradición cultural de los Huehues en Huejotzingo y los retos actuales de conservación de animales y fauna silvestre.",
        productoDesarrollado: "Cortometraje documental de 5–9 minutos creado con dispositivos móviles (incluye investigación, guion, producción, edición y validación para muestra pública).",
        imagen: "assets/img/Logo Animals__Logo_Jaguar.png",
        estado: "confirmada",
        enlaceProducto: "https://docs.google.com/forms/d/e/1FAIpQLSeNaShmbtlkITkSmOodgJaD7nTkFuyAS4eptApfbJehxj9HMg/viewform"
    }
];

