/**
 * ==============================================================================
 * GUÍA DE JAVASCRIPT PARA EL MAPA (LEAFLET + OPENSTREETMAP)
 * ==============================================================================
 * Imagina que JavaScript es un titiritero o un robot que sigue órdenes.
 * Aquí le decimos al robot:
 * 1. "Espera a que la página cargue completa".
 * 2. "Busca la caja vacía llamada 'map' en la pared de HTML".
 * 3. "Dibuja el mapa de Puebla y píntale las calles de OpenStreetMap".
 * 4. "Pon chinchetas (marcadores) en los lugares bonitos y conéctalos con una línea".
 * 5. "Cuando alguien toque un botón de 'Ver en el mapa', vuela la cámara hacia allá".
 * ==============================================================================
 */

// 1. ESPERAR A QUE LA PÁGINA ESTÉ LISTA
// Como decirle al robot: "No empieces a pintar hasta que la hoja de papel esté en la mesa".
document.addEventListener('DOMContentLoaded', () => {

    // Buscamos la caja <div id="map"> que dejamos en el HTML.
    const mapElement = document.getElementById('map');
    
    // Si por alguna razón no estamos en la página de rutas, no hacemos nada.
    if (!mapElement) return;

    // 2. CREAR EL MAPA
    // Coordenadas GPS del Zócalo de Puebla: [Latitud, Longitud]
    const centroPueblaCoords = [19.0433, -98.1983];

    // Le decimos a Leaflet (L): "Inicia un mapa adentro de la caja 'map',
    // apunta la cámara a Puebla con un zoom de nivel 15 (cerca de las calles)".
    const map = L.map('map', {
        scrollWheelZoom: false // Para no hacer zoom sin querer con la rueda del ratón
    }).setView(centroPueblaCoords, 15);

    // Si el usuario hace clic dentro del mapa, entonces sí permitimos el zoom con el ratón.
    map.on('click', () => {
        map.scrollWheelZoom.enable();
    });

    // 3. AGREGAR LAS FOTOS O BALDOSAS DE OPENSTREETMAP
    // OpenStreetMap es como un gran rompecabezas de fotos del mundo (llamadas "tiles").
    // Leaflet va pidiendo las piezas necesarias por internet y las pega una al lado de otra.
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors · ICCB 2027 Puebla'
    }).addTo(map);

    // 4. NUESTRA LIBRETA DE DATOS (Las rutas y sus paradas)
    // Aquí guardamos como una lista de supermercado todos los lugares que queremos mostrar.
    const rutasData = {
        centro: {
            nombre: 'Ruta del Centro Histórico',
            color: '#2B4C8C', // Azul marino
            puntos: [
                {
                    nombre: '1. Zócalo de Puebla',
                    coords: [19.0437, -98.1983],
                    tipo: 'Biodiversidad Urbana',
                    desc: 'Jardines centrales arbolados, aves de copa y polinizadores urbanos en el corazón histórico.'
                },
                {
                    nombre: '2. Templo de Santo Domingo — Capilla del Rosario',
                    coords: [19.0457, -98.2001],
                    tipo: 'Patrimonio y Barroco',
                    desc: 'Máxima expresión del barroco novohispano y arquitectura virreinal.'
                },
                {
                    nombre: '3. Barrio del Artista — Mercado de Artesanías',
                    coords: [19.0425, -98.1942],
                    tipo: 'Cultura y Oficios',
                    desc: 'Talleres tradicionales, arte en Talavera y plantas nativas de ornato.'
                }
            ]
        },
        sierra: {
            nombre: 'Ruta de la Sierra Norte (Cuetzalan)',
            color: '#A07D2B', // Dorado / Café bosque
            puntos: [
                {
                    nombre: '1. Cuetzalan — Finca Cafetalera',
                    coords: [20.0185, -97.5230],
                    tipo: 'Agroecología',
                    desc: 'Cultivos de café de sombra bajo dosel de bosque mesófilo de montaña.'
                },
                {
                    nombre: '2. Apiario Comunitario Melipona',
                    coords: [20.0150, -97.5190],
                    tipo: 'Conservación Biocultural',
                    desc: 'Manejo tradicional de abejas nativas sin aguijón (Pisilnekmej).'
                },
                {
                    nombre: '3. Mirador del Bosque de Niebla',
                    coords: [20.0220, -97.5280],
                    tipo: 'Ecosistema',
                    desc: 'Flora endémica, helechos arborescentes y orquídeas en bosque de niebla.'
                }
            ]
        }
    };

    // Esta cajita vacía guardará los grupos de marcadores para poder controlarlos después.
    const capas = {};

    // Función que arma el mensajito bonito que sale en la ventanita blanca (Popup)
    const crearPopupContenido = (punto, color) => `
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 2px 0;">
            <span style="display:inline-block; font-size:11px; font-weight:700; color:#fff; background:${color}; padding:2px 8px; border-radius:12px; margin-bottom:6px;">
                ${punto.tipo}
            </span>
            <h4 style="margin:0 0 6px 0; font-size:14px; font-weight:700; color:#151748;">
                ${punto.nombre}
            </h4>
            <p style="margin:0; font-size:12px; line-height:1.45; color:#4A4D68;">
                ${punto.desc}
            </p>
        </div>
    `;

    // 5. DIBUJAR CADA RUTA EN EL MAPA
    // Recorremos la lista: primero el 'centro', luego la 'sierra'.
    Object.keys(rutasData).forEach(key => {
        const ruta = rutasData[key];
        
        // Un "featureGroup" es como una bolsita donde metemos juntos los puntos y la línea de una ruta.
        const grupo = L.featureGroup();

        // Ponemos un marcador circular por cada parada de la ruta
        ruta.puntos.forEach(p => {
            const marker = L.circleMarker(p.coords, {
                radius: 8,              // Tamaño de la bolita
                fillColor: ruta.color,  // Color de relleno
                color: '#ffffff',       // Borde blanco
                weight: 2.5,
                opacity: 1,
                fillOpacity: 0.95
            }).bindPopup(crearPopupContenido(p, ruta.color));

            // Guardamos la bolita en la bolsita
            grupo.addLayer(marker);
        });

        // Trazamos una línea que une los puntos (como el juego de unir los números con un lápiz)
        const linea = L.polyline(
            ruta.puntos.map(p => p.coords),
            {
                color: ruta.color,
                weight: 4,
                opacity: 0.85,
                dashArray: '6, 8', // La línea se dibuja con guiones o rayitas discontinuas
                lineJoin: 'round'
            }
        );
        grupo.addLayer(linea);

        // Guardamos todo en nuestro archivador
        capas[key] = {
            grupo: grupo,
            linea: linea,
            primerPunto: ruta.puntos[0]
        };

        // Al inicio, dejamos prendida en la pantalla la ruta del Centro Histórico
        if (key === 'centro') {
            grupo.addTo(map);
        }
    });

    // 6. EL MENÚ DE LA ESQUINA (Para que el usuario elija qué ruta ver)
    const overlayMaps = {
        "<span style='font-weight:600; color:#2B4C8C;'>🏙️ Centro Histórico</span>": capas.centro.grupo,
        "<span style='font-weight:600; color:#A07D2B;'>🌿 Sierra Norte (Cuetzalan)</span>": capas.sierra.grupo
    };
    L.control.layers(null, overlayMaps, { collapsed: false, position: 'topright' }).addTo(map);

    // 7. LOS BOTONES "VER EN EL MAPA →"
    // Buscamos todos los botones que tienen la clase "btn-focus-route".
    document.querySelectorAll('.btn-focus-route').forEach(btn => {
        // Le decimos a cada botón: "Escucha cuando alguien te haga clic".
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que la página salte
            
            // Lee la notita secreta del botón (ej: "centro" o "sierra")
            const routeKey = btn.getAttribute('data-route');
            const rutaSeleccionada = capas[routeKey];

            if (rutaSeleccionada) {
                // Si la ruta estaba apagada en el menú, la prendemos
                if (!map.hasLayer(rutaSeleccionada.grupo)) {
                    rutaSeleccionada.grupo.addTo(map);
                }

                // Vuelo de dron: movemos la cámara suavemente hacia esa ruta
                map.flyToBounds(rutaSeleccionada.grupo.getBounds(), {
                    padding: [60, 60],
                    duration: 1.5, // Tarda segundo y medio en volar
                    maxZoom: routeKey === 'centro' ? 16 : 14
                });

                // Si la pantalla estaba muy abajo, deslizamos suavemente hasta donde está el mapa
                mapElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
});
