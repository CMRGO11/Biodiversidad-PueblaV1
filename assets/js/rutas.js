/**
 * ==============================================================================
 * 1. INTEGRA LAS 6 CATEGORÍAS OFICIALES DEL PROGRAMA:
 *    - Gastronomía: cafeterías y restaurantes participantes.
 *    - Cultura: museos, galerías y exposiciones.
 *    - Rutas urbanas: Centro Histórico de Puebla y murales de Cholula.
 *    - Biodiversidad: espacios naturales y experiencias relacionadas.
 *    - Actividades: talleres, eventos y actividades universitarias.
 *    - Día de la Exploración: stands y puntos de exploración (2 de julio).
 *
 * 2. UNA SOLA FUENTE DE INFORMACIÓN:
 *    Lee automáticamente los puntos desde data.js (RUTAS_DATA, ACTIVIDADES_DATA,
 *    SABORES_DATA y STANDS_EXPLORACION_DATA).
 *
 * 3. OPCIÓN CLARA PARA LLEGAR:
 *    Cada punto del mapa abre su ficha emergente (Popup) con información práctica
 *    y un botón directo "Cómo llegar (Google Maps)".
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Buscamos el contenedor <div id="map"> en la página
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    // 2. Coordenadas iniciales centradas en la zona metropolitana Puebla - Cholula
    const centroPueblaCoords = [19.0433, -98.1983];

    // Inicializamos el mapa de Leaflet
    const map = L.map('map', {
        scrollWheelZoom: false
    }).setView(centroPueblaCoords, 14);

    // Activamos el zoom con rueda del ratón solo después de hacer clic en el mapa
    map.on('click', () => {
        map.scrollWheelZoom.enable();
    });

    // 3. Capa base de calles de OpenStreetMap
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors · ICCB 2027 Puebla'
    }).addTo(map);

    // Colores distintivos por cada una de las 6 categorías oficiales del PDF
    const coloresCategoria = {
        gastronomia: '#8B4513',   // Café cacao para Gastronomía
        cultura: '#6B2D5C',       // Morado museo para Cultura
        rutas_urbanas: '#003366', // Azul Talavera para Rutas urbanas
        biodiversidad: '#1B7A43', // Verde bosque para Biodiversidad
        actividades: '#1E5AA8',   // Azul universitario para Actividades
        exploracion: '#b58f26bd'    // Dorado para Día de la Exploración
    };

    const nombresCategoria = {
        gastronomia: 'Gastronomía',
        cultura: 'Cultura y Exposiciones',
        rutas_urbanas: 'Rutas Urbanas',
        biodiversidad: 'Biodiversidad',
        actividades: 'Actividades y Talleres',
        exploracion: 'Día de la Exploración'
    };

    // Función que construye la ventana emergente (Popup) con opción clara para llegar
    const crearPopup = ({ titulo, subtitulo, categoria, descripcion, estado, enlaceLlegar }) => {
        const color = coloresCategoria[categoria] || '#003366';
        const etiquetaCat = nombresCategoria[categoria] || 'Punto de interés';
        const textoEstado = estado === 'confirmada' ? 'Confirmado' : (estado === 'proximamente' ? 'Próximamente' : 'En evaluación');

        return `
            <div style="font-family:'Plus Jakarta Sans',sans-serif; min-width:220px; max-width:270px; padding:2px 0;">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:4px; margin-bottom:6px;">
                    <span style="font-size:10px; font-weight:700; color:#fff; background:${color}; padding:2px 8px; border-radius:12px;">
                        ${etiquetaCat}
                    </span>
                    <span style="font-size:10px; font-weight:700; color:#4A4D68;">
                        ${textoEstado}
                    </span>
                </div>
                <h4 style="margin:0 0 4px 0; font-size:14px; font-weight:800; color:#151748;">
                    ${titulo}
                </h4>
                ${subtitulo ? `<p style="margin:0 0 5px 0; font-size:11px; font-weight:700; color:#2B4C8C;">${subtitulo}</p>` : ''}
                <p style="margin:0 0 10px 0; font-size:12px; line-height:1.45; color:#4A4D68;">
                    ${descripcion}
                </p>
                <a href="${enlaceLlegar}" target="_blank" rel="noopener noreferrer"
                   style="display:block; text-align:center; background:#003366; color:#fff; text-decoration:none; font-size:11px; font-weight:700; padding:6px 10px; border-radius:6px;">
                    Cómo llegar (Abrir mapa externo) ↗
                </a>
            </div>
        `;
    };

    // 4. Creamos los grupos de capas por categoría y por ruta
    const gruposPorCategoria = {
        gastronomia: L.featureGroup(),
        cultura: L.featureGroup(),
        rutas_urbanas: L.featureGroup(),
        biodiversidad: L.featureGroup(),
        actividades: L.featureGroup(),
        exploracion: L.featureGroup()
    };

    const capasRutas = {};
    const rutasSource = typeof RUTAS_DATA !== 'undefined' ? RUTAS_DATA : {};

    // 5. Dibujamos las rutas verificadas y sus paradas desde RUTAS_DATA
    Object.keys(rutasSource).forEach(key => {
        const ruta = rutasSource[key];
        const grupoRuta = L.featureGroup();

        ruta.puntos.forEach(p => {
            const cat = p.categoriaMapa || ruta.categoria || 'rutas_urbanas';
            const marker = L.circleMarker(p.coords, {
                radius: 8,
                fillColor: ruta.color,
                color: '#ffffff',
                weight: 2.5,
                opacity: 1,
                fillOpacity: 0.95
            }).bindPopup(crearPopup({
                titulo: p.nombre,
                subtitulo: ruta.nombre,
                categoria: cat,
                descripcion: p.desc,
                estado: p.estado || ruta.estado,
                enlaceLlegar: p.enlaceMapa || ruta.enlaceComoLlegar
            }));

            grupoRuta.addLayer(marker);
            if (gruposPorCategoria[cat]) {
                gruposPorCategoria[cat].addLayer(marker);
            }
        });

        // Línea punteada que conecta las paradas de la ruta
        const linea = L.polyline(
            ruta.puntos.map(p => p.coords),
            {
                color: ruta.color,
                weight: 4,
                opacity: 0.85,
                dashArray: '6, 8',
                lineJoin: 'round'
            }
        );
        grupoRuta.addLayer(linea);
        if (gruposPorCategoria[ruta.categoria]) {
            gruposPorCategoria[ruta.categoria].addLayer(linea);
        }

        capasRutas[key] = {
            grupo: grupoRuta,
            datos: ruta
        };
    });

    // 6. Agregamos puntos de Gastronomía (SABORES_DATA) al mapa
    if (typeof SABORES_DATA !== 'undefined') {
        SABORES_DATA.filter(s => s.visible && s.coords).forEach(s => {
            const marker = L.circleMarker(s.coords, {
                radius: 8,
                fillColor: coloresCategoria.gastronomia,
                color: '#fff',
                weight: 2,
                fillOpacity: 0.95
            }).bindPopup(crearPopup({
                titulo: s.establecimiento,
                subtitulo: `${s.nombrePlatillo} · ${s.precio}`,
                categoria: 'gastronomia',
                descripcion: `${s.descripcion} (${s.horario})`,
                estado: s.establecimientoConfirmado && s.fechasValidadas ? 'confirmada' : s.estado,
                enlaceLlegar: s.enlaceMapa
            }));
            gruposPorCategoria.gastronomia.addLayer(marker);
        });
    }

    // 7. Agregamos puntos de Actividades (ACTIVIDADES_DATA) al mapa
    if (typeof ACTIVIDADES_DATA !== 'undefined') {
        ACTIVIDADES_DATA.filter(a => a.visible && a.coords).forEach(a => {
            const cat = a.categoriaMapa || 'actividades';
            const marker = L.circleMarker(a.coords, {
                radius: 7,
                fillColor: coloresCategoria[cat] || coloresCategoria.actividades,
                color: '#fff',
                weight: 2,
                fillOpacity: 0.9
            }).bindPopup(crearPopup({
                titulo: a.titulo,
                subtitulo: `${a.fechaTexto} · ${a.horario}`,
                categoria: cat,
                descripcion: `${a.ubicacion}. Organiza: ${a.organizador}. (${a.costo})`,
                estado: a.estado,
                enlaceLlegar: a.enlaceComoLlegar
            }));
            if (gruposPorCategoria[cat]) {
                gruposPorCategoria[cat].addLayer(marker);
            }
        });
    }

    // 8. Agregamos Stands del Día de la Exploración (STANDS_EXPLORACION_DATA) al mapa
    if (typeof STANDS_EXPLORACION_DATA !== 'undefined') {
        STANDS_EXPLORACION_DATA.filter(st => st.coords).forEach(st => {
            const marker = L.circleMarker(st.coords, {
                radius: 8,
                fillColor: coloresCategoria.exploracion,
                color: '#151748',
                weight: 2,
                fillOpacity: 0.95
            }).bindPopup(crearPopup({
                titulo: `${st.id}: ${st.nombre}`,
                subtitulo: `${st.organizacion} · ${st.horario}`,
                categoria: 'exploracion',
                descripcion: `${st.ubicacion}. ${st.actividades}`,
                estado: st.estado,
                enlaceLlegar: `https://www.google.com/maps/search/?api=1&query=${st.coords[0]},${st.coords[1]}`
            }));
            gruposPorCategoria.exploracion.addLayer(marker);
        });
    }

    // Mostrar todas las categorías por defecto al abrir el mapa
    Object.values(gruposPorCategoria).forEach(g => g.addTo(map));

    // Control de capas desplegable en la esquina superior derecha del mapa
    const overlayMaps = {
        "Rutas Urbanas (Centro y Cholula)": gruposPorCategoria.rutas_urbanas,
        "Biodiversidad y Espacios Naturales": gruposPorCategoria.biodiversidad,
        "Gastronomía (Cafeterías y Restaurantes)": gruposPorCategoria.gastronomia,
        "Cultura (Museos y Exposiciones)": gruposPorCategoria.cultura,
        "Actividades y Talleres Universitarios": gruposPorCategoria.actividades,
        "Día de la Exploración (Stands 2 Jul)": gruposPorCategoria.exploracion
    };
    L.control.layers(null, overlayMaps, { collapsed: true, position: 'topright' }).addTo(map);

    // 9. Función para filtrar el mapa con los botones de categoría (.map-cat-btn)
    function activarCategoriaMapa(catKey) {
        document.querySelectorAll('.map-cat-btn').forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-cat') === catKey);
        });

        const grupoVisible = L.featureGroup();

        if (catKey === 'todas') {
            Object.values(gruposPorCategoria).forEach(g => {
                if (!map.hasLayer(g)) g.addTo(map);
                g.eachLayer(l => grupoVisible.addLayer(l));
            });
            map.flyTo(centroPueblaCoords, 13, { duration: 1.2 });
        } else if (gruposPorCategoria[catKey]) {
            Object.keys(gruposPorCategoria).forEach(k => {
                if (k === catKey) {
                    if (!map.hasLayer(gruposPorCategoria[k])) gruposPorCategoria[k].addTo(map);
                    gruposPorCategoria[k].eachLayer(l => grupoVisible.addLayer(l));
                } else {
                    if (map.hasLayer(gruposPorCategoria[k])) map.removeLayer(gruposPorCategoria[k]);
                }
            });
            if (grupoVisible.getLayers().length > 0) {
                map.flyToBounds(grupoVisible.getBounds(), { padding: [50, 50], maxZoom: 16, duration: 1.2 });
            }
        }
    }

    document.querySelectorAll('.map-cat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = btn.getAttribute('data-cat') || 'todas';
            activarCategoriaMapa(cat);
        });
    });

    // Si la URL trae ?cat=gastronomia o similar, filtramos automáticamente
    const params = new URLSearchParams(window.location.search);
    if (params.get('cat') && gruposPorCategoria[params.get('cat')]) {
        activarCategoriaMapa(params.get('cat'));
    }

    // 10. Botones "Ver recorrido en el mapa →" en las tarjetas de cada ruta
    document.querySelectorAll('.btn-focus-route').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const routeKey = btn.getAttribute('data-route');
            const rutaObj = capasRutas[routeKey];

            if (rutaObj) {
                // Aseguramos que su categoría esté encendida y volamos hacia las paradas de esa ruta
                if (!map.hasLayer(rutaObj.grupo)) {
                    rutaObj.grupo.addTo(map);
                }
                map.flyToBounds(rutaObj.grupo.getBounds(), {
                    padding: [60, 60],
                    duration: 1.4,
                    maxZoom: routeKey === 'sierra' ? 14 : 16
                });
                mapElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
});
