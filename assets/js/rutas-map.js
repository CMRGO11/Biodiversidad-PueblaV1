/**
 * ==============================================================================
 * RUTAS BIOCULTURALES - MAPA INTERACTIVO CON LEAFLET Y OPENSTREETMAP
 * ICCB 2027 Puebla · BUAP
 * ==============================================================================
 * Este archivo controla la lógica interactiva del mapa:
 * 1. Definición de coordenadas y datos bioculturales de cada parada.
 * 2. Inicialización del lienzo Leaflet sobre el div #rutas-map.
 * 3. Creación de marcadores personalizados (pines de color con número).
 * 4. Trazado de líneas poligonales (polylines) para unir las paradas.
 * 5. Filtro dinámico por circuito (Todas, Centro, Sierra Norte, Valsequillo).
 * 6. Vinculación con los botones de las tarjetas para navegar y abrir popups.
 */

// Espera a que el navegador termine de cargar el HTML antes de ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
    
    // Obtener el elemento HTML contenedor del mapa
    const mapElement = document.getElementById('rutas-map');
    
    // Si no existe el contenedor o la librería Leaflet no cargó, salir para evitar errores
    if (!mapElement || typeof L === 'undefined') return;

    /* --------------------------------------------------------------------------
     * 1. BASE DE DATOS DE CIRCUITOS Y PARADAS BIOCULTURALES
     * Cada ruta cuenta con id, nombre, color temático, distancia estimada,
     * coordenadas de centro y la lista de paradas con latitud y longitud.
     * -------------------------------------------------------------------------- */
    const routesData = {
        // --- RUTA 1: CENTRO HISTÓRICO DE PUEBLA ---
        centro: {
            id: 'centro',
            name: 'Ruta del Centro Histórico',
            color: '#2B4C8C', // Azul Talavera
            badgeClass: 'propuesta',
            badgeText: 'Demo · Caminable',
            distance: '3.0 km · 2 h a pie',
            description: 'Recorrido biocultural por patios virreinales, templos barrocos, jardines de polinizadores y tradición viva de Talavera.',
            center: [19.0435, -98.1975], // Centro en el corazón de Puebla
            zoom: 16,
            stops: [
                {
                    number: 1,
                    title: 'Zócalo y Catedral de Puebla',
                    category: 'Biodiversidad Urbana & Historia',
                    coords: [19.0428, -98.1984], // [Latitud, Longitud]
                    desc: 'Punto neurálgico cívico y biocultural. Arbolado patrimonial con fresnos y jacarandas, refugio de aves urbanas y centro de reunión ciudadana.',
                    highlight: 'Árboles patrimoniales & avifauna urbana'
                },
                {
                    number: 2,
                    title: 'Templo de Santo Domingo y Capilla del Rosario',
                    category: 'Patrimonio & Talavera',
                    coords: [19.0454, -98.2001],
                    desc: 'Máxima expresión del barroco novohispano. Elementos ornamentales que reflejan flora y fauna nativa entrelazados con azulejería poblana.',
                    highlight: 'Iconografía floral y dorado barroco'
                },
                {
                    number: 3,
                    title: 'Edificio Carolino (BUAP)',
                    category: 'Patrimonio Universitario',
                    coords: [19.0431, -98.1963],
                    desc: 'Emblemática sede histórica de la BUAP. Sus claustros virreinales albergan patios arbolados y especies adaptadas a microclimas de sombra.',
                    highlight: 'Patios virreinales y microclimas'
                },
                {
                    number: 4,
                    title: 'Barrio del Artista y El Parián',
                    category: 'Cultura Viva & Artesanías',
                    coords: [19.0436, -98.1939],
                    desc: 'Talleres tradicionales de Talavera poblana (Patrimonio Cultural Inmaterial UNESCO) y plaza abierta de creadores locales.',
                    highlight: 'Talavera con denominación de origen'
                }
            ]
        },

        // --- RUTA 2: SIERRA NORTE (CUETZALAN) ---
        sierra: {
            id: 'sierra',
            name: 'Ruta de la Sierra Norte',
            color: '#2E7D32', // Verde Bosque
            badgeClass: 'propuesta',
            badgeText: 'Propuesta · Excursión',
            distance: 'Circuito Serrano · 1 Día',
            description: 'Experiencia inmersiva en la Sierra Mágica: cafetales bajo sombra diversificada, apiarios de abeja nativa melipona y bosque de niebla.',
            center: [20.0210, -97.5200], // Centro en Cuetzalan
            zoom: 13,
            stops: [
                {
                    number: 1,
                    title: 'Centro Histórico de Cuetzalan',
                    category: 'Pueblo Mágico Biocultural',
                    coords: [20.0177, -97.5218],
                    desc: 'Arquitectura vernácula entre niebla, callejones empedrados y punto de encuentro de comunidades nahuas y totonacas.',
                    highlight: 'Punto de partida y cultura viva'
                },
                {
                    number: 2,
                    title: 'Finca Cafetalera Agroecológica',
                    category: 'Agroforestería Sustentable',
                    coords: [20.0275, -97.5165],
                    desc: 'Cultivo de café bajo sombra diversificada con dosel nativo. Refugio vital para más de 90 especies de aves migratorias y orquídeas silvestres.',
                    highlight: 'Dosel forestal y café de conservación'
                },
                {
                    number: 3,
                    title: 'Apiario Tradicional Melipona (Pisilnekmej)',
                    category: 'Saberes Ancestrales & Polinizadores',
                    coords: [20.0135, -97.5298],
                    desc: 'Manejo biocultural de la abeja nativa sin aguijón (Scaptotrigona mexicana) por guardianas comunitarias de la tradición náhuatl.',
                    highlight: 'Meliponicultura tradicional'
                },
                {
                    number: 4,
                    title: 'Mirador y Reserva del Bosque de Niebla',
                    category: 'Ecosistema Mesófilo',
                    coords: [20.0345, -97.5085],
                    desc: 'Sendero interpretativo a través del bosque mesófilo de montaña, hogar de helechos arborescentes gigantes y alta concentración de epífitas.',
                    highlight: 'Helechos gigantes y biodiversidad de niebla'
                }
            ]
        },

        // --- RUTA 3: HUMEDALES DE VALSEQUILLO ---
        valsequillo: {
            id: 'valsequillo',
            name: 'Ruta Humedales de Valsequillo',
            color: '#00838F', // Cyan / Teal Humedal
            badgeClass: 'propuesta',
            badgeText: 'Propuesta · Observación de Aves',
            distance: '12 km de ribera · Medio Día',
            description: 'Sitio Ramsar prioritario en el Altiplano Central: santuario de aves acuáticas y migratorias, vegetación riparia y restauración ambiental.',
            center: [18.9220, -98.1700], // Centro en Lago de Valsequillo
            zoom: 13,
            stops: [
                {
                    number: 1,
                    title: 'Parque Estatal Humedal de Valsequillo',
                    category: 'Sitio Ramsar Internacional',
                    coords: [18.9225, -98.1885],
                    desc: 'Área natural protegida y humedal de importancia internacional. Franja clave para el amortiguamiento ambiental de la zona metropolitana.',
                    highlight: 'Zona protegida y ribera natural'
                },
                {
                    number: 2,
                    title: 'Mirador de Aves Acuáticas Migratorias',
                    category: 'Observación y Ciencia Ciudadana',
                    coords: [18.9140, -98.1690],
                    desc: 'Punto estratégico de avistamiento de pelícanos blancos, garzas grises, patos cucharones y playeros durante la temporada de migración.',
                    highlight: 'Avistamiento de más de 120 especies'
                },
                {
                    number: 3,
                    title: 'Centro de Restauración Ecológica y Bosque Xerófilo',
                    category: 'Conservación & Altiplano',
                    coords: [18.9355, -98.1450],
                    desc: 'Proyectos de reforestación con cactáceas, agaves y huizaches nativos adaptados al clima semiárido del valle de Puebla.',
                    highlight: 'Flora nativa del matorral espinoso'
                }
            ]
        }
    };

    /* --------------------------------------------------------------------------
     * 2. INICIALIZACIÓN DEL MAPA LEAFLET
     * Creamos la instancia L.map asociándola al id del elemento HTML
     * -------------------------------------------------------------------------- */
    const initialCenter = [19.0435, -98.1975]; // Coordenadas iniciales (Centro de Puebla)
    const initialZoom = 14;                   // Nivel de zoom inicial

    const map = L.map('rutas-map', {
        center: initialCenter,
        zoom: initialZoom,
        zoomControl: true,       // Muestra botones [+] y [-]
        scrollWheelZoom: false   // Desactiva zoom accidental al deslizar la página
    });

    // Activa el zoom con la rueda del ratón solo cuando el usuario hace clic en el mapa
    map.on('focus', () => map.scrollWheelZoom.enable());
    map.on('click', () => map.scrollWheelZoom.enable());

    /* --------------------------------------------------------------------------
     * 3. CAPA DE TILES (MAPA BASE DE OPENSTREETMAP)
     * Carga las imágenes vectoriales/raster gratuitas de OpenStreetMap
     * -------------------------------------------------------------------------- */
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> · ICCB 2027 Puebla'
    }).addTo(map);

    /* --------------------------------------------------------------------------
     * 4. GRUPOS DE CAPAS
     * Permiten limpiar y redibujar marcadores y líneas fácilmente al filtrar
     * -------------------------------------------------------------------------- */
    const markersGroup = L.layerGroup().addTo(map);
    const polylinesGroup = L.layerGroup().addTo(map);

    /* --------------------------------------------------------------------------
     * 5. GENERADOR DE PINES PERSONALIZADOS (L.divIcon)
     * Construye un pin HTML con forma de gota girada, color temático y número
     * -------------------------------------------------------------------------- */
    function createCustomPin(routeKey, stopNumber, isSelected = false) {
        const routeColor = routesData[routeKey]?.color || '#2B4C8C';
        return L.divIcon({
            className: 'custom-map-pin-container',
            html: `
                <div class="custom-map-pin ${isSelected ? 'is-selected' : ''}" style="--pin-color: ${routeColor}">
                    <span class="pin-number">${stopNumber}</span>
                    <div class="pin-pulse"></div>
                </div>
            `,
            iconSize: [34, 42],    // Tamaño en píxeles del pin
            iconAnchor: [17, 40],  // Punto de anclaje (la punta inferior del pin)
            popupAnchor: [0, -36]  // Posición del popup en relación con el pin
        });
    }

    /* --------------------------------------------------------------------------
     * 6. GENERADOR DE POPUPS INFORMATIVOS
     * Crea la ventana flotante que aparece al hacer clic en cualquier parada
     * -------------------------------------------------------------------------- */
    function createPopupContent(route, stop) {
        return `
            <div class="map-popup-card">
                <div class="map-popup-header">
                    <span class="map-popup-pill" style="background-color: ${route.color}15; color: ${route.color}; border: 1px solid ${route.color}40">
                        Parada ${stop.number} · ${route.name}
                    </span>
                </div>
                <h4 class="map-popup-title">${stop.title}</h4>
                <div class="map-popup-category">${stop.category}</div>
                <p class="map-popup-desc">${stop.desc}</p>
                <div class="map-popup-highlight">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${route.color}" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>${stop.highlight}</span>
                </div>
            </div>
        `;
    }

    /* --------------------------------------------------------------------------
     * 7. FUNCIÓN PRINCIPAL DE RENDERIZADO DEL MAPA
     * Filtra qué rutas se muestran, dibuja sus paradas y traza sus polilíneas
     * -------------------------------------------------------------------------- */
    let currentFilter = 'all';
    const allStopMarkers = []; // Almacena referencias a los marcadores para abrirlos desde botones

    function renderMap(filter = 'all', autoCenter = true) {
        currentFilter = filter;
        
        // Limpiar capas previas
        markersGroup.clearLayers();
        polylinesGroup.clearLayers();
        allStopMarkers.length = 0;

        // Caja de límites geográficos para autoencuadre
        const bounds = L.latLngBounds();

        // Determinar si mostramos todas o solo una ruta
        const keysToDisplay = filter === 'all' 
            ? Object.keys(routesData) 
            : (routesData[filter] ? [filter] : Object.keys(routesData));

        // Recorrer cada ruta activa
        keysToDisplay.forEach(key => {
            const route = routesData[key];
            const routeCoords = [];

            // Añadir cada parada como marcador en el mapa
            route.stops.forEach(stop => {
                const marker = L.marker(stop.coords, {
                    icon: createCustomPin(key, stop.number)
                });

                // Asociar el popup con la información de la parada
                marker.bindPopup(createPopupContent(route, stop), {
                    maxWidth: 320,
                    className: 'custom-leaflet-popup'
                });

                // Abrir popup al hacer clic
                marker.on('click', () => {
                    marker.openPopup();
                });

                markersGroup.addLayer(marker);
                bounds.extend(stop.coords);
                routeCoords.push(stop.coords);

                // Guardar referencia para interacción externa
                allStopMarkers.push({
                    routeKey: key,
                    stopNumber: stop.number,
                    marker: marker
                });
            });

            // Trazar línea de recorrido que une las paradas consecutivamente
            if (routeCoords.length > 1) {
                const polyline = L.polyline(routeCoords, {
                    color: route.color,
                    weight: 4,
                    opacity: 0.8,
                    dashArray: key === 'centro' ? null : '6, 8', // Sólida para centro, punteada para excursiones
                    lineJoin: 'round'
                });
                polylinesGroup.addLayer(polyline);
            }
        });

        // Autoencuadrar el mapa a la zona seleccionada
        if (autoCenter && bounds.isValid()) {
            if (filter === 'all') {
                // Si son todas, centramos con vista agradable en Puebla Centro
                map.setView([19.0435, -98.1975], 14, { animate: true });
            } else {
                // Si es una ruta particular, ajusta la vista a sus coordenadas exactas
                map.fitBounds(bounds, {
                    padding: [50, 50],
                    maxZoom: 16,
                    animate: true
                });
            }
        }

        // Actualizar el texto del banner informativo
        updateSummaryBanner(filter);
    }

    /* --------------------------------------------------------------------------
     * 8. ACTUALIZACIÓN DEL BANNER RESUMEN
     * Muestra el nombre de la ruta, paradas y distancia calculada
     * -------------------------------------------------------------------------- */
    function updateSummaryBanner(filter) {
        const titleEl = document.getElementById('summary-title');
        const stopsEl = document.getElementById('summary-stops');
        const distEl = document.getElementById('summary-distance');

        if (!titleEl || !stopsEl || !distEl) return;

        if (filter === 'all') {
            let totalStops = 0;
            Object.values(routesData).forEach(r => totalStops += r.stops.length);
            titleEl.textContent = 'Todas las Rutas Bioculturales de Puebla';
            stopsEl.textContent = `${totalStops} paradas bioculturales`;
            distEl.textContent = '3 circuitos temáticos (Centro, Sierra, Humedales)';
        } else if (routesData[filter]) {
            const r = routesData[filter];
            titleEl.textContent = r.name;
            stopsEl.textContent = `${r.stops.length} paradas identificadas`;
            distEl.textContent = r.distance;
        }
    }

    // Dibujar el mapa inicialmente con todas las rutas
    renderMap('all', true);

    // Ajusta el tamaño de Leaflet para evitar problemas visuales tras renderizar
    setTimeout(() => {
        map.invalidateSize();
    }, 250);

    /* --------------------------------------------------------------------------
     * 9. FILTROS CON BOTONES SUPERIORES (TABLIST)
     * -------------------------------------------------------------------------- */
    const filterButtons = document.querySelectorAll('.map-filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Actualizar clase activa y atributos ARIA de accesibilidad
            filterButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            // Leer qué ruta se desea ver y renderizarla
            const routeTarget = btn.getAttribute('data-route') || 'all';
            renderMap(routeTarget, true);
        });
    });

    /* --------------------------------------------------------------------------
     * 10. BOTÓN DE CENTRAR PUEBLA / RESET
     * -------------------------------------------------------------------------- */
    const resetBtn = document.getElementById('btn-reset-map');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            const allBtn = document.querySelector('.map-filter-btn[data-route="all"]');
            if (allBtn) {
                filterButtons.forEach(b => b.classList.remove('active'));
                allBtn.classList.add('active');
            }
            renderMap('all', true);
            map.setView([19.0435, -98.1975], 14, { animate: true });
        });
    }

    /* --------------------------------------------------------------------------
     * 11. ENLACE INTERACTIVO DESDE LAS TARJETAS ("Ver en el mapa →")
     * Al dar clic en una tarjeta, se viaja suavemente al mapa, se filtra esa ruta
     * y se abre automáticamente el popup de la parada número 1.
     * -------------------------------------------------------------------------- */
    window.focusRouteOnMap = function(routeKey) {
        if (!routesData[routeKey]) return;

        // Actualizar visualmente qué botón de filtro está activo
        filterButtons.forEach(b => {
            const isMatch = b.getAttribute('data-route') === routeKey;
            b.classList.toggle('active', isMatch);
            b.setAttribute('aria-selected', isMatch ? 'true' : 'false');
        });

        // Renderizar únicamente esa ruta
        renderMap(routeKey, true);

        // Desplazamiento animado suave hasta el mapa
        const mapSection = document.getElementById('mapa-section');
        if (mapSection) {
            mapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Abrir automáticamente el popup de la primera parada
        setTimeout(() => {
            const firstStop = allStopMarkers.find(m => m.routeKey === routeKey && m.stopNumber === 1);
            if (firstStop && firstStop.marker) {
                firstStop.marker.openPopup();
            }
        }, 600);
    };

    // Vincular todos los botones de las tarjetas que tengan el atributo data-focus-route
    document.querySelectorAll('[data-focus-route]').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const targetRoute = trigger.getAttribute('data-focus-route');
            if (targetRoute) {
                window.focusRouteOnMap(targetRoute);
            }
        });
    });
});
