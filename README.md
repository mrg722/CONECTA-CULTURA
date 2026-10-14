# Conecta Cultura

Aplicación de **DSY1104 · Desarrollo FullStack II**, desarrollada con React, Vite, Bootstrap y React Bootstrap.

Este repositorio incorpora los trabajos autónomos de las Guías 9, 10 y 11, la grilla responsiva y el flujo de despliegue de la Guía 12, y la configuración de pruebas de la Guía 13. Las pruebas manuales, las capturas y la publicación real en EC2 deben verificarse en el entorno donde se ejecuta el proyecto; no se marcan como realizadas antes de comprobarlas.

## Ejecutar el proyecto en Windows

### 1. Abrir PowerShell o CMD

Abre **PowerShell** o el **Símbolo del sistema (CMD)**.

En PowerShell comprueba la carpeta actual:

```powershell
pwd
```

Para revisar los archivos de esa carpeta:

```powershell
dir
```

### 2. Entrar a la carpeta del proyecto

Si el proyecto está guardado en la ruta usada durante el trabajo:

```powershell
cd "C:\Users\av-alumno\CONECTA-CULTURA"
```

Comprueba que estás en la carpeta correcta:

```powershell
pwd
```

### 3. Instalar dependencias

Ejecuta:

```powershell
npm install
```

Este comando instala las dependencias de `package.json` y sincroniza `package-lock.json` en la copia local cuando haya nuevas dependencias.

**Importante:** después de incorporar las herramientas de pruebas, ejecuta `npm install` antes de usar los comandos de prueba o de compilación. No uses `npm ci` hasta que el archivo de bloqueo esté sincronizado con las dependencias actuales.

### 4. Abrir el proyecto en Visual Studio Code

Desde la carpeta del proyecto ejecuta:

```powershell
code .
```

### 5. Iniciar la aplicación

En la terminal integrada de Visual Studio Code, o en PowerShell dentro del proyecto, ejecuta:

```powershell
npm run dev
```

Vite mostrará una dirección local similar a:

```text
http://localhost:5173/
```

Mantén abierta la terminal. Para abrir la página, mantén presionada la tecla **Ctrl** y haz clic en la dirección de la terminal; también puedes copiarla y escribirla en el navegador.

### 6. Revisar errores

En el navegador presiona **F12** y abre la pestaña **Consola**. Revisa que no aparezcan errores rojos mientras navegas por las páginas.

## Rutas que se deben comprobar

Con Vite ejecutándose, abre estas direcciones una a una:

```text
http://localhost:5173/
http://localhost:5173/actividades
http://localhost:5173/actividades/1
http://localhost:5173/actividades/2
http://localhost:5173/actividades/999
http://localhost:5173/categorias
http://localhost:5173/ofertas
http://localhost:5173/inscripciones
http://localhost:5173/admin/actividades
http://localhost:5173/esta-ruta-no-existe
```

La dirección con el número `999` debe mostrar que la actividad no existe. La dirección `/esta-ruta-no-existe` debe mostrar la página 404.

## Guía 9 — Componentes React y React Bootstrap

El proyecto tiene componentes reutilizables para la cabecera, navegación, bienvenida, tarjetas, inscripciones y pie de página. La portada utiliza el texto de bienvenida y la imagen `hero.png`. El componente `PiePagina` está integrado en `App`.

### Pruebas pendientes de registrar

- [ ] Abrir la aplicación y comprobar la consola sin errores.
- [ ] Guardar una captura de la estructura `src/components`.
- [ ] A 375 px, comprobar que el menú se muestra cerrado, que se puede abrir y que sus enlaces funcionan.
- [ ] A 1200 px, comprobar que la navegación queda visible sin el botón del menú.
- [ ] Guardar una captura del menú cerrado y otra del menú abierto a 375 px.

## Guía 10 — Datos, filtro, inscripciones y persistencia

