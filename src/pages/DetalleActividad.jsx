import { useEffect, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { buscarActividad } from "../services/actividadService";

function DetalleActividad() {
  const { id } = useParams();
  const [actividad, setActividad] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargar() {
      try {
        setError("");
        setActividad(await buscarActividad(id));
      } catch (problema) {
        setError(problema.message);
      } finally {
        setCargando(false);
      }
    }
    cargar();
  }, [id]);

  if (cargando) return <Spinner aria-label="Cargando actividad" />;

  if (error || !actividad) {
    return (
      <main className="container py-4">
        <h1>Actividad no encontrada</h1>
        <Alert variant="danger">{error || "La actividad solicitada no existe."}</Alert>
        <Link to="/actividades">Volver a actividades</Link>
      </main>
    );
  }

  return (
    <main className="container py-4">
      <h1>{actividad.nombre}</h1>
      <p>{actividad.descripcion}</p>
      <Link to="/actividades">Volver a actividades</Link>
    </main>
  );
}

export default DetalleActividad;
