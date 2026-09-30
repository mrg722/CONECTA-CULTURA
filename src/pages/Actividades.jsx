import { useState } from "react";
import Cartelera from "./Cartelera";

function Actividades({ actividades, onInscribir }) {
  const [categoria, setCategoria] = useState("Todas");

  const actividadesFiltradas =
    categoria === "Todas"
      ? actividades
      : actividades.filter(
          (actividad) => actividad.categoria === categoria
        );

  return (
    <main className="container py-4">
      <h1>Actividades</h1>

      <select
        className="form-select mb-4"
        value={categoria}
        onChange={(evento) => setCategoria(evento.target.value)}
      >
        <option>Todas</option>
        <option>Música</option>
        <option>Artes visuales</option>
        <option>Tecnología</option>
        <option>Cultura</option>
        <option>Bienestar</option>
      </select>

      <Cartelera
        actividades={actividadesFiltradas}
        onInscribir={onInscribir}
      />
    </main>
  );
}

export default Actividades;