Los datos de las ocho actividades se encuentran en `src/data/actividades.js`. El arreglo contiene cinco categorías: Música, Artes visuales, Tecnología, Cultura y Bienestar.

### Pruebas manuales

1. Abre **Actividades** y comprueba que se muestran las tarjetas.
2. Cambia el filtro por cada categoría y confirma que la lista cambia.
3. Comprueba que una actividad con precio cero muestra **Gratis**.
4. Comprueba que se muestra el aviso de últimos cupos cuando quedan cinco cupos o menos, siempre que sean más de cero.
5. Comprueba que la actividad sin cupos tiene el botón **Inscribirme** deshabilitado.
6. Inscríbete en una actividad con cupos disponibles y comprueba que el número baja en uno.
7. Intenta inscribirte otra vez en la misma actividad y comprueba que no se crea un duplicado.
8. Abre **Inscripciones** y elimina la inscripción.
9. Comprueba que el cupo se devuelve.
10. Recarga el navegador con **F5** y verifica que las inscripciones siguen presentes y que los cupos continúan coherentes.

- [ ] Guardar captura de la cartelera generada desde el arreglo.
- [ ] Guardar captura del filtro aplicado.
- [ ] Guardar captura de una inscripción agregada y de su eliminación.
- [ ] Guardar captura de la persistencia después de recargar.

## Guía 11 — Rutas, formulario y administración

El formulario administrativo es controlado por el estado de React y presenta mensajes junto a los campos con errores.

### Comprobar el formulario

Abre:

```text
http://localhost:5173/admin/actividades
```

Haz estas pruebas:

- [ ] Enviar el formulario vacío y comprobar el error de nombre.
- [ ] Dejar la categoría sin seleccionar y comprobar el error.
- [ ] Dejar cupos vacío y comprobar el error.
- [ ] Ingresar un número negativo de cupos y comprobar el error.
- [ ] Completar datos válidos y comprobar que la nueva actividad aparece en la lista.
- [ ] Eliminar una actividad desde la administración y comprobar que desaparece de esa lista.

### Comprobar rutas directas

Escribe las direcciones de la sección **Rutas que se deben comprobar** directamente en la barra del navegador; no llegues a todas ellas únicamente mediante los enlaces. Esto permite revisar el detalle por identificador, las rutas internas y la página 404.

- [ ] Guardar captura del mapa de rutas funcionando.
- [ ] Guardar captura del detalle obtenido mediante un identificador.
- [ ] Guardar captura del formulario con errores visibles.
- [ ] Guardar captura de una nueva actividad creada y mostrada en la lista.

## Guía 12 — Diseño responsivo y compilación de producción

La cartelera utiliza la grilla responsiva de React Bootstrap:

- `xs={12}`: una tarjeta por fila en pantallas estrechas.
- `md={6}`: dos tarjetas por fila desde el punto de quiebre mediano.
- `lg={4}`: tres tarjetas por fila desde el punto de quiebre grande.

### Matriz de revisión responsiva

Activa la vista de dispositivo en Chrome o Edge con **Ctrl + Shift + M**. Introduce cada ancho manualmente y revisa menú, formulario, tarjetas, botones, foco visible, imágenes y desplazamiento horizontal.

| Ancho | Qué comprobar | Estado de la prueba |
|---|---|---|
| 375 px | Menú, formulario, tarjetas y botones táctiles | Pendiente |
| 768 px | Dos columnas y espaciado | Pendiente |
| 1024 px | Administración, navegación y controles | Pendiente |
| 1440 px | Ancho del contenido y lectura | Pendiente |
| 1200 px | Menú de escritorio y enlaces visibles | Pendiente |

No marques una prueba como completada hasta verla en el navegador.

