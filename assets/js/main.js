/**
 * ============================================================================== *
 * 1. MENÚ RESPONSIVO: Abre y cierra el menú en celulares y tabletas.
 * 2. BILINGÜISMO (ES / EN): Permite alternar entre Español e Inglés en la interfaz.
 * 3. DIRECTORIO ÚNICO Y BUSCADOR: Conecta data.js con la Portada, la Agenda,
 *    Sabores de la Biodiversidad, Creative Conservation Labs y Día de la Exploración
 *    para que cada actividad se registre una sola vez.
 * 4. CAMBIADOR DE PESTAÑAS: Para los 5 formularios de participación y los perfiles
 *    de Creative Conservation Labs.
 * ==============================================================================
 */

// Helper para generar la insignia de estado responsable (confirmadas, próximas y propuestas en evaluación")
function obtenerBadgeEstado(estado, lang) {
    if (!lang) lang = document.documentElement.lang || 'es';
    const textos = {
        confirmada: lang === 'en' ? 'Confirmed' : 'Confirmado',
        proximamente: lang === 'en' ? 'Coming Soon' : 'Próximamente',
        propuesta: lang === 'en' ? 'Under Evaluation' : 'Propuesta en evaluación'
    };
    const clase = estado === 'confirmada' ? 'confirmada' : (estado === 'proximamente' ? 'proximamente' : 'propuesta');
    return `<span class="badge-status ${clase}">${textos[estado] || textos.propuesta}</span>`;
}

