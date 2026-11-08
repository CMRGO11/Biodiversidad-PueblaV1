/**
 * ==============================================================================
 * GUÍA DE JAVASCRIPT GENERAL: main.js
 * ==============================================================================
 * Este archivo es el "cerebro" compartido por todas las páginas web de tu sitio.
 * Tiene dos misiones principales:
 * 1. Abrir y cerrar el menú cuando alguien entra desde un teléfono celular.
 * 2. Cambiar de pestañas en el formulario de la página "Participa".
 * ==============================================================================
 */

// 1. ESPERAR A QUE LA PÁGINA ESTÉ LISTA
// "Robot, no hagas nada hasta que la hoja de papel (el HTML) esté completamente cargada".
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // MISIÓN 1: EL MENÚ DE TRES RAYITAS EN CELULARES (Menú Hamburguesa)
    // ==========================================================================
    // Buscamos el botón de tres rayitas por su id="nav-toggle-btn"
    const toggleBtn = document.getElementById('nav-toggle-btn');
    
    // Buscamos la lista con todos los enlaces por su id="main-nav"
    const navMenu = document.getElementById('main-nav');

    // Verificamos que ambos existan en la página
    if (toggleBtn && navMenu) {
        
        // Cuando el usuario toca el botón de tres rayitas:
        toggleBtn.addEventListener('click', () => {
            // .toggle('is-open'): Si el menú estaba cerrado, le pone la clase "is-open" (lo abre).
            // Si ya estaba abierto, se la quita (lo cierra). ¡Es como un interruptor de luz!
            const isOpen = navMenu.classList.toggle('is-open');
            
            // aria-expanded le avisa a los celulares si el menú está abierto ("true") o cerrado ("false")
            toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Si el usuario hace clic afuera del menú (en cualquier parte de la pantalla):
        document.addEventListener('click', (e) => {
            // Si el clic NO fue en el botón NI dentro del menú, y el menú está abierto...
            if (!toggleBtn.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('is-open')) {
                // Lo cerramos automáticamente para no estorbar
                navMenu.classList.remove('is-open');
                toggleBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
});

// ==============================================================================
// MISIÓN 2: CAMBIADOR DE PESTAÑAS (Para la página participa.html)
// ==============================================================================
// Esta función se activa cuando presionas los botones "Iniciar sesión", "Crear cuenta" o "Contacto"
function switchTab(tabName) {
    // 1. Apaga y deselecciona todos los botones de pestañas
    document.querySelectorAll('.form-tab').forEach(t => t.classList.remove('active'));
    
    // 2. Esconde todas las cajas de contenido
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    
    // 3. Busca la caja específica que el usuario eligió y la muestra agregando 'active'
    document.getElementById('tab-' + tabName).classList.add('active');
    
    // 4. Si la función fue llamada por un clic, resalta ese botón
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    // 5. Asegura que el botón correspondiente quede resaltado
    document.querySelectorAll('.form-tab').forEach(t => {
        if ((tabName === 'login' && t.textContent.includes('Iniciar')) ||
            (tabName === 'registro' && t.textContent.includes('Crear')) ||
            (tabName === 'contacto' && t.textContent.includes('Contacto'))) {
            t.classList.add('active');
        }
    });
}