- [ ] Corregir cualquier desbordamiento horizontal observado.
- [ ] Comprobar que el foco del teclado sea visible.
- [ ] Comprobar que el control de categoría conserve su etiqueta.
- [ ] Comprobar que las imágenes no se salgan de su contenedor y tengan texto alternativo.
- [ ] Guardar las capturas de 375, 768 y 1200 px.

### Generar y revisar la compilación de producción

En la terminal, dentro del proyecto, ejecuta:

```powershell
npm run build
npm run preview
```

Si el primer comando termina correctamente, Vite genera la carpeta `dist`. El segundo ejecuta una vista previa local de esa compilación; **no equivale a publicarla en Internet**.

- [ ] Confirmar que `npm run build` termina sin errores.
- [ ] Abrir la dirección que indica `npm run preview`.
- [ ] Abrir una ruta interna y recargarla para comprobar que la compilación conserva la navegación.

### Publicación en AWS EC2 y Nginx

**Estado actual: pendiente de ejecución en una instancia EC2 real.** El repositorio no contiene una IP pública ni una URL de despliegue verificada, por lo que no se registra una dirección o fecha inventada. Nunca subas el archivo privado `.pem` al repositorio ni lo compartas en el chat.

#### A. Preparar la instancia

En AWS Academy, crea o utiliza la instancia Ubuntu indicada por la guía. El grupo de seguridad debe permitir SSH por el puerto 22 solamente desde tu IP pública actual con máscara `/32`, y HTTP por el puerto 80 desde Internet. Anota la IP pública de la instancia.

#### B. Proteger la llave desde PowerShell

En PowerShell, entra en la carpeta donde está tu llave y reemplaza `CLAVE.pem` por su nombre real:

```powershell
icacls ".\CLAVE.pem" /inheritance:r
icacls ".\CLAVE.pem" /grant:r "$($env:USERNAME):(R)"
icacls ".\CLAVE.pem" /remove:g "*S-1-5-32-545" "*S-1-5-11" "*S-1-1-0"
icacls ".\CLAVE.pem"
```

Conecta reemplazando `IP_PUBLICA` por la dirección de tu instancia:

```powershell
ssh -i ".\CLAVE.pem" ubuntu@IP_PUBLICA
```

Si SSH pregunta si deseas confiar en la huella de la instancia correcta, confirma según las instrucciones de la guía.

#### C. Instalar Nginx en la instancia

Estos comandos se ejecutan **dentro de la sesión SSH de Ubuntu**, no en PowerShell:

```bash
sudo apt update
sudo apt install -y nginx
sudo systemctl enable --now nginx
sudo systemctl is-active nginx
sudo nginx -t
```

#### D. Construir y copiar el sitio

Vuelve a PowerShell local y, desde la carpeta del proyecto, genera la compilación:

```powershell
npm run build
ssh -i ".\CLAVE.pem" ubuntu@IP_PUBLICA "mkdir -p /tmp/conecta-cultura"
scp -i ".\CLAVE.pem" -r ".\dist\*" ubuntu@IP_PUBLICA:/tmp/conecta-cultura/
```

En la sesión SSH de Ubuntu copia los archivos al directorio publicado y asigna permisos de lectura:

```bash
sudo mkdir -p /var/www/conecta-cultura
sudo cp -a /tmp/conecta-cultura/. /var/www/conecta-cultura/
sudo chown -R www-data:www-data /var/www/conecta-cultura
sudo find /var/www/conecta-cultura -type d -exec chmod 755 {} \;
sudo find /var/www/conecta-cultura -type f -exec chmod 644 {} \;
ls -la /var/www/conecta-cultura
```

#### E. Configurar el fallback de React Router

En Ubuntu, abre el archivo de configuración:

```bash
sudo nano /etc/nginx/sites-available/conecta-cultura
```

Guarda este contenido completo:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name _;

    root /var/www/conecta-cultura;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Guarda en `nano` con **Ctrl + O**, pulsa **Enter** y sal con **Ctrl + X**.

Activa el sitio y valida la configuración:

