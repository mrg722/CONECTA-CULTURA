# Informe de cobertura de pruebas — Conecta Cultura

**Asignatura:** DSY1104 · Desarrollo FullStack II  
**Experiencia:** EA2 — React, responsividad y pruebas unitarias  
**Estado:** plantilla preparada; completar después de ejecutar las pruebas en un entorno con dependencias instaladas.

## 1. Entorno y ejecución

Registrar los datos reales de la ejecución:

| Campo | Dato |
|---|---|
| Sistema operativo | Pendiente de registrar |
| Versión de Node.js | Pendiente de registrar |
| Versión de npm | Pendiente de registrar |
| Navegador usado para verificación manual | Pendiente de registrar |
| Fecha de ejecución | Pendiente de registrar |
| Comando de pruebas | `npm run test:run` |
| Comando de cobertura | `npm run coverage` |
| Comando de compilación | `npm run build` |

No rellenar las métricas con valores supuestos ni basarse en ejecuciones previas a los últimos cambios.

## 2. Alcance

Se consideran las funciones y vistas de la aplicación que se incluyen en el código fuente de `src`. El informe V8 incluye archivos JavaScript/JSX de producción y excluye los archivos de prueba y la configuración de preparación.

La aplicación es un prototipo que mantiene actividades en estado React y guarda inscripciones en `localStorage`. No representa una API remota ni una base de datos del servidor. El ejemplo de servicio asíncrono simulado es didáctico y no se conecta con la aplicación real.

## 3. Matriz de requisitos y pruebas

| ID | Criterio de aceptación | Archivo de prueba | Resultado real |
|---|---|---|---|
| P01 | El precio cero se muestra como «Gratis» | `src/utils/precio.spec.jsx` | Pendiente de ejecutar |
| P02 | El precio positivo incluye el separador de miles | `src/utils/precio.spec.jsx` | Pendiente de ejecutar |
| P03 | La tarjeta presenta el nombre recibido por props | `src/components/TarjetaActividad.spec.jsx` | Pendiente de ejecutar |
| P04 | Los cupos críticos generan el aviso | `src/components/TarjetaActividad.spec.jsx` | Pendiente de ejecutar |
| P05 | El botón de inscripción queda deshabilitado con cero cupos | `src/components/TarjetaActividad.spec.jsx` | Pendiente de ejecutar |
| P06 | La tarjeta presenta la categoría recibida por props | `src/components/TarjetaActividad.spec.jsx` | Pendiente de ejecutar |
| P07 | El clic llama a `onInscribir` con la actividad correcta | `src/components/TarjetaActividad.spec.jsx` | Pendiente de ejecutar |
| P08 | El filtro cambia los resultados visibles | `src/pages/Actividades.spec.jsx` | Pendiente de ejecutar |
| P09 | La persistencia llama a `localStorage.setItem` con la clave y JSON correctos | `src/utils/persistencia.spec.js` | Pendiente de ejecutar |
| P10 | Una actividad inexistente muestra un mensaje | `src/pages/DetalleActividad.spec.jsx` | Pendiente de ejecutar |
| P11 | El mock asíncrono devuelve los nombres previstos sin red real | `src/services/actividades.spec.js` | Pendiente de ejecutar |

**Nota sobre el alcance de la guía:** la tabla principal de la Guía 14 enumera diez comportamientos. La sección 7 también solicita una prueba autónoma del mock de servicio asíncrono; se conserva como prueba adicional, por lo que el repositorio define diez pruebas de la matriz principal más una prueba demostrativa (once en total). Si la pauta de evaluación exige exactamente diez casos contabilizados, el docente debe indicar si esa demostración debe quedar fuera del conteo.

## 4. Métricas reales

Después de ejecutar `npm run coverage`, trasladar los porcentajes de la salida de Vitest:

| Métrica | Resultado |
|---|---:|
| Statements | Pendiente |
| Branches | Pendiente |
| Functions | Pendiente |
| Lines | Pendiente |

El informe detallado debe abrirse en `coverage/index.html`. La salida de consola y el HTML deben corresponder a la misma ejecución.

## 5. Cómo interpretar los resultados

- **Statements:** instrucciones ejecutadas al menos una vez.
- **Branches:** alternativas de condiciones, como verdadero/falso de un `if`.
- **Functions:** funciones llamadas durante las pruebas.
- **Lines:** líneas ejecutables recorridas durante las pruebas.

Una cobertura alta no demuestra por sí sola que las expectativas sean buenas. Para cada línea o rama no cubierta, registrar si el comportamiento requiere otra prueba, si el código es inalcanzable o si está fuera del alcance de esta entrega.

## 6. Hallazgos y acciones de mejora

Completar después de revisar `coverage/index.html`:

| Archivo o línea sin cubrir | Riesgo del comportamiento | Prueba o corrección propuesta | Estado |
|---|---|---|---|
| Pendiente de revisar el informe real | Pendiente | Pendiente | Pendiente |

## 7. Comandos de verificación

Ejecutar dentro de la raíz del repositorio, usando Node.js compatible con las versiones configuradas:

```bash
npm install
npm run test:run
npm run coverage
npm run lint
npm run build
```

Guardar capturas de: todas las pruebas aprobadas, una prueba de interacción, el spy de persistencia, el mock con `vi.fn`, el resumen de cobertura y una línea/rama descubierta junto con la mejora realizada.
