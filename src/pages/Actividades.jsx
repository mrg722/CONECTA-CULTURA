import { useEffect, useState } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import { listarActividades } from "../services/actividadService";
import Cartelera from "./Cartelera";

function Actividades({ onInscribir }) {
  const [actividades, setActividades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [categoria, setCategoria] = useState("Todas");

  useEffect(() => {
    async function cargar() {
      try {
        setError("");
        setActividades(await listarActividades());
      } catch (problema) {
        setError(problema.message);
      } finally {
        setCargando(false);
      }
    }
    cargar();
  }, []);

  if (cargando) return <Spinner aria-label="Cargando actividades" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (actividades.length === 0) return <Alert>No hay actividades.</Alert>;

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
