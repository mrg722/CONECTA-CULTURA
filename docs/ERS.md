# Especificación de Requisitos de Software (ERS) — Conecta Cultura

**Proyecto:** Conecta Cultura  
**Asignatura:** DSY1104 · Desarrollo FullStack II  
**Fecha de revisión:** 14-10-2026  
**Validación automatizada:** [GitHub Actions — 22 pruebas, cobertura y build aprobados](https://github.com/mrg722/CONECTA-CULTURA/actions/runs/38578919623)  
**Tipo de solución:** aplicación web frontend React para explorar actividades culturales.

## 1. Propósito y alcance

Conecta Cultura permite explorar un catálogo estático de actividades, filtrarlo por categoría, consultar detalles y administrar inscripciones en el navegador. Incluye una vista administrativa local de creación y eliminación de actividades.

El proyecto es un prototipo de frontend: no cuenta con API remota, autenticación administrativa ni base de datos de servidor. Las actividades iniciales viven en un módulo JavaScript; el estado de actividades creadas se mantiene en React mientras la aplicación está abierta; las inscripciones se guardan en `localStorage`.

## 2. Arquitectura y componentes principales

- **React 19**: composición de páginas y componentes; estado con hooks.
- **Vite 8**: servidor de desarrollo y compilación de producción.
- **React Router 7**: rutas públicas, detalle por identificador, administración y vista 404.
- **Bootstrap 5 / React Bootstrap**: grilla y controles responsivos.
- **Vitest 4 + React Testing Library + jsdom + user-event**: pruebas automatizadas de funciones e interfaz.
- **Vitest Coverage V8**: informe de sentencias, ramas, funciones y líneas.
- **localStorage**: persistencia local de inscripciones en el navegador, no compartida entre dispositivos ni usuarios.
- **GitHub Actions**: instalación, auditoría de dependencias, ejecución de pruebas, cobertura, lint, build y publicación de artefactos.

### Componentes y responsabilidades

| Módulo | Responsabilidad |
|---|---|
| `src/App.jsx` | Mantiene inscripciones y actividades en estado, define rutas y coordina altas/bajas |
| `src/components/Cabecera.jsx` | Cabecera del sitio |
| `src/components/Navegacion.jsx` | Navegación entre vistas |
| `src/components/TarjetaActividad.jsx` | Representa actividad, precio, cupos y acción de inscripción |
| `src/components/MisInscripciones.jsx` | Lista inscripciones y permite quitarlas |
| `src/components/PiePagina.jsx` | Pie de página reutilizable |
| `src/components/Bienvenida.jsx` | Mensaje de bienvenida en el inicio |
| `src/pages/Inicio.jsx` | Portada, imagen principal y acceso a actividades |
| `src/pages/Actividades.jsx` | Filtro de categoría y cartelera |
| `src/pages/DetalleActividad.jsx` | Detalle por ID y mensaje si no existe |
| `src/pages/Categorias.jsx` | Vista de categorías disponibles |
| `src/pages/Ofertas.jsx` | Vista de ofertas |
| `src/pages/Inscripciones.jsx` | Vista de inscripciones guardadas |
| `src/pages/NoEncontrada.jsx` | Ruta 404 |
| `src/pages/admin/FormularioActividad.jsx` | Formulario controlado y validación |
| `src/pages/admin/AdminActividades.jsx` | Vista administrativa y eliminación de actividades |
| `src/data/actividades.js` | Catálogo inicial estático |
| `src/utils/precio.js` | Formato del precio |
| `src/utils/persistencia.js` | Serialización y escritura de inscripciones en `localStorage` |
| `src/services/actividades.js` | Ejemplo didáctico de inyección de dependencia asíncrona; no es una API conectada a la app |

## 3. Mapa de rutas

| Ruta | Propósito | Estado |
|---|---|---|
| `/` | Inicio | Implementada |
| `/actividades` | Listado y filtro de actividades | Implementada |
| `/actividades/:id` | Detalle de actividad | Implementada; considera ID válido e inexistente |
| `/categorias` | Categorías disponibles | Implementada |
| `/ofertas` | Ofertas | Implementada |
| `/inscripciones` | Inscripciones del navegador | Implementada |
| `/admin/actividades` | Crear y eliminar actividades en memoria | Implementada, sin autenticación |
| Cualquier otra ruta | Página no encontrada | Implementada |

## 4. Requerimientos funcionales

| ID | Requerimiento | Criterio de aceptación |
|---|---|---|
| RF-01 | Listar actividades | La cartelera representa los objetos del catálogo como tarjetas |
| RF-02 | Filtrar por categoría | Al cambiar el selector, se muestran solo actividades de esa categoría; «Todas» muestra el catálogo completo |
| RF-03 | Mostrar precio | Precio cero muestra «Gratis»; un precio positivo se expresa con separador de miles |
| RF-04 | Informar cupos críticos | Si quedan entre 1 y 5 cupos, se muestra un aviso |
| RF-05 | Evitar inscripción agotada | Cuando los cupos son cero, el botón está deshabilitado y el manejador rechaza la inscripción |
| RF-06 | Inscribir una actividad | Una inscripción nueva actualiza el estado y descuenta un cupo; no se duplica la misma actividad |
| RF-07 | Persistir inscripciones | El navegador guarda el arreglo serializado bajo la clave `inscripciones` y puede restaurarlo al recargar |
| RF-08 | Eliminar inscripción | Se quita la inscripción y se devuelve el cupo en el estado activo |
| RF-09 | Consultar detalles | La ruta por ID muestra los datos encontrados o mensaje si el ID no existe |
| RF-10 | Mostrar categorías y ofertas | Sus rutas renderizan las vistas respectivas |
| RF-11 | Administrar actividades | El formulario valida nombre, categoría y cupos; permite crear y eliminar actividades del estado actual |
| RF-12 | Ruta no reconocida | Una dirección sin ruta definida muestra la página 404 |

## 5. Requerimientos no funcionales

- **RNF-01 — Responsividad:** la cartelera usa una, dos o tres columnas según los puntos de quiebre de React Bootstrap. Pruebas visuales requeridas a 375, 768, 1024 y 1440 px, además de 1200 px para escritorio, siguen pendientes de capturas manuales.
- **RNF-02 — Accesibilidad básica:** los controles disponen de etiquetas; el foco visible y la interacción por teclado deben confirmarse en navegador real.
- **RNF-03 — Mantenibilidad:** la estructura separa componentes, páginas, datos y utilidades.
- **RNF-04 — Entorno de desarrollo:** se requiere Node.js compatible con Vite 8; el flujo CI utiliza Node.js 24/npm 11.
- **RNF-05 — Pruebas:** la validación más reciente reporta 22 pruebas aprobadas, sin fallos.
- **RNF-06 — Cobertura:** en la ejecución enlazada, Statements, Branches, Functions y Lines alcanzaron 100% en el código fuente incluido en el alcance V8.
- **RNF-07 — Compilación:** `npm run build` terminó correctamente en CI.
- **RNF-08 — Dependencias:** la auditoría npm de la ejecución enlazada reportó cero vulnerabilidades conocidas.
- **RNF-09 — Privacidad y alcance:** `localStorage` es local al navegador; no representa una solución multiusuario persistente en servidor.

## 6. Matriz de trazabilidad a pruebas

| Requerimiento / comportamiento | Archivo(s) de prueba |
|---|---|
| RF-03 — Precio gratuito y precio positivo | `src/utils/precio.spec.jsx` |
| RF-04, RF-05 — Aviso de cupos críticos y botón agotado | `src/components/TarjetaActividad.spec.jsx` |
| RF-05 — El manejador bloquea inscripción agotada | `src/App.cupos.spec.jsx` |
| RF-02 — Filtro por categoría | `src/pages/Actividades.spec.jsx` |
| RF-07 — Persistencia observada con spy | `src/utils/persistencia.spec.js` |
| RF-09 — Detalle válido e inexistente | `src/pages/DetalleActividad.spec.jsx` |
| RF-01, RF-06, RF-08, RF-10, RF-12 — Portada, alta/baja, persistencia y rutas | `src/App.spec.jsx` |
| RF-11 — Validación del formulario | `src/pages/admin/FormularioActividad.spec.jsx` |
| Guía 14, sección 7 — Servicio asíncrono aislado con mock | `src/services/actividades.spec.js` |

## 7. Límites conocidos

- Las rutas administrativas no cuentan con autenticación y no deben utilizarse como panel de producción.
- Las actividades creadas no se guardan en servidor y no sobreviven a una recarga.
- Las inscripciones se almacenan en el navegador actual, no en un backend.
- El servicio asíncrono es un ejemplo de inyección de dependencia para la guía; no es una integración real con API.
- El 100% de cobertura automatizada no sustituye los ensayos visuales, responsive ni las pruebas de aceptación manuales.

## 8. Estado de validación y evidencias

La ejecución enlazada de GitHub Actions terminó correctamente con nueve archivos de prueba y 22 casos aprobados. El resumen indica 100% en Statements, Branches, Functions y Lines, lint sin errores y build exitoso. También publicó los artefactos `informe-cobertura` y `auditoria-dependencias`; el segundo refleja cero vulnerabilidades conocidas en esa ejecución.

Sigue pendiente que el equipo guarde capturas, compruebe los anchos responsive, pruebe la navegación directamente en navegador y ensaye la defensa individual. Si la pauta requiere despliegue real en AWS EC2/Nginx, debe realizarse en una instancia controlada por el equipo y registrarse su URL/IP y fecha reales.
