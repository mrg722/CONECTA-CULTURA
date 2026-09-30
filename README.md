# Conecta Cultura

Aplicación desarrollada para **DSY1104 · Desarrollo FullStack II** con React, Vite, Bootstrap y React Bootstrap.

Este repositorio continúa el trabajo de las Guías 9, 10 y 11. El alcance de este proyecto se mantiene limitado a los requisitos indicados en esas guías y en los documentos de Diseño Responsivo y Actividad 2.2.2.

## Cómo ejecutar el proyecto en el computador

### 1. Abrir la terminal

Abre **PowerShell** o **Símbolo del sistema (CMD)**.

Comprueba la carpeta actual con:

```powershell
pwd
```

En PowerShell también puedes comprobar el contenido de la carpeta con:

```powershell
dir
```

### 2. Entrar al proyecto

Usando la ubicación local de este proyecto:

```powershell
cd "C:\Users\av-alumno\CONECTA-CULTURA"
```

Comprueba nuevamente la ubicación:

```powershell
pwd
```

Debe aparecer la carpeta:

```text
C:\Users\av-alumno\CONECTA-CULTURA
```

### 3. Instalar las dependencias

Ejecuta:

```powershell
npm install
```

La Guía 11 requiere React Router. La dependencia ya está registrada en el proyecto; para reinstalarla o comprobarla puedes ejecutar:

```powershell
npm install react-router-dom
```

### 4. Iniciar la aplicación

Ejecuta:

```powershell
npm run dev
```

Vite mostrará una dirección local similar a:

```text
Local: http://localhost:5173/
```

Mantén abierta la terminal.

En VS Code, puedes **mantener presionada la tecla Ctrl y hacer clic sobre la dirección local** que aparece en la terminal para abrir la aplicación en el navegador.

También puedes escribir directamente en el navegador:

```text
http://localhost:5173/
```

### 5. Comprobar que no existan errores

En el navegador presiona:

```text
F12
```

o abre las herramientas del navegador desde el menú de desarrollo.

Selecciona **Consola** y comprueba que no existan errores marcados en rojo.

## Rutas de Conecta Cultura

Con la aplicación ejecutándose en el puerto 5173, prueba directamente estas direcciones:

```text
http://localhost:5173/
http://localhost:5173/actividades
http://localhost:5173/actividades/1
http://localhost:5173/categorias
http://localhost:5173/ofertas
http://localhost:5173/inscripciones
http://localhost:5173/admin/actividades
http://localhost:5173/esta-ruta-no-existe
```

La última dirección permite comprobar la página de dirección no encontrada.

Para probar otro detalle de actividad puedes cambiar el número:

```text
http://localhost:5173/actividades/2
```

También se debe comprobar una actividad inexistente, por ejemplo:

```text
http://localhost:5173/actividades/999
```

## Pruebas de la Guía 10

En **Actividades** se debe comprobar:

1. Que se muestran las actividades generadas desde el arreglo de datos.
2. Que el filtro cambia las actividades mostradas según la categoría.
3. Que una actividad con precio cero muestra **Gratis**.
4. Que la inscripción descuenta un cupo.
5. Que una actividad no puede inscribirse dos veces.
6. Que una actividad sin cupos no permite la inscripción.
7. Que al eliminar una inscripción vuelve a aparecer el cupo disponible.
8. Que **Inscripciones** recupera los registros después de recargar la página.

Para comprobar la persistencia:

```text
1. Inscribe una actividad.
2. Abre Inscripciones.
3. Comprueba que aparece la actividad.
4. Recarga el navegador con F5.
5. Comprueba nuevamente la inscripción.
```

## Pruebas del formulario administrativo

En:

```text
http://localhost:5173/admin/actividades
```

comprueba el formulario.

Debe contener:

- Nombre
- Categoría
- Cupos

Prueba primero el envío sin completar los campos.

Después comprueba:

- Nombre vacío → aparece un mensaje de error.
- Categoría sin seleccionar → aparece un mensaje de error.
- Cupos vacío → aparece un mensaje de error.
- Cupos negativo → aparece un mensaje de error.
- Datos válidos → se agrega la actividad a la lista.

Después de crear una actividad, comprueba que aparezca en **Actividades**.

También comprueba el botón **Eliminar** en la administración.

## Pruebas de diseño responsivo

Las guías de diseño adaptable piden comprobar distintos anchos de pantalla.

En Chrome o Edge abre las herramientas del desarrollador y activa la vista de dispositivo mediante:

```text
Ctrl + Shift + M
```

Realiza las comprobaciones en:

```text
320 px
375 px
768 px
1024 px
1440 px
```

En particular, para la Guía 9 comprueba el comportamiento del menú en:

```text
375 px
1200 px
```

