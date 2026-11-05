# Puebla, Capital de la Biodiversidad | ICCB 2027 · BUAP

Prototipo web multi-página desarrollado para la guía pública de actividades, rutas bioculturales y experiencias de conservación en Puebla durante el **33º Congreso Internacional de Biología de la Conservación (ICCB 2027)** en colaboración con la **BUAP**.

---

## 🚀 ¿Cómo visualizar y ejecutar el prototipo?

### Opción 1: En línea (GitHub Pages)
Interactúa con el prototipo directamente desde tu navegador en computadora o celular:
👉 **[Ver prototipo en vivo](https://cmrgo11.github.io/Biodiversidad-PueblaV1/)**

*(Para activar este enlace, en GitHub ve a **Settings** > **Pages** > selecciona rama main y carpeta / (root)).*

### Opción 2: Localmente en tu computadora
1. Clona el repositorio:
   ``bash
   git clone https://github.com/CMRGO11/Biodiversidad-PueblaV1.git
   cd Biodiversidad-PueblaV1
   ``
2. Abre cualquiera de las páginas (index.html, 
utas.html, etc.) con doble clic en tu navegador favorito.
3. O si usas Visual Studio Code, abre la carpeta y haz clic en **Go Live** con la extensión **Live Server**.

---

## 📁 Estructura Multi-Página del Proyecto

El sitio ahora funciona con **subpáginas independientes interconectadas**, compartiendo el mismo sistema de diseño y componentes globales:

``text
Biodiversidad-PueblaV1/
│
├── index.html              # Página principal (Hero, buscador, ejes temáticos)
├── rutas.html              # Rutas Bioculturales y circuitos guiados
├── agenda.html             # Calendario de actividades, foros y proyecciones
├── exploracion.html        # Gran Día de Exploración y Feria de Ciencias
├── menu.html               # Sabores bioculturales, café de sombra y gastronomía
├── participa.html          # Formulario de participación, voluntariado y login
├── info.html               # Información práctica, accesibilidad y sedes
│
├── assets/
│   ├── css/
│   │   └── styles.css      # Sistema de diseño, tokens, paleta Talavera y componentes
│   ├── js/
│   │   └── main.js         # Interactividad global (menú móvil, selector de tabs)
│   └── img/                # Logotipos institucionales (BUAP, ICCB), especies y banners
│
├── README.md               # Documentación y guía para colaboradores
└── .gitignore              # Archivos excluidos de Git
``

---

## 🛠️ ¿Cómo colaborar y editar cada página?

Cada integrante del equipo puede trabajar en una subpágina específica sin causar conflictos en Git:

* **Para editar una sección en particular:** Abre el archivo HTML correspondiente (
utas.html, genda.html, etc.).
* **Para ajustar el diseño general o colores:** Edita ssets/css/styles.css.
* **Para añadir interactividad:** Edita ssets/js/main.js.
* **Para agregar recursos gráficos:** Colócalos en ssets/img/.

### Flujo de trabajo con Git:
1. Obtén los últimos cambios del equipo:
   ``bash
   git pull origin main
   ``
2. Trabaja en tu archivo o página asignada.
3. Prueba tus cambios abriendo la página en el navegador.
4. Sube tus cambios:
   ``bash
   git add .
   git commit -m "feat(rutas): agregar mapa interactivo y nuevos circuitos"
   git push origin main
   ``

---

## 👥 Equipo y Colaboradores
Proyecto colaborativo entre Diego Camargo, Ana Vargas, Diego Bedolla para el diseño y validación de la página digital ICCB 2027 Puebla.
