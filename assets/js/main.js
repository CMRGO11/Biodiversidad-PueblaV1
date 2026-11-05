        document.addEventListener('DOMContentLoaded', () => {
            // Mobile nav
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
        });

        function switchTab(tabName) {
            document.querySelectorAll('.form-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
            document.getElementById('tab-' + tabName).classList.add('active');
            event.target ? event.target.classList.add('active') : null;
            // Find the matching button
            document.querySelectorAll('.form-tab').forEach(t => {
                if ((tabName === 'login' && t.textContent.includes('Iniciar')) ||
                    (tabName === 'registro' && t.textContent.includes('Crear')) ||
                    (tabName === 'contacto' && t.textContent.includes('Contacto'))) {
                    t.classList.add('active');
                }
            });
        }