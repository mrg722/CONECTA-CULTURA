import { useState } from "react";
import { Container } from "react-bootstrap";
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
    <Container as="main" className="py-4">
      <h1>Actividades</h1>

      <label className="form-label" htmlFor="filtro-categoria">
        Filtrar por categoría
      </label>
      <select
        id="filtro-categoria"
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
    </Container>
  );
}

export default Actividades;
