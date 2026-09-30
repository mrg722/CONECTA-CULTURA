import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Cabecera from "./components/Cabecera";
import Navegacion from "./components/Navegacion";
import PiePagina from "./components/PiePagina";
import Inicio from "./pages/Inicio";
import Actividades from "./pages/Actividades";
import DetalleActividad from "./pages/DetalleActividad";
import Categorias from "./pages/Categorias";
import Ofertas from "./pages/Ofertas";
import Inscripciones from "./pages/Inscripciones";
import AdminActividades from "./pages/admin/AdminActividades";
import NoEncontrada from "./pages/NoEncontrada";
import { actividades } from "./data/actividades";

function App() {
  const [inscripciones, setInscripciones] = useState(() => {
    const guardadas = localStorage.getItem("inscripciones");
    return guardadas ? JSON.parse(guardadas) : [];
  });

  const [actividadesActuales, setActividadesActuales] =
    useState(actividades);

  function inscribir(actividad) {
    const yaExiste = inscripciones.some(
      (item) => item.id === actividad.id
    );

    if (yaExiste) return;
    if (actividad.cupos === 0) return;

    setInscripciones([...inscripciones, actividad]);

    setActividadesActuales(
      actividadesActuales.map((item) =>
        item.id === actividad.id
          ? { ...item, cupos: item.cupos - 1 }
          : item
      )
    );
  }

  function eliminarInscripcion(id) {
    setInscripciones(
      inscripciones.filter((item) => item.id !== id)
    );

    setActividadesActuales(
      actividadesActuales.map((item) =>
        item.id === id
          ? { ...item, cupos: item.cupos + 1 }
          : item
      )
    );
  }

  function crearActividad(datos) {
    const nuevoId =
      actividadesActuales.reduce(
        (maximo, actividad) => Math.max(maximo, actividad.id),
        0
      ) + 1;

    const nuevaActividad = {
      id: nuevoId,
      nombre: datos.nombre,
      categoria: datos.categoria,
      descripcion: "",
      precio: 0,
      cupos: datos.cupos
    };

    setActividadesActuales([
      ...actividadesActuales,
      nuevaActividad
    ]);
  }

  function eliminarActividad(id) {
    setActividadesActuales(
      actividadesActuales.filter((actividad) => actividad.id !== id)
    );
  }

  useEffect(() => {
    localStorage.setItem(
      "inscripciones",
      JSON.stringify(inscripciones)
    );
  }, [inscripciones]);

  return (
    <>
      <Cabecera />
      <Navegacion />

      <Routes>
        <Route path="/" element={<Inicio />} />

        <Route
          path="/actividades"
          element={
            <Actividades
              actividades={actividadesActuales}
              onInscribir={inscribir}
            />
          }
        />

        <Route
          path="/actividades/:id"
          element={<DetalleActividad actividades={actividadesActuales} />}
        />

        <Route
          path="/categorias"
          element={<Categorias actividades={actividadesActuales} />}
        />

        <Route
          path="/ofertas"
          element={<Ofertas />}
        />

        <Route
          path="/inscripciones"
          element={
            <Inscripciones
              inscripciones={inscripciones}
              onEliminar={eliminarInscripcion}
            />
          }
        />

        <Route
          path="/admin/actividades"
          element={
            <AdminActividades
              actividades={actividadesActuales}
              onCrear={crearActividad}
              onEliminar={eliminarActividad}
            />
          }
        />

        <Route path="*" element={<NoEncontrada />} />
      </Routes>

      <PiePagina />
    </>
  );
}

export default App;
