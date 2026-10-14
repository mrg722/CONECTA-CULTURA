# Informe de cobertura de pruebas — Conecta Cultura

**Asignatura:** DSY1104 · Desarrollo FullStack II  
**Experiencia:** EA2 — React, responsividad y pruebas unitarias  
**Fecha del informe:** 14-10-2026  
**Ejecución de referencia:** [GitHub Actions, validación completada](https://github.com/mrg722/CONECTA-CULTURA/actions/runs/38578919623)  
**Estado:** pruebas, cobertura, lint y compilación aprobados automáticamente.

## 1. Entorno y ejecución

| Campo | Resultado verificado |
|---|---|
| Entorno de CI | GitHub Actions, `ubuntu-latest` |
| Node.js | 24.x |
| npm | 11.x |
| Framework de pruebas | Vitest 4.1.11 |
| Archivos de prueba | 9 aprobados |
| Pruebas | 22 aprobadas, 0 fallidas |
| Comando de pruebas | `npm run test:run` |
| Comando de cobertura | `npm run coverage` |
| Lint | `npm run lint`, terminado sin errores ni advertencias ESLint |
| Build | `npm run build`, terminado correctamente |
| Auditoría npm | 0 vulnerabilidades conocidas en la ejecución enlazada |

El workflow publicó los artefactos `informe-cobertura` y `auditoria-dependencias`. El HTML de cobertura queda disponible como artefacto en la ejecución enlazada; GitHub conserva el artefacto durante 14 días según la configuración del workflow.

## 2. Alcance de la medición

La configuración V8 incluye archivos de producción con el patrón `src/**/*.{js,jsx}` y excluye archivos de pruebas, la configuración de preparación y `src/main.jsx` (punto de entrada que conecta la app con el DOM). La medición abarca:

- Estado, rutas, inscripción y persistencia coordinados desde `src/App.jsx`.
- Componentes reutilizables y páginas públicas.
- Vistas y formulario administrativo.
- Datos estáticos de actividades.
- Utilidades de formato/precio y persistencia.
- Ejemplo didáctico de servicio asíncrono usado para aprender mocks.

La aplicación sigue siendo un prototipo de frontend: no cuenta con API remota ni base de datos de servidor. El ejemplo de servicio asíncrono está aislado para la práctica y no se conecta con la aplicación real. Las inscripciones se guardan en `localStorage`, por lo que son locales al navegador y no representan persistencia multiusuario.

## 3. Matriz de requisitos y pruebas

| ID | Criterio de aceptación | Archivo(s) de prueba | Resultado |
|---|---|---|---|
| P01 | El precio cero se muestra como «Gratis» | `src/utils/precio.spec.jsx` | Aprobado |
| P02 | El precio positivo incluye separador de miles | `src/utils/precio.spec.jsx` | Aprobado |
| P03 | La tarjeta presenta el nombre recibido por props | `src/components/TarjetaActividad.spec.jsx` | Aprobado |
| P04 | Los cupos críticos generan el aviso | `src/components/TarjetaActividad.spec.jsx` | Aprobado |
| P05 | El botón queda deshabilitado con cero cupos | `src/components/TarjetaActividad.spec.jsx` | Aprobado |
| P06 | La tarjeta presenta la categoría recibida por props | `src/components/TarjetaActividad.spec.jsx` | Aprobado |
| P07 | El clic llama a `onInscribir` con la actividad correcta | `src/components/TarjetaActividad.spec.jsx` | Aprobado |
| P08 | El filtro cambia los resultados visibles | `src/pages/Actividades.spec.jsx` | Aprobado |
| P09 | Guardar llama a `localStorage.setItem` con clave y JSON correctos | `src/utils/persistencia.spec.js` | Aprobado |
| P10 | Una actividad inexistente muestra un mensaje | `src/pages/DetalleActividad.spec.jsx` | Aprobado |
| P11 | El servicio asíncrono simulado devuelve los nombres esperados | `src/services/actividades.spec.js` | Aprobado |
| P12 | Una actividad existente muestra su detalle | `src/pages/DetalleActividad.spec.jsx` | Aprobado |
| P13 | Se muestra portada, navegación, imagen y pie de página | `src/App.spec.jsx` | Aprobado |
| P14 | Inscribir actualiza cupos y evita duplicados | `src/App.spec.jsx` | Aprobado |
| P15 | Eliminar inscripción persiste el cambio y devuelve cupo | `src/App.spec.jsx` | Aprobado |
| P16 | La administración permite crear y borrar una actividad | `src/App.spec.jsx` | Aprobado |
| P17 | Categorías, ofertas y 404 renderizan el resultado esperado | `src/App.spec.jsx` | Aprobado |
| P18 | Los campos vacíos muestran mensajes de validación | `src/pages/admin/FormularioActividad.spec.jsx` | Aprobado |
| P19 | Los cupos negativos son rechazados | `src/pages/admin/FormularioActividad.spec.jsx` | Aprobado |
| P20 | El manejador no acepta una inscripción sin cupos disponibles | `src/App.cupos.spec.jsx` | Aprobado |

La matriz principal de la Guía 14 especifica diez comportamientos. La sección de mock asíncrono pide un ejemplo adicional y se agregaron pruebas complementarias de flujo y administración. Por eso el total verificado del repositorio es **22 pruebas**, no solo las diez iniciales.

## 4. Métricas V8 verificadas

| Métrica | Resultado |
|---|---:|
| Statements (sentencias) | 100% |
| Branches (ramas) | 100% |
| Functions (funciones) | 100% |
| Lines (líneas) | 100% |
| Líneas sin cubrir en el alcance medido | Ninguna |

Estos resultados corresponden a la ejecución enlazada del 14-10-2026 después de ampliar las pruebas para incluir las ramas de la aplicación, detalles válidos/no válidos y las validaciones administrativas.

## 5. Interpretación

- **Statements:** instrucciones ejecutadas al menos una vez.
- **Branches:** alternativas condicionales recorridas, por ejemplo los resultados verdadero/falso de una condición.
- **Functions:** funciones invocadas por las pruebas.
- **Lines:** líneas ejecutables recorridas.

Una cobertura alta no garantiza por sí sola que todas las expectativas sean correctas ni sustituye las pruebas manuales de aceptación. El 100% de este informe indica que todas las sentencias, ramas, funciones y líneas incluidas en el alcance declarado fueron recorridas en esa ejecución.

## 6. Hallazgos y mejoras implementadas

| Hallazgo inicial | Riesgo | Mejora implementada | Resultado |
|---|---|---|---|
| Escritura de localStorage directa dentro de `App.jsx` | Difícil probar el contrato de persistencia de forma aislada | Se extrajo `guardarInscripciones` a `src/utils/persistencia.js` y se cubrió mediante spy | Cubierto |
| No había prueba dedicada para actividad inexistente | La ruta de error podía quedar sin verificar | Se agregó test de detalle inexistente y otro de detalle válido | Cubierto |
| Faltaba prueba directa de la rama de cupos agotados en el manejador | Podía regresionar la protección ante una llamada directa | Se agregó `src/App.cupos.spec.jsx` | Cubierto |
| Faltaban pruebas de administración y validación del formulario | Errores de campos y altas/bajas podían pasar inadvertidos | Se agregaron pruebas de crear/eliminar, campos vacíos y cupos negativos | Cubierto |
| Lockfile desincronizado y avisos de dependencias anteriores | Instalación no reproducible y paquetes con avisos de seguridad conocidos | Se sincronizó `package-lock.json`, se actualizó React Router y el workflow registró `npm audit` con total 0 | Corregido en la ejecución referenciada |

La configuración de GitHub Actions instala dependencias, registra los cambios del lockfile cuando corresponde, ejecuta `npm audit`, las pruebas, la cobertura, ESLint y la compilación. Las actualizaciones de dependencias se aplican sin `--force`.

## 7. Cómo repetir la verificación

Desde la carpeta raíz del repositorio, usa Node.js 24 o una versión compatible y las dependencias instaladas:

```bash
npm ci
npm run test:run
npm run coverage
npm run lint
npm run build
```

El informe HTML local se genera en `coverage/index.html`. No modifiques archivos dentro de `coverage`: son salidas generadas. Para comprobar los resultados actuales del repo, abre la ejecución enlazada de GitHub Actions y consulta el artefacto `informe-cobertura`.

## 8. Evidencias manuales pendientes

Estas actividades necesitan comprobación directa por el equipo y no se presentan como completadas por la ejecución automatizada:

- [ ] Captura del resumen de las 22 pruebas aprobadas.
- [ ] Captura de una prueba de interacción.
- [ ] Captura de `vi.spyOn` y la llamada a `setItem`.
- [ ] Captura de `vi.fn().mockResolvedValue`.
- [ ] Captura del informe HTML y sus cuatro métricas.
- [ ] Capturas responsivas a 375, 768, 1024 y 1440 px, y 1200 px para navegación de escritorio.
- [ ] Verificación manual de navegación directa, recarga, formulario y accesibilidad básica.
- [ ] Si la evaluación exige EC2, captura de Nginx sirviendo el sitio y de una ruta interna tras recargar, con URL/IP y fecha reales.
- [ ] Ensayo individual de cada integrante y evidencia de sus aportes reales.

No se inventan porcentajes, capturas, IP de despliegue ni resultados de comprobación manual.
