# Auditoría punto por punto — Guía práctica 14

**Repositorio:** [mrg722/CONECTA-CULTURA](https://github.com/mrg722/CONECTA-CULTURA)  
**Rama objetivo:** `main`  
**Fecha de actualización:** 14-10-2026  
**Criterio:** separar la implementación que se puede preparar en el repositorio de la verificación que requiere ejecutar la app en un computador, abrir el informe o hacer una presentación individual.

## Resultado de la revisión previa

- La configuración base de Vitest y las cinco pruebas de la Guía 13 ya existían.
- No existía una función aislada `guardarInscripciones`; `App.jsx` llamaba a `localStorage.setItem` directamente.
- Faltaban pruebas automatizadas para cupos cero, categoría recibida por props, el filtro, la persistencia observada con spy y actividad inexistente.
- El informe de cobertura y la actualización formal del ERS no estaban documentados como archivos separados.
- `package-lock.json` no contiene las nuevas dependencias de Vitest/Testing Library de `package.json`; debe sincronizarse con `npm install` desde Node compatible. No conviene ejecutar `npm ci` antes de sincronizarlo.

## Matriz de implementación

| Apartado de la guía | Cambio en el repositorio | Estado |
|---|---|---|
| 1–3. Propósito, resultados y ruta de clase | Documentados en esta auditoría y en los archivos de pruebas/cobertura | Preparado |
| 4. Preparar/clonar/comprobar | Instrucciones previas preservadas en `README.md`; requiere verificar `git status`, Node/npm y ejecución local | Parcial: depende del entorno local |
| 5. Plan de diez pruebas | Se implementan los diez criterios principales, distribuidos entre precio, tarjeta, filtro, persistencia y detalle | Código preparado; ejecución pendiente |
| 6. Spy de persistencia | Se añadió `src/utils/persistencia.js`; `App.jsx` llama la utilidad y `persistencia.spec.js` espía `Storage.prototype.setItem` con restauración segura | Código preparado; ejecución pendiente |
| 7. Mock de servicio asíncrono | Se añadió `src/services/actividades.js` con inyección de dependencia y prueba con `vi.fn().mockResolvedValue` | Código preparado; ejecución pendiente |
| 8. Generar cobertura | `vite.config.js` configura V8, salida de consola, HTML y LCOV; script `coverage` ya está en `package.json` | Configurado; informe real pendiente |
| 9. Interpretar cobertura | `docs/INFORME_COBERTURA.md` explica Statements, Branches, Functions y Lines y ofrece espacio para líneas no cubiertas | Plantilla preparada; completar al generar reporte |
| 10. Documento de cobertura | Se creó `docs/INFORME_COBERTURA.md`; los porcentajes no se inventan | Preparado; completar con resultados reales |
| 11. Actualizar ERS | Se creó `docs/ERS.md` con arquitectura, rutas, persistencia, requisitos, criterios y trazabilidad | Preparado |
| 12. Ensayo de presentación | La guía de doce minutos y sus puntos quedan registrados en esta auditoría; cada integrante debe practicar su código y commits reales | Pendiente de realizar por el equipo |
| 13. Auditoría final | Este archivo lista lo implementado y las comprobaciones pendientes | Preparado |
| Evidencias | Matriz de capturas incluida en la sección final de este documento | Capturas reales pendientes |
| Cierre Git | Cambios preparados para un commit en `main`; la sincronización de lockfile y las verificaciones locales deben registrarse después | Parcial |

## Conteo de pruebas: aclaración necesaria

La matriz principal de la página 4 especifica **diez comportamientos**. La sección 7 pide, además, un ejemplo autónomo de prueba de servicio asíncrono. Para implementar ambos bloques sin ocultar una prueba, se conserva ese ejemplo como una undécima prueba: diez pruebas de aceptación de la matriz y una prueba didáctica de mock. Si la evaluación exige exactamente diez casos ejecutados, confírmese si la prueba demostrativa debe excluirse del conteo; no se elimina silenciosamente.

## Comandos de validación local

Ejecutar desde la raíz del repositorio con Node compatible con Vite 8:

```bash
node -v
npm -v
npm install
npm run test:run
npm run coverage
npm run lint
npm run build
```

El proyecto ya tuvo fallos de ejecución local con Node.js 14 por ser demasiado antiguo para las versiones actuales de Vite/Vitest/ESLint. En esa máquina, cambiar a Node.js 22.16.0 o a otra versión que satisfaga Vite 8 antes de ejecutar las verificaciones. Después de `npm install`, revisar `git status` y registrar el `package-lock.json` actualizado.

## Evidencias que deben producirse de verdad

- [ ] Captura de todas las pruebas aprobadas.
- [ ] Captura de prueba de evento y props.
- [ ] Captura del spy y la llamada a `setItem`.
- [ ] Captura de `vi.fn().mockResolvedValue` y el resultado asíncrono.
- [ ] Captura del resumen V8 con las cuatro métricas.
- [ ] Captura de una línea o rama no cubierta y su mejora.
- [ ] Capturas responsivas en 375, 768, 1200 y, para la matriz de Guía 14, 1024 y 1440 px.
- [ ] Pruebas manuales de navegación, inscripción, recarga, filtro y formulario administrativo.
- [ ] Si se exige despliegue: instancia EC2 real, Nginx funcionando, una ruta interna recargada, IP/URL y fecha reales.
- [ ] Ensayo individual de cada integrante con sus commits propios.

No se registran valores de cobertura, capturas, IP pública, despliegue ni resultados de pruebas que todavía no hayan sido obtenidos.
