import { useEffect, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { listarActividades } from "../services/actividadService";

function Categorias() {
  const [actividades, setActividades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

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

  if (cargando) return <Spinner aria-label="Cargando categorías" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  const categorias = [
    ...new Set(actividades.map((actividad) => actividad.categoria))
  ];

  return (
    <main className="container py-4">
      <h1>Categorías</h1>

      <ul>
        {categorias.map((categoria) => (
          <li key={categoria}>{categoria}</li>
        ))}
      </ul>
    </main>
  );
}

export default Categorias;