A 375 px debe aparecer el botón del menú y este debe poder abrirse y cerrarse.

En un ancho de escritorio los enlaces deben permanecer visibles sin el botón de menú.

También comprueba que no exista desplazamiento horizontal innecesario.

## Comprobaciones antes de registrar un avance

Ejecuta:

```powershell
npm run lint
```

Después:

```powershell
npm run build
```

Si ambos comandos terminan correctamente, comprueba nuevamente la aplicación en el navegador.

## Estado auditado de las Guías 9, 10 y 11

### Guía 9

- [x] Proyecto React + Vite.
- [x] Bootstrap y React Bootstrap.
- [x] Componente de cabecera.
- [x] Componente de navegación.
- [x] Componente de bienvenida.
- [x] Componente de tarjeta.
- [x] Componente de pie de página integrado en la aplicación.
- [x] Texto de portada trasladado.
- [x] Imagen de portada utilizada.
- [x] Al menos tres tarjetas.
- [x] Recursos de ejemplo de Vite que no se utilizan eliminados.
- [ ] Comprobación manual del menú a 375 px.
- [ ] Comprobación manual del menú a 1200 px.
- [ ] Evidencias de la guía.

### Guía 10

- [x] Datos representados mediante objetos y arreglo.
- [x] Ocho actividades.
- [x] Más de cuatro categorías.
- [x] Tarjetas generadas desde el arreglo.
- [x] Props.
- [x] Estado con `useState`.
- [x] Filtro por categoría.
- [x] Inscripción.
- [x] Prevención de duplicados.
- [x] Eliminación de inscripción.
- [x] `MisInscripciones`.
- [x] `useEffect`.
- [x] `localStorage`.
- [x] Recuperación de inscripciones al recargar.
- [x] Mostrar **Gratis** cuando el precio es cero.
- [x] Actividad con exactamente cinco cupos.
- [x] Actividad sin cupos.
- [ ] Evidencias de la guía.

### Guía 11

- [x] React Router instalado y registrado.
- [x] `BrowserRouter`.
- [x] `Routes` y `Route`.
- [x] Ruta de inicio.
- [x] Ruta de actividades.
- [x] Ruta de detalle con `id`.
- [x] Ruta de categorías.
- [x] Ruta de ofertas.
- [x] Ruta de inscripciones.
- [x] Ruta administrativa.
- [x] Ruta para dirección no encontrada.
- [x] `NavLink` y `Link`.
- [x] `useParams`.
- [x] Conversión de `id` a número.
- [x] Tratamiento de actividad inexistente.
- [x] Formulario controlado.
- [x] Campos de nombre, categoría y cupos.
- [x] Validación y mensajes.
- [x] Create de actividades sobre el estado.
- [x] Delete de actividades sobre el estado.
- [ ] Comprobación manual de todas las direcciones escribiéndolas directamente.
- [ ] Evidencias de la guía.

## Documentos 2.2.1 y 2.2.2

### 2.2.1 Diseño Responsivo

El documento corresponde al material de la sesión de Diseño Responsivo y presenta contenidos de React, componentes, props, estado, almacenamiento local y React Router. También remite a la Actividad 2.2.2.

En este repositorio se aplican únicamente los contenidos que corresponden al proyecto actual y que están respaldados por las Guías 9, 10 y 11.

### 2.2.2 Actividad de creación de sitios web responsivos

El documento describe principalmente una actividad de configuración de React en un entorno EC2 de AWS.

No se reemplaza React + Vite por otra arquitectura y no se incorpora infraestructura EC2 dentro de este repositorio. Esa parte corresponde al entorno de trabajo indicado por el documento.

## Estructura principal

```text
src/
├── components/
│   ├── Bienvenida.jsx
│   ├── Cabecera.jsx
│   ├── MisInscripciones.jsx
│   ├── Navegacion.jsx
│   ├── PiePagina.jsx
│   └── TarjetaActividad.jsx
├── data/
│   └── actividades.js
├── pages/
│   ├── Actividades.jsx
│   ├── Categorias.jsx
│   ├── DetalleActividad.jsx
│   ├── Inicio.jsx
│   ├── Inscripciones.jsx
│   ├── NoEncontrada.jsx
│   ├── Ofertas.jsx
│   └── admin/
│       ├── AdminActividades.jsx
│       └── FormularioActividad.jsx
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## Git

Antes de registrar cualquier avance:

```powershell
git status
```

Revisa las diferencias:

```powershell
git diff
```

Agrega únicamente los archivos relacionados con el avance.

Ejemplo para un avance de documentación:

```powershell
git add README.md
git commit -m "docs: actualizar instrucciones del proyecto"
git push
```

Después comprueba:

```powershell
git status
```

La rama utilizada para el proyecto es `main`.
