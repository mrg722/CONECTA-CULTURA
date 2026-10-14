# Auditoría punto por punto — Guía práctica 14

**Repositorio:** [mrg722/CONECTA-CULTURA](https://github.com/mrg722/CONECTA-CULTURA)  
**Rama:** `main`  
**Fecha de auditoría:** 14-10-2026  
**Ejecución de validación:** [GitHub Actions — pruebas, cobertura, seguridad y build](https://github.com/mrg722/CONECTA-CULTURA/actions/runs/38578919623)

## Resultado ejecutivo

La implementación de código requerida por la Guía 14 está integrada en `main`. La ejecución automatizada enlazada terminó con éxito: **22 pruebas aprobadas en 9 archivos**, cobertura **100% en Statements, Branches, Functions y Lines**, ESLint correcto, build correcto y auditoría npm con **0 vulnerabilidades conocidas** en esa ejecución.

Quedan tareas que no se pueden concluir solo mediante cambios al repositorio: capturas de navegador y del informe, medición responsive en varios anchos, comprobación manual de navegación/uso, ensayo individual y publicación real en EC2/Nginx si el encargo docente la exige. Se dejan listadas como pendientes, no se declaran realizadas.

## Auditoría apartado por apartado

| Apartado de la guía | Qué exige | Implementación / evidencia | Estado |
|---|---|---|---|
| 1. Propósito | Relacionar pruebas con comportamientos y criterios de aceptación | La matriz de pruebas y el ERS relacionan requisitos con archivos de test | Implementado |
| 2. Resultados de aprendizaje | Diez pruebas, spies/mocks, cobertura y ensayo | Pruebas de precio/UI/estado/persistencia/error, spy y mock asíncrono; informe y guía de presentación documentados | Implementado en código/documentación; ensayo presencial pendiente |
| 3. Ruta de sesión | Instalar, completar pruebas, medir cobertura, documentar y ensayar | Workflow reproducible que instala, audita, prueba, mide cobertura, ejecuta lint y compila | Verificado automáticamente |
| 4. Preparar el trabajo | Instalar, revisar Git, iniciar Vite y comprobar app | `README.md` conserva instrucciones locales; CI usa Node 24 y lockfile sincronizado; pruebas y build CI pasan | CI verificado; apertura manual en el computador pendiente |
| 5. Plan de diez pruebas | Cubrir los diez comportamientos de la tabla de la página 4 | Todos los diez criterios principales aparecen implementados en pruebas dedicadas | Implementado y aprobado |
| 6. Spy de persistencia | Extraer función real y observar `localStorage.setItem` | `src/utils/persistencia.js`, `src/utils/persistencia.spec.js`; spy restaurado en `finally` | Implementado y aprobado |
| 7. Mock de servicio asíncrono | Aislar el servicio y verificar promesa resuelta | `src/services/actividades.js` y `.spec.js`; utiliza inyección de dependencia y `vi.fn().mockResolvedValue` | Implementado y aprobado |
| 8. Generar cobertura | Ejecutar `npm run coverage` y abrir el HTML | `vite.config.js` configura V8 y genera salida de texto/HTML/LCOV; el HTML se subió como artefacto de CI | Generado automáticamente; el equipo debe abrirlo y tomar captura |
| 9. Interpretar informe | Explicar Statements/Branches/Functions/Lines e identificar código no cubierto | El informe refleja 100% en las cuatro métricas y no reporta líneas sin cubrir dentro del alcance configurado | Verificado; sin líneas descubiertas en el alcance actual |
| 10. Documento de cobertura | Entorno, alcance, matriz, métricas, riesgos y mejoras | `docs/INFORME_COBERTURA.md` registra resultados verificados y hallazgos corregidos | Documentado |
| 11. Actualizar ERS | Arquitectura, rutas, persistencia, requisitos funcionales/no funcionales y trazabilidad | `docs/ERS.md` mantiene mapa de rutas, límites del prototipo y relación con pruebas | Documentado |
| 12. Ensayo de presentación | Presentación individual de arquitectura, props/estado, responsividad, mocks y cobertura | Los puntos y tiempos quedan registrados en este archivo; cada integrante aún debe ensayar con su código y commits reales | Pendiente del equipo |
| 13. Auditoría final | Verificar código, pruebas, informe, ERS, ZIP/enlace y aporte individual | El código principal pasa CI y el repositorio incluye documentos y enlace; evidencias locales, ZIP y defensa individual aún no se han suministrado | Parte del repositorio completada; evidencia presencial pendiente |
| Evidencias | Capturas de tests, interacción, spy, mock y coverage | El artefacto de cobertura está en la ejecución de Actions vinculada arriba | Artefacto disponible; capturas individuales pendientes |
| Cierre Git | Revisar estado, commit y publicación remota | Cambios publicados en `main`; lockfile sincronizado y workflow aprobado | Cumplido para la rama remota |

## Matriz de los diez comportamientos principales

| N.º | Criterio de aceptación | Archivo | Resultado en CI |
|---|---|---|---|
| 1 | Precio cero se muestra como «Gratis» | `src/utils/precio.spec.jsx` | Aprobado |
| 2 | Precio positivo usa separador de miles | `src/utils/precio.spec.jsx` | Aprobado |
| 3 | Tarjeta muestra el nombre recibido por props | `src/components/TarjetaActividad.spec.jsx` | Aprobado |
| 4 | Cupos críticos muestran aviso | `src/components/TarjetaActividad.spec.jsx` | Aprobado |
| 5 | Cero cupos deshabilita el botón | `src/components/TarjetaActividad.spec.jsx` | Aprobado |
| 6 | Tarjeta muestra categoría recibida por props | `src/components/TarjetaActividad.spec.jsx` | Aprobado |
| 7 | El clic llama a `onInscribir` con la actividad | `src/components/TarjetaActividad.spec.jsx` | Aprobado |
| 8 | El filtro cambia los resultados | `src/pages/Actividades.spec.jsx` | Aprobado |
| 9 | Persistencia usa `localStorage` con clave y JSON correctos | `src/utils/persistencia.spec.js` | Aprobado |
| 10 | Actividad inexistente presenta mensaje | `src/pages/DetalleActividad.spec.jsx` | Aprobado |

La guía pide diez comportamientos en su tabla principal, pero también pide una prueba autónoma del mock asíncrono en la sección 7. Para cumplir ambos bloques, el repo contiene diez criterios principales y más pruebas complementarias para detalle válido, inscripción y duplicados, eliminación/persistencia, rutas, administración y formularios. En total hay **22 tests**; no se reduce el conjunto a diez repetidos ni se ocultan pruebas extra.

## Resultados objetivos de la validación

| Comprobación | Resultado |
|---|---|
| Ejecución CI | Exitosa |
| Archivos de test | 9 aprobados |
| Pruebas | 22 aprobadas, 0 fallidas |
| Statements | 100% |
| Branches | 100% |
| Functions | 100% |
| Lines | 100% |
| Líneas sin cubrir del alcance configurado | Ninguna |
| ESLint | Correcto |
| Compilación `npm run build` | Correcta |
| `npm audit` | 0 vulnerabilidades conocidas en la ejecución enlazada |
| Artefactos | Informe de cobertura HTML y auditoría npm |

El workflow ejecutó Node.js 24/npm 11, actualizó React Router a `7.18.4` y sincronizó el lockfile. La ejecución de seguridad referenciada reportó `total: 0`. El informe es relativo a la ejecución indicada; los paquetes pueden cambiar con el tiempo, por lo que CI debe continuar ejecutándose.

## Documentos que forman parte de la entrega

- `docs/ERS.md`: arquitectura, rutas, requisitos funcionales y no funcionales, trazabilidad y límites.
- `docs/INFORME_COBERTURA.md`: entorno, test matrix, porcentajes, lectura del informe y mejoras.
- `README.md`: instrucciones locales, matriz de tests y elementos manuales pendientes.
- `.github/workflows/validar.yml`: validación repetible de instalación, auditoría, tests, coverage, lint, build y publicación de artefactos.

## Pendientes reales que requieren al equipo

- [ ] Abrir la app localmente tras seleccionar Node 24 con nvm-windows; el entorno local anterior con Node 14 no sirve para estas herramientas.
- [ ] Probar directamente las rutas en el navegador, incluyendo `/actividades/2` y una ruta 404, y recargar una ruta interna.
- [ ] Probar visualmente la interfaz a 375, 768, 1024 y 1440 px; además comprobar navegación a 1200 px.
- [ ] Confirmar foco de teclado, etiquetas, ajuste de tarjetas/formularios e inexistencia de scroll horizontal.
- [ ] Guardar capturas de las 22 pruebas, la interacción, el spy, el mock y el informe HTML.
- [ ] Abrir la sección detallada del HTML para capturar las métricas (no hay líneas sin cubrir dentro del alcance, así que el hallazgo de mejora debe ser la expansión de cobertura ya realizada, no una línea ficticia).
- [ ] Ensayar individualmente una presentación de 12 minutos: problema/arquitectura (2), componente/props/estado (3), responsividad (2), dos pruebas y mock (3), cobertura/hallazgo/mejora (2).
- [ ] Si el encargo exige publicación, desplegar la compilación en una instancia EC2 Ubuntu con Nginx, recargar una ruta interna y registrar solo la IP/URL y la fecha reales.
- [ ] Preparar el ZIP final siguiendo la pauta docente; excluir `node_modules` y `coverage` si lo solicitan.

No se declaran listas las capturas, la revisión visual, el ensayo individual, la IP de EC2 ni el ZIP porque deben generarse o comprobarse por el equipo en su entorno real.
