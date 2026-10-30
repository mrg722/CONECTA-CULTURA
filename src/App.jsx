import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Cabecera from "./components/Cabecera";
import Navegacion from "./components/Navegacion";
import PiePagina from "./components/PiePagina";
import RutaProtegida from "./components/RutaProtegida";
import Inicio from "./pages/Inicio";
import Actividades from "./pages/Actividades";
import ActividadForm from "./pages/ActividadForm";
import DetalleActividad from "./pages/DetalleActividad";
import Categorias from "./pages/Categorias";
import Ofertas from "./pages/Ofertas";
import Inscripciones from "./pages/Inscripciones";
import Login from "./pages/Login";
import AdminActividades from "./pages/admin/AdminActividades";
import NoEncontrada from "./pages/NoEncontrada";
import { guardarInscripciones } from "./utils/persistencia";

function App() {
  const [inscripciones, setInscripciones] = useState(() => {
    const guardadas = localStorage.getItem("inscripciones");
    return guardadas ? JSON.parse(guardadas) : [];
  });

  function inscribir(actividad) {
    const yaExiste = inscripciones.some(
      (item) => item.id === actividad.id
    );

    if (yaExiste) return;
    if (actividad.cupos === 0) return;

    setInscripciones([...inscripciones, actividad]);
  }

  function eliminarInscripcion(id) {
    setInscripciones(
      inscripciones.filter((item) => item.id !== id)
    );
  }

  useEffect(() => {
    guardarInscripciones(inscripciones);
  }, [inscripciones]);

  return (
    <>
      <Cabecera />
      <Navegacion />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route
          path="/actividades"
          element={<Actividades onInscribir={inscribir} />}
        />
        <Route path="/actividades/:id" element={<DetalleActividad />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route
          path="/inscripciones"
          element={
            <Inscripciones
              inscripciones={inscripciones}
              onEliminar={eliminarInscripcion}
            />
          }
        />
        <Route path="/login" element={<Login />} />

        <Route element={<RutaProtegida rol="ADMIN" />}>
          <Route path="/admin/actividades" element={<AdminActividades />} />
          <Route path="/admin/actividades/nueva" element={<ActividadForm />} />
          <Route
            path="/admin/actividades/:id/editar"
            element={<ActividadForm />}
          />
        </Route>

        <Route path="*" element={<NoEncontrada />} />
      </Routes>

      <PiePagina />
    </>
  );
}

export default App;