```bash
sudo ln -sfn /etc/nginx/sites-available/conecta-cultura /etc/nginx/sites-enabled/conecta-cultura
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

Recarga Nginx solamente si `sudo nginx -t` informa que la configuración es correcta.

#### F. Verificar la publicación

En el navegador abre, usando la IP real:

```text
http://IP_PUBLICA/
http://IP_PUBLICA/actividades
http://IP_PUBLICA/actividades/2
```

Abre directamente `/actividades/2` y recarga con **F5**. La página debe seguir mostrando la vista de esa actividad y no una respuesta 404 del servidor.

Una vez publicado, completa:

- URL o IP pública: **pendiente de registrar**.
- Fecha real de despliegue: **pendiente de registrar**.
- [ ] Captura del sitio servido por Nginx.
- [ ] Captura de una ruta interna después de recargar.

## Guía 13 — Vitest y React Testing Library

El repositorio tiene configurados Vitest, jsdom, React Testing Library, jest-dom y user-event. La Guía 13 introdujo las pruebas de formato del precio y de la tarjeta.

## Guía 14 — Cobertura, mocks y preparación evaluativa

Se implementaron los diez comportamientos de la matriz principal de la guía y las pruebas adicionales de persistencia, servicio asíncrono, navegación, cupos y formulario.

### Estado de validación automática

**Última validación verificada:** 14-10-2026.  
**[Abrir ejecución de GitHub Actions](https://github.com/mrg722/CONECTA-CULTURA/actions/runs/38578919623)**

| Comprobación | Resultado |
|---|---|
| Archivos de prueba | 9 aprobados |
| Pruebas automatizadas | 22 aprobadas, 0 fallidas |
| Statements | 100% |
| Branches | 100% |
| Functions | 100% |
| Lines | 100% |
| ESLint | Correcto, sin errores ni advertencias del proyecto |
| Build de producción | Correcto |
| Auditoría de dependencias npm | 0 vulnerabilidades conocidas en la ejecución registrada |
| Informe HTML | Subido como artefacto de GitHub Actions |

La cobertura se calcula para los archivos de producción `src/**/*.{js,jsx}`, excluyendo los archivos de pruebas, la preparación de tests y el punto de entrada `src/main.jsx`. Un 100% de cobertura no sustituye pruebas de aceptación en el navegador ni demuestra por sí mismo la calidad de todos los requisitos.

### Matriz de los diez criterios principales

| N.º | Comportamiento esperado | Archivo |
|---|---|---|
| 1 | Precio cero muestra **Gratis** | `src/utils/precio.spec.jsx` |
| 2 | Precio positivo incluye separador de miles | `src/utils/precio.spec.jsx` |
| 3 | La tarjeta muestra el nombre de la actividad | `src/components/TarjetaActividad.spec.jsx` |
| 4 | Los cupos críticos muestran aviso | `src/components/TarjetaActividad.spec.jsx` |
| 5 | Con cero cupos se deshabilita el botón | `src/components/TarjetaActividad.spec.jsx` |
| 6 | La tarjeta muestra la categoría recibida por props | `src/components/TarjetaActividad.spec.jsx` |
| 7 | El clic llama a `onInscribir` con la actividad | `src/components/TarjetaActividad.spec.jsx` |
| 8 | Cambiar categoría actualiza los resultados | `src/pages/Actividades.spec.jsx` |
| 9 | La persistencia llama a `localStorage.setItem` con la clave y JSON correctos | `src/utils/persistencia.spec.js` |
| 10 | Una actividad inexistente presenta un mensaje | `src/pages/DetalleActividad.spec.jsx` |

La sección de mock asíncrono de la misma guía pide un ejercicio adicional: `src/services/actividades.spec.js` prueba `obtenerNombres` usando `vi.fn().mockResolvedValue`. Además, hay pruebas para el detalle válido, el flujo de inscripción/eliminación, navegación, administración y validación de cupos. Por eso el total es **22 pruebas**, no solo las diez de la tabla.

### Archivos importantes de la Guía 14

- `src/utils/persistencia.js`: función real que guarda inscripciones mediante `localStorage`.
- `src/utils/persistencia.spec.js`: espía `Storage.prototype.setItem` y restaura el espía al terminar.
- `src/services/actividades.js` y `.spec.js`: ejemplo aislado de inyección de dependencia asíncrona, sin llamada a Internet.
- `src/App.spec.jsx`: navegación, alta/baja de inscripción y administración.
- `src/App.cupos.spec.jsx`: comprueba que la lógica no acepte una inscripción agotada, aunque se invoque directamente el manejador.
- `src/pages/admin/FormularioActividad.spec.jsx`: validación de campos vacíos y cupos negativos.
- `vite.config.js`: configura cobertura V8 en texto, HTML y LCOV.
- `.github/workflows/validar.yml`: ejecuta instalación, auditoría de dependencias, pruebas, cobertura, lint y build.

### Documentación evaluativa

- [Auditoría completa de la Guía 14](docs/AUDITORIA_GUIA_14.md)
- [Informe de cobertura de pruebas](docs/INFORME_COBERTURA.md)
- [Especificación de Requisitos de Software (ERS)](docs/ERS.md)

### Ejecutar localmente en Windows

La configuración actual requiere una versión moderna de Node.js; Node.js 14 es demasiado antiguo para Vite, Vitest y ESLint usados por el proyecto. En CMD, comprueba la versión:

```cmd
node -v
npm -v
```

Si sigues usando Node 14 con nvm-windows, instala y selecciona Node.js 24:

```cmd
nvm install 24
nvm use 24
node -v
npm -v
```

En la carpeta raíz correcta del proyecto, instala dependencias y ejecuta las verificaciones:

```cmd
cd /d "C:\Users\av-alumno\conecta-cultura-react\CONECTA-CULTURA"
npm ci
npm run test:run
npm run coverage
npm run lint
npm run build
npm run dev
```

El lockfile se encuentra sincronizado con las dependencias del proyecto. `npm ci` permite hacer una instalación reproducible usando ese archivo. Para abrir la página, visita la URL que muestra Vite, normalmente `http://localhost:5173/`.

