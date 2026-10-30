# Integración de las Guías 15, 16 y 17

Este documento registra cómo quedó integrado en el repositorio el backend Spring
Boot y qué pide cada guía. El repositorio pasó a ser un monorepo: el frontend
React permanece en la raíz y el backend quedó en `backend/`.

## Estructura

| Ruta | Contenido |
| --- | --- |
| `src/`, `index.html`, `vite.config.js` | Frontend React + Vite |
| `backend/` | Backend Spring Boot (paquete `cl.duoc.conectacultura`) |
| `.env.development`, `.env.example` | Dirección de la API para Vite |
| `docs/` | ERS, informe de cobertura y auditorías |

El backend se incorporó desde el proyecto Spring Boot del equipo. Sus clases se
movieron de `com.example.demo` a `cl.duoc.conectacultura`, que es el paquete que
indican las guías, y no se copió `target/`.

## Guía 15 — Backend y API REST CRUD

| Requisito | Dónde quedó |
| --- | --- |
| Excepción de recurso ausente | `backend/src/main/java/cl/duoc/conectacultura/exception/RecursoNoEncontradoException.java` |
| Servicio con reglas de negocio | `service/ActividadService.java` |
| Controlador REST con los cinco endpoints | `controller/ActividadController.java` |
| Manejo global de errores (400 y 404) | `exception/GlobalExceptionHandler.java` |
| Validación del cuerpo JSON | `@Valid` en el controlador y restricciones en `model/Actividad.java` |
| Consulta por categoría | `repository/ActividadRepository.findByCategoriaIgnoreCase` |
| Conexión MySQL por variables de entorno | `src/main/resources/application.properties` |
| Swagger / OpenAPI | dependencia `springdoc-openapi-starter-webmvc-ui` en `pom.xml` |

Contrato comprobado:

| Operación | Método y ruta | Respuesta |
| --- | --- | --- |
| Listar | `GET /api/actividades` | 200 y arreglo |
| Buscar | `GET /api/actividades/{id}` | 200 o 404 |
| Crear | `POST /api/actividades` | 201 o 400 |
| Actualizar | `PUT /api/actividades/{id}` | 200, 400 o 404 |
| Eliminar | `DELETE /api/actividades/{id}` | 204 o 404 |

Las restricciones de `Actividad` usan los mismos límites que el formulario de la
Guía 16: nombre hasta 100 caracteres, descripción hasta 500, categoría hasta 60,
y precio y cupos obligatorios y no negativos.

## Guía 16 — Integración React y CRUD completo

| Requisito | Dónde quedó |
| --- | --- |
| Dirección de la API por ambiente | `.env.development` y `.env.example` |
| Servicio HTTP con las cinco operaciones | `src/services/actividadService.js` |
| Cartelera que consume la API con estados de carga, error y lista vacía | `src/pages/Actividades.jsx` |
| CORS acotado al origen de Vite | `backend/.../config/WebConfig.java` |
| Formulario único que crea y edita | `src/pages/ActividadForm.jsx` |
| Rutas de creación y edición | `src/App.jsx` |
| Eliminar desde el listado administrativo | `src/pages/admin/AdminActividades.jsx` |

Cada página pide sus propios datos a la API: `Actividades` y `Categorias` con
`listarActividades`, `DetalleActividad` con `buscarActividad` y
`AdminActividades` con `listarActividades` y `eliminarActividad`. Por eso se
retiró `src/data/actividades.js`, que era el origen local de datos, y el
formulario administrativo embebido quedó reemplazado por `ActividadForm`, que
crea y edita según la ruta.

Las inscripciones de la Guía 14 siguen guardándose en `localStorage`. Los cupos
que se muestran son ahora los que entrega el backend, de modo que ya no se
descuentan en memoria al inscribirse.

## Guía 17 — Autenticación JWT y control de acceso

| Requisito | Dónde quedó |
| --- | --- |
| Entidad de usuario con hash y rol | `model/Usuario.java` |
| Búsqueda por nombre de usuario | `repository/UsuarioRepository.java` |
| Generación, validación y lectura de claims | `security/JwtService.java` |
| Lectura del encabezado Bearer | `security/JwtAuthenticationFilter.java` |
| Rutas públicas, roles y política sin sesión | `config/SecurityConfig.java` |
| Login que devuelve el token | `controller/AuthController.java` |
| DTO de entrada y de salida | `dto/LoginRequest.java` y `dto/LoginResponse.java` |
| Cliente HTTP único que envía el token | `src/services/api.js` |
| Contexto de sesión con login, logout y restauración | `src/context/AuthProvider.jsx` y `src/context/AuthContext.jsx` |
| Ruta protegida por rol | `src/components/RutaProtegida.jsx` |
| Rol visible y botón de cierre de sesión | `src/components/Navegacion.jsx` |

Matriz de permisos comprobada contra la API en ejecución:

| Operación | Anónimo | USER | ADMIN |
| --- | --- | --- | --- |
| `GET /api/actividades` | 200 | 200 | 200 |
| `POST /api/actividades` | 401 | 403 | 201 |
| `PUT /api/actividades/{id}` | 401 | 403 | 200 |
| `DELETE /api/actividades/{id}` | 401 | 403 | 204 |

Un token ausente o inválido responde 401 y una identidad válida sin rol ADMIN
responde 403. `RutaProtegida` solo mejora la navegación: ocultar botones en
React no otorga acceso, porque la comprobación real ocurre en el backend.

## Decisiones tomadas durante la integración

Estas piezas no aparecen escritas en las guías, pero el conjunto no funcionaría
sin ellas. Quedan registradas para que el equipo pueda revisarlas.

1. **Punto de entrada 401.** Spring Security responde 403 de forma
   predeterminada cuando falta autenticación. `SecurityConfig` declara un
   `HttpStatusEntryPoint(UNAUTHORIZED)` para cumplir la distinción 401/403 que
   exige la Guía 17, y permite `/error` para que el rechazo del login conserve
   su código.
2. **Cuentas iniciales.** La Guía 17 pide comprobar la matriz con USER y ADMIN,
   pero no indica cómo se crean. `config/UsuariosInicialesConfig.java` las crea
   solo si se entregan `ADMIN_PASSWORD` y `USER_PASSWORD` como variables de
   entorno; sin ellas no se crea ninguna cuenta y ninguna clave queda en Git.
3. **Perfil `dev` con H2.** `application.properties` mantiene MySQL con
   variables de entorno, como indica la Guía 15. `application-dev.properties`
   agrega una base H2 en memoria para levantar y probar la API sin instalar
   MySQL. Las pruebas (`./mvnw test`) usan la misma idea en
   `src/test/resources/application.properties`.
4. **Un solo cliente HTTP.** La Guía 16 define `actividadService.js` con `fetch`
   y la Guía 17 introduce `apiFetch` como única función de acceso. Se conservaron
   los nombres y las firmas de la Guía 16, y todas pasan por `apiFetch`.
5. **Restauración de la sesión.** El contexto lee `sessionStorage` al inicializar
   el estado y no dentro de un efecto. Hacerlo en un efecto expulsaba al login a
   quien recargaba una dirección administrativa, lo que incumple la lista de
   cotejo de la Guía 17.
6. **Pruebas adaptadas.** Las pruebas que dependían del origen local de datos
   ahora simulan el servicio de API, y se agregaron pruebas para los archivos
   nuevos. La cobertura se mantiene en 100%.
