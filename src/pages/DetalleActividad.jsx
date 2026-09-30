import { Link, useParams } from "react-router-dom";

function DetalleActividad({ actividades }) {
  const { id } = useParams();
  const actividad = actividades.find(
    (item) => item.id === Number(id)
  );

  if (!actividad) {
    return (
      <main className="container py-4">
        <h1>Actividad no encontrada</h1>
        <p>La actividad solicitada no existe.</p>
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
