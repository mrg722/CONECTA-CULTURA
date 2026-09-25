import { useEffect, useState } from "react";
import Cabecera from "./components/Cabecera";
import Navegacion from "./components/Navegacion";
import Cartelera from "./pages/Cartelera";
import MisInscripciones from "./components/MisInscripciones";
import { actividades } from "./data/actividades";

function App() {
  const [categoria, setCategoria] = useState("Todas");

  const [inscripciones, setInscripciones] = useState(() => {
    const guardadas =
      localStorage.getItem("inscripciones");

    return guardadas
      ? JSON.parse(guardadas)
      : [];
  });

  const [actividadesActuales, setActividadesActuales] =
    useState(actividades);

  const actividadesFiltradas =
    categoria === "Todas"
      ? actividadesActuales
      : actividadesActuales.filter(
          (actividad) =>
            actividad.categoria === categoria
        );

  const visibles = actividadesFiltradas;

  function inscribir(actividad) {
    const yaExiste = inscripciones.some(
      (item) => item.id === actividad.id
    );

    if (yaExiste) return;

    if (actividad.cupos === 0) return;

    setInscripciones([
      ...inscripciones,
      actividad
    ]);

    setActividadesActuales(
      actividadesActuales.map((item) =>
        item.id === actividad.id
          ? {
              ...item,
              cupos: item.cupos - 1
            }
          : item
      )
    );
  }

  function eliminarInscripcion(id) {
    setInscripciones(
      inscripciones.filter(
        (item) => item.id !== id
      )
    );

    setActividadesActuales(
      actividadesActuales.map((item) =>
        item.id === id
          ? {
              ...item,
              cupos: item.cupos + 1
            }
          : item
      )
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

      <main className="container py-4">
        <select
          className="form-select mb-4"
          value={categoria}
          onChange={(evento) =>
            setCategoria(evento.target.value)
          }
        >
          <option>Todas</option>
          <option>Música</option>
          <option>Artes visuales</option>
        </select>

        <Cartelera
          actividades={visibles}
          onInscribir={inscribir}
        />

        <div className="mt-5">
          <MisInscripciones
            inscripciones={inscripciones}
            onEliminar={eliminarInscripcion}
          />
        </div>
      </main>
    </>
  );
}

export default App;