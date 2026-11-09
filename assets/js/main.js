/**
 * ==============================================================================
 * CEREBRO CENTRAL DEL SITIO WEB: main.js
 * ==============================================================================
 * Este archivo coordina las funciones esenciales pedidas en el documento
 * "Arquitectura y requerimientos del micrositio Puebla, Capital de la Biodiversidad":
 *
 * 1. MENÚ RESPONSIVO: Abre y cierra el menú en celulares y tabletas.
 * 2. BILINGÜISMO (ES / EN): Permite alternar entre Español e Inglés en la interfaz.
 * 3. DIRECTORIO ÚNICO Y BUSCADOR: Conecta data.js con la Portada, la Agenda,
 *    Sabores de la Biodiversidad, Creative Conservation Labs y Día de la Exploración
 *    para que cada actividad se registre una sola vez.
 * 4. CAMBIADOR DE PESTAÑAS: Para los 5 formularios de participación y los perfiles
 *    de Creative Conservation Labs.
 * ==============================================================================
 */

// Helper para generar la insignia de estado responsable (Sección 1 y 5 del PDF:
// "distinguir actividades confirmadas, próximas y propuestas en evaluación")
function obtenerBadgeEstado(estado, lang = 'es') {
    const textos = {
        confirmada: lang === 'en' ? 'Confirmed' : 'Confirmado',
        proximamente: lang === 'en' ? 'Coming Soon' : 'Próximamente',
        propuesta: lang === 'en' ? 'Under Evaluation' : 'Propuesta en evaluación'
    };
    const clase = estado === 'confirmada' ? 'confirmada' : (estado === 'proximamente' ? 'proximamente' : 'propuesta');
    return `<span class="badge-status ${clase}">${textos[estado] || textos.propuesta}</span>`;
}

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. MENÚ DE TRES RAYITAS EN CELULARES (Menú Hamburguesa)
    // ==========================================================================
    const toggleBtn = document.getElementById('nav-toggle-btn');
    const navMenu = document.getElementById('main-nav');

    if (toggleBtn && navMenu) {
        toggleBtn.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('is-open');
            toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        document.addEventListener('click', (e) => {
            if (!toggleBtn.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('is-open')) {
                navMenu.classList.remove('is-open');
                toggleBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ==========================================================================
    // 2. SISTEMA BILINGÜE ESPAÑOL / INGLÉS (Sección 1 y 8 del PDF)
    // ==========================================================================
    // Diccionario de textos esenciales de la interfaz para cambio instantáneo ES/EN
    const traduccionesInterfaz = {
        es: {
            'nav-ccl': 'Laboratorio',
            'nav-agenda': 'Agenda',
            'nav-exploracion': 'Día de la Exploración',
            'nav-rutas': 'Rutas',
            'nav-menu': 'Sabores',
            'nav-participa': 'Participa',
            'nav-info': 'Información',
            'skip-link': 'Saltar al contenido principal'
        },
        en: {
            'nav-ccl': 'Laboratory',
            'nav-agenda': 'Biodiversity / Agenda',
            'nav-exploracion': 'Exploration Day',
            'nav-rutas': 'Routes',
            'nav-menu': 'Flavors',
            'nav-participa': 'Participate',
            'nav-info': 'Visitor Info',
            'skip-link': 'Skip to main content'
        }
    };

    function aplicarIdioma(lang) {
        localStorage.setItem('iccb_lang', lang);
        document.documentElement.lang = lang;

        // Actualizar estado activo de las pastillas ES / EN
        document.querySelectorAll('.lang-pill').forEach(pill => {
            pill.classList.toggle('active', pill.getAttribute('lang') === lang);
        });

        // Traducir elementos con atributo data-i18n-es / data-i18n-en
        document.querySelectorAll('[data-en]').forEach(el => {
            if (!el.getAttribute('data-es')) {
                el.setAttribute('data-es', el.innerHTML);
            }
            el.innerHTML = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-es');
        });

        // Traducir placeholders de inputs si tienen data-placeholder-en
        document.querySelectorAll('[data-placeholder-en]').forEach(input => {
            if (!input.getAttribute('data-placeholder-es')) {
                input.setAttribute('data-placeholder-es', input.getAttribute('placeholder'));
            }
            input.setAttribute('placeholder', lang === 'en' ? input.getAttribute('data-placeholder-en') : input.getAttribute('data-placeholder-es'));
        });

        // Traducir enlaces principales del menú por su href
        const mapaHref = {
            'ccl.html': traduccionesInterfaz[lang]['nav-ccl'],
            'agenda.html': traduccionesInterfaz[lang]['nav-agenda'],
            'exploracion.html': traduccionesInterfaz[lang]['nav-exploracion'],
            'rutas.html': traduccionesInterfaz[lang]['nav-rutas'],
            'menu.html': traduccionesInterfaz[lang]['nav-menu'],
            'participa.html': traduccionesInterfaz[lang]['nav-participa'],
            'info.html': traduccionesInterfaz[lang]['nav-info']
        };

        document.querySelectorAll('.nav-list .nav-link').forEach(link => {
            const href = link.getAttribute('href');
            const span = link.querySelector('span');
            if (span && mapaHref[href]) {
                span.textContent = mapaHref[href];
            }
        });
    }

    // Escuchar clics en los botones ES / EN del encabezado
    document.querySelectorAll('.lang-pill').forEach(pill => {
        pill.addEventListener('click', (e) => {
            e.preventDefault();
            const nuevoIdioma = pill.getAttribute('lang') || 'es';
            aplicarIdioma(nuevoIdioma);
        });
    });

    // Cargar idioma guardado si existe
    const idiomaGuardado = localStorage.getItem('iccb_lang') || 'es';
    if (idiomaGuardado === 'en') {
        aplicarIdioma('en');
    }

    // ==========================================================================
    // 3. BUSCADOR DESDE LA PORTADA (index.html -> agenda.html)
    // ==========================================================================
    const homeSearchForm = document.getElementById('home-search-form');
    if (homeSearchForm) {
        homeSearchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const q = document.getElementById('home-search-input')?.value.trim() || '';
            const tipo = document.getElementById('home-search-category')?.value || 'todos';
            const params = new URLSearchParams();
            if (q) params.set('q', q);
            if (tipo && tipo !== 'todos') params.set('tipo', tipo);
            window.location.href = 'agenda.html' + (params.toString() ? '?' + params.toString() : '') + '#directorio-comun';
        });
    }

    // ==========================================================================
    // 4. DIRECTORIO COMÚN DE ACTIVIDADES Y AGENDA (agenda.html)
    // ==========================================================================
    const directorioContainer = document.getElementById('directorio-actividades-lista');
    if (directorioContainer && typeof ACTIVIDADES_DATA !== 'undefined') {
        const inputTexto = document.getElementById('filtro-texto');
        const selectTipo = document.getElementById('filtro-tipo');
        const selectPublico = document.getElementById('filtro-publico');
        const selectFecha = document.getElementById('filtro-fecha');
        const selectIdioma = document.getElementById('filtro-idioma');
        const selectCosto = document.getElementById('filtro-costo');
        const selectZona = document.getElementById('filtro-zona');
        const selectEstado = document.getElementById('filtro-estado');
        const contadorResultados = document.getElementById('contador-actividades');
        const btnLimpiar = document.getElementById('btn-limpiar-filtros');

        // Leer parámetros si el usuario viene desde el buscador de la portada
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('q') && inputTexto) inputTexto.value = urlParams.get('q');
        if (urlParams.get('tipo') && selectTipo) selectTipo.value = urlParams.get('tipo');
        if (urlParams.get('publico') && selectPublico) selectPublico.value = urlParams.get('publico');

        function renderizarDirectorio() {
            const texto = (inputTexto?.value || '').toLowerCase().trim();
            const tipo = selectTipo?.value || 'todos';
            const publico = selectPublico?.value || 'todos';
            const fecha = selectFecha?.value || 'todas';
            const idioma = selectIdioma?.value || 'todos';
            const costo = selectCosto?.value || 'todos';
            const zona = selectZona?.value || 'todas';
            const estado = selectEstado?.value || 'todos';

            const filtradas = ACTIVIDADES_DATA.filter(act => {
                if (!act.visible) return false;
                if (texto && !(
                    act.titulo.toLowerCase().includes(texto) ||
                    act.descripcion.toLowerCase().includes(texto) ||
                    act.organizador.toLowerCase().includes(texto) ||
                    act.ubicacion.toLowerCase().includes(texto)
                )) return false;
                if (tipo !== 'todos' && act.tipo !== tipo) return false;
                if (publico !== 'todos' && act.publico !== publico && act.publico !== 'todos') return false;
                if (fecha !== 'todas' && act.fecha !== fecha) return false;
                if (idioma !== 'todos' && act.idioma !== idioma) return false;
                if (costo !== 'todos' && act.costo !== costo) return false;
                if (zona !== 'todas' && act.zona !== zona) return false;
                if (estado !== 'todos' && act.estado !== estado) return false;
                return true;
            });

            if (contadorResultados) {
                contadorResultados.textContent = `Mostrando ${filtradas.length} de ${ACTIVIDADES_DATA.filter(a => a.visible).length} actividades registradas en la fuente única`;
            }

            if (filtradas.length === 0) {
                directorioContainer.innerHTML = `
                    <div class="info-card" style="text-align:center; padding:2.5rem;">
                        <h3>No se encontraron actividades con esos filtros</h3>
                        <p>Prueba seleccionando "Todas las categorías" o borrando el texto de búsqueda.</p>
                    </div>
                `;
                return;
            }

            // Generar cada ficha con todos los campos pedidos en la Sección 3.2 del PDF:
            // nombre, descripción, fecha y horario, ubicación, organizador, público, idioma,
            // costo, accesibilidad, contacto, registro y enlace al mapa.
            directorioContainer.innerHTML = filtradas.map(act => `
                <article class="activity-full-card" id="${act.id}">
                    <div class="activity-card-top">
                        <div style="display:flex; gap:0.5rem; align-items:center; flex-wrap:wrap;">
                            <span style="font-size:var(--font-xs); font-weight:800; color:var(--color-talavera-blue); background:var(--color-soft-blue-light); padding:0.2rem 0.6rem; border-radius:4px;">
                                ID: ${act.id}
                            </span>
                            <span style="font-size:var(--font-xs); font-weight:700; color:var(--color-navy); background:var(--color-cream); padding:0.2rem 0.65rem; border-radius:4px;">
                                ${act.tipoEtiqueta}
                            </span>
                        </div>
                        ${obtenerBadgeEstado(act.estado)}
                    </div>

                    <h3 style="font-size:var(--font-lg); font-weight:800; color:var(--color-navy); margin-bottom:0.4rem;">
                        ${act.titulo}
                    </h3>
                    <p style="font-size:var(--font-sm); color:var(--color-text-muted); line-height:1.55;">
                        ${act.descripcion}
                    </p>

                    <div class="activity-meta-grid">
                        <div class="activity-meta-item"><strong>📅 Fecha y horario:</strong> ${act.fechaTexto} · ${act.horario}</div>
                        <div class="activity-meta-item"><strong>📍 Ubicación:</strong> ${act.ubicacion} (${act.zona})</div>
                        <div class="activity-meta-item"><strong>🏛️ Organizador:</strong> ${act.organizador}</div>
                        <div class="activity-meta-item"><strong>👥 Público:</strong> ${act.publicoEtiqueta}</div>
                        <div class="activity-meta-item"><strong>🌐 Idioma:</strong> ${act.idioma}</div>
                        <div class="activity-meta-item"><strong>🎟️ Costo:</strong> ${act.costo} (${act.costoDetalle})</div>
                        <div class="activity-meta-item"><strong>♿ Accesibilidad:</strong> ${act.accesibilidad}</div>
                        <div class="activity-meta-item"><strong>✉️ Contacto:</strong> <a href="mailto:${act.contacto}">${act.contacto}</a></div>
                    </div>

                    <div class="activity-actions-row">
                        <span style="font-size:var(--font-xs); color:var(--color-text-muted);">
                            ${act.estado === 'confirmada'
                                ? `✔️ Verificado por: ${act.fuenteVerificacion} (${act.fechaVerificacion})`
                                : `⚠️ Dato aún no confirmado de forma definitiva (${act.fuenteVerificacion})`}
                        </span>
                        <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                            <a href="rutas.html?cat=${act.categoriaMapa}#map" class="btn btn-outline btn-sm">🗺️ Ver en mapa</a>
                            <a href="${act.enlaceComoLlegar}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">📍 Cómo llegar ↗</a>
                            <a href="${act.registroUrl}" class="btn btn-primary btn-sm">📝 Registro / Participar</a>
                        </div>
                    </div>
                </article>
            `).join('');
        }

        [inputTexto, selectTipo, selectPublico, selectFecha, selectIdioma, selectCosto, selectZona, selectEstado].forEach(ctrl => {
            if (ctrl) {
                ctrl.addEventListener('input', renderizarDirectorio);
                ctrl.addEventListener('change', renderizarDirectorio);
            }
        });

        if (btnLimpiar) {
            btnLimpiar.addEventListener('click', () => {
                if (inputTexto) inputTexto.value = '';
                if (selectTipo) selectTipo.value = 'todos';
                if (selectPublico) selectPublico.value = 'todos';
                if (selectFecha) selectFecha.value = 'todas';
                if (selectIdioma) selectIdioma.value = 'todos';
                if (selectCosto) selectCosto.value = 'todos';
                if (selectZona) selectZona.value = 'todas';
                if (selectEstado) selectEstado.value = 'todos';
                renderizarDirectorio();
            });
        }

        renderizarDirectorio();
    }

    // ==========================================================================
    // 5. BUSCADOR DE STANDS EN DÍA DE LA EXPLORACIÓN (exploracion.html)
    // ==========================================================================
    const standsContainer = document.getElementById('stands-exploracion-lista');
    if (standsContainer && typeof STANDS_EXPLORACION_DATA !== 'undefined') {
        const inputStand = document.getElementById('buscar-stand-input');
        const selectTemaStand = document.getElementById('buscar-stand-tema');

        function renderizarStands() {
            const q = (inputStand?.value || '').toLowerCase().trim();
            const tema = selectTemaStand?.value || 'todos';

            const filtrados = STANDS_EXPLORACION_DATA.filter(s => {
                if (tema !== 'todos' && s.categoriaTema !== tema) return false;
                if (q && !(
                    s.nombre.toLowerCase().includes(q) ||
                    s.organizacion.toLowerCase().includes(q) ||
                    s.tema.toLowerCase().includes(q) ||
                    s.actividades.toLowerCase().includes(q) ||
                    s.ubicacion.toLowerCase().includes(q)
                )) return false;
                return true;
            });

            if (filtrados.length === 0) {
                standsContainer.innerHTML = `<div class="info-card" style="grid-column:1/-1; text-align:center;"><p>No se encontraron stands con ese criterio.</p></div>`;
                return;
            }

            standsContainer.innerHTML = filtrados.map(s => `
                <article class="info-card" style="display:flex; flex-direction:column; justify-content:space-between;">
                    <div>
                        <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; margin-bottom:0.65rem;">
                            <span style="font-size:var(--font-xs); font-weight:800; color:var(--color-navy); background:var(--color-gold-soft); padding:0.2rem 0.6rem; border-radius:4px;">
                                ${s.id}
                            </span>
                            ${obtenerBadgeEstado(s.estado)}
                        </div>
                        <h3 style="font-size:1.1rem; margin-bottom:0.4rem;">${s.nombre}</h3>
                        <p style="font-size:var(--font-xs); font-weight:700; color:var(--color-talavera-blue); margin-bottom:0.5rem;">
                            🏛️ ${s.organizacion}
                        </p>
                        <p style="margin-bottom:0.75rem;">${s.descripcion}</p>
                        <div style="background:var(--color-cream-light); padding:0.75rem; border-radius:var(--radius-sm); font-size:var(--font-xs); color:var(--color-text-main); line-height:1.5;">
                            <strong>🔬 Tema:</strong> ${s.tema}<br>
                            <strong>📍 Ubicación:</strong> ${s.ubicacion}<br>
                            <strong>⏰ Horario:</strong> ${s.horario}<br>
                            <strong>👥 Público:</strong> ${s.publico}<br>
                            <strong>✨ Actividades:</strong> ${s.actividades}
                        </div>
                    </div>
                    <div style="margin-top:1rem;">
                        <a href="rutas.html?cat=exploracion#map" class="btn btn-outline btn-sm" style="width:100%;">Ver ubicación en el mapa →</a>
                    </div>
                </article>
            `).join('');
        }

        if (inputStand) inputStand.addEventListener('input', renderizarStands);
        if (selectTemaStand) selectTemaStand.addEventListener('change', renderizarStands);
        renderizarStands();
    }

    // ==========================================================================
    // 6. SABORES DE LA BIODIVERSIDAD DINÁMICO (menu.html)
    // ==========================================================================
    const saboresContainer = document.getElementById('sabores-lista-dinamica');
    if (saboresContainer && typeof SABORES_DATA !== 'undefined') {
        const filtroDisponibilidad = document.getElementById('filtro-sabores-estado');

        function renderizarSabores() {
            const filtro = filtroDisponibilidad?.value || 'todos';
            const lista = SABORES_DATA.filter(item => {
                if (!item.visible) return false;
                if (filtro === 'confirmados') return item.establecimientoConfirmado && item.fechasValidadas;
                return true;
            });

            saboresContainer.innerHTML = lista.map(item => {
                // Criterio de aceptación página 4 del PDF:
                // "Las experiencias gastronómicas aparecen como disponibles solo cuando el establecimiento y las fechas están confirmados."
                const disponible = item.establecimientoConfirmado && item.fechasValidadas;
                const badgeDisponibilidad = disponible
                    ? `<span class="badge-status confirmada">Disponible · Establecimiento y fechas confirmados</span>`
                    : `<span class="badge-status ${item.estado === 'proximamente' ? 'proximamente' : 'propuesta'}">En confirmación de fechas / establecimiento</span>`;

                return `
                    <article class="flavor-card" style="display:flex; flex-direction:column;">
                        <div class="flavor-card-img">
                            <img src="${item.icono}" alt="${item.nombrePlatillo}" style="height:80px">
                        </div>
                        <div class="flavor-card-body" style="display:flex; flex-direction:column; flex:1;">
                            <div style="margin-bottom:0.65rem;">
                                ${badgeDisponibilidad}
                            </div>
                            <h3>${item.nombrePlatillo}</h3>
                            <p style="font-weight:700; color:var(--color-talavera-blue); margin-bottom:0.4rem;">
                                🍽️ ${item.establecimiento} (${item.tipo})
                            </p>
                            <p>${item.descripcion}</p>
                            <div style="background:var(--color-cream-light); padding:0.85rem; border-radius:var(--radius-sm); font-size:var(--font-xs); color:var(--color-text-main); margin-bottom:1rem; line-height:1.55;">
                                <strong>📍 Ubicación:</strong> ${item.ubicacion}<br>
                                <strong>🕒 Horario:</strong> ${item.horario}<br>
                                <strong>💲 Rango de precios:</strong> ${item.precio}<br>
                                <strong>📅 Fechas confirmadas:</strong> ${item.fechasConfirmadas}
                            </div>
                            <div style="margin-top:auto; display:flex; gap:0.5rem;">
                                <a href="${item.enlaceMapa}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="flex:1;">Cómo llegar ↗</a>
                                <a href="rutas.html?cat=gastronomia#map" class="btn btn-primary btn-sm" style="flex:1;">Ver en mapa</a>
                            </div>
                        </div>
                    </article>
                `;
            }).join('');
        }

        if (filtroDisponibilidad) filtroDisponibilidad.addEventListener('change', renderizarSabores);
        renderizarSabores();
    }

    // ==========================================================================
    // 7. FICHAS DE EQUIPOS DE CREATIVE CONSERVATION LABS (ccl.html)
    // ==========================================================================
    const cclContainer = document.getElementById('ccl-equipos-grid');
    if (cclContainer && typeof CCL_EQUIPOS_DATA !== 'undefined') {
        cclContainer.innerHTML = CCL_EQUIPOS_DATA.map(eq => `
            <article class="ccl-team-card" id="${eq.id}">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem;">
                    <span style="font-size:var(--font-xs); font-weight:800; color:var(--color-talavera-blue); background:var(--color-soft-blue-light); padding:0.25rem 0.65rem; border-radius:4px;">
                        ${eq.id} · ${eq.eje}
                    </span>
                    ${obtenerBadgeEstado(eq.estado)}
                </div>
                <div style="display:flex; align-items:center; gap:0.85rem;">
                    <img src="${eq.imagen}" alt="${eq.nombreProyecto}" style="height:48px; width:auto; object-fit:contain;">
                    <h3 style="font-size:1.15rem; font-weight:800; color:var(--color-navy); margin:0;">${eq.nombreProyecto}</h3>
                </div>
                <div style="background:var(--color-cream-light); padding:0.9rem; border-radius:var(--radius-md); font-size:var(--font-xs); line-height:1.6;">
                    <strong>🎓 Universidad:</strong> ${eq.universidad}<br>
                    <strong>👩‍🔬 Estudiantes:</strong> ${eq.estudiantes}<br>
                    <strong>👨‍🏫 Profesor asesor:</strong> ${eq.profesorAsesor}<br>
                    <strong>🤝 Organización colaboradora:</strong> ${eq.organizacionColaboradora}
                </div>
                <p style="font-size:var(--font-sm); color:var(--color-text-muted); margin:0;">
                    <strong style="color:var(--color-navy);">Reto abordado:</strong> ${eq.reto}
                </p>
                <p style="font-size:var(--font-sm); color:var(--color-text-muted); margin:0;">
                    <strong style="color:var(--color-navy);">Producto desarrollado:</strong> ${eq.productoDesarrollado}
                </p>
                <div style="margin-top:auto; padding-top:0.5rem;">
                    <a href="${eq.enlaceProducto}" class="btn btn-outline btn-sm" style="width:100%;">Ver actividad / producto vinculado →</a>
                </div>
            </article>
        `).join('');
    }
});

// ==============================================================================
// CAMBIADOR DE PESTAÑAS UNIVERSAL (Formularios en participa.html y Públicos en ccl.html)
// ==============================================================================
function switchTab(tabName, btnElement) {
    const parentCard = btnElement ? btnElement.closest('.tabs-wrapper') : document;
    const scope = parentCard || document;

    scope.querySelectorAll('.form-tab').forEach(t => t.classList.remove('active'));
    scope.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));

    const targetPanel = document.getElementById('tab-' + tabName);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }

    if (btnElement) {
        btnElement.classList.add('active');
    } else if (typeof event !== 'undefined' && event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}