// Iconos SVG profesionales (evitan aspecto genérico de emojis)
const ICONS = {
    calendar: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:4px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    mapPin: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:4px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    building: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:4px;"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 9v12M15 9v12"/></svg>`,
    users: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:4px;"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    globe: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:4px;"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    ticket: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:4px;"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2m0 4v2m0 4v2"/></svg>`,
    wheelchair: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:4px;"><circle cx="12" cy="4.5" r="2"/><path d="M12 7v4m-4 0h8m-7 4l-3 6m9-6l3 6m-6-10v4"/></svg>`,
    mail: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:4px;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    map: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:4px;"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>`,
    edit: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:4px;"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
    check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:4px;"><polyline points="20 6 9 17 4 12"/></svg>`,
    alert: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:4px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    microscope: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:4px;"><path d="M10 2v7.31M14 9.3V2M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0"/></svg>`,
    clock: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:4px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    sparkle: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:4px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    utensils: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:4px;"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M3 8h14v7a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8z"/></svg>`,
    price: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:4px;"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    graduation: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:4px;"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
    handshake: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:4px;"><path d="M18 11l-3 3m-2-2l-3 3m10-7l-6 6a2 2 0 0 1-2.83 0l-3.17-3.17a2 2 0 0 1 0-2.83l6-6a2 2 0 0 1 2.83 0l3.17 3.17a2 2 0 0 1 0 2.83z"/></svg>`
};

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // MENÚ DE TRES RAYITAS EN CELULARES
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
    // SISTEMA BILINGÜE ESPAÑOL / INGLÉS
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

        // Notificar a componentes dinámicos para que re-rendericen en el idioma activo
        window.dispatchEvent(new CustomEvent('idiomaCambiado', { detail: lang }));
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
    // BUSCADOR DESDE LA PORTADA (index.html -> agenda.html)
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
    // DIRECTORIO COMÚN DE ACTIVIDADES Y AGENDA (agenda.html)
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

            // Generar cada ficha con todos los campos nombre, descripción, fecha y horario, ubicación, organizador, público, idioma,
            // costo, accesibilidad, contacto, registro y enlace al mapa.
            directorioContainer.innerHTML = filtradas.map(act => `
                <article class="activity-full-card" id="${act.id}">
                    <div class="activity-card-top">
                        <div style="display:flex; gap:0.5rem; align-items:center; flex-wrap:wrap;">
                            <span style="font-size:var(--font-xs); font-weight:800; color:var(--color-talavera-blue); background:#EEF2F7; padding:0.2rem 0.6rem; border-radius:0;">
                                ID: ${act.id}
                            </span>
                            <span style="font-size:var(--font-xs); font-weight:700; color:var(--color-navy); background:#F7F5F1; padding:0.2rem 0.65rem; border-radius:0;">
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
                        <div class="activity-meta-item"><strong>${ICONS.calendar}Fecha y horario:</strong> ${act.fechaTexto} · ${act.horario}</div>
                        <div class="activity-meta-item"><strong>${ICONS.mapPin}Ubicación:</strong> ${act.ubicacion} (${act.zona})</div>
                        <div class="activity-meta-item"><strong>${ICONS.building}Organizador:</strong> ${act.organizador}</div>
                        <div class="activity-meta-item"><strong>${ICONS.users}Público:</strong> ${act.publicoEtiqueta}</div>
                        <div class="activity-meta-item"><strong>${ICONS.globe}Idioma:</strong> ${act.idioma}</div>
                        <div class="activity-meta-item"><strong>${ICONS.ticket}Costo:</strong> ${act.costo} (${act.costoDetalle})</div>
                        <div class="activity-meta-item"><strong>${ICONS.wheelchair}Accesibilidad:</strong> ${act.accesibilidad}</div>
                        <div class="activity-meta-item"><strong>${ICONS.mail}Contacto:</strong> <a href="mailto:${act.contacto}">${act.contacto}</a></div>
                    </div>

                    <div class="activity-actions-row">
                        <span style="font-size:var(--font-xs); color:var(--color-text-muted); display:inline-flex; align-items:center;">
                            ${act.estado === 'confirmada'
                    ? `${ICONS.check} Verificado por: ${act.fuenteVerificacion} (${act.fechaVerificacion})`
                    : `${ICONS.alert} Dato aún no confirmado de forma definitiva (${act.fuenteVerificacion})`}
                        </span>
                        <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                            <a href="rutas.html?cat=${act.categoriaMapa}#map" class="btn btn-outline btn-sm">${ICONS.map}Ver en mapa</a>
                            <a href="${act.enlaceComoLlegar}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">${ICONS.mapPin}Cómo llegar ↗</a>
                            <a href="${act.registroUrl}" class="btn btn-primary btn-sm">${ICONS.edit}Registro / Participar</a>
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
    // BUSCADOR DE STANDS EN DÍA DE LA EXPLORACIÓN (exploracion.html)
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
                            <span style="font-size:var(--font-xs); font-weight:800; color:var(--color-navy); background:#F7F5F1; padding:0.2rem 0.6rem; border-radius:0;">
                                ${s.id}
                            </span>
                            ${obtenerBadgeEstado(s.estado)}
                        </div>
                        <h3 style="font-size:1.1rem; margin-bottom:0.4rem;">${s.nombre}</h3>
                        <p style="font-size:var(--font-xs); font-weight:700; color:var(--color-talavera-blue); margin-bottom:0.5rem; display:inline-flex; align-items:center;">
                            ${ICONS.building} ${s.organizacion}
                        </p>
                        <p style="margin-bottom:0.75rem;">${s.descripcion}</p>
                        <div style="background:var(--color-cream-light); padding:0.75rem; border-radius:0; font-size:var(--font-xs); color:var(--color-text-main); line-height:1.6;">
                            <strong>${ICONS.microscope}Tema:</strong> ${s.tema}<br>
                            <strong>${ICONS.mapPin}Ubicación:</strong> ${s.ubicacion}<br>
                            <strong>${ICONS.clock}Horario:</strong> ${s.horario}<br>
                            <strong>${ICONS.users}Público:</strong> ${s.publico}<br>
                            <strong>${ICONS.sparkle}Actividades:</strong> ${s.actividades}
                        </div>
                    </div>
                    <div style="margin-top:1rem;">
                        <a href="rutas.html?cat=exploracion#map" class="btn btn-outline btn-sm" style="width:100%;">${ICONS.map}Ver ubicación en el mapa →</a>
                    </div>
                </article>
            `).join('');
        }

        if (inputStand) inputStand.addEventListener('input', renderizarStands);
        if (selectTemaStand) selectTemaStand.addEventListener('change', renderizarStands);
        renderizarStands();
    }

    // ==========================================================================
    // SABORES DE LA BIODIVERSIDAD DINÁMICO (menu.html)
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
                    ? `<span class="badge-status confirmada">${ICONS.check} Disponible · Establecimiento y fechas confirmados</span>`
                    : `<span class="badge-status ${item.estado === 'proximamente' ? 'proximamente' : 'propuesta'}">${ICONS.alert} En confirmación de fechas / establecimiento</span>`;

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
                            <p style="font-weight:700; color:var(--color-talavera-blue); margin-bottom:0.4rem; display:inline-flex; align-items:center;">
                                ${ICONS.utensils} ${item.establecimiento} (${item.tipo})
                            </p>
                            <p>${item.descripcion}</p>
                            <div style="background:var(--color-cream-light); padding:0.85rem; border-radius:0; font-size:var(--font-xs); color:var(--color-text-main); margin-bottom:1rem; line-height:1.6;">
                                <strong>${ICONS.mapPin}Ubicación:</strong> ${item.ubicacion}<br>
                                <strong>${ICONS.clock}Horario:</strong> ${item.horario}<br>
                                <strong>${ICONS.price}Rango de precios:</strong> ${item.precio}<br>
                                <strong>${ICONS.calendar}Fechas confirmadas:</strong> ${item.fechasConfirmadas}
                            </div>
                            <div style="margin-top:auto; display:flex; gap:0.5rem;">
                                <a href="${item.enlaceMapa}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="flex:1;">${ICONS.mapPin}Cómo llegar ↗</a>
                                <a href="rutas.html?cat=gastronomia#map" class="btn btn-primary btn-sm" style="flex:1;">${ICONS.map}Ver en mapa</a>
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
    // FICHAS DE EQUIPOS DE CREATIVE CONSERVATION LABS (ccl.html)
    // ==========================================================================
    const cclContainer = document.getElementById('ccl-equipos-grid');
    if (cclContainer && typeof CCL_EQUIPOS_DATA !== 'undefined') {
        cclContainer.innerHTML = CCL_EQUIPOS_DATA.map(eq => `
            <article class="ccl-team-card" id="${eq.id}">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem;">
                    <span style="font-size:var(--font-xs); font-weight:800; color:var(--color-talavera-blue); background:#EEF2F7; padding:0.25rem 0.65rem; border-radius:0;">
                        ${eq.id} · ${eq.eje}
                    </span>
                    ${obtenerBadgeEstado(eq.estado)}
                </div>
                <div style="display:flex; align-items:center; gap:0.85rem;">
                    <img src="${eq.imagen}" alt="${eq.nombreProyecto}" style="height:48px; width:auto; object-fit:contain;">
                    <h3 style="font-size:1.15rem; font-weight:800; color:var(--color-navy); margin:0;">${eq.nombreProyecto}</h3>
                </div>
                <div style="background:var(--color-cream-light); padding:0.9rem; border-radius:0; font-size:var(--font-xs); line-height:1.65;">
                    <strong>${ICONS.graduation}Universidad:</strong> ${eq.universidad}<br>
                    <strong>${ICONS.users}Estudiantes:</strong> ${eq.estudiantes}<br>
                    <strong>${ICONS.building}Profesor asesor:</strong> ${eq.profesorAsesor}<br>
                    <strong>${ICONS.handshake}Organización colaboradora:</strong> ${eq.organizacionColaboradora}
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
