# 🌿 Puebla, Capital de la Biodiversidad | ICCB 2027 · BUAP

Prototipo web interactivo y multi-página desarrollado para la guía pública de actividades, rutas bioculturales y experiencias de conservación en Puebla durante el **33º Congreso Internacional de Biología de la Conservación (ICCB 2027)** en colaboración con la **BUAP**.

---

## 🚀 ¿Cómo visualizar y ejecutar el prototipo?

### Opción 1: En línea (GitHub Pages)
Puedes interactuar con el prototipo directamente desde tu navegador en computadora o celular:
👉 **[Ver prototipo en vivo](https://cmrgo11.github.io/Biodiversidad-PueblaV1/)**

*(Para activar este enlace, en GitHub ve a **Settings** > **Pages** > selecciona rama main y carpeta / (root)).*

### Opción 2: Localmente en tu computadora
1. Clona el repositorio:
   ``bash
   git clone https://github.com/CMRGO11/Biodiversidad-PueblaV1.git
   cd Biodiversidad-PueblaV1
   ``
2. Abre index.html con doble clic en tu navegador favorito (Chrome, Edge, Firefox, Safari).
3. O si usas Visual Studio Code, puedes usar la extensión **Live Server** para recarga en tiempo real.

---

## 📁 Estructura Modular del Proyecto

La estructura del proyecto está organizada siguiendo el principio de **separación de responsabilidades** para facilitar el trabajo colaborativo en equipo:

``text
Biodiversidad-PueblaV1/
├── index.html              # Estructura y contenido HTML limpio (~770 líneas)
├── assets/
│   ├── css/
│   │   └── styles.css      # Sistema de diseño, estilos, colores y componentes
│   ├── js/
│   │   └── main.js         # Interactividad (menú móvil, pestañas de registro/login)
│   └── img/                # Logotipos institucionales (BUAP, ICCB), especies y banners
├── README.md               # Documentación e instrucciones
└── .gitignore              # Archivos ignorados por Git
``

---

## 🛠️ ¿Cómo hacer modificaciones y colaborar en equipo?

Al estar modularizado, cada integrante puede trabajar en un área distinta sin generar conflictos de fusión (*merge conflicts*):

* **Si vas a modificar textos, tarjetas o secciones:** Edita index.html.
* **Si vas a cambiar colores, diseño visual o estilos:** Edita ssets/css/styles.css.
* **Si vas a agregar lógica, filtros o interactividad:** Edita ssets/js/main.js.
* **Si agregas nuevas imágenes:** Colócalas en ssets/img/.

### Flujo de trabajo con Git:
1. Asegúrate de tener los últimos cambios del equipo:
   ``bash
   git pull origin main
   ``
2. Realiza tus modificaciones en tu editor de código.
3. Prueba tus cambios abriendo index.html.
4. Guarda y sube tus cambios:
   ``bash
   git add .
   git commit -m "Descripción clara de los cambios realizados"
   git push origin main
   ``

---

## 👥 Equipo y Colaboradores
Proyecto colaborativo para el diseño y validación de la experiencia digital ICCB 2027 Puebla.