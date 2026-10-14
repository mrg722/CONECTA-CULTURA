# Especificación de Requisitos de Software (ERS) — Conecta Cultura

**Proyecto:** Conecta Cultura  
**Asignatura:** DSY1104 · Desarrollo FullStack II  
**Estado:** ERS de referencia actualizado con las funciones que están implementadas en el repositorio.  
**Tipo de solución:** aplicación web de frontend React para explorar actividades culturales.

## 1. Propósito y alcance

Conecta Cultura permite explorar un catálogo estático de actividades, filtrarlo por categoría, consultar detalles y administrar inscripciones en el navegador. Incluye una vista administrativa local de creación y eliminación de actividades.

El proyecto es un prototipo de frontend: no cuenta con API remota, autenticación administrativa ni base de datos de servidor. Las actividades iniciales viven en un módulo JavaScript; el estado de actividades creadas se mantiene en React mientras la aplicación está abierta; las inscripciones se guardan en `localStorage`.

## 2. Arquitectura y componentes principales

- **React**: composición de páginas y componentes; estado con hooks.
- **Vite**: servidor de desarrollo y compilación.
- **React Router**: rutas públicas, detalles por identificador y vista 404.
- **Bootstrap / React Bootstrap**: grilla y controles responsivos.
- **Vitest + React Testing Library + jsdom**: pruebas automatizadas de funciones e interfaz.
- **localStorage**: persistencia local de las inscripciones en el navegador, no compartida entre dispositivos ni usuarios.

### Componentes y responsabilidades

| Módulo | Responsabilidad |
|---|---|
| `src/App.jsx` | Mantiene inscripciones y actividades en estado, define las rutas y coordina alta/baja |
| `src/components/Cabecera.jsx` | Cabecera del sitio |
| `src/components/Navegacion.jsx` | Navegación entre vistas |
| `src/components/TarjetaActividad.jsx` | Representa una actividad, precio, cupos y acción de inscripción |
| `src/components/MisInscripciones.jsx` | Lista inscripciones y permite quitarlas |
| `src/components/PiePagina.jsx` | Pie de página reutilizable |
| `src/pages/Actividades.jsx` | Filtro de categoría y cartelera |
| `src/pages/DetalleActividad.jsx` | Detalle según el identificador de ruta y mensaje si no existe |
| `src/pages/Categorias.jsx` | Vista de categorías |
| `src/pages/Ofertas.jsx` | Vista de ofertas |
| `src/pages/Inscripciones.jsx` | Vista de inscripciones guardadas |
| `src/pages/admin/FormularioActividad.jsx` | Formulario controlado y validación de alta |
| `src/pages/admin/AdminActividades.jsx` | Vista de administración y eliminación |
| `src/utils/precio.js` | Formato del precio |
| `src/utils/persistencia.js` | Serialización y escritura de inscripciones |
| `src/services/actividades.js` | Ejemplo didáctico de inyección de dependencia asíncrona; no es una API usada por la app |

## 3. Mapa de rutas

| Ruta | Propósito | Estado en el código |
|---|---|---|
| `/` | Inicio | Implementada |
| `/actividades` | Listado y filtro de actividades | Implementada |
| `/actividades/:id` | Detalle de actividad | Implementada; contempla identificador inexistente |
| `/categorias` | Categorías disponibles | Implementada |
| `/ofertas` | Ofertas | Implementada |
| `/inscripciones` | Inscripciones del navegador | Implementada |
| `/admin/actividades` | Crear y eliminar actividades en memoria | Implementada, sin autenticación |
| cualquier otra ruta | Vista no encontrada | Implementada |

## 4. Requerimientos funcionales

| ID | Requerimiento | Criterio de aceptación |
|---|---|---|
| RF-01 | Listar actividades | La cartelera representa los objetos del catálogo como tarjetas |
| RF-02 | Filtrar por categoría | Al cambiar el selector, solo se muestran las actividades de esa categoría; «Todas» muestra el catálogo completo |
| RF-03 | Mostrar precio | Un precio igual a cero muestra «Gratis»; uno positivo se expresa con separador de miles |
| RF-04 | Informar cupos críticos | Si quedan entre 1 y 5 cupos, se muestra un aviso |
| RF-05 | Evitar inscripción agotada | Cuando los cupos son cero, el botón de inscripción está deshabilitado |
| RF-06 | Inscribir una actividad | Una inscripción nueva llama al manejador y se descuenta un cupo; se evita duplicar la misma actividad |
| RF-07 | Persistir inscripciones | El navegador guarda el arreglo serializado con la clave `inscripciones` y puede restaurarlo al recargar |
| RF-08 | Eliminar inscripción | El usuario puede quitar una inscripción y recuperar un cupo en el estado activo |
| RF-09 | Consultar detalles | La ruta por ID muestra los datos encontrados o un mensaje cuando el ID no existe |
| RF-10 | Mostrar categorías y ofertas | Sus rutas deben renderizar las vistas disponibles |
| RF-11 | Administrar actividades | El formulario valida nombre, categoría y cupos; la vista permite crear y eliminar actividades en el estado actual |
| RF-12 | Ruta no reconocida | Una dirección sin ruta definida muestra la página 404 |

## 5. Requerimientos no funcionales

- **RNF-01 — Responsividad:** el diseño debe probarse a 375, 768, 1024 y 1440 px; la cartelera utiliza una, dos o tres columnas según el punto de quiebre. La matriz manual se mantiene pendiente hasta ser ejecutada.
- **RNF-02 — Accesibilidad básica:** los controles deben tener etiqueta, los botones deben ser operables mediante teclado y el foco debe ser visible; los resultados reales deben confirmarse manualmente.
- **RNF-03 — Mantenibilidad:** la estructura separa componentes, páginas, datos y utilidades.
- **RNF-04 — Compatibilidad de desarrollo:** usar una versión de Node.js compatible con Vite 8 y las herramientas de prueba definidas.
- **RNF-05 — Construcción:** la compilación de producción debe terminar con `npm run build`; la verificación está pendiente de ejecución local.
- **RNF-06 — Privacidad y alcance:** `localStorage` es local al navegador; no debe interpretarse como una solución multiusuario persistente en servidor.

## 6. Matriz de trazabilidad a pruebas

| Requerimiento | Archivo(s) de prueba |
|---|---|
| RF-03 | `src/utils/precio.spec.jsx` |
| RF-04, RF-05, RF-06 | `src/components/TarjetaActividad.spec.jsx` |
| RF-02 | `src/pages/Actividades.spec.jsx` |
| RF-07 | `src/utils/persistencia.spec.js` |
| RF-09 | `src/pages/DetalleActividad.spec.jsx` |
| Concepto de mock asíncrono (ejercicio de la Guía 14) | `src/services/actividades.spec.js` |

## 7. Límites conocidos y decisiones pendientes

- Las rutas de administración no tienen autenticación; no deben usarse como panel de producción.
- Las actividades creadas no se guardan en servidor y actualmente no sobreviven a una recarga.
- Las inscripciones se guardan solo en el navegador actual.
- El servicio asíncrono es un ejercicio de prueba, no una integración de API.
- La prueba automatizada, cobertura, lint, compilación, responsividad manual, despliegue EC2 y capturas deben registrarse cuando se ejecuten; este documento no afirma que estén aprobados anticipadamente.