### Elementos que requieren evidencia manual del equipo

Estos pasos no se marcan como completados por una prueba automatizada:

- [ ] Abrir la app en navegador y comprobar las rutas internas mediante navegación directa y recarga.
- [ ] Probar el diseño a **375, 768, 1024 y 1440 px**, más 1200 px para documentar el menú de escritorio.
- [ ] Capturar las pruebas, el spy, el mock y el reporte HTML (el último está disponible como artefacto de la ejecución enlazada arriba).
- [ ] Anotar una línea/rama no cubierta y una mejora. El informe actual no muestra líneas sin cubrir dentro del alcance medido; se puede documentar la ampliación de cobertura que condujo al 100%.
- [ ] Ensayar la presentación individual sobre arquitectura, props/estado, responsividad, prueba, mock y cobertura.
- [ ] Si la evaluación exige EC2: desplegar realmente en Ubuntu/Nginx, probar una ruta interna después de recargar, y guardar la IP/URL y fecha reales.
- [ ] Preparar el ZIP final solo según la pauta docente; excluir `node_modules` y `coverage` si así se exige.

### Seguridad de dependencias

La ejecución registrada usa React Router `7.18.4` y no reportó vulnerabilidades en `npm audit`. La validación CI incorpora `npm audit fix` sin `--force`; el pipeline no aplica actualizaciones mayores forzadas de forma automática. Revisa el [informe de auditoría de dependencias en GitHub Actions](https://github.com/mrg722/CONECTA-CULTURA/actions/runs/38578919623) cuando necesites el detalle de una ejecución concreta.
